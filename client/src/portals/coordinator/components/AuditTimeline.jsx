import React from 'react';
import {
  Clock,
  ShieldCheck,
  AlertTriangle,
  Car,
  Pill,
  PhoneCall,
  Activity,
  UserCheck,
  CheckCircle2,
  FileText,
  Sparkles
} from 'lucide-react';

export default function AuditTimeline({ events = [], logs = [], onFilterTag }) {
  const normalizedEvents = events.length > 0 ? events : logs.map((l, i) => ({
    id: `log-${i}`,
    title: l.event || l.title || 'System Trigger',
    description: l.details || l.description || '',
    timestamp: l.timestamp || 'Recent',
    category: 'system',
    severity: 'warning',
    source: 'VeyoraAI Engine'
  }));

  if (!normalizedEvents || normalizedEvents.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-slate-500 rounded-3xl bg-slate-50 border border-slate-100">
        No audit log records found.
      </div>
    );
  }

  const getEventIcon = (type, category) => {
    switch (category) {
      case 'transport':
        return Car;
      case 'medication':
        return Pill;
      case 'reminder':
        return PhoneCall;
      case 'vitals':
        return Activity;
      case 'system':
      case 'rule':
        return Sparkles;
      case 'resolution':
        return CheckCircle2;
      default:
        return FileText;
    }
  };

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'warning':
      case 'high':
        return 'bg-amber-500/10 text-amber-800 border-amber-200';
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-blue-50 text-blue-900 border-blue-100';
    }
  };

  return (
    <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-blue-300 before:to-slate-200">
      {events.map((evt) => {
        const IconComponent = getEventIcon(evt.type, evt.category);
        const severityClass = getSeverityStyle(evt.severity);

        return (
          <div key={evt.id} className="relative group">
            {/* Timeline Node Dot */}
            <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-amber-500 text-[#d97706] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <IconComponent className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>

            {/* Event Card (Frosted Glass) */}
            <div className="rounded-2xl bg-white/75 backdrop-blur-md border border-white/85 shadow-xs p-4 sm:p-5 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${severityClass}`}
                  >
                    {evt.ruleId || evt.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    {evt.title}
                  </h4>
                  {evt.patientName && (
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Patient: {evt.patientName}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{evt.timestamp}</span>
                </div>
              </div>

              {/* Event Details */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                {evt.description}
              </p>

              {/* Metadata / Tags */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center gap-3">
                  <span>
                    Source:{' '}
                    <strong className="text-slate-700 font-medium">
                      {evt.source || 'Care Coordinator Agent'}
                    </strong>
                  </span>
                  {evt.encounterId && (
                    <span>
                      Encounter:{' '}
                      <code className="text-blue-900 font-mono font-medium">
                        {evt.encounterId}
                      </code>
                    </span>
                  )}
                </div>

                {evt.actor && (
                  <span className="inline-flex items-center gap-1 text-slate-600">
                    <UserCheck className="w-3 h-3 text-slate-400" />
                    Triggered by: <strong>{evt.actor}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
