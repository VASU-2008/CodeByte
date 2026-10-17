import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPatientVisits, confirmFollowup } from '../../../api/patientApi';
import { format, parseISO, differenceInDays, isPast } from 'date-fns';
import {
  RefreshCw, CalendarClock, CheckCircle2, Clock, AlertCircle,
  ArrowRight, Loader2, Info, ChevronRight, FileText, XCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const t = (lang, en, hi) => lang === 'hi' ? hi : en;

function EncounterLink({ enc, label, lang }) {
  return (
    <Link
      to={`/patient/results?id=${enc._id}`}
      className="pp-btn pp-btn-outline pp-btn-sm"
      style={{ textDecoration: 'none', gap: '0.375rem' }}
    >
      <FileText size={13} />
      {label}
      <ChevronRight size={12} />
    </Link>
  );
}

function JourneyCard({ original, followup, lang }) {
  const [confirming, setConfirming] = useState(false);
  const [localConfirmed, setLocalConfirmed] = useState(followup?.followup?.confirmed || false);

  let origDate = '—';
  let followupDate = '—';
  let daysLeft = null;

  try { origDate = format(parseISO(original.createdAt), 'dd MMM yyyy'); } catch { /* */ }
  if (followup?.followup?.recommended_date) {
    try {
      const d = parseISO(followup.followup.recommended_date);
      followupDate = format(d, 'dd MMM yyyy');
      daysLeft = differenceInDays(d, new Date());
    } catch { /* */ }
  }

  const overdue = daysLeft !== null && daysLeft < 0;
  const today   = daysLeft === 0;
  const urgent  = daysLeft !== null && daysLeft <= 2 && daysLeft >= 0;

  async function handleConfirm() {
    if (confirming || localConfirmed) return;
    setConfirming(true);
    try {
      const res = await confirmFollowup(followup?._id || original._id);
      if (res?.success) {
        setLocalConfirmed(true);
        toast.success(t(lang, 'Follow-up confirmed!', 'फॉलो-अप की पुष्टि हो गई!'));
        if (res._demo) toast('Demo: this confirmation is not persisted.', { icon: 'ℹ️' });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || t(lang, 'Confirmation failed', 'पुष्टि विफल रही'));
    } finally {
      setConfirming(false);
    }
  }

  return (
    <div className="pp-card pp-animate-in" style={{ marginBottom: '1.5rem' }}>
      {/* Timeline visualization */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Original visit node */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--pp-success-bg)', border: '2px solid var(--pp-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#065f46' }}>
            <CheckCircle2 size={18} />
          </div>
          <div style={{ width: 2, flex: 1, background: 'linear-gradient(to bottom, var(--pp-success), var(--pp-primary))', minHeight: 32, margin: '4px 0' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)', marginBottom: '0.15rem' }}>{origDate}</div>
          <div style={{ fontWeight: 700, color: 'var(--pp-text-primary)', marginBottom: '0.375rem' }}>
            {t(lang, 'Original Visit', 'मूल यात्रा')}
          </div>
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--pp-text-secondary)', marginBottom: '0.625rem' }}>
            {original.chief_complaint}
          </div>
          <EncounterLink enc={original} label={t(lang, 'View Visit', 'यात्रा देखें')} lang={lang} />
        </div>
      </div>

      {/* Follow-up node */}
      {followup || original.followup?.recommended_date ? (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: localConfirmed ? 'var(--pp-success-bg)' : overdue ? 'var(--pp-danger-bg)' : urgent ? 'var(--pp-warning-bg)' : 'var(--pp-lavender)',
              border: `2px solid ${localConfirmed ? 'var(--pp-success)' : overdue ? 'var(--pp-danger)' : urgent ? 'var(--pp-warning)' : 'var(--pp-primary)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: localConfirmed ? '#065f46' : overdue ? '#991b1b' : urgent ? '#92400e' : 'var(--pp-primary)',
            }}>
              {localConfirmed ? <CheckCircle2 size={18} /> : overdue ? <AlertCircle size={18} /> : <CalendarClock size={18} />}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)', marginBottom: '0.15rem' }}>
              {followupDate}
              {daysLeft !== null && (
                <span style={{ marginLeft: '0.5rem', fontWeight: 600, color: overdue ? 'var(--pp-danger)' : urgent ? 'var(--pp-warning)' : 'var(--pp-text-muted)' }}>
                  {overdue ? `(${Math.abs(daysLeft)}d overdue)` : today ? '(Today)' : `(in ${daysLeft}d)`}
                </span>
              )}
            </div>
            <div style={{ fontWeight: 700, color: 'var(--pp-text-primary)', marginBottom: '0.375rem' }}>
              {t(lang, 'Recommended Follow-up', 'अनुशंसित फॉलो-अप')}
            </div>

            {/* Instructions */}
            {(followup?.followup?.instructions || original.followup?.instructions) && (
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--pp-text-secondary)', marginBottom: '0.75rem' }}>
                {followup?.followup?.instructions || original.followup?.instructions}
              </div>
            )}

            {/* Status badges */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.875rem' }}>
              {localConfirmed ? (
                <span className="pp-badge pp-badge-success"><CheckCircle2 size={10} /> {t(lang, 'Confirmed', 'पुष्टि की गई')}</span>
              ) : (
                <span className="pp-badge pp-badge-orange">{t(lang, 'Pending Confirmation', 'पुष्टि प्रतीक्षित')}</span>
              )}
              {overdue && <span className="pp-badge pp-badge-danger">{t(lang, 'Overdue', 'अतिदेय')}</span>}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
              {!localConfirmed && (
                <button
                  className="pp-btn pp-btn-primary pp-btn-sm"
                  onClick={handleConfirm}
                  disabled={confirming}
                >
                  {confirming
                    ? <><Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> {t(lang, 'Confirming…', 'पुष्टि हो रही है…')}</>
                    : <><CheckCircle2 size={13} /> {t(lang, 'Confirm Follow-up', 'फॉलो-अप की पुष्टि करें')}</>
                  }
                </button>
              )}
              {followup && (
                <EncounterLink enc={followup} label={t(lang, 'View Follow-up Record', 'फॉलो-अप रिकॉर्ड देखें')} lang={lang} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="pp-alert pp-alert-info" style={{ marginLeft: 52 }}>
          <Info size={16} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 'var(--font-size-sm)' }}>
            {t(lang, 'No follow-up has been scheduled for this visit.', 'इस यात्रा के लिए कोई फॉलो-अप निर्धारित नहीं किया गया है।')}
          </span>
        </div>
      )}
    </div>
  );
}

export default function FollowupJourney({ lang = 'en' }) {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Build parent→followup pairs
  const pairs = [];
  const followupIds = new Set(visits.filter(v => v.parent_encounter_id).map(v => v.parent_encounter_id));

  // Original encounters (no parent) that have a follow-up
  visits.filter(v => !v.parent_encounter_id).forEach(orig => {
    const fu = visits.find(v => v.parent_encounter_id === orig._id);
    // Show if has follow-up child OR has a followup recommendation
    if (fu || orig.followup?.recommended_date) {
      pairs.push({ original: orig, followup: fu || null });
    }
  });

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--pp-text-primary)', marginBottom: '0.375rem' }}>
          {t(lang, 'Follow-up Journey', 'फॉलो-अप यात्रा')}
        </h1>
        <p style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          {t(lang,
            'Track your original visits and recommended follow-ups in one place.',
            'अपनी मूल यात्राओं और अनुशंसित फॉलो-अप को एक स्थान पर ट्रैक करें।'
          )}
        </p>
      </div>

      {/* Important note */}
      <div className="pp-alert pp-alert-info" style={{ marginBottom: '1.25rem' }}>
        <Info size={16} style={{ flexShrink: 0 }} />
        <div style={{ fontSize: 'var(--font-size-xs)' }}>
          {t(lang,
            'Confirming a follow-up here is an acknowledgement only. For booking, please contact your healthcare facility directly.',
            'यहां फॉलो-अप की पुष्टि करना केवल एक स्वीकृति है। बुकिंग के लिए कृपया अपनी स्वास्थ्य सुविधा से सीधे संपर्क करें।'
          )}
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
          <Loader2 size={36} style={{ color: 'var(--pp-primary)', margin: '0 auto 1rem', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: 'var(--pp-text-secondary)' }}>{t(lang, 'Loading follow-up data…', 'फॉलो-अप डेटा लोड हो रहा है…')}</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {!loading && error && (
        <div className="pp-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <XCircle size={36} style={{ color: 'var(--pp-danger)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{t(lang, 'Could not load follow-up data', 'फॉलो-अप डेटा लोड नहीं हो सका')}</h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--pp-text-secondary)', marginBottom: '1.25rem' }}>{error}</p>
          <button className="pp-btn pp-btn-primary" onClick={load}><RefreshCw size={14} /> {t(lang, 'Retry', 'पुनः प्रयास')}</button>
        </div>
      )}

      {!loading && !error && pairs.length === 0 && (
        <div className="pp-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <CalendarClock size={40} style={{ color: 'var(--pp-primary-light)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
            {t(lang, 'No follow-ups yet', 'अभी तक कोई फॉलो-अप नहीं')}
          </h3>
          <p style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '1.25rem' }}>
            {t(lang,
              'Follow-up reminders will appear here after a doctor recommends one.',
              'डॉक्टर की सिफारिश के बाद फॉलो-अप रिमाइंडर यहां दिखेंगे।'
            )}
          </p>
          <Link to="/patient/intake" className="pp-btn pp-btn-primary" style={{ textDecoration: 'none' }}>
            <ArrowRight size={15} /> {t(lang, 'Start a Consultation', 'परामर्श शुरू करें')}
          </Link>
        </div>
      )}

      {!loading && !error && pairs.map(({ original, followup }) => (
        <JourneyCard
          key={original._id}
          original={original}
          followup={followup}
          lang={lang}
        />
      ))}
    </div>
  );
}
