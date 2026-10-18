import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Lock, 
    ShieldCheck, 
    ArrowLeft, 
    Printer, 
    User, 
    CheckCircle2, 
    Calendar, 
    Stethoscope, 
    FileCheck 
} from 'lucide-react';
import { signOffEncounter, getPatientByToken, getLoggedInDoctor, getActiveSessionToken } from '../../../api/doctorApi';

/**
 * SignOffHandoff Component (Clean, Focused & Dynamic Patient Info)
 */
export default function SignOffHandoff() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const rawToken = params.get('encounterId') || getActiveSessionToken();
    const encounterId = rawToken.includes('/') ? rawToken.split('/').pop() : rawToken;

    const patient = getPatientByToken(encounterId);
    const activeDoctor = getLoggedInDoctor();

    const [doctorName, setDoctorName] = useState(() => activeDoctor.name || 'Doctor 1');
    const [regNumber, setRegNumber] = useState(() => activeDoctor.regNumber || 'MCI-98442');
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
            await signOffEncounter(patient.token, { doctorName, regNumber });
            setSigned(true);
        } catch (err) {
            console.error(err);
        } finally {
            setSigning(false);
        }
    };

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '24px',
        border: '1px solid rgba(148, 163, 184, 0.25)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
        padding: '1.75rem',
        marginBottom: '1.5rem'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Top Bar: Back & Patient Badge at Top Right */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button
                    onClick={() => navigate(`/doctor/plan?encounterId=${patient.token}`)}
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
                    <span>Back to Plan & Follow-up</span>
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

            {signed ? (
                /* Post Sign-off Success Screen */
                <div style={cardStyle}>
                    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                        <div style={{
                            width: '68px',
                            height: '68px',
                            borderRadius: '50%',
                            background: '#eff6ff',
                            color: '#2563eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.25rem auto'
                        }}>
                            <ShieldCheck size={38} />
                        </div>
                        <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>
                            Clinical Record Signed & Permanently Locked
                        </h2>
                        <p style={{ margin: '0.4rem 0 1.5rem 0', fontSize: '0.88rem', color: '#64748b' }}>
                            Encounter #{patient.token} · <strong>{patient.name}</strong> has been committed to permanent health record.
                        </p>

                        <div style={{
                            maxWidth: '480px',
                            margin: '0 auto 1.75rem auto',
                            background: '#f8fafc',
                            borderRadius: '16px',
                            padding: '1.25rem',
                            border: '1px solid rgba(148, 163, 184, 0.25)',
                            fontSize: '0.84rem',
                            color: '#334155',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.4rem'
                        }}>
                            <div><strong>Attending Clinician:</strong> Doctor 1 (Reg: MCI-98442)</div>
                            <div><strong>Signed Timestamp:</strong> {new Date().toLocaleString()}</div>
                            <div><strong>Audit Status:</strong> Sealed (Tamper-Proof)</div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button
                                onClick={() => window.print()}
                                style={{
                                    background: '#ffffff',
                                    border: '1.5px solid #bfdbfe',
                                    padding: '0.75rem 1.45rem',
                                    borderRadius: '16px',
                                    fontWeight: '600',
                                    fontSize: '0.88rem',
                                    color: '#2563eb',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                                }}
                            >
                                <Printer size={16} />
                                Print e-Rx Summary
                            </button>
                            <button
                                onClick={() => navigate('/doctor/queue')}
                                style={{
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '0.75rem 1.6rem',
                                    borderRadius: '16px',
                                    fontWeight: '600',
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)'
                                }}
                            >
                                Return to Patient Queue
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* Pre Sign-off Form */
                <form onSubmit={handleSignOff}>
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#edf2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                                <Lock size={20} />
                            </div>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                                    Clinical Sign-Off & Lock
                                </h2>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                                    Review consultation summary and affirm statutory clinician digital signature
                                </p>
                            </div>
                        </div>

                        {/* Summary breakdown */}
                        <div style={{
                            background: '#f8fafc',
                            borderRadius: '14px',
                            padding: '1.25rem',
                            border: '1px solid #eef2f6',
                            marginBottom: '1.5rem',
                            fontSize: '0.88rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.65rem'
                        }}>
                            <div>
                                <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '700' }}>DIAGNOSIS: </span>
                                <strong>{patient.diagnosis}</strong>
                            </div>
                            <div>
                                <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '700' }}>VITALS: </span>
                                <span>BP: {patient.bp} mmHg · Temp: {patient.temp} · Pulse: {patient.pulse} · SpO2: {patient.spo2}</span>
                            </div>
                            <div>
                                <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '700' }}>PRESCRIPTION: </span>
                                <span>{patient.medications?.map(m => m.name).join(', ') || 'Standard Clinical Formulary'}</span>
                            </div>
                            <div>
                                <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '700' }}>NEXT FOLLOW-UP: </span>
                                <span>In 5 Days · Review symptoms and clinical recovery</span>
                            </div>
                        </div>

                        {/* Clinician inputs */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
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
                                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
                                    Medical Registration Number
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

                        {/* Affirmation checkbox */}
                        <div style={{
                            background: '#f8fafc',
                            border: '1px solid #eef2f6',
                            borderRadius: '12px',
                            padding: '1rem',
                            marginBottom: '1.75rem'
                        }}>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={affirmation}
                                    onChange={(e) => setAffirmation(e.target.checked)}
                                    style={{ width: '18px', height: '18px', marginTop: '2px', cursor: 'pointer', accentColor: '#2563eb' }}
                                />
                                <span style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.45' }}>
                                    I hereby confirm that I have evaluated the clinical findings, provisional diagnosis, e-prescription, and follow-up plan for <strong>{patient.name}</strong>. By submitting, I affix my digital signature to permanently seal this encounter.
                                </span>
                            </label>
                        </div>

                        {/* Sign Off Button */}
                        <button
                            type="submit"
                            disabled={signing || !affirmation}
                            style={{
                                width: '100%',
                                background: affirmation ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : '#94a3b8',
                                color: '#ffffff',
                                border: 'none',
                                padding: '1rem',
                                borderRadius: '20px',
                                fontWeight: '600',
                                fontSize: '0.96rem',
                                cursor: affirmation ? 'pointer' : 'not-allowed',
                                boxShadow: affirmation ? '0 4px 14px rgba(59, 130, 246, 0.35)' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            <FileCheck size={18} />
                            {signing ? 'Sealing Clinical Record...' : 'Digitally Sign Off & Lock Encounter'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
