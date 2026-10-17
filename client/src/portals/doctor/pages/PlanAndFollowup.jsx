import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Calendar, 
    ArrowLeft, 
    Car, 
    Bell, 
    Clock, 
    ArrowRight,
    User,
    CheckCircle2
} from 'lucide-react';
import { recordFollowupPlan, getPatientByToken, getActiveSessionToken } from '../../../api/doctorApi';

/**
 * PlanAndFollowup Component (Clean, Focused & Dynamic Patient Info)
 */
export default function PlanAndFollowup() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const rawToken = params.get('encounterId') || getActiveSessionToken();
    const encounterId = rawToken.includes('/') ? rawToken.split('/').pop() : rawToken;

    const patient = getPatientByToken(encounterId);

    const defaultDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const [followupDate, setFollowupDate] = useState(defaultDate);
    const [selectedDays, setSelectedDays] = useState('5');
    const [instructions, setInstructions] = useState('Review condition progress. If symptoms or discomfort intensify, report immediately to PHC.');
    const [transportAssistance, setTransportAssistance] = useState(false);
    const [adherenceCall, setAdherenceCall] = useState(true);

    const handleQuickPreset = (days) => {
        setSelectedDays(days);
        const newDate = new Date(Date.now() + parseInt(days, 10) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        setFollowupDate(newDate);
    };

    const handleContinue = async () => {
        try {
            await recordFollowupPlan(patient.token, {
                followupDate,
                instructions,
                transportAssistance,
                adherenceCall
            });
        } catch (e) {
            console.error(e);
        }
        navigate(`/doctor/sign-off?encounterId=${patient.token}`);
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 10px 30px rgba(37, 99, 235, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
        padding: '1.75rem',
        marginBottom: '1.5rem'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Top Bar: Back & Patient Badge at Top Right */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button
                    onClick={() => navigate(`/doctor/prescription?encounterId=${patient.token}`)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        fontSize: '0.88rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        padding: 0
                    }}
                >
                    <ArrowLeft size={16} />
                    <span>Back to Prescription</span>
                </button>

                {/* Patient's Name at Top Right */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    background: 'rgba(237, 242, 254, 0.9)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    padding: '0.4rem 0.95rem',
                    borderRadius: '20px',
                    fontSize: '0.84rem',
                    fontWeight: '700',
                    color: '#0f172a',
                    border: '1px solid rgba(191, 219, 254, 0.6)'
                }}>
                    <User size={15} color="#2563eb" />
                    <span>Patient: <strong>{patient.name}</strong> ({patient.age} / {patient.gender === 'Female' ? 'F' : 'M'}) · Token: <strong style={{ color: '#2563eb' }}>{patient.token}</strong></span>
                </div>
            </div>

            <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#edf2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                        <Calendar size={20} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                            Plan & Follow-up Scheduling
                        </h2>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                            Schedule next review date and coordinator support triggers
                        </p>
                    </div>
                </div>

                {/* Follow-up Timeline & Presets */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
                        Recommended Next Follow-up Interval
                    </label>

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                        {[
                            { label: '3 Days (Symptom check)', days: '3' },
                            { label: '5 Days (Standard review)', days: '5' },
                            { label: '1 Week (7 Days)', days: '7' },
                            { label: '2 Weeks (14 Days)', days: '14' },
                            { label: '1 Month (30 Days)', days: '30' }
                        ].map(p => (
                            <button
                                key={p.days}
                                type="button"
                                onClick={() => handleQuickPreset(p.days)}
                                style={{
                                    background: selectedDays === p.days ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'rgba(248, 250, 252, 0.8)',
                                    border: selectedDays === p.days ? 'none' : '1px solid rgba(226, 232, 240, 0.8)',
                                    color: selectedDays === p.days ? '#ffffff' : '#475569',
                                    padding: '0.45rem 0.95rem',
                                    borderRadius: '12px',
                                    fontSize: '0.82rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    boxShadow: selectedDays === p.days ? '0 4px 10px rgba(37, 99, 235, 0.25)' : 'none',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>

                    <input
                        type="date"
                        value={followupDate}
                        onChange={(e) => setFollowupDate(e.target.value)}
                        style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            background: '#f8fafc',
                            fontSize: '0.9rem',
                            color: '#1e293b',
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Patient Instructions */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.45rem' }}>
                        Patient Instructions for Follow-up
                    </label>
                    <textarea
                        rows={3}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.85rem 1rem',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            background: '#f8fafc',
                            fontSize: '0.9rem',
                            color: '#1e293b',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                {/* Coordinator Triggers */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.65rem' }}>
                        Coordinator Support Triggers
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{
                            background: '#f8fafc',
                            border: '1px solid #eef2f6',
                            borderRadius: '12px',
                            padding: '0.85rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.65rem'
                        }}>
                            <input
                                type="checkbox"
                                id="adherenceCall"
                                checked={adherenceCall}
                                onChange={(e) => setAdherenceCall(e.target.checked)}
                                style={{ width: '17px', height: '17px', cursor: 'pointer', accentColor: '#2563eb' }}
                            />
                            <label htmlFor="adherenceCall" style={{ fontSize: '0.86rem', color: '#1e293b', fontWeight: '600', cursor: 'pointer' }}>
                                Schedule Medication Adherence Reminder Calls (30-min window alerts)
                            </label>
                        </div>

                        <div style={{
                            background: '#f8fafc',
                            border: '1px solid #eef2f6',
                            borderRadius: '12px',
                            padding: '0.85rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.65rem'
                        }}>
                            <input
                                type="checkbox"
                                id="transportHelp"
                                checked={transportAssistance}
                                onChange={(e) => setTransportAssistance(e.target.checked)}
                                style={{ width: '17px', height: '17px', cursor: 'pointer', accentColor: '#2563eb' }}
                            />
                            <label htmlFor="transportHelp" style={{ fontSize: '0.86rem', color: '#1e293b', fontWeight: '600', cursor: 'pointer' }}>
                                Flag for Transport Assistance (Patient needs travel support to PHC)
                            </label>
                        </div>
                    </div>
                </div>

                {/* Action CTA */}
                <button
                    onClick={handleContinue}
                    style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '16px',
                        fontWeight: '800',
                        fontSize: '0.96rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
                        transition: 'all 0.15s ease'
                    }}
                >
                    Continue to Sign Off & Handoff →
                </button>
            </div>
        </div>
    );
}
