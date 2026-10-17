import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { CheckCircle2, Clock, AlertCircle, RefreshCw, ChevronRight, Building2 } from 'lucide-react';

const STATUS_MAP = {
  COMPLETED:           { label: 'Completed',           labelHi: 'पूर्ण',            badge: 'pp-badge-success', icon: CheckCircle2 },
  FOLLOW_UP_DUE:       { label: 'Follow-up Due',       labelHi: 'फॉलो-अप आवश्यक',   badge: 'pp-badge-warning', icon: RefreshCw },
  IN_QUEUE:            { label: 'In Queue',            labelHi: 'प्रतीक्षा में',     badge: 'pp-badge-blue',    icon: Clock },
  IN_CONSULTATION:     { label: 'In Consultation',    labelHi: 'परामर्श में',        badge: 'pp-badge-purple',  icon: Clock },
  AWAITING_SIGN_OFF:   { label: 'Awaiting Sign-off',  labelHi: 'साइन-ऑफ प्रतीक्षा', badge: 'pp-badge-orange',  icon: AlertCircle },
  SCHEDULED:           { label: 'Scheduled',          labelHi: 'निर्धारित',         badge: 'pp-badge-blue',    icon: Clock },
  ESCALATED:           { label: 'Escalated',          labelHi: 'एस्केलेटेड',        badge: 'pp-badge-danger',  icon: AlertCircle },
};

const DEST_LABEL = { PHC: 'Primary Health Centre', CHC: 'Community Health Centre', OPD: 'OPD', EMERGENCY: 'Emergency' };
const DEST_LABEL_HI = { PHC: 'प्राथमिक स्वास्थ्य केंद्र', CHC: 'सामुदायिक स्वास्थ्य केंद्र', OPD: 'ओपीडी', EMERGENCY: 'आपातकाल' };

/**
 * TimelineItem — one encounter card in the visit history timeline.
 * Props:
 *   encounter  — Encounter object
 *   isFirst    — boolean (first in list)
 *   isLast     — boolean (last in list)
 *   lang       — 'en' | 'hi'
 */
export default function TimelineItem({ encounter, isFirst, isLast, lang = 'en' }) {
  const isHindi = lang === 'hi';
  const t = (en, hi) => isHindi ? hi : en;

  const statusInfo = STATUS_MAP[encounter.status] || {
    label: encounter.status, labelHi: encounter.status, badge: 'pp-badge-gray', icon: Clock
  };
  const StatusIcon = statusInfo.icon;

  let dateStr = '—';
  let timeStr = '';
  try {
    const d = parseISO(encounter.createdAt);
    dateStr = format(d, 'dd MMM yyyy');
    timeStr = format(d, 'h:mm a');
  } catch { /* malformed date */ }

  const destKey = encounter.triage_result;
  const destLabel = isHindi
    ? (DEST_LABEL_HI[destKey] || destKey)
    : (DEST_LABEL[destKey] || destKey);

  return (
    <div className="timeline-item" style={{ display: 'flex', gap: '1rem', paddingBottom: isLast ? 0 : '1.25rem' }}>
      {/* Timeline spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 36, flexShrink: 0 }}>
        <div className={`timeline-dot${encounter.is_signed_off ? ' timeline-dot--signed' : ''}`}>
          <StatusIcon size={14} />
        </div>
        {!isLast && <div className="timeline-line" />}
      </div>

      {/* Card */}
      <div className="pp-card pp-card-sm pp-animate-in" style={{ flex: 1, marginBottom: 0 }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--pp-text-muted)', marginBottom: '0.2rem' }}>
              {dateStr} {timeStr && <span style={{ marginLeft: '0.5rem' }}>{timeStr}</span>}
            </div>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-md)', color: 'var(--pp-text-primary)', lineHeight: 1.3 }}>
              {encounter.chief_complaint}
            </div>
          </div>
          <span className={`pp-badge ${statusInfo.badge}`}>
            <StatusIcon size={10} />
            {t(statusInfo.label, statusInfo.labelHi)}
          </span>
        </div>

        {/* Meta row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
          {destKey && (
            <span className="pp-badge pp-badge-blue" style={{ gap: '0.25rem' }}>
              <Building2 size={10} />
              {destLabel}
            </span>
          )}
          {encounter.is_signed_off && (
            <span className="pp-badge pp-badge-success">
              <CheckCircle2 size={10} />
              {t('Signed', 'हस्ताक्षरित')}
            </span>
          )}
          {encounter.parent_encounter_id && (
            <span className="pp-badge pp-badge-purple">
              {t('Follow-up', 'फॉलो-अप')}
            </span>
          )}
          {encounter.token_id && (
            <span className="pp-badge pp-badge-gray" style={{ fontFamily: 'monospace', fontSize: '0.68rem' }}>
              {encounter.token_id}
            </span>
          )}
        </div>

        {/* Footer link */}
        <div style={{ marginTop: '0.875rem', display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            to={`/patient/results?id=${encounter._id}`}
            className="pp-btn pp-btn-outline pp-btn-sm"
            style={{ textDecoration: 'none', gap: '0.375rem' }}
          >
            {t('View Details', 'विवरण देखें')}
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
        .timeline-dot {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: 2.5px solid var(--pp-border-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--pp-text-muted);
          flex-shrink: 0;
          z-index: 1;
          transition: all var(--transition-normal);
        }
        .timeline-dot--signed {
          background: var(--pp-success-bg);
          border-color: var(--pp-success);
          color: #065f46;
        }
        .timeline-line {
          width: 2px;
          flex: 1;
          background: linear-gradient(to bottom, var(--pp-border-strong) 0%, var(--pp-border) 100%);
          margin: 4px 0;
        }
      `}</style>
    </div>
  );
}
