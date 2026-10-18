import React from 'react';
import {
  Clock,
  ShieldCheck,
  AlertTriangle,
  Car,
  Pill,
  PhoneCall,
  Activity,
  UserCheck,
  CheckCircle2,
  FileText,
  Sparkles
} from 'lucide-react';

/**
 * AuditTimeline (Aura HealthTech Theme - Doctor Portal Aligned)
 * Clean clinical timeline with pine teal accents, soft pill badges, and structured metadata.
 */
export default function AuditTimeline({ events = [], logs = [], filterCategory = 'ALL' }) {
  const normalizedEvents = events.length > 0 ? events : logs.map((l, i) => ({
    id: `log-${i}`,
    title: l.event || l.title || 'System Trigger',
    description: l.details || l.description || '',
    timestamp: l.timestamp || 'Recent',
    category: l.category || 'system',
    severity: l.severity || 'warning',
    source: l.source || 'VeyoraAI Protocol Engine',
    actor: l.actor || 'System'
  }));

  const filteredEvents = normalizedEvents.filter(evt => {
    if (!filterCategory || filterCategory === 'ALL') return true;
    return evt.category?.toLowerCase() === filterCategory.toLowerCase();
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div style={{
        padding: '2.5rem',
        textAlign: 'center',
        fontSize: '0.88rem',
        color: '#64748b',
        borderRadius: '14px',
        background: '#f8fafc',
        border: '1px solid #eef2f6'
      }}>
        No audit log records found for this filter.
      </div>
    );
  }

  const getEventIcon = (category) => {
    switch (category) {
      case 'transport':
        return Car;
      case 'medication':
        return Pill;
      case 'reminder':
        return PhoneCall;
      case 'vitals':
        return Activity;
      case 'system':
      case 'rule':
        return Sparkles;
      case 'resolution':
        return CheckCircle2;
      default:
        return FileText;
    }
  };

  const getSeverityPill = (severity) => {
    switch (severity) {
      case 'critical':
        return { bg: '#fee2e2', text: '#dc2626', border: '#fecaca', label: 'CRITICAL' };
      case 'high':
      case 'warning':
        return { bg: '#fef3c7', text: '#b45309', border: '#fde68a', label: 'WARNING' };
      case 'success':
        return { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0', label: 'RESOLVED' };
      default:
        return { bg: '#e8f7f2', text: '#044e42', border: '#cceee5', label: 'INFO' };
    }
  };

  return (
    <div style={{
      position: 'relative',
      paddingLeft: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    }}>
      {/* Vertical Timeline Guide Line */}
      <div style={{
        position: 'absolute',
        left: '1.15rem',
        top: '1rem',
        bottom: '1rem',
        width: '2px',
        background: '#e2e8f0',
        borderRadius: '2px'
      }} />

      {filteredEvents.map((evt) => {
        const IconComponent = getEventIcon(evt.category);
        const pill = getSeverityPill(evt.severity);

        return (
          <div key={evt.id} style={{ position: 'relative' }}>
            {/* Timeline Node Dot */}
            <div style={{
              position: 'absolute',
              left: '-2.5rem',
              top: '0.75rem',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '2px solid #044e42',
              color: '#044e42',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(4, 78, 66, 0.15)',
              zIndex: 1
            }}>
              <IconComponent size={15} />
            </div>

            {/* Event Card */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #eef2f6',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                transition: 'box-shadow 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.02)')}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    background: pill.bg,
                    color: pill.text,
                    border: `1px solid ${pill.border}`,
                    letterSpacing: '0.5px'
                  }}>
                    {pill.label}
                  </span>

                  <span style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    background: '#f1f5f9',
                    color: '#475569',
                    textTransform: 'uppercase'
                  }}>
                    {evt.category || 'System'}
                  </span>

                  <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: '800', color: '#0f172a' }}>
                    {evt.title}
                  </h4>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                  <Clock size={13} color="#94a3b8" />
                  <span>{evt.timestamp}</span>
                </div>
              </div>

              {/* Event Description */}
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: '1.5' }}>
                {evt.description}
              </p>

              {/* Bottom metadata tags */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
                paddingTop: '0.5rem',
                borderTop: '1px solid #f8fafc',
                fontSize: '0.75rem',
                color: '#64748b'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span>
                    Source: <strong style={{ color: '#044e42' }}>{evt.source || 'VeyoraAI Gateway'}</strong>
                  </span>
                  {evt.encounterId && (
                    <span>
                      Encounter: <code style={{ color: '#044e42', fontFamily: 'monospace' }}>{evt.encounterId}</code>
                    </span>
                  )}
                </div>

                {evt.actor && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#475569' }}>
                    <UserCheck size={13} color="#044e42" />
                    <span>Actor: <strong style={{ color: '#0f172a' }}>{evt.actor}</strong></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
