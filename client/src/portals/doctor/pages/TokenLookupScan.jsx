import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    QrCode, 
    Search, 
    ShieldCheck, 
    CheckCircle, 
    AlertCircle, 
    ArrowRight, 
    User, 
    Camera, 
    Sparkles,
    Lock
} from 'lucide-react';
import { lookupEncounterByToken } from '../../../api/doctorApi';

/**
 * TokenLookupScan Component (Nordic Wellness Glass Theme)
 * QR token scanner, privacy-preserving token lookup, and authorized patient handoff.
 */
export default function TokenLookupScan() {
    const navigate = useNavigate();
    const [tokenId, setTokenId] = useState('');
    const [loading, setLoading] = useState(false);
    const [scannedPatient, setScannedPatient] = useState(null);
    const [error, setError] = useState('');
    const [scannerActive, setScannerActive] = useState(false);

    // Quick test tokens for rapid verification
    const sampleTokens = ['TKN-8821', 'TKN-3342', 'TKN-7719'];

    const handleLookup = async (tokenToSearch) => {
        const queryToken = (tokenToSearch || tokenId).trim();
        if (!queryToken) {
            setError('Please enter or scan a valid privacy token');
            return;
        }

        setError('');
        setLoading(true);
        try {
            const result = await lookupEncounterByToken(queryToken);
            if (result && result.patient_id) {
                setScannedPatient(result);
                // Save active encounter
                localStorage.setItem('activeDoctorEncounterId', result._id);
            } else {
                setError('Token not found or consent has expired.');
                setScannedPatient(null);
            }
        } catch (err) {
            setError('Failed to resolve token: ' + err.message);
            setScannedPatient(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSimulateScan = (sample) => {
        setTokenId(sample);
        setScannerActive(false);
        handleLookup(sample);
    };

    const handleProceed = () => {
        if (scannedPatient) {
            navigate(`/doctor/briefing?encounterId=${scannedPatient._id}`);
        }
    };

    const glassCardStyle = {
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(20, 184, 166, 0.2)',
        borderRadius: '16px',
        padding: '1.75rem',
        boxShadow: '0 10px 30px rgba(15, 118, 110, 0.06)'
    };

    return (
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ marginBottom: '1.75rem' }}>
                <h1 style={{ margin: 0, fontSize: '1.65rem', fontWeight: '800', color: '#0f172a' }}>
                    Token Lookup & QR Scan
                </h1>
                <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.9rem', color: '#0f766e' }}>
                    Scan patient's consent QR pass or enter the 8-digit privacy token for authorized encounter access
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
                {/* Scanner & Manual Lookup Panel */}
                <div style={glassCardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f766e' }}>
                            <QrCode size={20} />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a', fontWeight: '700' }}>Patient Verification</h3>
                            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>QR Optical or Manual Token</span>
                        </div>
                    </div>

                    {/* Camera Scanner Simulation Box */}
                    <div style={{
                        background: '#042f2e',
                        borderRadius: '14px',
                        padding: '1.5rem',
                        textAlign: 'center',
                        color: '#ccfbf1',
                        marginBottom: '1.25rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Scanner Laser Animation */}
                        <div style={{
                            position: 'absolute',
                            top: '35%',
                            left: '10%',
                            right: '10%',
                            height: '2px',
                            background: '#14b8a6',
                            boxShadow: '0 0 12px #2dd4bf'
                        }}></div>

                        <div style={{
                            width: '120px',
                            height: '120px',
                            margin: '0 auto 1rem auto',
                            border: '2px dashed #2dd4bf',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Camera size={36} color="#5eead4" />
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: '600' }}>Align QR code within frame</div>
                        <div style={{ fontSize: '0.72rem', color: '#99f6e4', marginTop: '0.2rem' }}>Optical sensor active</div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                            <span style={{ fontSize: '0.7rem', color: '#99f6e4' }}>Quick Test Tokens:</span>
                            {sampleTokens.map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => handleSimulateScan(t)}
                                    style={{
                                        background: 'rgba(20, 184, 166, 0.25)',
                                        border: '1px solid #14b8a6',
                                        color: '#ffffff',
                                        borderRadius: '6px',
                                        padding: '0.15rem 0.45rem',
                                        fontSize: '0.72rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Manual Entry Form */}
                    <form onSubmit={(e) => { e.preventDefault(); handleLookup(); }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#134e4a', marginBottom: '0.35rem' }}>
                                Manual Token ID
                            </label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="e.g. TKN-8821"
                                    value={tokenId}
                                    onChange={(e) => setTokenId(e.target.value)}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem 1rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ccfbf1',
                                        background: '#f0fdfa',
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        color: '#0f172a',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                                        color: '#ffffff',
                                        border: 'none',
                                        padding: '0.75rem 1.25rem',
                                        borderRadius: '10px',
                                        fontWeight: '600',
                                        fontSize: '0.88rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        boxShadow: '0 4px 12px rgba(15, 118, 110, 0.25)'
                                    }}
                                >
                                    <Search size={16} />
                                    {loading ? 'Verifying...' : 'Lookup'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {error && (
                        <div style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '10px',
                            padding: '0.65rem 0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            color: '#b91c1c',
                            fontSize: '0.82rem'
                        }}>
                            <AlertCircle size={15} />
                            {error}
                        </div>
                    )}
                </div>

                {/* Verified Consent & Patient Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {scannedPatient ? (
                        <div style={{ ...glassCardStyle, border: '1.5px solid #2dd4bf', background: 'rgba(255, 255, 255, 0.95)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    background: '#dcfce7',
                                    color: '#15803d',
                                    padding: '0.25rem 0.65rem',
                                    borderRadius: '14px',
                                    fontSize: '0.75rem',
                                    fontWeight: '700'
                                }}>
                                    <ShieldCheck size={14} />
                                    Authorized & Consent Verified
                                </div>
                                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Token: <strong>{scannedPatient.token_id}</strong></span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '14px',
                                    background: '#ccfbf1',
                                    color: '#0f766e',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <User size={26} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>
                                        {scannedPatient.patient_id?.name}
                                    </h3>
                                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                                        {scannedPatient.patient_id?.age} Years · {scannedPatient.patient_id?.gender} · Blood Group: {scannedPatient.patient_id?.bloodGroup || 'O+'}
                                    </span>
                                </div>
                            </div>

                            <div style={{
                                background: 'rgba(240, 253, 250, 0.7)',
                                borderRadius: '12px',
                                padding: '0.85rem',
                                marginBottom: '1rem',
                                fontSize: '0.85rem'
                            }}>
                                <div style={{ color: '#0f766e', fontWeight: '700', marginBottom: '0.25rem' }}>Chief Complaint:</div>
                                <div style={{ color: '#1e293b' }}>{scannedPatient.chief_complaint}</div>
                            </div>

                            {scannedPatient.patient_id?.allergies && (
                                <div style={{ marginBottom: '1.25rem', fontSize: '0.8rem' }}>
                                    <span style={{ color: '#b91c1c', fontWeight: '700' }}>Known Allergies: </span>
                                    <span style={{ color: '#7f1d1d' }}>{scannedPatient.patient_id.allergies.join(', ')}</span>
                                </div>
                            )}

                            <button
                                onClick={handleProceed}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '0.85rem',
                                    borderRadius: '12px',
                                    fontWeight: '700',
                                    fontSize: '0.92rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 14px rgba(15, 118, 110, 0.25)'
                                }}
                            >
                                Open Clinical Briefing
                                <ArrowRight size={17} />
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            ...glassCardStyle,
                            border: '1.5px dashed #ccfbf1',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '3rem 1.5rem',
                            color: '#64748b'
                        }}>
                            <Lock size={36} color="#14b8a6" style={{ marginBottom: '0.75rem', opacity: 0.6 }} />
                            <h4 style={{ margin: 0, fontSize: '1rem', color: '#0f172a' }}>Privacy Token Awaiting Input</h4>
                            <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.8rem', maxWidth: '280px' }}>
                                Clinical data remains encrypted until a valid QR consent token is scanned or entered.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
