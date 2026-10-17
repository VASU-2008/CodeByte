import React, { useState, useEffect, useRef, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { getQRToken } from '../../../api/patientApi';
import { format, parseISO, differenceInMinutes } from 'date-fns';
import {
  QrCode, Copy, Download, RefreshCw, Shield, Clock,
  CheckCircle2, AlertCircle, Info, Loader2, XCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const t = (lang, en, hi) => lang === 'hi' ? hi : en;

function CountdownBadge({ expiresAt, lang }) {
  const [mins, setMins] = useState(null);

  useEffect(() => {
    function update() {
      try {
        const m = differenceInMinutes(parseISO(expiresAt), new Date());
        setMins(m);
      } catch { setMins(null); }
    }
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, [expiresAt]);

  if (mins === null) return null;
  const expired = mins <= 0;
  const urgent  = mins <= 30 && !expired;

  return (
    <span className={`pp-badge ${expired ? 'pp-badge-danger' : urgent ? 'pp-badge-warning' : 'pp-badge-success'}`}>
      <Clock size={10} />
      {expired
        ? t(lang, 'Expired', 'समय सीमा समाप्त')
        : mins < 60
        ? t(lang, `${mins}m left`, `${mins} मिनट शेष`)
        : t(lang, `${Math.floor(mins/60)}h left`, `${Math.floor(mins/60)} घंटे शेष`)
      }
    </span>
  );
}

export default function ConsentQRPass({ lang = 'en' }) {
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

  const fetchToken = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getQRToken();
      setTokenData(data);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || t(lang, 'Failed to load QR token', 'QR टोकन लोड नहीं हो सका'));
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => { fetchToken(); }, [fetchToken]);

  async function copyToken() {
    if (!tokenData?.token) return;
    try {
      await navigator.clipboard.writeText(tokenData.token);
      setCopied(true);
      toast.success(t(lang, 'Token copied!', 'टोकन कॉपी किया गया!'));
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error(t(lang, 'Copy failed — please copy manually', 'कॉपी विफल रही'));
    }
  }

  function downloadQR() {
    const svgEl = qrRef.current?.querySelector('svg');
    if (!svgEl) { toast.error('QR element not found'); return; }

    const svgData = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement('canvas');
    canvas.width = 300; canvas.height = 300;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, 300, 300);
      ctx.drawImage(img, 0, 0, 300, 300);
      const link = document.createElement('a');
      link.download = `veyora-qr-${tokenData?.token || 'pass'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success(t(lang, 'QR downloaded!', 'QR डाउनलोड किया गया!'));
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  }

  const isExpired = tokenData?.status === 'expired' ||
    (tokenData?.expires_at && differenceInMinutes(parseISO(tokenData.expires_at), new Date()) <= 0);

  return (
    <div style={{ maxWidth: 540, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--pp-text-primary)', marginBottom: '0.375rem' }}>
          {t(lang, 'My QR Pass', 'मेरा QR पास')}
        </h1>
        <p style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          {t(lang,
            'Show this to an authorized healthcare provider at the facility.',
            'इसे सुविधा में अधिकृत स्वास्थ्य सेवा प्रदाता को दिखाएं।'
          )}
        </p>
      </div>

      {/* How it works card */}
      <div className="pp-alert pp-alert-info" style={{ marginBottom: '1.25rem' }}>
        <Shield size={18} style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <strong style={{ display: 'block', marginBottom: '0.2rem' }}>
            {t(lang, 'Privacy-Protected Pass', 'गोपनीयता-संरक्षित पास')}
          </strong>
          <span style={{ fontSize: 'var(--font-size-xs)' }}>
            {t(lang,
              'This QR code contains only an opaque session token — no medical records, prescriptions or personal data are encoded in the code itself. The provider scans it to access your authorized visit details through a secure backend.',
              'इस QR कोड में केवल एक अपारदर्शी सत्र टोकन है — कोई चिकित्सा रिकॉर्ड, नुस्खे या व्यक्तिगत डेटा कोड में एन्कोड नहीं है। प्रदाता इसे स्कैन करके सुरक्षित बैकएंड के माध्यम से आपके अधिकृत यात्रा विवरण तक पहुंचता है।'
            )}
          </span>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="pp-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Loader2 size={40} style={{ color: 'var(--pp-primary)', margin: '0 auto 1rem', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: 'var(--pp-text-secondary)' }}>
            {t(lang, 'Generating your QR pass…', 'आपका QR पास बनाया जा रहा है…')}
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="pp-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <XCircle size={40} style={{ color: 'var(--pp-danger)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
            {t(lang, 'Could not load QR pass', 'QR पास लोड नहीं हो सका')}
          </h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--pp-text-secondary)', marginBottom: '1.25rem' }}>{error}</p>
          <button className="pp-btn pp-btn-primary" onClick={fetchToken}>
            <RefreshCw size={15} /> {t(lang, 'Try Again', 'पुनः प्रयास करें')}
          </button>
        </div>
      )}

      {/* QR Card */}
      {!loading && !error && tokenData && (
        <div className="pp-card pp-animate-in" style={{ textAlign: 'center' }}>
          {/* Token status badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span className={`pp-badge ${isExpired ? 'pp-badge-danger' : 'pp-badge-success'}`}>
              {isExpired
                ? <><XCircle size={10} /> {t(lang, 'Expired', 'समय सीमा समाप्त')}</>
                : <><CheckCircle2 size={10} /> {t(lang, 'Active', 'सक्रिय')}</>
              }
            </span>
            {tokenData.expires_at && <CountdownBadge expiresAt={tokenData.expires_at} lang={lang} />}
            {tokenData._demo && (
              <span className="pp-badge pp-badge-orange">
                <Info size={10} /> {t(lang, 'Demo Token', 'डेमो टोकन')}
              </span>
            )}
          </div>

          {/* QR Code */}
          {isExpired ? (
            <div style={{ width: 220, height: 220, margin: '0 auto 1.5rem', background: '#f1f5f9', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--pp-text-muted)', gap: '0.5rem' }}>
              <AlertCircle size={40} />
              <span style={{ fontSize: 'var(--font-size-sm)' }}>{t(lang, 'Token Expired', 'टोकन समाप्त')}</span>
            </div>
          ) : (
            <div
              ref={qrRef}
              style={{
                display: 'inline-block',
                padding: '1rem',
                background: '#fff',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)',
                marginBottom: '1.25rem',
                border: '2px solid var(--pp-border)',
              }}
            >
              <QRCodeSVG
                value={tokenData.consent_url || tokenData.token || 'veyora-no-token'}
                size={192}
                level="M"
                includeMargin={false}
                fgColor="#0f172a"
              />
            </div>
          )}

          {/* Token ID */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--pp-bg-subtle)',
            border: '1px solid var(--pp-border)',
            borderRadius: 'var(--radius-full)',
            padding: '0.375rem 1rem',
            fontFamily: 'monospace',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            color: 'var(--pp-text-primary)',
            marginBottom: '1.25rem',
            letterSpacing: '0.05em',
          }}>
            {tokenData.token}
          </div>

          {/* Metadata */}
          {tokenData.expires_at && (
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)', marginBottom: '1.25rem' }}>
              {t(lang, 'Expires:', 'समाप्त:')} {(() => { try { return format(parseISO(tokenData.expires_at), 'dd MMM yyyy, h:mm a'); } catch { return tokenData.expires_at; } })()}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="pp-btn pp-btn-outline pp-btn-sm" onClick={copyToken} disabled={!tokenData.token}>
              {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              {copied ? t(lang, 'Copied!', 'कॉपी!') : t(lang, 'Copy Token', 'टोकन कॉपी करें')}
            </button>
            {!isExpired && (
              <button className="pp-btn pp-btn-secondary pp-btn-sm" onClick={downloadQR}>
                <Download size={14} /> {t(lang, 'Download QR', 'QR डाउनलोड करें')}
              </button>
            )}
            <button className="pp-btn pp-btn-ghost pp-btn-sm" onClick={fetchToken}>
              <RefreshCw size={14} /> {t(lang, 'Refresh', 'ताज़ा करें')}
            </button>
          </div>
        </div>
      )}

      {/* No active encounter notice */}
      {!loading && !error && !tokenData && (
        <div className="pp-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <QrCode size={40} style={{ color: 'var(--pp-text-muted)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
            {t(lang, 'No active pass', 'कोई सक्रिय पास नहीं')}
          </h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--pp-text-secondary)' }}>
            {t(lang, 'Start a consultation to receive your QR pass.', 'अपना QR पास प्राप्त करने के लिए परामर्श शुरू करें।')}
          </p>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
