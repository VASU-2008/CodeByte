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
      <section
        style={{
          background: '#ffffff',
          borderRadius: '18px',
          padding: '1.75rem',
          border: '1px solid #eef2f6',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span
                style={{
                  background: '#e6f7f2',
                  color: '#044e42',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <Sparkles size={13} />
                VeyoraAI Node Online
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Care Continuity Engine</span>
            </div>
            <h1 style={{ margin: 0, fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>
              Operations Overview & Triage Queue
            </h1>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#64748b', maxWidth: '600px' }}>
              Real-time monitoring of rural patient barriers, missed medication telemetry, and 30-min reminder responses.
            </p>

            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setStatusFilter('ACTIVE')}
                style={{
                  background: '#044e42',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 2px 8px rgba(4, 78, 66, 0.25)',
                  transition: 'all 0.15s ease',
                }}
              >
                <Activity size={16} />
                Triage Active Escalations
                <ArrowRight size={15} />
              </button>

              <button
                onClick={handleResetDemo}
                style={{
                  background: '#f8fafc',
                  color: '#475569',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '0.6rem 1rem',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <RotateCcw size={14} color="#64748b" />
                Reset Demo Data
              </button>
            </div>
          </div>

          {/* Active Escalations Live Badge */}
          <div
            style={{
              background: '#fffbeb',
              border: '1px solid #fef3c7',
              borderRadius: '16px',
              padding: '1.1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#d97706', boxShadow: '0 0 8px rgba(217, 119, 6, 0.6)' }} />
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Pending Review
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#b45309', lineHeight: 1.1 }}>
                {activeCount} Actions Required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Metric Summary Cards (Matches Doctor Portal Pattern) */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem',
        }}
      >
        <div
          onClick={() => setCategoryFilter('ALL')}
          style={{
            background: '#fffbeb',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#b45309', lineHeight: '1' }}>
              {activeCount}
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#b45309', marginTop: '0.35rem' }}>
              Urgent Escalations
            </div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309' }}>
            <AlertTriangle size={20} />
          </div>
        </div>

        <div
          onClick={() => setCategoryFilter('transport')}
          style={{
            background: '#eff6ff',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1d4ed8', lineHeight: '1' }}>
              {transportCount}
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1d4ed8', marginTop: '0.35rem' }}>
              Transport Barriers
            </div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
            <Car size={20} />
          </div>
        </div>

        <div
          onClick={() => setCategoryFilter('medication')}
          style={{
            background: '#faf5ff',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#7e22ce', lineHeight: '1' }}>
              {medicationCount}
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#7e22ce', marginTop: '0.35rem' }}>
              Missed Doses
            </div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7e22ce' }}>
            <Pill size={20} />
          </div>
        </div>

        <div
          onClick={() => setStatusFilter('RESOLVED')}
          style={{
            background: '#e8f7f2',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#044e42', lineHeight: '1' }}>
              {resolvedCount}
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#044e42', marginTop: '0.35rem' }}>
              Resolved Today
            </div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#cceee5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
            <CheckCircle2 size={20} />
          </div>
        </div>
      </section>

      {/* Filter and Search Bar (Matches Doctor Portal Pattern) */}
      <section
        style={{
          background: '#ffffff',
          borderRadius: '18px',
          padding: '1.25rem 1.75rem',
          border: '1px solid #eef2f6',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '0.6rem 0.9rem',
              flex: 1,
              maxWidth: '480px',
            }}
          >
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by patient, VeyoraAI agent, or village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '0.88rem',
                color: '#1e293b',
                width: '100%',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: '#f1f5f9',
              padding: '0.3rem',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: '600',
            }}
          >
            <button
              onClick={() => setStatusFilter('ALL')}
              style={{
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 0.85rem',
                cursor: 'pointer',
                background: statusFilter === 'ALL' ? '#ffffff' : 'transparent',
                color: statusFilter === 'ALL' ? '#0f172a' : '#64748b',
                boxShadow: statusFilter === 'ALL' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                fontWeight: statusFilter === 'ALL' ? '700' : '500',
                transition: 'all 0.15s ease',
              }}
            >
              All ({tasks.length})
            </button>
            <button
              onClick={() => setStatusFilter('ACTIVE')}
              style={{
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 0.85rem',
                cursor: 'pointer',
                background: statusFilter === 'ACTIVE' ? '#ffffff' : 'transparent',
                color: statusFilter === 'ACTIVE' ? '#b45309' : '#64748b',
                boxShadow: statusFilter === 'ACTIVE' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                fontWeight: statusFilter === 'ACTIVE' ? '700' : '500',
                transition: 'all 0.15s ease',
              }}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter('RESOLVED')}
              style={{
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 0.85rem',
                cursor: 'pointer',
                background: statusFilter === 'RESOLVED' ? '#ffffff' : 'transparent',
                color: statusFilter === 'RESOLVED' ? '#044e42' : '#64748b',
                boxShadow: statusFilter === 'RESOLVED' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                fontWeight: statusFilter === 'RESOLVED' ? '700' : '500',
                transition: 'all 0.15s ease',
              }}
            >
              Resolved ({resolvedCount})
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600', marginRight: '4px' }}>
            Category:
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
              style={{
                border: categoryFilter === cat.id ? 'none' : '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '0.35rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: categoryFilter === cat.id ? '700' : '500',
                cursor: 'pointer',
                background: categoryFilter === cat.id ? '#044e42' : '#f8fafc',
                color: categoryFilter === cat.id ? '#ffffff' : '#475569',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease',
              }}
            >
              {cat.icon && <cat.icon size={13} />}
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