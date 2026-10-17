import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    User, 
    AlertTriangle, 
    HeartPulse, 
    History, 
    FileText, 
    ArrowRight, 
    ShieldCheck, 
    Calendar, 
    Building2, 
    Pill, 
    Edit3,
    Activity,
    CheckCircle2
} from 'lucide-react';
import { getClinicalBriefing } from '../../../api/doctorApi';
import VitalsForm from '../components/VitalsForm';

/**
 * ClinicalBriefing Component (Nordic Wellness Glass Theme)
 * Pre-consultation clinician briefing: Chief complaint, vitals, allergies, and past visits timeline.
 */
export default function ClinicalBriefing() {
    const navigate = useNavigate();
    const location = useLocation();

    // Read encounterId from URL query or fallback
    const params = new URLSearchParams(location.search);
    const encounterId = params.get('encounterId') || localStorage.getItem('activeDoctorEncounterId') || 'enc-101';

    const [briefing, setBriefing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editVitals, setEditVitals] = useState(false);

    useEffect(() => {
        const fetchBriefing = async () => {
            setLoading(true);
            try {
                const data = await getClinicalBriefing(encounterId);
                setBriefing(data);
            } catch (err) {
                console.error('Error fetching clinical briefing:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBriefing();
    }, [encounterId]);

    const handleProceedToConsultation = () => {
        navigate(`/doctor/consultation?encounterId=${encounterId}`);
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

    if (loading) {
        return (
            <div style={{ ...glassCardStyle, textAlign: 'center', padding: '3.5rem', color: '#0f766e' }}>
                <Activity size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '0.75rem' }} />
                <div>Loading patient clinical briefing & records...</div>
            </div>
        );
    }

    const { patient, currentEncounter, vitals, pastVisits } = briefing || {};

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', background: '#ccfbf1', color: '#0f766e', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: '700' }}>
                            ENCOUNTER #{encounterId}
                        </span>
                        <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#166534', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: '600' }}>
                            <ShieldCheck size={12} style={{ display: 'inline', marginRight: '3px' }} />
                            Consent Authorized
                        </span>
                    </div>
                    <h1 style={{ margin: '0.4rem 0 0 0', fontSize: '1.65rem', fontWeight: '800', color: '#0f172a' }}>
                        Clinical Briefing & Patient Dossier
                    </h1>
                </div>

                <button
                    onClick={handleProceedToConsultation}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.75rem 1.4rem',
                        borderRadius: '12px',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(15, 118, 110, 0.25)'
                    }}
                >
                    Start Consultation Notes
                    <ArrowRight size={17} />
                </button>
            </div>

            {/* Patient Identity Banner */}
            <div style={{ ...glassCardStyle, background: 'linear-gradient(135deg, rgba(240, 253, 250, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '16px',
                            background: '#0f766e',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.3rem',
                            fontWeight: '700'
                        }}>
                            {patient?.name?.charAt(0) || 'P'}
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
                                    {patient?.name}
                                </h2>
                                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                    ({patient?.age} y/o, {patient?.gender})
                                </span>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#0f766e', marginTop: '0.2rem' }}>
                                ABHA ID: <strong>{patient?.abhaId}</strong> · Blood Group: <strong>{patient?.bloodGroup}</strong> · Preferred Language: <strong>{patient?.languagePreference}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Allergies & Red Flags */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#b91c1c' }}>Allergies:</span>
                            {patient?.allergies?.map((allergy, i) => (
                                <span key={i} style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>
                                    {allergy}
                                </span>
                            ))}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                            Chronic: {patient?.chronicConditions?.join(', ')}
                        </div>
                    </div>
                </div>
            </div>

            {/* Current Chief Complaint & Voice/Text Intake Summary */}
            <div style={glassCardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <FileText size={18} color="#0f766e" />
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
                        Current Visit Intake & Complaint
                    </h3>
                </div>
                <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem', borderLeft: '4px solid #0f766e' }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.3rem' }}>
                        "{currentEncounter?.chief_complaint}"
                    </div>
                    <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', lineHeight: '1.45' }}>
                        <strong>Intake Summary:</strong> {currentEncounter?.intakeSummary}
                    </p>
                </div>
            </div>

            {/* Recorded Vitals Section */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
                        Triage Vitals Check
                    </h3>
                    <button
                        onClick={() => setEditVitals(!editVitals)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: '#ffffff',
                            border: '1px solid #ccfbf1',
                            color: '#0f766e',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        <Edit3 size={13} />
                        {editVitals ? 'Done Editing' : 'Update Vitals'}
                    </button>
                </div>
                <VitalsForm initialVitals={vitals} isReadOnly={!editVitals} />
            </div>

            {/* Past Encounters Timeline */}
            <div style={glassCardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <History size={18} color="#0f766e" />
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
                        Authorized Past Encounters Timeline
                    </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {pastVisits?.map((visit, idx) => (
                        <div
                            key={visit.encounterId}
                            style={{
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                padding: '1rem',
                                background: 'rgba(248, 250, 252, 0.7)',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                gap: '0.85rem'
                            }}
                        >
                            <div style={{ flex: 1, minWidth: '240px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                                    <span style={{ fontSize: '0.72rem', background: '#e2e8f0', color: '#334155', padding: '0.1rem 0.45rem', borderRadius: '6px', fontWeight: '600' }}>
                                        {visit.encounterId}
                                    </span>
                                    <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a' }}>
                                        {visit.diagnosis}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                                    Facility: <strong>{visit.facility}</strong> · Attending: <strong>{visit.prescribedBy}</strong>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
                                    {visit.medicines?.map((med, mIdx) => (
                                        <span key={mIdx} style={{ fontSize: '0.72rem', background: '#ccfbf1', color: '#0f766e', padding: '0.15rem 0.5rem', borderRadius: '12px', fontWeight: '600' }}>
                                            {med}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.78rem' }}>
                                <Calendar size={14} />
                                {visit.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
