import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Stethoscope,
  User,
  ShieldCheck,
  LogOut,
  LogIn,
  Sparkles,
  Home
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav style={{
      background: '#044e42',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      padding: '0.65rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#ffffff',
          textDecoration: 'none',
          fontWeight: '800',
          fontSize: '1.15rem',
          letterSpacing: '-0.02em'
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={16} color="#5eead4" />
          </div>
          <span>Veyora Healthcare</span>
        </Link>

        {/* Portal Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
          <Link
            to="/"
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: location.pathname === '/' ? '#ffffff' : '#99f6e4',
              background: location.pathname === '/' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              fontWeight: location.pathname === '/' ? '700' : '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Home size={14} />
            Overview
          </Link>

          <Link
            to="/patient"
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: isActive('/patient') ? '#ffffff' : '#99f6e4',
              background: isActive('/patient') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              fontWeight: isActive('/patient') ? '700' : '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <User size={14} />
            Patient
          </Link>

          <Link
            to="/doctor"
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: isActive('/doctor') ? '#ffffff' : '#99f6e4',
              background: isActive('/doctor') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              fontWeight: isActive('/doctor') ? '700' : '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Stethoscope size={14} />
            Doctor
          </Link>

          <Link
            to="/coordinator"
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: isActive('/coordinator') ? '#ffffff' : '#99f6e4',
              background: isActive('/coordinator') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              fontWeight: isActive('/coordinator') ? '700' : '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <ShieldCheck size={14} />
            Coordinator
          </Link>
        </div>
      </div>

      {/* Right Session Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {isAuthenticated && user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.25rem 0.65rem',
              borderRadius: '20px',
              fontSize: '0.8rem'
            }}>
              <span style={{ fontWeight: '700', color: '#ffffff' }}>{user.name}</span>
              <span style={{
                background: '#0f766e',
                color: '#ccfbf1',
                padding: '0.1rem 0.45rem',
                borderRadius: '10px',
                fontSize: '0.7rem',
                fontWeight: '700',
                textTransform: 'uppercase'
              }}>
                {user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#fecaca',
                padding: '0.35rem 0.65rem',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <LogOut size={13} />
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            style={{
              background: '#ffffff',
              color: '#044e42',
              textDecoration: 'none',
              padding: '0.35rem 0.9rem',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            <LogIn size={14} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}