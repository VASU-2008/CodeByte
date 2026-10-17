import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    QrCode, 
    FileText, 
    Stethoscope, 
    Pill, 
    CalendarCheck, 
    Lock, 
    LogOut,
    ChevronDown,
    Search,
    Bell
} from 'lucide-react';

/**
 * DoctorLayout Component (Aura HealthTech Theme)
 * Clean, structured & clinical focus with bright crisp white cards,
 * soft mint accents, and deep pine teal buttons.
 */
export default function DoctorLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeEncounterId, setActiveEncounterId] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('encounterId') || localStorage.getItem('activeDoctorEncounterId') || 'P-001';
    });

    const navItems = [
        { path: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/doctor/queue', label: 'Patient Queue', icon: Users },
        { path: '/doctor/scan', label: 'Token Lookup', icon: QrCode },
        { path: `/doctor/briefing?encounterId=${activeEncounterId}`, label: 'Clinical Briefing', icon: FileText },
        { path: `/doctor/consultation?encounterId=${activeEncounterId}`, label: 'Consultation Notes', icon: Stethoscope },
        { path: `/doctor/prescription?encounterId=${activeEncounterId}`, label: 'Prescription', icon: Pill },
        { path: `/doctor/plan?encounterId=${activeEncounterId}`, label: 'Plan & Follow-up', icon: CalendarCheck },
        { path: `/doctor/sign-off?encounterId=${activeEncounterId}`, label: 'Sign Off & Handoff', icon: Lock }
    ];

    const isCurrentPath = (path) => {
        const basePath = path.split('?')[0];
        if (basePath === '/doctor/dashboard' || basePath === '/doctor/queue') {
            return location.pathname === '/doctor' || location.pathname === '/doctor/dashboard' || location.pathname === '/doctor/queue';
        }
        return location.pathname.startsWith(basePath);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#f4f8f6',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            color: '#1e293b'
        }}>
            {/* Top Global Bar */}
            <header style={{
                height: '70px',
                background: '#ffffff',
                borderBottom: '1px solid #eef2f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                position: 'sticky',
                top: 0,
                zIndex: 40
            }}>
                {/* Brand / Portal Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: '#044e42',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                    }}>
                        <Stethoscope size={22} />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>
                            Doctor Portal
                        </h1>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                            Clinical Insights. Better Care.
                        </p>
                    </div>
                </div>

                {/* Search & Doctor Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    {/* Global search */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '24px',
                        padding: '0.5rem 1rem',
                        width: '260px'
                    }}>
                        <Search size={16} color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Search patients, tasks, or anything..."
                            style={{
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                fontSize: '0.84rem',
                                color: '#1e293b',
                                width: '100%'
                            }}
                        />
                    </div>

                    {/* Bell notification */}
                    <button style={{
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
                        position: 'relative'
                    }}>
                        <Bell size={18} />
                        <span style={{ position: 'absolute', top: '7px', right: '8px', width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444' }}></span>
                    </button>

                    {/* Doctor Info Card */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        background: '#ffffff',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '12px',
                        cursor: 'pointer'
                    }}>
                        <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            background: '#044e42',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            fontSize: '0.85rem'
                        }}>
                            D1
                        </div>
                        <div>
                            <div style={{ fontSize: '0.86rem', fontWeight: '700', color: '#0f172a' }}>Doctor 1</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>General Physician</div>
                        </div>
                        <ChevronDown size={14} color="#94a3b8" style={{ marginLeft: '4px' }} />
                    </div>
                </div>
            </header>

            {/* Main Layout Container */}
            <div style={{ display: 'flex', flex: 1 }}>
                {/* Clean Light Sidebar */}
                <aside style={{
                    width: '240px',
                    background: '#ffffff',
                    borderRight: '1px solid #eef2f6',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.5rem 0.85rem',
                    boxSizing: 'border-box'
                }}>
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
                                        gap: '0.75rem',
                                        padding: '0.65rem 0.85rem',
                                        borderRadius: '10px',
                                        textDecoration: 'none',
                                        fontSize: '0.88rem',
                                        fontWeight: active ? '700' : '500',
                                        color: active ? '#044e42' : '#475569',
                                        background: active ? '#e6f7f2' : 'transparent',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    <IconComponent size={18} color={active ? '#044e42' : '#64748b'} />
                                    <span>{item.label}</span>
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
                            cursor: 'pointer'
                        }}
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </aside>

                {/* Page Content Canvas */}
                <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                    {children ? children : <Outlet />}
                </main>
            </div>
        </div>
    );
}
