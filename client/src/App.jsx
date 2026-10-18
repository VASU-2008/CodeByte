import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';

import PatientPortal from './portals/patient/PatientPortal';
import DoctorPortal from './portals/doctor/DoctorPortal';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Patient Portal (Protected: Patient, Doctor) */}
        <Route
          path="/patient/*"
          element={
            <ProtectedRoute allowedRoles={['patient', 'doctor']}>
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

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
