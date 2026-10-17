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
import { signOffEncounter, getPatientByToken, getLoggedInDoctor } from '../../../api/doctorApi';

/**
 * SignOffHandoff Component (Clean, Focused & Dynamic Patient Info)
 */
export default function SignOffHandoff() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const rawToken = params.get('encounterId') || 'P-001';
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
        borderRadius: '18px',
        border: '1px solid #eef2f6',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
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

            {signed ? (
                /* Post Sign-off Success Screen */
                <div style={cardStyle}>
                    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                        <div style={{
                            width: '68px',
                            height: '68px',
                            borderRadius: '50%',
                            background: '#e6f7f2',
                            color: '#044e42',
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
                            borderRadius: '12px',
                            padding: '1rem',
                            border: '1px solid #e2e8f0',
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
                                    border: '1.5px solid #e2e8f0',
                                    padding: '0.7rem 1.35rem',
                                    borderRadius: '10px',
                                    fontWeight: '700',
                                    fontSize: '0.88rem',
                                    color: '#0f172a',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.45rem'
                                }}
                            >
                                <Printer size={16} />
                                Print e-Rx Summary
                            </button>
                            <button
                                onClick={() => navigate('/doctor/queue')}
                                style={{
                                    background: '#044e42',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '0.7rem 1.45rem',
                                    borderRadius: '10px',
                                    fontWeight: '800',
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
                /* Pre Sign-off Form */
                <form onSubmit={handleSignOff}>
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e6f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
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
                                    style={{ width: '18px', height: '18px', marginTop: '2px', cursor: 'pointer' }}
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
                                background: affirmation ? '#044e42' : '#94a3b8',
                                color: '#ffffff',
                                border: 'none',
                                padding: '1rem',
                                borderRadius: '12px',
                                fontWeight: '800',
                                fontSize: '0.96rem',
                                cursor: affirmation ? 'pointer' : 'not-allowed',
                                boxShadow: affirmation ? '0 4px 14px rgba(4, 78, 66, 0.25)' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
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
