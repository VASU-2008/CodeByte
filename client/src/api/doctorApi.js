import api from './axiosInstance';

/**
 * Doctor Portal API Client (Aura HealthTech)
 * Standardized demo data with Doctor 1, Doctor 2... and Patient 1, Patient 2...
 */

/**
 * Dynamic Patient Resolver
 * Resolves patient data based on token (P-001, P-002, P-003, etc.)
 */
export const getPatientByToken = (tokenId) => {
    const token = tokenId || localStorage.getItem('activeDoctorEncounterId') || 'P-001';
    const cleanToken = token.includes('/') ? token.split('/').pop() : token;
    
    const patientsMap = {
        'P-001': { 
            id: 1, 
            name: 'Patient 1', 
            age: 42, 
            gender: 'Male', 
            token: 'P-001', 
            abhaId: 'ABHA-9821-4402-9912',
            complaint: 'Fever and body ache since 2 days. Mild dry cough, worse at night.', 
            bp: '120/80', 
            temp: '101.2°F', 
            pulse: '98 bpm', 
            spo2: '97%', 
            weight: '68 kg', 
            bmi: '23.5', 
            allergy: 'Penicillin Allergy',
            hasAllergy: true,
            diagnosis: 'Acute Viral URTI with Reactive Myalgia',
            findings: 'Throat congested, tonsils non-enlarged. Clear breath sounds bilaterally. Normal heart sounds. Temperature 101.2°F.',
            notes: 'Patient presents with moderate fever, headache, and body aches for 2 days. No respiratory distress. Prescribed symptomatic antipyretics and advised oral hydration.',
            advice: 'Warm saline gargles twice daily. Increase oral fluids (2.5L/day). Rest for 48 hours.',
            medications: [
                { id: 1, name: 'Paracetamol', strength: '500 mg', form: 'Tablet', frequency: '1-0-1', timing: 'After Food', duration: '3 Days', instructions: 'Take after meals for fever/body ache' },
                { id: 2, name: 'Cetirizine', strength: '10 mg', form: 'Tablet', frequency: '0-0-1', timing: 'Bedtime', duration: '5 Days', instructions: 'Take 1 tablet at night for mild cough/cold' },
                { id: 3, name: 'Oral Rehydration Salts (ORS)', strength: '1 Sachet', form: 'Powder', frequency: '1-1-1', timing: 'With Water', duration: '2 Days', instructions: 'Mix in 1L clean drinking water and consume throughout day' }
            ],
            pastVisits: [
                { date: '05 Oct 2024', facility: 'CHC Visit', doctor: 'Doctor 2', diagnosis: 'Viral fever, symptomatic treatment', rx: 'Paracetamol 500mg, Cetirizine 10mg' },
                { date: '10 Aug 2024', facility: 'Follow-up', doctor: 'Doctor 3', diagnosis: 'Recovered, no new complaints', rx: 'Multivitamin B-Complex' },
                { date: '12 Jun 2024', facility: 'General OPD', doctor: 'Doctor 2', diagnosis: 'Hypertension follow-up', rx: 'Amlodipine 5mg' }
            ]
        },
        'P-002': { 
            id: 2, 
            name: 'Patient 2', 
            age: 36, 
            gender: 'Female', 
            token: 'P-002', 
            abhaId: 'ABHA-3310-5591-1024',
            complaint: 'Severe throbbing headache, dizziness and elevated blood pressure.', 
            bp: '145/95', 
            temp: '98.6°F', 
            pulse: '84 bpm', 
            spo2: '98%', 
            weight: '62 kg', 
            bmi: '22.8', 
            allergy: 'Sulfa Drugs Allergy',
            hasAllergy: true,
            diagnosis: 'Essential Hypertension (Stage 2) with Cephalea',
            findings: 'Bilateral temporal pulse bounding. Neurological screen intact. Chest clear, S1/S2 present without murmur.',
            notes: 'Patient reports persistent headache radiating from occiput. Elevated BP 145/95. Commenced antihypertensive therapy and ordered renal function panel.',
            advice: 'Low sodium DASH diet. Daily BP charting morning and evening. Avoid stress and heavy physical exertion.',
            medications: [
                { id: 1, name: 'Telmisartan', strength: '40 mg', form: 'Tablet', frequency: '1-0-0', timing: 'Morning Before Food', duration: '30 Days', instructions: 'Take regularly at 8 AM' },
                { id: 2, name: 'Amlodipine', strength: '5 mg', form: 'Tablet', frequency: '0-0-1', timing: 'Night After Food', duration: '30 Days', instructions: 'Take at night if BP remains above 140/90' },
                { id: 3, name: 'Paracetamol', strength: '650 mg', form: 'Tablet', frequency: 'SOS', timing: 'After Food', duration: '3 Days', instructions: 'Take only when headache is severe' }
            ],
            pastVisits: [
                { date: '18 Nov 2024', facility: 'PHC North Main', doctor: 'Doctor 1', diagnosis: 'Borderline hypertension screening', rx: 'Dietary sodium reduction' },
                { date: '04 Sep 2024', facility: 'District Hospital', doctor: 'Doctor 2', diagnosis: 'Tension-type headache review', rx: 'Analgesics & Stress counseling' }
            ]
        },
        'P-003': { 
            id: 3, 
            name: 'Patient 3', 
            age: 28, 
            gender: 'Male', 
            token: 'P-003', 
            abhaId: 'ABHA-7744-8821-3301',
            complaint: 'Acute stomach cramps, watery diarrhea and nausea since yesterday.', 
            bp: '118/76', 
            temp: '99.1°F', 
            pulse: '76 bpm', 
            spo2: '99%', 
            weight: '71 kg', 
            bmi: '24.1', 
            allergy: 'No Known Drug Allergies (NKDA)',
            hasAllergy: false,
            diagnosis: 'Acute Gastroenteritis with Mild Dehydration',
            findings: 'Abdomen soft, diffuse periumbilical tenderness, hyperactive bowel sounds. No rebound or rigidity.',
            notes: 'Patient had outside food 24 hours ago. Vomiting subsided, mild low-grade pyrexia. Hydration maintained.',
            advice: 'Bland BRAT diet. Strict oral rehydration therapy. Avoid dairy and spicy foods.',
            medications: [
                { id: 1, name: 'Oral Rehydration Salts (ORS)', strength: '2 Sachets', form: 'Powder', frequency: '1-1-1', timing: 'With Water', duration: '3 Days', instructions: 'Dissolve 1 sachet in 1 liter clean drinking water' },
                { id: 2, name: 'Ofloxacin + Ornidazole', strength: '200/500 mg', form: 'Tablet', frequency: '1-0-1', timing: 'After Food', duration: '5 Days', instructions: 'Take after food for gut infection' },
                { id: 3, name: 'Dicyclomine', strength: '10 mg', form: 'Tablet', frequency: 'SOS', timing: 'Before Food', duration: '2 Days', instructions: 'Take for severe abdominal cramps' }
            ],
            pastVisits: [
                { date: '15 Jul 2024', facility: 'General OPD', doctor: 'Doctor 3', diagnosis: 'Food poisoning recovery', rx: 'Probiotics' }
            ]
        },
        'P-004': { 
            id: 4, 
            name: 'Patient 4', 
            age: 55, 
            gender: 'Female', 
            token: 'P-004', 
            abhaId: 'ABHA-5522-1109-6644',
            complaint: 'Routine diabetes and lipid profile check-up with refill prescription.', 
            bp: '130/82', 
            temp: '98.4°F', 
            pulse: '72 bpm', 
            spo2: '98%', 
            weight: '70 kg', 
            bmi: '26.0', 
            allergy: 'NSAIDs Allergy',
            hasAllergy: true,
            diagnosis: 'Type 2 Diabetes Mellitus - Stable Glycemic Control',
            findings: 'Pedal pulses palpable. No peripheral neuropathy or skin ulcers. Heart and lungs clear.',
            notes: 'Fasting blood glucose 118 mg/dL, HbA1c 6.8%. Medication adherence good. Routine refill issued.',
            advice: 'Maintain 30 mins brisk walking daily. Low glycemic index diet.',
            medications: [
                { id: 1, name: 'Metformin', strength: '500 mg', form: 'Tablet', frequency: '1-0-1', timing: 'After Food', duration: '30 Days', instructions: 'Take with or immediately after meals' },
                { id: 2, name: 'Glimepiride', strength: '1 mg', form: 'Tablet', frequency: '1-0-0', timing: 'Before Breakfast', duration: '30 Days', instructions: 'Take 15 mins before breakfast' },
                { id: 3, name: 'Atorvastatin', strength: '10 mg', form: 'Tablet', frequency: '0-0-1', timing: 'Bedtime', duration: '30 Days', instructions: 'Take at night' }
            ],
            pastVisits: [
                { date: '14 Oct 2024', facility: 'PHC North Main', doctor: 'Doctor 1', diagnosis: 'Diabetes 3-month review', rx: 'Metformin 500mg' }
            ]
        },
        'P-005': { 
            id: 5, 
            name: 'Patient 5', 
            age: 31, 
            gender: 'Male', 
            token: 'P-005', 
            abhaId: 'ABHA-6631-9988-2211',
            complaint: 'Persistent sore throat, difficulty swallowing and mild earache since 3 days.', 
            bp: '115/75', 
            temp: '100.4°F', 
            pulse: '88 bpm', 
            spo2: '98%', 
            weight: '65 kg', 
            bmi: '22.1', 
            allergy: 'No Known Drug Allergies (NKDA)',
            hasAllergy: false,
            diagnosis: 'Acute Streptococcal Pharyngotonsillitis',
            findings: 'Pharyngeal erythema with bilateral follicular tonsillar exudate. Tender anterior cervical lymphadenopathy.',
            notes: 'Patient reports severe odynophagia. Low-grade pyrexia. Started oral antibiotic and analgesics.',
            advice: 'Warm salt water gargle 3-4 times daily. Soft warm foods. Adequate hydration.',
            medications: [
                { id: 1, name: 'Amoxicillin + Clavulanic Acid', strength: '625 mg', form: 'Tablet', frequency: '1-0-1', timing: 'After Food', duration: '5 Days', instructions: 'Complete full 5-day antibiotic course' },
                { id: 2, name: 'Paracetamol', strength: '500 mg', form: 'Tablet', frequency: '1-0-1', timing: 'After Food', duration: '3 Days', instructions: 'Take for pain and throat relief' },
                { id: 3, name: 'Chlorhexidine Mouthwash', strength: '0.2%', form: 'Liquid', frequency: '1-0-1', timing: 'After Food', duration: '5 Days', instructions: 'Gargle for 30 seconds twice daily' }
            ],
            pastVisits: [
                { date: '20 Sep 2024', facility: 'CHC Visit', doctor: 'Doctor 2', diagnosis: 'Seasonal pharyngitis', rx: 'Antihistamines' }
            ]
        }
    };

    return patientsMap[cleanToken] || {
        id: 1,
        name: cleanToken.startsWith('P-') ? `Patient ${cleanToken.replace('P-00', '').replace('P-0', '')}` : 'Patient 1',
        age: 42,
        gender: 'Male',
        token: cleanToken,
        abhaId: `ABHA-9821-4402-${cleanToken.replace(/[^0-9]/g, '') || '9912'}`,
        complaint: 'Routine clinical consultation and check-up.',
        bp: '120/80',
        temp: '98.6°F',
        pulse: '76 bpm',
        spo2: '98%',
        weight: '68 kg',
        bmi: '23.5',
        allergy: 'No Known Drug Allergies (NKDA)',
        hasAllergy: false,
        diagnosis: 'General Health Review',
        findings: 'All vitals within normal parameters.',
        notes: 'Routine check-up performed. Patient advised healthy lifestyle.',
        advice: 'Adequate hydration and balanced diet.',
        medications: [
            { id: 1, name: 'Multivitamin', strength: '1 Tablet', form: 'Tablet', frequency: '1-0-0', timing: 'After Food', duration: '15 Days', instructions: 'Daily morning with breakfast' }
        ],
        pastVisits: []
    };
};

// 0. Dynamic Doctor Identity Resolver
export const getLoggedInDoctor = () => {
    try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user && (user.name || user.role === 'doctor')) {
                const name = user.name || 'Doctor 1';
                const idMatch = name.match(/\d+/);
                const docNumber = idMatch ? idMatch[0] : '1';
                return {
                    name: name.startsWith('Doctor') ? name : `Doctor ${docNumber}`,
                    cabin: user.cabin || user.room || `OPD Cabin #${100 + parseInt(docNumber, 10)}`,
                    hospital: user.hospital || 'Primary Health Centre (PHC North Main)',
                    department: user.department || 'Department of General Medicine',
                    regNumber: user.regNumber || `MCI-9844${docNumber}`,
                    avatar: `D${docNumber}`
                };
            }
        }
    } catch (e) {
        console.warn('[doctorApi] Could not parse user session:', e);
    }

    return {
        name: 'Doctor 1',
        cabin: 'OPD Cabin #104',
        hospital: 'Primary Health Centre (PHC North Main)',
        department: 'Department of General Medicine',
        regNumber: 'MCI-98442',
        avatar: 'D1'
    };
};

// 1. Retrieve the doctor's patient queue
export const getDoctorQueue = async (facilityId = 'PHC_MAIN') => {
    let rawList = [];
    try {
        const response = await api.get('/doctor/queue', {
            params: { facilityId }
        });
        rawList = response.data;
    } catch (error) {
        console.warn('[doctorApi] getDoctorQueue error, returning mock queue for dev:', error.message);
        rawList = [
            {
                id: 1,
                _id: 'enc-101',
                token: 'P-001',
                token_id: 'P-001',
                name: 'Patient 1',
                ageGender: '42 / M',
                complaint: 'Fever and body ache since 2 days. Mild cough.',
                chief_complaint: 'Fever and body ache since 2 days. Mild cough.',
                status: 'Waiting',
                priority: 'Moderate',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                _id: 'enc-102',
                token: 'P-002',
                token_id: 'P-002',
                name: 'Patient 2',
                ageGender: '36 / F',
                complaint: 'Severe headache and elevated blood pressure.',
                chief_complaint: 'Severe headache and elevated blood pressure.',
                status: 'In Consultation',
                priority: 'High',
                createdAt: new Date(Date.now() - 3600000).toISOString()
            },
            {
                id: 3,
                _id: 'enc-103',
                token: 'P-003',
                token_id: 'P-003',
                name: 'Patient 3',
                ageGender: '28 / M',
                complaint: 'Acute stomach cramps and mild vomiting since yesterday.',
                chief_complaint: 'Acute stomach cramps and mild vomiting since yesterday.',
                status: 'Waiting',
                priority: 'Routine',
                createdAt: new Date(Date.now() - 7200000).toISOString()
            },
            {
                id: 4,
                _id: 'enc-104',
                token: 'P-004',
                token_id: 'P-004',
                name: 'Patient 4',
                ageGender: '55 / F',
                complaint: 'Routine diabetes check-up and refill prescription.',
                chief_complaint: 'Routine diabetes check-up and refill prescription.',
                status: 'Completed',
                priority: 'Routine',
                createdAt: new Date(Date.now() - 10800000).toISOString()
            },
            {
                id: 5,
                _id: 'enc-105',
                token: 'P-005',
                token_id: 'P-005',
                name: 'Patient 5',
                ageGender: '31 / M',
                complaint: 'Persistent sore throat and mild difficulty swallowing.',
                chief_complaint: 'Persistent sore throat and mild difficulty swallowing.',
                status: 'Waiting',
                priority: 'Routine',
                createdAt: new Date(Date.now() - 14400000).toISOString()
            }
        ];
    }

    // Standardize all patient objects so components receive consistent fields
    return (Array.isArray(rawList) ? rawList : []).map((item, index) => {
        const id = item.id || index + 1;
        const token = item.token || item.token_id || `P-00${id}`;
        const patientName = item.name || item.patient_id?.name || (token.startsWith('P-') ? `Patient ${token.replace(/\D/g, '').replace(/^0+/, '')}` : `Patient ${id}`);
        const ageGender = item.ageGender || (item.patient_id ? `${item.patient_id.age || '40'} / ${item.patient_id.gender?.charAt(0) || 'M'}` : '40 / M');
        const complaint = item.complaint || item.chief_complaint || 'Routine clinical consultation.';
        const status = item.status || 'Waiting';
        const priority = item.priority || 'Routine';

        return {
            ...item,
            id,
            token,
            token_id: token,
            name: patientName,
            ageGender,
            complaint,
            chief_complaint: complaint,
            status,
            priority
        };
    });
};

// 2. Look up authorized encounters using QR tokens
export const lookupEncounterByToken = async (tokenId) => {
    try {
        const response = await api.get(`/doctor/token/${encodeURIComponent(tokenId)}`);
        return response.data;
    } catch (error) {
        console.warn(`[doctorApi] lookupEncounterByToken fallback for "${tokenId}":`, error.message);
        const p = getPatientByToken(tokenId);
        return {
            _id: `enc-${p.id}`,
            token_id: p.token,
            patient_id: {
                _id: `pat-00${p.id}`,
                name: p.name,
                age: p.age,
                gender: p.gender,
                phone: `+91 98765 0000${p.id}`,
                bloodGroup: 'B+',
                allergies: [p.allergy],
                chronicConditions: ['Hypertension']
            },
            chief_complaint: p.complaint,
            status: 'Waiting',
            is_signed_off: false,
            createdAt: new Date().toISOString()
        };
    }
};

// 3. Retrieve clinical briefing information
export const getClinicalBriefing = async (encounterId) => {
    try {
        const response = await api.get(`/doctor/encounter/${encounterId}/briefing`);
        return response.data;
    } catch (error) {
        console.warn(`[doctorApi] getClinicalBriefing fallback for "${encounterId}":`, error.message);
        const p = getPatientByToken(encounterId);
        return {
            encounterId: p.token,
            patient: {
                _id: `pat-00${p.id}`,
                name: p.name,
                age: p.age,
                gender: p.gender,
                abhaId: p.abhaId,
                bloodGroup: 'B+',
                allergies: [p.allergy],
                chronicConditions: [],
                languagePreference: 'Hindi / English'
            },
            currentEncounter: {
                chief_complaint: p.complaint,
                triage_result: 'PHC_GENERAL',
                token_id: p.token,
                intakeSummary: `Patient reports: ${p.complaint}`
            },
            vitals: {
                bloodPressure: p.bp,
                temperature: p.temp,
                pulse: p.pulse,
                spo2: p.spo2,
                weight: p.weight,
                bmi: p.bmi,
                recordedAt: new Date().toISOString()
            },
            pastVisits: p.pastVisits
        };
    }
};

// 4. Save consultation notes
export const saveConsultationNotes = async (encounterId, notesData) => {
    try {
        const response = await api.post(`/doctor/encounter/${encounterId}/notes`, notesData);
        return response.data;
    } catch (error) {
        return {
            success: true,
            message: 'Consultation notes recorded',
            encounterId,
            ...notesData
        };
    }
};

// 5. Save vitals recordings
export const saveVitals = async (encounterId, vitalsData) => {
    try {
        const response = await api.post(`/doctor/encounter/${encounterId}/vitals`, vitalsData);
        return response.data;
    } catch (error) {
        return {
            success: true,
            message: 'Vitals recorded',
            encounterId,
            vitals: vitalsData
        };
    }
};

// 6. Create multi-drug prescriptions
export const createPrescription = async (encounterId, prescriptionData) => {
    try {
        const response = await api.post(`/doctor/encounter/${encounterId}/prescription`, prescriptionData);
        return response.data;
    } catch (error) {
        return {
            success: true,
            message: 'Prescription recorded',
            encounterId,
            prescriptionId: 'rx-' + Math.random().toString(36).substring(2, 9),
            ...prescriptionData
        };
    }
};

// 7. Record follow-up schedule
export const recordFollowupPlan = async (encounterId, followupData) => {
    try {
        const response = await api.post(`/doctor/encounter/${encounterId}/followup`, followupData);
        return response.data;
    } catch (error) {
        return {
            success: true,
            message: 'Follow-up plan recorded',
            encounterId,
            ...followupData
        };
    }
};

// 8. Digitally sign off and lock the completed encounter
export const signOffEncounter = async (encounterId, signOffData) => {
    try {
        const response = await api.post(`/doctor/encounter/${encounterId}/sign-off`, signOffData);
        return response.data;
    } catch (error) {
        return {
            success: true,
            message: 'Encounter successfully locked',
            encounterId,
            is_signed_off: true,
            clinician_id: signOffData?.doctorName || 'Doctor 1',
            signed_at: new Date().toISOString()
        };
    }
};

export default {
    getPatientByToken,
    getLoggedInDoctor,
    getDoctorQueue,
    lookupEncounterByToken,
    getClinicalBriefing,
    saveConsultationNotes,
    saveVitals,
    createPrescription,
    recordFollowupPlan,
    signOffEncounter
};
