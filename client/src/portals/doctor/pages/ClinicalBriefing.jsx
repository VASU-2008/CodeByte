import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    ArrowLeft, 
    ArrowRight, 
    User, 
    Edit, 
    Calendar,
    ChevronRight
} from 'lucide-react';

/**
 * ClinicalBriefing Component (Aura HealthTech Theme)
 * Exact match for Doctor Portal "Clinical Briefing" card in the design mockup.
 */
export default function ClinicalBriefing() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('Current Visit');

    const params = new URLSearchParams(location.search);
    const encounterId = params.get('encounterId') || 'P-001';

    const tabs = ['Current Visit', 'Past Visits', 'Vitals Trend', 'Medicines', 'Documents'];

    const handleContinue = () => {
        navigate(`/doctor/consultation?encounterId=${encounterId}`);
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Back Button */}
            <button
                onClick={() => navigate('/doctor/dashboard')}
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
                <span>Back</span>
            </button>

            {/* Main Clinical Briefing Card */}
            <div style={{
                background: '#ffffff',
                borderRadius: '18px',
                border: '1px solid #eef2f6',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
                padding: '1.75rem'
            }}>
                {/* Header: Patient Info & View Full History */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: '#e6f7f2',
                            color: '#044e42',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            fontWeight: '700'
                        }}>
                            <User size={24} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                                Ravi Kumar
                            </h2>
                            <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>
                                42 years | Male | Token: {encounterId}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setActiveTab('Past Visits')}
                        style={{
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            padding: '0.5rem 1rem',
                            fontSize: '0.82rem',
                            fontWeight: '600',
                            color: '#044e42',
                            cursor: 'pointer'
                        }}
                    >
                        View Full History
                    </button>
                </div>

                {/* Sub-Navigation Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '1.75rem',
                    borderBottom: '1px solid #e2e8f0',
                    marginBottom: '1.75rem',
                    fontSize: '0.88rem'
                }}>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                background: 'none',
                                border: 'none',
                                borderBottom: activeTab === tab ? '2.5px solid #044e42' : '2.5px solid transparent',
                                color: activeTab === tab ? '#044e42' : '#64748b',
                                fontWeight: activeTab === tab ? '700' : '500',
                                paddingBottom: '0.75rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Two-Column Clinical Content */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    {/* Left Column: Chief Complaint & Vitals */}
                    <div>
                        {/* Chief Complaint */}
                        <div style={{ marginBottom: '1.75rem' }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.92rem', fontWeight: '700', color: '#0f172a' }}>
                                Chief Complaint
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.86rem', color: '#475569', lineHeight: '1.5' }}>
                                Fever and body ache since 2 days. Mild cough.
                            </p>
                        </div>

                        {/* Current Vitals with Edit Action */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '700', color: '#0f172a' }}>
                                    Vitals (Current)
                                </h3>
                                <button
                                    onClick={() => navigate(`/doctor/consultation?encounterId=${encounterId}`)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        background: 'none',
                                        border: 'none',
                                        color: '#044e42',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Edit size={13} />
                                    <span>Edit</span>
                                </button>
                            </div>

                            <div style={{
                                background: '#f8fafc',
                                borderRadius: '12px',
                                padding: '1rem',
                                border: '1px solid #f1f5f9',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '1rem'
                            }}>
                                <div>
                                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>BP</div>
                                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginTop: '0.15rem' }}>120/80 mmHg</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Temp</div>
                                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginTop: '0.15rem' }}>101.2 °F</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Pulse</div>
                                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginTop: '0.15rem' }}>98 bpm</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>SpO2</div>
                                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginTop: '0.15rem' }}>97 %</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Weight</div>
                                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginTop: '0.15rem' }}>68 kg</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Height</div>
                                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginTop: '0.15rem' }}>170 cm</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Past Visit Summary */}
                    <div>
                        <h3 style={{ margin: '0 0 0.85rem 0', fontSize: '0.92rem', fontWeight: '700', color: '#0f172a' }}>
                            Past Visit Summary
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {/* Visit 1 */}
                            <div style={{
                                background: '#f8fafc',
                                borderRadius: '12px',
                                padding: '0.9rem 1rem',
                                border: '1px solid #f1f5f9',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>05 Oct 2024</span>
                                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>CHC Visit</span>
                                    </div>
                                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#475569' }}>
                                        Viral fever, symptomatic treatment
                                    </p>
                                </div>
                                <span style={{ color: '#044e42', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>
                                    View →
                                </span>
                            </div>

                            {/* Visit 2 */}
                            <div style={{
                                background: '#f8fafc',
                                borderRadius: '12px',
                                padding: '0.9rem 1rem',
                                border: '1px solid #f1f5f9',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>10 Aug 2024</span>
                                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Follow-up</span>
                                    </div>
                                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#475569' }}>
                                        Recovered, no new complaints
                                    </p>
                                </div>
                                <span style={{ color: '#044e42', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>
                                    View →
                                </span>
                            </div>

                            {/* Visit 3 */}
                            <div style={{
                                background: '#f8fafc',
                                borderRadius: '12px',
                                padding: '0.9rem 1rem',
                                border: '1px solid #f1f5f9',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>12 Jun 2024</span>
                                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>General OPD</span>
                                    </div>
                                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#475569' }}>
                                        Hypertension follow-up
                                    </p>
                                </div>
                                <span style={{ color: '#044e42', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>
                                    View →
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Button */}
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
                    Continue to Consultation Notes →
                </button>
            </div>
        </div>
    );
}
