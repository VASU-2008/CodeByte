import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Stethoscope, 
    Save, 
    ArrowRight, 
    ArrowLeft,
    CheckCircle2
} from 'lucide-react';
import { saveConsultationNotes } from '../../../api/doctorApi';

/**
 * ConsultationNotes Component (Aura HealthTech Theme)
 * Clean clinical findings, diagnostic impression, and progress notes.
 */
export default function ConsultationNotes() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const encounterId = params.get('encounterId') || 'P-001';

    const [diagnosis, setDiagnosis] = useState('Acute Viral Upper Respiratory Infection (URTI) with Reactive Myalgia');
    const [clinicalFindings, setClinicalFindings] = useState('Throat congested, tonsils non-enlarged. Clear breath sounds bilaterally, no crepitations. Normal S1/S2 heart sounds. Temperature 101.2°F.');
    const [clinicalNotes, setClinicalNotes] = useState('Patient presents with 2-day history of moderate grade fever, generalized body aches, and dry cough. No respiratory distress or chest pain. Advised oral hydration, rest, and antipyretics.');
    const [lifestyleAdvice, setLifestyleAdvice] = useState('Warm saline gargles twice daily. Adequate fluid intake (2.5L/day). Return if high fever persists >3 days.');
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    const commonDiagnoses = [
        'Acute Viral URTI',
        'Acute Bronchitis',
        'Essential Hypertension',
        'Gastroenteritis',
        'Type 2 Diabetes'
    ];

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            await saveConsultationNotes(encounterId, {
                diagnosis,
                clinicalFindings,
                clinicalNotes,
                lifestyleAdvice
            });
            setSaveStatus('Consultation saved');
            setTimeout(() => setSaveStatus(''), 2500);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleContinue = async () => {
        await handleSave();
        navigate(`/doctor/prescription?encounterId=${encounterId}`);
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
        borderRadius: '10px',
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
            {/* Back button */}
            <button
                onClick={() => navigate(`/doctor/briefing?encounterId=${encounterId}`)}
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
                    marginBottom: '1rem',
                    padding: 0
                }}
            >
                <ArrowLeft size={16} />
                <span>Back to Briefing</span>
            </button>

            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e6f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
                            <Stethoscope size={20} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>
                                Consultation Notes & Findings
                            </h2>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                                Encounter: {encounterId} · Ravi Kumar (42 / M)
                            </p>
                        </div>
                    </div>

                    {saveStatus && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.82rem', fontWeight: '600' }}>
                            <CheckCircle2 size={15} />
                            {saveStatus}
                        </div>
                    )}
                </div>

                {/* Primary Diagnosis */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                        Provisional Clinical Diagnosis
                    </label>
                    <input
                        type="text"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            border: '1.5px solid #044e42',
                            background: '#f8fafc',
                            fontSize: '0.95rem',
                            fontWeight: '700',
                            color: '#0f172a',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                        {commonDiagnoses.map(d => (
                            <button
                                key={d}
                                type="button"
                                onClick={() => setDiagnosis(d)}
                                style={{
                                    background: '#f1f5f9',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '14px',
                                    padding: '0.2rem 0.65rem',
                                    fontSize: '0.74rem',
                                    color: '#475569',
                                    cursor: 'pointer'
                                }}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Physical Examination */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                        Physical Examination & Systemic Findings
                    </label>
                    <textarea
                        rows={3}
                        value={clinicalFindings}
                        onChange={(e) => setClinicalFindings(e.target.value)}
                        style={textareaStyle}
                    />
                </div>

                {/* Doctor's Notes */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                        Doctor's Clinical Notes & Assessment
                    </label>
                    <textarea
                        rows={3}
                        value={clinicalNotes}
                        onChange={(e) => setClinicalNotes(e.target.value)}
                        style={textareaStyle}
                    />
                </div>

                {/* Lifestyle & Dietary Advice */}
                <div style={{ marginBottom: '1.75rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                        Lifestyle & Dietary Guidance
                    </label>
                    <textarea
                        rows={2}
                        value={lifestyleAdvice}
                        onChange={(e) => setLifestyleAdvice(e.target.value)}
                        style={textareaStyle}
                    />
                </div>

                {/* Continue button */}
                <button
                    onClick={handleContinue}
                    disabled={saving}
                    style={{
                        width: '100%',
                        background: '#044e42',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.9rem',
                        borderRadius: '12px',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}
                >
                    Continue to Prescription →
                </button>
            </div>
        </div>
    );
}
