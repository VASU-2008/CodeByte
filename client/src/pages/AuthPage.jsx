import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Stethoscope,
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Activity
} from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, user, isAuthenticated } = useAuth();

  // Mode: 'login' | 'register'
  const isRegisterMode = location.pathname.includes('register');
  const [role, setRole] = useState('patient'); // 'patient' | 'doctor'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    // Patient specific
    age: '',
    gender: 'Male',
    bloodGroup: 'O+',
    // Doctor specific
    specialization: 'General Medicine',
    facility_id: 'PHC_MAIN'
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  // Quick 1-Click Demo Fill
  const handleQuickDemo = async (demoRole) => {
    setLoading(true);
    setErrorMessage('');
    const demoCredentials = {
      doctor: { email: 'doctor1@veyora.com', password: 'password123', target: '/doctor' },
      patient: { email: 'patient1@veyora.com', password: 'password123', target: '/patient' }
    };

    const target = demoCredentials[demoRole];
    try {
      await login(target.email, target.password);
      setSuccessMessage(`Logged in as ${demoRole.toUpperCase()}! Redirecting...`);
      setTimeout(() => {
        navigate(target.target);
      }, 700);
    } catch (err) {
      if (!err?.response) {
        setErrorMessage('Cannot connect to backend server (http://localhost:5001). Please make sure `npm run dev` is running in PowerShell.');
      } else {
        setErrorMessage(err?.response?.data?.message || 'Login failed. Please verify credentials or seed database.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (isRegisterMode) {
        // Register payload
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          phone: formData.phone?.trim() || undefined,
          role,
          ...(role === 'patient' && {
            age: formData.age && !isNaN(Number(formData.age)) ? Number(formData.age) : undefined,
            gender: formData.gender || 'Male',
            bloodGroup: formData.bloodGroup || 'O+'
          }),
          ...(role === 'doctor' && {
            specialization: formData.specialization || 'General Medicine',
            facility_id: formData.facility_id || 'PHC_MAIN'
          })
        };

        const u = await register(payload);
        setSuccessMessage('Registration successful! Launching your portal...');
        setTimeout(() => {
          if (role === 'doctor') navigate('/doctor');
          else navigate('/patient');
        }, 800);
      } else {
        // Login payload
        const u = await login(formData.email.trim().toLowerCase(), formData.password);
        setSuccessMessage('Welcome back! Directing to portal...');
        setTimeout(() => {
          if (u.role === 'doctor') navigate('/doctor');
          else navigate('/patient');
        }, 800);
      }
    } catch (err) {
      if (!err?.response) {
        setErrorMessage('Cannot connect to backend server (http://localhost:5001). Please make sure `npm run dev` is running in PowerShell.');
      } else {
        const errData = err?.response?.data;
        if (errData?.errors) {
          const detail = Object.entries(errData.errors)
            .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
            .join('; ');
          setErrorMessage(`Validation error (${detail})`);
        } else {
          setErrorMessage(errData?.message || 'Authentication failed. Please check credentials.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-page, #f8fafc)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5rem 1rem',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        overflow: 'hidden'
      }}>
        {/* Header Ribbon */}
        <div style={{
          padding: '2rem 2rem 1.5rem',
          borderBottom: '1px solid #f1f5f9',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
        }}>
          {/* Brand Mark */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)'
            }}>
              <Activity size={20} strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.02em' }}>
              Veyora <span style={{ color: '#0284c7' }}>Health</span>
            </span>
          </div>

          <h1 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#0f172a', margin: '0 0 0.35rem', letterSpacing: '-0.02em' }}>
            {isRegisterMode ? 'Create your clinical account' : 'Sign in to your clinical workspace'}
          </h1>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
            {isRegisterMode
              ? 'Register for patient care or clinical practitioner access'
              : 'Secure role-based access for healthcare providers and patients'}
          </p>

          {/* Quick Demo Fill Pills */}
          <div style={{
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>1-Click Evaluator:</span>
            <button
              type="button"
              onClick={() => handleQuickDemo('doctor')}
              style={{
                background: '#f0fdf4',
                color: '#166534',
                border: '1px solid #bbf7d0',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease'
              }}
            >
              <Stethoscope size={13} />
              <span>Doctor Portal</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('patient')}
              style={{
                background: '#f0f9ff',
                color: '#0369a1',
                border: '1px solid #bae6fd',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease'
              }}
            >
              <User size={13} />
              <span>Patient Portal</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher: Login / Register */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc',
          padding: '0.25rem',
          margin: '1.25rem 1.75rem 0',
          borderRadius: '10px'
        }}>
          <Link
            to="/login"
            style={{
              textAlign: 'center',
              padding: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: !isRegisterMode ? '600' : '500',
              color: !isRegisterMode ? '#0f172a' : '#64748b',
              background: !isRegisterMode ? '#ffffff' : 'transparent',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: !isRegisterMode ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            style={{
              textAlign: 'center',
              padding: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: isRegisterMode ? '600' : '500',
              color: isRegisterMode ? '#0f172a' : '#64748b',
              background: isRegisterMode ? '#ffffff' : 'transparent',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: isRegisterMode ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Create Account
          </Link>
        </div>

        <div style={{ padding: '1.5rem 1.75rem 2rem' }}>
          {/* Notifications */}
          {errorMessage && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              padding: '0.75rem 0.875rem',
              borderRadius: '10px',
              fontSize: '0.825rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ lineHeight: 1.4 }}>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#166534',
              padding: '0.75rem 0.875rem',
              borderRadius: '10px',
              fontSize: '0.825rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Role Picker */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: '#475569',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Select Role
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.625rem'
            }}>
              {[
                { id: 'patient', label: 'Patient', sub: 'with AI Care Coordinator', icon: User },
                { id: 'doctor', label: 'Doctor', sub: 'Clinical Consultation', icon: Stethoscope }
              ].map(r => {
                const Icon = r.icon;
                const isSelected = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleSelect(r.id)}
                    style={{
                      background: isSelected ? '#f0f9ff' : '#ffffff',
                      border: isSelected ? '1.5px solid #0284c7' : '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '0.75rem 0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '0.2rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', width: '100%' }}>
                      <Icon size={16} color={isSelected ? '#0284c7' : '#64748b'} />
                      <span style={{
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: isSelected ? '#0284c7' : '#0f172a'
                      }}>
                        {r.label}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      {r.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Registration specific: Full Name */}
            {isRegisterMode && (
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 12 }} />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={role === 'doctor' ? 'Dr. Sarah Jenkins' : 'Patient 1'}
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.25rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      outline: 'none',
                      background: '#ffffff',
                      boxSizing: 'border-box',
                      color: '#0f172a'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 12 }} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={role === 'doctor' ? 'doctor1@veyora.com' : 'patient1@veyora.com'}
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem 0.65rem 2.25rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem',
                    outline: 'none',
                    background: '#ffffff',
                    boxSizing: 'border-box',
                    color: '#0f172a'
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 12 }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.65rem 2.25rem 0.65rem 2.25rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem',
                    outline: 'none',
                    background: '#ffffff',
                    boxSizing: 'border-box',
                    color: '#0f172a'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Registration Additional Fields */}
            {isRegisterMode && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>
                    Phone Number (Optional)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 12 }} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem 0.65rem 2.25rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.875rem',
                        outline: 'none',
                        background: '#ffffff',
                        boxSizing: 'border-box',
                        color: '#0f172a'
                      }}
                    />
                  </div>
                </div>

                {/* Patient Specific: Age, Gender, Blood Group */}
                {role === 'patient' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#334155', marginBottom: '0.25rem' }}>
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        placeholder="35"
                        value={formData.age}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.5rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.825rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#334155', marginBottom: '0.25rem' }}>
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.5rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.825rem',
                          background: '#ffffff',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#334155', marginBottom: '0.25rem' }}>
                        Blood
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.5rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.825rem',
                          background: '#ffffff',
                          boxSizing: 'border-box'
                        }}
                      >
                        {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Doctor Specific: Specialization */}
                {role === 'doctor' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>
                      Clinical Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      placeholder="e.g. Cardiology, Pediatrics, General Medicine"
                      value={formData.specialization}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.875rem',
                        background: '#ffffff',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                )}
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '0.5rem',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 1px 2px rgba(2, 132, 199, 0.2)',
                transition: 'all 0.15s ease'
              }}
            >
              {loading ? 'Processing...' : (
                <>
                  <span>{isRegisterMode ? 'Create Account' : 'Sign In to Portal'}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Bottom Switcher */}
          <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.825rem', color: '#64748b' }}>
            {isRegisterMode ? (
              <span>Already registered? <Link to="/login" style={{ color: '#0284c7', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link></span>
            ) : (
              <span>New to Veyora? <Link to="/register" style={{ color: '#0284c7', fontWeight: '600', textDecoration: 'none' }}>Create an account</Link></span>
            )}
          </div>
        </div>

        {/* Minimal Trust Badge Footer */}
        <div style={{
          padding: '0.875rem 1.75rem',
          background: '#f8fafc',
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          <ShieldCheck size={14} color="#059669" />
          <span>256-bit TLS encryption · HIPAA-ready · ABHA compatible</span>
        </div>
      </div>
    </div>
  );
}
