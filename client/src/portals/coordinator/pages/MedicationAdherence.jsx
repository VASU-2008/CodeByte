import React, { useState } from 'react';
import { 
  Pill, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Filter, 
  Calendar,
  Send,
  Clock,
  ShieldAlert
} from 'lucide-react';

/**
 * MedicationAdherence (Aura HealthTech Theme - Doctor Portal Aligned)
 * Monitors real-time patient medication regimens, dose timestamps,
 * and 2-missed-dose rule engine triggers.
 */
export default function MedicationAdherence() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  
  const [adherenceLogs, setAdherenceLogs] = useState([
    {
      id: 'MED-01',
      patient: 'Ramesh Kumar',
      token: 'P-101',
      drug: 'Metformin 500mg + Telmisartan 40mg',
      missedCount: 2,
      lastTaken: '2 days ago (Evening)',
      assignedVeyoraAI: 'VeyoraAI Suman Lata',
      status: 'High Risk',
    },
    {
      id: 'MED-02',
      patient: 'Harish Chandra',
      token: 'P-102',
      drug: 'Clopidogrel 75mg',
      missedCount: 2,
      lastTaken: 'Yesterday (Night)',
      assignedVeyoraAI: 'VeyoraAI Kavita Ben',
      status: 'High Risk',
    },
    {
      id: 'MED-03',
      patient: 'Meena Sharma',
      token: 'P-103',
      drug: 'Paracetamol 650mg & Metformin',
      missedCount: 0,
      lastTaken: 'Today (08:30 AM)',
      assignedVeyoraAI: 'VeyoraAI Kavita Ben',
      status: 'Compliant',
    },
    {
      id: 'MED-04',
      patient: 'Sunita Devi',
      token: 'P-104',
      drug: 'Amlodipine 5mg',
      missedCount: 1,
      lastTaken: 'Yesterday (Morning)',
      assignedVeyoraAI: 'VeyoraAI Pooja Verma',
      status: 'Warning',
    },
    {
      id: 'MED-05',
      patient: 'Mohan Lal Verma',
      token: 'P-105',
      drug: 'Atorvastatin 20mg',
      missedCount: 0,
      lastTaken: 'Today (07:15 AM)',
      assignedVeyoraAI: 'VeyoraAI Suman Lata',
      status: 'Compliant',
    }
  ]);

  const [alertSent, setAlertSent] = useState({});

  const handleNotifyAgent = (id) => {
    setAlertSent(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAlertSent(prev => ({ ...prev, [id]: false }));
    }, 3000);
  };

  const filteredLogs = adherenceLogs.filter(log => {
    const matchesSearch = log.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.drug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.token.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterStatus === 'HIGH_RISK') return log.missedCount >= 2;
    if (filterStatus === 'COMPLIANT') return log.missedCount === 0;
    if (filterStatus === 'WARNING') return log.missedCount === 1;
    return true;
  });

  const highRiskCount = adherenceLogs.filter(l => l.missedCount >= 2).length;
  const compliantCount = adherenceLogs.filter(l => l.missedCount === 0).length;

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '1.75rem',
        border: '1px solid #eef2f6',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700',
                background: '#e8f7f2',
                color: '#044e42',
                border: '1px solid #cceee5'
              }}>
                <Sparkles size={12} color="#044e42" />
                VeyoraAI Protocol Engine
              </span>
            </div>
            <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
              Medication Adherence & Dose Logs
            </h2>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.86rem', color: '#64748b' }}>
              Real-time monitoring of chronic patient regimens and automatic 2-missed-dose escalation triggers.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#64748b' }}>
            <Calendar size={15} color="#64748b" />
            <span>Mon, 13 Jan 2025</span>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
          {/* Total Regimens */}
          <div style={{
            background: '#e8f7f2',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#044e42', lineHeight: '1' }}>{adherenceLogs.length}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#044e42', marginTop: '0.35rem' }}>Active Regimens</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#cceee5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
              <Pill size={20} />
            </div>
          </div>

          {/* Compliant */}
          <div style={{
            background: '#eff6ff',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1d4ed8', lineHeight: '1' }}>{compliantCount}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1d4ed8', marginTop: '0.35rem' }}>Fully Compliant</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>

          {/* High-Risk Alerts */}
          <div style={{
            background: '#fef2f2',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#dc2626', lineHeight: '1' }}>{highRiskCount}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#dc2626', marginTop: '0.35rem' }}>≥2 Missed Doses (Alerts)</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
              <ShieldAlert size={20} />
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <div style={{
            flex: '1 1 260px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '0.55rem 0.85rem'
          }}>
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by patient, medication or token..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '0.85rem',
                color: '#0f172a'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['ALL', 'HIGH_RISK', 'WARNING', 'COMPLIANT'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  border: filterStatus === st ? '1px solid #044e42' : '1px solid #e2e8f0',
                  background: filterStatus === st ? '#044e42' : '#ffffff',
                  color: filterStatus === st ? '#ffffff' : '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {st === 'ALL' ? 'All Regimens' : st === 'HIGH_RISK' ? 'High Risk (≥2)' : st === 'WARNING' ? '1 Missed' : 'Compliant'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Adherence Table Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #eef2f6',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#fafbfc', borderBottom: '1px solid #eef2f6' }}>
                <th style={{ padding: '0.9rem 1.25rem', fontSize: '0.78rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Patient & Token</th>
                <th style={{ padding: '0.9rem 1.25rem', fontSize: '0.78rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Prescribed Regimen</th>
                <th style={{ padding: '0.9rem 1.25rem', fontSize: '0.78rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Missed Count</th>
                <th style={{ padding: '0.9rem 1.25rem', fontSize: '0.78rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Last Confirmed Dose</th>
                <th style={{ padding: '0.9rem 1.25rem', fontSize: '0.78rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Field Agent</th>
                <th style={{ padding: '0.9rem 1.25rem', fontSize: '0.78rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '0.9rem 1.25rem', fontSize: '0.78rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => {
                const isHighRisk = log.missedCount >= 2;
                const isWarning = log.missedCount === 1;

                return (
                  <tr
                    key={log.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      fontSize: '0.88rem',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#fbfdfc')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ fontWeight: '700', color: '#0f172a' }}>{log.patient}</div>
                      <div style={{ fontSize: '0.75rem', color: '#044e42', fontFamily: 'monospace', fontWeight: '600', marginTop: '2px' }}>
                        {log.token}
                      </div>
                    </td>

                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#334155', fontWeight: '500' }}>
                        <Pill size={14} color="#64748b" />
                        <span>{log.drug}</span>
                      </div>
                    </td>

                    <td style={{ padding: '1rem 1.25rem' }}>
                      {isHighRisk ? (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          color: '#dc2626',
                          fontWeight: '700',
                          fontSize: '0.84rem'
                        }}>
                          <AlertTriangle size={15} color="#dc2626" />
                          {log.missedCount} Consecutive
                        </span>
                      ) : isWarning ? (
                        <span style={{ color: '#b45309', fontWeight: '600', fontSize: '0.84rem' }}>
                          1 Missed Dose
                        </span>
                      ) : (
                        <span style={{ color: '#15803d', fontWeight: '600', fontSize: '0.84rem' }}>
                          0 Missed
                        </span>
                      )}
                    </td>

                    <td style={{ padding: '1rem 1.25rem', color: '#64748b', fontSize: '0.82rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={13} color="#94a3b8" />
                        <span>{log.lastTaken}</span>
                      </div>
                    </td>

                    <td style={{ padding: '1rem 1.25rem', color: '#475569', fontWeight: '600', fontSize: '0.82rem' }}>
                      {log.assignedVeyoraAI}
                    </td>

                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.28rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        background: isHighRisk ? '#fee2e2' : isWarning ? '#fef3c7' : '#dcfce7',
                        color: isHighRisk ? '#dc2626' : isWarning ? '#b45309' : '#15803d',
                        border: isHighRisk ? '1px solid #fecaca' : isWarning ? '1px solid #fde68a' : '1px solid #bbf7d0'
                      }}>
                        {log.missedCount === 0 && <CheckCircle2 size={13} />}
                        {isHighRisk ? 'High Risk Alert' : isWarning ? 'Watchlist' : 'Compliant'}
                      </span>
                    </td>

                    <td style={{ padding: '1rem 1.25rem' }}>
                      {isHighRisk ? (
                        <button
                          onClick={() => handleNotifyAgent(log.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: '600',
                            background: alertSent[log.id] ? '#dcfce7' : '#044e42',
                            color: alertSent[log.id] ? '#15803d' : '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <Send size={13} />
                          {alertSent[log.id] ? 'Dispatched!' : 'Dispatch Field Agent'}
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic' }}>
                          Standard Monitoring
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}