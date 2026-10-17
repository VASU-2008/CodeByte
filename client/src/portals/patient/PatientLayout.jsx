import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Home, Stethoscope, QrCode, Clock, FileText, RefreshCw,
  Pill, LogOut, Menu, X, ChevronRight, Bell, User, Heart
} from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';

const NAV_ITEMS = [
  { to: '/patient',           label: 'Home',               labelHi: 'होम',                 icon: Home,        end: true },
  { to: '/patient/intake',    label: 'Start Consultation', labelHi: 'परामर्श शुरू करें',   icon: Stethoscope        },
  { to: '/patient/qr-pass',  label: 'My QR Pass',         labelHi: 'मेरा QR पास',          icon: QrCode             },
  { to: '/patient/history',  label: 'Visit History',      labelHi: 'यात्रा इतिहास',        icon: Clock              },
  { to: '/patient/results',  label: 'Visit Results',      labelHi: 'यात्रा परिणाम',        icon: FileText           },
  { to: '/patient/followup', label: 'Follow-up Journey',  labelHi: 'फॉलो-अप यात्रा',      icon: RefreshCw          },
  { to: '/patient/medicines',label: 'Medicines',          labelHi: 'दवाइयाँ',              icon: Pill               },
];

export default function PatientLayout({ lang, onLangChange }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHindi = lang === 'hi';
  const label = (en, hi) => isHindi ? hi : en;

  function handleLogout() {
    logout();
    navigate('/');
  }

  const SidebarContent = () => (
    <aside className="pp-sidebar">
      {/* Brand */}
      <div className="pp-sidebar-brand">
        <div className="pp-sidebar-logo">
          <Heart size={22} />
        </div>
        <div>
          <div className="pp-sidebar-brand-name">Veyora</div>
          <div className="pp-sidebar-brand-sub">Healthcare</div>
        </div>
      </div>

      {/* Patient profile strip */}
      <div className="pp-sidebar-profile">
        <div className="pp-sidebar-avatar">
          {user?.name ? user.name[0].toUpperCase() : <User size={18} />}
        </div>
        <div className="pp-sidebar-profile-info">
          <div className="pp-sidebar-profile-name">{user?.name || (isHindi ? 'रोगी' : 'Patient')}</div>
          <div className="pp-sidebar-profile-role">{isHindi ? 'रोगी पोर्टल' : 'Patient Portal'}</div>
        </div>
        <button className="pp-sidebar-notif pp-btn pp-btn-ghost pp-btn-sm" aria-label="Notifications">
          <Bell size={16} />
        </button>
      </div>

      {/* Language selector */}
      <div className="pp-sidebar-lang">
        <LanguageSelector value={lang} onChange={onLangChange} />
      </div>

      {/* Navigation */}
      <nav className="pp-sidebar-nav" aria-label="Patient portal navigation">
        {NAV_ITEMS.map(({ to, label: en, labelHi, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `pp-nav-item${isActive ? ' pp-nav-item--active' : ''}`
            }
            onClick={() => setMobileOpen(false)}
          >
            <Icon size={18} className="pp-nav-icon" />
            <span>{label(en, labelHi)}</span>
            <ChevronRight size={14} className="pp-nav-chevron" />
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button className="pp-sidebar-logout pp-btn pp-btn-ghost" onClick={handleLogout}>
        <LogOut size={16} />
        <span>{isHindi ? 'लॉगआउट' : 'Sign Out'}</span>
      </button>
    </aside>
  );

  return (
    <div className="pp-layout pp-gradient-bg">
      {/* Desktop Sidebar */}
      <div className="pp-layout-sidebar pp-hide-mobile">
        <SidebarContent />
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="pp-mobile-overlay"
          onClick={() => setMobileOpen(false)}
          role="presentation"
        />
      )}
      {/* Mobile Drawer */}
      <div className={`pp-mobile-drawer pp-hide-desktop${mobileOpen ? ' pp-mobile-drawer--open' : ''}`}>
        <SidebarContent />
      </div>

      {/* Main content area */}
      <div className="pp-layout-main">
        {/* Mobile top bar */}
        <header className="pp-mobile-topbar pp-hide-desktop">
          <button
            className="pp-btn pp-btn-ghost pp-btn-sm"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Open menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="pp-mobile-topbar-brand">
            <Heart size={18} style={{ color: 'var(--pp-primary)' }} />
            <strong>Veyora</strong>
          </div>
          <LanguageSelector value={lang} onChange={onLangChange} compact />
        </header>

        {/* Page content */}
        <main className="pp-layout-content">
          <Outlet />
        </main>
      </div>

      <style>{`
        /* ── Layout shell ──────────────────────────────── */
        .pp-layout {
          display: flex;
          min-height: 100vh;
          width: 100%;
        }

        /* ── Sidebar ───────────────────────────────────── */
        .pp-layout-sidebar {
          width: 260px;
          flex-shrink: 0;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          z-index: var(--z-sidebar);
        }

        .pp-sidebar {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1.25rem 0.875rem;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-right: 1px solid var(--pp-border);
          box-shadow: 2px 0 20px rgba(0,0,0,0.04);
          gap: 0;
        }

        /* Brand */
        .pp-sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.5rem 0.5rem 1.25rem;
          border-bottom: 1px solid var(--pp-border);
          margin-bottom: 1rem;
        }
        .pp-sidebar-logo {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-lg);
          background: linear-gradient(135deg, var(--pp-primary) 0%, #6366f1 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(59,130,246,0.35);
        }
        .pp-sidebar-brand-name {
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--pp-text-primary);
          line-height: 1.1;
        }
        .pp-sidebar-brand-sub {
          font-size: 0.7rem;
          color: var(--pp-text-muted);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* Profile */
        .pp-sidebar-profile {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.75rem 0.5rem;
          border-radius: var(--radius-xl);
          background: var(--pp-lavender);
          margin-bottom: 0.75rem;
        }
        .pp-sidebar-avatar {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, var(--pp-primary) 0%, #6366f1 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          flex-shrink: 0;
        }
        .pp-sidebar-profile-info { flex: 1; min-width: 0; }
        .pp-sidebar-profile-name {
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--pp-text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pp-sidebar-profile-role {
          font-size: 0.7rem;
          color: var(--pp-primary);
          font-weight: 500;
        }
        .pp-sidebar-notif { padding: 0.25rem; }

        /* Language selector area */
        .pp-sidebar-lang { padding: 0 0.25rem 0.75rem; }

        /* Nav */
        .pp-sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          overflow-y: auto;
          padding-right: 2px;
        }
        .pp-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 0.875rem;
          border-radius: var(--radius-xl);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--pp-text-secondary);
          transition: all var(--transition-fast);
          border: none;
          background: none;
          cursor: pointer;
          position: relative;
        }
        .pp-nav-item:hover {
          background: var(--pp-bg-subtle);
          color: var(--pp-text-primary);
        }
        .pp-nav-item--active {
          background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
          color: var(--pp-primary-dark);
          font-weight: 600;
        }
        .pp-nav-item--active .pp-nav-icon { color: var(--pp-primary); }
        .pp-nav-icon { flex-shrink: 0; transition: color var(--transition-fast); }
        .pp-nav-item > span { flex: 1; }
        .pp-nav-chevron { opacity: 0; transition: opacity var(--transition-fast); }
        .pp-nav-item--active .pp-nav-chevron,
        .pp-nav-item:hover .pp-nav-chevron { opacity: 1; }

        /* Logout */
        .pp-sidebar-logout {
          margin-top: 0.5rem;
          padding: 0.625rem 0.875rem;
          border-radius: var(--radius-xl);
          font-size: 0.875rem;
          color: var(--pp-danger);
          display: flex;
          align-items: center;
          gap: 0.625rem;
          width: 100%;
          justify-content: flex-start;
        }
        .pp-sidebar-logout:hover { background: var(--pp-danger-bg); }

        /* ── Main content ──────────────────────────────── */
        .pp-layout-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          min-height: 100vh;
        }

        .pp-layout-content {
          flex: 1;
          padding: 2rem 2.5rem;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .pp-layout-content { padding: 1rem; }
        }

        /* ── Mobile top bar ────────────────────────────── */
        .pp-mobile-topbar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--pp-border);
          position: sticky;
          top: 0;
          z-index: var(--z-raised);
          box-shadow: var(--shadow-sm);
        }
        .pp-mobile-topbar-brand {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          flex: 1;
          font-size: 1rem;
          font-weight: 700;
          color: var(--pp-text-primary);
        }

        /* ── Mobile overlay + drawer ───────────────────── */
        .pp-mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.45);
          backdrop-filter: blur(3px);
          z-index: calc(var(--z-sidebar) - 1);
        }
        .pp-mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          height: 100dvh;
          width: 280px;
          z-index: var(--z-sidebar);
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }
        .pp-mobile-drawer--open { transform: translateX(0); }
      `}</style>
    </div>
  );
}
