import React, { useState } from 'react';
import TaskCard from '../components/TaskCard';
import { AlertOctagon, Sparkles } from 'lucide-react';

export default function EscalationsTasks() {
  const [tasks, setTasks] = useState([
    {
      id: 'ESC-01',
      patientName: 'Meena Sharma',
      category: 'Transport Barrier',
      priority: 'High',
      description: 'Vehicle needed for rural PHC follow-up. Flooded culvert on river route.',
      assignedAsha: 'VeyoraAI Volunteer #3',
      status: 'Open',
    },
    {
      id: 'ESC-02',
      patientName: 'Ramesh Kumar',
      category: 'Medication Adherence',
      priority: 'High',
      description: 'Missed 2 consecutive doses of Metformin 500mg. Smart blister alert.',
      assignedAsha: 'VeyoraAI Desk A',
      status: 'Open',
    },
    {
      id: 'ESC-03',
      patientName: 'Sunita Devi',
      category: 'Reminder Outreach',
      priority: 'High',
      description: '3 unanswered automated reminder calls for wound care check.',
      assignedAsha: 'VeyoraAI Pooja Verma',
      status: 'Open',
    },
  ]);

  const handleResolve = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: 'Resolved' } : t)));
  };

  const handleReopen = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: 'Open' } : t)));
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-100 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            VeyoraAI Escalation Grid
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
          Escalations & Task Assignment
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Manual task allocation and resolution tracking for human coordinators and VeyoraAI field workers.
        </p>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onResolve={handleResolve}
            onReopen={handleReopen}
          />
        ))}
      </div>
    </div>
  );
}