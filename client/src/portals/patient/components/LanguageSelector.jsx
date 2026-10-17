import React from 'react';

const LANGS = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'hi', label: 'हिं', full: 'हिंदी' },
];

/**
 * LanguageSelector
 * @param {string}   value    - current language code ('en' | 'hi')
 * @param {function} onChange - callback(code)
 * @param {boolean}  compact  - compact pill style (for mobile topbar)
 */
export default function LanguageSelector({ value = 'en', onChange, compact = false }) {
  return (
    <div
      role="group"
      aria-label="Select language / भाषा चुनें"
      style={{
        display: 'inline-flex',
        background: 'rgba(148,163,184,0.15)',
        borderRadius: 'var(--radius-full)',
        padding: '3px',
        gap: '2px',
      }}
    >
      {LANGS.map(({ code, label, full }) => {
        const active = value === code;
        return (
          <button
            key={code}
            onClick={() => onChange && onChange(code)}
            title={full}
            aria-pressed={active}
            aria-label={`${full} — ${code}`}
            style={{
              padding: compact ? '0.2rem 0.5rem' : '0.3rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: compact ? '0.72rem' : '0.78rem',
              fontWeight: 700,
              fontFamily: 'var(--font-sans)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              background: active
                ? 'linear-gradient(135deg, var(--pp-primary) 0%, var(--pp-primary-dark) 100%)'
                : 'transparent',
              color: active ? '#fff' : 'var(--pp-text-secondary)',
              boxShadow: active ? '0 2px 8px rgba(59,130,246,0.3)' : 'none',
              letterSpacing: '0.02em',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
