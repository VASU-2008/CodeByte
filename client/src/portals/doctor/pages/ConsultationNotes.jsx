import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Stethoscope, 
    FileEdit, 
    Save, 
    ArrowRight, 
    Sparkles, 
    CheckCircle2, 
    AlertCircle, 
    ShieldAlert, 
    Tag,
    HeartPulse
} from 'lucide-react';
import { saveConsultationNotes, saveVitals } from '../../../api/doctorApi';
import VitalsForm from '../components/VitalsForm';

/**
 * ConsultationNotes Component (Nordic Wellness Glass Theme)
 * Real-time clinician examination findings, differential diagnosis, and clinical notes.
 */
export default function ConsultationNotes() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const encounterId = params.get('encounterId') || localStorage.getItem('activeDoctorEncounterId') || 'enc-101';

    const [diagnosis, setDiagnosis] = useState('Essential Hypertension (Stage 2) with Exertional Angina');
    const [clinicalFindings, setClinicalFindings] = useState('Clear breath sounds bilaterally. S1/S2 heard normal, no murmurs. Mild epigastric tenderness. No pedal edema.');
    const [clinicalNotes, setClinicalNotes] = useState('Patient reports episodic substernal pressure for the past 48 hours, precipitated by stair climbing and relieved by rest. Blood pressure remains elevated despite baseline Amlodipine regimen. Instructed on warning symptoms.');
    const [lifestyleAdvice, setLifestyleAdvice] = useState('Strict low-salt diet (<2g/day). Avoid sudden strenuous physical exertion. Maintain blood pressure log twice daily.');
    const [isEmergencyFlagged, setIsEmergencyFlagged] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');
    const [saving, setSaving] = useState(false);

    // Common quick diagnosis chips
    const commonDiagnoses = [
        'Essential Hypertension',
        'Type 2 Diabetes Mellitus',
        'Acute Bronchitis',
        'Gastroenteritis',
        'Viral Upper Respiratory Infection',
        'Stable Angina Pectoris',
        'Osteoarthritis'
    ];

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                diagnosis,
                clinicalFindings,
                clinicalNotes,
                lifestyleAdvice,
                isEmergencyFlagged,
                recordedAt: new Date().toISOString()
            };
            await saveConsultationNotes(encounterId, payload);
            setSaveStatus('Consultation notes saved successfully');
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (err) {
            console.error('Failed to save consultation notes:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleProceedToRx = async () => {
        await handleSave();
        navigate(`/doctor/prescription?encounterId=${encounterId}`);
    };

    const handleVitalsSave = async (newVitals) => {
        try {
            await saveVitals(encounterId, newVitals);
            setSaveStatus('Vitals successfully updated in record');
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (err) {
            console.error('Failed to save vitals in consultation:', err);
        }
    };

    const glassCardStyle = {
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(20, 184, 166, 0.2)',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 10px 30px rgba(15, 118, 110, 0.05)',
        marginBottom: '1.5rem'
    };

    const textareaStyle = {
        width: '100%',
        padding: '0.85rem 1rem',
        borderRadius: '12px',
        border: '1px solid #ccfbf1',
        background: '#f0fdfa',
        fontSize: '0.92rem',
        color: '#0f172a',
        outline: 'none',
        boxSizing: 'border-box',
        lineHeight: '1.5',
        fontFamily: 'inherit'
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', background: '#ccfbf1', color: '#0f766e', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: '700', display: 'inline-block' }}>
                        ENCOUNTER #{encounterId}
                    </div>
                    <h1 style={{ margin: '0.4rem 0 0 0', fontSize: '1.65rem', fontWeight: '800', color: '#0f172a' }}>
                        Doctor Consultation & Clinical Findings
                    </h1>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    {saveStatus && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.85rem', fontWeight: '600' }}>
                            <CheckCircle2 size={16} />
                            {saveStatus}
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            background: '#ffffff',
                            border: '1px solid #ccfbf1',
                            color: '#0f766e',
                            padding: '0.7rem 1.25rem',
                            borderRadius: '10px',
                            fontWeight: '600',
                            fontSize: '0.88rem',
                            cursor: 'pointer'
                        }}
                    >
                        <Save size={16} />
                        {saving ? 'Saving...' : 'Save Draft'}
                    </button>
                    <button
                        type="button"
                        onClick={handleProceedToRx}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.7rem 1.4rem',
                            borderRadius: '10px',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(15, 118, 110, 0.25)'
                        }}
                    >
                        Proceed to e-Rx
                        <ArrowRight size={17} />
                    </button>
                </div>
            </div>

            {/* Live Consultation Vitals */}
            <div style={{ marginBottom: '1.5rem' }}>
                <VitalsForm 
                    initialVitals={{ bloodPressureSys: 148, bloodPressureDia: 92, heartRate: 88, spo2: 96, temperature: 98.6, weightKg: 74 }}
                    onSave={handleVitalsSave} 
                />
            </div>

            {/* Diagnosis & Examination Section */}
            <div style={glassCardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f766e' }}>
                        <Stethoscope size={20} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: '700' }}>Provisional Clinical Diagnosis</h3>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#0f766e' }}>Primary diagnostic impression and ICD categorization</p>
                    </div>
                </div>

                {/* Primary Diagnosis Input */}
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="e.g. Essential Hypertension, Acute Bronchitis..."
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            borderRadius: '10px',
                            border: '1.5px solid #14b8a6',
                            background: '#f0fdfa',
                            fontSize: '1.05rem',
                            fontWeight: '700',
                            color: '#0f172a',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                {/* Quick Diagnosis Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', alignSelf: 'center', marginRight: '0.3rem' }}>Quick select:</span>
                    {commonDiagnoses.map((d, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setDiagnosis(d)}
                            style={{
                                background: '#f1f5f9',
                                border: '1px solid #cbd5e1',
                                borderRadius: '16px',
                                padding: '0.25rem 0.65rem',
                                fontSize: '0.75rem',
                                color: '#334155',
                                cursor: 'pointer'
                            }}
                        >
                            {d}
                        </button>
                    ))}
                </div>

                {/* Physical Examination Findings */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#134e4a', marginBottom: '0.4rem' }}>
                        Physical Examination & Systemic Findings
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Record findings: CVS, Respiratory, Abdominal, CNS, ENT..."
                        value={clinicalFindings}
                        onChange={(e) => setClinicalFindings(e.target.value)}
                        style={textareaStyle}
                    />
                </div>

                {/* Clinical Notes & Progression */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#134e4a', marginBottom: '0.4rem' }}>
                        Doctor's Clinical Notes & Assessment
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Detailed clinical evaluation, risk assessment, differential notes..."
                        value={clinicalNotes}
                        onChange={(e) => setClinicalNotes(e.target.value)}
                        style={textareaStyle}
                    />
                </div>

                {/* Dietary & Lifestyle Advice */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#134e4a', marginBottom: '0.4rem' }}>
                        Patient Advice & Lifestyle Modifications
                    </label>
                    <textarea
                        rows={2}
                        placeholder="Dietary precautions, hydration advice, physical activity guidance..."
                        value={lifestyleAdvice}
                        onChange={(e) => setLifestyleAdvice(e.target.value)}
                        style={textareaStyle}
                    />
                </div>

                {/* Red Flag Emergency Escalation Checkbox */}
                <div style={{
                    background: isEmergencyFlagged ? '#fee2e2' : '#f8fafc',
                    border: isEmergencyFlagged ? '1px solid #fecaca' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <input
                        type="checkbox"
                        id="emergencyFlag"
                        checked={isEmergencyFlagged}
                        onChange={(e) => setIsEmergencyFlagged(e.target.checked)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <label htmlFor="emergencyFlag" style={{ fontSize: '0.84rem', color: isEmergencyFlagged ? '#b91c1c' : '#334155', fontWeight: '600', cursor: 'pointer' }}>
                        Flag for Coordinator Priority Alert (Trigger Emergency Protocol / 112 Bypass)
                    </label>
                </div>
            </div>
        </div>
    );
}
