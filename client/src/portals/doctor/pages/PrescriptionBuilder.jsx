import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Pill, 
    Trash2, 
    Plus, 
    ArrowLeft, 
    User,
    CheckCircle2,
    Calendar,
    Clock
} from 'lucide-react';
import { createPrescription, getPatientByToken, getActiveSessionToken } from '../../../api/doctorApi';

/**
 * PrescriptionBuilder Component (Clean, Simple & Dynamic)
 * Multi-drug e-Rx prescription editor with dynamic patient badge and dosage builder.
 */
export default function PrescriptionBuilder() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const rawToken = params.get('encounterId') || getActiveSessionToken();
    const encounterId = rawToken.includes('/') ? rawToken.split('/').pop() : rawToken;

    const patient = getPatientByToken(encounterId);

    const [medications, setMedications] = useState(() => patient.medications || [
        {
            id: 1,
            name: 'Paracetamol',
            strength: '500 mg',
            form: 'Tablet',
            frequency: '1-0-1',
            timing: 'After Food',
            duration: '3 Days',
            instructions: 'Take after meals for fever/body ache'
        }
    ]);

    useEffect(() => {
        if (patient && patient.medications) {
            setMedications(patient.medications);
        }
    }, [encounterId]);

    const [newMed, setNewMed] = useState({
        name: '',
        strength: '500 mg',
        frequency: '1-0-1',
        timing: 'After Food',
        duration: '5 Days',
        instructions: ''
    });

    const handleAddMed = (e) => {
        e.preventDefault();
        if (!newMed.name.trim()) return;
        setMedications(prev => [...prev, { id: Date.now(), ...newMed, form: 'Tablet' }]);
        setNewMed({
            name: '',
            strength: '500 mg',
            frequency: '1-0-1',
            timing: 'After Food',
            duration: '5 Days',
            instructions: ''
        });
    };

    const handleRemoveMed = (id) => {
        setMedications(prev => prev.filter(m => m.id !== id));
    };

    const handleContinue = async () => {
        try {
            await createPrescription(patient.token, { medications });
        } catch (e) {
            console.error(e);
        }
        navigate(`/doctor/plan?encounterId=${patient.token}`);
    };

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
        padding: '1.5rem',
        marginBottom: '1.25rem'
    };

    const inputStyle = {
        width: '100%',
        padding: '0.65rem 0.85rem',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        background: '#ffffff',
        fontSize: '0.86rem',
        color: '#0f172a',
        outline: 'none',
        boxSizing: 'border-box'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Top Bar: Back & Patient Badge at Top Right */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button
                    onClick={() => navigate(`/doctor/consultation?encounterId=${patient.token}`)}
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
                    <span>Back to Consultation Notes</span>
                </button>

                {/* Patient's Name at Top Right */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    background: '#e0e7ff',
                    padding: '0.4rem 0.95rem',
                    borderRadius: '20px',
                    fontSize: '0.84rem',
                    fontWeight: '600',
                    color: '#0f172a',
                    border: '1px solid #bfdbfe'
                }}>
                    <User size={15} color="#2563eb" />
                    <span>Patient: <strong>{patient.name}</strong> ({patient.age} / {patient.gender === 'Female' ? 'F' : 'M'}) · Token: <strong style={{ color: '#2563eb' }}>{patient.token}</strong></span>
                </div>
            </div>

            {/* Add Medication Card */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#edf2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                        <Pill size={20} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                            Prescription Builder
                        </h2>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                            Add items to {patient.name}'s digital prescription
                        </p>
                    </div>
                </div>

                <form onSubmit={handleAddMed}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '0.3rem' }}>Medication Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Amoxicillin, Azithromycin"
                                value={newMed.name}
                                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '0.3rem' }}>Dosage / Strength</label>
                            <input
                                type="text"
                                placeholder="e.g. 500 mg, 5 mg"
                                value={newMed.strength}
                                onChange={(e) => setNewMed({ ...newMed, strength: e.target.value })}
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '0.3rem' }}>Frequency</label>
                            <select
                                value={newMed.frequency}
                                onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                                style={inputStyle}
                            >
                                <option value="1-0-1">1-0-1 (Morning & Night)</option>
                                <option value="1-0-0">1-0-0 (Morning only)</option>
                                <option value="1-1-1">1-1-1 (Morning, Noon, Night)</option>
                                <option value="0-0-1">0-0-1 (Night only)</option>
                                <option value="SOS">SOS (As needed)</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '0.3rem' }}>Food Timing</label>
                            <select
                                value={newMed.timing}
                                onChange={(e) => setNewMed({ ...newMed, timing: e.target.value })}
                                style={inputStyle}
                            >
                                <option value="After Food">After Food</option>
                                <option value="Before Food">Before Food</option>
                                <option value="With Food">With Food</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '0.3rem' }}>Duration</label>
                            <select
                                value={newMed.duration}
                                onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
                                style={inputStyle}
                            >
                                <option value="3 Days">3 Days</option>
                                <option value="5 Days">5 Days</option>
                                <option value="7 Days">7 Days</option>
                                <option value="14 Days">14 Days</option>
                                <option value="30 Days">30 Days</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            type="submit"
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.65rem 1.4rem',
                                borderRadius: '16px',
                                fontWeight: '600',
                                fontSize: '0.84rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            <Plus size={16} />
                            Add Drug to Rx
                        </button>
                    </div>
                </form>
            </div>

            {/* Active Prescribed Items Table */}
            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>
                    Prescribed Medications ({medications.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                    {medications.map((m, idx) => (
                        <div
                            key={m.id}
                            style={{
                                background: '#f8fafc',
                                border: '1px solid rgba(148, 163, 184, 0.25)',
                                borderRadius: '16px',
                                padding: '0.9rem 1.15rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.95rem' }}>{m.name}</span>
                                    <span style={{ fontSize: '0.75rem', background: '#e0e7ff', color: '#2563eb', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: '600', border: '1px solid #bfdbfe' }}>
                                        {m.strength}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.25rem' }}>
                                    {m.frequency} · {m.timing} · {m.duration}
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveMed(m.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#ef4444',
                                    cursor: 'pointer',
                                    padding: '0.4rem'
                                }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleContinue}
                    style={{
                        width: '100%',
                        background: '#0284c7',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 1px 2px rgba(2, 132, 199, 0.2)',
                        transition: 'all 0.15s ease'
                    }}
                >
                    Continue to Plan & Follow-up →
                </button>
            </div>
        </div>
    );
}
