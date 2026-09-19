import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import Service from './models/Service.js';
import Package from './models/Package.js';
import Nurse from './models/Nurse.js';
import FAQ from './models/FAQ.js';
import Testimonial from './models/Testimonial.js';

dotenv.config();
await connectDB();

// Admin user (password: Admin@123 — change after first login)
const hashed = await bcrypt.hash('Admin@123', 10);
await User.findOneAndUpdate(
  { email: 'admin@sowikhealthcare.com' },
  { email: 'admin@sowikhealthcare.com', password: hashed, name: 'Sowik Admin', role: 'admin' },
  { upsert: true, new: true }
);

const services = [
  { name: 'Elderly Care', slug: 'elderly-care', shortDescription: 'Compassionate daily support for senior citizens at home.', description: 'Our trained caregivers help elderly loved ones with bathing, feeding, mobility, medication reminders and companionship — promoting dignity, safety and independence.', inclusions: ['Assistance with daily living activities', 'Medication reminders', 'Mobility & fall prevention support', 'Companionship & mental stimulation', 'Nutrition & meal assistance'], duration: '8 / 12 / 24-hour shifts', icon: 'Heart', order: 1 },
  { name: 'Post-Hospitalization Care', slug: 'post-hospitalization', shortDescription: 'Smooth recovery support after hospital discharge.', description: 'Bridge the gap between hospital and home with structured recovery care, health monitoring and rehabilitation support after discharge.', inclusions: ['Discharge coordination', 'Vital monitoring & daily charts', 'Medication management', 'Rehabilitation assistance', 'Family updates & doctor liaison'], duration: 'Customized care plans', icon: 'Hospital', order: 2 },
  { name: 'Post-Surgery Care', slug: 'post-surgery', shortDescription: 'Safe recovery after cardiac, orthopedic or abdominal surgery.', description: 'Specialized post-operative nursing to ensure sterile wound care, pain management, mobility support and faster healing in the comfort of home.', inclusions: ['Sterile dressing changes', 'Pain & medication management', 'Drain & catheter care', 'Early gait rehabilitation', 'Infection prevention protocols'], duration: 'Daily visits to 24-hour care', icon: 'Activity', order: 3 },
  { name: 'Bedridden Patient Care', slug: 'bedridden-care', shortDescription: 'Round-the-clock care for immobile patients.', description: 'Dedicated 24/7 care for completely bedridden patients focusing on hygiene, pressure sore prevention, feeding and comfort.', inclusions: ['2-hourly position turning', 'Hygienic bed baths', 'Feeding & nutrition support', 'Diaper & skin care', 'Pressure sore prevention'], duration: '12 / 24-hour shifts', icon: 'BedDouble', order: 4 },
  { name: 'Palliative Care', slug: 'palliative-care', shortDescription: 'Comfort-focused care for serious & advanced illness.', description: 'Holistic care centered on pain relief, symptom control and emotional support for patients with advanced illness — ensuring peace and dignity at home.', inclusions: ['Pain & symptom management', 'Emotional & family support', 'Comfort-focused nursing', 'Coordination with treating doctors'], duration: 'Ongoing long-term care', icon: 'Flower2', order: 5 },
  { name: "Dementia / Alzheimer's Care", slug: 'dementia-alzheimers-care', shortDescription: 'Specialized memory care in a familiar home setting.', description: 'Patient-centric memory care that manages confusion, wandering and behavioural changes while keeping your loved one safe and engaged.', inclusions: ['Wander-proof supervision', 'Structured cognitive activities', 'Routine & behavioural management', '24/7 safety monitoring'], duration: '12 / 24-hour shifts', icon: 'Brain', order: 6 },
  { name: 'Physiotherapy at Home', slug: 'physiotherapy', shortDescription: 'Certified BPT/MPT physiotherapists at your doorstep.', description: 'One-on-one therapeutic sessions for orthopedic, neurological, cardiac and geriatric conditions — no travel to clinics needed.', inclusions: ['Personalized exercise plans', 'Post-stroke rehabilitation', 'Orthopedic & joint recovery', 'Pain relief therapy', 'Mobility training'], duration: '45–60 min sessions', icon: 'Dumbbell', order: 7 },
  { name: 'Medication Assistance', slug: 'medication-assistance', shortDescription: 'Timely, accurate medication administration at home.', description: 'Never miss a dose — our nurses manage medication schedules, administer injections and IV therapy safely at home.', inclusions: ['Medication scheduling & reminders', 'IM/IV injections at home', 'IV fluid administration', 'Prescription coordination'], duration: 'Hourly visits to daily care', icon: 'Pill', order: 8 },
  { name: 'Vital Monitoring', slug: 'vital-monitoring', shortDescription: 'Continuous tracking of BP, SpO2, pulse & temperature.', description: 'Regular monitoring of blood pressure, oxygen levels, pulse and temperature with daily health charts shared with your family and doctors.', inclusions: ['BP, SpO2, pulse & temp checks', 'Daily health charts', 'Abnormality alerts to family', 'Doctor reports on request'], duration: 'As per care plan', icon: 'HeartPulse', order: 9 },
  { name: 'Wound Care', slug: 'wound-care', shortDescription: 'Sterile dressing for surgical wounds, ulcers & bedsores.', description: 'Hospital-grade sterile wound dressing for surgical incisions, diabetic ulcers, pressure sores and chronic wounds to accelerate healing.', inclusions: ['Sterile dressing changes', 'Diabetic foot ulcer care', 'Pressure sore (bedsore) care', 'Infection monitoring'], duration: 'Per visit / scheduled visits', icon: 'Bandage', order: 10 },
  { name: 'Attendant / Caregiver', slug: 'attendant-caregiver', shortDescription: 'Trained attendants for non-clinical daily support.', description: 'Reliable attendants to assist with daily routines, hospital visits, hygiene and companionship — for patients and seniors.', inclusions: ['Personal hygiene assistance', 'Hospital accompaniment', 'Meal & routine support', 'Companionship'], duration: '8 / 12 / 24-hour shifts', icon: 'HandHeart', order: 11 },
  { name: '24/7 Nursing Care', slug: '24-7-nursing', shortDescription: 'Registered GNM/B.Sc nurses around the clock.', description: 'Hospital-trained registered nurses providing continuous skilled care — including ICU-level support, tracheostomy, catheter and ventilator care at home.', inclusions: ['GNM/B.Sc registered nurses', 'Tracheostomy & catheter care', 'Ventilator management', 'Critical care support', 'Emergency response'], duration: '24-hour live-in', icon: 'Stethoscope', order: 12 }
];
await Service.deleteMany({});
await Service.insertMany(services);

const packages = [
  { name: 'Day Care (8 Hours)', hours: '8', shift: 'Day', price: 999, period: 'Daily', features: ['8 AM – 4 PM shift', 'Daily living assistance', 'Medication reminders', 'Meal support'], popular: false },
  { name: 'Day Shift (12 Hours)', hours: '12', shift: 'Day', price: 1299, period: 'Daily', features: ['8 AM – 8 PM shift', 'Full daytime care', 'Mobility support', 'Vitals check twice daily'], popular: true },
  { name: 'Night Shift (12 Hours)', hours: '12', shift: 'Night', price: 1399, period: 'Daily', features: ['8 PM – 8 AM shift', 'Overnight monitoring', 'Sleep support', 'Emergency readiness'], popular: false },
  { name: '24-Hour Live-In', hours: '24', shift: 'Full Day', price: 2499, period: 'Daily', features: ['Round-the-clock care', '2-hourly turns for bedridden', 'Vitals monitoring', 'Family updates'], popular: true },
  { name: 'Weekly Care Plan', hours: 'Custom', shift: 'Full Day', price: 13999, period: 'Weekly', features: ['Dedicated caregiver all week', 'Supervisor check-ins', 'Priority replacements', 'Discounted rate'], popular: false },
  { name: 'Monthly Long-Term Plan', hours: 'Custom', shift: 'Full Day', price: 49999, period: 'Monthly', features: ['Best value for long-term care', 'Same dedicated nurse/caregiver', 'Weekly doctor supervision', 'Free care plan review'], popular: true }
];
await Package.deleteMany({});
await Package.insertMany(packages);

const nurses = [
  { name: 'Sr. Anitha Ramesh', qualification: 'B.Sc Nursing', experience: '8+ years', specialization: 'ICU & Post-Surgery Care', availability: 'Available', languages: ['Kannada', 'English', 'Hindi'] },
  { name: 'Sr. Priya Shetty', qualification: 'GNM', experience: '6+ years', specialization: 'Elderly & Bedridden Care', availability: 'Available', languages: ['Kannada', 'Tulu', 'Hindi'] },
  { name: 'Sr. Kavitha Nair', qualification: 'B.Sc Nursing', experience: '10+ years', specialization: 'Wound Care & Palliative', availability: 'On Duty', languages: ['Malayalam', 'English', 'Kannada'] },
  { name: 'Sr. Deepa Kumari', qualification: 'GNM', experience: '5+ years', specialization: 'Dementia & Alzheimer’s Care', availability: 'Available', languages: ['Hindi', 'Kannada', 'English'] },
  { name: 'Sr. Maria D’Souza', qualification: 'B.Sc Nursing', experience: '7+ years', specialization: '24/7 Nursing & Ventilator Care', availability: 'Available', languages: ['English', 'Kannada', 'Konkani'] },
  { name: 'Mr. Rajesh Kumar', qualification: 'BPT', experience: '6+ years', specialization: 'Physiotherapy & Rehabilitation', availability: 'Available', languages: ['Hindi', 'Kannada', 'English'] }
];
await Nurse.deleteMany({});
await Nurse.insertMany(nurses);

const faqs = [
  { question: 'Which areas in Bangalore do you serve?', answer: 'We serve all areas of Bangalore — from Indiranagar, Whitefield and Koramangala to Jayanagar, Malleshwaram, HSR Layout, Yelahanka and everywhere in between. Caregiver deployment is available 365 days a year across the city.', category: 'General', order: 1 },
  { question: 'How quickly can a nurse reach my home?', answer: 'In most Bangalore locations, we deploy a verified nurse or caregiver within 2 to 12 hours of your confirmed booking, depending on the shift type and service required.', category: 'Booking', order: 2 },
  { question: 'Are your nurses verified?', answer: 'Yes. Every nurse and caregiver is 100% police-verified, background-checked and holds valid GNM/B.Sc/BPT qualifications with hospital training.', category: 'Trust', order: 3 },
  { question: 'What are your shift options?', answer: 'We offer 8-hour day care, 12-hour day shifts, 12-hour night shifts, 24-hour live-in care, hourly visits, and weekly/monthly long-term plans.', category: 'Services', order: 4 },
  { question: 'Can I choose a male or female caregiver?', answer: 'Absolutely. During booking you can select a male, female, or no preference — and we match accordingly.', category: 'Booking', order: 5 },
  { question: 'What happens in a medical emergency?', answer: 'Sowik Home Health Care is not an emergency service. For life-threatening emergencies, always call 108 / 112 or your nearest hospital immediately. Our nurses are trained for first-response stabilization until help arrives.', category: 'Safety', order: 6 }
];
await FAQ.deleteMany({});
await FAQ.insertMany(faqs);

const testimonials = [
  { name: 'Ramesh Rao', location: 'Jayanagar, Bangalore', service: 'Elderly Care (24-Hour)', message: 'We booked a 24-hour caregiver for my 82-year-old father. Nurse Anitha was extremely patient, polite and handled all daily care smoothly. Highly recommend Sowik!', rating: 5 },
  { name: 'Priya Venkatesh', location: 'Whitefield, Bangalore', service: 'Post-Surgery Recovery', message: 'After my knee replacement, I needed daily wound dressing and physio. The GNM nurse took sterile care of everything and I recovered faster than expected.', rating: 5 },
  { name: 'Dr. Anand Kumar', location: 'Koramangala, Bangalore', service: '24/7 Nursing Care', message: 'As a doctor, I am very particular about nursing quality. Sowik handled my uncle’s critical care at home with thorough, professional protocols.', rating: 5 }
];
await Testimonial.deleteMany({});
await Testimonial.insertMany(testimonials);

console.log('✅ Seed complete — Admin login: admin@sowikhealthcare.com / Admin@123');
await mongoose.disconnect();
process.exit(0);