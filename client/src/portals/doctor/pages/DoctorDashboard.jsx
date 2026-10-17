import React, { useState, useEffect } from 'react';
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
import { getPatientByToken, getLoggedInDoctor, getDoctorQueue } from '../../../api/doctorApi';

/**
 * DoctorDashboard Component (Minimal & Dynamic Professional Home)
 * Doctor username, hospital affiliation, live patient queue metrics,
 * dynamic next patient spotlight, and logout.
 */
export default function DoctorDashboard() {
    const navigate = useNavigate();

    // Dynamic Doctor Identity
    const doctor = getLoggedInDoctor();

    // Dynamic Patient Queue & Counts
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        getDoctorQueue().then(data => {
            if (isMounted) {
                setQueue(data || []);
                setLoading(false);
            }
        }).catch(err => {
            console.error(err);
            if (isMounted) setLoading(false);
        });
        return () => { isMounted = false; };
    }, []);

    const totalCount = queue.length;
    const completedCount = queue.filter(p => p.status === 'Completed').length;
    const inConsultCount = queue.filter(p => p.status === 'In Consultation').length;
    const waitingCount = queue.filter(p => p.status === 'Waiting').length;

    // Distinct patient resolutions for In Consultation vs Next Waiting
    const inConsultationPatient = queue.find(p => p.status === 'In Consultation');
    const nextWaitingPatient = queue.find(p => p.status === 'Waiting');

    // Spotlight prioritizes the active in-consultation patient, then the next waiting patient
    const spotlightData = inConsultationPatient || nextWaitingPatient || queue[0];
    const activePatient = getPatientByToken(spotlightData ? spotlightData.token : 'P-002');
    const isCurrentlyAttending = Boolean(inConsultationPatient && spotlightData?.token === inConsultationPatient.token);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 10px 30px rgba(37, 99, 235, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
        padding: '1.75rem',
        marginBottom: '1.5rem'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Top Clinician Header Card with Glassy Glow */}
            <div style={{
                ...cardStyle,
                background: 'radial-gradient(circle at top right, rgba(219, 234, 254, 0.65), transparent 60%), rgba(255, 255, 255, 0.88)',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 12px 35px rgba(37, 99, 235, 0.07)'
            }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.25rem' }}>
                    {/* Doctor Info & Hospital Affiliation */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.4rem',
                            fontWeight: '800',
                            boxShadow: '0 6px 18px rgba(37, 99, 235, 0.3)'
                        }}>
                            {doctor.avatar}
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                <h1 style={{ margin: 0, fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>
                                    {doctor.name}
                                </h1>
                                <span style={{
                                    background: 'rgba(237, 242, 254, 0.9)',
                                    color: '#2563eb',
                                    padding: '0.2rem 0.65rem',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    border: '1px solid rgba(191, 219, 254, 0.6)'
                                }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }}></span>
                                    On Duty
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', fontSize: '0.88rem', marginTop: '0.35rem' }}>
                                <Building2 size={16} color="#2563eb" />
                                <span><strong>{doctor.hospital}</strong> · {doctor.cabin}</span>
                            </div>

                            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
                                {doctor.department} · Reg ID: <strong>{doctor.regNumber}</strong>
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
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                border: '1.5px solid #fee2e2',
                                color: '#ef4444',
                                padding: '0.65rem 1.25rem',
                                borderRadius: '14px',
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

            {/* 3 Simple Metric Cards - Dynamic Counts (Glassy Pastel Aesthetic) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.82)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '22px',
                    border: '1px solid rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 8px 25px rgba(37, 99, 235, 0.04)',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', lineHeight: '1' }}>{totalCount}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginTop: '0.4rem' }}>Total Patients Today</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.15rem' }}>Completed: {completedCount} · In Consultation: {inConsultCount}</div>
                    </div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                        <Users size={22} />
                    </div>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.82)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '22px',
                    border: '1px solid rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 8px 25px rgba(37, 99, 235, 0.04)',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#2563eb', lineHeight: '1' }}>{inConsultCount}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#2563eb', marginTop: '0.4rem' }}>In Consultation</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.15rem' }}>
                            {inConsultationPatient ? `Active: ${inConsultationPatient.name} (${inConsultationPatient.token})` : 'No Active Session'}
                        </div>
                    </div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#edf2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                        <UserCheck size={22} />
                    </div>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.82)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '22px',
                    border: '1px solid rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 8px 25px rgba(37, 99, 235, 0.04)',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#d97706', lineHeight: '1' }}>{waitingCount}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#d97706', marginTop: '0.4rem' }}>Waiting in Queue</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.15rem' }}>
                            Next: {nextWaitingPatient ? `${nextWaitingPatient.name} (${nextWaitingPatient.token})` : 'Queue Clear'}
                        </div>
                    </div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                        <Clock size={22} />
                    </div>
                </div>
            </div>

            {/* Next Up Patient Spotlight Card */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '24px',
                border: isCurrentlyAttending ? '1.5px solid rgba(37, 99, 235, 0.4)' : '1px solid rgba(255, 255, 255, 0.9)',
                boxShadow: isCurrentlyAttending ? '0 10px 30px rgba(37, 99, 235, 0.08)' : '0 10px 30px rgba(37, 99, 235, 0.04)',
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
                        background: isCurrentlyAttending ? '#edf2fe' : '#f1f5f9',
                        color: isCurrentlyAttending ? '#2563eb' : '#475569',
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
                            <span style={{
                                fontSize: '0.72rem',
                                background: isCurrentlyAttending ? '#edf2fe' : '#fef3c7',
                                color: isCurrentlyAttending ? '#2563eb' : '#b45309',
                                padding: '0.15rem 0.55rem',
                                borderRadius: '8px',
                                fontWeight: '700'
                            }}>
                                {isCurrentlyAttending ? 'CURRENTLY IN CONSULTATION' : 'NEXT IN LINE'}
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
                        onClick={() => {
                            localStorage.setItem('activeDoctorEncounterId', activePatient.token);
                            navigate(`/doctor/briefing?encounterId=${activePatient.token}`);
                        }}
                        style={{
                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.85rem 1.6rem',
                            borderRadius: '16px',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        {isCurrentlyAttending ? `Resume Consultation with ${activePatient.name}` : `Attend ${activePatient.name}`}
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
                        borderRadius: '22px',
                        marginBottom: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'transform 0.15s ease'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#edf2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
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
                    <ArrowRight size={18} color="#2563eb" />
                </div>

                <div 
                    onClick={() => navigate('/doctor/scan')}
                    style={{
                        ...cardStyle,
                        borderRadius: '22px',
                        marginBottom: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'transform 0.15s ease'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea' }}>
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
                    <ArrowRight size={18} color="#9333ea" />
                </div>
            </div>
        </div>
    );
}
