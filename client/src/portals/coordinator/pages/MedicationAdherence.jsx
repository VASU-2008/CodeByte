import React, { useState } from 'react';
import { Pill, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function MedicationAdherence() {
  const [adherenceLogs, setAdherenceLogs] = useState([
    {
      id: 'MED-01',
      patient: 'Ramesh Kumar',
      drug: 'Metformin 500mg + Telmisartan 40mg',
      missedCount: 2,
      lastTaken: '2 days ago',
      assignedVeyoraAI: 'VeyoraAI Suman Lata',
      status: 'High Risk - Alert Triggered',
    },
    {
      id: 'MED-02',
      patient: 'Harish Chandra',
      drug: 'Clopidogrel 75mg',
      missedCount: 2,
      lastTaken: 'Yesterday (Night)',
      assignedVeyoraAI: 'VeyoraAI Kavita Ben',
      status: 'High Risk - Alert Triggered',
    },
    {
      id: 'MED-03',
      patient: 'Meena Sharma',
      drug: 'Paracetamol 650mg & Metformin',
      missedCount: 0,
      lastTaken: 'Today (Morning)',
      assignedVeyoraAI: 'VeyoraAI Kavita Ben',
      status: 'Compliant',
    },
  ]);

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Card */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-100 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            VeyoraAI Adherence Engine
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
          Medication Adherence & Dose Logs
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Real-time stream monitoring the 2-missed-dose rule engine trigger with VeyoraAI field dispatch.
        </p>
      </div>

      {/* Adherence Table Card */}
      <div className="bg-white shadow-xs rounded-3xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Prescribed Regimen
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Missed Doses
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  VeyoraAI Field Agent
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100 text-sm">
              {adherenceLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{log.patient}</td>
                  <td className="px-6 py-4 text-slate-600">{log.drug}</td>
                  <td className="px-6 py-4">
                    {log.missedCount >= 2 ? (
                      <span className="font-bold text-rose-600 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-rose-500" />
                        {log.missedCount} Consecutive Doses
                      </span>
                    ) : (
                      <span className="text-slate-500 font-medium">{log.missedCount} Doses</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{log.assignedVeyoraAI}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold inline-flex items-center gap-1 ${
                        log.missedCount >= 2
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {log.missedCount === 0 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}