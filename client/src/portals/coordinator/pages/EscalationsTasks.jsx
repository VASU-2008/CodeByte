import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { 
  AlertOctagon, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Search, 
  Filter 
} from 'lucide-react';

/**
 * EscalationsTasks (Aura HealthTech Theme - Doctor Portal Aligned)
 * Manual and automated escalation management for coordinators and field teams.
 */
export default function EscalationsTasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

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
    {
      id: 'ESC-04',
      patientName: 'Mohan Lal Verma',
      category: 'Vitals Alert',
      priority: 'Medium',
      description: 'Blood pressure spike 165/98 mmHg recorded via remote sub-centre BP cuff.',
      assignedAsha: 'VeyoraAI Suman Lata',
      status: 'Resolved',
    }
  ]);

  // Sync from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('veyora_coordinator_tasks');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTasks(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed reading coordinator tasks', e);
    }
  }, []);

  const handleResolve = (id) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, status: 'Resolved' } : t));
    setTasks(updated);
    localStorage.setItem('veyora_coordinator_tasks', JSON.stringify(updated));
  };

  const handleReopen = (id) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, status: 'Open' } : t));
    setTasks(updated);
    localStorage.setItem('veyora_coordinator_tasks', JSON.stringify(updated));
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterStatus === 'OPEN') return t.status === 'Open';
    if (filterStatus === 'RESOLVED') return t.status === 'Resolved';
    if (filterStatus === 'HIGH') return t.priority === 'High' && t.status === 'Open';
    return true;
  });

  const openCount = tasks.filter(t => t.status === 'Open').length;
  const highPriorityCount = tasks.filter(t => t.status === 'Open' && t.priority === 'High').length;
  const resolvedCount = tasks.filter(t => t.status === 'Resolved').length;

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
                VeyoraAI Escalation Grid
              </span>
            </div>
            <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
              Escalations & Field Task Assignments
            </h2>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.86rem', color: '#64748b' }}>
              Manual action assignment and triage queue for critical transit barriers, medication dropouts, and urgent outreach.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#64748b' }}>
            <Calendar size={15} color="#64748b" />
            <span>Mon, 13 Jan 2025</span>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
          {/* Active Open Tasks */}
          <div style={{
            background: '#e8f7f2',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#044e42', lineHeight: '1' }}>{openCount}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#044e42', marginTop: '0.35rem' }}>Pending Escalations</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#cceee5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#044e42' }}>
              <Clock size={20} />
            </div>
          </div>

          {/* High Priority Alerts */}
          <div style={{
            background: '#fef2f2',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#dc2626', lineHeight: '1' }}>{highPriorityCount}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#dc2626', marginTop: '0.35rem' }}>High Priority Urgent</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
              <ShieldAlert size={20} />
            </div>
          </div>

          {/* Resolved */}
          <div style={{
            background: '#eff6ff',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1d4ed8', lineHeight: '1' }}>{resolvedCount}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1d4ed8', marginTop: '0.35rem' }}>Resolved Today</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
              <CheckCircle2 size={20} />
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
              placeholder="Search by patient, task ID or reason..."
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
            {['ALL', 'OPEN', 'HIGH', 'RESOLVED'].map((st) => (
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
                {st === 'ALL' ? 'All Tasks' : st === 'OPEN' ? 'Open' : st === 'HIGH' ? 'High Priority' : 'Resolved'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredTasks.length === 0 ? (
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid #eef2f6',
            color: '#64748b',
            fontSize: '0.9rem'
          }}>
            No matching tasks or escalations found.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onResolve={handleResolve}
              onReopen={handleReopen}
            />
          ))
        )}
      </div>
    </div>
  );
}