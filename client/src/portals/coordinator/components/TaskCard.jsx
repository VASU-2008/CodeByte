import React from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  PhoneCall,
  Car,
  Pill,
  PhoneMissed,
  Activity,
  AlertTriangle,
  RotateCcw,
  Check,
  User,
  Info
} from 'lucide-react';

export default function TaskCard({
  task,
  onResolve,
  onReopen,
  onCallAsha,
  compact = false
}) {
  if (!task) return null;

  const isResolved = task.status === 'Resolved';
  const patientDisplayName = task.patientName || task.patient || 'Patient';
  const assignedAgent = task.assignee || task.assignedAsha || task.assignedVeyoraAI || 'VeyoraAI Agent';

  // Category Icon Mapping
  const getCategoryIcon = () => {
    const cat = (task.category || '').toLowerCase();
    if (cat.includes('transport')) return Car;
    if (cat.includes('medication')) return Pill;
    if (cat.includes('reminder') || cat.includes('call')) return PhoneMissed;
    if (cat.includes('vitals')) return Activity;
    return AlertTriangle;
  };

  const IconComponent = getCategoryIcon();

  return (
    <div
      className={`rounded-3xl transition-all duration-300 relative border ${
        isResolved
          ? 'bg-white/60 border-slate-200/60 opacity-65 hover:opacity-90 shadow-none'
          : 'bg-white border-slate-100 shadow-xs hover:shadow-md'
      } ${compact ? 'p-4' : 'p-5 sm:p-6'}`}
    >
      <div className="space-y-3.5">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`p-2.5 rounded-2xl flex-shrink-0 mt-0.5 ${
                isResolved
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  : task.priority === 'High' || task.priority === 'Critical'
                  ? 'bg-amber-50 text-[#d97706] border border-amber-200'
                  : 'bg-blue-50 text-blue-600 border border-blue-100'
              }`}
            >
              {isResolved ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <IconComponent className="w-5 h-5" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {patientDisplayName}
                </h3>
                {(task.patientAge || task.patientGender) && (
                  <span className="text-xs text-slate-500 font-medium">
                    ({task.patientAge ? `${task.patientAge}y` : ''}
                    {task.patientAge && task.patientGender ? ' · ' : ''}
                    {task.patientGender})
                  </span>
                )}
                {task.tokenNumber && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                    {task.tokenNumber}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                {task.village && (
                  <span className="inline-flex items-center gap-1 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {task.village}
                  </span>
                )}
                {task.timestamp && (
                  <>
                    <span className="text-slate-300">·</span>
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {task.timestamp}
                    </span>
                  </>
                )}
                {task.encounterId && (
                  <>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {task.encounterId}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Badges: Category, Priority, Status */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
            {task.categoryLabel && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                {task.categoryLabel}
              </span>
            )}
            {task.category && !task.categoryLabel && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                {task.category}
              </span>
            )}

            {task.priority === 'Critical' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
                Critical
              </span>
            )}

            {task.priority === 'High' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800 border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] animate-pulse"></span>
                High Priority
              </span>
            )}

            {task.priority === 'Medium' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200">
                Medium
              </span>
            )}

            {isResolved ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <Check className="w-3 h-3 text-emerald-700" />
                Resolved
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                Active
              </span>
            )}
          </div>
        </div>

        {/* Narrative / Description */}
        <div className="space-y-2 pt-1">
          {task.title && (
            <h4 className="text-sm font-semibold text-slate-900 leading-snug">
              {task.title}
            </h4>
          )}
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
            {task.description}
          </p>

          {task.actionRequired && (
            <div className="flex items-start gap-2 bg-amber-50/80 border border-amber-200/60 rounded-2xl p-2.5 text-xs text-amber-900">
              <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-amber-950">Recommended Action: </strong>
                <span>{task.actionRequired}</span>
              </div>
            </div>
          )}

          {isResolved && task.resolutionNote && (
            <div className="flex items-start gap-2 bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-2.5 text-xs text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-emerald-950">Resolution Note: </strong>
                <span>{task.resolutionNote}</span>
                {task.resolvedAt && (
                  <span className="text-emerald-700 ml-2 italic">({task.resolvedAt})</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer / Assignee / Action */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              {assignedAgent ? assignedAgent.charAt(0) : 'V'}
            </div>
            <div>
              <div className="text-xs text-slate-700 font-semibold flex items-center gap-1.5">
                <span>VeyoraAI: {assignedAgent}</span>
                {task.ashaSector && (
                  <span className="text-[11px] text-slate-400 font-normal">
                    ({task.ashaSector})
                  </span>
                )}
              </div>
              {task.ashaPhone && (
                <div className="text-[11px] text-slate-500 flex items-center gap-2">
                  <span>{task.ashaPhone}</span>
                  <a
                    href={`tel:${task.ashaPhone}`}
                    onClick={(e) => {
                      if (onCallAsha) {
                        e.preventDefault();
                        onCallAsha(task);
                      }
                    }}
                    className="text-blue-600 hover:underline font-medium inline-flex items-center gap-0.5"
                  >
                    <PhoneCall className="w-3 h-3" /> Call VeyoraAI
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {!isResolved ? (
              <button
                onClick={() => onResolve && onResolve(task.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs active:scale-95"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                Mark Resolved
              </button>
            ) : (
              <button
                onClick={() => onReopen && onReopen(task.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                Reopen Task
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
