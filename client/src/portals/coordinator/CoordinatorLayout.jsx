import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Activity,
  BellRing,
  Car,
  Pill,
  ClipboardList,
  AlertOctagon,
  ShieldCheck,
  Sparkles,
  Search,
  Bell,
  ChevronDown,
  LogOut
} from 'lucide-react';

/**
 * CoordinatorLayout Component (Aura HealthTech Theme - Matches Doctor Portal)
 * Clean, structured clinical focus with crisp white cards,
 * soft mint accents (#e6f7f2), and deep pine teal (#044e42) navigation.
 */
export default function CoordinatorLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeEscalationCount, setActiveEscalationCount] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');

  // Read active escalation count from localStorage
  useEffect(() => {
    const updateCountFromStorage = () => {
      try {
        const stored = localStorage.getItem('veyora_coordinator_tasks');
        if (stored) {
          const parsed = JSON.parse(stored);
          const active = parsed.filter((t) => t.status === 'Active' || t.status === 'Open').length;
          setActiveEscalationCount(active);
        }
      } catch (e) {
        // Fallback default
      }
    };



    updateCountFromStorage();
    window.addEventListener('storage', updateCountFromStorage);
    window.addEventListener('veyora_tasks_updated', updateCountFromStorage);

    return () => {
      window.removeEventListener('storage', updateCountFromStorage);
      window.removeEventListener('veyora_tasks_updated', updateCountFromStorage);
    };
  }, []);

  const navItems = [
    {
      path: '/coordinator/operations',
      label: 'Operations Overview',
      icon: Activity,
      exact: true,
    },
    {
      path: '/coordinator/reminders',
      label: '30-Min Reminder Queue',
      icon: BellRing,
    },
    {
      path: '/coordinator/transport',
      label: 'Transport Barriers',
      icon: Car,
    },
    {
      path: '/coordinator/medication',
      label: 'Medication Adherence',
      icon: Pill,
    },
    {
      path: '/coordinator/followups',
      label: 'Follow-up Tracking',
      icon: ClipboardList,
    },
    {
      path: '/coordinator/escalations',
      label: 'Escalations & Tasks',
      icon: AlertOctagon,
      badge: activeEscalationCount > 0 ? activeEscalationCount : null,
    },
    {
      path: '/coordinator/audit',
      label: 'Rules & Audit Log',
      icon: ShieldCheck,
    },
  ];

  const isCurrentPath = (path) => {
    if (path === '/coordinator/operations') {
      return location.pathname === '/coordinator' || location.pathname === '/coordinator/operations';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#f4f8f6',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: '#1e293b',
      }}
    >
      {/* Top Global Bar (Matches Doctor Portal) */}
      <header
        style={{
          height: '70px',
          background: '#ffffff',
          borderBottom: '1px solid #eef2f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        {/* Brand & Portal Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#044e42',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <Sparkles size={22} />
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: '800',
                color: '#0f172a',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              AI Coordinator Portal
            </h1>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
              Autonomous Care Orchestration & Triage
            </p>
          </div>
        </div>

        {/* Global Search & Coordinator Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Global search */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '24px',
              padding: '0.5rem 1rem',
              width: '260px',
            }}
          >
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search patients, alerts, tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '0.84rem',
                color: '#1e293b',
                width: '100%',
              }}
            />
          </div>

          {/* VeyoraAI Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#e6f7f2',
              border: '1px solid #cceee5',
              padding: '0.35rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: '700',
              color: '#044e42',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 6px rgba(16, 185, 129, 0.6)',
              }}
            />
            VeyoraAI Node Online
          </div>

          {/* Bell notification */}
          <button
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
              position: 'relative',
            }}
          >
            <Bell size={18} />
            <span
              style={{
                position: 'absolute',
                top: '7px',
                right: '8px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#ef4444',
              }}
            />
          </button>

          {/* User Info Card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: '#ffffff',
              padding: '0.35rem 0.65rem',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#044e42',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '0.85rem',
              }}
            >
              AC
            </div>
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: '700', color: '#0f172a' }}>
                AI Coordinator
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Operations Lead</div>
            </div>
            <ChevronDown size={14} color="#94a3b8" style={{ marginLeft: '4px' }} />
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Clean Light Sidebar (Matches Doctor Portal) */}
        <aside
          style={{
            width: '250px',
            background: '#ffffff',
            borderRight: '1px solid #eef2f6',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.5rem 0.85rem',
            boxSizing: 'border-box',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navItems.map((item) => {
              const active = isCurrentPath(item.path);
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: active ? '700' : '500',
                    color: active ? '#044e42' : '#475569',
                    background: active ? '#e6f7f2' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <IconComponent size={18} color={active ? '#044e42' : '#64748b'} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        background: active ? '#044e42' : '#fee2e2',
                        color: active ? '#ffffff' : '#dc2626',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Logout */}
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 0.85rem',
              borderRadius: '10px',
              border: 'none',
              background: 'transparent',
              color: '#64748b',
              fontSize: '0.88rem',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            <LogOut size={18} />
            <span>Return to Home</span>
          </button>
        </aside>

        {/* Page Content Canvas */}
        <main
          style={{
            flex: 1,
            padding: '2rem',
            overflowY: 'auto',
            background: '#f4f8f6',
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {children ? children : <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}
