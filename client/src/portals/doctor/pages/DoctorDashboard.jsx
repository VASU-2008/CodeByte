import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Users, 
    UserCheck, 
    Clock, 
    Search, 
    Calendar,
    ChevronDown
} from 'lucide-react';

/**
 * DoctorDashboard Component (Aura HealthTech Theme)
 * Exact match for "Today's Patient Queue" with 3 KPI metric cards,
 * search & filter dropdown, and structured patient queue table.
 */
export default function DoctorDashboard() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const patientQueue = [
        { id: 1, name: 'Ravi Kumar', ageGender: '42 / M', token: 'P-001', status: 'Waiting' },
        { id: 2, name: 'Sunita Devi', ageGender: '36 / F', token: 'P-002', status: 'In Consultation' },
        { id: 3, name: 'Mohan Singh', ageGender: '28 / M', token: 'P-003', status: 'Waiting' },
        { id: 4, name: 'Asha Patel', ageGender: '55 / F', token: 'P-004', status: 'Completed' },
        { id: 5, name: 'Imran Khan', ageGender: '31 / M', token: 'P-005', status: 'Waiting' }
    ];

    const filteredPatients = patientQueue.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              p.token.toLowerCase().includes(searchTerm.toLowerCase());
        if (!matchesSearch) return false;
        if (statusFilter === 'WAITING') return p.status === 'Waiting';
        if (statusFilter === 'IN_CONSULTATION') return p.status === 'In Consultation';
        if (statusFilter === 'COMPLETED') return p.status === 'Completed';
        return true;
    });

    const handlePatientAction = (patient) => {
        localStorage.setItem('activeDoctorEncounterId', patient.token);
        navigate(`/doctor/briefing?encounterId=${patient.token}`);
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Top Queue Header Card */}
            <div style={{
                background: '#ffffff',
                borderRadius: '18px',
                padding: '1.75rem',
                border: '1px solid #eef2f6',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
                marginBottom: '1.5rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                        Today's Patient Queue
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#64748b' }}>
                        <Calendar size={15} color="#64748b" />
                        <span>Mon, 13 Jan 2025</span>
                    </div>
                </div>

                {/* 3 Metric Summary Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.75rem' }}>
                    {/* Total Patients */}
                    <div style={{
                        background: '#e8f7f2',
                        borderRadius: '14px',
                        padding: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#044e42', lineHeight: '1' }}>12</div>
                            <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#044e42', marginTop: '0.35rem' }}>Total Patients</div>
                        </div>
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#cceee5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
                            <Users size={20} />
                        </div>
                    </div>

                    {/* In Consultation */}
                    <div style={{
                        background: '#eff6ff',
                        borderRadius: '14px',
                        padding: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1d4ed8', lineHeight: '1' }}>5</div>
                            <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1d4ed8', marginTop: '0.35rem' }}>In Consultation</div>
                        </div>
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
                            <UserCheck size={20} />
                        </div>
                    </div>

                    {/* Waiting */}
                    <div style={{
                        background: '#fffbeb',
                        borderRadius: '14px',
                        padding: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#b45309', lineHeight: '1' }}>3</div>
                            <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#b45309', marginTop: '0.35rem' }}>Waiting</div>
                        </div>
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309' }}>
                            <Clock size={20} />
                        </div>
                    </div>
                </div>

                {/* Filter and Search Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '0.6rem 0.9rem',
                        flex: 1
                    }}>
                        <Search size={16} color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Search by patient name or token..."
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

                    <div style={{ position: 'relative' }}>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{
                                appearance: 'none',
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: '10px',
                                padding: '0.6rem 2.2rem 0.6rem 1rem',
                                fontSize: '0.88rem',
                                color: '#475569',
                                fontWeight: '500',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="ALL">All Status</option>
                            <option value="WAITING">Waiting</option>
                            <option value="IN_CONSULTATION">In Consultation</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                        <ChevronDown size={14} color="#94a3b8" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                </div>

                {/* Patients Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.78rem', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem 0.5rem' }}>#</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Patient</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Age/Gender</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Token</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                            <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient) => {
                            const isWaiting = patient.status === 'Waiting';
                            const isInConsult = patient.status === 'In Consultation';
                            const isCompleted = patient.status === 'Completed';

                            const statusBg = isWaiting ? '#fef3c7' : isInConsult ? '#dbeafe' : '#dcfce7';
                            const statusColor = isWaiting ? '#b45309' : isInConsult ? '#1d4ed8' : '#15803d';

                            return (
                                <tr key={patient.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem 0.5rem', color: '#64748b' }}>{patient.id}</td>
                                    <td style={{ padding: '1rem 0.5rem', fontWeight: '700', color: '#0f172a' }}>{patient.name}</td>
                                    <td style={{ padding: '1rem 0.5rem', color: '#64748b' }}>{patient.ageGender}</td>
                                    <td style={{ padding: '1rem 0.5rem', color: '#475569', fontWeight: '600' }}>{patient.token}</td>
                                    <td style={{ padding: '1rem 0.5rem' }}>
                                        <span style={{
                                            background: statusBg,
                                            color: statusColor,
                                            padding: '0.25rem 0.65rem',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            display: 'inline-block'
                                        }}>
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                                        {isWaiting ? (
                                            <button
                                                onClick={() => handlePatientAction(patient)}
                                                style={{
                                                    background: '#044e42',
                                                    color: '#ffffff',
                                                    border: 'none',
                                                    padding: '0.45rem 1.15rem',
                                                    borderRadius: '8px',
                                                    fontWeight: '600',
                                                    fontSize: '0.82rem',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Start
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handlePatientAction(patient)}
                                                style={{
                                                    background: '#ffffff',
                                                    color: '#044e42',
                                                    border: '1px solid #e2e8f0',
                                                    padding: '0.45rem 1.15rem',
                                                    borderRadius: '8px',
                                                    fontWeight: '600',
                                                    fontSize: '0.82rem',
                                                    cursor: 'pointer'
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
