import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';

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
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Patient Portal (Protected: Patient, Doctor, Coordinator) */}
        <Route
          path="/patient/*"
          element={
            <ProtectedRoute allowedRoles={['patient', 'doctor', 'coordinator']}>
              <PatientPortal />
            </ProtectedRoute>
          }
        />

        {/* Doctor Portal (Protected: Doctor) */}
        <Route
          path="/doctor/*"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorPortal />
            </ProtectedRoute>
          }
        />

        {/* Coordinator Portal (Protected: Coordinator, Doctor) */}
        <Route
          path="/coordinator"
          element={
            <ProtectedRoute allowedRoles={['coordinator', 'doctor']}>
              <CoordinatorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OperationsOverview />} />
          <Route path="operations" element={<OperationsOverview />} />
          <Route path="reminders" element={<ReminderQueue />} />
          <Route path="transport" element={<TransportBarriers />} />
          <Route path="medication" element={<MedicationAdherence />} />
          <Route path="followups" element={<FollowupTracking />} />
          <Route path="escalations" element={<EscalationsTasks />} />
          <Route path="audit" element={<RulesAndAuditLog />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
