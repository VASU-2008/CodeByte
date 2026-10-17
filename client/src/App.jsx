import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import PatientPortal from './portals/patient/PatientPortal';
import DoctorPortal from './portals/doctor/DoctorPortal';
import CoordinatorPortal from './portals/coordinator/CoordinatorPortal';

export default function App() {
    return (
        <Router>
            <Navbar />
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
                <Route path="/coordinator/*" element={<CoordinatorPortal />} />
            </Routes>
        </Router>
    );
}