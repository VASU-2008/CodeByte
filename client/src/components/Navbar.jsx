import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav style={{ padding: '1rem', background: '#0f172a', color: '#fff', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <strong style={{ fontSize: '1.2rem', color: '#38bdf8' }}>Veyora Healthcare</strong>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
            <Link to="/patient" style={{ color: '#93c5fd', textDecoration: 'none' }}>Patient Portal</Link>
            <Link to="/doctor" style={{ color: '#86efac', textDecoration: 'none' }}>Doctor Portal</Link>
            <Link to="/coordinator" style={{ color: '#fde047', textDecoration: 'none' }}>AI Coordinator Portal</Link>
        </nav>
    );
}