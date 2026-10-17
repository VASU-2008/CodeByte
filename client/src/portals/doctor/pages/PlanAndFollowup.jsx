import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Calendar, 
    Clock, 
    ArrowRight, 
    Save, 
    CheckCircle2, 
    Building2, 
    Car, 
    Bell, 
    FileText,
    Users,
    Activity,
    ShieldAlert
} from 'lucide-react';
import { recordFollowupPlan } from '../../../api/doctorApi';

/**
 * PlanAndFollowup Component (Nordic Wellness Glass Theme)
 * Follow-up scheduling, linked encounter configuration, and coordinator action flags.
 */
export default function PlanAndFollowup() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const encounterId = params.get('encounterId') || localStorage.getItem('activeDoctorEncounterId') || 'enc-101';

    // Calculate default date 7 days from now
    const defaultDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const [followupDate, setFollowupDate] = useState(defaultDate);
    const [selectedInterval, setSelectedInterval] = useState('7');
    const [consultationMode, setConsultationMode] = useState('PHC_IN_PERSON');
    const [referredFacility, setReferredFacility] = useState('PHC North Main');
    const [clinicalGoal, setClinicalGoal] = useState('Re-evaluate blood pressure control on modified Amlodipine + Metoprolol regimen and review symptoms.');
    const [instructionsForPatient, setInstructionsForPatient] = useState('Maintain twice-daily BP diary. Bring your medicines strip with you.');
    
    // Coordinator Action triggers (connected to Member 4's queue)
    const [requireTransport, setRequireTransport] = useState(false);
    const [transportReason, setTransportReason] = useState('Patient is elderly and resides 12km from facility without direct transit.');
    const [requireAdherenceCall, setRequireAdherenceCall] = useState(true);
    const [requireAshaVisit, setRequireAshaVisit] = useState(false);

    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    const handleIntervalChange = (days) => {
        setSelectedInterval(days);
        if (days !== 'custom') {
            const newDate = new Date(Date.now() + parseInt(days, 10) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            setFollowupDate(newDate);
        }
    };

    const handleSavePlan = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                parent_encounter_id: encounterId,
                followupDate,
                consultationMode,
                referredFacility,
                clinicalGoal,
                instructionsForPatient,
                coordinatorActions: {
                    requireTransport,
                    transportReason: requireTransport ? transportReason : null,
                    requireAdherenceCall,
                    requireAshaVisit
                },
                createdAt: new Date().toISOString()
            };
            await recordFollowupPlan(encounterId, payload);
            setSaveStatus('Follow-up schedule recorded successfully');
            setTimeout(() => setSaveStatus(''), 3000);
            return true;
        } catch (err) {
            console.error('Failed to record follow-up plan:', err);
            return false;
        } finally {
            setSaving(false);
        }
    };

    const handleProceedToSignOff = async () => {
        const saved = await handleSavePlan();
        if (saved) {
            navigate(`/doctor/sign-off?encounterId=${encounterId}`);
        }
    };

    const glassCardStyle = {
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(20, 184, 166, 0.2)',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 10px 30px rgba(15, 118, 110, 0.05)',
        marginBottom: '1.5rem'
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '10px',
        border: '1px solid #ccfbf1',
        background: '#f0fdfa',
        fontSize: '0.9rem',
        color: '#0f172a',
        outline: 'none',
        boxSizing: 'border-box'
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', background: '#ccfbf1', color: '#0f766e', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: '700', display: 'inline-block' }}>
                        ENCOUNTER #{encounterId}
                    </div>
                    <h1 style={{ margin: '0.4rem 0 0 0', fontSize: '1.65rem', fontWeight: '800', color: '#0f172a' }}>
                        Care Continuity & Follow-Up Plan
                    </h1>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    {saveStatus && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.85rem', fontWeight: '600' }}>
                            <CheckCircle2 size={16} />
                            {saveStatus}
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={handleSavePlan}
                        disabled={saving}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            background: '#ffffff',
                            border: '1px solid #ccfbf1',
                            color: '#0f766e',
                            padding: '0.7rem 1.25rem',
                            borderRadius: '10px',
                            fontWeight: '600',
                            fontSize: '0.88rem',
                            cursor: 'pointer'
                        }}
                    >
                        <Save size={16} />
                        {saving ? 'Saving...' : 'Save Plan'}
                    </button>
                    <button
                        type="button"
                        onClick={handleProceedToSignOff}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.7rem 1.4rem',
                            borderRadius: '10px',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(15, 118, 110, 0.25)'
                        }}
                    >
                        Sign-Off & Lock
                        <ArrowRight size={17} />
                    </button>
                </div>
            </div>

            {/* Follow-up Timeline & Schedule */}
            <div style={glassCardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f766e' }}>
                        <Calendar size={20} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: '700' }}>Follow-Up Schedule</h3>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#0f766e' }}>Linked with Parent Encounter #{encounterId}</p>
                    </div>
                </div>

                {/* Quick Interval Presets */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#134e4a', marginBottom: '0.45rem' }}>
                        Recommended Follow-Up Interval
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {[
                            { label: '3 Days (Urgent Review)', days: '3' },
                            { label: '1 Week (7 Days)', days: '7' },
                            { label: '2 Weeks (14 Days)', days: '14' },
                            { label: '1 Month (30 Days)', days: '30' },
                            { label: 'Custom Date', days: 'custom' }
                        ].map(item => (
                            <button
                                key={item.days}
                                type="button"
                                onClick={() => handleIntervalChange(item.days)}
                                style={{
                                    border: selectedInterval === item.days ? '1.5px solid #0f766e' : '1px solid #cbd5e1',
                                    background: selectedInterval === item.days ? '#ccfbf1' : '#ffffff',
                                    color: selectedInterval === item.days ? '#0f766e' : '#334155',
                                    fontWeight: selectedInterval === item.days ? '700' : '500',
                                    padding: '0.45rem 0.9rem',
                                    borderRadius: '10px',
                                    fontSize: '0.82rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#134e4a', marginBottom: '0.35rem' }}>
                            Exact Follow-up Date
                        </label>
                        <input
                            type="date"
                            value={followupDate}
                            onChange={(e) => {
                                setFollowupDate(e.target.value);
                                setSelectedInterval('custom');
                            }}
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#134e4a', marginBottom: '0.35rem' }}>
                            Consultation Mode
                        </label>
                        <select
                            value={consultationMode}
                            onChange={(e) => setConsultationMode(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="PHC_IN_PERSON">PHC In-Person Review</option>
                            <option value="TELECONSULT">Teleconsultation / Video OPD</option>
                            <option value="SPECIALIST_REFERRAL">Specialist Referral (Cardiology OPD)</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#134e4a', marginBottom: '0.35rem' }}>
                            Facility Location
                        </label>
                        <input
                            type="text"
                            value={referredFacility}
                            onChange={(e) => setReferredFacility(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#134e4a', marginBottom: '0.35rem' }}>
                        Clinical Goal for Next Visit
                    </label>
                    <textarea
                        rows={2}
                        value={clinicalGoal}
                        onChange={(e) => setClinicalGoal(e.target.value)}
                        placeholder="Target metrics (e.g. Target BP < 130/80 mmHg, symptom resolution)..."
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#134e4a', marginBottom: '0.35rem' }}>
                        Specific Patient Instructions
                    </label>
                    <textarea
                        rows={2}
                        value={instructionsForPatient}
                        onChange={(e) => setInstructionsForPatient(e.target.value)}
                        placeholder="Directions for the patient to prepare for follow-up..."
                        style={inputStyle}
                    />
                </div>
            </div>

            {/* Coordinator Action Triggers (Integration with Member 4) */}
            <div style={{ ...glassCardStyle, border: '1.5px solid #99f6e4' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                        <Users size={20} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: '700' }}>Coordinator Task Dispatch</h3>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#0284c7' }}>Automated task generation for Care Coordinator (Member 4)</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Transport Assistance Flag */}
                    <div style={{
                        background: requireTransport ? '#eff6ff' : '#f8fafc',
                        border: requireTransport ? '1px solid #bfdbfe' : '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1rem'
                    }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={requireTransport}
                                onChange={(e) => setRequireTransport(e.target.checked)}
                                style={{ width: '18px', height: '18px' }}
                            />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700', fontSize: '0.9rem', color: '#1e3a8a' }}>
                                <Car size={16} />
                                Flag Transport Barrier: Patient Requires Transportation Support
                            </div>
                        </label>
                        {requireTransport && (
                            <div style={{ marginTop: '0.65rem', paddingLeft: '2rem' }}>
                                <input
                                    type="text"
                                    value={transportReason}
                                    onChange={(e) => setTransportReason(e.target.value)}
                                    placeholder="Specify barrier reason..."
                                    style={inputStyle}
                                />
                            </div>
                        )}
                    </div>

                    {/* Adherence Reminder Call */}
                    <div style={{
                        background: requireAdherenceCall ? '#ecfdf5' : '#f8fafc',
                        border: requireAdherenceCall ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1rem'
                    }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={requireAdherenceCall}
                                onChange={(e) => setRequireAdherenceCall(e.target.checked)}
                                style={{ width: '18px', height: '18px' }}
                            />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700', fontSize: '0.9rem', color: '#065f46' }}>
                                <Bell size={16} />
                                Schedule 30-Minute Medication Adherence Call Reminders
                            </div>
                        </label>
                    </div>

                    {/* ASHA Health Worker Visit */}
                    <div style={{
                        background: requireAshaVisit ? '#fdf4ff' : '#f8fafc',
                        border: requireAshaVisit ? '1px solid #f0abfc' : '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1rem'
                    }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={requireAshaVisit}
                                onChange={(e) => setRequireAshaVisit(e.target.checked)}
                                style={{ width: '18px', height: '18px' }}
                            />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700', fontSize: '0.9rem', color: '#86198f' }}>
                                <Activity size={16} />
                                Request Community ASHA Worker Home BP Verification
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
