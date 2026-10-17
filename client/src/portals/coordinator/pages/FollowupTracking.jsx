import React from 'react';
import { ClipboardList, Sparkles, Calendar, User, ArrowRight } from 'lucide-react';

export default function FollowupTracking() {
  const followups = [
    {
      encounterId: 'ENC-8821',
      patient: 'Meena Sharma',
      diagnosis: 'Diabetes Follow-up: Retinopathy review & renal panel',
      followUpDate: '25 Oct 2026',
      clinician: 'Dr. A. Sen',
      facility: 'PHC Rampur',
      status: 'FOLLOW_UP_DUE',
      assignedVeyoraAI: 'VeyoraAI Kavita Ben',
    },
    {
      encounterId: 'ENC-7814',
      patient: 'Ramesh Kumar',
      diagnosis: 'Hypertension stabilization & Metformin tolerance check',
      followUpDate: '28 Oct 2026',
      clinician: 'Dr. Meera Rao',
      facility: 'CHC Shivgarh',
      status: 'SCHEDULED',
      assignedVeyoraAI: 'VeyoraAI Suman Lata',
    },
  ];

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Card */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-100 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            VeyoraAI Care Continuity
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
          Follow-up Tracking Board
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Upcoming patient follow-ups mapped directly to source clinical encounters and VeyoraAI field tracking.
        </p>
      </div>

      {/* Follow-up Cards */}
      <div className="space-y-4">
        {followups.map((f, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-white p-6 border border-slate-100 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 font-medium">{f.followUpDate}</span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wide">
                {f.status}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-900 font-display">{f.patient}</h3>
              <p className="text-sm text-slate-600 mt-0.5">
                <span className="font-semibold text-slate-700">Follow-up: </span>
                {f.diagnosis}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Referred to: <span className="font-semibold text-slate-700">{f.facility}</span> · Attending Doctor: <span className="font-semibold text-slate-700">{f.clinician}</span> · Source: <span className="font-mono text-blue-600 font-semibold">{f.encounterId}</span>
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Assigned: <span className="font-semibold text-slate-700">{f.assignedVeyoraAI}</span>
              </p>
            </div>

            <div className="pt-2">
              <button className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors">
                <span>View Result</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}