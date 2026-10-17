import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Pill, 
    Trash2, 
    Plus, 
    ArrowLeft, 
    CheckCircle2 
} from 'lucide-react';
import { createPrescription } from '../../../api/doctorApi';

/**
 * PrescriptionBuilder Component (Aura HealthTech Theme)
 * Multi-drug e-Rx prescription editor with crisp white styling and pine teal accents.
 */
export default function PrescriptionBuilder() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const encounterId = params.get('encounterId') || 'P-001';

    const [medications, setMedications] = useState([
        {
            id: 1,
            name: 'Paracetamol',
            strength: '500 mg',
            form: 'Tablet',
            frequency: '1-0-1',
            timing: 'After Food',
            duration: '3 Days',
            instructions: 'Take after meals for fever/body ache'
        },
        {
            id: 2,
            name: 'Cetirizine',
            strength: '10 mg',
            form: 'Tablet',
            frequency: '0-0-1',
            timing: 'Bedtime',
            duration: '5 Days',
            instructions: 'Take 1 tablet at night for mild cough/cold'
        },
        {
            id: 3,
            name: 'Oral Rehydration Salts (ORS)',
            strength: '1 Sachet',
            form: 'Powder',
            frequency: '1-1-1',
            timing: 'With Water',
            duration: '2 Days',
            instructions: 'Mix in 1L clean drinking water and consume throughout day'
        }
    ]);

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
            await createPrescription(encounterId, { medications });
        } catch (e) {
            console.error(e);
        }
        navigate(`/doctor/plan?encounterId=${encounterId}`);
    };

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #eef2f6',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
        padding: '1.75rem',
        marginBottom: '1.5rem'
    };

    const inputStyle = {
        width: '100%',
        padding: '0.65rem 0.85rem',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        background: '#f8fafc',
        fontSize: '0.86rem',
        color: '#1e293b',
        outline: 'none',
        boxSizing: 'border-box'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <button
                onClick={() => navigate(`/doctor/consultation?encounterId=${encounterId}`)}
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
                <span>Back to Consultation Notes</span>
            </button>

            {/* Add Medication Card */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e6f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
                        <Pill size={20} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>
                            Prescription Builder
                        </h2>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                            Add multi-drug items to Patient 1's e-prescription
                        </p>
                    </div>
                </div>

                <form onSubmit={handleAddMed}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
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
                                <option value="1-1-1">1-1-1 (TDS: Morning, Noon, Night)</option>
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
                                background: '#044e42',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.55rem 1.25rem',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '0.84rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem'
                            }}
                        >
                            <Plus size={16} />
                            Add Drug to Rx
                        </button>
                    </div>
                </form>
            </div>

            {/* Prescribed Items Table */}
            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>
                    Current Medications ({medications.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                    {medications.map((m, idx) => (
                        <div
                            key={m.id}
                            style={{
                                background: '#f8fafc',
                                border: '1px solid #f1f5f9',
                                borderRadius: '12px',
                                padding: '0.85rem 1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.92rem' }}>{m.name}</span>
                                    <span style={{ fontSize: '0.75rem', background: '#e6f7f2', color: '#044e42', padding: '0.1rem 0.45rem', borderRadius: '6px', fontWeight: '600' }}>{m.strength}</span>
                                </div>
                                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
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
                    Continue to Plan & Follow-up →
                </button>
            </div>
        </div>
    );
}
