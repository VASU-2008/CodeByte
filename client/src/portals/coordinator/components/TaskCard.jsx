import React from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  PhoneCall,
  Car,
  Pill,
  PhoneMissed,
  Activity,
  AlertTriangle,
  RotateCcw,
  Check,
  User,
  Info
} from 'lucide-react';

export default function TaskCard({
  task,
  onResolve,
  onReopen,
  onCallAsha,
  compact = false
}) {
  if (!task) return null;

  const isResolved = task.status === 'Resolved';
  const patientDisplayName = task.patientName || task.patient || 'Patient';
  const assignedAgent = task.assignee || task.assignedAsha || task.assignedVeyoraAI || 'VeyoraAI Agent';

  // Category Icon Mapping
  const getCategoryIcon = () => {
    const cat = (task.category || '').toLowerCase();
    if (cat.includes('transport')) return Car;
    if (cat.includes('medication')) return Pill;
    if (cat.includes('reminder') || cat.includes('call')) return PhoneMissed;
    if (cat.includes('vitals')) return Activity;
    return AlertTriangle;
  };

  const IconComponent = getCategoryIcon();

  return (
    <div
      style={{
        background: isResolved ? '#fafcfb' : '#ffffff',
        borderRadius: '16px',
        border: '1px solid #eef2f6',
        boxShadow: isResolved ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.03)',
        padding: compact ? '1rem' : '1.35rem',
        opacity: isResolved ? 0.75 : 1,
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isResolved ? '#e8f7f2' : task.priority === 'High' ? '#fffbeb' : '#eff6ff',
                color: isResolved ? '#044e42' : task.priority === 'High' ? '#b45309' : '#1d4ed8',
                flexShrink: 0,
              }}
            >
              {isResolved ? <CheckCircle2 size={20} /> : <IconComponent size={20} />}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>
                  {patientDisplayName}
                </h3>
                {(task.patientAge || task.patientGender) && (
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '500' }}>
                    ({task.patientAge ? `${task.patientAge}y` : ''}
                    {task.patientAge && task.patientGender ? ' · ' : ''}
                    {task.patientGender})
                  </span>
                )}
                {task.tokenNumber && (
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'monospace',
                      fontWeight: '700',
                      background: '#f1f5f9',
                      color: '#475569',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    {task.tokenNumber}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                {task.village && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={12} color="#94a3b8" />
                    {task.village}
                  </span>
                )}
                {task.timestamp && (
                  <>
                    <span>·</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} color="#94a3b8" />
                      {task.timestamp}
                    </span>
                  </>
                )}
                {task.encounterId && (
                  <>
                    <span>·</span>
                    <span style={{ fontFamily: 'monospace' }}>{task.encounterId}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Badges: Category, Priority, Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            {task.categoryLabel && (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#475569',
                }}
              >
                {task.categoryLabel}
              </span>
            )}

            {task.priority === 'High' && (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '12px',
                  background: '#fffbeb',
                  border: '1px solid #fef3c7',
                  color: '#b45309',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d97706' }} />
                High Priority
              </span>
            )}

            {isResolved ? (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '12px',
                  background: '#e8f7f2',
                  border: '1px solid #cceee5',
                  color: '#044e42',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <Check size={12} />
                Resolved
              </span>
            ) : (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '12px',
                  background: '#eff6ff',
                  border: '1px solid #dbeafe',
                  color: '#1d4ed8',
                }}
              >
                Active
              </span>
            )}
          </div>
        </div>

        {/* Narrative / Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {task.title && (
            <h4 style={{ margin: 0, fontSize: '0.88rem', fontWeight: '700', color: '#0f172a' }}>
              {task.title}
            </h4>
          )}
          <p
            style={{
              margin: 0,
              fontSize: '0.84rem',
              color: '#475569',
              lineHeight: 1.5,
              background: '#f8fafc',
              padding: '0.75rem 0.9rem',
              borderRadius: '10px',
              border: '1px solid #eef2f6',
            }}
          >
            {task.description}
          </p>

          {task.actionRequired && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                background: '#fffbeb',
                border: '1px solid #fef3c7',
                borderRadius: '10px',
                padding: '0.65rem 0.85rem',
                fontSize: '0.78rem',
                color: '#92400e',
              }}
            >
              <Info size={15} color="#b45309" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#78350f' }}>Recommended Action: </strong>
                <span>{task.actionRequired}</span>
              </div>
            </div>
          )}

          {isResolved && task.resolutionNote && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                background: '#e8f7f2',
                border: '1px solid #cceee5',
                borderRadius: '10px',
                padding: '0.65rem 0.85rem',
                fontSize: '0.78rem',
                color: '#065f46',
              }}
            >
              <CheckCircle2 size={15} color="#044e42" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#044e42' }}>Resolution Note: </strong>
                <span>{task.resolutionNote}</span>
                {task.resolvedAt && (
                  <span style={{ marginLeft: '6px', fontStyle: 'italic', opacity: 0.8 }}>({task.resolvedAt})</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer / Assignee / Action */}
        <div
          style={{
            paddingTop: '0.75rem',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#044e42',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '0.75rem',
              }}
            >
              {assignedAgent ? assignedAgent.charAt(0) : 'V'}
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>
                {assignedAgent}
                {task.ashaSector && (
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '400', marginLeft: '4px' }}>
                    ({task.ashaSector})
                  </span>
                )}
              </div>
              {task.ashaPhone && (
                <div style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>{task.ashaPhone}</span>
                  <a
                    href={`tel:${task.ashaPhone}`}
                    onClick={(e) => {
                      if (onCallAsha) {
                        e.preventDefault();
                        onCallAsha(task);
                      }
                    }}
                    style={{ color: '#044e42', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                  >
                    <PhoneCall size={10} /> Call
                  </a>
                </div>
              )}
            </div>
          </div>

          <div>
            {!isResolved ? (
              <button
                onClick={() => onResolve && onResolve(task.id)}
                style={{
                  background: '#044e42',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 2px 6px rgba(4, 78, 66, 0.2)',
                  transition: 'all 0.15s ease',
                }}
              >
                <CheckCircle2 size={14} />
                Mark Resolved
              </button>
            ) : (
              <button
                onClick={() => onReopen && onReopen(task.id)}
                style={{
                  background: '#f8fafc',
                  color: '#475569',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <RotateCcw size={12} color="#64748b" />
                Reopen Task
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
