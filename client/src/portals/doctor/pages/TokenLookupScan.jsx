import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    QrCode, 
    Search, 
    ShieldCheck, 
    ArrowRight, 
    User, 
    Camera, 
    Upload, 
    XCircle,
    CheckCircle2
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { lookupEncounterByToken } from '../../../api/doctorApi';

/**
 * TokenLookupScan Component (Aura HealthTech Theme)
 * Fully workable optical QR scanner using html5-qrcode:
 * 1. Live camera scanning
 * 2. Upload QR Image file scanning
 * 3. 1-click test token simulation (P-001, P-002, P-003)
 */
export default function TokenLookupScan() {
    const navigate = useNavigate();
    const [tokenId, setTokenId] = useState('');
    const [patientResult, setPatientResult] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [scanError, setScanError] = useState('');
    const [loading, setLoading] = useState(false);

    const html5QrCodeRef = useRef(null);
    const scannerRegionId = 'html5-qrcode-reader-region';

    // Cleanup camera when component unmounts
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const stopCamera = async () => {
        if (html5QrCodeRef.current && isCameraActive) {
            try {
                await html5QrCodeRef.current.stop();
                html5QrCodeRef.current.clear();
            } catch (err) {
                console.warn('Error stopping camera:', err);
            }
            setIsCameraActive(false);
        }
    };

    const startCamera = async () => {
        setScanError('');
        try {
            if (!html5QrCodeRef.current) {
                html5QrCodeRef.current = new Html5Qrcode(scannerRegionId);
            }

            setIsCameraActive(true);

            await html5QrCodeRef.current.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: { width: 220, height: 220 }
                },
                (decodedText) => {
                    // Success callback
                    setTokenId(decodedText);
                    stopCamera();
                    handleLookup(decodedText);
                },
                (errorMessage) => {
                    // Silent parse errors during active frame scanning
                }
            );
        } catch (err) {
            console.error('Camera startup error:', err);
            setScanError('Could not start camera. Please verify camera permissions or test with sample tokens below.');
            setIsCameraActive(false);
        }
    };

    // Scan from local image file upload
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setScanError('');
        try {
            if (!html5QrCodeRef.current) {
                html5QrCodeRef.current = new Html5Qrcode(scannerRegionId);
            }
            const decodedText = await html5QrCodeRef.current.scanFile(file, true);
            setTokenId(decodedText);
            handleLookup(decodedText);
        } catch (err) {
            setScanError('Failed to read QR code from the uploaded image. Please ensure image contains a valid QR pass.');
        }
    };

    // Lookup token in API / mock data
    const handleLookup = async (tokenToSearch) => {
        const id = (tokenToSearch || tokenId).trim();
        if (!id) return;

        setLoading(true);
        setScanError('');
        try {
            const data = await lookupEncounterByToken(id);
            setPatientResult(data);
            localStorage.setItem('activeDoctorEncounterId', data.token_id || id);
        } catch (err) {
            setScanError('Token not found or consent has expired.');
        } finally {
            setLoading(false);
        }
    };

    const handleProceed = () => {
        if (patientResult) {
            navigate(`/doctor/briefing?encounterId=${patientResult.token_id || tokenId}`);
        }
    };

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '22px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        padding: '1.75rem',
        marginBottom: '1.5rem'
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#edf2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                        <QrCode size={20} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>
                            Patient Token Lookup & QR Scan
                        </h2>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                            Scan QR pass via camera or enter token ID for authorized consultation access
                        </p>
                    </div>
                </div>

                {/* Camera / Optical Viewfinder Box */}
                <div style={{
                    background: '#f8fafc',
                    border: '2px dashed #cbd5e1',
                    borderRadius: '14px',
                    padding: isCameraActive ? '1rem' : '2rem',
                    textAlign: 'center',
                    marginBottom: '1.5rem'
                }}>
                    {/* Live HTML5 Scanner Video Mount Point */}
                    <div 
                        id={scannerRegionId} 
                        style={{ 
                            width: '100%', 
                            maxWidth: '360px', 
                            margin: '0 auto', 
                            display: isCameraActive ? 'block' : 'none',
                            borderRadius: '12px',
                            overflow: 'hidden'
                        }}
                    ></div>

                    {!isCameraActive && (
                        <div>
                            <Camera size={42} color="#2563eb" style={{ margin: '0 auto 0.75rem auto' }} />
                            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>
                                Optical QR Scanner Ready
                            </div>
                            <p style={{ margin: '0.25rem 0 1.25rem 0', fontSize: '0.82rem', color: '#64748b' }}>
                                Use your webcam to scan the patient's mobile QR pass or upload a file
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                <button
                                    type="button"
                                    onClick={startCamera}
                                    style={{
                                        background: '#2563eb',
                                        color: '#ffffff',
                                        border: 'none',
                                        padding: '0.65rem 1.25rem',
                                        borderRadius: '12px',
                                        fontWeight: '700',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.45rem',
                                        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)'
                                    }}
                                >
                                    <Camera size={16} />
                                    Start Live Camera Scanner
                                </button>

                                <label style={{
                                    background: '#ffffff',
                                    color: '#2563eb',
                                    border: '1.5px solid #bfdbfe',
                                    padding: '0.65rem 1.25rem',
                                    borderRadius: '12px',
                                    fontWeight: '700',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.45rem'
                                }}>
                                    <Upload size={16} />
                                    Upload QR Image
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleFileUpload} 
                                        style={{ display: 'none' }} 
                                    />
                                </label>
                            </div>

                            {/* Demo Token Chips */}
                            <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                Quick test with demo tokens:
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {['P-001', 'P-002', 'P-003', 'VY-TOK-DEMO-7G8H9I'].map(tok => (
                                    <button
                                        key={tok}
                                        type="button"
                                        onClick={() => { setTokenId(tok); handleLookup(tok); }}
                                        style={{
                                            background: '#edf2fe',
                                            border: '1px solid #bfdbfe',
                                            color: '#2563eb',
                                            padding: '0.35rem 0.85rem',
                                            borderRadius: '10px',
                                            fontSize: '0.8rem',
                                            fontWeight: '700',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {tok}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {isCameraActive && (
                        <div style={{ marginTop: '1rem' }}>
                            <button
                                type="button"
                                onClick={stopCamera}
                                style={{
                                    background: '#fee2e2',
                                    color: '#dc2626',
                                    border: '1px solid #fecaca',
                                    padding: '0.45rem 1rem',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    fontSize: '0.82rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Stop Camera
                            </button>
                        </div>
                    )}
                </div>

                {/* Scan Error Notice */}
                {scanError && (
                    <div style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#b91c1c',
                        padding: '0.65rem 1rem',
                        borderRadius: '10px',
                        fontSize: '0.82rem',
                        marginBottom: '1.25rem'
                    }}>
                        {scanError}
                    </div>
                )}

                {/* Manual Token ID Input */}
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder="Enter Token ID (e.g. P-001)"
                        value={tokenId}
                        onChange={(e) => setTokenId(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            border: '1px solid #e2e8f0',
                            background: '#f8fafc',
                            fontSize: '0.9rem',
                            outline: 'none'
                        }}
                    />
                    <button
                        onClick={() => handleLookup()}
                        disabled={loading}
                        style={{
                            background: '#2563eb',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.75rem 1.4rem',
                            borderRadius: '12px',
                            fontWeight: '700',
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)'
                        }}
                    >
                        {loading ? 'Verifying...' : 'Lookup'}
                    </button>
                </div>

                {/* Verified Patient Result Card */}
                {patientResult && (
                    <div style={{
                        background: '#edf2fe',
                        border: '1px solid #bfdbfe',
                        borderRadius: '16px',
                        padding: '1.25rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#2563eb', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={18} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '1.05rem' }}>
                                        {patientResult.patient_id?.name || 'Patient 1'}
                                    </div>
                                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                        {patientResult.patient_id?.age} Years | {patientResult.patient_id?.gender} | Token: {patientResult.token_id || tokenId}
                                    </div>
                                </div>
                            </div>
                            <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.55rem', borderRadius: '6px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <CheckCircle2 size={13} />
                                Consent Verified
                            </span>
                        </div>

                        <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.86rem', color: '#334155' }}>
                            <strong>Chief Complaint:</strong> {patientResult.chief_complaint}
                        </p>

                        <button
                            onClick={handleProceed}
                            style={{
                                width: '100%',
                                background: '#2563eb',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.85rem',
                                borderRadius: '14px',
                                fontWeight: '700',
                                fontSize: '0.92rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)'
                            }}
                        >
                            Open Clinical Briefing
                            <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
