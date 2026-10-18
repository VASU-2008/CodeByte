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
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
        padding: '1.5rem',
        marginBottom: '1.5rem'
    };

    return (
        <div style={{ maxWidth: '1040px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }}>
            <div style={cardStyle}>
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>
                                Clinical Patient Queue
                            </h2>
                            <span style={{ fontSize: '0.72rem', background: '#f0f9ff', color: '#0369a1', padding: '0.15rem 0.55rem', borderRadius: '9999px', fontWeight: '600', border: '1px solid #bae6fd' }}>
                                Real-Time Stream
                            </span>
                        </div>
                        <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                            Primary Health Centre · Real-time patient triage & token sequence
                        </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#64748b', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.3rem 0.7rem', borderRadius: '6px' }}>
                        <Calendar size={14} color="#64748b" />
                        <span>Today · Active Session</span>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {[
                        { key: 'ALL', label: 'All Patients', count: patients.length },
                        { key: 'WAITING', label: 'Waiting', count: patients.filter(p => p.status === 'Waiting').length },
                        { key: 'IN_CONSULTATION', label: 'In Consultation', count: patients.filter(p => p.status === 'In Consultation').length },
                        { key: 'COMPLETED', label: 'Completed', count: patients.filter(p => p.status === 'Completed').length }
                    ].map(tab => {
                        const isActive = activeTab === tab.key;
                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                style={{
                                    background: isActive ? '#0284c7' : '#ffffff',
                                    color: isActive ? '#ffffff' : '#475569',
                                    border: isActive ? '1px solid #0284c7' : '1px solid #e2e8f0',
                                    padding: '0.4rem 0.85rem',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                <span>{tab.label}</span>
                                <span style={{
                                    background: isActive ? 'rgba(255, 255, 255, 0.25)' : '#f1f5f9',
                                    color: isActive ? '#ffffff' : '#64748b',
                                    padding: '0.1rem 0.45rem',
                                    borderRadius: '4px',
                                    fontSize: '0.72rem'
                                }}>
                                    {tab.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Search Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '0.55rem 0.85rem',
                    marginBottom: '1.25rem'
                }}>
                    <Search size={16} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search patient name, token ID (e.g. P-001), or symptoms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            fontSize: '0.85rem',
                            color: '#0f172a',
                            width: '100%'
                        }}
                    />
                </div>

                {/* Editorial Clean Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.75rem', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                <th style={{ padding: '0.65rem 0.75rem', fontWeight: '600' }}>#</th>
                                <th style={{ padding: '0.65rem 0.75rem', fontWeight: '600' }}>Patient</th>
                                <th style={{ padding: '0.65rem 0.75rem', fontWeight: '600' }}>Demographics</th>
                                <th style={{ padding: '0.65rem 0.75rem', fontWeight: '600' }}>Token ID</th>
                                <th style={{ padding: '0.65rem 0.75rem', fontWeight: '600' }}>Status</th>
                                <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right', fontWeight: '600' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((patient) => {
                                const isWaiting = patient.status === 'Waiting';
                                const isInConsult = patient.status === 'In Consultation';

                                const statusBg = isWaiting ? '#fffbeb' : isInConsult ? '#f0f9ff' : '#f0fdf4';
                                const statusBorder = isWaiting ? '#fde68a' : isInConsult ? '#bae6fd' : '#bbf7d0';
                                const statusColor = isWaiting ? '#b45309' : isInConsult ? '#0369a1' : '#166534';

                                return (
                                    <tr 
                                        key={patient.id} 
                                        style={{ 
                                            borderBottom: '1px solid #f1f5f9',
                                            transition: 'background 0.15s ease'
                                        }}
                                    >
                                        <td style={{ padding: '0.875rem 0.75rem', color: '#64748b', fontWeight: '500' }}>
                                            {patient.id}
                                        </td>
                                        <td style={{ padding: '0.875rem 0.75rem' }}>
                                            <div style={{ fontWeight: '600', color: '#0f172a' }}>{patient.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.1rem' }}>{patient.complaint}</div>
                                        </td>
                                        <td style={{ padding: '0.875rem 0.75rem', color: '#475569' }}>
                                            {patient.ageGender}
                                        </td>
                                        <td style={{ padding: '0.875rem 0.75rem' }}>
                                            <span style={{ background: '#f8fafc', color: '#334155', border: '1px solid #e2e8f0', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: '600', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                                                {patient.token}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.875rem 0.75rem' }}>
                                            <span style={{
                                                background: statusBg,
                                                border: `1px solid ${statusBorder}`,
                                                color: statusColor,
                                                padding: '0.2rem 0.55rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.72rem',
                                                fontWeight: '600',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.3rem'
                                            }}>
                                                {isWaiting && <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#b45309' }}></span>}
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.875rem 0.75rem', textAlign: 'right' }}>
                                            {isWaiting ? (
                                                <button
                                                    onClick={() => handleAction(patient)}
                                                    style={{
                                                        background: '#0284c7',
                                                        color: '#ffffff',
                                                        border: 'none',
                                                        padding: '0.4rem 0.95rem',
                                                        borderRadius: '6px',
                                                        fontWeight: '600',
                                                        fontSize: '0.78rem',
                                                        cursor: 'pointer',
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
                                                        color: '#0284c7',
                                                        border: '1px solid #cbd5e1',
                                                        padding: '0.4rem 0.95rem',
                                                        borderRadius: '6px',
                                                        fontWeight: '600',
                                                        fontSize: '0.78rem',
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
        </div>
    );
}
