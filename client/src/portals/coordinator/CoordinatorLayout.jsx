import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import {
  Activity,
  BellRing,
  Car,
  Pill,
  ClipboardList,
  AlertOctagon,
  ShieldCheck,
  Sparkles,
  Heart,
  User,
  Bell,
  ChevronRight,
  LogOut
} from 'lucide-react';

export default function CoordinatorLayout() {
  const location = useLocation();
  const [activeEscalationCount, setActiveEscalationCount] = useState(4);
  const [selectedLang, setSelectedLang] = useState('EN');

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
      to: '/coordinator',
      label: 'Operations Overview',
      icon: Activity,
      end: true,
      badge: activeEscalationCount > 0 ? activeEscalationCount : null,
    },
    {
      to: '/coordinator/reminders',
      label: '30-Min Reminder Queue',
      icon: BellRing,
    },
    {
      to: '/coordinator/transport',
      label: 'Transport Barriers',
      icon: Car,
    },
    {
      to: '/coordinator/medication',
      label: 'Medication Adherence',
      icon: Pill,
    },
    {
      to: '/coordinator/followups',
      label: 'Follow-up Tracking',
      icon: ClipboardList,
    },
    {
      to: '/coordinator/escalations',
      label: 'Escalations & Tasks',
      icon: AlertOctagon,
    },
    {
      to: '/coordinator/audit',
      label: 'Rules & Audit Log',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col md:flex-row">
      {/* Left Sidebar (Matching Screenshot: Rounded geometry, soft card, clean icons) */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-100 flex flex-col justify-between p-5 md:min-h-screen md:sticky md:top-0 md:h-screen z-30 shadow-xs overflow-y-auto">
        <div className="space-y-5">
          {/* Top Brand Logo */}
          <div className="flex items-center gap-3 px-1 pt-1">
            <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xs">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="font-bold text-lg text-slate-900 tracking-tight leading-none">
                Veyora
              </div>
              <div className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase mt-1">
                HEALTHCARE
              </div>
            </div>
          </div>

          {/* User Profile / Portal Card */}
          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900 leading-tight">Coordinator</div>
                <div className="text-[11px] text-blue-600 font-medium">VeyoraAI Portal</div>
              </div>
            </div>
            <button
              title="Notifications"
              className="relative p-1.5 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-white/80 transition-colors"
            >
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#d97706]"></span>
            </button>
          </div>

          {/* Language Switcher & VeyoraAI Status Badge */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1 bg-slate-100/80 p-0.5 rounded-full border border-slate-200/60 text-xs font-semibold">
              <button
                onClick={() => setSelectedLang('EN')}
                className={`px-3 py-1 rounded-full transition-all ${
                  selectedLang === 'EN'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setSelectedLang('HI')}
                className={`px-3 py-1 rounded-full transition-all ${
                  selectedLang === 'HI'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हि
              </button>
            </div>

            {/* Changed from SwasthyaSetu Node to VeyoraAI */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-800 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse"></span>
              VeyoraAI
            </span>
          </div>

          {/* Vertical Navigation Links (Matching Screenshot Active Pill + Chevron) */}
          <nav className="space-y-1.5 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-bold shadow-xs border border-blue-100/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/90'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.badge && !isActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d97706] text-white">
                            {item.badge}
                          </span>
                        )}
                        {isActive ? (
                          <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        ) : null}
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sign Out Link (Matching Screenshot) */}
        <div className="pt-4 border-t border-slate-100 mt-6">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50/80 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Page Content (Theme matching picture: Clean, spacious, rounded-3xl cards) */}
      <main className="flex-1 min-w-0 bg-[#f8fafc] min-h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
