import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    QrCode, 
    FileText, 
    Stethoscope, 
    Pill, 
    CalendarCheck, 
    Lock, 
    Bell, 
    ShieldCheck, 
    AlertCircle, 
    User, 
    Clock, 
    ChevronRight,
    Activity
} from 'lucide-react';

/**
 * DoctorLayout Component (Nordic Wellness Glass Theme)
 * Unified Clinician Layout with Frosted Glass Navigation, Active Patient HUD, and Route Outlet.
 */
export default function DoctorLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeEncounterId, setActiveEncounterId] = useState(() => {
        // Retrieve encounter ID from query params or local storage if active
        const params = new URLSearchParams(window.location.search);
        return params.get('encounterId') || localStorage.getItem('activeDoctorEncounterId') || 'enc-101';
    });

    // Navigation items for Doctor clinical workflow
    const navItems = [
        { 
            path: '/doctor', 
            label: 'Patient Queue', 
            icon: LayoutDashboard,
            badge: 'Live'
        },
        { 
            path: '/doctor/scan', 
            label: 'Token & QR Scan', 
            icon: QrCode 
        },
        { 
            path: `/doctor/briefing?encounterId=${activeEncounterId}`, 
            label: 'Clinical Briefing', 
            icon: FileText 
        },
        { 
            path: `/doctor/consultation?encounterId=${activeEncounterId}`, 
            label: 'Consultation Notes', 
            icon: Stethoscope 
        },
        { 
            path: `/doctor/prescription?encounterId=${activeEncounterId}`, 
            label: 'Prescription Builder', 
            icon: Pill 
        },
        { 
            path: `/doctor/plan?encounterId=${activeEncounterId}`, 
            label: 'Plan & Follow-up', 
            icon: CalendarCheck 
        },
        { 
            path: `/doctor/sign-off?encounterId=${activeEncounterId}`, 
            label: 'Sign-Off & Handoff', 
            icon: Lock 
        }
    ];

    const isCurrentPath = (path) => {
        const basePath = path.split('?')[0];
        if (basePath === '/doctor') {
            return location.pathname === '/doctor' || location.pathname === '/doctor/dashboard';
        }
        return location.pathname.startsWith(basePath);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            background: 'linear-gradient(135deg, #f0fdfa 0%, #f1f5f9 50%, #e6f4f1 100%)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#0f172a'
        }}>
            {/* Sidebar Navigation */}
            <aside style={{
                width: '270px',
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRight: '1px solid rgba(20, 184, 166, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem 1rem',
                position: 'sticky',
                top: 0,
                height: '100vh',
                boxSizing: 'border-box',
                boxShadow: '4px 0 24px rgba(15, 118, 110, 0.04)'
            }}>
                <div>
                    {/* Portal Brand */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.5rem 1.5rem 0.5rem', borderBottom: '1px solid rgba(20, 184, 166, 0.15)' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            boxShadow: '0 4px 12px rgba(15, 118, 110, 0.25)'
                        }}>
                            <Activity size={22} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#0f766e' }}>Veyora Clinician</h2>
                            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '500' }}>Primary Health Care Portal</span>
                        </div>
                    </div>

                    {/* Active Patient Session HUD */}
                    <div style={{
                        marginTop: '1.25rem',
                        marginBottom: '1.25rem',
                        background: 'rgba(240, 253, 250, 0.85)',
                        border: '1px solid #ccfbf1',
                        borderRadius: '12px',
                        padding: '0.75rem 0.9rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Active Session</span>
                            <span style={{ fontSize: '0.7rem', background: '#99f6e4', color: '#115e59', padding: '0.1rem 0.45rem', borderRadius: '10px', fontWeight: '600' }}>TKN-8821</span>
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a' }}>Ramesh Kumar (54 M)</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Encounter: {activeEncounterId}</div>
                    </div>

                    {/* Nav Links */}
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
                                        padding: '0.65rem 0.85rem',
                                        borderRadius: '10px',
                                        textDecoration: 'none',
                                        fontSize: '0.85rem',
                                        fontWeight: active ? '700' : '500',
                                        color: active ? '#0f766e' : '#475569',
                                        background: active ? 'rgba(204, 251, 241, 0.65)' : 'transparent',
                                        border: active ? '1px solid rgba(20, 184, 166, 0.3)' : '1px solid transparent',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                                        <IconComponent size={18} color={active ? '#0f766e' : '#64748b'} />
                                        <span>{item.label}</span>
                                    </div>
                                    {item.badge && (
                                        <span style={{
                                            fontSize: '0.65rem',
                                            background: '#0f766e',
                                            color: '#ffffff',
                                            padding: '0.15rem 0.45rem',
                                            borderRadius: '8px',
                                            fontWeight: '700'
                                        }}>
                                            {item.badge}
                                        </span>
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* Doctor Profile Footer */}
                <div style={{
                    borderTop: '1px solid rgba(20, 184, 166, 0.15)',
                    paddingTop: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: '#0f766e',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            fontSize: '0.85rem'
                        }}>
                            DS
                        </div>
                        <div>
                            <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>Dr. Shreyas</div>
                            <div style={{ fontSize: '0.7rem', color: '#0f766e', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                                On Duty (PHC Main)
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {/* Top Header Bar */}
                <header style={{
                    height: '64px',
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(20, 184, 166, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 2rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Clinical Workflow</span>
                        <ChevronRight size={14} color="#94a3b8" />
                        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#0f766e' }}>
                            {location.pathname === '/doctor' || location.pathname === '/doctor/dashboard'
                                ? "Today's Patient Queue"
                                : location.pathname.includes('/scan')
                                ? 'Token Verification'
                                : location.pathname.includes('/briefing')
                                ? 'Clinical Briefing'
                                : location.pathname.includes('/consultation')
                                ? 'Consultation & Notes'
                                : location.pathname.includes('/prescription')
                                ? 'e-Rx Prescription'
                                : location.pathname.includes('/plan')
                                ? 'Follow-Up Plan'
                                : 'Sign-Off & Lock'}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#475569' }}>
                            <Clock size={15} color="#0f766e" />
                            <span>{new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            background: '#ccfbf1',
                            color: '#0f766e',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                        }}>
                            <ShieldCheck size={14} />
                            Encounter Security Locked
                        </div>
                    </div>
                </header>

                {/* Page Body */}
                <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                    {children ? children : <Outlet />}
                </div>
            </main>
        </div>
    );
}
