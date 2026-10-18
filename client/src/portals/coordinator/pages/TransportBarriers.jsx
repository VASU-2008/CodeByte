import React, { useState } from 'react';
import {
  Car,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PhoneCall,
  User,
  ShieldCheck,
  Send,
  Navigation,
  FileCheck,
  Sparkles
} from 'lucide-react';

const INITIAL_TRANSPORT_REQUESTS = [
  {
    id: 'TR-101',
    patientName: 'Meena Sharma',
    patientAge: 52,
    patientPhone: '+91 98231 44521',
    abhaId: 'ABHA-9102-4431-89',
    pickupVillage: 'Rampur Kalan (Ward 3, near Primary School)',
    destinationFacility: 'Rampur Primary Health Centre (CHC Sector)',
    appointmentType: '14-Day Diabetic Retinopathy & Renal Panel',
    barrierReason: 'Gram Panchayat culvert flooded near Narmada tributary; mud route impassable for foot travel.',
    mobilityNeed: 'Requires covered transport (EV Auto / Sumo)',
    status: 'Pending Dispatch',
    driverAssigned: null,
    vehicleNumber: null,
    driverPhone: null,
    dispatchedAt: null,
    voucherNumber: 'GP-VOUCH-882',
    assignedAsha: 'VeyoraAI Kavita Ben (+91 98231 44521)',
  },
  {
    id: 'TR-102',
    patientName: 'Anita Roy',
    patientAge: 38,
    patientPhone: '+91 98231 44521',
    abhaId: 'ABHA-1190-8841-55',
    pickupVillage: 'Durgapur East (Near Anganwadi 02)',
    destinationFacility: 'Belgharia Community Health Centre',
    appointmentType: 'Maternal IV Iron Infusion & Fetal Doppler',
    barrierReason: 'Rural feeder bus canceled due to asphalt repaving on SH-12.',
    mobilityNeed: 'Third Trimester Pregnancy Support',
    status: 'Vehicle Dispatched',
    driverAssigned: 'Mohan Singh',
    vehicleNumber: 'MP-04-TA-4491 (EV Auto)',
    driverPhone: '+91 98221 44510',
    dispatchedAt: '15 mins ago (ETA: 10 mins)',
    voucherNumber: 'GP-VOUCH-810',
    assignedAsha: 'VeyoraAI Kavita Ben (+91 98231 44521)',
  },
  {
    id: 'TR-103',
    patientName: 'Ramu Yadav',
    patientAge: 73,
    patientPhone: '+91 94220 88123',
    abhaId: 'ABHA-4451-2290-01',
    pickupVillage: 'Kalyanpur Gram Panchayat (House #42)',
    destinationFacility: 'District Civil Hospital OPD',
    appointmentType: 'Post-Fracture Hip Orthopedic Follow-up',
    barrierReason: 'Elderly non-ambulatory patient; family has no motorized private conveyance.',
    mobilityNeed: 'Wheelchair / Stretcher Foldable Auto',
    status: 'Pending Dispatch',
    driverAssigned: null,
    vehicleNumber: null,
    driverPhone: null,
    dispatchedAt: null,
    voucherNumber: 'GP-VOUCH-890',
    assignedAsha: 'VeyoraAI Rajeshwari Patel (+91 98210 11234)',
  },
  {
    id: 'TR-104',
    patientName: 'Savita Bai',
    patientAge: 60,
    patientPhone: '+91 98200 44109',
    abhaId: 'ABHA-7781-9902-12',
    pickupVillage: 'Shivgarh Outpost (Sector 4)',
    destinationFacility: 'Shivgarh Sub-centre Dialysis Wing',
    appointmentType: 'Bi-Weekly Hemodialysis Session',
    barrierReason: 'Patient in pain; regular auto union on token strike today.',
    mobilityNeed: 'Immediate Direct Transit',
    status: 'Arrived at Facility',
    driverAssigned: 'Deepak Chouhan',
    vehicleNumber: 'MP-04-E-1022 (VeyoraAI Transit)',
    driverPhone: '+91 99812 33400',
    dispatchedAt: '45 mins ago',
    voucherNumber: 'GP-VOUCH-799',
    assignedAsha: 'VeyoraAI Suman Lata (+91 94112 09873)',
  },
];

export default function TransportBarriers() {
  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('veyora_transport_requests');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_TRANSPORT_REQUESTS;
  });

  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDispatchVehicle = (id) => {
    const drivers = [
      { name: 'Mohan Singh', vehicle: 'MP-04-TA-4491 (EV Auto)', phone: '+91 98221 44510' },
      { name: 'Kailash Verma', vehicle: 'MP-04-TC-8812 (Shared Rural Van)', phone: '+91 98230 77145' },
      { name: 'Satish Kumar', vehicle: 'MP-04-EV-9014 (Kiosk Transit Auto)', phone: '+91 97551 22900' },
    ];
    const picked = drivers[Math.floor(Math.random() * drivers.length)];

    const updated = requests.map((req) => {
      if (req.id === id) {
        return {
          ...req,
          status: 'Vehicle Dispatched',
          driverAssigned: picked.name,
          vehicleNumber: picked.vehicle,
          driverPhone: picked.phone,
          dispatchedAt: 'Just now (ETA: 12-15 mins)',
        };
      }
      return req;
    });

    setRequests(updated);
    try {
      localStorage.setItem('veyora_transport_requests', JSON.stringify(updated));
    } catch (e) {}

    triggerToast(`VeyoraAI Vehicle Assistance Dispatched with driver ${picked.name}`);
  };

  const handleMarkCompleted = (id) => {
    const updated = requests.map((req) => {
      if (req.id === id) {
        return {
          ...req,
          status: 'Arrived at Facility',
        };
      }
      return req;
    });
    setRequests(updated);
    try {
      localStorage.setItem('veyora_transport_requests', JSON.stringify(updated));
    } catch (e) {}
    triggerToast('Patient arrival at clinic logged successfully');
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

      {/* Header Card */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: '#044e42',
            color: '#ffffff',
            padding: '0.75rem 1.25rem',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            fontSize: '0.88rem',
            fontWeight: '600',
          }}
        >
          <CheckCircle2 size={18} color="#a7f3d0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Card */}
      <section
        style={{
          background: '#ffffff',
          borderRadius: '18px',
          padding: '1.75rem',
          border: '1px solid #eef2f6',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
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
                <Car size={13} />
                VeyoraAI Rural Transit Desk
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>MediKiosk Barrier Protocol</span>
            </div>
            <h1 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
              Transport Barrier Intake & Dispatch
            </h1>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#64748b', maxWidth: '650px' }}>
              Autonomous capture of geographic, flood, and connectivity barriers identified during kiosk triage or
              IVR outreach. Authorizes subsidized Gram Panchayat EV vouchers and dispatches driver assistance.
            </p>
          </div>

          <div
            style={{
              padding: '0.6rem 1rem',
              borderRadius: '12px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              fontSize: '0.82rem',
              color: '#64748b',
            }}
          >
            Active Fleet: <strong style={{ color: '#044e42' }}>12 Registered Drivers</strong>
          </div>
        </div>
      </section>

      {/* Request Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
        {requests.map((req) => {
          const isDispatched = req.status === 'Vehicle Dispatched';
          const isArrived = req.status === 'Arrived at Facility';

          return (
            <div
              key={req.id}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #eef2f6',
                boxShadow: isArrived ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.03)',
                padding: '1.5rem',
                opacity: isArrived ? 0.75 : 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: '#0f172a' }}>
                        {req.patientName || req.patient}
                      </h3>
                      {req.patientAge && (
                        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>({req.patientAge}y)</span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                      {req.patientPhone && <span>{req.patientPhone}</span>}
                      {req.voucherNumber && (
                        <>
                          <span>·</span>
                          <span style={{ fontFamily: 'monospace', fontWeight: '600' }}>{req.voucherNumber}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {req.status === 'Pending Dispatch' && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          background: '#fffbeb',
                          border: '1px solid #fef3c7',
                          color: '#b45309',
                        }}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d97706' }} />
                        Pending Dispatch
                      </span>
                    )}
                    {req.status === 'Vehicle Dispatched' && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          background: '#eff6ff',
                          border: '1px solid #dbeafe',
                          color: '#1d4ed8',
                        }}
                      >
                        <Navigation size={12} color="#1d4ed8" />
                        Dispatched
                      </span>
                    )}
                    {req.status === 'Arrived at Facility' && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          background: '#e8f7f2',
                          border: '1px solid #cceee5',
                          color: '#044e42',
                        }}
                      >
                        <CheckCircle2 size={12} color="#044e42" />
                        Arrived
                      </span>
                    )}
                  </div>
                </div>

                {/* Route Box */}
                {(req.pickupVillage || req.location) && (
                  <div
                    style={{
                      background: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px solid #eef2f6',
                      padding: '0.75rem 0.85rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                      fontSize: '0.78rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', color: '#334155' }}>
                      <MapPin size={14} color="#044e42" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <span style={{ color: '#64748b', fontWeight: '500' }}>Pickup: </span>
                        <strong style={{ color: '#0f172a' }}>{req.pickupVillage || req.location}</strong>
                      </div>
                    </div>
                    {req.destinationFacility && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', color: '#334155' }}>
                        <Navigation size={14} color="#1d4ed8" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <span style={{ color: '#64748b', fontWeight: '500' }}>Destination: </span>
                          <strong style={{ color: '#0f172a' }}>{req.destinationFacility}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Reason & Need */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem' }}>
                  {req.barrierReason && (
                    <div
                      style={{
                        background: '#fffbeb',
                        border: '1px solid #fef3c7',
                        borderRadius: '10px',
                        padding: '0.65rem 0.85rem',
                        color: '#92400e',
                      }}
                    >
                      <strong style={{ color: '#78350f' }}>Barrier: </strong>
                      <span>{req.barrierReason}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    {req.mobilityNeed && (
                      <span>Need: <strong style={{ color: '#0f172a' }}>{req.mobilityNeed}</strong></span>
                    )}
                    {req.appointmentType && (
                      <span>Goal: <strong style={{ color: '#0f172a' }}>{req.appointmentType}</strong></span>
                    )}
                  </div>
                </div>

                {/* Driver Info if Dispatched */}
                {isDispatched && (
                  <div
                    style={{
                      background: '#e8f7f2',
                      border: '1px solid #cceee5',
                      borderRadius: '12px',
                      padding: '0.75rem 0.85rem',
                      fontSize: '0.78rem',
                      color: '#065f46',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Car size={14} color="#044e42" />
                        Driver Assigned: {req.driverAssigned || req.driver}
                      </span>
                      {req.dispatchedAt && (
                        <span style={{ fontSize: '0.72rem', color: '#044e42', fontWeight: '500' }}>
                          {req.dispatchedAt}
                        </span>
                      )}
                    </div>
                    {req.vehicleNumber && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#044e42' }}>
                        <span>Vehicle: {req.vehicleNumber}</span>
                        {req.driverPhone && (
                          <a
                            href={`tel:${req.driverPhone}`}
                            style={{ color: '#044e42', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                          >
                            <PhoneCall size={11} /> {req.driverPhone}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div
                style={{
                  paddingTop: '0.85rem',
                  marginTop: '0.85rem',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  {req.assignedAsha || 'VeyoraAI Assistance Desk'}
                </span>

                <div>
                  {!isDispatched && !isArrived && (
                    <button
                      onClick={() => handleDispatchVehicle(req.id)}
                      style={{
                        background: '#044e42',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        boxShadow: '0 2px 6px rgba(4, 78, 66, 0.2)',
                      }}
                    >
                      <Send size={12} color="#ffffff" />
                      Dispatch Vehicle
                    </button>
                  )}

                  {isDispatched && (
                    <button
                      onClick={() => handleMarkCompleted(req.id)}
                      style={{
                        background: '#e8f7f2',
                        color: '#044e42',
                        border: '1px solid #cceee5',
                        borderRadius: '10px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <CheckCircle2 size={13} color="#044e42" />
                      Mark Arrived
                    </button>
                  )}

                  {isArrived && (
                    <span style={{ fontSize: '0.75rem', color: '#044e42', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <CheckCircle2 size={13} color="#044e42" />
                      Transit Complete
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}