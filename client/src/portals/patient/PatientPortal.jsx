import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import PatientLayout    from './PatientLayout';
import HomeTab          from './pages/HomeTab';
import IntakeFlow       from './pages/IntakeFlow';
import ConsentQRPass    from './pages/ConsentQRPass';
import MyVisitsHistory  from './pages/MyVisitsHistory';
import VisitResultView  from './pages/VisitResultView';
import FollowupJourney  from './pages/FollowupJourney';
import MedicinesReminders from './pages/MedicinesReminders';
import AICareCoordinator from './pages/AICareCoordinator';

/**
 * PatientPortal — root component for /patient/* routes.
 *
 * Maintains global language state (en | hi) and passes it down to
 * both the layout (sidebar language selector) and all page components.
 */
export default function PatientPortal() {
  const [lang, setLang] = useState('en');

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'var(--font-sans)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
            fontSize: '0.875rem',
          },
        }}
      />
      <Routes>
        <Route element={<PatientLayout lang={lang} onLangChange={setLang} />}>
          <Route index              element={<HomeTab          lang={lang} />} />
          <Route path="ai-coordinator" element={<AICareCoordinator lang={lang} />} />
          <Route path="intake"      element={<IntakeFlow        lang={lang} />} />
          <Route path="qr-pass"     element={<ConsentQRPass     lang={lang} />} />
          <Route path="history"     element={<MyVisitsHistory   lang={lang} />} />
          <Route path="results"     element={<VisitResultView   lang={lang} />} />
          <Route path="followup"    element={<FollowupJourney   lang={lang} />} />
          <Route path="medicines"   element={<MedicinesReminders lang={lang} />} />
          {/* Catch-all: redirect unknown sub-routes to patient home */}
          <Route path="*"           element={<Navigate to="/patient" replace />} />
        </Route>
      </Routes>
    </>
  );
}