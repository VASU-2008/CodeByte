import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientPortal from './portals/patient/PatientPortal';
import DoctorPortal from './portals/doctor/DoctorPortal';

// Coordinator Portal layout & pages
import CoordinatorLayout from './portals/coordinator/CoordinatorLayout';
import OperationsOverview from './portals/coordinator/pages/OperationsOverview';
import ReminderQueue from './portals/coordinator/pages/ReminderQueue';
import TransportBarriers from './portals/coordinator/pages/TransportBarriers';
import MedicationAdherence from './portals/coordinator/pages/MedicationAdherence';
import FollowupTracking from './portals/coordinator/pages/FollowupTracking';
import EscalationsTasks from './portals/coordinator/pages/EscalationsTasks';
import RulesAndAuditLog from './portals/coordinator/pages/RulesAndAuditLog';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                        <h1>Welcome to Veyora Healthcare Platform</h1>
                        <p>Three separate portals · One connected care journey</p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                            <Link to="/patient"><button style={{ padding: '0.8rem 1.5rem', cursor: 'pointer' }}>Patient Portal</button></Link>
                            <Link to="/doctor"><button style={{ padding: '0.8rem 1.5rem', cursor: 'pointer' }}>Doctor Portal</button></Link>
                            <Link to="/coordinator"><button style={{ padding: '0.8rem 1.5rem', cursor: 'pointer' }}>Coordinator Portal</button></Link>
                        </div>
                    </div>
                } />
                <Route path="/patient/*" element={<PatientPortal />} />
                <Route path="/doctor/*" element={<DoctorPortal />} />

                {/* Coordinator Portal Nested Routes */}
                <Route path="/coordinator" element={<CoordinatorLayout />}>
                    <Route index element={<OperationsOverview />} />
                    <Route path="operations" element={<OperationsOverview />} />
                    <Route path="reminders" element={<ReminderQueue />} />
                    <Route path="transport" element={<TransportBarriers />} />
                    <Route path="medication" element={<MedicationAdherence />} />
                    <Route path="followups" element={<FollowupTracking />} />
                    <Route path="escalations" element={<EscalationsTasks />} />
                    <Route path="audit" element={<RulesAndAuditLog />} />
                </Route>
            </Routes>
        </Router>
    );
}
