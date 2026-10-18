import React, { useState, useEffect } from 'react';
import { Pill, Bell, Clock, Calendar, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPatientMedicines } from '../../../api/patientApi';

const t = (lang, en, hi) => lang === 'hi' ? hi : en;

export default function MedicinesReminders({ lang = 'en' }) {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [takenStatus, setTakenStatus] = useState({});

  useEffect(() => {
    let isMounted = true;
    getPatientMedicines().then(data => {
      if (isMounted) {
        setMedicines(data || []);
        setLoading(false);
      }
    }).catch(err => {
      console.warn('Failed loading medicines', err);
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, []);

  const toggleTaken = (name) => {
    setTakenStatus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const takenCount = Object.values(takenStatus).filter(Boolean).length;
  const adherencePercent = medicines.length > 0 ? Math.round((takenCount / medicines.length) * 100) : 100;

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--pp-text-primary)', marginBottom: '0.375rem' }}>
          {t(lang, 'Medicines & Reminders', 'दवाइयाँ और रिमाइंडर')}
        </h1>
        <p style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          {t(lang,
            'Your active prescribed regimen and daily dose tracking schedule.',
            'आपकी निर्धारित दवाइयाँ और दैनिक खुराक ट्रैकिंग अनुसूची।'
          )}
        </p>
      </div>

      {/* Adherence Card */}
      <div className="pp-card pp-card-sm" style={{
        background: 'linear-gradient(135deg, #044e42 0%, #0f766e 100%)',
        color: '#ffffff',
        padding: '1.25rem 1.5rem',
        borderRadius: '18px',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#99f6e4', fontWeight: '700' }}>
            {t(lang, "Today's Adherence", 'आज का अनुपालन')}
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', lineHeight: 1.2, marginTop: '0.2rem' }}>
            {adherencePercent}% {t(lang, 'Completed', 'पूर्ण')}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#ccfbf1', marginTop: '0.25rem' }}>
            {takenCount} of {medicines.length} {t(lang, 'prescribed doses recorded today', 'खुराक आज ली गई')}
          </div>
        </div>

        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: '4px solid #5eead4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '800',
          fontSize: '0.9rem'
        }}>
          {adherencePercent}%
        </div>
      </div>

      {/* Active Prescription Medicines List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--pp-text-primary)', margin: 0 }}>
            {t(lang, 'Active Prescriptions', 'सक्रिय दवाइयाँ')} ({medicines.length})
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--pp-text-muted)' }}>
            {t(lang, 'Veyora Sync', 'वेयोरा सिंक')}
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--pp-text-muted)' }}>
            Loading prescribed medicines...
          </div>
        ) : medicines.length === 0 ? (
          <div className="pp-card pp-card-sm" style={{ textAlign: 'center', padding: '2rem' }}>
            <Pill size={32} color="#94a3b8" style={{ margin: '0 auto 0.75rem' }} />
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--pp-text-secondary)' }}>
              No active prescriptions found for this patient account.
            </p>
          </div>
        ) : (
          medicines.map((med, idx) => {
            const isTaken = Boolean(takenStatus[med.name]);
            return (
              <div
                key={idx}
                className="pp-card pp-card-sm"
                style={{
                  border: isTaken ? '1px solid #10b981' : '1px solid var(--pp-border)',
                  background: isTaken ? '#f0fdf4' : '#ffffff',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: isTaken ? '#dcfce7' : 'var(--pp-lavender)',
                    color: isTaken ? '#166534' : 'var(--pp-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Pill size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--pp-text-primary)' }}>
                      {med.name} <span style={{ fontWeight: '500', color: 'var(--pp-text-muted)', fontSize: '0.85rem' }}>({med.dosage})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.3rem', fontSize: '0.8rem', color: 'var(--pp-text-secondary)', flexWrap: 'wrap' }}>
                      <span style={{
                        background: '#e0f2fe',
                        color: '#0369a1',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '8px',
                        fontWeight: '700'
                      }}>
                        {med.frequency}
                      </span>
                      <span>⏱️ {med.duration || 'As directed'}</span>
                      {med.prescribedBy && <span>👨‍⚕️ {med.prescribedBy}</span>}
                    </div>
                    {med.instructions && (
                      <div style={{ fontSize: '0.78rem', color: '#047857', marginTop: '0.4rem', fontStyle: 'italic' }}>
                        ℹ️ {med.instructions}
                      </div>
                    )}
                  </div>
                </div>

                {/* Mark Taken Button */}
                <button
                  type="button"
                  onClick={() => toggleTaken(med.name)}
                  style={{
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.55rem 1rem',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: isTaken ? '#10b981' : '#f1f5f9',
                    color: isTaken ? '#ffffff' : '#334155',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <CheckCircle2 size={16} />
                  {isTaken ? t(lang, 'Taken', 'ले लिया') : t(lang, 'Mark as Taken', 'खुराक लें')}
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Action links */}
      <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link to="/patient/results" className="pp-btn pp-btn-outline" style={{ textDecoration: 'none' }}>
          <Pill size={15} />
          {t(lang, 'View Full Prescription Record', 'पूरा नुस्खा रिकॉर्ड देखें')}
        </Link>
      </div>
    </div>
  );
}
