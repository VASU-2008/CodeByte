import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    ArrowLeft, 
    ArrowRight, 
    User, 
    Edit, 
    Calendar,
    ChevronRight,
    Heart,
    Thermometer,
    Activity,
    Wind,
    Scale,
    Ruler,
    ShieldCheck,
    Mic,
    AlertTriangle,
    FileText,
    TrendingUp
} from 'lucide-react';

/**
 * ClinicalBriefing Component (Catchy & Demo-Ready)
 * Clean, visually appealing clinical briefing:
 * - Visual vital metric cards with micro-badges
 * - Voice intake transcription badge
 * - Past visits timeline
 * - Smooth tab switching
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
            {/* Back Button */}
            <button
                onClick={() => navigate('/doctor/queue')}
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
                <span>Back to Patient Queue</span>
            </button>

            {/* Main Clinical Briefing Card */}
            <div style={cardStyle}>
                {/* Header: Patient Info & Badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '16px',
                            background: '#e6f7f2',
                            color: '#044e42',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.3rem',
                            fontWeight: '800'
                        }}>
                            P1
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
                                    Patient 1
                                </h2>
                                <span style={{
                                    fontSize: '0.74rem',
                                    background: '#dcfce7',
                                    color: '#15803d',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '10px',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                }}>
                                    <ShieldCheck size={13} />
                                    QR Consent Verified
                                </span>
                            </div>
                            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.84rem', color: '#64748b' }}>
                                42 years | Male | Token: <strong>{encounterId}</strong> | ABHA ID: <strong>ABHA-9821-4402-9912</strong>
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{
                            background: '#fee2e2',
                            color: '#b91c1c',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '10px',
                            fontSize: '0.78rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                        }}>
                            <AlertTriangle size={14} />
                            Penicillin Allergy
                        </span>

                        <button
                            onClick={() => setActiveTab('Past Visits')}
                            style={{
                                background: '#ffffff',
                                border: '1.5px solid #e2e8f0',
                                borderRadius: '10px',
                                padding: '0.5rem 0.95rem',
                                fontSize: '0.82rem',
                                fontWeight: '700',
                                color: '#044e42',
                                cursor: 'pointer'
                            }}
                        >
                            View Full History
                        </button>
                    </div>
                </div>

                {/* Sub-Navigation Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '1.75rem',
                    borderBottom: '1px solid #e2e8f0',
                    marginBottom: '1.75rem',
                    fontSize: '0.9rem'
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
                                fontWeight: activeTab === tab ? '800' : '500',
                                paddingBottom: '0.75rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab 1: Current Visit (Default) */}
                {activeTab === 'Current Visit' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', marginBottom: '2rem' }}>
                        {/* Left Column: Complaint & Visual Vitals HUD */}
                        <div>
                            {/* Chief Complaint Box with Voice Transcription Pill */}
                            <div style={{
                                background: '#f8fafc',
                                borderRadius: '14px',
                                padding: '1.25rem',
                                border: '1px solid #eef2f6',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: '#0f172a' }}>
                                        Chief Complaint
                                    </h3>
                                    <span style={{
                                        fontSize: '0.72rem',
                                        background: '#eff6ff',
                                        color: '#1d4ed8',
                                        padding: '0.15rem 0.55rem',
                                        borderRadius: '8px',
                                        fontWeight: '700',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.3rem'
                                    }}>
                                        <Mic size={12} />
                                        Voice Intake: Hindi → English
                                    </span>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.92rem', color: '#334155', lineHeight: '1.5', fontWeight: '500' }}>
                                    "Fever and body ache since 2 days. Mild dry cough, worse at night."
                                </p>
                            </div>

                            {/* Catchy Visual Vitals Grid */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: '#0f172a' }}>
                                        Current Vitals Check
                                    </h3>
                                    <button
                                        onClick={() => navigate(`/doctor/consultation?encounterId=${encounterId}`)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.3rem',
                                            background: 'none',
                                            border: 'none',
                                            color: '#044e42',
                                            fontSize: '0.82rem',
                                            fontWeight: '700',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Edit size={13} />
                                        <span>Update Vitals</span>
                                    </button>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
                                    {/* Blood Pressure */}
                                    <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '0.85rem', border: '1px solid #f1f5f9' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>BP</span>
                                            <Heart size={14} color="#044e42" />
                                        </div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginTop: '0.25rem' }}>120/80</div>
                                        <span style={{ fontSize: '0.68rem', background: '#dcfce7', color: '#15803d', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>
                                            Normal
                                        </span>
                                    </div>

                                    {/* Temperature */}
                                    <div style={{ background: '#fffbeb', borderRadius: '12px', padding: '0.85rem', border: '1px solid #fef3c7' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.72rem', color: '#92400e', fontWeight: '600' }}>Temp</span>
                                            <Thermometer size={14} color="#ea580c" />
                                        </div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#9a3412', marginTop: '0.25rem' }}>101.2°F</div>
                                        <span style={{ fontSize: '0.68rem', background: '#fee2e2', color: '#dc2626', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>
                                            Mild Fever
                                        </span>
                                    </div>

                                    {/* Pulse */}
                                    <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '0.85rem', border: '1px solid #f1f5f9' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>Pulse</span>
                                            <Activity size={14} color="#044e42" />
                                        </div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginTop: '0.25rem' }}>98 bpm</div>
                                        <span style={{ fontSize: '0.68rem', background: '#dcfce7', color: '#15803d', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>
                                            Normal
                                        </span>
                                    </div>

                                    {/* SpO2 */}
                                    <div style={{ background: '#eff6ff', borderRadius: '12px', padding: '0.85rem', border: '1px solid #dbeafe' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.72rem', color: '#1d4ed8', fontWeight: '600' }}>SpO2</span>
                                            <Wind size={14} color="#1d4ed8" />
                                        </div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e40af', marginTop: '0.25rem' }}>97%</div>
                                        <span style={{ fontSize: '0.68rem', background: '#dbeafe', color: '#1d4ed8', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>
                                            Optimal
                                        </span>
                                    </div>

                                    {/* Weight */}
                                    <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '0.85rem', border: '1px solid #f1f5f9' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>Weight</span>
                                            <Scale size={14} color="#64748b" />
                                        </div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginTop: '0.25rem' }}>68 kg</div>
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: '600' }}>Metric</span>
                                    </div>

                                    {/* Height & BMI */}
                                    <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '0.85rem', border: '1px solid #f1f5f9' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>BMI</span>
                                            <Ruler size={14} color="#64748b" />
                                        </div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginTop: '0.25rem' }}>23.5</div>
                                        <span style={{ fontSize: '0.68rem', background: '#dcfce7', color: '#15803d', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>
                                            Healthy
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Past Visit Summary Timeline */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                                <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: '#0f172a' }}>
                                    Past Visit History
                                </h3>
                                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>3 previous encounters</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                {/* Visit 1 */}
                                <div style={{
                                    background: '#f8fafc',
                                    borderRadius: '14px',
                                    padding: '1rem',
                                    border: '1px solid #eef2f6',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0f172a' }}>05 Oct 2024</span>
                                            <span style={{ fontSize: '0.72rem', background: '#e2e8f0', color: '#475569', padding: '0.1rem 0.45rem', borderRadius: '6px', fontWeight: '600' }}>CHC Visit</span>
                                        </div>
                                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem', color: '#475569' }}>
                                            Viral fever, symptomatic treatment · <strong>Doctor 2</strong>
                                        </p>
                                    </div>
                                    <span style={{ color: '#044e42', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}>
                                        View →
                                    </span>
                                </div>

                                {/* Visit 2 */}
                                <div style={{
                                    background: '#f8fafc',
                                    borderRadius: '14px',
                                    padding: '1rem',
                                    border: '1px solid #eef2f6',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0f172a' }}>10 Aug 2024</span>
                                            <span style={{ fontSize: '0.72rem', background: '#e2e8f0', color: '#475569', padding: '0.1rem 0.45rem', borderRadius: '6px', fontWeight: '600' }}>Follow-up</span>
                                        </div>
                                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem', color: '#475569' }}>
                                            Recovered, no new complaints · <strong>Doctor 3</strong>
                                        </p>
                                    </div>
                                    <span style={{ color: '#044e42', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}>
                                        View →
                                    </span>
                                </div>

                                {/* Visit 3 */}
                                <div style={{
                                    background: '#f8fafc',
                                    borderRadius: '14px',
                                    padding: '1rem',
                                    border: '1px solid #eef2f6',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0f172a' }}>12 Jun 2024</span>
                                            <span style={{ fontSize: '0.72rem', background: '#e2e8f0', color: '#475569', padding: '0.1rem 0.45rem', borderRadius: '6px', fontWeight: '600' }}>General OPD</span>
                                        </div>
                                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem', color: '#475569' }}>
                                            Hypertension follow-up · <strong>Doctor 2</strong>
                                        </p>
                                    </div>
                                    <span style={{ color: '#044e42', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}>
                                        View →
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: Vitals Trend (Catchy visual demo feature) */}
                {activeTab === 'Vitals Trend' && (
                    <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '14px', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <TrendingUp size={18} color="#044e42" />
                            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>
                                Physiological Vitals Comparison (Last 3 Visits)
                            </h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                            <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Blood Pressure Trend</div>
                                <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0.35rem 0' }}>120/80 mmHg</div>
                                <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: '700' }}>↓ -18 mmHg from baseline</div>
                            </div>

                            <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Body Temperature</div>
                                <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ea580c', margin: '0.35rem 0' }}>101.2 °F</div>
                                <div style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: '700' }}>↑ Acute Elevation</div>
                            </div>

                            <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Pulse Rate</div>
                                <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0.35rem 0' }}>98 bpm</div>
                                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>Normal Sinus Rhythm</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other Tabs fallback view */}
                {activeTab !== 'Current Visit' && activeTab !== 'Vitals Trend' && (
                    <div style={{ padding: '2.5rem', textAlign: 'center', background: '#f8fafc', borderRadius: '14px', marginBottom: '2rem', color: '#64748b' }}>
                        <FileText size={32} color="#044e42" style={{ margin: '0 auto 0.75rem auto', opacity: 0.7 }} />
                        <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a' }}>{activeTab} Loaded</h4>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem' }}>Displaying verified historical records for Patient 1.</p>
                    </div>
                )}

                {/* Big Full-Width Catchy CTA Button */}
                <button
                    onClick={handleContinue}
                    style={{
                        width: '100%',
                        background: '#044e42',
                        color: '#ffffff',
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '12px',
                        fontWeight: '800',
                        fontSize: '0.98rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 14px rgba(4, 78, 66, 0.25)',
                        transition: 'all 0.15s ease'
                    }}
                >
                    Continue to Consultation Notes →
                </button>
            </div>
        </div>
    );
}
