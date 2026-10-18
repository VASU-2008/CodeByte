import React, { useState } from 'react';
import { 
  ClipboardList, 
  Sparkles, 
  Calendar, 
  User, 
  ArrowRight, 
  Search, 
  MapPin, 
  Stethoscope, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  FileCheck
} from 'lucide-react';

/**
 * FollowupTracking (Aura HealthTech Theme - Doctor Portal Aligned)
 * Connects clinical encounter follow-up discharge instructions with
 * field-level VeyoraAI care coordination.
 */
export default function FollowupTracking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const [followups, setFollowups] = useState([
    {
      encounterId: 'ENC-8821',
      patient: 'Meena Sharma',
      token: 'P-001',
      diagnosis: 'Diabetes Follow-up: Retinopathy review & renal panel',
      followUpDate: '25 Oct 2026',
      clinician: 'Dr. A. Sen',
      facility: 'PHC Rampur',
      status: 'DUE_SOON',
      assignedVeyoraAI: 'VeyoraAI Kavita Ben',
      contact: '+91 98765 43210'
    },
    {
      encounterId: 'ENC-7814',
      patient: 'Ramesh Kumar',
      token: 'P-002',
      diagnosis: 'Hypertension stabilization & Metformin tolerance check',
      followUpDate: '28 Oct 2026',
      clinician: 'Dr. Meera Rao',
      facility: 'CHC Shivgarh',
      status: 'SCHEDULED',
      assignedVeyoraAI: 'VeyoraAI Suman Lata',
      contact: '+91 98123 45678'
    },
    {
      encounterId: 'ENC-6590',
      patient: 'Sunita Devi',
      token: 'P-003',
      diagnosis: 'Post-operative wound inspection & stitch removal',
      followUpDate: '19 Oct 2026',
      clinician: 'Dr. Rajiv Malhotra',
      facility: 'Sub-Centre Bilaspur',
      status: 'OVERDUE',
      assignedVeyoraAI: 'VeyoraAI Pooja Verma',
      contact: '+91 97654 32109'
    },
    {
      encounterId: 'ENC-5542',
      patient: 'Mohan Lal Verma',
      token: 'P-004',
      diagnosis: 'Cardiology Teleconsult Review & ECG Assessment',
      followUpDate: '30 Oct 2026',
      clinician: 'Dr. P. Sharma',
      facility: 'District Hospital',
      status: 'CONFIRMED',
      assignedVeyoraAI: 'VeyoraAI Suman Lata',
      contact: '+91 99887 76655'
    }
  ]);

  const [calledId, setCalledId] = useState(null);

  const handleCall = (id) => {
    setCalledId(id);
    setTimeout(() => setCalledId(null), 3000);
  };

  const filteredFollowups = followups.filter((f) => {
    const matchesSearch = f.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.encounterId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.facility.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterStatus === 'DUE_SOON') return f.status === 'DUE_SOON' || f.status === 'OVERDUE';
    if (filterStatus === 'SCHEDULED') return f.status === 'SCHEDULED' || f.status === 'CONFIRMED';
    return true;
  });

  const dueCount = followups.filter(f => f.status === 'DUE_SOON' || f.status === 'OVERDUE').length;
  const confirmedCount = followups.filter(f => f.status === 'CONFIRMED' || f.status === 'SCHEDULED').length;

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '1.75rem',
        border: '1px solid #eef2f6',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700',
                background: '#e8f7f2',
                color: '#044e42',
                border: '1px solid #cceee5'
              }}>
                <Sparkles size={12} color="#044e42" />
                VeyoraAI Care Continuity
              </span>
            </div>
            <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
              Follow-up Tracking & Handoffs
            </h2>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.86rem', color: '#64748b' }}>
              Upcoming patient clinical follow-ups scheduled by attending physicians with field verification.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#64748b' }}>
            <Calendar size={15} color="#64748b" />
            <span>Mon, 13 Jan 2025</span>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
          {/* Total Follow-ups */}
          <div style={{
            background: '#e8f7f2',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#044e42', lineHeight: '1' }}>{followups.length}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#044e42', marginTop: '0.35rem' }}>Total Follow-ups</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#cceee5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
              <ClipboardList size={20} />
            </div>
          </div>

          {/* Due Soon / Overdue */}
          <div style={{
            background: '#fffbeb',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#b45309', lineHeight: '1' }}>{dueCount}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#b45309', marginTop: '0.35rem' }}>Due Soon / Overdue</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309' }}>
              <Clock size={20} />
            </div>
          </div>

          {/* Confirmed / Scheduled */}
          <div style={{
            background: '#eff6ff',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1d4ed8', lineHeight: '1' }}>{confirmedCount}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1d4ed8', marginTop: '0.35rem' }}>Confirmed Schedules</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <div style={{
            flex: '1 1 260px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '0.55rem 0.85rem'
          }}>
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by patient, hospital, diagnosis or encounter ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '0.85rem',
                color: '#0f172a'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['ALL', 'DUE_SOON', 'SCHEDULED'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  border: filterStatus === st ? '1px solid #044e42' : '1px solid #e2e8f0',
                  background: filterStatus === st ? '#044e42' : '#ffffff',
                  color: filterStatus === st ? '#ffffff' : '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {st === 'ALL' ? 'All Follow-ups' : st === 'DUE_SOON' ? 'Due Soon' : 'Scheduled'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Follow-up Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredFollowups.map((f) => {
          const isOverdue = f.status === 'OVERDUE';
          const isDueSoon = f.status === 'DUE_SOON';
          const isConfirmed = f.status === 'CONFIRMED';

          return (
            <div
              key={f.encounterId}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #eef2f6',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.02)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
                      {f.patient}
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: '#044e42', background: '#e8f7f2', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: '700', fontFamily: 'monospace' }}>
                      {f.token}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#334155', fontWeight: '600', marginTop: '0.35rem' }}>
                    {f.diagnosis}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    background: isOverdue ? '#fee2e2' : isDueSoon ? '#fef3c7' : '#dcfce7',
                    color: isOverdue ? '#dc2626' : isDueSoon ? '#b45309' : '#15803d',
                    border: isOverdue ? '1px solid #fecaca' : isDueSoon ? '1px solid #fde68a' : '1px solid #bbf7d0'
                  }}>
                    {f.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Meta strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem',
                background: '#fafbfc',
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                border: '1px solid #f1f5f9',
                fontSize: '0.8rem',
                color: '#64748b'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Calendar size={14} color="#044e42" />
                  <span>Target Date: <strong style={{ color: '#0f172a' }}>{f.followUpDate}</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <MapPin size={14} color="#044e42" />
                  <span>Facility: <strong style={{ color: '#0f172a' }}>{f.facility}</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Stethoscope size={14} color="#044e42" />
                  <span>Doctor: <strong style={{ color: '#0f172a' }}>{f.clinician}</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <User size={14} color="#044e42" />
                  <span>VeyoraAI Agent: <strong style={{ color: '#0f172a' }}>{f.assignedVeyoraAI}</strong></span>
                </div>
              </div>

              {/* Action buttons row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.35rem' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Encounter Source: <span style={{ fontFamily: 'monospace', fontWeight: '600', color: '#044e42' }}>{f.encounterId}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <button
                    onClick={() => handleCall(f.encounterId)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      background: calledId === f.encounterId ? '#dcfce7' : '#e6f7f2',
                      color: calledId === f.encounterId ? '#15803d' : '#044e42',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <PhoneCall size={13} />
                    {calledId === f.encounterId ? 'Connecting Call...' : 'Call Patient'}
                  </button>

                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      background: '#044e42',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span>View Clinical Discharge</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}