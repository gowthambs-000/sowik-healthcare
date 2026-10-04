export const PHONE = '+91 88845 11711';
export const PHONE_TEL = 'tel:+91 88845 11711';
export const WHATSAPP = 'https://wa.me/918884511711?text=Hello%20Sowik%20Home%20Health%20Care%2C%20I%20need%20home%20nursing%20care%20in%20Bangalore.';
export const EMAIL = 'support@sowik.in';
export const ADDRESS = 'Embassy TechVillage Block L, Outer Ring Rd near New Horizon College, kaverappa Layout Devarabisanahalli, Kadubeesanahalli, Bengaluru, Karnataka 560103';
export const HOURS = 'Available 24/7 — 365 days a year, across all areas of Bangalore';

export const SERVICE_CATEGORIES = [
  'All',
  'Nursing Services',
  'Baby Care',
  'Elderly Care',
  'Post-Operative Care',
  'Rehabilitation & Therapy'
];

export const SERVICES = [
  // --- Baby Care ---
  {
    name: 'Newborn Baby & Mother Care',
    slug: 'newborn-baby-mother-care',
    category: 'Baby Care',
    shortDescription: 'Comprehensive postnatal care for both mother and newborn including feeding support, hygiene, and infant vitals.',
    inclusions: ['Newborn bath & oil massage', 'Umbilical cord sterile care', 'Lactation & feeding support', 'Mother postnatal vitals monitoring'],
    duration: '8 / 12 / 24-hour shifts'
  },
  {
    name: 'Night Nanny / Infant Care',
    slug: 'night-nanny-infant-care',
    category: 'Baby Care',
    shortDescription: 'Overnight infant monitoring and feeding support so parents can rest with complete peace of mind.',
    inclusions: ['Night-time feeding assistance', 'Burping & diaper changes', 'Sleep routine establishment', 'Colic & reflux relief support'],
    duration: '12-hour night shift'
  },
  {
    name: 'Preterm / Special Infant Care',
    slug: 'preterm-infant-care',
    category: 'Baby Care',
    shortDescription: 'Dedicated pediatric nursing support for low birth weight, premature, or recovering infants at home.',
    inclusions: ['Temperature & respiratory tracking', 'Kangaroo mother care guidance', 'Sterile bottle & equipment sanitization', 'Growth & feed volume logging'],
    duration: '12 / 24-hour shifts'
  },

  // --- Nursing Services ---
  {
    name: '24/7 Nursing Care',
    slug: '24-7-nursing',
    category: 'Nursing Services',
    shortDescription: 'Registered GNM/B.Sc nurses around the clock, including ICU-level support and critical vitals management.',
    inclusions: ['GNM/B.Sc nurses', 'Tracheostomy & catheter care', 'Ventilator management', 'Emergency response & stabilization'],
    duration: '24-hour live-in'
  },
  {
    name: 'Wound Care & Dressing',
    slug: 'wound-care',
    category: 'Nursing Services',
    shortDescription: 'Sterile surgical dressing, diabetic ulcer treatments, and bedsore prevention by qualified clinical nurses.',
    inclusions: ['Sterile dressing changes', 'Diabetic foot ulcer care', 'Bedsore staging & management', 'Aseptic infection monitoring'],
    duration: 'Per visit / scheduled'
  },
  {
    name: 'Medication Assistance & Injections',
    slug: 'medication-assistance',
    category: 'Nursing Services',
    shortDescription: 'Timely, accurate medication administration, IV cannulation, IV fluids, and prescribed injections.',
    inclusions: ['Medication scheduling', 'IM/IV injections', 'IV fluid infusion setup', 'Prescription coordination'],
    duration: 'Hourly to daily'
  },
  {
    name: 'Vital Monitoring & Clinical Charts',
    slug: 'vital-monitoring',
    category: 'Nursing Services',
    shortDescription: 'Continuous BP, SpO2, blood sugar, pulse, and temperature tracking with daily clinical charts.',
    inclusions: ['BP / SpO2 / pulse / temp tracking', 'Daily digital health charts', 'Abnormality alerts', 'Physician summary reports'],
    duration: 'Scheduled visits'
  },

  // --- Elderly Care ---
  {
    name: 'Elderly Care',
    slug: 'elderly-care',
    category: 'Elderly Care',
    shortDescription: 'Compassionate daily support for senior citizens — bathing, feeding, mobility assistance, and companionship.',
    inclusions: ['Assistance with daily living', 'Medication reminders', 'Mobility & fall prevention', 'Companionship & mental engagement'],
    duration: '8 / 12 / 24-hour shifts'
  },
  {
    name: 'Bedridden Patient Care',
    slug: 'bedridden-care',
    category: 'Elderly Care',
    shortDescription: 'Round-the-clock supportive nursing care for immobile seniors, maintaining full hygiene and skin integrity.',
    inclusions: ['2-hourly position turning', 'Hygienic bed baths', 'Ryles tube / PEG feeding', 'Bedsore prevention & barrier creams'],
    duration: '12 / 24-hour shifts'
  },
  {
    name: "Dementia / Alzheimer's Care",
    slug: 'dementia-alzheimers-care',
    category: 'Elderly Care',
    shortDescription: 'Specialized memory care managing confusion, night wanderings, agitation, and routine stabilization.',
    inclusions: ['Wander-proof supervision', 'Cognitive stimulation routines', 'Behavioral de-escalation', 'Round-the-clock safety escort'],
    duration: '12 / 24-hour shifts'
  },
  {
    name: 'Attendant / Caregiver',
    slug: 'attendant-caregiver',
    category: 'Elderly Care',
    shortDescription: 'Trained, background-checked attendants for non-clinical daily assistance, feeding, and hospital accompaniment.',
    inclusions: ['Personal hygiene assistance', 'Hospital visit accompaniment', 'Dietary meal prep support', 'Dedicated personal assistance'],
    duration: '8 / 12 / 24-hour'
  },

  // --- Post-Operative Care ---
  {
    name: 'Post-Surgery Care',
    slug: 'post-surgery',
    category: 'Post-Operative Care',
    shortDescription: 'Sterile surgical site care, drainage management, pain alleviation, and early mobility encouragement.',
    inclusions: ['Sterile surgical dressing changes', 'Post-op pain relief administration', 'Drain & Foley catheter care', 'Assisted early gait rehabilitation'],
    duration: 'Daily visits to 24-hour'
  },
  {
    name: 'Post-Hospitalization Care',
    slug: 'post-hospitalization',
    category: 'Post-Operative Care',
    shortDescription: 'Structured convalescent care post hospital discharge with steady monitoring, rehab, and doctor liaisons.',
    inclusions: ['Vital monitoring & trend charts', 'Medication reconciliation', 'Physical recovery assistance', 'Doctor liaison updates'],
    duration: 'Customized plans'
  },
  {
    name: 'Palliative Care',
    slug: 'palliative-care',
    category: 'Post-Operative Care',
    shortDescription: 'Comfort-oriented nursing prioritizing dignity, pain relief, and family peace through advanced chronic conditions.',
    inclusions: ['Pain & acute symptom management', 'Emotional & family support', 'Specialized comfort nursing', 'Physician coordination'],
    duration: 'Ongoing long-term'
  },

  // --- Rehabilitation & Therapy ---
  {
    name: 'Physiotherapy at Home',
    slug: 'physiotherapy',
    category: 'Rehabilitation & Therapy',
    shortDescription: 'Certified BPT/MPT physiotherapists providing neuro, orthopedic, cardiopulmonary, and geriatric rehab.',
    inclusions: ['Personalized exercise therapy', 'Post-stroke neurological rehab', 'Post-joint replacement mobility', 'Targeted pain management'],
    duration: '45–60 min sessions'
  },
  {
    name: 'Old Age Home Facility',
    slug: 'old-age-home',
    category: 'Rehabilitation & Therapy',
    shortDescription: 'A safe, comfortable residential home for seniors with round-the-clock care, meals and companionship.',
    description: 'A caring residential facility for senior citizens who need daily support, with trained staff, nutritious meals, health monitoring and a friendly community.',
    inclusions: ['24/7 caregiver and nursing support', 'Nutritious meals and hydration', 'Medication and health monitoring', 'Social activities and companionship'],
    duration: 'Monthly stay'
  },
  {
    name: 'Rehabilitation Center Facility',
    slug: 'rehabilitation-center',
    category: 'Rehabilitation & Therapy',
    shortDescription: 'Supervised rehabilitation with physiotherapy, exercise and nursing care for recovery after surgery, stroke or injury.',
    description: 'A rehabilitation programme for patients recovering from surgery, stroke or injury, with supervised therapy, nursing care and a personalised recovery plan.',
    inclusions: ['Physiotherapy sessions', 'Supervised exercise programmes', 'Nursing care and monitoring', 'Personalised recovery plan'],
    duration: 'Monthly programme'
  }
];

export const PACKAGES = [
  { _id: 'p2', name: 'Day Shift (12 Hours)', hours: '12', shift: 'Day', price: 899, period: 'Daily', popular: true, features: ['8 AM – 8 PM shift', 'Full daytime care', 'Mobility support', 'Vitals twice daily'] },
  { _id: 'p3', name: 'Night Shift (12 Hours)', hours: '12', shift: 'Night', price: 949, period: 'Daily', features: ['8 PM – 8 AM shift', 'Overnight monitoring', 'Sleep support', 'Emergency readiness'] },
  { _id: 'p4', name: '24-Hour Live-In', hours: '24', shift: 'Full Day', price: 999, period: 'Daily', popular: true, features: ['Round-the-clock care', '2-hourly turns', 'Vitals monitoring', 'Family updates'] },
  { _id: 'p5', name: 'Weekly Care Plan', hours: 'Custom', shift: 'Full Day', price: 10999, period: 'Weekly', features: ['Dedicated caregiver', 'Supervisor check-ins', 'Priority replacements', 'Discounted rate'] },
  { _id: 'p6', name: 'Monthly Long-Term Plan', hours: 'Custom', shift: 'Full Day', price: 25999, period: 'Monthly', popular: true, features: ['Best value long-term', 'Same dedicated nurse', 'Weekly doctor supervision', 'Free care plan review'] }
];

export const NURSES = [
   { _id: 'n1', name: 'Mr. Varun', qualification: 'B.Sc Nursing', experience: '5+ years', specialization: 'Critical Care Nursing Specialist', languages: ['Kannada', 'English', 'Hindi'] },
  { _id: 'n2', name: 'Ms. Sowmya K', qualification: 'M.Sc', experience: '4+ years', specialization: 'Obstetric and Gynecological Specialist', languages: ['Kannada', 'English', 'Telugu'] },
  { _id: 'n3', name: 'Ms. Megha', qualification: 'B.Sc', experience: '3+ years', specialization: 'Paediatric (Child Health) Nursing', languages: ['Kannada', 'English', 'Tamil'] },
  { _id: 'n4', name: 'Sr. Anitha Ramesh', qualification: 'B.Sc Nursing', experience: '8+ years', specialization: 'ICU & Post-Surgery Care', languages: ['Kannada', 'English', 'Hindi'] },
  { _id: 'n5', name: 'Sr. Priya Shetty', qualification: 'GNM', experience: '6+ years', specialization: 'Elderly & Bedridden Care', languages: ['Kannada', 'Tulu', 'Hindi'] },
  { _id: 'n6', name: 'Sr. Kavitha Nair', qualification: 'B.Sc Nursing', experience: '10+ years', specialization: 'Wound Care & Palliative', languages: ['Malayalam', 'English', 'Kannada'] },
  { _id: 'n7', name: 'Sr. Deepa Kumari', qualification: 'GNM', experience: '5+ years', specialization: 'Dementia & Alzheimer’s Care', languages: ['Hindi', 'Kannada', 'English'] },
  { _id: 'n8', name: 'Sr. Maria D’Souza', qualification: 'B.Sc Nursing', experience: '7+ years', specialization: '24/7 Nursing & Ventilator Care', languages: ['English', 'Kannada', 'Konkani'] },
  { _id: 'n9', name: 'Mr. Rajesh Kumar', qualification: 'BPT', experience: '6+ years', specialization: 'Physiotherapy & Rehabilitation', languages: ['Hindi', 'Kannada', 'English'] }
];

export const FAQS = [
  { _id: 'f1', question: 'Which areas do you serve?', answer: 'We started in Bangalore and now provide home care across India. Tell us your city and locality when you call or WhatsApp, and we will confirm nurse availability and arrival time for your area.' },
  { _id: 'f2', question: 'How quickly can a nurse reach my home?', answer: 'In most Bangalore locations a nurse arrives within 2 to 12 hours of confirmed booking. In other cities the time depends on your location, and we confirm it when you book.' },
  { _id: 'f3', question: 'Are your nurses verified?', answer: 'Yes. Every caregiver is 100% police-verified and background-checked, and our nurses are qualified GNM, B.Sc or BPT professionals.' },
  { _id: 'f4', question: 'What shift options do you offer?', answer: '8-hour day, 12-hour day, 12-hour night, 24-hour live-in, hourly visits, and weekly or monthly plans.' },
  { _id: 'f5', question: 'Can I choose a male or female caregiver?', answer: 'Yes. Select your preference during booking and we match accordingly.' },
  { _id: 'f6', question: 'What happens in a medical emergency?', answer: 'We are not an emergency service. For emergencies call 108 or 112 immediately. Our nurses provide first-response stabilization until help arrives.' },
  { _id: 'f7', question: 'How do I book a nurse?', answer: 'Call us, message us on WhatsApp, or use the Book a Nurse form on this website. Share the patient’s condition, your location and the shift you need, and our care coordinator will match a suitable nurse.' },
  { _id: 'f8', question: 'Do you provide care for dementia and Alzheimer’s patients?', answer: 'Yes. We have caregivers experienced in dementia and Alzheimer’s care who focus on patience, routine, safety and calm communication.' },
  { _id: 'f9', question: 'Can I change the nurse if I am not satisfied?', answer: 'Yes. If you are not comfortable with the assigned caregiver, tell us and we will arrange a replacement as soon as possible.' },
  { _id: 'f10', question: 'Do you offer newborn and mother care?', answer: 'Yes. We provide trained baby care and postnatal nurses who help with newborn feeding, bathing, hygiene and mother recovery at home.' },
  { _id: 'f11', question: 'Can I get physiotherapy at home?', answer: 'Yes. Our BPT physiotherapists provide rehabilitation at home after surgery, stroke, fractures and for elderly mobility problems.' },
  { _id: 'f12', question: 'Do I need to arrange food and a resting place for a live-in nurse?', answer: 'For 24-hour live-in care, the family usually provides basic meals and a place to rest. Please confirm the details with our coordinator when you book.' }
];

export const TESTIMONIALS = [
  { _id: 't1', name: 'Ramesh Rao', location: 'Jayanagar, Bangalore', service: 'Elderly Care (24-Hour)', message: 'We booked a 24-hour caregiver for my 82-year-old father. Nurse Anitha was extremely patient and handled all daily care smoothly. Highly recommend Sowik!', rating: 5 },
  { _id: 't2', name: 'Priya Venkatesh', location: 'Whitefield, Bangalore', service: 'Post-Surgery Recovery', message: 'After my knee replacement I needed daily wound dressing and physio. The nurse took sterile care of everything and I recovered faster than expected.', rating: 5 },
  { _id: 't3', name: 'Dr. Anand Kumar', location: 'Koramangala, Bangalore', service: '24/7 Nursing Care', message: 'As a doctor I am very particular about nursing quality. Sowik handled my uncle’s critical care at home with thorough professional protocols.', rating: 5 },
  { _id: 't4', name: 'Sneha Hegde', location: 'HSR Layout, Bangalore', service: 'Baby & Mother Care', message: 'The nurse who came after my delivery taught me how to feed and bathe my newborn with so much patience. I slept better in those first weeks than I expected to.', rating: 5 },
  { _id: 't5', name: 'Mohan Iyer', location: 'Indiranagar, Bangalore', service: 'Dementia Care', message: 'My mother has Alzheimer’s and gets anxious with strangers. Nurse Deepa spoke to her gently in her own language and she settled in within a few days.', rating: 5 },
  { _id: 't6', name: 'Farah Sheikh', location: 'JP Nagar, Bangalore', service: 'Physiotherapy at Home', message: 'My father could barely stand after his stroke. With the home physiotherapy sessions he now walks to the balcony on his own. The therapist was punctual and encouraging.', rating: 4 }
];