import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getPatientVisits } from '../../../api/patientApi';
import { format, parseISO, differenceInDays } from 'date-fns';
import {
  Stethoscope, QrCode, Clock, RefreshCw, Pill,
  ArrowRight, Heart, AlertCircle, Sparkles, CalendarClock,
  CheckCircle2
} from 'lucide-react';

const t = (lang, en, hi) => lang === 'hi' ? hi : en;

function GreetingBanner({ lang, userName }) {
  const hour = new Date().getHours();
  const greet = hour < 12
    ? t(lang, 'Good morning', 'सुप्रभात')
    : hour < 17
    ? t(lang, 'Good afternoon', 'नमस्ते')
    : t(lang, 'Good evening', 'शुभ संध्या');

  const name = userName ? `, ${userName.split(' ')[0]}` : '';

  return (
    <div className="pp-card home-hero pp-animate-in" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <Sparkles size={18} style={{ color: '#fbbf24' }} />
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--pp-text-muted)', fontWeight: 500 }}>
          Veyora Healthcare
        </span>
      </div>
      <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800, color: 'var(--pp-text-primary)', lineHeight: 1.2, marginBottom: '0.5rem' }}>
        {greet}{name}! 👋
      </h1>
      <p style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-md)', maxWidth: 480 }}>
        {t(lang,
          'Your health is our priority. How are you feeling today?',
          'आपका स्वास्थ्य हमारी प्राथमिकता है। आज आप कैसा महसूस कर रहे हैं?'
        )}
      </p>
      <div style={{ marginTop: '1.25rem' }}>
        <Link to="/patient/intake" className="pp-btn pp-btn-primary pp-btn-lg" style={{ textDecoration: 'none' }}>
          <Stethoscope size={20} />
          {t(lang, 'Start New Consultation', 'नई परामर्श शुरू करें')}
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Decorative gradient blob */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: -30, right: -30,
        width: 180, height: 180, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <style>{`.home-hero { position: relative; overflow: hidden; }`}</style>
    </div>
  );
}

const QUICK_CARDS = [
  { to: '/patient/ai-coordinator', icon: Sparkles,  label: 'AI Care Coordinator', labelHi: 'एआई केयर समन्वयक', color: '#044e42', bg: '#ccfbf1' },
  { to: '/patient/qr-pass',        icon: QrCode,    label: 'My QR Pass',          labelHi: 'मेरा QR पास',       color: '#3b82f6', bg: '#eff6ff' },
  { to: '/patient/history',        icon: Clock,     label: 'Visit History',       labelHi: 'यात्रा इतिहास',     color: '#10b981', bg: '#d1fae5' },
  { to: '/patient/followup',       icon: RefreshCw, label: 'Follow-up',           labelHi: 'फॉलो-अप',           color: '#8b5cf6', bg: '#ede9fe' },
  { to: '/patient/medicines',      icon: Pill,      label: 'Medicines',           labelHi: 'दवाइयाँ',           color: '#f59e0b', bg: '#fef3c7' },
];

function QuickAccessCards({ lang }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.875rem', marginBottom: '1.5rem' }}>
      {QUICK_CARDS.map(({ to, icon: Icon, label, labelHi, color, bg }) => (
        <Link
          key={to}
          to={to}
          style={{ textDecoration: 'none' }}
        >
          <div className="pp-card pp-card-sm quick-card" style={{ textAlign: 'center', padding: '1.25rem 1rem', cursor: 'pointer' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 'var(--radius-xl)',
              background: bg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 0.75rem', color
            }}>
              <Icon size={22} />
            </div>
            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--pp-text-primary)', lineHeight: 1.3 }}>
              {t(lang, label, labelHi)}
            </div>
          </div>
        </Link>
      ))}
      <style>{`
        .quick-card { transition: transform 0.2s ease, box-shadow 0.2s ease !important; }
        .quick-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg) !important; }
      `}</style>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="pp-card pp-card-sm" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div className="pp-skeleton" style={{ height: 16, width: '60%' }} />
      <div className="pp-skeleton" style={{ height: 14, width: '90%' }} />
      <div className="pp-skeleton" style={{ height: 14, width: '75%' }} />
    </div>
  );
}

function RecentVisitCard({ encounter, lang }) {
  let dateStr = '—';
  try { dateStr = format(parseISO(encounter.createdAt), 'dd MMM yyyy'); } catch { /* */ }

  return (
    <div className="pp-card pp-card-sm pp-animate-in" style={{ marginBottom: '0.875rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)' }}>{dateStr}</span>
        <span className={`pp-badge ${encounter.status === 'COMPLETED' ? 'pp-badge-success' : 'pp-badge-warning'}`}>
          {encounter.status === 'COMPLETED' ? t(lang, 'Completed', 'पूर्ण') : t(lang, encounter.status, encounter.status)}
        </span>
      </div>
      <div style={{ fontWeight: 600, color: 'var(--pp-text-primary)', marginBottom: '0.5rem' }}>
        {encounter.chief_complaint}
      </div>
      {encounter.triage_result && (
        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--pp-text-secondary)' }}>
          <span style={{ fontWeight: 500 }}>{t(lang, 'Referred to:', 'रेफर किया गया:')} </span>
          {encounter.triage_result}
        </div>
      )}
      <div style={{ marginTop: '0.75rem' }}>
        <Link to={`/patient/results?id=${encounter._id}`} className="pp-btn pp-btn-outline pp-btn-sm" style={{ textDecoration: 'none' }}>
          {t(lang, 'View Result', 'परिणाम देखें')} <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

function FollowupCard({ encounter, lang }) {
  if (!encounter.followup?.recommended_date) return null;
  let daysLeft = null;
  let dateStr = '—';
  try {
    const d = parseISO(encounter.followup.recommended_date);
    dateStr = format(d, 'dd MMM yyyy');
    daysLeft = differenceInDays(d, new Date());
  } catch { /* */ }

  const urgent = daysLeft !== null && daysLeft <= 2;

  return (
    <div className={`pp-alert ${urgent ? 'pp-alert-warning' : 'pp-alert-info'}`} style={{ marginBottom: '1rem' }}>
      <CalendarClock size={20} style={{ flexShrink: 0, marginTop: 2 }} />
      <div>
        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
          {t(lang, 'Upcoming Follow-up', 'आगामी फॉलो-अप')}{urgent ? ' ⚠️' : ''}
        </div>
        <div style={{ fontSize: 'var(--font-size-sm)' }}>
          {dateStr}
          {daysLeft !== null && (
            <span style={{ marginLeft: '0.5rem', fontWeight: 500 }}>
              ({daysLeft === 0 ? t(lang, 'Today', 'आज') : daysLeft < 0 ? t(lang, 'Overdue', 'अतिदेय') : `${daysLeft} ${t(lang, 'days', 'दिन')}`})
            </span>
          )}
        </div>
        {encounter.followup.instructions && (
          <div style={{ marginTop: '0.25rem', fontSize: 'var(--font-size-xs)', opacity: 0.85 }}>
            {encounter.followup.instructions}
          </div>
        )}
        <Link to="/patient/followup" className="pp-btn pp-btn-sm" style={{
          marginTop: '0.625rem', textDecoration: 'none',
          background: 'rgba(255,255,255,0.7)', color: 'var(--pp-text-primary)', border: '1px solid var(--pp-border-strong)',
          borderRadius: 'var(--radius-lg)', display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
          padding: '0.35rem 0.875rem', fontSize: 'var(--font-size-xs)', fontWeight: 600
        }}>
          {t(lang, 'View Follow-up', 'फॉलो-अप देखें')} <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

export default function HomeTab({ lang = 'en' }) {
  const { user } = useAuth();
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPatientVisits()
      .then(data => setVisits(Array.isArray(data) ? data : []))
      .catch(err => setError(err?.message || 'Failed to load visits'))
      .finally(() => setLoading(false));
  }, []);

  const recentVisit = visits[0] || null;
  const followupVisit = visits.find(v => v.status === 'FOLLOW_UP_DUE' && v.followup?.recommended_date) || null;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <GreetingBanner lang={lang} userName={user?.name} />
      <QuickAccessCards lang={lang} />

      {/* Follow-up alert */}
      {!loading && followupVisit && <FollowupCard encounter={followupVisit} lang={lang} />}

      {/* Recent visit */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--pp-text-primary)', marginBottom: '0.875rem' }}>
          {t(lang, 'Recent Visit', 'हाल की यात्रा')}
        </h2>

        {loading && <SkeletonCard />}

        {!loading && error && (
          <div className="pp-alert pp-alert-danger">
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <div>
              <strong>{t(lang, 'Could not load visits', 'यात्राएं लोड नहीं हो सकीं')}</strong>
              <div style={{ fontSize: 'var(--font-size-sm)', marginTop: '0.2rem' }}>{error}</div>
            </div>
          </div>
        )}

        {!loading && !error && !recentVisit && (
          <div className="pp-card pp-card-sm" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <Heart size={40} style={{ color: 'var(--pp-primary-light)', margin: '0 auto 1rem' }} />
            <h3 style={{ fontWeight: 600, color: 'var(--pp-text-primary)', marginBottom: '0.5rem' }}>
              {t(lang, 'No visits yet', 'अभी तक कोई यात्रा नहीं')}
            </h3>
            <p style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-sm)', maxWidth: 300, margin: '0 auto 1.25rem' }}>
              {t(lang,
                'Start your first consultation to begin your care journey.',
                'अपनी देखभाल यात्रा शुरू करने के लिए पहली परामर्श शुरू करें।'
              )}
            </p>
            <Link to="/patient/intake" className="pp-btn pp-btn-primary" style={{ textDecoration: 'none' }}>
              <Stethoscope size={16} />
              {t(lang, 'Start Consultation', 'परामर्श शुरू करें')}
            </Link>
          </div>
        )}

        {!loading && !error && recentVisit && (
          <RecentVisitCard encounter={recentVisit} lang={lang} />
        )}
      </div>

      {!loading && visits.length > 1 && (
        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          <Link to="/patient/history" className="pp-btn pp-btn-ghost" style={{ textDecoration: 'none' }}>
            <CheckCircle2 size={15} />
            {t(lang, `View all ${visits.length} visits`, `सभी ${visits.length} यात्राएं देखें`)}
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
