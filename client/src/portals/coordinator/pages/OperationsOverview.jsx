import React, { useState, useEffect, useMemo } from 'react';
import TaskCard from '../components/TaskCard';
import {
  AlertTriangle,
  Car,
  Pill,
  PhoneMissed,
  Activity,
  CheckCircle2,
  RotateCcw,
  Search,
  Filter,
  Sparkles,
  Check,
  Calendar,
  ArrowRight
} from 'lucide-react';

const INITIAL_OPERATIONS_TASKS = [
  {
    id: 'TASK-101',
    patientName: 'Meena Sharma',
    patientAge: 52,
    patientGender: 'Female',
    abhaId: 'ABHA-9102-4431-89',
    tokenNumber: 'TK-842',
    village: 'Rampur Kalan (Ward 3)',
    category: 'transport',
    categoryLabel: 'Transport Barrier Assistance',
    priority: 'High',
    title: 'Rural River Crossing Impassable · Critical Follow-up Transport Needed',
    description:
      'Gram Panchayat culvert flooded near Narmada tributary. Patient unable to walk 6km to Primary Health Centre for mandatory 14-day Diabetic Retinopathy review & renal panel.',
    actionRequired:
      'Dispatch Gram Panchayat EV-Auto voucher #AP-44 or coordinate with local VeyoraAI for subsidized shared rural transit.',
    assignedAsha: 'VeyoraAI Kavita Ben',
    ashaPhone: '+91 98231 44521',
    ashaSector: 'Sub-Centre Rampur',
    timestamp: '12 mins ago',
    encounterId: 'ENC-8821',
    status: 'Active',
    resolvedAt: null,
    resolutionNote: '',
  },
  {
    id: 'TASK-102',
    patientName: 'Ramesh Kumar',
    patientAge: 61,
    patientGender: 'Male',
    abhaId: 'ABHA-3312-7809-12',
    tokenNumber: 'TK-819',
    village: 'Shivgarh Sub-division',
    category: 'medication',
    categoryLabel: 'Medication Adherence (2 Missed Doses)',
    priority: 'High',
    title: '2-Missed-Dose Alert: Telmisartan 40mg + Metformin 500mg',
    description:
      'VeyoraAI smart blister dispenser detected zero activity for 48 consecutive hours. Patient flagged high baseline BP (162/98 mmHg) during prior kiosk triage.',
    actionRequired:
      'Immediate in-person VeyoraAI verification call to confirm pill intake, evaluate gastrointestinal tolerance, and replenish dosage strip.',
    assignedAsha: 'VeyoraAI Suman Lata',
    ashaPhone: '+91 94112 09873',
    ashaSector: 'Ward 8 Shivgarh',
    timestamp: '28 mins ago',
    encounterId: 'ENC-7814',
    status: 'Active',
    resolvedAt: null,
    resolutionNote: '',
  },
  {
    id: 'TASK-103',
    patientName: 'Sunita Devi',
    patientAge: 44,
    patientGender: 'Female',
    abhaId: 'ABHA-6651-9920-33',
    tokenNumber: 'TK-855',
    village: 'Belgharia Village',
    category: 'reminder',
    categoryLabel: 'Unresponsive IVR Reminder',
    priority: 'High',
    title: '3 Unanswered Automated Call Reminders for Post-Op Wound Inspection',
    description:
      'Autonomous IVR voice reminders at T-48h, T-24h, and T-6h failed to connect (call dropped after 2 rings / network congestion). Surgical dressing change is overdue by 36 hours.',
    actionRequired:
      'Switch communication protocol to secondary contact (daughter: Priya Devi) or trigger emergency SMS flash alert with direct coordinator callback link.',
    assignedAsha: 'VeyoraAI Pooja Verma',
    ashaPhone: '+91 97721 55642',
    ashaSector: 'Sector 2 Belgharia',
    timestamp: '45 mins ago',
    encounterId: 'ENC-9042',
    status: 'Active',
    resolvedAt: null,
    resolutionNote: '',
  },
  {
    id: 'TASK-104',
    patientName: 'Mohan Lal Verma',
    patientAge: 68,
    patientGender: 'Male',
    abhaId: 'ABHA-4481-2290-77',
    tokenNumber: 'TK-790',
    village: 'Kalyanpur GP',
    category: 'vitals',
    categoryLabel: 'Vitals Anomaly Triage',
    priority: 'Critical',
    title: 'Post-Discharge Blood Pressure Surge (174/104 mmHg)',
    description:
      'MediKiosk remote telemetry captured Stage 2 hypertensive urgency during routine kiosk check-in. Teleconsultation recommended within 2 hours.',
    actionRequired:
      'Escalate encounter to On-Duty Teleconsult Physician Dr. A. Sen and alert VeyoraAI worker with portable digital sphygmomanometer.',
    assignedAsha: 'VeyoraAI Rajeshwari Patel',
    ashaPhone: '+91 98210 11234',
    ashaSector: 'Kalyanpur Health Post',
    timestamp: '1 hr ago',
    encounterId: 'ENC-6510',
    status: 'Active',
    resolvedAt: null,
    resolutionNote: '',
  },
  {
    id: 'TASK-105',
    patientName: 'Anita Roy',
    patientAge: 38,
    patientGender: 'Female',
    abhaId: 'ABHA-1190-8841-55',
    tokenNumber: 'TK-774',
    village: 'Durgapur East',
    category: 'transport',
    categoryLabel: 'Transport Barrier Assistance',
    priority: 'Medium',
    title: 'Maternal Iron Infusion Transport Coordination',
    description:
      'Third trimester high-risk anemia patient requires safe transit to CHC for scheduled ferric carboxymaltose injection. Bus service suspended due to road repaving.',
    actionRequired:
      'Validate local subsidized transport partner and link patient family with VeyoraAI transit pass.',
    assignedAsha: 'VeyoraAI Kavita Ben',
    ashaPhone: '+91 98231 44521',
    ashaSector: 'Sub-Centre Rampur',
    timestamp: '2 hrs ago',
    encounterId: 'ENC-8119',
    status: 'Active',
    resolvedAt: null,
    resolutionNote: '',
  },
  {
    id: 'TASK-106',
    patientName: 'Harish Chandra',
    patientAge: 59,
    patientGender: 'Male',
    abhaId: 'ABHA-7742-1109-88',
    tokenNumber: 'TK-751',
    village: 'Rampur Kalan',
    category: 'medication',
    categoryLabel: 'Medication Adherence (2 Missed Doses)',
    priority: 'Medium',
    title: 'Missed Anticoagulant Dose Following Stent Placement',
    description:
      'Smart dispenser telemetry logged missed evening Clopidogrel 75mg. Patient was unreachable on primary phone line.',
    actionRequired:
      'Contact neighbor / VeyoraAI to verify compliance and provide medication reassurance.',
    assignedAsha: 'VeyoraAI Suman Lata',
    ashaPhone: '+91 94112 09873',
    ashaSector: 'Ward 8 Shivgarh',
    timestamp: '3 hrs ago',
    encounterId: 'ENC-7120',
    status: 'Resolved',
    resolvedAt: '1 hr ago',
    resolutionNote: 'VeyoraAI Suman visited home. Patient took tablet with dinner; phone was on silent mode.',
  },
];

export default function OperationsOverview() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('veyora_coordinator_tasks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_OPERATIONS_TASKS;
  });

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync tasks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('veyora_coordinator_tasks', JSON.stringify(tasks));
      window.dispatchEvent(new Event('veyora_tasks_updated'));
    } catch (e) {}
  }, [tasks]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const activeCount = useMemo(() => tasks.filter((t) => t.status === 'Active').length, [tasks]);
  const resolvedCount = useMemo(() => tasks.filter((t) => t.status === 'Resolved').length, [tasks]);
  const transportCount = useMemo(
    () => tasks.filter((t) => t.category === 'transport' && t.status === 'Active').length,
    [tasks]
  );
  const medicationCount = useMemo(
    () => tasks.filter((t) => t.category === 'medication' && t.status === 'Active').length,
    [tasks]
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (statusFilter === 'ACTIVE' && task.status !== 'Active') return false;
      if (statusFilter === 'RESOLVED' && task.status !== 'Resolved') return false;
      if (categoryFilter !== 'ALL' && task.category !== categoryFilter) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = (task.patientName || '').toLowerCase().includes(query);
        const matchesAsha = (task.assignedAsha || '').toLowerCase().includes(query);
        const matchesVillage = (task.village || '').toLowerCase().includes(query);
        const matchesDesc = (task.description || '').toLowerCase().includes(query);
        const matchesTitle = (task.title || '').toLowerCase().includes(query);
        if (!matchesName && !matchesAsha && !matchesVillage && !matchesDesc && !matchesTitle) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, statusFilter, categoryFilter, searchQuery]);

  const handleResolveTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: 'Resolved',
            resolvedAt: 'Just now',
            resolutionNote: 'Action logged and resolved by Care Coordinator.',
          };
        }
        return t;
      })
    );
    const item = tasks.find((t) => t.id === taskId);
    triggerToast(`Task for ${item?.patientName || 'Patient'} marked as Resolved`);
  };

  const handleReopenTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: 'Active',
            resolvedAt: null,
            resolutionNote: '',
          };
        }
        return t;
      })
    );
    triggerToast('Task reopened and returned to Active Escalation Queue');
  };

  const handleResetDemo = () => {
    setTasks(INITIAL_OPERATIONS_TASKS);
    setStatusFilter('ALL');
    setCategoryFilter('ALL');
    setSearchQuery('');
    triggerToast('Demo state re-initialized to PRD baseline');
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700/60 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Hero Header Card */}
      <section className="rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-slate-100 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Veyora Healthcare · VeyoraAI
              </span>
              <span className="text-xs text-slate-400 font-medium">Care Continuity Engine</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                Good morning! 👋
              </h1>
              <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-xl">
                Your clinic operations queue is active. You have {activeCount} high-priority patient escalations requiring attention today.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setStatusFilter('ACTIVE')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs active:scale-95"
              >
                <Activity className="w-4 h-4" />
                Triage Active Escalations
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={handleResetDemo}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                Reset Demo Data
              </button>
            </div>
          </div>

          {/* Active Escalations Live Badge */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="px-5 py-4 rounded-3xl bg-amber-500/10 border border-amber-200/80 shadow-xs flex items-center gap-4">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#d97706]"></span>
              </span>
              <div>
                <div className="text-[11px] font-semibold text-amber-900 uppercase tracking-wider">
                  Active Escalations
                </div>
                <div className="text-xl font-bold text-[#d97706] leading-none mt-0.5">
                  {activeCount} {activeCount === 1 ? 'Action Required' : 'Actions Required'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Nav Metric Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setCategoryFilter('ALL')}
          className="rounded-3xl bg-white p-5 border border-slate-100 shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center space-y-2.5"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#d97706] flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">{activeCount} Urgent</div>
            <div className="text-xs text-slate-500 font-medium">Active Escalations</div>
          </div>
        </div>

        <div
          onClick={() => setCategoryFilter('transport')}
          className="rounded-3xl bg-white p-5 border border-slate-100 shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center space-y-2.5"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">{transportCount} Requests</div>
            <div className="text-xs text-slate-500 font-medium">Transport Barriers</div>
          </div>
        </div>

        <div
          onClick={() => setCategoryFilter('medication')}
          className="rounded-3xl bg-white p-5 border border-slate-100 shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center space-y-2.5"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">{medicationCount} Alerts</div>
            <div className="text-xs text-slate-500 font-medium">Missed Doses</div>
          </div>
        </div>

        <div
          onClick={() => setStatusFilter('RESOLVED')}
          className="rounded-3xl bg-white p-5 border border-slate-100 shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center space-y-2.5"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">{resolvedCount} Completed</div>
            <div className="text-xs text-slate-500 font-medium">Resolved Today</div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="rounded-3xl bg-white p-5 border border-slate-100 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by patient, VeyoraAI agent, or village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/60 text-xs font-semibold">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                statusFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({tasks.length})
            </button>
            <button
              onClick={() => setStatusFilter('ACTIVE')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                statusFilter === 'ACTIVE'
                  ? 'bg-white text-[#d97706] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
              Active ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter('RESOLVED')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                statusFilter === 'RESOLVED'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Check className="w-3 h-3 text-emerald-600" />
              Resolved ({resolvedCount})
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {[
            { id: 'ALL', label: 'All Categories' },
            { id: 'transport', label: 'Transport Barriers', icon: Car },
            { id: 'medication', label: 'Medication Adherence', icon: Pill },
            { id: 'reminder', label: 'IVR Reminders', icon: PhoneMissed },
            { id: 'vitals', label: 'Vitals & Telemetry', icon: Activity },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
                categoryFilter === cat.id
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
              }`}
            >
              {cat.icon && <cat.icon className="w-3 h-3" />}
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Task Queue List using Reusable TaskCard */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-display font-bold text-slate-900">
              Operations Task Queue
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-semibold">
              {filteredTasks.length} cases
            </span>
          </div>
          <span className="text-xs text-slate-400">VeyoraAI Operational Feed</span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center space-y-3 border border-slate-100">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-slate-900">All Escalations Resolved</h4>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              No tasks currently match this filter. Every patient barrier in this view has been addressed!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onResolve={handleResolveTask}
                onReopen={handleReopenTask}
                onCallAsha={(t) => triggerToast(`Initiating coordinator call to VeyoraAI: ${t.assignedAsha}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}