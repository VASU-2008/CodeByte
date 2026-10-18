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
      doctor: { email: 'doctor@veyora.com', password: 'password123', target: '/doctor' },
      patient: { email: 'patient@veyora.com', password: 'password123', target: '/patient' }
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
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined,
          role,
          ...(role === 'patient' && {
            age: formData.age ? parseInt(formData.age, 10) : undefined,
            gender: formData.gender,
            bloodGroup: formData.bloodGroup
          }),
          ...(role === 'doctor' && {
            specialization: formData.specialization,
            facility_id: formData.facility_id
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
        const u = await login(formData.email, formData.password);
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
        setErrorMessage(
          err?.response?.data?.message ||
          (err?.response?.data?.errors ? Object.values(err.response.data.errors).flat().join(', ') : 'Authentication failed. Please check credentials.')
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #eff6ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '540px',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        {/* Header Ribbon */}
        <div style={{
          background: 'linear-gradient(135deg, #044e42 0%, #0f766e 100%)',
          padding: '2rem 2rem 1.75rem',
          color: '#ffffff',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            padding: '0.3rem 0.85rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600',
            marginBottom: '0.75rem'
          }}>
            <Sparkles size={14} />
            Unified Health Authentication
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>
            Veyora Healthcare
          </h1>
          <p style={{ margin: '0.35rem 0 0', fontSize: '0.88rem', color: '#ccfbf1', opacity: 0.9 }}>
            Three portals · One connected care continuity engine
          </p>

          {/* Quick Demo Fill Pills */}
          <div style={{
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '0.75rem', opacity: 0.8, marginRight: '4px' }}>1-Click Demo:</span>
            <button
              type="button"
              onClick={() => handleQuickDemo('doctor')}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.25rem 0.65rem',
                borderRadius: '14px',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              👨‍⚕️ Doctor
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('patient')}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.25rem 0.65rem',
                borderRadius: '14px',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🏥 Patient
            </button>
          </div>
        </div>

        {/* Tab Switcher: Login / Register */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc'
        }}>
          <Link
            to="/login"
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '0.85rem',
              fontSize: '0.92rem',
              fontWeight: !isRegisterMode ? '700' : '500',
              color: !isRegisterMode ? '#044e42' : '#64748b',
              borderBottom: !isRegisterMode ? '3px solid #044e42' : 'none',
              background: !isRegisterMode ? '#ffffff' : 'transparent',
              textDecoration: 'none'
            }}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '0.85rem',
              fontSize: '0.92rem',
              fontWeight: isRegisterMode ? '700' : '500',
              color: isRegisterMode ? '#044e42' : '#64748b',
              borderBottom: isRegisterMode ? '3px solid #044e42' : 'none',
              background: isRegisterMode ? '#ffffff' : 'transparent',
              textDecoration: 'none'
            }}
          >
            Create Account
          </Link>
        </div>

        <div style={{ padding: '2rem' }}>
          {/* Notifications */}
          {errorMessage && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#047857',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Role Picker (For Registration or Role Switching) */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: '700',
              color: '#334155',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Select Your Healthcare Role
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem'
            }}>
              {[
                { id: 'patient', label: 'Patient (with AI Care)', icon: User, color: '#0284c7', bg: '#f0f9ff' },
                { id: 'doctor', label: 'Doctor', icon: Stethoscope, color: '#059669', bg: '#f0fdf4' }
              ].map(r => {
                const Icon = r.icon;
                const isSelected = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleSelect(r.id)}
                    style={{
                      background: isSelected ? r.bg : '#ffffff',
                      border: isSelected ? `2px solid ${r.color}` : '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '0.85rem 0.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.4rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={20} color={isSelected ? r.color : '#64748b'} />
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? '700' : '600',
                      color: isSelected ? '#0f172a' : '#64748b'
                    }}>
                      {r.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {/* Registration specific: Full Name */}
            {isRegisterMode && (
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 12 }} />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={role === 'doctor' ? 'Dr. John Doe' : 'Jane Doe'}
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.7rem 1rem 0.7rem 2.4rem',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      outline: 'none',
                      background: '#f8fafc'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 12 }} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem 0.7rem 2.4rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    background: '#f8fafc'
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 12 }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.7rem 2.4rem 0.7rem 2.4rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    background: '#f8fafc'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: 12,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Registration Additional Fields */}
            {isRegisterMode && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>
                    Phone Number (Optional)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 12 }} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.7rem 1rem 0.7rem 2.4rem',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        outline: 'none',
                        background: '#f8fafc'
                      }}
                    />
                  </div>
                </div>

                {/* Patient Specific: Age, Gender, Blood Group */}
                {role === 'patient' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.65rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#334155', marginBottom: '0.25rem' }}>
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
                          padding: '0.65rem',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          background: '#f8fafc'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#334155', marginBottom: '0.25rem' }}>
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          background: '#f8fafc'
                        }}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#334155', marginBottom: '0.25rem' }}>
                        Blood
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          background: '#f8fafc'
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
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>
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
                        padding: '0.7rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        background: '#f8fafc'
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
                background: '#044e42',
                color: '#ffffff',
                border: 'none',
                borderRadius: '14px',
                padding: '0.85rem',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(4, 78, 66, 0.25)',
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
          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
            {isRegisterMode ? (
              <span>Already registered? <Link to="/login" style={{ color: '#044e42', fontWeight: '700' }}>Sign In</Link></span>
            ) : (
              <span>New to Veyora? <Link to="/register" style={{ color: '#044e42', fontWeight: '700' }}>Create an account</Link></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
