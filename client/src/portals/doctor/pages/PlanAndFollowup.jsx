import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Calendar, 
    ArrowLeft, 
    Car, 
    Bell, 
    Clock, 
    ArrowRight 
} from 'lucide-react';
import { recordFollowupPlan } from '../../../api/doctorApi';

/**
 * PlanAndFollowup Component (Aura HealthTech Theme)
 * Follow-up schedule & coordinator task triggers with crisp white theme.
 */
export default function PlanAndFollowup() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const encounterId = params.get('encounterId') || 'P-001';

    const defaultDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const [followupDate, setFollowupDate] = useState(defaultDate);
    const [instructions, setInstructions] = useState('Review fever chart. If body aches or cough intensify, report immediately to PHC.');
    const [transportAssistance, setTransportAssistance] = useState(false);
    const [adherenceCall, setAdherenceCall] = useState(true);

    const handleContinue = async () => {
        try {
            await recordFollowupPlan(encounterId, {
                followupDate,
                instructions,
                transportAssistance,
                adherenceCall
            });
        } catch (e) {
            console.error(e);
        }
        navigate(`/doctor/sign-off?encounterId=${encounterId}`);
    };

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #eef2f6',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
        padding: '1.75rem',
        marginBottom: '1.5rem'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <button
                onClick={() => navigate(`/doctor/prescription?encounterId=${encounterId}`)}
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
                    marginBottom: '1rem',
                    padding: 0
                }}
            >
                <ArrowLeft size={16} />
                <span>Back to Prescription</span>
            </button>

            <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e6f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
                        <Calendar size={20} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>
                            Plan & Follow-up Scheduling
                        </h2>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                            Encounter: {encounterId} · Patient 1 (42 / M)
                        </p>
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                        Recommended Next Follow-up Date
                    </label>
                    <input
                        type="date"
                        value={followupDate}
                        onChange={(e) => setFollowupDate(e.target.value)}
                        style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            border: '1px solid #e2e8f0',
                            background: '#f8fafc',
                            fontSize: '0.9rem',
                            color: '#1e293b',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                        Patient Instructions for Follow-up
                    </label>
                    <textarea
                        rows={3}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.85rem 1rem',
                            borderRadius: '10px',
                            border: '1px solid #e2e8f0',
                            background: '#f8fafc',
                            fontSize: '0.9rem',
                            color: '#1e293b',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                {/* Coordinator tasks */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.65rem' }}>
                        Coordinator Support Triggers
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: '#334155', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={adherenceCall}
                                onChange={(e) => setAdherenceCall(e.target.checked)}
                            />
                            <span>Schedule Medication Adherence Reminder Calls</span>
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: '#334155', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={transportAssistance}
                                onChange={(e) => setTransportAssistance(e.target.checked)}
                            />
                            <span>Flag for Transport Assistance (Patient needs transit coordination)</span>
                        </label>
                    </div>
                </div>

                <button
                    onClick={handleContinue}
                    style={{
                        width: '100%',
                        background: '#044e42',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.9rem',
                        borderRadius: '12px',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}
                >
                    Continue to Sign Off & Handoff →
                </button>
            </div>
        </div>
    );
}
