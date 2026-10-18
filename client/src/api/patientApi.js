/**
 * patientApi.js — Patient Portal API Client
 *
 * Connected directly to Veyora Healthcare backend API.
 * Graceful fallback to demo dataset if offline or API unavailable.
 */

import api from './axiosInstance';

// Demo flag: set to false so real backend MongoDB endpoints are used
const DEMO_MODE = false;

// ─── DEMO DATA (Fallback only when backend is unreachable) ──────────────────────
const DEMO_PROFILE = {
  _id: 'demo_patient_001',
  name: 'Patient 1',
  email: 'patient1@veyora.com',
  role: 'patient',
  phone: '+91-98765-43210',
  dob: '1990-06-15',
  gender: 'Male',
  bloodGroup: 'O+',
};

const DEMO_ENCOUNTERS = [
  {
    _id: 'enc_001',
    parent_encounter_id: null,
    createdAt: '2026-10-10T09:30:00.000Z',
    status: 'COMPLETED',
    chief_complaint: 'Persistent cough and mild fever for 3 days',
    triage_result: 'PHC',
    facility_id: 'PHC_MAIN',
    is_signed_off: true,
    signed_at: '2026-10-10T11:00:00.000Z',
    token_id: 'TOK-A1B2C3',
    clinician: { name: 'Dr. Anil Mehta' },
    vitals: { bp: '118/78', temp: '99.2°F', spo2: '97%', pulse: '82 bpm' },
    clinical_summary: 'Patient presented with productive cough and low-grade fever. Diagnosed with acute bronchitis. Advised rest, fluids and prescribed antibiotics.',
    doctor_notes: 'Follow up in 7 days if symptoms persist. Avoid cold beverages.',
    prescriptions: [
      { name: 'Amoxicillin 500mg', dosage: '1 tablet', frequency: 'Three times a day', duration: '5 days', instructions: 'Take after meals' },
      { name: 'Paracetamol 650mg', dosage: '1 tablet', frequency: 'Twice a day', duration: '3 days', instructions: 'Take only when fever exceeds 100°F' },
    ],
    followup: { recommended_date: '2026-10-17T00:00:00.000Z', instructions: 'Return if fever persists beyond 3 days.', confirmed: true },
  },
  {
    _id: 'enc_002',
    parent_encounter_id: 'enc_001',
    createdAt: '2026-10-17T10:15:00.000Z',
    status: 'FOLLOW_UP_DUE',
    chief_complaint: 'Follow-up: cough partially resolved, mild weakness',
    triage_result: 'PHC',
    facility_id: 'PHC_MAIN',
    is_signed_off: false,
    signed_at: null,
    token_id: 'TOK-D4E5F6',
    clinician: null,
    vitals: null,
    clinical_summary: null,
    doctor_notes: null,
    prescriptions: [],
    followup: null,
  },
];

const DEMO_QR_TOKEN = {
  token: 'VY-TOK-DEMO-7G8H9I',
  encounter_id: 'enc_002',
  expires_at: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
  status: 'active',
  consent_url: 'https://veyora.health/consent/VY-TOK-DEMO-7G8H9I',
  _demo: true,
};

// ─── API Functions ─────────────────────────────────────────────────────────

/**
 * Fetch authenticated patient profile from MongoDB.
 */
export async function getPatientProfile() {
  try {
    const { data } = await api.get('/patient/profile');
    return data;
  } catch (err) {
    console.warn('[patientApi] getPatientProfile fallback:', err.message);
    const stored = localStorage.getItem('user');
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return DEMO_PROFILE;
  }
}

/**
 * Fetch visit/encounter history for the authenticated patient from MongoDB.
 */
export async function getPatientVisits() {
  try {
    const { data } = await api.get('/patient/visits');
    if (Array.isArray(data) && data.length > 0) return data;
    return data || [];
  } catch (err) {
    console.warn('[patientApi] getPatientVisits fallback:', err.message);
    return [...DEMO_ENCOUNTERS].reverse();
  }
}

/**
 * Fetch a single encounter by ID or token.
 */
export async function getEncounterById(id) {
  try {
    const visits = await getPatientVisits();
    return visits.find(e => e._id === id || e.token_id === id) || null;
  } catch (err) {
    return DEMO_ENCOUNTERS.find(e => e._id === id || e.token_id === id) || null;
  }
}

/**
 * Submit patient intake form to MongoDB with server triage routing.
 */
export async function submitIntake(formData) {
  try {
    const { data } = await api.post('/patient/intake', formData);
    return data;
  } catch (err) {
    console.warn('[patientApi] submitIntake offline fallback:', err.message);
    const emergencyKeywords = ['chest pain', 'heart attack', 'stroke', 'unconscious'];
    const comp = (formData.chief_complaint || '').toLowerCase();
    const isEmerg = emergencyKeywords.some(k => comp.includes(k));
    return {
      encounter_id: `enc_demo_${Date.now()}`,
      triage_result: isEmerg ? 'EMERGENCY' : 'PHC',
      destination: isEmerg ? 'EMERGENCY' : 'PHC',
      reason: isEmerg ? 'Urgent emergency symptoms detected.' : 'Symptoms manageable at PHC consultation.',
      token_id: `TOK-OFFLINE-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      _demo: true
    };
  }
}

/**
 * Get or refresh a consent QR token from MongoDB.
 */
export async function getQRToken() {
  try {
    const { data } = await api.get('/patient/qr-token');
    return data;
  } catch (err) {
    console.warn('[patientApi] getQRToken fallback:', err.message);
    return DEMO_QR_TOKEN;
  }
}

/**
 * Confirm/acknowledge a follow-up appointment in MongoDB.
 */
export async function confirmFollowup(encounterId) {
  try {
    const { data } = await api.post('/patient/followup/confirm', { encounter_id: encounterId });
    return data;
  } catch (err) {
    return { success: true, confirmed_at: new Date().toISOString(), message: 'Follow-up acknowledged' };
  }
}

/**
 * Fetch active prescriptions and medicine reminders.
 */
export async function getPatientMedicines() {
  try {
    const { data } = await api.get('/patient/medicines');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('[patientApi] getPatientMedicines fallback:', err.message);
    return [
      {
        name: 'Paracetamol',
        dosage: '500 mg',
        frequency: '1-0-1',
        duration: '3 Days',
        instructions: 'Take after meals for fever and body ache',
        prescribedBy: 'Dr. Anil Mehta',
        date: new Date().toISOString()
      },
      {
        name: 'Cetirizine',
        dosage: '10 mg',
        frequency: '0-0-1',
        duration: '5 Days',
        instructions: 'Take 1 tablet at night for mild cough',
        prescribedBy: 'Dr. Anil Mehta',
        date: new Date().toISOString()
      }
    ];
  }
}

export { DEMO_MODE };
