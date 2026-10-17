import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Users, 
    Search, 
    Calendar, 
    ArrowRight, 
    Sparkles, 
    Clock, 
    CheckCircle2, 
    ChevronDown, 
    Eye 
} from 'lucide-react';
import { getDoctorQueue } from '../../../api/doctorApi';

/**
 * PatientQueue Component (Aura HealthTech Theme)
 * Simple yet catchy and interactive patient queue with live status pills,
 * instant filter tabs, and fast-track consultation buttons.
 */
export default function PatientQueue() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('ALL');
    const [loading, setLoading] = useState(true);

    const [patients, setPatients] = useState([
        { id: 1, name: 'Patient 1', ageGender: '42 / M', token: 'P-001', status: 'Waiting', priority: 'Moderate', complaint: 'Fever and body ache since 2 days' },
        { id: 2, name: 'Patient 2', ageGender: '36 / F', token: 'P-002', status: 'In Consultation', priority: 'High', complaint: 'Severe headache and elevated BP' },
        { id: 3, name: 'Patient 3', ageGender: '28 / M', token: 'P-003', status: 'Waiting', priority: 'Routine', complaint: 'Acute stomach cramps and nausea' },
        { id: 4, name: 'Patient 4', ageGender: '55 / F', token: 'P-004', status: 'Completed', priority: 'Routine', complaint: 'Diabetes routine check-up & refill' },
        { id: 5, name: 'Patient 5', ageGender: '31 / M', token: 'P-005', status: 'Waiting', priority: 'Routine', complaint: 'Sore throat and mild cough' },
        { id: 6, name: 'Patient 6', ageGender: '29 / F', token: 'VY-TOK-DEMO-7G8H9I', status: 'Waiting', priority: 'Routine', complaint: 'Seasonal allergic rhinitis' }
    ]);

    useEffect(() => {
        let isMounted = true;
        getDoctorQueue().then(data => {
            if (isMounted && data && data.length > 0) {
                setPatients(data);
                setLoading(false);
            }
        }).catch(err => {
            console.error(err);
            if (isMounted) setLoading(false);
        });
        return () => { isMounted = false; };
    }, []);

    const filteredPatients = patients.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              p.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              p.complaint.toLowerCase().includes(searchTerm.toLowerCase());
        if (!matchesSearch) return false;
        if (activeTab === 'WAITING') return p.status === 'Waiting';
        if (activeTab === 'IN_CONSULTATION') return p.status === 'In Consultation';
        if (activeTab === 'COMPLETED') return p.status === 'Completed';
        return true;
    });

    const handleAction = (patient) => {
        localStorage.setItem('activeDoctorEncounterId', patient.token);
        navigate(`/doctor/briefing?encounterId=${patient.token}`);
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
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={cardStyle}>
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
                                Today's Patient Queue
                            </h2>
                            <span style={{ fontSize: '0.72rem', background: '#edf2fe', color: '#2563eb', padding: '0.15rem 0.55rem', borderRadius: '10px', fontWeight: '700' }}>
                                Live Stream
                            </span>
                        </div>
                        <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                            Primary Health Centre · Real-time patient triage stream
                        </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#64748b' }}>
                        <Calendar size={15} color="#64748b" />
                        <span>Mon, 13 Jan 2025</span>
                    </div>
                </div>

                {/* Catchy Interactive Filter Tabs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1.25rem' }}>
                    {[
                        { key: 'ALL', label: 'All Patients', count: patients.length },
                        { key: 'WAITING', label: 'Waiting', count: patients.filter(p => p.status === 'Waiting').length },
                        { key: 'IN_CONSULTATION', label: 'In Consultation', count: patients.filter(p => p.status === 'In Consultation').length },
                        { key: 'COMPLETED', label: 'Completed', count: patients.filter(p => p.status === 'Completed').length }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            style={{
                                background: activeTab === tab.key ? '#2563eb' : '#f8fafc',
                                color: activeTab === tab.key ? '#ffffff' : '#475569',
                                border: activeTab === tab.key ? '1px solid #2563eb' : '1px solid #e2e8f0',
                                padding: '0.45rem 0.95rem',
                                borderRadius: '20px',
                                fontSize: '0.82rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            <span>{tab.label}</span>
                            <span style={{
                                background: activeTab === tab.key ? 'rgba(255, 255, 255, 0.25)' : '#e2e8f0',
                                color: activeTab === tab.key ? '#ffffff' : '#64748b',
                                padding: '0.1rem 0.45rem',
                                borderRadius: '10px',
                                fontSize: '0.72rem'
                            }}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '0.65rem 1rem',
                    marginBottom: '1.5rem'
                }}>
                    <Search size={16} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search patient name, token (e.g. P-001), or symptoms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            fontSize: '0.88rem',
                            color: '#1e293b',
                            width: '100%'
                        }}
                    />
                </div>

                {/* Catchy & Clean Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.78rem', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem 0.6rem' }}>#</th>
                            <th style={{ padding: '0.75rem 0.6rem' }}>Patient</th>
                            <th style={{ padding: '0.75rem 0.6rem' }}>Age / Gender</th>
                            <th style={{ padding: '0.75rem 0.6rem' }}>Token ID</th>
                            <th style={{ padding: '0.75rem 0.6rem' }}>Status</th>
                            <th style={{ padding: '0.75rem 0.6rem', textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient) => {
                            const isWaiting = patient.status === 'Waiting';
                            const isInConsult = patient.status === 'In Consultation';
                            const isCompleted = patient.status === 'Completed';

                            const statusBg = isWaiting ? '#fef3c7' : isInConsult ? '#edf2fe' : '#dcfce7';
                            const statusColor = isWaiting ? '#b45309' : isInConsult ? '#2563eb' : '#15803d';

                            return (
                                <tr 
                                    key={patient.id} 
                                    style={{ 
                                        borderBottom: '1px solid #f1f5f9',
                                        transition: 'background 0.15s ease'
                                    }}
                                >
                                    <td style={{ padding: '1rem 0.6rem', color: '#64748b', fontWeight: '600' }}>
                                        {patient.id}
                                    </td>
                                    <td style={{ padding: '1rem 0.6rem' }}>
                                        <div style={{ fontWeight: '800', color: '#0f172a' }}>{patient.name}</div>
                                        <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '0.1rem' }}>{patient.complaint}</div>
                                    </td>
                                    <td style={{ padding: '1rem 0.6rem', color: '#475569' }}>
                                        {patient.ageGender}
                                    </td>
                                    <td style={{ padding: '1rem 0.6rem' }}>
                                        <span style={{ background: '#f1f5f9', color: '#334155', padding: '0.2rem 0.55rem', borderRadius: '6px', fontWeight: '700', fontSize: '0.78rem' }}>
                                            {patient.token}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 0.6rem' }}>
                                        <span style={{
                                            background: statusBg,
                                            color: statusColor,
                                            padding: '0.25rem 0.65rem',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.3rem'
                                        }}>
                                            {isWaiting && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#b45309' }}></span>}
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 0.6rem', textAlign: 'right' }}>
                                        {isWaiting ? (
                                            <button
                                                onClick={() => handleAction(patient)}
                                                style={{
                                                    background: '#2563eb',
                                                    color: '#ffffff',
                                                    border: 'none',
                                                    padding: '0.5rem 1.25rem',
                                                    borderRadius: '10px',
                                                    fontWeight: '700',
                                                    fontSize: '0.82rem',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                                                    transition: 'all 0.15s ease'
                                                }}
                                            >
                                                Start
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleAction(patient)}
                                                style={{
                                                    background: '#ffffff',
                                                    color: '#2563eb',
                                                    border: '1.5px solid #bfdbfe',
                                                    padding: '0.5rem 1.25rem',
                                                    borderRadius: '10px',
                                                    fontWeight: '700',
                                                    fontSize: '0.82rem',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease'
                                                }}
                                            >
                                                View
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
