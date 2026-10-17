import React, { useState, useEffect } from 'react';
import { getPatientVisits } from '../../../api/patientApi';
import TimelineItem from '../components/TimelineItem';
import { Clock, AlertCircle, RefreshCw, FilterX } from 'lucide-react';

const t = (lang, en, hi) => lang === 'hi' ? hi : en;

const STATUS_FILTERS = [
  { value: 'ALL',              label: 'All',              labelHi: 'सभी'            },
  { value: 'COMPLETED',        label: 'Completed',        labelHi: 'पूर्ण'          },
  { value: 'FOLLOW_UP_DUE',    label: 'Follow-up Due',    labelHi: 'फॉलो-अप'       },
  { value: 'IN_QUEUE',         label: 'In Queue',         labelHi: 'प्रतीक्षा'      },
];

function SkeletonTimeline() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ display: 'flex', gap: '1rem' }}>
          <div className="pp-skeleton" style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0 }} />
          <div className="pp-skeleton pp-card-sm" style={{ flex: 1, height: 120, borderRadius: 'var(--radius-xl)' }} />
        </div>
      ))}
    </div>
  );
}

export default function MyVisitsHistory({ lang = 'en' }) {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPatientVisits();
      setVisits(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = statusFilter === 'ALL'
    ? visits
    : visits.filter(v => v.status === statusFilter);

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--pp-text-primary)', marginBottom: '0.375rem' }}>
          {t(lang, 'Visit History', 'यात्रा इतिहास')}
        </h1>
        <p style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          {t(lang,
            'A chronological record of your healthcare encounters.',
            'आपकी स्वास्थ्य देखभाल यात्राओं का कालानुक्रमिक रिकॉर्ड।'
          )}
        </p>
      </div>

      {/* Filter bar */}
      {!loading && !error && visits.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: '0.25rem' }}>
            {t(lang, 'Filter:', 'फ़िल्टर:')}
          </span>
          {STATUS_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`pp-btn pp-btn-sm ${statusFilter === f.value ? 'pp-btn-primary' : 'pp-btn-ghost'}`}
              aria-pressed={statusFilter === f.value}
            >
              {t(lang, f.label, f.labelHi)}
            </button>
          ))}
          {statusFilter !== 'ALL' && (
            <button
              className="pp-btn pp-btn-ghost pp-btn-sm"
              onClick={() => setStatusFilter('ALL')}
              title={t(lang, 'Clear filter', 'फ़िल्टर हटाएं')}
            >
              <FilterX size={13} />
            </button>
          )}
        </div>
      )}

      {/* Loading */}
      {loading && <SkeletonTimeline />}

      {/* Error */}
      {!loading && error && (
        <div className="pp-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <AlertCircle size={36} style={{ color: 'var(--pp-danger)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
            {t(lang, 'Could not load history', 'इतिहास लोड नहीं हो सका')}
          </h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--pp-text-secondary)', marginBottom: '1.25rem' }}>{error}</p>
          <button className="pp-btn pp-btn-primary" onClick={load}>
            <RefreshCw size={14} /> {t(lang, 'Retry', 'पुनः प्रयास')}
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && visits.length === 0 && (
        <div className="pp-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <Clock size={40} style={{ color: 'var(--pp-primary-light)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontWeight: 600, color: 'var(--pp-text-primary)', marginBottom: '0.5rem' }}>
            {t(lang, 'No visits yet', 'अभी तक कोई यात्रा नहीं')}
          </h3>
          <p style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            {t(lang, 'Your visit history will appear here after your first consultation.', 'आपकी पहली परामर्श के बाद यात्रा इतिहास यहां दिखेगा।')}
          </p>
        </div>
      )}

      {/* Filter empty state */}
      {!loading && !error && visits.length > 0 && filtered.length === 0 && (
        <div className="pp-card pp-card-sm" style={{ textAlign: 'center', padding: '2rem' }}>
          <FilterX size={28} style={{ color: 'var(--pp-text-muted)', margin: '0 auto 0.75rem' }} />
          <p style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            {t(lang, 'No visits match this filter.', 'इस फ़िल्टर से मिलने वाली कोई यात्रा नहीं।')}
          </p>
          <button className="pp-btn pp-btn-ghost pp-btn-sm" style={{ marginTop: '0.75rem' }} onClick={() => setStatusFilter('ALL')}>
            {t(lang, 'Show all', 'सभी दिखाएं')}
          </button>
        </div>
      )}

      {/* Timeline */}
      {!loading && !error && filtered.length > 0 && (
        <div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)', marginBottom: '1rem', fontWeight: 500 }}>
            {t(lang, `${filtered.length} visit${filtered.length !== 1 ? 's' : ''} · newest first`, `${filtered.length} यात्राएं · नवीनतम पहले`)}
          </div>
          {filtered.map((enc, idx) => (
            <TimelineItem
              key={enc._id}
              encounter={enc}
              isFirst={idx === 0}
              isLast={idx === filtered.length - 1}
              lang={lang}
            />
          ))}
        </div>
      )}
    </div>
  );
}
