/**
 * patientApi.js — Patient Portal API adapter
 *
 * All patient-facing API calls are isolated here.
 * Where backend endpoints are not yet implemented, calls fall back to
 * clearly-marked DEMO data and log a warning to the console.
 * Replace the DEMO blocks as the backend grows.
 *
 * Existing backend stubs (server/routes/patientRoutes.js):
 *   GET  /api/patient/visits   → stub (no real data yet)
 *   POST /api/patient/intake   → stub (no real data yet)
 *
 * Required future backend contracts are documented inline.
 */

import api from './axiosInstance';

// ─── Demo flag ────────────────────────────────────────────────────────────────
// Set to false once the real backend endpoints are wired.
const DEMO_MODE = true;

function demoWarn(endpoint) {
  console.warn(`[patientApi] DEMO MODE — real endpoint not yet implemented: ${endpoint}`);
}

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const DEMO_PROFILE = {
  _id: 'demo_patient_001',
  name: 'Pranjal Sharma',
  email: 'pranjal@veyora.demo',
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
  consent_url: 'https://veyora.demo/consent/VY-TOK-DEMO-7G8H9I',
  _demo: true,
};

// ─── Routing Engine (rule-based, frontend demo) ────────────────────────────
// NOTE: This is a DEMO routing adapter. Replace with real backend response once
// POST /api/patient/intake returns a triage_result.
function localTriageRule(formData) {
  const complaint = (formData.chief_complaint || '').toLowerCase();
  const severity = parseInt(formData.severity, 10) || 3;

  const emergencyKeywords = ['chest pain', 'heart attack', 'stroke', 'breathing', 'unconscious', 'seizure', 'paralysis', 'severe bleeding'];
  if (emergencyKeywords.some(k => complaint.includes(k)) || severity >= 9) {
    return { destination: 'EMERGENCY', reason: 'Symptoms indicate a potential emergency. Please call 112 immediately.' };
  }
  if (severity >= 7 || complaint.includes('high fever') || complaint.includes('vomiting')) {
    return { destination: 'CHC', reason: 'Moderate-to-high severity symptoms. A Community Health Centre can provide the required care.' };
  }
  if (severity >= 4 || complaint.includes('fever') || complaint.includes('cough') || complaint.includes('pain')) {
    return { destination: 'PHC', reason: 'Symptoms are manageable at a Primary Health Centre.' };
  }
  return { destination: 'OPD', reason: 'Mild symptoms. An OPD visit is recommended for a routine check-up.' };
}

// ─── API Functions ─────────────────────────────────────────────────────────

/**
 * Fetch authenticated patient profile.
 * Backend contract: GET /api/patient/profile → { _id, name, email, role, phone, dob, gender, bloodGroup }
 */
export async function getPatientProfile() {
  if (DEMO_MODE) {
    demoWarn('GET /api/patient/profile');
    return DEMO_PROFILE;
  }
  const { data } = await api.get('/patient/profile');
  return data;
}

/**
 * Fetch visit/encounter history for the authenticated patient.
 * Backend contract: GET /api/patient/visits → Encounter[] (sorted newest first)
 */
export async function getPatientVisits() {
  try {
    const { data } = await api.get('/patient/visits');
    // If backend returns a real array, use it
    if (Array.isArray(data) && data.length > 0) return data;
    // Stub returns { message: '...' } — fall through to demo
    throw new Error('stub');
  } catch {
    demoWarn('GET /api/patient/visits');
    return [...DEMO_ENCOUNTERS].reverse();
  }
}

/**
 * Fetch a single encounter by ID.
 * Backend contract: GET /api/patient/visits/:id → Encounter (full detail)
 */
export async function getEncounterById(id) {
  if (DEMO_MODE) {
    demoWarn(`GET /api/patient/visits/${id}`);
    return DEMO_ENCOUNTERS.find(e => e._id === id) || null;
  }
  const { data } = await api.get(`/patient/visits/${id}`);
  return data;
}

/**
 * Submit patient intake form.
 * Backend contract:
 *   POST /api/patient/intake
 *   Body: { chief_complaint, duration, severity, language, notes }
 *   Response: { encounter_id, triage_result, destination, reason, token_id }
 */
export async function submitIntake(formData) {
  try {
    const { data } = await api.post('/patient/intake', formData);
    // If backend returns a real triage_result, use it
    if (data && data.triage_result) return data;
    throw new Error('stub');
  } catch (err) {
    if (err?.response?.status >= 400) throw err; // real error — propagate
    demoWarn('POST /api/patient/intake');
    const routing = localTriageRule(formData);
    await new Promise(r => setTimeout(r, 800)); // simulate network
    return {
      encounter_id: `enc_demo_${Date.now()}`,
      triage_result: routing.destination,
      destination: routing.destination,
      reason: routing.reason,
      token_id: `TOK-DEMO-${Math.random().toString(36).slice(2,8).toUpperCase()}`,
      _demo: true,
    };
  }
}

/**
 * Get or refresh a consent QR token for the patient's latest active encounter.
 * Backend contract:
 *   GET /api/patient/qr-token → { token, encounter_id, expires_at, status, consent_url }
 *
 * SECURITY NOTE: The token must be opaque and limited-purpose.
 *   Do NOT encode medical records, JWTs, or PII in the QR code value.
 */
export async function getQRToken() {
  if (DEMO_MODE) {
    demoWarn('GET /api/patient/qr-token');
    return DEMO_QR_TOKEN;
  }
  const { data } = await api.get('/patient/qr-token');
  return data;
}

/**
 * Confirm/acknowledge a follow-up appointment.
 * Backend contract:
 *   POST /api/patient/followup/confirm
 *   Body: { encounter_id }
 *   Response: { success, confirmed_at, message }
 */
export async function confirmFollowup(encounterId) {
  if (DEMO_MODE) {
    demoWarn('POST /api/patient/followup/confirm');
    await new Promise(r => setTimeout(r, 700));
    return { success: true, confirmed_at: new Date().toISOString(), message: 'Follow-up acknowledged (demo)', _demo: true };
  }
  const { data } = await api.post('/patient/followup/confirm', { encounter_id: encounterId });
  return data;
}

export { DEMO_MODE };
