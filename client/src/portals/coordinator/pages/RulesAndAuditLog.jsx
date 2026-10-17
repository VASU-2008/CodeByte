import React from 'react';
import AuditTimeline from '../components/AuditTimeline';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function RulesAndAuditLog() {
  const auditLogs = [
    {
      id: 'AUDIT-01',
      title: 'Rule Triggered: 2-Missed-Doses (RULE-MED-02)',
      description: 'Patient Ramesh Kumar flagged by adherence engine for Metformin 500mg. VeyoraAI Suman Lata notified.',
      timestamp: '10:42 AM',
      category: 'medication',
      severity: 'high',
      source: 'VeyoraAI Telemetry',
      actor: 'Adherence Daemon',
    },
    {
      id: 'AUDIT-02',
      title: 'VeyoraAI Outbound Call Dispatched (RULE-IVR-01)',
      description: 'Pre-appointment reminder call placed for Meena Sharma. Rural transit barrier captured.',
      timestamp: '09:15 AM',
      category: 'transport',
      severity: 'warning',
      source: 'VeyoraAI Call Gateway',
      actor: 'Interactive IVR',
    },
    {
      id: 'AUDIT-03',
      title: 'Emergency Keyword & Vitals Intercept (RULE-VIT-04)',
      description: 'Mohan Lal Verma BP surge 174/104 mmHg. Teleconsult escalation window created.',
      timestamp: '08:30 AM',
      category: 'vitals',
      severity: 'critical',
      source: 'MediKiosk #02',
      actor: 'Kiosk Blood Pressure Sensor',
    },
  ];

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-100 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            VeyoraAI Audit Trail
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
          Rules & Audit Log
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Traceability timeline showing automated rule triggers, VeyoraAI field actions, timestamps, and system events.
        </p>
      </div>

      <div className="bg-white shadow-xs rounded-3xl border border-slate-100 p-6 sm:p-8">
        <AuditTimeline events={auditLogs} />
      </div>
    </div>
  );
}