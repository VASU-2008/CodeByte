import React from 'react';

export default function DoctorPortal() {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>Doctor Portal (Clinician Workspace)</h2>
            <p>Assigned to: <strong>Member 3</strong></p>
            <ul>
                <li>Today's Queue & Token Lookup/Scan</li>
                <li>Clinical Briefing (Past Visits & Allergies)</li>
                <li>Consultation Notes & Vitals</li>
                <li>Multi-drug e-Rx Prescription & Sign-off</li>
            </ul>
        </div>
    );
}