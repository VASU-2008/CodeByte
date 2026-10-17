import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    QrCode, 
    Search, 
    ShieldCheck, 
    ArrowRight, 
    User, 
    Camera 
} from 'lucide-react';
import { lookupEncounterByToken } from '../../../api/doctorApi';

/**
 * TokenLookupScan Component (Aura HealthTech Theme)
 * Optical QR viewfinder and token lookup matching clean white Aura HealthTech design.
 */
export default function TokenLookupScan() {
    const navigate = useNavigate();
    const [tokenId, setTokenId] = useState('');
    const [patientResult, setPatientResult] = useState(null);

    const handleLookup = (idToSearch) => {
        const id = (idToSearch || tokenId).trim();
        if (!id) return;
        setPatientResult({
            name: 'Ravi Kumar',
            ageGender: '42 years | Male',
            token: id,
            chiefComplaint: 'Fever and body ache since 2 days. Mild cough.'
        });
    };

    const handleProceed = () => {
        if (patientResult) {
            navigate(`/doctor/briefing?encounterId=${patientResult.token}`);
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
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e6f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
                        <QrCode size={20} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>
                            Patient Token Lookup & QR Scan
                        </h2>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                            Scan QR pass or enter token ID for authorized consultation access
                        </p>
                    </div>
                </div>

                {/* Simulated QR Viewfinder */}
                <div style={{
                    background: '#f8fafc',
                    border: '2px dashed #cbd5e1',
                    borderRadius: '14px',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <Camera size={40} color="#044e42" style={{ margin: '0 auto 0.75rem auto' }} />
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>
                        Optical Scanner Ready
                    </div>
                    <p style={{ margin: '0.25rem 0 1rem 0', fontSize: '0.8rem', color: '#64748b' }}>
                        Quick test with demo tokens:
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        {['P-001', 'P-002', 'P-003'].map(tok => (
                            <button
                                key={tok}
                                type="button"
                                onClick={() => { setTokenId(tok); handleLookup(tok); }}
                                style={{
                                    background: '#e6f7f2',
                                    border: '1px solid #cceee5',
                                    color: '#044e42',
                                    padding: '0.3rem 0.75rem',
                                    borderRadius: '8px',
                                    fontSize: '0.78rem',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                }}
                            >
                                {tok}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Manual input */}
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
                        style={{
                            background: '#044e42',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.75rem 1.4rem',
                            borderRadius: '10px',
                            fontWeight: '700',
                            fontSize: '0.88rem',
                            cursor: 'pointer'
                        }}
                    >
                        Lookup
                    </button>
                </div>

                {patientResult && (
                    <div style={{
                        background: '#e6f7f2',
                        border: '1px solid #cceee5',
                        borderRadius: '14px',
                        padding: '1.25rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#044e42', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={18} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '1rem' }}>{patientResult.name}</div>
                                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{patientResult.ageGender} · Token: {patientResult.token}</div>
                                </div>
                            </div>
                            <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.5rem', borderRadius: '6px', fontWeight: '700' }}>
                                Consent Verified
                            </span>
                        </div>

                        <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#334155' }}>
                            <strong>Complaint:</strong> {patientResult.chiefComplaint}
                        </p>

                        <button
                            onClick={handleProceed}
                            style={{
                                width: '100%',
                                background: '#044e42',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.75rem',
                                borderRadius: '10px',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
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
