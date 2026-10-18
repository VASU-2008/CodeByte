import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  User,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  QrCode,
  Activity,
  CheckCircle2,
  Clock,
  Car,
  Pill,
  FileCheck,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, login } = useAuth();

  const handleQuickDemo = async (role) => {
    const creds = {
      doctor: { email: 'doctor@veyora.com', password: 'password123', path: '/doctor' },
      coordinator: { email: 'coordinator@veyora.com', password: 'password123', path: '/coordinator' },
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
          Connected Care Continuity Engine
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          fontWeight: '900',
          color: '#0f172a',
          lineHeight: '1.15',
          margin: '0 auto 1rem',
          maxWidth: '850px',
          letterSpacing: '-0.03em'
        }}>
          Transforming Primary Healthcare with Unified Continuity of Care
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: '#475569',
          maxWidth: '680px',
          margin: '0 auto 2rem',
          lineHeight: '1.6'
        }}>
          Veyora unifies <strong>Patients</strong>, <strong>Clinicians</strong>, and <strong>Community Coordinators</strong> into a single synchronized system with AI-assisted triage, rural transport logistics, and adherence tracking.
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
              padding: '0.4rem 0.85rem',
              borderRadius: '12px',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            👨‍⚕️ Doctor Portal
          </button>
          <button
            onClick={() => handleQuickDemo('coordinator')}
            style={{
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              padding: '0.4rem 0.85rem',
              borderRadius: '12px',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            📋 Coordinator Portal
          </button>
          <button
            onClick={() => handleQuickDemo('patient')}
            style={{
              background: '#059669',
              color: '#ffffff',
              border: 'none',
              padding: '0.4rem 0.85rem',
              borderRadius: '12px',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🏥 Patient Portal
          </button>
        </div>

        {/* 3 Portal Selection Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
          textAlign: 'left'
        }}>
          {/* Patient Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <div>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <User size={26} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 0.5rem', color: '#0f172a' }}>
                Patient Portal
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 1.25rem', lineHeight: '1.5' }}>
                Multilingual intake with Web Speech voice recognition, intelligent triage routing, digital QR check-in passes, and prescription history.
              </p>
              <ul style={{ margin: '0 0 1.5rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.84rem', color: '#334155' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Voice-enabled multilingual symptom intake
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Instant Consent QR Pass token generation
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Active prescription & medication reminders
                </li>
              </ul>
            </div>
            <Link
              to="/patient"
              style={{
                background: '#2563eb',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '0.8rem 1.25rem',
                borderRadius: '14px',
                fontWeight: '700',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
              }}
            >
              <span>Launch Patient Portal</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Doctor Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Stethoscope size={26} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 0.5rem', color: '#0f172a' }}>
                Doctor Portal
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 1.25rem', lineHeight: '1.5' }}>
                High-efficiency clinician workstation with QR scanner lookup, clinical briefing, formulary builder with drug allergy conflict warning, and digital lock.
              </p>
              <ul style={{ margin: '0 0 1.5rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.84rem', color: '#334155' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Live facility patient queue & status tracking
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Camera and image file QR token scan lookup
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Multi-drug builder with allergy cross-checking
                </li>
              </ul>
            </div>
            <Link
              to="/doctor"
              style={{
                background: '#044e42',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '0.8rem 1.25rem',
                borderRadius: '14px',
                fontWeight: '700',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(4, 78, 66, 0.25)'
              }}
            >
              <span>Launch Doctor Portal</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Coordinator Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: '#fffbeb',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 0.5rem', color: '#0f172a' }}>
                Coordinator Portal
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 1.25rem', lineHeight: '1.5' }}>
                Central command for community health workers (ASHA), rural transit vouchers for physical barriers, missed dosage adherence, and IVR reminder tracking.
              </p>
              <ul style={{ margin: '0 0 1.5rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.84rem', color: '#334155' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Rural transit voucher dispatch & driver tracking
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Smart-blister 2-missed-dose adherence alerts
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Telemetry vitals anomalies & emergency escalation
                </li>
              </ul>
            </div>
            <Link
              to="/coordinator"
              style={{
                background: '#0284c7',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '0.8rem 1.25rem',
                borderRadius: '14px',
                fontWeight: '700',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)'
              }}
            >
              <span>Launch Coordinator Portal</span>
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
              Zero-Friction Care Journey
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              From rural home symptom intake to OPD cabin consultation, every encounter is linked to a permanent clinical record.
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
              Adherence & Logistics
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Proactively solves rural non-attendance: impassable terrain triggers transit vouchers, missed pills trigger ASHA home visits.
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
