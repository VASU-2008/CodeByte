import React, { useEffect } from 'react';
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
    ChevronRight,
    Bell,
    User,
    Heart
} from 'lucide-react';
import { getPatientByToken, getActiveSessionToken } from '../../api/doctorApi';

/**
 * DoctorLayout Component (Veyora Blue Theme)
 * Matching the exact Veyora design system:
 * - Soft #f5f7fb background
 * - Pure white #ffffff cards with smooth 20px-24px corners
 * - Vibrant Royal Blue #2563eb primary accents & buttons
 * - Soft periwinkle #edf2fe active pills with blue chevron indicators
 */
export default function DoctorLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Dynamically resolve active encounter ID from URL query params or active session token
    const params = new URLSearchParams(location.search);
    const encounterFromUrl = params.get('encounterId');
    const activeEncounterId = encounterFromUrl || getActiveSessionToken();

    useEffect(() => {
        if (encounterFromUrl) {
            localStorage.setItem('activeDoctorEncounterId', encounterFromUrl);
        }
    }, [encounterFromUrl]);

    const activePatient = getPatientByToken(activeEncounterId);

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
        if (basePath === '/doctor/dashboard') {
            return location.pathname === '/doctor' || location.pathname === '/doctor/dashboard';
        }
        if (basePath === '/doctor/queue') {
            return location.pathname === '/doctor/queue';
        }
        return location.pathname.startsWith(basePath);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#f5f7fb',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            color: '#0f172a'
        }}>
            {/* Top Global Bar */}
            <header style={{
                height: '70px',
                background: '#ffffff',
                borderBottom: '1px solid #f1f5f9',
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
                        borderRadius: '14px',
                        background: '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
                    }}>
                        <Heart size={22} fill="#ffffff" />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>
                                Veyora
                            </span>
                            <span style={{
                                fontSize: '0.72rem',
                                background: '#edf2fe',
                                color: '#2563eb',
                                padding: '0.15rem 0.55rem',
                                borderRadius: '8px',
                                fontWeight: '700'
                            }}>
                                Doctor Portal
                            </span>
                        </div>
                        <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            Healthcare
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '20px',
                        fontSize: '0.82rem',
                        color: '#475569',
                        fontWeight: '600'
                    }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                        <span>Clinical Station Active</span>
                    </div>
                </div>
            </header>

            {/* Main Layout Container */}
            <div style={{ display: 'flex', flex: 1 }}>
                {/* Clean Light Sidebar */}
                <aside style={{
                    width: '260px',
                    background: '#ffffff',
                    borderRight: '1px solid #f1f5f9',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.5rem 1rem',
                    boxSizing: 'border-box'
                }}>
                    <div>
                        {/* Profile Persona Pill Card (matching the image) */}
                        <div style={{
                            background: '#edf2fe',
                            borderRadius: '16px',
                            padding: '0.75rem 0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.85rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '50%',
                                    background: '#2563eb',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.95rem',
                                    fontWeight: '800'
                                }}>
                                    <User size={18} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0f172a' }}>
                                        Doctor
                                    </div>
                                    <div style={{ fontSize: '0.74rem', color: '#2563eb', fontWeight: '600' }}>
                                        Doctor Portal
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#64748b',
                                cursor: 'pointer'
                            }}>
                                <Bell size={16} />
                            </div>
                        </div>

                        {/* Language Selector Pill (matching the image) */}
                        <div style={{
                            display: 'inline-flex',
                            background: '#f1f5f9',
                            borderRadius: '20px',
                            padding: '0.2rem',
                            gap: '0.2rem',
                            marginBottom: '1.25rem'
                        }}>
                            <span style={{
                                background: '#2563eb',
                                color: '#ffffff',
                                borderRadius: '16px',
                                padding: '0.15rem 0.65rem',
                                fontSize: '0.74rem',
                                fontWeight: '700'
                            }}>
                                EN
                            </span>
                            <span style={{
                                color: '#64748b',
                                padding: '0.15rem 0.65rem',
                                fontSize: '0.74rem',
                                fontWeight: '600'
                            }}>
                                हि
                            </span>
                        </div>

                        {/* Navigation Items */}
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
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
                                            padding: '0.7rem 0.95rem',
                                            borderRadius: '14px',
                                            textDecoration: 'none',
                                            fontSize: '0.88rem',
                                            fontWeight: active ? '700' : '500',
                                            color: active ? '#2563eb' : '#475569',
                                            background: active ? '#edf2fe' : 'transparent',
                                            transition: 'all 0.15s ease'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <IconComponent size={18} color={active ? '#2563eb' : '#64748b'} />
                                            <span>{item.label}</span>
                                        </div>
                                        {active && <ChevronRight size={16} color="#2563eb" />}
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>

                    <div>
                        {/* Current Patient Context Pill */}
                        <div style={{
                            marginBottom: '1rem',
                            padding: '0.75rem 0.95rem',
                            background: '#f8fafd',
                            borderRadius: '14px',
                            border: '1px solid #e2e8f0'
                        }}>
                            <div style={{ fontSize: '0.68rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Current Patient
                            </div>
                            <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0f172a', marginTop: '0.2rem' }}>
                                {activePatient.name}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#2563eb', fontWeight: '700', marginTop: '0.1rem' }}>
                                Token: {activePatient.token}
                            </div>
                        </div>

                        {/* Bottom Logout */}
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.65rem 0.95rem',
                                borderRadius: '12px',
                                border: 'none',
                                background: 'transparent',
                                color: '#ef4444',
                                fontSize: '0.88rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            <LogOut size={18} color="#ef4444" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </aside>

                {/* Page Content Canvas */}
                <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                    {children ? children : <Outlet />}
                </main>
            </div>
        </div>
    );
}
