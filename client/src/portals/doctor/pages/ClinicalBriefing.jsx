import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    ArrowLeft, 
    ArrowRight, 
    ShieldCheck, 
    Mic, 
    AlertTriangle, 
    Edit, 
    Heart, 
    Thermometer, 
    Activity, 
    Wind, 
    Scale, 
    Ruler, 
    TrendingUp, 
    Pill, 
    FileText, 
    Calendar,
    Clock,
    CheckCircle2,
    Eye,
    Users
} from 'lucide-react';
import { getPatientByToken, getAllDemoPatients, getActiveSessionToken } from '../../../api/doctorApi';

/**
 * ClinicalBriefing Component (Smooth Transitions & Demo-Ready)
 * Smooth tab transitions for all 5 sections with rich, stable layouts.
 */
export default function ClinicalBriefing() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('Current Visit');

    const params = new URLSearchParams(location.search);
    const rawToken = params.get('encounterId') || getActiveSessionToken();
    // Format token cleanly if a full URL was passed
    const displayToken = rawToken.includes('/') ? rawToken.split('/').pop() : rawToken;

    const patient = getPatientByToken(displayToken);
    const demoPatients = getAllDemoPatients();

    const handleSelectPatient = (token) => {
        localStorage.setItem('activeDoctorEncounterId', token);
        navigate(`/doctor/briefing?encounterId=${token}`);
    };

    const tabs = ['Current Visit', 'Past Visits', 'Vitals Trend', 'Medicines', 'Documents'];

    const handleContinue = () => {
        navigate(`/doctor/consultation?encounterId=${patient.token}`);
    };

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #eef2f6',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
        padding: '1.75rem',
        marginBottom: '1.5rem'
    };

    const tabContentStyle = {
        minHeight: '360px',
        transition: 'opacity 0.2s ease, transform 0.2s ease'
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

            {/* Quick Patient Switcher Bar */}
            <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #eef2f6',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
                padding: '0.85rem 1.25rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={16} color="#044e42" />
                    <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569' }}>
                        Patient Dossier Switcher:
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {demoPatients.map((p) => {
                        const isSelected = p.token === patient.token;
                        const isInConsult = p.status === 'In Consultation';
                        return (
                            <button
                                key={p.token}
                                type="button"
                                onClick={() => handleSelectPatient(p.token)}
                                style={{
                                    background: isSelected ? '#044e42' : '#f8fafc',
                                    color: isSelected ? '#ffffff' : '#334155',
                                    border: isSelected ? '1.5px solid #044e42' : '1px solid #e2e8f0',
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.78rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                {isInConsult && (
                                    <span style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: isSelected ? '#34d399' : '#1d4ed8'
                                    }}></span>
                                )}
                                <span>{p.name}</span>
                                <span style={{
                                    fontSize: '0.7rem',
                                    opacity: isSelected ? 0.85 : 0.65
                                }}>
                                    ({p.token.startsWith('P-') ? p.token : 'QR Pass'})
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Clinical Dossier Card */}
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
                            P{patient.id}
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                                <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
                                    {patient.name}
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
                                <span style={{
                                    fontSize: '0.74rem',
                                    background: patient.token === 'P-002' ? '#dbeafe' : patient.token === 'P-004' ? '#dcfce7' : '#fef3c7',
                                    color: patient.token === 'P-002' ? '#1d4ed8' : patient.token === 'P-004' ? '#15803d' : '#b45309',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '10px',
                                    fontWeight: '700'
                                }}>
                                    {patient.token === 'P-002' ? 'In Consultation' : patient.token === 'P-004' ? 'Completed' : 'Waiting in Queue'}
                                </span>
                            </div>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.84rem', color: '#64748b' }}>
                                {patient.age} years | {patient.gender} | Token: <strong>{patient.token}</strong> | ABHA ID: <strong>{patient.abhaId}</strong>
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{
                            background: patient.hasAllergy ? '#fee2e2' : '#e6f7f2',
                            color: patient.hasAllergy ? '#b91c1c' : '#044e42',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '10px',
                            fontSize: '0.78rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                        }}>
                            {patient.hasAllergy ? <AlertTriangle size={14} /> : <ShieldCheck size={14} />}
                            {patient.allergy}
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

                {/* Tab Panel Content with Smooth Render */}
                <div style={tabContentStyle}>
                    {/* Tab 1: Current Visit */}
                    {activeTab === 'Current Visit' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', marginBottom: '1.5rem' }}>
                            {/* Left Column: Complaint & Visual Vitals */}
                            <div>
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
                                        "{patient.complaint}"
                                    </p>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                                        <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: '#0f172a' }}>
                                            Current Vitals Check
                                        </h3>
                                        <button
                                            onClick={() => navigate(`/doctor/consultation?encounterId=${patient.token}`)}
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
                                        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '0.85rem', border: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>BP</span>
                                                <Heart size={14} color="#044e42" />
                                            </div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginTop: '0.25rem' }}>{patient.bp}</div>
                                            <span style={{ fontSize: '0.68rem', background: '#dcfce7', color: '#15803d', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>Normal</span>
                                        </div>

                                        <div style={{ background: '#fffbeb', borderRadius: '12px', padding: '0.85rem', border: '1px solid #fef3c7' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.72rem', color: '#92400e', fontWeight: '600' }}>Temp</span>
                                                <Thermometer size={14} color="#ea580c" />
                                            </div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#9a3412', marginTop: '0.25rem' }}>{patient.temp}</div>
                                            <span style={{ fontSize: '0.68rem', background: '#fee2e2', color: '#dc2626', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>Recorded</span>
                                        </div>

                                        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '0.85rem', border: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>Pulse</span>
                                                <Activity size={14} color="#044e42" />
                                            </div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginTop: '0.25rem' }}>{patient.pulse}</div>
                                            <span style={{ fontSize: '0.68rem', background: '#dcfce7', color: '#15803d', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>Normal</span>
                                        </div>

                                        <div style={{ background: '#eff6ff', borderRadius: '12px', padding: '0.85rem', border: '1px solid #dbeafe' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.72rem', color: '#1d4ed8', fontWeight: '600' }}>SpO2</span>
                                                <Wind size={14} color="#1d4ed8" />
                                            </div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e40af', marginTop: '0.25rem' }}>{patient.spo2}</div>
                                            <span style={{ fontSize: '0.68rem', background: '#dbeafe', color: '#1d4ed8', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>Optimal</span>
                                        </div>

                                        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '0.85rem', border: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>Weight</span>
                                                <Scale size={14} color="#64748b" />
                                            </div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginTop: '0.25rem' }}>{patient.weight}</div>
                                            <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: '600' }}>Metric</span>
                                        </div>

                                        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '0.85rem', border: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>BMI</span>
                                                <Ruler size={14} color="#64748b" />
                                            </div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginTop: '0.25rem' }}>{patient.bmi}</div>
                                            <span style={{ fontSize: '0.68rem', background: '#dcfce7', color: '#15803d', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>Healthy</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Past Visit Summary */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: '#0f172a' }}>
                                        Past Visit History
                                    </h3>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{patient.pastVisits?.length || 0} previous encounters</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                    {patient.pastVisits?.map((visit, idx) => (
                                        <div key={idx} style={{ background: '#f8fafc', borderRadius: '14px', padding: '1rem', border: '1px solid #eef2f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0f172a' }}>{visit.date}</span>
                                                    <span style={{ fontSize: '0.72rem', background: '#e2e8f0', color: '#475569', padding: '0.1rem 0.45rem', borderRadius: '6px', fontWeight: '600' }}>{visit.facility}</span>
                                                </div>
                                                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem', color: '#475569' }}>
                                                    {visit.diagnosis} · <strong>{visit.doctor}</strong>
                                                </p>
                                            </div>
                                            <span onClick={() => setActiveTab('Past Visits')} style={{ color: '#044e42', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}>View →</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Past Visits (Full Timeline) */}
                    {activeTab === 'Past Visits' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>Complete Encounter History</h3>
                                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Authorized by Patient Consent QR</span>
                            </div>

                            {patient.pastVisits?.map((v, i) => (
                                <div key={i} style={{ background: '#f8fafc', borderRadius: '14px', padding: '1.25rem', border: '1px solid #eef2f6' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                            <Calendar size={16} color="#044e42" />
                                            <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '0.95rem' }}>{v.date}</span>
                                            <span style={{ fontSize: '0.75rem', background: '#e6f7f2', color: '#044e42', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: '700' }}>{v.facility}</span>
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Attending: <strong>{v.doctor}</strong></span>
                                    </div>
                                    <div style={{ fontSize: '0.86rem', color: '#334155', marginBottom: '0.35rem' }}><strong>Diagnosis:</strong> {v.diagnosis}</div>
                                    <div style={{ fontSize: '0.82rem', color: '#044e42' }}><strong>Prescribed:</strong> {v.rx}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tab 3: Vitals Trend */}
                    {activeTab === 'Vitals Trend' && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <TrendingUp size={18} color="#044e42" />
                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>
                                    Physiological Vitals Trend ({patient.name})
                                </h3>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>Blood Pressure Trend</div>
                                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', margin: '0.35rem 0' }}>{patient.bp} mmHg</div>
                                    <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '700' }}>Monitored with Digital Sphygmo</div>
                                </div>

                                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>Body Temperature</div>
                                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#ea580c', margin: '0.35rem 0' }}>{patient.temp}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: '700' }}>Clinical Oral Thermometry</div>
                                </div>

                                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>Pulse Rate & Rhythm</div>
                                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', margin: '0.35rem 0' }}>{patient.pulse}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#044e42', fontWeight: '700' }}>Regular Sinus Rhythm</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 4: Medicines */}
                    {activeTab === 'Medicines' && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>Active & Recommended Formularies</h3>
                                <span style={{ fontSize: '0.78rem', color: '#15803d', background: '#dcfce7', padding: '0.2rem 0.6rem', borderRadius: '8px', fontWeight: '700' }}>
                                    Adherence Score: 95%
                                </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {patient.medications?.map((med, idx) => (
                                    <div key={idx} style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem', border: '1px solid #eef2f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '0.92rem' }}>{med.name}</div>
                                            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>{med.strength} · {med.frequency} · {med.timing} ({med.duration})</div>
                                        </div>
                                        <span style={{ fontSize: '0.75rem', background: '#e6f7f2', color: '#044e42', padding: '0.2rem 0.55rem', borderRadius: '6px', fontWeight: '700' }}>
                                            Active
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab 5: Documents */}
                    {activeTab === 'Documents' && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>Verified Diagnostic Reports</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                {[
                                    { title: 'Complete Blood Count (CBC)', date: '05 Oct 2024', status: 'Within Normal Limits' },
                                    { title: 'Lipid Profile & Serum Creatinine', date: '12 Jun 2024', status: 'Normal Kidney Function' },
                                    { title: 'Resting 12-Lead ECG', date: '12 Jun 2024', status: 'Normal Sinus Rhythm' },
                                    { title: 'Chest X-Ray (PA View)', date: '22 Mar 2024', status: 'Clear Lung Fields' }
                                ].map((doc, i) => (
                                    <div key={i} style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem', border: '1px solid #eef2f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.88rem' }}>{doc.title}</div>
                                            <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '0.15rem' }}>{doc.date} · {doc.status}</div>
                                        </div>
                                        <button style={{ background: '#ffffff', border: '1px solid #e2e8f0', color: '#044e42', padding: '0.35rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}>
                                            View
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Big Full-Width Clean CTA Button */}
                <button
                    onClick={handleContinue}
                    style={{
                        width: '100%',
                        background: '#044e42',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.95rem',
                        borderRadius: '12px',
                        fontWeight: '800',
                        fontSize: '0.95rem',
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
