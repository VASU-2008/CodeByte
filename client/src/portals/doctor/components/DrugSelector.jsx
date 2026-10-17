import React, { useState } from 'react';
import { Pill, Plus, Search, AlertTriangle, Clock, Calendar, Check, Info } from 'lucide-react';

/**
 * DrugSelector Component (Nordic Wellness Glass Theme)
 * Reusable medication selection component with safety allergy checker and dosage builder.
 */

const COMMON_FORMULARY = [
    { id: 'med-1', name: 'Paracetamol', form: 'Tablet', strength: '500mg', category: 'Analgesic / Antipyretic', allergyKey: 'paracetamol' },
    { id: 'med-2', name: 'Amoxicillin', form: 'Capsule', strength: '500mg', category: 'Antibiotic (Penicillin class)', allergyKey: 'penicillin' },
    { id: 'med-3', name: 'Azithromycin', form: 'Tablet', strength: '500mg', category: 'Macrolide Antibiotic', allergyKey: 'macrolide' },
    { id: 'med-4', name: 'Amlodipine', form: 'Tablet', strength: '5mg', category: 'Antihypertensive (CCB)', allergyKey: 'amlodipine' },
    { id: 'med-5', name: 'Metformin', form: 'Tablet', strength: '500mg', category: 'Antidiabetic (Biguanide)', allergyKey: 'metformin' },
    { id: 'med-6', name: 'Omeprazole', form: 'Capsule', strength: '20mg', category: 'Antacid / PPI', allergyKey: 'omeprazole' },
    { id: 'med-7', name: 'Cetirizine', form: 'Tablet', strength: '10mg', category: 'Antihistamine', allergyKey: 'cetirizine' },
    { id: 'med-8', name: 'Ibuprofen', form: 'Tablet', strength: '400mg', category: 'NSAID', allergyKey: 'nsaid' },
    { id: 'med-9', name: 'Oral Rehydration Salts (ORS)', form: 'Sachet', strength: '21.8g', category: 'Electrolyte', allergyKey: 'none' },
    { id: 'med-10', name: 'Salbutamol Inhaler', form: 'Inhaler', strength: '100mcg', category: 'Bronchodilator', allergyKey: 'salbutamol' },
    { id: 'med-11', name: 'Telmisartan', form: 'Tablet', strength: '40mg', category: 'Antihypertensive (ARB)', allergyKey: 'telmisartan' },
    { id: 'med-12', name: 'Ciprofloxacin', form: 'Tablet', strength: '500mg', category: 'Fluoroquinolone', allergyKey: 'quinolone' }
];

export default function DrugSelector({ onAddDrug, patientAllergies = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDrug, setSelectedDrug] = useState(null);
    const [customName, setCustomName] = useState('');
    const [dosage, setDosage] = useState('500mg');
    const [frequency, setFrequency] = useState('1-0-1');
    const [timing, setTiming] = useState('After Food');
    const [duration, setDuration] = useState('5 Days');
    const [instructions, setInstructions] = useState('');
    const [warningAck, setWarningAck] = useState(false);

    // Filter drugs matching search term
    const filteredDrugs = COMMON_FORMULARY.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if the currently chosen drug conflicts with any documented patient allergies
    const allergyConflict = selectedDrug && patientAllergies.some(allergy => {
        const a = allergy.toLowerCase();
        return (
            selectedDrug.allergyKey.toLowerCase().includes(a) ||
            a.includes(selectedDrug.allergyKey.toLowerCase()) ||
            selectedDrug.name.toLowerCase().includes(a)
        );
    });

    const handleSelectDrug = (drug) => {
        setSelectedDrug(drug);
        setCustomName(drug.name);
        setDosage(drug.strength);
        setWarningAck(false);
    };

    const handleAddDrug = (e) => {
        e.preventDefault();
        const drugName = selectedDrug ? selectedDrug.name : customName.trim();
        if (!drugName) return;

        if (allergyConflict && !warningAck) {
            alert('Warning: Please acknowledge the allergy alert before adding this drug!');
            return;
        }

        const newDrug = {
            id: 'rx-item-' + Date.now(),
            name: drugName,
            dosage: dosage || 'As directed',
            form: selectedDrug ? selectedDrug.form : 'Tablet',
            frequency,
            timing,
            duration,
            instructions: instructions.trim() || 'Take as advised by physician',
            hasAllergyConflict: Boolean(allergyConflict)
        };

        if (onAddDrug) {
            onAddDrug(newDrug);
        }

        // Reset formulation for next item
        setSelectedDrug(null);
        setCustomName('');
        setSearchTerm('');
        setInstructions('');
        setWarningAck(false);
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(20, 184, 166, 0.2)',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 10px 30px rgba(15, 118, 110, 0.06)'
    };

    const inputStyle = {
        width: '100%',
        padding: '0.65rem 0.9rem',
        borderRadius: '10px',
        border: '1px solid #ccfbf1',
        background: '#f0fdfa',
        fontSize: '0.9rem',
        color: '#0f172a',
        outline: 'none',
        boxSizing: 'border-box'
    };

    return (
        <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f766e' }}>
                    <Pill size={20} />
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: '700' }}>Medication Selector</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#0f766e' }}>Select from PHC formulary or enter custom drug</p>
                </div>
            </div>

            {/* Quick Search */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <Search size={16} color="#0f766e" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                    type="text"
                    placeholder="Search standard formulary (e.g. Paracetamol, Amlodipine, Metformin)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ ...inputStyle, paddingLeft: '38px' }}
                />
            </div>

            {/* Formulary Pills List */}
            {searchTerm && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '140px', overflowY: 'auto', marginBottom: '1.25rem', padding: '0.5rem', background: '#f8fafc', borderRadius: '10px' }}>
                    {filteredDrugs.length > 0 ? (
                        filteredDrugs.map(drug => (
                            <button
                                key={drug.id}
                                type="button"
                                onClick={() => handleSelectDrug(drug)}
                                style={{
                                    border: selectedDrug?.id === drug.id ? '1.5px solid #0f766e' : '1px solid #e2e8f0',
                                    background: selectedDrug?.id === drug.id ? '#ccfbf1' : '#ffffff',
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    color: '#0f172a',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem'
                                }}
                            >
                                <span style={{ fontWeight: '600' }}>{drug.name}</span>
                                <span style={{ color: '#64748b', fontSize: '0.72rem' }}>({drug.strength})</span>
                            </button>
                        ))
                    ) : (
                        <div style={{ fontSize: '0.8rem', color: '#64748b', padding: '0.25rem' }}>
                            No exact match. You can type custom drug details below.
                        </div>
                    )}
                </div>
            )}

            {/* Allergy Alert Banner */}
            {allergyConflict && (
                <div style={{
                    background: 'rgba(254, 242, 242, 0.9)',
                    border: '1px solid #fecaca',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b91c1c', fontWeight: '700', fontSize: '0.88rem' }}>
                        <AlertTriangle size={18} />
                        ALLERGY WARNING: Patient has registered allergy to this class!
                    </div>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#7f1d1d' }}>
                        Documented patient allergies: <strong>{patientAllergies.join(', ')}</strong>.
                    </p>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: '#b91c1c', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={warningAck}
                            onChange={(e) => setWarningAck(e.target.checked)}
                        />
                        Clinical override: I have verified patient safety and proceed knowingly.
                    </label>
                </div>
            )}

            {/* Drug Customization & Dosage Builder */}
            <form onSubmit={handleAddDrug}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#134e4a', marginBottom: '0.3rem' }}>
                            Drug Name & Form
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Paracetamol 500mg"
                            value={selectedDrug ? `${selectedDrug.name} (${selectedDrug.form})` : customName}
                            onChange={(e) => {
                                setSelectedDrug(null);
                                setCustomName(e.target.value);
                            }}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#134e4a', marginBottom: '0.3rem' }}>
                            Dosage / Strength
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. 500mg, 1 tab, 10ml"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#134e4a', marginBottom: '0.3rem' }}>
                            Frequency (Doses/Day)
                        </label>
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="1-0-0">1-0-0 (Morning only)</option>
                            <option value="1-0-1">1-0-1 (Morning & Night)</option>
                            <option value="1-1-1">1-1-1 (TDS: Morning, Noon, Night)</option>
                            <option value="0-0-1">0-0-1 (Night only / Bedtime)</option>
                            <option value="SOS">SOS (As needed when symptomatic)</option>
                            <option value="Once Weekly">Once Weekly</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#134e4a', marginBottom: '0.3rem' }}>
                            Food Timing
                        </label>
                        <select
                            value={timing}
                            onChange={(e) => setTiming(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="After Food">After Food (PC)</option>
                            <option value="Before Food">Before Food (AC)</option>
                            <option value="With Food">With Food</option>
                            <option value="Empty Stomach">Empty Stomach</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#134e4a', marginBottom: '0.3rem' }}>
                            Duration
                        </label>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="3 Days">3 Days</option>
                            <option value="5 Days">5 Days</option>
                            <option value="7 Days">7 Days</option>
                            <option value="10 Days">10 Days</option>
                            <option value="14 Days">14 Days</option>
                            <option value="30 Days">30 Days (1 Month)</option>
                            <option value="Continuous">Continuous (Chronic review)</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#134e4a', marginBottom: '0.3rem' }}>
                            Special Patient Instructions
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Take with warm water, avoid dairy"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        type="submit"
                        disabled={allergyConflict && !warningAck}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            background: allergyConflict && !warningAck ? '#94a3b8' : 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.7rem 1.4rem',
                            borderRadius: '10px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            cursor: allergyConflict && !warningAck ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 12px rgba(15, 118, 110, 0.25)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Plus size={16} />
                        Add Medication to e-Rx
                    </button>
                </div>
            </form>
        </div>
    );
}
