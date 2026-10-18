import React, { useState } from 'react';
import {
  BellRing,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Users,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  RefreshCw,
  PhoneForwarded
} from 'lucide-react';

export default function ReminderQueue() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const reminders = [
    {
      id: 'REM-01',
      patient: 'Meena Sharma',
      ageGender: '48 / F',
      time: '30 mins prior (10:30 AM)',
      callStatus: 'Barrier Reported',
      outcome: 'Rural Transport Help Needed (Culvert Flooded)',
      assignedVeyoraAI: 'VeyoraAI Kavita Ben',
      phone: '+91 98765 43210',
    },
    {
      id: 'REM-02',
      patient: 'Ramesh Kumar',
      ageGender: '52 / M',
      time: '30 mins prior (11:00 AM)',
      callStatus: 'Confirmed',
      outcome: 'Attendance Confirmed via IVR Dialout',
      assignedVeyoraAI: 'VeyoraAI Suman Lata',
      phone: '+91 98234 56789',
    },
    {
      id: 'REM-03',
      patient: 'Sunita Devi',
      ageGender: '35 / F',
      time: '30 mins prior (11:15 AM)',
      callStatus: 'Unresponsive',
      outcome: '3 Pings Dropped · Escalated to VeyoraAI Desk',
      assignedVeyoraAI: 'VeyoraAI Pooja Verma',
      phone: '+91 97123 45678',
    },
    {
      id: 'REM-04',
      patient: 'Imran Khan',
      ageGender: '31 / M',
      time: '30 mins prior (11:45 AM)',
      callStatus: 'Confirmed',
      outcome: 'Confirmed on 1st Ring · ETA 15 mins',
      assignedVeyoraAI: 'VeyoraAI Kavita Ben',
      phone: '+91 98345 67890',
    },
    {
      id: 'REM-05',
      patient: 'Geeta Rawat',
      ageGender: '62 / F',
      time: '30 mins prior (12:00 PM)',
      callStatus: 'Barrier Reported',
      outcome: 'Mobility Impaired · Auto-Rickshaw Voucher Dispatched',
      assignedVeyoraAI: 'VeyoraAI Suman Lata',
      phone: '+91 98987 65432',
    },
  ];

  const filteredReminders = reminders.filter((r) => {
    const matchesSearch =
      r.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.outcome.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === 'CONFIRMED') return r.callStatus === 'Confirmed';
    if (statusFilter === 'BARRIER') return r.callStatus === 'Barrier Reported';
    if (statusFilter === 'UNRESPONSIVE') return r.callStatus === 'Unresponsive';
    return true;
  });

  return (
    <div>
      {/* Top Header Card */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '18px',
          padding: '1.75rem',
          border: '1px solid #eef2f6',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span
                style={{
                  background: '#e6f7f2',
                  color: '#044e42',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <Sparkles size={13} />
                Autonomous Pre-Call Engine
              </span>
            </div>
            <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
              30-Minute Pre-Appointment Reminder Queue
            </h2>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#64748b' }}>
              Automated IVR call logs, barrier capture, and autonomous transport triage streams.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: '#64748b',
              background: '#f8fafc',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              border: '1px solid #eef2f6',
            }}
          >
            <Calendar size={15} color="#64748b" />
            <span>Today's Batch Schedule</span>
          </div>
        </div>

        {/* 4 Metric Summary Cards (Matches Doctor Portal KPI pattern) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem',
            marginBottom: '1.75rem',
          }}
        >
          {/* Total Calls */}
          <div
            style={{
              background: '#e8f7f2',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#044e42', lineHeight: '1' }}>
                18
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#044e42', marginTop: '0.35rem' }}>
                Total Reminders
              </div>
            </div>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#cceee5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#044e42',
              }}
            >
              <PhoneCall size={20} />
            </div>
          </div>

          {/* Confirmed via IVR */}
          <div
            style={{
              background: '#eff6ff',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1d4ed8', lineHeight: '1' }}>
                12
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1d4ed8', marginTop: '0.35rem' }}>
                Confirmed (IVR)
              </div>
            </div>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1d4ed8',
              }}
            >
              <CheckCircle2 size={20} />
            </div>
          </div>

          {/* Barriers Flagged */}
          <div
            style={{
              background: '#fffbeb',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#b45309', lineHeight: '1' }}>
                3
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#b45309', marginTop: '0.35rem' }}>
                Barriers Flagged
              </div>
            </div>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b45309',
              }}
            >
              <AlertTriangle size={20} />
            </div>
          </div>

          {/* Unresponsive */}
          <div
            style={{
              background: '#fef2f2',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#b91c1c', lineHeight: '1' }}>
                3
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#b91c1c', marginTop: '0.35rem' }}>
                Unresponsive Drop
              </div>
            </div>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#fee2e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b91c1c',
              }}
            >
              <BellRing size={20} />
            </div>
          </div>
        </div>

        {/* Filter and Search Row (Matches Doctor Portal layout) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '0.6rem 0.9rem',
              flex: 1,
            }}
          >
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by patient name, phone, or token..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '0.88rem',
                color: '#1e293b',
                width: '100%',
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
                cursor: 'pointer',
              }}
            >
              <option value="ALL">All Statuses</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="BARRIER">Barrier Reported</option>
              <option value="UNRESPONSIVE">Unresponsive</option>
            </select>
            <ChevronDown
              size={14}
              color="#94a3b8"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Reminders Table (Matches Doctor Portal Patient Queue Table) */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr
              style={{
                borderBottom: '1px solid #e2e8f0',
                color: '#64748b',
                fontSize: '0.78rem',
                textAlign: 'left',
              }}
            >
              <th style={{ padding: '0.75rem 0.5rem' }}>ID</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Patient</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Schedule Slot</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Call Status</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Outcome & Escalation Detail</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReminders.map((r) => {
              const isConfirmed = r.callStatus === 'Confirmed';
              const isBarrier = r.callStatus === 'Barrier Reported';
              const isUnresponsive = r.callStatus === 'Unresponsive';

              const statusBg = isConfirmed ? '#dcfce7' : isBarrier ? '#fef3c7' : '#fee2e2';
              const statusColor = isConfirmed ? '#15803d' : isBarrier ? '#b45309' : '#b91c1c';

              return (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: '700', color: '#044e42' }}>
                    {r.id}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>{r.patient}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {r.ageGender} · {r.phone}
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', color: '#475569' }}>{r.time}</td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <span
                      style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        background: statusBg,
                        color: statusColor,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      {isConfirmed && <CheckCircle2 size={12} />}
                      {isBarrier && <AlertTriangle size={12} />}
                      {isUnresponsive && <BellRing size={12} />}
                      {r.callStatus}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <div style={{ color: '#1e293b', fontWeight: '600' }}>{r.outcome}</div>
                    <div style={{ fontSize: '0.75rem', color: '#044e42', fontWeight: '500', marginTop: '2px' }}>
                      Assigned: {r.assignedVeyoraAI}
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>
                    <button
                      style={{
                        background: isBarrier ? '#044e42' : '#e6f7f2',
                        color: isBarrier ? '#ffffff' : '#044e42',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.45rem 0.85rem',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {isBarrier ? (
                        <>
                          <PhoneForwarded size={12} />
                          Triage Transport
                        </>
                      ) : (
                        <>
                          <RefreshCw size={12} />
                          Re-ping
                        </>
                      )}
                    </button>
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