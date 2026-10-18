import React, { useState } from 'react';
import AuditTimeline from '../components/AuditTimeline';
import { 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Activity, 
  FileText, 
  Clock, 
  AlertTriangle,
  Search
} from 'lucide-react';

/**
 * RulesAndAuditLog (Aura HealthTech Theme - Doctor Portal Aligned)
 * Complete traceability trail of system triggers, automated VeyoraAI outreach,
 * and escalation events.
 */
export default function RulesAndAuditLog() {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const auditLogs = [
    {
      id: 'AUDIT-01',
      title: 'Rule Triggered: 2-Missed-Doses (RULE-MED-02)',
      description: 'Patient Ramesh Kumar flagged by adherence engine for Metformin 500mg. VeyoraAI Suman Lata notified with urgent field outreach payload.',
      timestamp: '10:42 AM',
      category: 'medication',
      severity: 'critical',
      source: 'VeyoraAI Telemetry',
      actor: 'Adherence Daemon',
      encounterId: 'ENC-7814'
    },
    {
      id: 'AUDIT-02',
      title: 'VeyoraAI Outbound IVR Dispatched (RULE-IVR-01)',
      description: 'Pre-appointment reminder call placed for Meena Sharma. Transit barrier (flooded route) detected in audio transcription.',
      timestamp: '09:15 AM',
      category: 'transport',
      severity: 'warning',
      source: 'VeyoraAI Call Gateway',
      actor: 'Interactive IVR',
      encounterId: 'ENC-8821'
    },
    {
      id: 'AUDIT-03',
      title: 'Emergency Keyword & Vitals Intercept (RULE-VIT-04)',
      description: 'Mohan Lal Verma BP surge 174/104 mmHg captured from rural kiosk sensor. Teleconsult priority window opened.',
      timestamp: '08:30 AM',
      category: 'vitals',
      severity: 'critical',
      source: 'MediKiosk #02',
      actor: 'Kiosk Blood Pressure Sensor',
      encounterId: 'ENC-5542'
    },
    {
      id: 'AUDIT-04',
      title: 'Appointment Confirmed & SMS Delivery (RULE-NOTIF-03)',
      description: 'WhatsApp confirmation sent in Hindi to Sunita Devi for Sub-Centre Bilaspur follow-up appointment.',
      timestamp: 'Yesterday 06:12 PM',
      category: 'reminder',
      severity: 'success',
      source: 'Notification Dispatcher',
      actor: 'VeyoraAI Bot',
      encounterId: 'ENC-6590'
    },
    {
      id: 'AUDIT-05',
      title: 'Transport Van #2 Dispatched (RULE-LOG-01)',
      description: 'Coordinator assigned Driver Ramesh for Meena Sharma pick-up at Rampur river crossing point.',
      timestamp: 'Yesterday 04:45 PM',
      category: 'transport',
      severity: 'info',
      source: 'Fleet Gateway',
      actor: 'Human Coordinator'
    }
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (log.actor && log.actor.toLowerCase().includes(searchTerm.toLowerCase()));
    if (!matchesSearch) return false;
    if (filterCategory === 'ALL') return true;
    return log.category.toLowerCase() === filterCategory.toLowerCase();
  });

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
                VeyoraAI Audit Trail
              </span>
            </div>
            <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
              Rules Engine & Traceability Audit Log
            </h2>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.86rem', color: '#64748b' }}>
              Real-time audit record showing automated protocol triggers, IVR telephony events, and field interventions.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#64748b' }}>
            <Calendar size={15} color="#64748b" />
            <span>Mon, 13 Jan 2025</span>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
          {/* Active Protocol Rules */}
          <div style={{
            background: '#e8f7f2',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#044e42', lineHeight: '1' }}>14</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#044e42', marginTop: '0.35rem' }}>Active Protocols</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#cceee5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
              <ShieldCheck size={20} />
            </div>
          </div>

          {/* Events Logged */}
          <div style={{
            background: '#eff6ff',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1d4ed8', lineHeight: '1' }}>128</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1d4ed8', marginTop: '0.35rem' }}>Events Logged (24h)</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
              <Activity size={20} />
            </div>
          </div>

          {/* Critical Alerts */}
          <div style={{
            background: '#fef2f2',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#dc2626', lineHeight: '1' }}>3</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#dc2626', marginTop: '0.35rem' }}>Critical Interventions</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
              <AlertTriangle size={20} />
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
              placeholder="Search audit trail by event, keyword or actor..."
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

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['ALL', 'medication', 'transport', 'vitals', 'reminder'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  border: filterCategory === cat ? '1px solid #044e42' : '1px solid #e2e8f0',
                  background: filterCategory === cat ? '#044e42' : '#ffffff',
                  color: filterCategory === cat ? '#ffffff' : '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textTransform: 'capitalize'
                }}
              >
                {cat === 'ALL' ? 'All Protocols' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Timeline Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '1.75rem',
        border: '1px solid #eef2f6',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
            Chronological Event Stream
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Showing {filteredLogs.length} events
          </span>
        </div>

        <AuditTimeline events={filteredLogs} />
      </div>
    </div>
  );
}