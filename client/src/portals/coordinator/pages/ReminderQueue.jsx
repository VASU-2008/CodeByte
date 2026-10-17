import React from 'react';
import { BellRing, Sparkles, PhoneCall, CheckCircle2 } from 'lucide-react';

export default function ReminderQueue() {
  const reminders = [
    {
      id: 'REM-01',
      patient: 'Meena Sharma',
      time: '30 mins prior',
      callStatus: 'Completed - Barrier Reported',
      outcome: 'Rural Transport Help Needed (Culvert Flooded)',
      assignedVeyoraAI: 'VeyoraAI Kavita Ben',
    },
    {
      id: 'REM-02',
      patient: 'Ramesh Kumar',
      time: '30 mins prior',
      callStatus: 'Completed - Confirmed',
      outcome: 'Attendance Confirmed via IVR',
      assignedVeyoraAI: 'VeyoraAI Suman Lata',
    },
    {
      id: 'REM-03',
      patient: 'Sunita Devi',
      time: '30 mins prior',
      callStatus: 'Unresponsive',
      outcome: '3 Pings Dropped · Escalated to VeyoraAI',
      assignedVeyoraAI: 'VeyoraAI Pooja Verma',
    },
  ];

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-100 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            VeyoraAI Call Daemon
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
          Reminder Queue & Communication Logs
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Automated 30-minute pre-appointment AI call logs, IVR barrier capture, and VeyoraAI escalation stream.
        </p>
      </div>

      <div className="bg-white shadow-xs rounded-3xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Schedule Slot
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Call Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Outcome & VeyoraAI Escalation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100 text-sm">
              {reminders.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{r.patient}</td>
                  <td className="px-6 py-4 text-slate-600">{r.time}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold inline-flex items-center gap-1 ${
                        r.callStatus.includes('Barrier')
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : r.callStatus.includes('Unresponsive')
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {r.callStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 font-medium">
                    {r.outcome}
                    <span className="block text-xs text-slate-400 font-normal mt-0.5">
                      Assignee: {r.assignedVeyoraAI}
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