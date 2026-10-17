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
            background: '#f1f5f9',
            fontFamily: "'Outfit', 'DM Sans', system-ui, -apple-system, sans-serif",
            color: '#0f172a'
        }}>
            {/* Clean Full-Height Light Sidebar (Matching Veyora Design System) */}
            <aside style={{
                width: '260px',
                flexShrink: 0,
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRight: '1px solid rgba(148, 163, 184, 0.25)',
                boxShadow: '2px 0 20px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem 0.875rem',
                boxSizing: 'border-box',
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflowY: 'auto'
            }}>
                <div>
                    {/* Brand / Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.5rem 0.5rem 1.25rem', borderBottom: '1px solid rgba(148, 163, 184, 0.25)', marginBottom: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)',
                            flexShrink: 0
                        }}>
                            <Heart size={20} fill="#ffffff" />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.125rem', fontWeight: '800', color: '#0f172a', lineHeight: 1.1 }}>
                                Veyora
                            </div>
                            <div style={{ fontSize: '0.7rem', fontWeight: '500', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.1rem' }}>
                                Healthcare
                            </div>
                        </div>
                    </div>

                    {/* Profile Persona Pill Card */}
                    <div style={{
                        background: '#e0e7ff',
                        borderRadius: '20px',
                        padding: '0.75rem 0.65rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.75rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.9rem',
                                fontWeight: '700',
                                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                                flexShrink: 0
                            }}>
                                <User size={18} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a', lineHeight: 1.2 }}>
                                    Doctor
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#2563eb', fontWeight: '500' }}>
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

                    {/* Navigation Items */}
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
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
                                        padding: '0.7rem 0.875rem',
                                        borderRadius: '20px',
                                        textDecoration: 'none',
                                        fontSize: '0.875rem',
                                        fontWeight: active ? '600' : '500',
                                        color: active ? '#2563eb' : '#475569',
                                        background: active ? 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)' : 'transparent',
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
                    {/* Current Patient Context Card */}
                    <div style={{
                        marginBottom: '0.75rem',
                        padding: '0.75rem 0.875rem',
                        background: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid rgba(148, 163, 184, 0.25)',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                    }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Current Patient
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginTop: '0.2rem' }}>
                            {activePatient.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: '600', marginTop: '0.1rem' }}>
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
                            gap: '0.625rem',
                            padding: '0.625rem 0.875rem',
                            borderRadius: '20px',
                            border: 'none',
                            background: 'transparent',
                            color: '#ef4444',
                            fontSize: '0.875rem',
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
            <main style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto', minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
                {/* Clean Top Status Strip */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    maxWidth: '1000px',
                    margin: '0 auto 1.5rem auto'
                }}>
                    <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>
                        Veyora Healthcare · Clinical Portal
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#ffffff',
                        border: '1px solid rgba(148, 163, 184, 0.25)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        color: '#334155',
                        fontWeight: '600',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                    }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
                        <span>Clinical Station Active</span>
                    </div>
                </div>

                {children ? children : <Outlet />}
            </main>
        </div>
    );
}
