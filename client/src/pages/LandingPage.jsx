import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Stethoscope,
  Bot,
  ArrowRight,
  QrCode,
  Activity,
  CheckCircle2,
  Clock,
  Pill,
  Lock,
  HeartPulse,
  BrainCircuit,
  CalendarCheck,
  ChevronRight,
  Shield,
  FileCheck2,
  BellRing
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activePreview, setActivePreview] = useState('coordinator'); // 'coordinator' | 'doctor'

  const handleQuickDemo = async (role) => {
    const creds = {
      doctor: { email: 'doctor1@veyora.com', password: 'password123', path: '/doctor' },
      patient: { email: 'patient1@veyora.com', password: 'password123', path: '/patient' }
    };
    const c = creds[role];
    try {
      await login(c.email, c.password);
      navigate(c.path);
    } catch {
      navigate('/login');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-page)',
      color: 'var(--text-primary)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      WebkitFontSmoothing: 'antialiased'
    }}>
      {/* ─── Hero Section ───────────────────────────────────── */}
      <section style={{
        maxWidth: '1160px',
        margin: '0 auto',
        padding: '4.5rem 1.5rem 3.5rem',
        textAlign: 'center'
      }}>
        {/* Subtle Pill Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          background: 'var(--accent-light)',
          color: 'var(--accent-hover)',
          padding: '0.3rem 0.85rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.78rem',
          fontWeight: '600',
          marginBottom: '1.25rem',
          border: '1px solid var(--accent-border)'
        }}>
          <BrainCircuit size={13} />
          <span>Intelligent Healthcare Continuity Platform</span>
        </div>

        {/* Clear Memorable Headline */}
        <h1 style={{
          fontSize: 'clamp(2.25rem, 5.5vw, 3.6rem)',
          fontWeight: '800',
          color: 'var(--text-primary)',
          lineHeight: '1.14',
          margin: '0 auto 1.25rem',
          maxWidth: '880px',
          letterSpacing: '-0.035em'
        }}>
          Bridging the Critical Gap Between Clinical Consultations and Daily Recovery
        </h1>

        {/* Supporting Description */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: 'var(--text-secondary)',
          maxWidth: '720px',
          margin: '0 auto 2.25rem',
          lineHeight: '1.65'
        }}>
          Pre-existing national registries store static diagnostic records, yet patients are left unsupported once they leave the clinic. 
          Veyora pairs an efficient <strong>Doctor Station</strong> and <strong>Patient Portal</strong> with an autonomous <strong>AI Care Coordinator</strong> that oversees medication schedules, precautions, and pre-consultation readiness.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.85rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          <Link
            to="/patient/ai-coordinator"
            style={{
              background: 'var(--accent-primary)',
              color: '#ffffff',
              padding: '0.75rem 1.6rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.92rem',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-hairline)',
              transition: 'all 140ms ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent-primary)'}
          >
            <span>Explore AI Care Coordinator</span>
            <ArrowRight size={15} />
          </Link>

          <Link
            to="/doctor/queue"
            style={{
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.92rem',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-hairline)',
              transition: 'all 140ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-hover)';
              e.currentTarget.style.borderColor = 'var(--border-strong)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-surface)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            <span>View Doctor Station</span>
            <ChevronRight size={15} color="var(--text-muted)" />
          </Link>
        </div>

        {/* Fast-Track Evaluator Strip */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'var(--bg-surface)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-hairline)',
          border: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '3rem'
        }}>
          <span style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)' }}>
            One-Click Evaluator Access:
          </span>
          <button
            onClick={() => handleQuickDemo('doctor')}
            style={{
              background: 'var(--bg-subtle)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 140ms ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'}
          >
            <Stethoscope size={13} color="var(--accent-primary)" />
            <span>Doctor 1 (doctor1@veyora.com)</span>
          </button>
          <button
            onClick={() => handleQuickDemo('patient')}
            style={{
              background: 'var(--bg-subtle)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 140ms ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'}
          >
            <User size={13} color="var(--accent-primary)" />
            <span>Patient 1 (patient1@veyora.com)</span>
          </button>
        </div>

        {/* ─── Product Preview Showcase (Faithful Representation) ── */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-elevated)',
          textAlign: 'left',
          overflow: 'hidden',
          marginBottom: '4.5rem'
        }}>
          {/* Showcase Control Bar */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e2e8f0' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e2e8f0' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e2e8f0' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem', fontWeight: '500' }}>
                veyora.healthtech/portal-preview
              </span>
            </div>

            {/* Interactive Tab Switcher */}
            <div style={{
              display: 'inline-flex',
              background: '#e2e8f0',
              padding: '0.2rem',
              borderRadius: 'var(--radius-md)',
              gap: '0.2rem'
            }}>
              <button
                onClick={() => setActivePreview('coordinator')}
                style={{
                  background: activePreview === 'coordinator' ? 'var(--bg-surface)' : 'transparent',
                  color: activePreview === 'coordinator' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: activePreview === 'coordinator' ? '600' : '500',
                  padding: '0.3rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 140ms ease'
                }}
              >
                AI Care Coordinator View
              </button>
              <button
                onClick={() => setActivePreview('doctor')}
                style={{
                  background: activePreview === 'doctor' ? 'var(--bg-surface)' : 'transparent',
                  color: activePreview === 'doctor' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: activePreview === 'doctor' ? '600' : '500',
                  padding: '0.3rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 140ms ease'
                }}
              >
                Doctor Workstation View
              </button>
            </div>
          </div>

          {/* Interactive Screen Preview Container */}
          <div style={{ padding: '1.75rem', background: '#fafbfc' }}>
            {activePreview === 'coordinator' ? (
              <div>
                {/* T-1 Day Before Alert Demo Card */}
                <div style={{
                  background: 'var(--status-warning-bg)',
                  border: '1px solid var(--status-warning-bd)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem 1.5rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="vy-badge vy-badge-amber">
                        <Clock size={12} /> T-1 Consultation Follow-Up Alert
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--status-warning)', fontWeight: '600' }}>
                        Appointment: Tomorrow, 9:30 AM (Dr. Anil Mehta)
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--status-warning)', fontWeight: '700' }}>
                      PHC Main Clinic
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#78350f', margin: '0 0 0.35rem' }}>
                    Consultation Alert: Your Follow-Up Appointment is Tomorrow
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#92400e', margin: '0 0 0.85rem', lineHeight: '1.5' }}>
                    Complete this 24-hour pre-consultation checklist before visiting the health centre:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
                    <div style={{ background: '#ffffff', border: '1px solid var(--status-warning-bd)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-primary)' }}>1. 10-12h Overnight Fasting</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Water only after 9 PM for blood panel</div>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid var(--status-warning-bd)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-primary)' }}>2. Prescription & Strips</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Carry previous paper slip & wrappers</div>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid var(--status-warning-bd)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-primary)' }}>3. Morning Dose Rule</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Take sugar meds post-breakfast only</div>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid var(--status-warning-bd)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-primary)' }}>4. Arrive 15 Min Early</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Record vitals prior to doctor cabin</div>
                    </div>
                  </div>
                </div>

                {/* Medication Adherence Strip */}
                <div style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Active Telemetry Track
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      Metformin Hydrochloride 500mg · 1-0-1 (After Food)
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      Prescription status: Day 12 of 30 · Adherence rate: 94%
                    </div>
                  </div>
                  <span className="vy-badge vy-badge-green">
                    <CheckCircle2 size={13} /> Morning Dose Recorded
                  </span>
                </div>
              </div>
            ) : (
              <div>
                {/* Doctor Patient Queue Preview */}
                <div style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '0.85rem 1.25rem',
                    background: 'var(--bg-subtle)',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      Facility Queue · Primary Health Centre (PHC North Main)
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      6 Patients Active Today
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                      { token: 'P-001', name: 'Patient 1', complaint: 'Acute Viral URTI, persistent fever and myalgia', status: 'Waiting', priority: 'Moderate' },
                      { token: 'P-002', name: 'Patient 2', complaint: 'Essential Hypertension Stage 2, severe cephalea', status: 'In Consultation', priority: 'High' },
                      { token: 'P-003', name: 'Patient 3', complaint: 'Acute Gastroenteritis, mild dehydration review', status: 'Waiting', priority: 'Routine' }
                    ].map((row, i) => (
                      <div key={row.token} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.9rem 1.25rem',
                        borderBottom: i < 2 ? '1px solid var(--border-hairline)' : 'none',
                        gap: '1rem',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-hover)', background: 'var(--accent-light)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                            {row.token}
                          </span>
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                              {row.name}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                              {row.complaint}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span className={`vy-badge ${row.status === 'In Consultation' ? 'vy-badge-blue' : 'vy-badge-neutral'}`}>
                            {row.status}
                          </span>
                          <span className={`vy-badge ${row.priority === 'High' ? 'vy-badge-amber' : 'vy-badge-neutral'}`}>
                            {row.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── 3 Architectural Pillars ─────────────────────────── */}
      <section style={{
        maxWidth: '1160px',
        margin: '0 auto',
        padding: '0 1.5rem 5rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.03em', margin: '0 0 0.5rem' }}>
            Built for Two Stakeholders, Orchestrated by Autonomous AI
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
            A disciplined architecture separating clinical consultation from daily recovery guidance.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Card 1: Patient Portal */}
          <div className="vy-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-light)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <User size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: '0 0 0.4rem', color: 'var(--text-primary)' }}>
                Patient Experience
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: '0 0 1.25rem' }}>
                Multilingual intake and cryptographic privacy-first check-ins without repetitive forms.
              </p>
              <ul style={{ margin: '0 0 1.5rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--status-success)" /> Voice-assisted symptom reporting in Hindi & English
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--status-success)" /> Opaque QR tokens for contactless clinician check-in
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--status-success)" /> Digital prescriptions and diagnostic visit history
                </li>
              </ul>
            </div>
            <Link
              to="/patient"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.95rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.84rem',
                fontWeight: '600',
                transition: 'all 140ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'}
            >
              <span>Launch Patient Portal</span>
              <ArrowRight size={14} color="var(--text-muted)" />
            </Link>
          </div>

          {/* Card 2: Doctor Workstation */}
          <div className="vy-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: '#ecfdf5',
                color: 'var(--status-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Stethoscope size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: '0 0 0.4rem', color: 'var(--text-primary)' }}>
                Doctor Workstation
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: '0 0 1.25rem' }}>
                High-density consultation cockpit built for OPD speeds and verified patient privacy.
              </p>
              <ul style={{ margin: '0 0 1.5rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--status-success)" /> Anonymized queue sequencing (Patient 1, Patient 2...)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--status-success)" /> Fast camera QR barcode and token scanner
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--status-success)" /> Multi-drug prescription builder with allergy safety
                </li>
              </ul>
            </div>
            <Link
              to="/doctor"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.95rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.84rem',
                fontWeight: '600',
                transition: 'all 140ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'}
            >
              <span>Launch Doctor Portal</span>
              <ArrowRight size={14} color="var(--text-muted)" />
            </Link>
          </div>

          {/* Card 3: Autonomous Care Coordinator */}
          <div className="vy-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1.5px solid var(--accent-border)', background: 'var(--bg-surface)' }}>
            <div>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-light)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Bot size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: '0 0 0.4rem', color: 'var(--text-primary)' }}>
                AI Care Coordinator
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: '0 0 1.25rem' }}>
                Closes the recovery loop with daily dosing checklists, dietary precautions, and T-1 reminders.
              </p>
              <ul style={{ margin: '0 0 1.5rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--accent-primary)" /> Daily 3-slot dose tracking telemetry (Morning/Afternoon/Night)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--accent-primary)" /> 24-hour pre-consultation fasting & documents checklist
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--accent-primary)" /> Bilingual AI medical query assistant in English and Hindi
                </li>
              </ul>
            </div>
            <Link
              to="/patient/ai-coordinator"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.95rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary)',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.84rem',
                fontWeight: '600',
                transition: 'all 140ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent-primary)'}
            >
              <span>Explore AI Coordinator</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Workflow Step-by-Step ──────────────────────────── */}
      <section style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '4rem 1.5rem'
      }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="vy-badge vy-badge-neutral" style={{ marginBottom: '0.5rem' }}>How It Works</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.025em', margin: '0.25rem 0 0' }}>
              From Clinic Triage to Daily Recovery
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                step: '01',
                title: 'Patient Intake & QR Pass',
                desc: 'Patient records symptoms via speech or text. A cryptographic QR pass is generated for clinical verification.'
              },
              {
                step: '02',
                title: 'Doctor Consultation',
                desc: 'Clinician scans QR, reviews clinical briefing, records findings, and signs off on multi-drug prescriptions.'
              },
              {
                step: '03',
                title: 'AI Recovery Synthesis',
                desc: 'The AI Care Coordinator ingests doctor notes, establishing tailored dose intervals, dietary cautions, and red flags.'
              },
              {
                step: '04',
                title: 'Day-Before Follow-Up',
                desc: 'At T-1 before follow-up, the AI delivers an actionable checklist covering fasting rules, timing, and transit.'
              }
            ].map((st) => (
              <div key={st.step} style={{ padding: '0.5rem' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '0.5rem', fontFamily: 'monospace' }}>
                  {st.step}
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 0.4rem' }}>
                  {st.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: 0 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust, Security & Compliance ───────────────────── */}
      <section style={{
        maxWidth: '1160px',
        margin: '0 auto',
        padding: '4rem 1.5rem'
      }}>
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <div style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: 'var(--radius-md)', background: 'var(--accent-light)', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
              <Shield size={22} />
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '0 0 0.35rem' }}>
              Privacy-Preserving QR Passes
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: 0 }}>
              Tokens contain opaque identifier digests without exposing raw medical records or PII in cleartext.
            </p>
          </div>

          <div>
            <div style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: 'var(--radius-md)', background: '#ecfdf5', color: 'var(--status-success)', marginBottom: '0.75rem' }}>
              <FileCheck2 size={22} />
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '0 0 0.35rem' }}>
              Cryptographic Sign-Off Locks
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: 0 }}>
              Once a doctor finalizes consultation notes, encounters are locked with registration credentials for auditing.
            </p>
          </div>

          <div>
            <div style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: 'var(--radius-md)', background: 'var(--status-warning-bg)', color: 'var(--status-warning)', marginBottom: '0.75rem' }}>
              <BellRing size={22} />
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '0 0 0.35rem' }}>
              Safety Guardrails & Red Flags
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: 0 }}>
              The AI coordinator flags dangerous vitals surges or emergency symptoms directly to local health centres.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Minimal Footer ─────────────────────────────────── */}
      <footer style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '2rem 1.5rem',
        fontSize: '0.82rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{
          maxWidth: '1160px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={16} color="var(--accent-primary)" />
            <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Veyora Healthcare</span>
            <span>· Intelligent Clinical Continuity</span>
          </div>
          <div>
            <span>Standardized Evaluation Build · Patient & Doctor Portals</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
