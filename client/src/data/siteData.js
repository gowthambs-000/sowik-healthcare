export const PHONE = '+91 70227 55362';
export const PHONE_TEL = 'tel:+917022755362';
export const WHATSAPP = 'https://wa.me/917022755362?text=Hello%20Sowik%20Home%20Health%20Care%2C%20I%20need%20home%20nursing%20care%20in%20Bangalore.';
export const EMAIL = 'care@sowikhealthcare.in';
export const ADDRESS = 'Sowik Home Health Care Private Limited, Bangalore, Karnataka, India';
export const HOURS = 'Available 24/7 — 365 days a year, across all areas of Bangalore';

export const SERVICES = [
  { name: 'Elderly Care', slug: 'elderly-care', shortDescription: 'Compassionate daily support for senior citizens — bathing, feeding, mobility and companionship.', inclusions: ['Assistance with daily living', 'Medication reminders', 'Mobility & fall prevention', 'Companionship'], duration: '8 / 12 / 24-hour shifts' },
  { name: 'Post-Hospitalization Care', slug: 'post-hospitalization', shortDescription: 'Structured recovery care after hospital discharge with monitoring and rehab support.', inclusions: ['Vital monitoring & charts', 'Medication management', 'Rehabilitation assistance', 'Doctor liaison'], duration: 'Customized plans' },
  { name: 'Post-Surgery Care', slug: 'post-surgery', shortDescription: 'Sterile wound care, pain management and mobility support after any surgery.', inclusions: ['Sterile dressing changes', 'Pain management', 'Drain & catheter care', 'Early gait rehab'], duration: 'Daily to 24-hour' },
  { name: 'Bedridden Patient Care', slug: 'bedridden-care', shortDescription: '24/7 care for immobile patients with hygiene and pressure-sore prevention.', inclusions: ['2-hourly position turning', 'Hygienic bed baths', 'Feeding support', 'Skin care'], duration: '12 / 24-hour shifts' },
  { name: 'Palliative Care', slug: 'palliative-care', shortDescription: 'Comfort-focused nursing for advanced illness — dignity, pain relief and peace.', inclusions: ['Pain & symptom control', 'Emotional support', 'Comfort care', 'Doctor coordination'], duration: 'Ongoing long-term' },
  { name: "Dementia / Alzheimer's Care", slug: 'dementia-alzheimers-care', shortDescription: 'Specialized memory care managing confusion, wandering and behavioural changes.', inclusions: ['Wander-proof supervision', 'Cognitive activities', 'Behavioural management', 'Safety monitoring'], duration: '12 / 24-hour shifts' },
  { name: 'Physiotherapy at Home', slug: 'physiotherapy', shortDescription: 'Certified BPT/MPT physiotherapists for neuro, ortho and geriatric rehab.', inclusions: ['Personalized exercise plans', 'Post-stroke rehab', 'Joint recovery', 'Pain relief therapy'], duration: '45–60 min sessions' },
  { name: 'Medication Assistance', slug: 'medication-assistance', shortDescription: 'Timely, accurate medication administration, injections and IV therapy.', inclusions: ['Medication scheduling', 'IM/IV injections', 'IV fluids', 'Prescription coordination'], duration: 'Hourly to daily' },
  { name: 'Vital Monitoring', slug: 'vital-monitoring', shortDescription: 'BP, SpO2, pulse and temperature tracking with daily health charts.', inclusions: ['BP / SpO2 / pulse / temp', 'Daily health charts', 'Abnormality alerts', 'Doctor reports'], duration: 'As per plan' },
  { name: 'Wound Care', slug: 'wound-care', shortDescription: 'Sterile dressing for surgical wounds, diabetic ulcers and bedsores.', inclusions: ['Sterile dressing changes', 'Diabetic foot ulcer care', 'Bedsore care', 'Infection monitoring'], duration: 'Per visit / scheduled' },
  { name: 'Attendant / Caregiver', slug: 'attendant-caregiver', shortDescription: 'Trained attendants for non-clinical daily support and companionship.', inclusions: ['Hygiene assistance', 'Hospital accompaniment', 'Meal support', 'Companionship'], duration: '8 / 12 / 24-hour' },
  { name: '24/7 Nursing Care', slug: '24-7-nursing', shortDescription: 'Registered GNM/B.Sc nurses around the clock, including ICU-level support.', inclusions: ['GNM/B.Sc nurses', 'Tracheostomy & catheter care', 'Ventilator management', 'Emergency response'], duration: '24-hour live-in' }
];

export const PACKAGES = [
  { _id: 'p1', name: 'Day Care (8 Hours)', hours: '8', shift: 'Day', price: 999, period: 'Daily', features: ['8 AM – 4 PM shift', 'Daily living assistance', 'Medication reminders', 'Meal support'] },
  { _id: 'p2', name: 'Day Shift (12 Hours)', hours: '12', shift: 'Day', price: 1299, period: 'Daily', popular: true, features: ['8 AM – 8 PM shift', 'Full daytime care', 'Mobility support', 'Vitals twice daily'] },
  { _id: 'p3', name: 'Night Shift (12 Hours)', hours: '12', shift: 'Night', price: 1399, period: 'Daily', features: ['8 PM – 8 AM shift', 'Overnight monitoring', 'Sleep support', 'Emergency readiness'] },
  { _id: 'p4', name: '24-Hour Live-In', hours: '24', shift: 'Full Day', price: 2499, period: 'Daily', popular: true, features: ['Round-the-clock care', '2-hourly turns', 'Vitals monitoring', 'Family updates'] },
  { _id: 'p5', name: 'Weekly Care Plan', hours: 'Custom', shift: 'Full Day', price: 13999, period: 'Weekly', features: ['Dedicated caregiver', 'Supervisor check-ins', 'Priority replacements', 'Discounted rate'] },
  { _id: 'p6', name: 'Monthly Long-Term Plan', hours: 'Custom', shift: 'Full Day', price: 49999, period: 'Monthly', popular: true, features: ['Best value long-term', 'Same dedicated nurse', 'Weekly doctor supervision', 'Free care plan review'] }
];

export const NURSES = [
  { _id: 'n1', name: 'Sr. Anitha Ramesh', qualification: 'B.Sc Nursing', experience: '8+ years', specialization: 'ICU & Post-Surgery Care', availability: 'Available', languages: ['Kannada', 'English', 'Hindi'] },
  { _id: 'n2', name: 'Sr. Priya Shetty', qualification: 'GNM', experience: '6+ years', specialization: 'Elderly & Bedridden Care', availability: 'Available', languages: ['Kannada', 'Tulu', 'Hindi'] },
  { _id: 'n3', name: 'Sr. Kavitha Nair', qualification: 'B.Sc Nursing', experience: '10+ years', specialization: 'Wound Care & Palliative', availability: 'On Duty', languages: ['Malayalam', 'English', 'Kannada'] },
  { _id: 'n4', name: 'Sr. Deepa Kumari', qualification: 'GNM', experience: '5+ years', specialization: "Dementia & Alzheimer's Care", availability: 'Available', languages: ['Hindi', 'Kannada', 'English'] },
  { _id: 'n5', name: "Sr. Maria D'Souza", qualification: 'B.Sc Nursing', experience: '7+ years', specialization: '24/7 Nursing & Ventilator', availability: 'Available', languages: ['English', 'Kannada', 'Konkani'] },
  { _id: 'n6', name: 'Mr. Rajesh Kumar', qualification: 'BPT', experience: '6+ years', specialization: 'Physiotherapy & Rehab', availability: 'Available', languages: ['Hindi', 'Kannada', 'English'] }
];

export const FAQS = [
  { _id: 'f1', question: 'Which areas in Bangalore do you serve?', answer: 'All areas of Bangalore — Indiranagar, Whitefield, Koramangala, Jayanagar, Malleshwaram, HSR, Yelahanka and everywhere in between. 365 days a year.' },
  { _id: 'f2', question: 'How quickly can a nurse reach my home?', answer: 'Within 2 to 12 hours of confirmed booking in most Bangalore locations.' },
  { _id: 'f3', question: 'Are your nurses verified?', answer: 'Yes — 100% police-verified, background-checked, qualified GNM/B.Sc/BPT professionals.' },
  { _id: 'f4', question: 'What shift options do you offer?', answer: '8-hour day, 12-hour day, 12-hour night, 24-hour live-in, hourly visits, and weekly/monthly plans.' },
  { _id: 'f5', question: 'Can I choose a male or female caregiver?', answer: 'Yes — select your preference during booking and we match accordingly.' },
  { _id: 'f6', question: 'What happens in a medical emergency?', answer: 'We are not an emergency service. For emergencies call 108/112 immediately. Our nurses provide first-response stabilization until help arrives.' }
];

export const TESTIMONIALS = [
  { _id: 't1', name: 'Ramesh Rao', location: 'Jayanagar, Bangalore', service: 'Elderly Care (24-Hour)', message: 'We booked a 24-hour caregiver for my 82-year-old father. Nurse Anitha was extremely patient and handled all daily care smoothly. Highly recommend Sowik!', rating: 5 },
  { _id: 't2', name: 'Priya Venkatesh', location: 'Whitefield, Bangalore', service: 'Post-Surgery Recovery', message: 'After my knee replacement I needed daily wound dressing and physio. The nurse took sterile care of everything and I recovered faster than expected.', rating: 5 },
  { _id: 't3', name: 'Dr. Anand Kumar', location: 'Koramangala, Bangalore', service: '24/7 Nursing Care', message: 'As a doctor I am very particular about nursing quality. Sowik handled my uncle’s critical care at home with thorough professional protocols.', rating: 5 }
];