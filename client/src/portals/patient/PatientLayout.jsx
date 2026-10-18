import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Home, Stethoscope, QrCode, Clock, FileText, RefreshCw,
  Pill, LogOut, Menu, X, ChevronRight, Bell, User, Heart, Sparkles
} from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';

const NAV_ITEMS = [
  { to: '/patient',                 label: 'Home',                labelHi: 'होम',                   icon: Home,        end: true },
  { to: '/patient/ai-coordinator',  label: 'AI Care Coordinator', labelHi: 'एआई केयर समन्वयक',     icon: Sparkles              },
  { to: '/patient/intake',          label: 'Start Consultation',  labelHi: 'परामर्श शुरू करें',     icon: Stethoscope           },
  { to: '/patient/qr-pass',        label: 'My QR Pass',          labelHi: 'मेरा QR पास',            icon: QrCode                },
  { to: '/patient/history',        label: 'Visit History',       labelHi: 'यात्रा इतिहास',          icon: Clock                 },
  { to: '/patient/results',        label: 'Visit Results',       labelHi: 'यात्रा परिणाम',          icon: FileText              },
  { to: '/patient/followup',       label: 'Follow-up Journey',   labelHi: 'फॉलो-अप यात्रा',        icon: RefreshCw             },
  { to: '/patient/medicines',      label: 'Medicines',           labelHi: 'दवाइयाँ',                icon: Pill                  },
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
          <Heart size={18} fill="#ffffff" />
        </div>
        <div>
          <div className="pp-sidebar-brand-name">Veyora <span style={{ color: '#0284c7' }}>Care</span></div>
          <div className="pp-sidebar-brand-sub">{isHindi ? 'रोगी पोर्टल' : 'Patient Workspace'}</div>
        </div>
      </div>

      {/* Patient profile strip */}
      <div className="pp-sidebar-profile">
        <div className="pp-sidebar-avatar">
          {user?.name ? user.name[0].toUpperCase() : <User size={16} />}
        </div>
        <div className="pp-sidebar-profile-info">
          <div className="pp-sidebar-profile-name">{user?.name || (isHindi ? 'रोगी' : 'Patient')}</div>
          <div className="pp-sidebar-profile-role">{isHindi ? 'सत्यापित मरीज' : 'Verified Patient'}</div>
        </div>
        <button className="pp-sidebar-notif pp-btn pp-btn-ghost pp-btn-sm" aria-label="Notifications">
          <Bell size={15} color="#64748b" />
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
            <Icon size={16} className="pp-nav-icon" />
            <span>{label(en, labelHi)}</span>
            <ChevronRight size={14} className="pp-nav-chevron" />
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button className="pp-sidebar-logout pp-btn pp-btn-ghost" onClick={handleLogout}>
        <LogOut size={15} color="#dc2626" />
        <span>{isHindi ? 'लॉगआउट' : 'Sign Out'}</span>
      </button>
    </aside>
  );

  return (
    <div className="pp-layout" style={{ background: 'var(--bg-page, #f8fafc)', fontFamily: "'Inter', system-ui, sans-serif" }}>
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
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="pp-mobile-topbar-brand">
            <Heart size={16} style={{ color: '#0284c7' }} fill="#0284c7" />
            <span>Veyora Care</span>
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
          z-index: var(--z-sidebar, 40);
        }

        .pp-sidebar {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1.25rem 1rem;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          gap: 0;
        }

        /* Brand */
        .pp-sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.25rem 0.5rem 1.25rem;
          border-bottom: 1px solid #f1f5f9;
          margin-bottom: 1rem;
        }
        .pp-sidebar-logo {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #0284c7;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }
        .pp-sidebar-brand-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.1;
        }
        .pp-sidebar-brand-sub {
          font-size: 0.7rem;
          color: #64748b;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-top: 0.15rem;
        }

        /* Profile */
        .pp-sidebar-profile {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.65rem 0.75rem;
          border-radius: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          margin-bottom: 0.75rem;
        }
        .pp-sidebar-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e0f2fe;
          color: #0369a1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
        }
        .pp-sidebar-profile-info { flex: 1; min-width: 0; }
        .pp-sidebar-profile-name {
          font-weight: 600;
          font-size: 0.85rem;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pp-sidebar-profile-role {
          font-size: 0.7rem;
          color: #0284c7;
          font-weight: 500;
        }
        .pp-sidebar-notif { padding: 0.25rem; background: none; border: none; cursor: pointer; }

        /* Language selector area */
        .pp-sidebar-lang { padding: 0 0 0.75rem; }

        /* Nav */
        .pp-sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          overflow-y: auto;
          padding-right: 2px;
        }
        .pp-nav-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.55rem 0.75rem;
          border-radius: 6px;
          font-size: 0.825rem;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          transition: all 0.15s ease;
          border-left: 3px solid transparent;
        }
        .pp-nav-item:hover {
          background: #f8fafc;
          color: #0f172a;
        }
        .pp-nav-item--active {
          background: #f0f9ff;
          color: #0284c7;
          font-weight: 600;
          border-left: 3px solid #0284c7;
        }
        .pp-nav-item--active .pp-nav-icon { color: #0284c7; }
        .pp-nav-icon { flex-shrink: 0; }
        .pp-nav-item > span { flex: 1; }
        .pp-nav-chevron { opacity: 0; transition: opacity 0.15s ease; color: #0284c7; }
        .pp-nav-item--active .pp-nav-chevron,
        .pp-nav-item:hover .pp-nav-chevron { opacity: 1; }

        /* Logout */
        .pp-sidebar-logout {
          margin-top: 0.5rem;
          padding: 0.55rem 0.75rem;
          border-radius: 6px;
          font-size: 0.825rem;
          color: #dc2626;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          justify-content: flex-start;
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.15s ease;
        }
        .pp-sidebar-logout:hover { background: #fee2e2; }

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
          padding: 1.75rem 2.25rem;
          max-width: 1040px;
          width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .pp-layout-content { padding: 1rem; }
        }

        /* ── Mobile top bar ────────────────────────────── */
        .pp-mobile-topbar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .pp-mobile-topbar-brand {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          flex: 1;
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f172a;
        }

        /* ── Mobile overlay + drawer ───────────────────── */
        .pp-mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.45);
          backdrop-filter: blur(3px);
          z-index: 39;
        }
        .pp-mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          height: 100dvh;
          width: 260px;
          z-index: 40;
          transform: translateX(-100%);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
          background: #ffffff;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .pp-mobile-drawer--open { transform: translateX(0); }
      `}</style>
    </div>
  );
}
