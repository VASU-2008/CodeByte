import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, token, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        color: '#64748b',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #cbd5e1',
            borderTopColor: '#044e42',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Verifying credentials...</p>
        </div>
      </div>
    );
  }

  // Not authenticated -> redirect to login with redirect back param
  if (!token || !user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Role authorization check
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '460px',
          background: '#ffffff',
          borderRadius: '20px',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: '#fef2f2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <ShieldAlert size={28} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.5rem' }}>
            Access Restricted
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
            You are logged in as <strong>{user.name}</strong> ({user.role}), which does not have permission to access this portal.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link
              to={user.role === 'doctor' ? '/doctor' : user.role === 'coordinator' ? '/coordinator' : '/patient'}
              style={{
                background: '#044e42',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '0.75rem',
                borderRadius: '12px',
                fontSize: '0.88rem',
                fontWeight: '700'
              }}
            >
              Go to My Authorized Portal ({user.role.toUpperCase()})
            </Link>
            <button
              onClick={logout}
              style={{
                background: '#f1f5f9',
                color: '#475569',
                border: 'none',
                padding: '0.7rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <LogOut size={15} />
              Sign Out & Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
