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
            background: 'var(--bg-page, #f8fafc)',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            color: '#0f172a'
        }}>
            {/* Minimal Clean Sidebar */}
            <aside style={{
                width: '260px',
                flexShrink: 0,
                background: '#ffffff',
                borderRight: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem 1rem',
                boxSizing: 'border-box',
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflowY: 'auto'
            }}>
                <div>
                    {/* Brand / Logo */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        padding: '0.25rem 0.5rem 1.25rem',
                        borderBottom: '1px solid #f1f5f9',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '8px',
                            background: '#0284c7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            flexShrink: 0
                        }}>
                            <Stethoscope size={18} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', lineHeight: 1.1 }}>
                                Veyora <span style={{ color: '#0284c7' }}>Clinical</span>
                            </div>
                            <div style={{ fontSize: '0.7rem', fontWeight: '500', color: '#64748b', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: '0.15rem' }}>
                                Doctor Workspace
                            </div>
                        </div>
                    </div>

                    {/* Profile Persona Card */}
                    <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: '#e0f2fe',
                                color: '#0369a1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.825rem',
                                fontWeight: '700',
                                flexShrink: 0
                            }}>
                                <User size={16} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#0f172a', lineHeight: 1.2 }}>
                                    Dr. Anil Mehta
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#0284c7', fontWeight: '500' }}>
                                    General Medicine
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.7rem',
                            color: '#166534',
                            fontWeight: '600',
                            background: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '9999px'
                        }}>
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#16a34a' }}></span>
                            <span>On Duty</span>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
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
                                        padding: '0.55rem 0.75rem',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontSize: '0.85rem',
                                        fontWeight: active ? '600' : '500',
                                        color: active ? '#0284c7' : '#475569',
                                        background: active ? '#f0f9ff' : 'transparent',
                                        borderLeft: active ? '3px solid #0284c7' : '3px solid transparent',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                        <IconComponent size={16} color={active ? '#0284c7' : '#64748b'} />
                                        <span>{item.label}</span>
                                    </div>
                                    {active && <ChevronRight size={14} color="#0284c7" />}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                <div>
                    {/* Current Patient Context Card */}
                    <div style={{
                        marginBottom: '0.75rem',
                        padding: '0.75rem 0.85rem',
                        background: '#f8fafc',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Active Patient
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: '600', color: '#0f172a', marginTop: '0.2rem' }}>
                            {activePatient.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: '600', marginTop: '0.1rem' }}>
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
                            gap: '0.5rem',
                            padding: '0.55rem 0.75rem',
                            borderRadius: '8px',
                            border: '1px solid transparent',
                            background: 'transparent',
                            color: '#dc2626',
                            fontSize: '0.825rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <LogOut size={16} color="#dc2626" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Page Content Canvas */}
            <main style={{ flex: 1, padding: '1.75rem 2.25rem', overflowY: 'auto', minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
                {/* Clean Top Status Strip */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    maxWidth: '1040px',
                    margin: '0 auto 1.5rem auto'
                }}>
                    <div style={{ fontSize: '0.825rem', color: '#64748b', fontWeight: '500' }}>
                        Doctor Workspace · Primary Health Centre
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        color: '#334155',
                        fontWeight: '600',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }}></span>
                        <span>Clinical Station Online</span>
                    </div>
                </div>

                {children ? children : <Outlet />}
            </main>
        </div>
    );
}
