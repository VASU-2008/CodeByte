import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
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
  CalendarCheck
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleQuickDemo = async (role) => {
    const creds = {
      doctor: { email: 'doctor@veyora.com', password: 'password123', path: '/doctor' },
      patient: { email: 'patient@veyora.com', password: 'password123', path: '/patient' }
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
      background: 'linear-gradient(180deg, #f0fdf4 0%, #f8fafc 40%, #ffffff 100%)',
      color: '#0f172a',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3.5rem 1.5rem 2.5rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: '#dcfce7',
          color: '#166534',
          padding: '0.35rem 0.9rem',
          borderRadius: '30px',
          fontSize: '0.82rem',
          fontWeight: '700',
          marginBottom: '1rem',
          border: '1px solid #bbf7d0'
        }}>
          <Sparkles size={14} />
          Post-Consultation AI Continuity Engine
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          fontWeight: '900',
          color: '#0f172a',
          lineHeight: '1.15',
          margin: '0 auto 1rem',
          maxWidth: '900px',
          letterSpacing: '-0.03em'
        }}>
          Closing the Healthcare Continuity Gap with Intelligent AI Care
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: '#475569',
          maxWidth: '750px',
          margin: '0 auto 2rem',
          lineHeight: '1.6'
        }}>
          Pre-existing solutions like <strong>ABHA</strong> store static medical records, but abandon patients after consultation. 
          Veyora pairs a streamlined <strong>Doctor Portal</strong> and <strong>Patient Portal</strong> with an autonomous <strong>AI Care Coordinator</strong> that guides daily doses, precautions, dietary needs, and checkup reminders.
        </p>

        {/* Demo Fast-Track Bar */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: '#ffffff',
          padding: '0.6rem 1rem',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '2.5rem'
        }}>
          <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#64748b' }}>
            ⚡ 1-Click Evaluator Login:
          </span>
          <button
            onClick={() => handleQuickDemo('doctor')}
            style={{
              background: '#044e42',
              color: '#ffffff',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: '12px',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Stethoscope size={14} />
            Doctor Portal
          </button>
          <button
            onClick={() => handleQuickDemo('patient')}
            style={{
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: '12px',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <User size={14} />
            Patient Portal (with AI Care)
          </button>
        </div>

        {/* 2 Core Portals + Embedded AI Care Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
          textAlign: 'left'
        }}>
          {/* Patient Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '2.25rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <User size={28} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#0f172a' }}>
                  Patient Portal
                </h3>
                <span style={{
                  background: '#dbeafe',
                  color: '#1e40af',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '10px'
                }}>
                  AI Powered
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem', lineHeight: '1.5' }}>
                Frictionless experience for patients: voice-enabled multilingual intake, privacy-first QR check-in passes, and visit history.
              </p>
              <ul style={{ margin: '0 0 1.5rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.86rem', color: '#334155' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Web Speech voice-enabled symptom intake in Hindi & English
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Instant Consent QR Pass token for touchless clinician lookup
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Complete digital prescription and diagnosis records
                </li>
              </ul>
            </div>
            <Link
              to="/patient"
              style={{
                background: '#0284c7',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '0.85rem 1.25rem',
                borderRadius: '14px',
                fontWeight: '700',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)'
              }}
            >
              <span>Launch Patient Portal</span>
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Doctor Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '2.25rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Stethoscope size={28} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#0f172a' }}>
                  Doctor Portal
                </h3>
                <span style={{
                  background: '#d1fae5',
                  color: '#065f46',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '10px'
                }}>
                  Clinician
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem', lineHeight: '1.5' }}>
                High-efficiency clinician workstation with rapid QR scanner token lookup, clinical briefing, formulary builder, and cryptographic sign-off.
              </p>
              <ul style={{ margin: '0 0 1.5rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.86rem', color: '#334155' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Live facility patient queue with triage urgency badges
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Fast camera & image QR token scan lookup
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Multi-drug prescription builder with allergy cross-checking
                </li>
              </ul>
            </div>
            <Link
              to="/doctor"
              style={{
                background: '#044e42',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '0.85rem 1.25rem',
                borderRadius: '14px',
                fontWeight: '700',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(4, 78, 66, 0.25)'
              }}
            >
              <span>Launch Doctor Portal</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        {/* AI Care Coordinator Spotlight Feature (The ABHA Gap Solution) */}
        <div style={{
          marginTop: '2.5rem',
          background: 'linear-gradient(135deg, #044e42 0%, #065f46 50%, #0f766e 100%)',
          borderRadius: '28px',
          padding: '2.5rem',
          color: '#ffffff',
          textAlign: 'left',
          boxShadow: '0 15px 35px rgba(4, 78, 66, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BrainCircuit size={24} color="#5eead4" />
            </div>
            <div>
              <span style={{
                background: 'rgba(94, 234, 212, 0.2)',
                color: '#5eead4',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '0.2rem 0.6rem',
                borderRadius: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                The Missing ABHA Link
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0.25rem 0 0', color: '#ffffff' }}>
                Veyora AI Care Coordinator: 24/7 Post-Consultation Companion
              </h3>
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', color: '#ccfbf1', maxWidth: '850px', lineHeight: '1.6', margin: '0 0 1.75rem' }}>
            Pre-existing digital health systems (like ABHA / ABDM) only store static records. Patients leave the clinic and forget dose timings, ignore dietary restrictions, or miss follow-ups. 
            The <strong>Veyora AI Coordinator</strong> activates the moment the doctor signs off:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem'
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1.1rem', borderRadius: '16px' }}>
              <div style={{ color: '#5eead4', marginBottom: '0.4rem' }}><Pill size={20} /></div>
              <h4 style={{ margin: '0 0 0.3rem', fontSize: '0.95rem', fontWeight: '700' }}>Smart Dose Schedule</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#ccfbf1', lineHeight: '1.4' }}>
                Daily morning, afternoon & night adherence tracking with water/food timing guidance.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1.1rem', borderRadius: '16px' }}>
              <div style={{ color: '#5eead4', marginBottom: '0.4rem' }}><HeartPulse size={20} /></div>
              <h4 style={{ margin: '0 0 0.3rem', fontSize: '0.95rem', fontWeight: '700' }}>Diagnosis Precautions</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#ccfbf1', lineHeight: '1.4' }}>
                Personalized dietary restrictions, lifestyle habits, and red-flag symptom warnings.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1.1rem', borderRadius: '16px' }}>
              <div style={{ color: '#5eead4', marginBottom: '0.4rem' }}><CalendarCheck size={20} /></div>
              <h4 style={{ margin: '0 0 0.3rem', fontSize: '0.95rem', fontWeight: '700' }}>Check-up Reminders</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#ccfbf1', lineHeight: '1.4' }}>
                Automatic countdowns, preparation checklists (fasting tests), and appointment alerts.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1.1rem', borderRadius: '16px' }}>
              <div style={{ color: '#5eead4', marginBottom: '0.4rem' }}><Bot size={20} /></div>
              <h4 style={{ margin: '0 0 0.3rem', fontSize: '0.95rem', fontWeight: '700' }}>Bilingual AI Chat</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#ccfbf1', lineHeight: '1.4' }}>
                Patients ask any health or medicine question in English or Hindi with instant clinical safety.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Link
              to="/patient/ai-coordinator"
              style={{
                background: '#ffffff',
                color: '#044e42',
                textDecoration: 'none',
                padding: '0.8rem 1.4rem',
                borderRadius: '14px',
                fontWeight: '800',
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
              }}
            >
              <span>Explore AI Care Coordinator</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Architecture Strip */}
      <section style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '3rem 1.5rem',
        marginTop: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <div style={{ color: '#044e42', marginBottom: '0.5rem' }}>
              <Activity size={24} />
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', margin: '0 0 0.35rem' }}>
              End-to-End Continuity
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              From initial rural symptom intake to doctor consultation and 24/7 AI-guided recovery at home.
            </p>
          </div>

          <div>
            <div style={{ color: '#044e42', marginBottom: '0.5rem' }}>
              <QrCode size={24} />
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', margin: '0 0 0.35rem' }}>
              Privacy-First Consent QR
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Opaque tokens verify patient presence and consent without leaking medical records or personally identifiable data.
            </p>
          </div>

          <div>
            <div style={{ color: '#044e42', marginBottom: '0.5rem' }}>
              <Pill size={24} />
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', margin: '0 0 0.35rem' }}>
              Daily Adherence Tracking
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Helps patients stick to antibiotic courses and chronic disease regimens with interactive checklists.
            </p>
          </div>

          <div>
            <div style={{ color: '#044e42', marginBottom: '0.5rem' }}>
              <Lock size={24} />
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', margin: '0 0 0.35rem' }}>
              Tamper-Proof Sign-Off
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Completed encounters are cryptographically locked with clinician registration timestamps to ensure audit compliance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
