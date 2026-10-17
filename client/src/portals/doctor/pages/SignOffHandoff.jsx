import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Lock, 
    ShieldCheck, 
    CheckCircle2, 
    FileText, 
    Printer, 
    ArrowLeft, 
    User, 
    AlertTriangle, 
    Stethoscope, 
    Pill, 
    Calendar,
    Stamp,
    Download
} from 'lucide-react';
import { signOffEncounter } from '../../../api/doctorApi';

/**
 * SignOffHandoff Component (Nordic Wellness Glass Theme)
 * Final clinical review, digital clinician signature, permanent encounter locking, and handoff.
 */
export default function SignOffHandoff() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const encounterId = params.get('encounterId') || localStorage.getItem('activeDoctorEncounterId') || 'enc-101';

    const [clinicianName, setClinicianName] = useState('Dr. Shreyas');
    const [registrationNumber, setRegistrationNumber] = useState('MCI-98442-KA');
    const [signatureAffirmation, setSignatureAffirmation] = useState(false);
    const [lockEncounter, setLockEncounter] = useState(true);
    const [signing, setSigning] = useState(false);
    const [isSignedOff, setIsSignedOff] = useState(false);
    const [signOffReceipt, setSignOffReceipt] = useState(null);

    const handleSignOff = async (e) => {
        e.preventDefault();
        if (!signatureAffirmation) {
            alert('Please check the digital signature affirmation before signing off.');
            return;
        }

        setSigning(true);
        try {
            const payload = {
                clinicianName,
                registrationNumber,
                digitalSignatureHash: 'SIG-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
                lockedPermanently: lockEncounter,
                signedAt: new Date().toISOString()
            };

            const result = await signOffEncounter(encounterId, payload);
            setIsSignedOff(true);
            setSignOffReceipt({
                ...payload,
                encounterId,
                transactionId: result.transactionId || 'TXN-' + Date.now()
            });
        } catch (err) {
            console.error('Failed to sign off encounter:', err);
            alert('Error during encounter sign-off: ' + err.message);
        } finally {
            setSigning(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const glassCardStyle = {
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(20, 184, 166, 0.2)',
        borderRadius: '16px',
        padding: '1.75rem',
        boxShadow: '0 10px 30px rgba(15, 118, 110, 0.05)',
        marginBottom: '1.5rem'
    };

    return (
        <div style={{ maxWidth: '950px', margin: '0 auto' }}>
            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', background: '#ccfbf1', color: '#0f766e', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: '700', display: 'inline-block' }}>
                        ENCOUNTER #{encounterId}
                    </div>
                    <h1 style={{ margin: '0.4rem 0 0 0', fontSize: '1.65rem', fontWeight: '800', color: '#0f172a' }}>
                        {isSignedOff ? 'Encounter Signed & Locked' : 'Clinical Sign-Off & Permanent Lock'}
                    </h1>
                </div>

                {isSignedOff && (
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                            onClick={handlePrint}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                background: '#ffffff',
                                border: '1px solid #ccfbf1',
                                color: '#0f766e',
                                padding: '0.7rem 1.15rem',
                                borderRadius: '10px',
                                fontWeight: '600',
                                fontSize: '0.88rem',
                                cursor: 'pointer'
                            }}
                        >
                            <Printer size={16} />
                            Print Summary
                        </button>
                        <button
                            onClick={() => navigate('/doctor')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.7rem 1.35rem',
                                borderRadius: '10px',
                                fontWeight: '700',
                                fontSize: '0.88rem',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(15, 118, 110, 0.25)'
                            }}
                        >
                            Return to Queue
                        </button>
                    </div>
                )}
            </div>

            {isSignedOff ? (
                /* Post-Sign Off Success Banner */
                <div style={{ ...glassCardStyle, border: '2px solid #10b981', background: 'rgba(236, 253, 245, 0.95)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '16px',
                            background: '#10b981',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: '#065f46' }}>
                                Clinical Record Digitally Locked
                            </h2>
                            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#047857' }}>
                                Signed by {signOffReceipt?.clinicianName} ({signOffReceipt?.registrationNumber}) on {new Date(signOffReceipt?.signedAt).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div style={{
                        background: '#ffffff',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        border: '1px solid #a7f3d0',
                        fontSize: '0.85rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        color: '#334155'
                    }}>
                        <div><strong>Encounter ID:</strong> {signOffReceipt?.encounterId}</div>
                        <div><strong>Digital Signature Hash:</strong> <code>{signOffReceipt?.digitalSignatureHash}</code></div>
                        <div><strong>Status:</strong> COMPLETED · Locked against subsequent modifications</div>
                        <div><strong>Handoff:</strong> Synced with Patient Portal (e-Rx) and Coordinator Follow-up Stream.</div>
                    </div>
                </div>
            ) : (
                /* Pre-Sign Off Review & Signature Form */
                <>
                    {/* Clinical Summary Brief */}
                    <div style={glassCardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f766e' }}>
                                <FileText size={20} />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: '700' }}>
                                    Pre-Lock Clinical Summary Review
                                </h3>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#0f766e' }}>
                                    Verify diagnostic notes, vitals, and medications before final commitment
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px' }}>
                                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>PATIENT</div>
                                <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a' }}>Ramesh Kumar (54 M)</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>ABHA-9821-4402-9912</div>
                            </div>

                            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px' }}>
                                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>PROVISIONAL DIAGNOSIS</div>
                                <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a' }}>Essential Hypertension & Angina</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Priority: PHC Priority Care</div>
                            </div>

                            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px' }}>
                                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>RECORDED VITALS</div>
                                <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a' }}>BP: 148/92 mmHg · HR: 88 bpm</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>SpO2: 96% · Temp: 98.6°F</div>
                            </div>

                            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px' }}>
                                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>E-PRESCRIPTION</div>
                                <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a' }}>3 Active Medications</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Amlodipine, Metoprolol, Paracetamol</div>
                            </div>
                        </div>
                    </div>

                    {/* Digital Signature & Encounter Lock Form */}
                    <form onSubmit={handleSignOff}>
                        <div style={glassCardStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f766e' }}>
                                    <Stamp size={20} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: '700' }}>
                                        Clinician Digital Signature
                                    </h3>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#0f766e' }}>
                                        Enforce statutory prescription locking & medical record authenticity
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#134e4a', marginBottom: '0.35rem' }}>
                                        Clinician Name
                                    </label>
                                    <input
                                        type="text"
                                        value={clinicianName}
                                        onChange={(e) => setClinicianName(e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.7rem 0.9rem',
                                            borderRadius: '10px',
                                            border: '1px solid #ccfbf1',
                                            background: '#f0fdfa',
                                            fontSize: '0.9rem',
                                            color: '#0f172a',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#134e4a', marginBottom: '0.35rem' }}>
                                        Medical Council Registration Number
                                    </label>
                                    <input
                                        type="text"
                                        value={registrationNumber}
                                        onChange={(e) => setRegistrationNumber(e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.7rem 0.9rem',
                                            borderRadius: '10px',
                                            border: '1px solid #ccfbf1',
                                            background: '#f0fdfa',
                                            fontSize: '0.9rem',
                                            color: '#0f172a',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Statutory Affirmation */}
                            <div style={{
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                padding: '1rem',
                                marginBottom: '1.25rem'
                            }}>
                                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={signatureAffirmation}
                                        onChange={(e) => setSignatureAffirmation(e.target.checked)}
                                        style={{ width: '18px', height: '18px', marginTop: '2px' }}
                                    />
                                    <span style={{ fontSize: '0.84rem', color: '#334155', lineHeight: '1.45' }}>
                                        <strong>Attestation:</strong> I hereby certify that the clinical findings, provisional diagnosis, e-prescription, and follow-up advice recorded in this encounter were evaluated by me. By submitting, I affix my digital signature to lock this consultation.
                                    </span>
                                </label>
                            </div>

                            {/* Permanent Lock Notice */}
                            <div style={{
                                background: '#fef2f2',
                                border: '1px solid #fecaca',
                                borderRadius: '10px',
                                padding: '0.75rem 1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                marginBottom: '1.5rem',
                                fontSize: '0.82rem',
                                color: '#991b1b'
                            }}>
                                <Lock size={16} />
                                <span>
                                    <strong>Encounter Lock Rule:</strong> Once signed off, this record is permanently sealed. Further amendments must be created as linked follow-up encounters.
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={signing || !signatureAffirmation}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    background: signatureAffirmation ? 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)' : '#94a3b8',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '0.9rem',
                                    borderRadius: '12px',
                                    fontWeight: '700',
                                    fontSize: '0.95rem',
                                    cursor: signatureAffirmation ? 'pointer' : 'not-allowed',
                                    boxShadow: signatureAffirmation ? '0 4px 14px rgba(15, 118, 110, 0.25)' : 'none'
                                }}
                            >
                                <Lock size={18} />
                                {signing ? 'Locking Record...' : 'Digitally Sign Off & Lock Encounter'}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}
