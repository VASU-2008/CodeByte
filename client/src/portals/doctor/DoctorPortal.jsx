import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorLayout from './DoctorLayout';
import DoctorDashboard from './pages/DoctorDashboard';
import TokenLookupScan from './pages/TokenLookupScan';
import ClinicalBriefing from './pages/ClinicalBriefing';
import ConsultationNotes from './pages/ConsultationNotes';
import PrescriptionBuilder from './pages/PrescriptionBuilder';
import PlanAndFollowup from './pages/PlanAndFollowup';
import SignOffHandoff from './pages/SignOffHandoff';

/**
 * DoctorPortal Entry Router
 * Mounts all Doctor Portal clinical sub-routes inside DoctorLayout.
 */
export default function DoctorPortal() {
    return (
        <DoctorLayout>
            <Routes>
                <Route path="/" element={<DoctorDashboard />} />
                <Route path="/dashboard" element={<DoctorDashboard />} />
                <Route path="/queue" element={<DoctorDashboard />} />
                <Route path="/scan" element={<TokenLookupScan />} />
                <Route path="/briefing" element={<ClinicalBriefing />} />
                <Route path="/consultation" element={<ConsultationNotes />} />
                <Route path="/prescription" element={<PrescriptionBuilder />} />
                <Route path="/plan" element={<PlanAndFollowup />} />
                <Route path="/sign-off" element={<SignOffHandoff />} />
                <Route path="*" element={<Navigate to="/doctor" replace />} />
            </Routes>
        </DoctorLayout>
    );
}