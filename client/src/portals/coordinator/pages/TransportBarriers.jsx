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
      <section className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-100 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800 border border-amber-200">
                <Car className="w-3.5 h-3.5 text-[#d97706]" />
                VeyoraAI Rural Transit Desk
              </span>
              <span className="text-xs text-slate-400 font-medium">MediKiosk Barrier Protocol</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              Transport Barrier Intake & Dispatch
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              Autonomous capture of geographic, flood, and connectivity barriers identified during kiosk triage or
              IVR outreach. Authorizes subsidized Gram Panchayat EV vouchers and dispatches VeyoraAI driver assistance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs text-xs">
              <span className="text-slate-500">Active VeyoraAI Fleet: </span>
              <strong className="text-blue-600 font-bold">12 Registered Drivers</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Request Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {requests.map((req) => {
          const isDispatched = req.status === 'Vehicle Dispatched';
          const isArrived = req.status === 'Arrived at Facility';

          return (
            <div
              key={req.id}
              className={`rounded-3xl transition-all p-6 border flex flex-col justify-between ${
                isArrived
                  ? 'bg-white/60 border-slate-200/60 opacity-75'
                  : 'bg-white border-slate-100 shadow-xs hover:shadow-md'
              }`}
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900 font-display">
                        {req.patientName || req.patient}
                      </h3>
                      {req.patientAge && (
                        <span className="text-xs text-slate-500">({req.patientAge}y)</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      {req.patientPhone && <span>Phone: {req.patientPhone}</span>}
                      {req.voucherNumber && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span className="font-mono text-[11px] text-slate-400">{req.voucherNumber}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {req.status === 'Pending Dispatch' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] animate-pulse"></span>
                        Pending Dispatch
                      </span>
                    )}
                    {req.status === 'Vehicle Dispatched' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                        <Navigation className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                        Dispatched
                      </span>
                    )}
                    {req.status === 'Arrived at Facility' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Arrived
                      </span>
                    )}
                  </div>
                </div>

                {/* Route Pill Box */}
                {(req.pickupVillage || req.location) && (
                  <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-slate-700">
                      <MapPin className="w-4 h-4 text-[#d97706] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 font-medium">Pickup: </span>
                        <span className="font-medium text-slate-800">{req.pickupVillage || req.location}</span>
                      </div>
                    </div>
                    {req.destinationFacility && (
                      <div className="flex items-start gap-2 text-slate-700">
                        <Navigation className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 font-medium">Drop: </span>
                          <span className="font-medium text-slate-800">{req.destinationFacility}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Reason & Need */}
                <div className="space-y-2 text-xs">
                  {req.barrierReason && (
                    <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-200 text-amber-900">
                      <strong className="text-amber-950">Barrier Description: </strong>
                      <span>{req.barrierReason}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-slate-600">
                    {req.mobilityNeed && (
                      <span>
                        Need: <strong>{req.mobilityNeed}</strong>
                      </span>
                    )}
                    {req.appointmentType && (
                      <span>
                        Goal: <strong className="text-slate-800">{req.appointmentType}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Driver Info if Dispatched */}
                {isDispatched && (
                  <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-200 space-y-1.5 text-xs text-blue-950">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        <Car className="w-4 h-4 text-blue-600" />
                        Driver Assigned: {req.driverAssigned || req.driver}
                      </span>
                      {req.dispatchedAt && (
                        <span className="text-[11px] text-blue-800 font-normal">
                          {req.dispatchedAt}
                        </span>
                      )}
                    </div>
                    {req.vehicleNumber && (
                      <div className="flex items-center justify-between text-blue-800">
                        <span>Vehicle: {req.vehicleNumber}</span>
                        {req.driverPhone && (
                          <a
                            href={`tel:${req.driverPhone}`}
                            className="font-medium text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <PhoneCall className="w-3 h-3" /> {req.driverPhone}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">
                  {req.assignedAsha || 'VeyoraAI Assistance Desk'}
                </span>

                <div className="flex items-center gap-2">
                  {!isDispatched && !isArrived && (
                    <button
                      onClick={() => handleDispatchVehicle(req.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                      Dispatch VeyoraAI Vehicle Assistance
                    </button>
                  )}

                  {isDispatched && (
                    <button
                      onClick={() => handleMarkCompleted(req.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Mark Arrived at Facility
                    </button>
                  )}

                  {isArrived && (
                    <span className="text-xs text-emerald-700 font-medium inline-flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
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
  );
}