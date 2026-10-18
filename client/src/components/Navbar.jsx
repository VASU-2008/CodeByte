import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Stethoscope,
  User,
  ShieldCheck,
  LogOut,
  LogIn,
  Activity,
  Home,
  Bot
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e2e8f0',
      color: '#0f172a',
      padding: '0.65rem 1.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
      transition: 'all 180ms ease'
    }}>
      {/* Brand Logo & Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: '#0f172a',
            textDecoration: 'none',
            fontWeight: '800',
            fontSize: '1.1rem',
            letterSpacing: '-0.025em'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '9px',
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0284c7',
            boxShadow: '0 1px 2px rgba(2, 132, 199, 0.08)'
          }}>
            <Activity size={17} strokeWidth={2.5} />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
            <span>Veyora</span>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: '700',
              color: '#0284c7',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Clinical
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.84rem' }}>
          <Link
            to="/"
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: isActive('/') ? '#0f172a' : '#64748b',
              background: isActive('/') ? '#f1f5f9' : 'transparent',
              fontWeight: isActive('/') ? '600' : '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              border: isActive('/') ? '1px solid #e2e8f0' : '1px solid transparent',
              transition: 'all 140ms ease'
            }}
          >
            <Home size={14} color={isActive('/') ? '#0284c7' : '#94a3b8'} />
            Overview
          </Link>

          <Link
            to="/patient"
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: isActive('/patient') ? '#0f172a' : '#64748b',
              background: isActive('/patient') ? '#f1f5f9' : 'transparent',
              fontWeight: isActive('/patient') ? '600' : '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              border: isActive('/patient') ? '1px solid #e2e8f0' : '1px solid transparent',
              transition: 'all 140ms ease'
            }}
          >
            <Bot size={14} color={isActive('/patient') ? '#0284c7' : '#94a3b8'} />
            <span>Patient & AI Care</span>
          </Link>

          <Link
            to="/doctor"
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: isActive('/doctor') ? '#0f172a' : '#64748b',
              background: isActive('/doctor') ? '#f1f5f9' : 'transparent',
              fontWeight: isActive('/doctor') ? '600' : '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              border: isActive('/doctor') ? '1px solid #e2e8f0' : '1px solid transparent',
              transition: 'all 140ms ease'
            }}
          >
            <Stethoscope size={14} color={isActive('/doctor') ? '#0284c7' : '#94a3b8'} />
            <span>Doctor Portal</span>
          </Link>
        </div>
      </div>

      {/* Right Session Status & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {isAuthenticated && user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '0.3rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.82rem'
            }}>
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#0284c7',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.68rem',
                fontWeight: '700'
              }}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>{user.name}</span>
              <span style={{
                background: '#f0f9ff',
                color: '#0369a1',
                border: '1px solid #bae6fd',
                padding: '0.08rem 0.4rem',
                borderRadius: '8px',
                fontSize: '0.68rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.03em'
              }}>
                {user.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              style={{
                background: 'transparent',
                border: '1px solid #e2e8f0',
                color: '#64748b',
                padding: '0.35rem 0.65rem',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'all 140ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e11d48';
                e.currentTarget.style.borderColor = '#fecdd3';
                e.currentTarget.style.background = '#fff1f2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748b';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link
              to="/login"
              style={{
                background: '#0284c7',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 1px 2px rgba(2, 132, 199, 0.2)',
                transition: 'all 140ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0369a1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0284c7';
              }}
            >
              <LogIn size={13} />
              <span>Sign In</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}