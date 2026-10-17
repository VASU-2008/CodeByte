import React, { useState, useEffect } from 'react';
import { Activity, Heart, Thermometer, Wind, Scale, CheckCircle2, AlertCircle, Save } from 'lucide-react';

/**
 * VitalsForm Component (Nordic Wellness Glass Theme)
 * Reusable clinical vitals-recording form with real-time range validation.
 */
export default function VitalsForm({ initialVitals = {}, onSave, isReadOnly = false }) {
    const [vitals, setVitals] = useState({
        bloodPressureSys: initialVitals.bloodPressureSys || '',
        bloodPressureDia: initialVitals.bloodPressureDia || '',
        heartRate: initialVitals.heartRate || '',
        temperature: initialVitals.temperature || '',
        spo2: initialVitals.spo2 || '',
        respiratoryRate: initialVitals.respiratoryRate || '',
        weightKg: initialVitals.weightKg || '',
        bloodGlucose: initialVitals.bloodGlucose || ''
    });

    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        if (initialVitals && Object.keys(initialVitals).length > 0) {
            setVitals(prev => ({ ...prev, ...initialVitals }));
        }
    }, [initialVitals]);

    const handleChange = (field, value) => {
        setVitals(prev => ({
            ...prev,
            [field]: value === '' ? '' : Number(value)
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (onSave) {
            onSave(vitals);
            setStatusMessage('Vitals recorded successfully');
            setTimeout(() => setStatusMessage(''), 3000);
        }
    };

    // Range checks for quick visual alerts in Nordic soft colors
    const isBpHigh = vitals.bloodPressureSys >= 140 || vitals.bloodPressureDia >= 90;
    const isSpo2Low = vitals.spo2 !== '' && vitals.spo2 < 95;
    const isTempHigh = vitals.temperature !== '' && vitals.temperature > 100.4;
    const isHeartRateAbnormal = vitals.heartRate !== '' && (vitals.heartRate < 60 || vitals.heartRate > 100);

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(20, 184, 166, 0.2)',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 10px 30px rgba(15, 118, 110, 0.06)'
    };

    const inputContainerStyle = {
        background: 'rgba(240, 253, 250, 0.6)',
        border: '1px solid #ccfbf1',
        borderRadius: '12px',
        padding: '0.85rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        transition: 'all 0.2s ease'
    };

    const labelStyle = {
        fontSize: '0.78rem',
        fontWeight: '600',
        color: '#134e4a',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        textTransform: 'uppercase',
        letterSpacing: '0.04em'
    };

    const inputStyle = {
        width: '100%',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: '1.15rem',
        fontWeight: '600',
        color: '#0f172a'
    };

    return (
        <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f766e' }}>
                        <Activity size={20} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: '700' }}>Patient Vitals</h3>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#0f766e' }}>Real-time physiological metrics</p>
                    </div>
                </div>
                {statusMessage && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.85rem', fontWeight: '600' }}>
                        <CheckCircle2 size={16} />
                        {statusMessage}
                    </div>
                )}
            </div>

            <form onSubmit={handleFormSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {/* Blood Pressure Systolic */}
                    <div style={{ ...inputContainerStyle, border: isBpHigh ? '1px solid #fecdd3' : '1px solid #ccfbf1' }}>
                        <div style={labelStyle}>
                            <Heart size={14} color={isBpHigh ? '#e11d48' : '#0d9488'} />
                            Systolic BP (mmHg)
                        </div>
                        <input
                            type="number"
                            placeholder="e.g. 120"
                            value={vitals.bloodPressureSys}
                            onChange={(e) => handleChange('bloodPressureSys', e.target.value)}
                            disabled={isReadOnly}
                            style={inputStyle}
                        />
                        <span style={{ fontSize: '0.72rem', color: isBpHigh ? '#e11d48' : '#64748b' }}>
                            {isBpHigh ? 'Elevated (>139)' : 'Normal: 90 - 120'}
                        </span>
                    </div>

                    {/* Blood Pressure Diastolic */}
                    <div style={{ ...inputContainerStyle, border: isBpHigh ? '1px solid #fecdd3' : '1px solid #ccfbf1' }}>
                        <div style={labelStyle}>
                            <Heart size={14} color={isBpHigh ? '#e11d48' : '#0d9488'} />
                            Diastolic BP (mmHg)
                        </div>
                        <input
                            type="number"
                            placeholder="e.g. 80"
                            value={vitals.bloodPressureDia}
                            onChange={(e) => handleChange('bloodPressureDia', e.target.value)}
                            disabled={isReadOnly}
                            style={inputStyle}
                        />
                        <span style={{ fontSize: '0.72rem', color: isBpHigh ? '#e11d48' : '#64748b' }}>
                            {isBpHigh ? 'Elevated (>89)' : 'Normal: 60 - 80'}
                        </span>
                    </div>

                    {/* Pulse / Heart Rate */}
                    <div style={{ ...inputContainerStyle, border: isHeartRateAbnormal ? '1px solid #fde68a' : '1px solid #ccfbf1' }}>
                        <div style={labelStyle}>
                            <Activity size={14} color={isHeartRateAbnormal ? '#d97706' : '#0d9488'} />
                            Pulse Rate (bpm)
                        </div>
                        <input
                            type="number"
                            placeholder="e.g. 72"
                            value={vitals.heartRate}
                            onChange={(e) => handleChange('heartRate', e.target.value)}
                            disabled={isReadOnly}
                            style={inputStyle}
                        />
                        <span style={{ fontSize: '0.72rem', color: isHeartRateAbnormal ? '#d97706' : '#64748b' }}>
                            Normal: 60 - 100 bpm
                        </span>
                    </div>

                    {/* SpO2 */}
                    <div style={{ ...inputContainerStyle, border: isSpo2Low ? '1px solid #fecdd3' : '1px solid #ccfbf1' }}>
                        <div style={labelStyle}>
                            <Wind size={14} color={isSpo2Low ? '#e11d48' : '#0d9488'} />
                            Oxygen Saturation (%)
                        </div>
                        <input
                            type="number"
                            placeholder="e.g. 98"
                            value={vitals.spo2}
                            onChange={(e) => handleChange('spo2', e.target.value)}
                            disabled={isReadOnly}
                            style={inputStyle}
                        />
                        <span style={{ fontSize: '0.72rem', color: isSpo2Low ? '#e11d48' : '#64748b' }}>
                            {isSpo2Low ? 'Hypoxia Warning (<95%)' : 'Normal: 95 - 100%'}
                        </span>
                    </div>

                    {/* Temperature */}
                    <div style={{ ...inputContainerStyle, border: isTempHigh ? '1px solid #fed7aa' : '1px solid #ccfbf1' }}>
                        <div style={labelStyle}>
                            <Thermometer size={14} color={isTempHigh ? '#ea580c' : '#0d9488'} />
                            Temperature (°F)
                        </div>
                        <input
                            type="number"
                            step="0.1"
                            placeholder="e.g. 98.6"
                            value={vitals.temperature}
                            onChange={(e) => handleChange('temperature', e.target.value)}
                            disabled={isReadOnly}
                            style={inputStyle}
                        />
                        <span style={{ fontSize: '0.72rem', color: isTempHigh ? '#ea580c' : '#64748b' }}>
                            {isTempHigh ? 'Fever (>100.4°F)' : 'Normal: 97.8 - 99.1°F'}
                        </span>
                    </div>

                    {/* Weight */}
                    <div style={inputContainerStyle}>
                        <div style={labelStyle}>
                            <Scale size={14} color="#0d9488" />
                            Body Weight (kg)
                        </div>
                        <input
                            type="number"
                            step="0.5"
                            placeholder="e.g. 68"
                            value={vitals.weightKg}
                            onChange={(e) => handleChange('weightKg', e.target.value)}
                            disabled={isReadOnly}
                            style={inputStyle}
                        />
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                            Standard metric kg
                        </span>
                    </div>
                </div>

                {!isReadOnly && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
                        <button
                            type="submit"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.7rem 1.4rem',
                                borderRadius: '10px',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(15, 118, 110, 0.25)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Save size={16} />
                            Save & Update Vitals
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
