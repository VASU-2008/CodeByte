import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Stethoscope, 
    ArrowRight, 
    ArrowLeft,
    CheckCircle2,
    Sparkles,
    User
} from 'lucide-react';
import { saveConsultationNotes, getPatientByToken, getActiveSessionToken } from '../../../api/doctorApi';

/**
 * ConsultationNotes Component (Simple, Clean & Dynamic)
 * Streamlined clinician notes interface with dynamic patient banner and quick diagnostic chips.
 */
export default function ConsultationNotes() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const rawToken = params.get('encounterId') || getActiveSessionToken();
    const encounterId = rawToken.includes('/') ? rawToken.split('/').pop() : rawToken;

    const patient = getPatientByToken(encounterId);

    const [diagnosis, setDiagnosis] = useState(() => patient.diagnosis || 'Acute Viral URTI with Reactive Myalgia');
    const [clinicalFindings, setClinicalFindings] = useState(() => patient.findings || 'Throat congested, tonsils non-enlarged. Clear breath sounds bilaterally.');
    const [clinicalNotes, setClinicalNotes] = useState(() => patient.notes || 'Patient presents with symptoms for 2 days. Prescribed supportive care.');
    const [lifestyleAdvice, setLifestyleAdvice] = useState(() => patient.advice || 'Adequate hydration and rest.');
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        if (patient) {
            setDiagnosis(patient.diagnosis || 'Acute Viral URTI');
            setClinicalFindings(patient.findings || 'Clear breath sounds bilaterally.');
            setClinicalNotes(patient.notes || 'Consultation notes recorded.');
            setLifestyleAdvice(patient.advice || 'Adequate hydration and rest.');
        }
    }, [encounterId]);

    const quickDiagnoses = [
        'Acute Viral URTI',
        'Acute Bronchitis',
        'Essential Hypertension',
        'Type 2 Diabetes',
        'Gastroenteritis'
    ];

    const handleContinue = async () => {
        setSaving(true);
        try {
            await saveConsultationNotes(patient.token, {
                diagnosis,
                clinicalFindings,
                clinicalNotes,
                lifestyleAdvice
            });
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
        navigate(`/doctor/prescription?encounterId=${patient.token}`);
    };

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #eef2f6',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
        padding: '1.75rem',
        marginBottom: '1.5rem'
    };

    const textareaStyle = {
        width: '100%',
        padding: '0.85rem 1rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        background: '#f8fafc',
        fontSize: '0.9rem',
        color: '#1e293b',
        outline: 'none',
        boxSizing: 'border-box',
        lineHeight: '1.5',
        fontFamily: 'inherit'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Top Bar: Back & Patient Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button
                    onClick={() => navigate(`/doctor/briefing?encounterId=${patient.token}`)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        fontSize: '0.88rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        padding: 0
                    }}
                >
                    <ArrowLeft size={16} />
                    <span>Back to Briefing</span>
                </button>

                {/* Patient Name at Top Right */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    background: '#f1f5f9',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '20px',
                    fontSize: '0.84rem',
                    fontWeight: '700',
                    color: '#0f172a',
                    border: '1px solid #e2e8f0'
                }}>
                    <User size={15} color="#044e42" />
                    <span>Patient: <strong>{patient.name}</strong> ({patient.age} / {patient.gender === 'Female' ? 'F' : 'M'}) · Token: <strong>{patient.token}</strong></span>
                </div>
            </div>

            <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e6f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
                        <Stethoscope size={20} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                            Consultation Notes & Clinical Impression
                        </h2>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                            Record primary diagnosis, physical findings, and medical advice
                        </p>
                    </div>
                </div>

                {/* Primary Diagnosis with Quick Tag Chips */}
                <div style={{ marginBottom: '1.35rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.45rem' }}>
                        Provisional Clinical Diagnosis
                    </label>
                    <input
                        type="text"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '12px',
                            border: '1.5px solid #044e42',
                            background: '#f8fafc',
                            fontSize: '0.95rem',
                            fontWeight: '700',
                            color: '#0f172a',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                    <div style={{ display: 'flex', gap: '0.45rem', marginTop: '0.55rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', alignSelf: 'center' }}>Quick Select:</span>
                        {quickDiagnoses.map(d => (
                            <button
                                key={d}
                                type="button"
                                onClick={() => setDiagnosis(d)}
                                style={{
                                    background: diagnosis === d ? '#e6f7f2' : '#f1f5f9',
                                    border: diagnosis === d ? '1px solid #044e42' : '1px solid #e2e8f0',
                                    color: diagnosis === d ? '#044e42' : '#475569',
                                    borderRadius: '16px',
                                    padding: '0.2rem 0.65rem',
                                    fontSize: '0.74rem',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                }}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Physical Examination Findings */}
                <div style={{ marginBottom: '1.35rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.45rem' }}>
                        Physical Examination & Systemic Findings
                    </label>
                    <textarea
                        rows={3}
                        value={clinicalFindings}
                        onChange={(e) => setClinicalFindings(e.target.value)}
                        placeholder="Chest sounds, throat, abdomen, pulse regular..."
                        style={textareaStyle}
                    />
                </div>

                {/* Clinical Assessment Notes */}
                <div style={{ marginBottom: '1.35rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.45rem' }}>
                        Doctor's Clinical Notes
                    </label>
                    <textarea
                        rows={3}
                        value={clinicalNotes}
                        onChange={(e) => setClinicalNotes(e.target.value)}
                        placeholder="Clinical summary and assessment..."
                        style={textareaStyle}
                    />
                </div>

                {/* Patient Lifestyle Advice */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.45rem' }}>
                        Patient Advice & Lifestyle Recommendations
                    </label>
                    <textarea
                        rows={2}
                        value={lifestyleAdvice}
                        onChange={(e) => setLifestyleAdvice(e.target.value)}
                        placeholder="Dietary instructions, hydration, rest..."
                        style={textareaStyle}
                    />
                </div>

                {/* Big Clean Action Button */}
                <button
                    onClick={handleContinue}
                    disabled={saving}
                    style={{
                        width: '100%',
                        background: '#044e42',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.95rem',
                        borderRadius: '12px',
                        fontWeight: '800',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 14px rgba(4, 78, 66, 0.25)'
                    }}
                >
                    Continue to Prescription →
                </button>
            </div>
        </div>
    );
}
