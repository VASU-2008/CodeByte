import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getPatientVisits, getEncounterById } from '../../../api/patientApi';
import { format, parseISO } from 'date-fns';
import {
  FileText, Pill, Stethoscope, Heart, AlertCircle, RefreshCw,
  Loader2, CheckCircle2, Clock, Building2, ArrowLeft, Printer,
  Info, User, CalendarClock, ChevronDown, ChevronUp
} from 'lucide-react';

const t = (lang, en, hi) => lang === 'hi' ? hi : en;

function SectionCard({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="pp-card pp-card-sm" style={{ marginBottom: '1rem' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, marginBottom: open ? '1rem' : 0
        }}
        aria-expanded={open}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-lg)', background: 'var(--pp-lavender)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pp-primary)' }}>
            <Icon size={16} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 'var(--font-size-md)', color: 'var(--pp-text-primary)' }}>{title}</span>
        </div>
        {open ? <ChevronUp size={16} style={{ color: 'var(--pp-text-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--pp-text-muted)' }} />}
      </button>
      {open && children}
    </div>
  );
}

function VitalsRow({ label, value }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--pp-border)', fontSize: 'var(--font-size-sm)' }}>
      <span style={{ color: 'var(--pp-text-secondary)' }}>{label}</span>
      <span style={{ fontWeight: 600, color: 'var(--pp-text-primary)' }}>{value}</span>
    </div>
  );
}

function PrescriptionCard({ rx, lang, index }) {
  return (
    <div style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '1px solid #bae6fd', borderRadius: 'var(--radius-xl)', padding: '1rem', marginBottom: '0.625rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.375rem' }}>
        <div style={{ fontWeight: 700, color: 'var(--pp-text-primary)', fontSize: 'var(--font-size-md)' }}>
          {index + 1}. {rx.name}
        </div>
        <span className="pp-badge pp-badge-blue">{rx.dosage}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.625rem', fontSize: 'var(--font-size-sm)', color: 'var(--pp-text-secondary)' }}>
        {rx.frequency && <span><strong>{t(lang, 'Frequency: ', 'आवृत्ति: ')}</strong>{rx.frequency}</span>}
        {rx.duration  && <span><strong>{t(lang, 'Duration: ',  'अवधि: ')}</strong>{rx.duration}</span>}
      </div>
      {rx.instructions && (
        <div style={{ marginTop: '0.5rem', fontSize: 'var(--font-size-xs)', color: '#0369a1', background: '#fff', padding: '0.375rem 0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid #bae6fd' }}>
          ℹ️ {rx.instructions}
        </div>
      )}
    </div>
  );
}

export default function VisitResultView({ lang = 'en' }) {
  const [params] = useSearchParams();
  const encId = params.get('id');

  const [encounter, setEncounter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      let enc;
      if (encId) {
        enc = await getEncounterById(encId);
      } else {
        const all = await getPatientVisits();
        enc = all?.[0] || null;
      }
      setEncounter(enc);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load visit');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [encId]);

  // ── Loading ──
  if (loading) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', paddingTop: '3rem' }}>
        <Loader2 size={40} style={{ color: 'var(--pp-primary)', margin: '0 auto 1rem', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: 'var(--pp-text-secondary)' }}>{t(lang, 'Loading visit details…', 'यात्रा विवरण लोड हो रहा है…')}</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="pp-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <AlertCircle size={36} style={{ color: 'var(--pp-danger)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{t(lang, 'Could not load visit', 'यात्रा लोड नहीं हो सकी')}</h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--pp-text-secondary)', marginBottom: '1.25rem' }}>{error}</p>
          <button className="pp-btn pp-btn-primary" onClick={load}>
            <RefreshCw size={14} /> {t(lang, 'Retry', 'पुनः प्रयास')}
          </button>
        </div>
      </div>
    );
  }

  // ── No encounter ──
  if (!encounter) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="pp-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <FileText size={40} style={{ color: 'var(--pp-primary-light)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{t(lang, 'No visit selected', 'कोई यात्रा नहीं चुनी गई')}</h3>
          <p style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '1.25rem' }}>
            {t(lang, 'Select a visit from your history to view details.', 'विवरण देखने के लिए इतिहास से एक यात्रा चुनें।')}
          </p>
          <Link to="/patient/history" className="pp-btn pp-btn-primary" style={{ textDecoration: 'none' }}>
            <Clock size={15} /> {t(lang, 'Go to Visit History', 'यात्रा इतिहास पर जाएं')}
          </Link>
        </div>
      </div>
    );
  }

  let dateStr = '—';
  try { dateStr = format(parseISO(encounter.createdAt), 'dd MMMM yyyy, h:mm a'); } catch { /* */ }
  let signedAtStr = '';
  try { if (encounter.signed_at) signedAtStr = format(parseISO(encounter.signed_at), 'dd MMM yyyy, h:mm a'); } catch { /* */ }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/patient/history" className="pp-btn pp-btn-ghost pp-btn-sm" style={{ textDecoration: 'none' }}>
          <ArrowLeft size={15} /> {t(lang, 'History', 'इतिहास')}
        </Link>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--pp-text-primary)' }}>
            {t(lang, 'Visit Summary', 'यात्रा सारांश')}
          </h1>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)' }}>{dateStr}</div>
        </div>
        <button
          className="pp-btn pp-btn-ghost pp-btn-sm pp-no-print"
          onClick={() => window.print()}
          title={t(lang, 'Print this visit summary', 'यह सारांश प्रिंट करें')}
        >
          <Printer size={15} /> {t(lang, 'Print', 'प्रिंट')}
        </button>
      </div>

      {/* Sign-off status banner */}
      {encounter.is_signed_off ? (
        <div className="pp-alert pp-alert-success" style={{ marginBottom: '1rem' }}>
          <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
          <div>
            <strong>{t(lang, 'Doctor-Signed Record', 'डॉक्टर-हस्ताक्षरित रिकॉर्ड')}</strong>
            {signedAtStr && <div style={{ fontSize: 'var(--font-size-xs)', marginTop: '0.15rem' }}>{t(lang, 'Signed on ', 'हस्ताक्षरित: ')}{signedAtStr}</div>}
          </div>
        </div>
      ) : (
        <div className="pp-alert pp-alert-warning" style={{ marginBottom: '1rem' }}>
          <Clock size={18} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 'var(--font-size-sm)' }}>
            {t(lang, 'This visit record is not yet signed off by a doctor. Information may be incomplete.', 'यह यात्रा रिकॉर्ड अभी डॉक्टर द्वारा हस्ताक्षरित नहीं किया गया है। जानकारी अधूरी हो सकती है।')}
          </span>
        </div>
      )}

      {/* Visit Details */}
      <SectionCard title={t(lang, 'Visit Details', 'यात्रा विवरण')} icon={Building2}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: 'var(--font-size-sm)' }}>
          <div>
            <div style={{ color: 'var(--pp-text-muted)', marginBottom: '0.2rem', fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t(lang, 'Chief Complaint', 'मुख्य शिकायत')}</div>
            <div style={{ fontWeight: 600 }}>{encounter.chief_complaint}</div>
          </div>
          <div>
            <div style={{ color: 'var(--pp-text-muted)', marginBottom: '0.2rem', fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t(lang, 'Status', 'स्थिति')}</div>
            <div><span className="pp-badge pp-badge-blue">{encounter.status}</span></div>
          </div>
          <div>
            <div style={{ color: 'var(--pp-text-muted)', marginBottom: '0.2rem', fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t(lang, 'Facility', 'सुविधा')}</div>
            <div style={{ fontWeight: 600 }}>{encounter.facility_id || '—'}</div>
          </div>
          {encounter.triage_result && (
            <div>
              <div style={{ color: 'var(--pp-text-muted)', marginBottom: '0.2rem', fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t(lang, 'Referred To', 'रेफर किया गया')}</div>
              <div><span className="pp-badge pp-badge-success">{encounter.triage_result}</span></div>
            </div>
          )}
          {encounter.clinician?.name && (
            <div>
              <div style={{ color: 'var(--pp-text-muted)', marginBottom: '0.2rem', fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t(lang, 'Doctor', 'डॉक्टर')}</div>
              <div style={{ fontWeight: 600 }}>{encounter.clinician.name}</div>
            </div>
          )}
          {encounter.token_id && (
            <div>
              <div style={{ color: 'var(--pp-text-muted)', marginBottom: '0.2rem', fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Token</div>
              <div style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-xs)', background: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: 4, display: 'inline-block' }}>{encounter.token_id}</div>
            </div>
          )}
        </div>
      </SectionCard>

      {/* Clinical Summary */}
      <SectionCard title={t(lang, 'Clinical Summary', 'नैदानिक सारांश')} icon={Stethoscope}>
        {encounter.clinical_summary ? (
          <>
            <div style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.8, color: 'var(--pp-text-primary)', whiteSpace: 'pre-wrap' }}>
              {encounter.clinical_summary}
            </div>
            {encounter.doctor_notes && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--pp-lavender)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--font-size-sm)' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.375rem', color: 'var(--pp-primary-dark)' }}>
                  {t(lang, "Doctor's Notes", 'डॉक्टर के नोट्स')}
                </div>
                {encounter.doctor_notes}
              </div>
            )}
          </>
        ) : (
          <div style={{ color: 'var(--pp-text-muted)', fontSize: 'var(--font-size-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={15} />
            {t(lang, 'Clinical summary not yet available for this visit.', 'इस यात्रा के लिए नैदानिक सारांश अभी उपलब्ध नहीं है।')}
          </div>
        )}
      </SectionCard>

      {/* Vitals */}
      {encounter.vitals && (
        <SectionCard title={t(lang, 'Vitals', 'महत्वपूर्ण संकेत')} icon={Heart}>
          <VitalsRow label={t(lang, 'Blood Pressure', 'रक्तचाप')}     value={encounter.vitals.bp} />
          <VitalsRow label={t(lang, 'Temperature', 'तापमान')}         value={encounter.vitals.temp} />
          <VitalsRow label={t(lang, 'SpO₂', 'SpO₂')}                  value={encounter.vitals.spo2} />
          <VitalsRow label={t(lang, 'Pulse', 'नाड़ी')}                 value={encounter.vitals.pulse} />
        </SectionCard>
      )}

      {/* Prescriptions */}
      <SectionCard title={t(lang, 'Prescription', 'नुस्खा')} icon={Pill}>
        {encounter.is_signed_off && encounter.prescriptions?.length > 0 ? (
          <>
            {encounter.prescriptions.map((rx, i) => (
              <PrescriptionCard key={i} rx={rx} lang={lang} index={i} />
            ))}
          </>
        ) : (
          <div style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={15} style={{ flexShrink: 0 }} />
            {encounter.is_signed_off
              ? t(lang, 'No prescription available for this visit.', 'इस यात्रा के लिए कोई नुस्खा उपलब्ध नहीं है।')
              : t(lang, 'Prescription will be available after the doctor signs off this visit.', 'डॉक्टर के हस्ताक्षर के बाद नुस्खा उपलब्ध होगा।')
            }
          </div>
        )}
      </SectionCard>

      {/* Follow-up */}
      {encounter.followup && (
        <SectionCard title={t(lang, 'Follow-up Instructions', 'फॉलो-अप निर्देश')} icon={CalendarClock}>
          <div style={{ fontSize: 'var(--font-size-sm)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {encounter.followup.recommended_date && (
              <div>
                <strong>{t(lang, 'Recommended Date: ', 'अनुशंसित तिथि: ')}</strong>
                {(() => { try { return format(parseISO(encounter.followup.recommended_date), 'dd MMMM yyyy'); } catch { return encounter.followup.recommended_date; } })()}
              </div>
            )}
            {encounter.followup.instructions && <div>{encounter.followup.instructions}</div>}
            {encounter.followup.confirmed && (
              <span className="pp-badge pp-badge-success" style={{ alignSelf: 'flex-start' }}>
                <CheckCircle2 size={10} /> {t(lang, 'Confirmed', 'पुष्टि की गई')}
              </span>
            )}
          </div>
          <div style={{ marginTop: '0.875rem' }}>
            <Link to="/patient/followup" className="pp-btn pp-btn-outline pp-btn-sm" style={{ textDecoration: 'none' }}>
              {t(lang, 'View Follow-up Journey', 'फॉलो-अप यात्रा देखें')} →
            </Link>
          </div>
        </SectionCard>
      )}

      {/* Parent encounter link */}
      {encounter.parent_encounter_id && (
        <div className="pp-alert pp-alert-info" style={{ marginBottom: '1rem' }}>
          <Info size={16} style={{ flexShrink: 0 }} />
          <div>
            <strong>{t(lang, 'This is a Follow-up Visit', 'यह एक फॉलो-अप यात्रा है')}</strong>
            <div style={{ fontSize: 'var(--font-size-xs)', marginTop: '0.2rem' }}>
              {t(lang, 'Parent encounter ID: ', 'मूल यात्रा ID: ')}{encounter.parent_encounter_id}
            </div>
            <Link to={`/patient/results?id=${encounter.parent_encounter_id}`} className="pp-btn pp-btn-ghost pp-btn-sm" style={{ textDecoration: 'none', marginTop: '0.5rem' }}>
              {t(lang, 'View Original Visit', 'मूल यात्रा देखें')} →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
