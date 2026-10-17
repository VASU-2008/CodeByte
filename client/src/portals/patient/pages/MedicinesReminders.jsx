import React from 'react';
import { Pill, Bell, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const t = (lang, en, hi) => lang === 'hi' ? hi : en;

/**
 * MedicinesReminders
 *
 * NOTE: A dedicated backend endpoint for patient medicine reminders does not
 * yet exist (not in scope for current sprint). This page displays prescriptions
 * sourced from the visit history (via patientApi) once that data is linked.
 *
 * Required future backend contract:
 *   GET /api/patient/medicines → { reminders: [{ name, dosage, frequency, nextDose, encounterId }] }
 */
export default function MedicinesReminders({ lang = 'en' }) {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--pp-text-primary)', marginBottom: '0.375rem' }}>
          {t(lang, 'Medicines & Reminders', 'दवाइयाँ और रिमाइंडर')}
        </h1>
        <p style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          {t(lang,
            'Your prescribed medicines and reminder schedule.',
            'आपकी निर्धारित दवाइयाँ और रिमाइंडर अनुसूची।'
          )}
        </p>
      </div>

      {/* Info banner */}
      <div className="pp-alert pp-alert-info" style={{ marginBottom: '1.25rem' }}>
        <Bell size={18} style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <strong style={{ display: 'block', marginBottom: '0.2rem' }}>
            {t(lang, 'Coming Soon', 'जल्द आ रहा है')}
          </strong>
          <span style={{ fontSize: 'var(--font-size-sm)' }}>
            {t(lang,
              'Personalized medicine reminders will be available once your visit is completed and prescription is signed by your doctor. In the meantime, view your prescriptions from your visit results.',
              'व्यक्तिगत दवा रिमाइंडर आपकी यात्रा पूर्ण होने और डॉक्टर द्वारा नुस्खे पर हस्ताक्षर के बाद उपलब्ध होंगे। इस बीच, अपने यात्रा परिणामों से नुस्खे देखें।'
            )}
          </span>
        </div>
      </div>

      {/* Feature preview cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { icon: Pill,      title: t(lang, 'Current Medicines', 'वर्तमान दवाइयाँ'),    desc: t(lang, 'View all active prescriptions', 'सभी सक्रिय नुस्खे देखें') },
          { icon: Bell,      title: t(lang, 'Dose Reminders', 'खुराक रिमाइंडर'),       desc: t(lang, 'Get notified at dose time', 'खुराक समय पर सूचना पाएं') },
          { icon: Calendar,  title: t(lang, 'Refill Schedule', 'पुनः भरण अनुसूची'),    desc: t(lang, 'Track refill dates', 'पुनः भरण तिथियाँ ट्रैक करें') },
          { icon: Clock,     title: t(lang, 'Adherence History', 'अनुपालन इतिहास'),     desc: t(lang, 'Track your medicine schedule', 'दवा अनुसूची ट्रैक करें') },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="pp-card pp-card-sm" style={{ opacity: 0.65, cursor: 'default' }}>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)', background: 'var(--pp-lavender)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pp-primary)', marginBottom: '0.75rem' }}>
              <Icon size={20} />
            </div>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem', fontSize: 'var(--font-size-sm)' }}>{title}</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)' }}>{desc}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/patient/results" className="pp-btn pp-btn-outline" style={{ textDecoration: 'none' }}>
          <Pill size={15} />
          {t(lang, 'View Prescriptions from Visit Results', 'यात्रा परिणामों से नुस्खे देखें')}
        </Link>
      </div>
    </div>
  );
}
