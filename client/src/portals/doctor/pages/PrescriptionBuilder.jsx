import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Pill, 
    Trash2, 
    Plus, 
    Save, 
    ArrowRight, 
    CheckCircle2, 
    AlertTriangle, 
    FileText, 
    Calendar,
    Clock,
    ShieldCheck
} from 'lucide-react';
import { createPrescription, getClinicalBriefing } from '../../../api/doctorApi';
import DrugSelector from '../components/DrugSelector';

/**
 * PrescriptionBuilder Component (Nordic Wellness Glass Theme)
 * Multi-drug e-Rx prescription editor with dosage, timing, duration, and safety checks.
 */
export default function PrescriptionBuilder() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const encounterId = params.get('encounterId') || localStorage.getItem('activeDoctorEncounterId') || 'enc-101';

    const [medications, setMedications] = useState([
        {
            id: 'rx-1',
            name: 'Amlodipine',
            form: 'Tablet',
            dosage: '5mg',
            frequency: '1-0-0',
            timing: 'After Food',
            duration: '30 Days',
            instructions: 'Take 1 tablet every morning after breakfast'
        },
        {
            id: 'rx-2',
            name: 'Metoprolol Succinate',
            form: 'Tablet',
            dosage: '25mg',
            frequency: '1-0-0',
            timing: 'After Food',
            duration: '30 Days',
            instructions: 'Take in the morning. Monitor heart rate.'
        },
        {
            id: 'rx-3',
            name: 'Paracetamol',
            form: 'Tablet',
            dosage: '500mg',
            frequency: 'SOS',
            timing: 'After Food',
            duration: '5 Days',
            instructions: 'Take only if fever or headache exceeds moderate threshold'
        }
    ]);

    const [patientAllergies, setPatientAllergies] = useState(['Penicillin', 'Sulfa drugs']);
    const [generalAdvice, setGeneralAdvice] = useState('Maintain regular hydration. Do not stop blood pressure medication abruptly.');
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        // Fetch patient allergies to pass to DrugSelector
        const fetchPatientInfo = async () => {
            try {
                const data = await getClinicalBriefing(encounterId);
                if (data?.patient?.allergies) {
                    setPatientAllergies(data.patient.allergies);
                }
            } catch (err) {
                console.warn('Could not fetch allergies for prescription builder:', err);
            }
        };
        fetchPatientInfo();
    }, [encounterId]);

    const handleAddDrug = (newDrug) => {
        setMedications(prev => [...prev, newDrug]);
        setSaveStatus(`Added ${newDrug.name} to prescription`);
        setTimeout(() => setSaveStatus(''), 2500);
    };

    const handleRemoveDrug = (drugId) => {
        setMedications(prev => prev.filter(m => m.id !== drugId));
    };

    const handleSavePrescription = async () => {
        if (medications.length === 0) {
            alert('Please add at least one medication before saving the prescription.');
            return false;
        }

        setSaving(true);
        try {
            await createPrescription(encounterId, {
                medications,
                generalAdvice,
                prescribedAt: new Date().toISOString()
            });
            setSaveStatus('Prescription saved successfully');
            setTimeout(() => setSaveStatus(''), 3000);
            return true;
        } catch (err) {
            console.error('Failed to create prescription:', err);
            return false;
        } finally {
            setSaving(false);
        }
    };

    const handleProceedToPlan = async () => {
        const saved = await handleSavePrescription();
        if (saved) {
            navigate(`/doctor/plan?encounterId=${encounterId}`);
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

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', background: '#ccfbf1', color: '#0f766e', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: '700', display: 'inline-block' }}>
                        ENCOUNTER #{encounterId}
                    </div>
                    <h1 style={{ margin: '0.4rem 0 0 0', fontSize: '1.65rem', fontWeight: '800', color: '#0f172a' }}>
                        Multi-Drug e-Rx Prescription Builder
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
                        onClick={handleSavePrescription}
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
                        {saving ? 'Saving...' : 'Save e-Rx Draft'}
                    </button>
                    <button
                        type="button"
                        onClick={handleProceedToPlan}
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
                        Plan & Follow-up
                        <ArrowRight size={17} />
                    </button>
                </div>
            </div>

            {/* Drug Selection Component */}
            <div style={{ marginBottom: '1.5rem' }}>
                <DrugSelector onAddDrug={handleAddDrug} patientAllergies={patientAllergies} />
            </div>

            {/* Active Prescription Table / Cart */}
            <div style={glassCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f766e' }}>
                            <Pill size={20} />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: '700' }}>
                                Prescribed Medications ({medications.length})
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#0f766e' }}>
                                Review dosages and instructions before digital lock
                            </p>
                        </div>
                    </div>
                </div>

                {medications.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                        No medications added yet. Use the selector above to build the e-prescription.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        {medications.map((med, index) => (
                            <div
                                key={med.id || index}
                                style={{
                                    border: '1px solid #ccfbf1',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    background: 'rgba(240, 253, 250, 0.55)',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '240px' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: '#0f766e',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '700',
                                        fontSize: '0.85rem'
                                    }}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
                                                {med.name}
                                            </h4>
                                            <span style={{ fontSize: '0.75rem', background: '#ccfbf1', color: '#0f766e', padding: '0.1rem 0.5rem', borderRadius: '10px', fontWeight: '600' }}>
                                                {med.dosage} · {med.form || 'Tablet'}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.25rem' }}>
                                            <strong>Schedule:</strong> {med.frequency} · <strong>Timing:</strong> {med.timing} · <strong>Duration:</strong> {med.duration}
                                        </div>
                                        <div style={{ fontSize: '0.78rem', color: '#0f766e', marginTop: '0.2rem', fontStyle: 'italic' }}>
                                            "{med.instructions}"
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleRemoveDrug(med.id)}
                                    style={{
                                        background: '#fee2e2',
                                        border: '1px solid #fecaca',
                                        color: '#b91c1c',
                                        padding: '0.45rem 0.75rem',
                                        borderRadius: '8px',
                                        fontSize: '0.78rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.35rem'
                                    }}
                                >
                                    <Trash2 size={14} />
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Additional Patient Dietary / Medical Advice */}
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid #ccfbf1', paddingTop: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#134e4a', marginBottom: '0.4rem' }}>
                        General Pharmacy & Adherence Advice
                    </label>
                    <textarea
                        rows={2}
                        value={generalAdvice}
                        onChange={(e) => setGeneralAdvice(e.target.value)}
                        placeholder="Instructions for pharmacist or general adherence guidance..."
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            border: '1px solid #ccfbf1',
                            background: '#f0fdfa',
                            fontSize: '0.88rem',
                            color: '#0f172a',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
