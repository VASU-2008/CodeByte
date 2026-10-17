import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Lock, 
    ShieldCheck, 
    ArrowLeft, 
    Printer 
} from 'lucide-react';
import { signOffEncounter } from '../../../api/doctorApi';

/**
 * SignOffHandoff Component (Aura HealthTech Theme)
 * Digital sign-off, encounter locking, and handoff receipt in crisp white aesthetic.
 */
export default function SignOffHandoff() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const encounterId = params.get('encounterId') || 'P-001';

    const [doctorName, setDoctorName] = useState('Dr. Shreyas');
    const [regNumber, setRegNumber] = useState('MCI-98442');
    const [affirmation, setAffirmation] = useState(false);
    const [signed, setSigned] = useState(false);
    const [signing, setSigning] = useState(false);

    const handleSignOff = async (e) => {
        e.preventDefault();
        if (!affirmation) {
            alert('Please check the digital signature affirmation.');
            return;
        }

        setSigning(true);
        try {
            await signOffEncounter(encounterId, { doctorName, regNumber });
            setSigned(true);
        } catch (err) {
            console.error(err);
        } finally {
            setSigning(false);
        }
    };

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #eef2f6',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
        padding: '1.75rem',
        marginBottom: '1.5rem'
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <button
                onClick={() => navigate(`/doctor/plan?encounterId=${encounterId}`)}
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
                <span>Back to Plan & Follow-up</span>
            </button>

            {signed ? (
                <div style={cardStyle}>
                    <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: '#e6f7f2',
                            color: '#044e42',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.25rem auto'
                        }}>
                            <ShieldCheck size={36} />
                        </div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800', color: '#0f172a' }}>
                            Encounter Signed & Locked
                        </h2>
                        <p style={{ margin: '0.4rem 0 1.5rem 0', fontSize: '0.86rem', color: '#64748b' }}>
                            Encounter #{encounterId} · Ravi Kumar has been committed to permanent clinical record.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button
                                onClick={() => window.print()}
                                style={{
                                    background: '#ffffff',
                                    border: '1px solid #e2e8f0',
                                    padding: '0.65rem 1.25rem',
                                    borderRadius: '10px',
                                    fontWeight: '600',
                                    fontSize: '0.88rem',
                                    color: '#0f172a',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem'
                                }}
                            >
                                <Printer size={16} />
                                Print e-Rx Summary
                            </button>
                            <button
                                onClick={() => navigate('/doctor/dashboard')}
                                style={{
                                    background: '#044e42',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '0.65rem 1.35rem',
                                    borderRadius: '10px',
                                    fontWeight: '700',
                                    fontSize: '0.88rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Return to Patient Queue
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSignOff}>
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e6f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
                                <Lock size={20} />
                            </div>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>
                                    Sign Off & Encounter Lock
                                </h2>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                                    Encounter: {encounterId} · Ravi Kumar (42 / M)
                                </p>
                            </div>
                        </div>

                        {/* Summary breakdown */}
                        <div style={{
                            background: '#f8fafc',
                            borderRadius: '12px',
                            padding: '1rem',
                            border: '1px solid #f1f5f9',
                            marginBottom: '1.5rem',
                            fontSize: '0.86rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <div><strong>Diagnosis:</strong> Acute Viral URTI with Reactive Myalgia</div>
                            <div><strong>Vitals:</strong> BP 120/80 mmHg · Temp 101.2°F · Pulse 98 bpm · SpO2 97%</div>
                            <div><strong>Prescription:</strong> Paracetamol 500mg, Cetirizine 10mg, ORS</div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                                    Attending Clinician
                                </label>
                                <input
                                    type="text"
                                    value={doctorName}
                                    onChange={(e) => setDoctorName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '10px',
                                        border: '1px solid #e2e8f0',
                                        background: '#f8fafc',
                                        fontSize: '0.9rem',
                                        color: '#1e293b',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                                    Registration Number
                                </label>
                                <input
                                    type="text"
                                    value={regNumber}
                                    onChange={(e) => setRegNumber(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '10px',
                                        border: '1px solid #e2e8f0',
                                        background: '#f8fafc',
                                        fontSize: '0.9rem',
                                        color: '#1e293b',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.75rem' }}>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={affirmation}
                                    onChange={(e) => setAffirmation(e.target.checked)}
                                    style={{ marginTop: '2px' }}
                                />
                                <span style={{ fontSize: '0.84rem', color: '#475569', lineHeight: '1.45' }}>
                                    I hereby confirm that I have reviewed the consultation notes, vitals, and e-prescription. Affixing my digital signature permanently seals this clinical encounter.
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={signing || !affirmation}
                            style={{
                                width: '100%',
                                background: affirmation ? '#044e42' : '#94a3b8',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.9rem',
                                borderRadius: '12px',
                                fontWeight: '700',
                                fontSize: '0.95rem',
                                cursor: affirmation ? 'pointer' : 'not-allowed'
                            }}
                        >
                            {signing ? 'Sealing Record...' : 'Sign Off & Permanently Lock'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
