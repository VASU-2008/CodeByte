import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Users, 
    Clock, 
    AlertTriangle, 
    CheckCircle, 
    Search, 
    ArrowRight, 
    QrCode, 
    Filter,
    Stethoscope,
    RefreshCw
} from 'lucide-react';
import { getDoctorQueue } from '../../../api/doctorApi';

/**
 * DoctorDashboard Component (Nordic Wellness Glass Theme)
 * Today's patient queue, triage status badges, and rapid consultation handoff.
 */
export default function DoctorDashboard() {
    const navigate = useNavigate();
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('ALL');

    const fetchQueue = async () => {
        setLoading(true);
        try {
            const data = await getDoctorQueue();
            setQueue(data || []);
        } catch (error) {
            console.error('Failed to fetch patient queue:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueue();
    }, []);

    const handleSelectPatient = (encounter) => {
        // Store selected active encounter in localStorage so subpages pick it up
        localStorage.setItem('activeDoctorEncounterId', encounter._id);
        navigate(`/doctor/briefing?encounterId=${encounter._id}`);
    };

    // Filter queue items
    const filteredQueue = queue.filter(item => {
        const matchesSearch = 
            item.patient_id?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.token_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.chief_complaint?.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (filterCategory === 'URGENT') return item.priority === 'URGENT' || item.triage_result?.includes('PRIORITY');
        if (filterCategory === 'IN_QUEUE') return item.status === 'IN_QUEUE';
        if (filterCategory === 'IN_CONSULTATION') return item.status === 'IN_CONSULTATION';

        return true;
    });

    const waitingCount = queue.filter(q => q.status === 'IN_QUEUE').length;
    const inConsultCount = queue.filter(q => q.status === 'IN_CONSULTATION').length;
    const urgentCount = queue.filter(q => q.priority === 'URGENT').length;

    const glassCardStyle = {
        background: 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(20, 184, 166, 0.18)',
        borderRadius: '16px',
        padding: '1.25rem',
        boxShadow: '0 8px 24px rgba(15, 118, 110, 0.05)'
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.65rem', fontWeight: '800', color: '#0f172a' }}>Today's Clinical Queue</h1>
                    <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.9rem', color: '#0f766e' }}>
                        Primary Health Centre · Real-time patient triage & consultation stream
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={fetchQueue}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            background: '#ffffff',
                            border: '1px solid #ccfbf1',
                            color: '#0f766e',
                            padding: '0.65rem 1rem',
                            borderRadius: '10px',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                        }}
                    >
                        <RefreshCw size={15} />
                        Refresh
                    </button>
                    <button
                        onClick={() => navigate('/doctor/scan')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.65rem 1.25rem',
                            borderRadius: '10px',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(15, 118, 110, 0.25)'
                        }}
                    >
                        <QrCode size={16} />
                        Scan Patient QR
                    </button>
                </div>
            </div>

            {/* Quick Metrics Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
                <div style={glassCardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>Waiting in Queue</span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                            <Users size={16} />
                        </div>
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginTop: '0.4rem' }}>{waitingCount}</div>
                    <span style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: '500' }}>Ready for consultation</span>
                </div>

                <div style={glassCardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>In Consultation</span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f766e' }}>
                            <Stethoscope size={16} />
                        </div>
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f766e', marginTop: '0.4rem' }}>{inConsultCount}</div>
                    <span style={{ fontSize: '0.72rem', color: '#0f766e', fontWeight: '500' }}>Active session</span>
                </div>

                <div style={glassCardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>Urgent Triage</span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
                            <AlertTriangle size={16} />
                        </div>
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#dc2626', marginTop: '0.4rem' }}>{urgentCount}</div>
                    <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: '500' }}>Requires fast-track review</span>
                </div>

                <div style={glassCardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>Completed Today</span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                            <CheckCircle size={16} />
                        </div>
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#16a34a', marginTop: '0.4rem' }}>8</div>
                    <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: '500' }}>Signed & locked</span>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div style={{ ...glassCardStyle, marginBottom: '1.5rem', padding: '0.85rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1, minWidth: '240px' }}>
                    <Search size={16} color="#0f766e" />
                    <input
                        type="text"
                        placeholder="Search patient by name, token ID, or complaint..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            width: '100%',
                            fontSize: '0.9rem',
                            color: '#0f172a'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['ALL', 'URGENT', 'IN_QUEUE', 'IN_CONSULTATION'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            style={{
                                border: filterCategory === cat ? '1px solid #0f766e' : '1px solid #e2e8f0',
                                background: filterCategory === cat ? '#ccfbf1' : '#ffffff',
                                color: filterCategory === cat ? '#0f766e' : '#64748b',
                                padding: '0.35rem 0.8rem',
                                borderRadius: '8px',
                                fontSize: '0.78rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            {cat === 'ALL' ? 'All Patients' : cat.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Patients Queue List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {loading ? (
                    <div style={{ ...glassCardStyle, textAlign: 'center', padding: '3rem', color: '#0f766e' }}>
                        Loading patient queue...
                    </div>
                ) : filteredQueue.length === 0 ? (
                    <div style={{ ...glassCardStyle, textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                        No patients found matching the selected filter.
                    </div>
                ) : (
                    filteredQueue.map(item => {
                        const isUrgent = item.priority === 'URGENT';
                        return (
                            <div
                                key={item._id}
                                style={{
                                    ...glassCardStyle,
                                    borderLeft: isUrgent ? '4px solid #ef4444' : '4px solid #0f766e',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    transition: 'transform 0.15s ease'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1, minWidth: '280px' }}>
                                    <div style={{
                                        background: isUrgent ? '#fee2e2' : '#ccfbf1',
                                        color: isUrgent ? '#b91c1c' : '#0f766e',
                                        padding: '0.5rem 0.85rem',
                                        borderRadius: '12px',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase' }}>Token</div>
                                        <div style={{ fontSize: '0.95rem', fontWeight: '800' }}>{item.token_id}</div>
                                    </div>

                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
                                                {item.patient_id?.name}
                                            </h3>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                                ({item.patient_id?.age} y/o, {item.patient_id?.gender})
                                            </span>
                                            {isUrgent && (
                                                <span style={{
                                                    fontSize: '0.68rem',
                                                    background: '#fee2e2',
                                                    color: '#b91c1c',
                                                    padding: '0.15rem 0.5rem',
                                                    borderRadius: '6px',
                                                    fontWeight: '700',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem'
                                                }}>
                                                    <AlertTriangle size={12} />
                                                    URGENT
                                                </span>
                                            )}
                                        </div>

                                        <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.86rem', color: '#334155' }}>
                                            <strong>Chief Complaint:</strong> {item.chief_complaint}
                                        </p>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.4rem', fontSize: '0.74rem', color: '#64748b' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                <Clock size={12} />
                                                Arrived: {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <span>·</span>
                                            <span>Triage: <strong>{item.triage_result}</strong></span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        onClick={() => handleSelectPatient(item)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                                            color: '#ffffff',
                                            border: 'none',
                                            padding: '0.7rem 1.35rem',
                                            borderRadius: '10px',
                                            fontWeight: '600',
                                            fontSize: '0.88rem',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 12px rgba(15, 118, 110, 0.2)'
                                        }}
                                    >
                                        Attend Patient
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
