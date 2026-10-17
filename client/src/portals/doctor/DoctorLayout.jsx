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
    LogOut
} from 'lucide-react';
import { getPatientByToken, getActiveSessionToken } from '../../api/doctorApi';

/**
 * DoctorLayout Component (Aura HealthTech Theme)
 * Clean, structured & clinical focus with bright crisp white cards,
 * soft mint accents, and deep pine teal buttons.
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

                    {/* Current Patient Context Pill */}
                    <div style={{
                        marginTop: 'auto',
                        marginBottom: '1rem',
                        padding: '0.75rem 0.85rem',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Current Patient
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0f172a', marginTop: '0.2rem' }}>
                            {activePatient.name}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#044e42', fontWeight: '600', marginTop: '0.1rem' }}>
                            Token: {activePatient.token}
                        </div>
                    </div>

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
