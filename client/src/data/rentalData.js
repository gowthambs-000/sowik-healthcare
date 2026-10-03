export const RENTAL_CATEGORIES = [
  'Respiratory',
  'Monitoring',
  'Beds & Mattresses',
  'Mobility',
  'Rehabilitation',
  'Accessories'
];

// Images are read from public/rentals/<file>.jpg  (served at /rentals/<file>.jpg).
// Prices are per month (INR).
export const RENTALS = [
  { _id: 'r2', name: 'BP Monitor', category: 'Monitoring', price: 1999, description: 'Accurate digital upper-arm blood pressure and pulse rate monitor.', image: '/rentals/bp-monitor.jpg' },
  { _id: 'r3', name: '2 Function Manual Fowler Bed with Side Rail & Mattress', category: 'Beds & Mattresses', price: 2599, description: 'Dual-crank fowler bed with collapsible safety rails and medical-grade mattress.', image: '/rentals/manual-fowler-bed.jpg' },
  { _id: 'r12', name: 'Standard Foldable Wheelchair, Chrome-Plated M-Steel Frame', category: 'Mobility', price: 3999, description: 'Durable, easy-to-fold manual wheelchair with puncture-proof tires and padded armrests.', image: '/rentals/foldable-wheelchair.jpg' },
  { _id: 'r6', name: 'Patient Bedside Monitor (5 Parameters: ECG, NIBP, PR)', category: 'Monitoring', price: 12999, description: 'Multi-parameter bedside vital monitor tracking ECG, SpO2, NIBP, pulse and temp.', image: '/rentals/bedside-monitor.jpg' },
  { _id: 'r16', name: 'Oxygen Concentrator 5L', category: 'Respiratory', price: 4000, description: 'Continuous 5 litre per minute oxygen supply for home use, with no refilling needed.', image: '/rentals/oxygen-concentrator-5l.jpg' },
  { _id: 'r1', name: 'Portable Phlegm Suction Machine (Oil-Free)', category: 'Respiratory', price: 1999, description: 'Compact, oil-free medical aspirator for airway clearing and mucous removal.', image: '/rentals/suction-machine.jpg' },
  { _id: 'r9', name: '3 Function Electric Fowler Cot/Bed with Wheels', category: 'Beds & Mattresses', price: 9999, description: 'Motorized hospital bed with handheld remote control, locking castors, and head/leg tilt.', image: '/rentals/electric-fowler-bed.jpg' },
  { _id: 'r8', name: 'CPM Machine for Knee Rehabilitation', category: 'Rehabilitation', price: 10999, description: 'Continuous Passive Motion device for knee joint mobility after replacement surgery.', image: '/rentals/cpm-machine.jpg' },
  { _id: 'r5', name: 'Saline Infusion IV Stand', category: 'Accessories', price: 399, description: 'Heavy base stainless steel IV pole with adjustable height and multiple hooks.', image: '/rentals/iv-stand.jpg' },
  { _id: 'r17', name: 'Oxygen Concentrator 10L', category: 'Respiratory', price: 5500, description: 'High-flow 10 litre per minute oxygen concentrator for patients needing higher oxygen support.', image: '/rentals/oxygen-concentrator-10l.jpg' },
  { _id: 'r14', name: 'Foldable Motorized / Electric Wheelchair', category: 'Mobility', price: 13999, description: 'Joystick-controlled powered wheelchair with rechargeable battery and electromagnetic brakes.', image: '/rentals/electric-wheelchair.jpg' },
  { _id: 'r4', name: 'Portable Ripple Air Bed for Pressure Sore & Ulcer Prevention', category: 'Beds & Mattresses', price: 2399, description: 'Alternating pressure bubble pad with ultra-silent air compressor pump.', image: '/rentals/ripple-air-bed.jpg' },
  { _id: 'r10', name: 'BiPAP AVAPS with Humidifier & Ramp (Bangalore only)', category: 'Respiratory', price: 6999, description: 'Non-invasive ventilator with heated humidifier and automatic volume-assured pressure support.', image: '/rentals/bipap-avaps.jpg' },
  { _id: 'r18', name: 'Oxygen Cylinder 10 L', category: 'Respiratory', price: 2000, description: 'Medical oxygen cylinder with regulator for backup or emergency oxygen at home.', image: '/rentals/oxygen-cylinder-10l.jpg' },
  { _id: 'r7', name: 'DVT Pump Compression Therapy Unit (Air Pressure Massager)', category: 'Rehabilitation', price: 9999, description: 'Intermittent pneumatic compression pump to prevent deep vein thrombosis in bedridden recovery.', image: '/rentals/dvt-pump.jpg' },
  { _id: 'r13', name: 'Tilt-in-Space Positioning Wheelchair (Invacare Rea Clematis Pro)', category: 'Mobility', price: 9999, description: 'Reclining and tilting ergonomic wheelchair for pressure relief and postural support.', image: '/rentals/tilt-wheelchair.jpg' },
  { _id: 'r11', name: 'Auto CPAP Machine with EPR, Humidifier & AutoRamp', category: 'Respiratory', price: 6999, description: 'Quiet positive airway pressure system for sleep apnea with expiratory pressure relief.', image: '/rentals/auto-cpap.jpg' },
  { _id: 'r15', name: 'Walkie Stair, Premium Lightweight', category: 'Mobility', price: 999, description: 'Lightweight aluminum mobility step-up assist frame for safe home walking and navigation.', image: '/rentals/walkie-stair.jpg' }
];