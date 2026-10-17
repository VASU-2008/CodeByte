import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    User, 
    Building2, 
    LogOut, 
    Users, 
    UserCheck, 
    Clock, 
    ArrowRight, 
    QrCode, 
    Calendar,
    Stethoscope,
    ShieldCheck,
    CheckCircle2
} from 'lucide-react';
import { getPatientByToken } from '../../../api/doctorApi';

/**
 * DoctorDashboard Component (Minimal & Professional Home)
 * Simple and clean: Doctor username, hospital affiliation, quick metrics,
 * dynamic next patient spotlight, and logout.
 */
export default function DoctorDashboard() {
    const navigate = useNavigate();

    const activeToken = localStorage.getItem('activeDoctorEncounterId') || 'P-001';
    const activePatient = getPatientByToken(activeToken);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
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
            {/* Top Minimal Clinician Header Card */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.25rem' }}>
                    {/* Doctor Info & Hospital Affiliation */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: '#044e42',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.4rem',
                            fontWeight: '800',
                            boxShadow: '0 4px 14px rgba(4, 78, 66, 0.25)'
                        }}>
                            D1
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                <h1 style={{ margin: 0, fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>
                                    Doctor 1
                                </h1>
                                <span style={{
                                    background: '#e6f7f2',
                                    color: '#044e42',
                                    padding: '0.2rem 0.65rem',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                                    On Duty
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', fontSize: '0.88rem', marginTop: '0.35rem' }}>
                                <Building2 size={16} color="#044e42" />
                                <span><strong>Primary Health Centre (PHC North Main)</strong> · OPD Cabin #104</span>
                            </div>

                            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
                                Department of General Medicine · Reg ID: <strong>MCI-98442</strong>
                            </div>
                        </div>
                    </div>

                    {/* Quick Log Out Button */}
                    <div>
                        <button
                            onClick={handleLogout}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: '#ffffff',
                                border: '1.5px solid #fee2e2',
                                color: '#dc2626',
                                padding: '0.65rem 1.25rem',
                                borderRadius: '12px',
                                fontWeight: '700',
                                fontSize: '0.86rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            <LogOut size={16} />
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            {/* 3 Simple Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{
                    background: '#e8f7f2',
                    borderRadius: '16px',
                    padding: '1.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#044e42', lineHeight: '1' }}>12</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#044e42', marginTop: '0.4rem' }}>Total Patients Today</div>
                        <div style={{ fontSize: '0.72rem', color: '#065f46', marginTop: '0.15rem' }}>Completed: 8 · Scheduled: 4</div>
                    </div>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#cceee5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
                        <Users size={22} />
                    </div>
                </div>

                <div style={{
                    background: '#eff6ff',
                    borderRadius: '16px',
                    padding: '1.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#1d4ed8', lineHeight: '1' }}>5</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1d4ed8', marginTop: '0.4rem' }}>In Consultation</div>
                        <div style={{ fontSize: '0.72rem', color: '#2563eb', marginTop: '0.15rem' }}>Active Clinical Sessions</div>
                    </div>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
                        <UserCheck size={22} />
                    </div>
                </div>

                <div style={{
                    background: '#fffbeb',
                    borderRadius: '16px',
                    padding: '1.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#b45309', lineHeight: '1' }}>3</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#b45309', marginTop: '0.4rem' }}>Waiting in Queue</div>
                        <div style={{ fontSize: '0.72rem', color: '#92400e', marginTop: '0.15rem' }}>Active: {activePatient.name} ({activePatient.token})</div>
                    </div>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309' }}>
                        <Clock size={22} />
                    </div>
                </div>
            </div>

            {/* Next Up Patient Spotlight Card */}
            <div style={{
                background: '#ffffff',
                borderRadius: '18px',
                border: '2px solid #e6f7f2',
                boxShadow: '0 4px 20px rgba(4, 78, 66, 0.05)',
                padding: '1.75rem',
                marginBottom: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.25rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: '#e6f7f2',
                        color: '#044e42',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        fontWeight: '800'
                    }}>
                        P{activePatient.id}
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.72rem', background: '#fef3c7', color: '#b45309', padding: '0.15rem 0.55rem', borderRadius: '8px', fontWeight: '700' }}>
                                ACTIVE SPOTLIGHT
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Token: <strong>{activePatient.token}</strong></span>
                        </div>
                        <h3 style={{ margin: '0.25rem 0 0.15rem 0', fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
                            {activePatient.name} ({activePatient.age} / {activePatient.gender})
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569' }}>
                            <strong>Chief Complaint:</strong> {activePatient.complaint}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={() => navigate(`/doctor/briefing?encounterId=${activePatient.token}`)}
                        style={{
                            background: '#044e42',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.75rem 1.4rem',
                            borderRadius: '12px',
                            fontWeight: '700',
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            boxShadow: '0 4px 12px rgba(4, 78, 66, 0.25)'
                        }}
                    >
                        Attend {activePatient.name}
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Quick Portal Navigation Links */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                <div 
                    onClick={() => navigate('/doctor/queue')}
                    style={{
                        ...cardStyle,
                        marginBottom: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'transform 0.15s ease'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#e6f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
                            <Users size={22} />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>
                                View Full Patient Queue
                            </h4>
                            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                                5 patients waiting and in consultation
                            </p>
                        </div>
                    </div>
                    <ArrowRight size={18} color="#044e42" />
                </div>

                <div 
                    onClick={() => navigate('/doctor/scan')}
                    style={{
                        ...cardStyle,
                        marginBottom: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'transform 0.15s ease'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
                            <QrCode size={22} />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>
                                Token Lookup & QR Scan
                            </h4>
                            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                                Live optical webcam scanner ready
                            </p>
                        </div>
                    </div>
                    <ArrowRight size={18} color="#1d4ed8" />
                </div>
            </div>
        </div>
    );
}
