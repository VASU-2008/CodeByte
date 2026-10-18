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
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
        padding: '1.5rem',
        marginBottom: '1.25rem'
    };

    return (
        <div style={{ maxWidth: '1040px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }}>
            {/* Top Clinician Header Card */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    {/* Doctor Info & Hospital Affiliation */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '50%',
                            background: '#0284c7',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            flexShrink: 0
                        }}>
                            {doctor.avatar}
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>
                                    {doctor.name}
                                </h1>
                                <span style={{
                                    background: '#f0fdf4',
                                    color: '#166534',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.72rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    border: '1px solid #bbf7d0'
                                }}>
                                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#16a34a' }}></span>
                                    On Duty
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#475569', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                <Building2 size={15} color="#0284c7" />
                                <span><strong>{doctor.hospital}</strong> · {doctor.cabin}</span>
                            </div>

                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>
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
                                gap: '0.45rem',
                                background: '#ffffff',
                                border: '1px solid #fee2e2',
                                color: '#dc2626',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '0.825rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            <LogOut size={15} />
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            {/* 3 Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{
                    ...cardStyle,
                    marginBottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0f172a', lineHeight: '1' }}>{totalCount}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginTop: '0.35rem' }}>Total Patients Today</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.15rem' }}>Completed: {completedCount} · In Consultation: {inConsultCount}</div>
                    </div>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                        <Users size={20} />
                    </div>
                </div>

                <div style={{
                    ...cardStyle,
                    marginBottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0284c7', lineHeight: '1' }}>{inConsultCount}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#0284c7', marginTop: '0.35rem' }}>In Consultation</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.15rem' }}>
                            {inConsultationPatient ? `Active: ${inConsultationPatient.name} (${inConsultationPatient.token})` : 'No Active Session'}
                        </div>
                    </div>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f0f9ff', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                        <UserCheck size={20} />
                    </div>
                </div>

                <div style={{
                    ...cardStyle,
                    marginBottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#d97706', lineHeight: '1' }}>{waitingCount}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d97706', marginTop: '0.35rem' }}>Waiting in Queue</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.15rem' }}>
                            Next: {nextWaitingPatient ? `${nextWaitingPatient.name} (${nextWaitingPatient.token})` : 'Queue Clear'}
                        </div>
                    </div>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fffbeb', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                        <Clock size={20} />
                    </div>
                </div>
            </div>

            {/* Next Up Patient Spotlight Card */}
            <div style={{
                ...cardStyle,
                border: isCurrentlyAttending ? '1.5px solid #0284c7' : '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '10px',
                        background: isCurrentlyAttending ? '#f0f9ff' : '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: isCurrentlyAttending ? '#0284c7' : '#475569',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        fontWeight: '700'
                    }}>
                        P{activePatient.id}
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{
                                fontSize: '0.7rem',
                                background: isCurrentlyAttending ? '#f0f9ff' : '#fffbeb',
                                color: isCurrentlyAttending ? '#0284c7' : '#b45309',
                                border: isCurrentlyAttending ? '1px solid #bae6fd' : '1px solid #fde68a',
                                padding: '0.15rem 0.5rem',
                                borderRadius: '6px',
                                fontWeight: '700',
                                letterSpacing: '0.02em'
                            }}>
                                {isCurrentlyAttending ? 'CURRENTLY IN CONSULTATION' : 'NEXT IN LINE'}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Token: <strong>{activePatient.token}</strong></span>
                        </div>
                        <h3 style={{ margin: '0.25rem 0 0.15rem 0', fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
                            {activePatient.name} ({activePatient.age} / {activePatient.gender})
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.825rem', color: '#475569' }}>
                            <strong style={{ color: '#0f172a' }}>Chief Complaint:</strong> {activePatient.complaint}
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
                            background: '#0284c7',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.65rem 1.25rem',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            boxShadow: '0 1px 2px rgba(2, 132, 199, 0.2)',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <span>{isCurrentlyAttending ? `Resume Consultation` : `Attend ${activePatient.name}`}</span>
                        <ArrowRight size={15} />
                    </button>
                </div>
            </div>

            {/* Quick Navigation Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div 
                    onClick={() => navigate('/doctor/queue')}
                    style={{
                        ...cardStyle,
                        marginBottom: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'border-color 0.15s ease'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f0f9ff', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                            <Users size={20} />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>
                                View Full Patient Queue
                            </h4>
                            <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                                Review triage status, arrival order, and chief complaints
                            </p>
                        </div>
                    </div>
                    <ArrowRight size={16} color="#0284c7" />
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
                        transition: 'border-color 0.15s ease'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                            <QrCode size={20} />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>
                                Token Lookup & Optical Scan
                            </h4>
                            <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                                Fast-lookup patient consent pass via QR or Token ID
                            </p>
                        </div>
                    </div>
                    <ArrowRight size={16} color="#64748b" />
                </div>
            </div>
        </div>
    );
}
