import { Link } from 'react-router-dom';
import {
  HeartHandshake, Eye, ShieldCheck, MapPin, ArrowRight, Phone, MessageCircle,
  HeartPulse, Stethoscope, Baby, Activity, BedDouble, Syringe, Home as HomeIcon, Users
} from 'lucide-react';
import { PHONE, PHONE_TEL, WHATSAPP } from '../data/siteData';

const stats = [
  ['1,000+', 'Happy families'],
  ['50+', 'Verified nurses'],
  ['12+', 'Care services'],
  ['24/7', 'Availability']
];

const approach = [
  {
    icon: HomeIcon,
    title: 'From hospital to home',
    text: 'Leaving the hospital is stressful. We step in on day one with trained staff, a care chart and a clear plan, so families are never left to cope alone.'
  },
  {
    icon: Users,
    title: 'Care built around the person',
    text: 'Every plan starts with a free assessment. We match the nurse, the shift and the routine to the patient, not the other way round.'
  },
  {
    icon: HeartPulse,
    title: 'Clinical skill, human warmth',
    text: 'Our nurses bring hospital-level training to the bedside, along with the patience and companionship that help people recover with dignity.'
  }
];

const services = [
  { icon: Users, name: 'Elderly & Senior Care', text: 'Daily assistance, vitals monitoring, medication reminders and companionship.', to: '/services/elderly-care' },
  { icon: Stethoscope, name: '24/7 Nursing at Home', text: 'GNM / B.Sc nurses for round-the-clock and ICU-style care.', to: '/services/24-7-nursing' },
  { icon: Syringe, name: 'Post-Surgery Nursing', text: 'Sterile wound care, dressings and safe recovery after discharge.', to: '/services/post-surgery' },
  { icon: Activity, name: 'Physiotherapy at Home', text: 'Qualified physiotherapists for rehab, mobility and pain relief.', to: '/services/physiotherapy' },
  { icon: BedDouble, name: 'Bedridden Patient Care', text: 'Hygiene, positioning and turning schedules to prevent pressure sores.', to: '/services/bedridden-care' },
  { icon: Baby, name: 'Baby & Mother Care', text: 'Newborn care specialists who support new mothers at home.', to: '/services' }
];

const pillars = [
  { icon: HeartHandshake, t: 'Our Mission', d: 'To make professional, compassionate healthcare accessible at every home in India, so families heal together, at home.' },
  { icon: Eye, t: 'Our Vision', d: 'To be the most trusted home healthcare brand in India, known for verified staff, rapid response and genuine care.' },
  { icon: ShieldCheck, t: 'Our Promise', d: 'Police-verified staff, transparent pricing, doctor-supervised care and free replacements, no questions asked.' }
];

const areas = [
  'Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Kolkata',
  'Pune', 'Ahmedabad', 'Kochi', 'Jaipur', 'Lucknow', 'Chandigarh'
];

const Heading = ({ eyebrow, title, text }) => (
  <div className="mx-auto mb-12 max-w-2xl text-center">
    <span className="text-sm font-bold text-emerald-700">{eyebrow}</span>
    <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">{title}</h2>
    {text && <p className="mt-3 text-slate-600 leading-relaxed">{text}</p>}
  </div>
);

export default function About() {
  return (
    <div className="pt-[104px] bg-white">
      {/* Header */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">About Sowik Home Health Care</h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Caring. Professional. Home. We bridge the gap between hospital care and the comfort of
            home, across India.
          </p>
        </div>
      </section>

      {/* Executive overview */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3">
          <span className="text-sm font-bold text-emerald-700">Executive overview</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Sowik Home Health Care Private Limited
          </h2>
          <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
            <p>
              Sowik Home Health Care is a trusted home healthcare provider serving families across India. We bring
              registered nurses (GNM &amp; B.Sc), trained caregivers and physiotherapists straight to
              your doorstep, for elderly care, post-surgery recovery, bedridden patients, chronic
              illness management and palliative support.
            </p>
            <p>
              The days after a hospital discharge are often the hardest. Families worry about
              medicines, wounds, hygiene and what to do if something changes. We exist to take that
              weight off them. By pairing trained medical assistance with real companionship, we become
              the support system a family can lean on while a loved one recovers.
            </p>
            <p>
              Every member of our team is 100% police-verified, background-checked and supervised by
              qualified clinical leads. We deploy care professionals across India, 365 days a year,
              with fast response in our major service cities.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {stats.map(([v, l]) => (
            <div key={l} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
              <p className="text-3xl font-black text-emerald-600">{v}</p>
              <p className="mt-1 text-sm text-slate-500">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Heading
            eyebrow="Our approach"
            title="A client-centered model of care"
            text="Recovery is more than a clinical process. It should feel safe, respectful and human."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {approach.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl bg-white p-8 border border-slate-200 shadow-sm">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg">
                  <Icon size={26} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <Heading
          eyebrow="Our services"
          title="Care your family can count on, at home"
          text="From daily support to round-the-clock nursing, delivered by verified professionals."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, name, text, to }) => (
            <Link
              key={name}
              to={to}
              className="group rounded-3xl border border-slate-200 bg-white p-7 hover:-translate-y-1 hover:shadow-xl transition"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition">
                <Icon size={24} />
              </span>
              <h3 className="mt-4 font-bold text-lg text-slate-900">{name}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                Learn more <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission / Vision / Promise */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {pillars.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500 text-white">
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Areas */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <MapPin className="mx-auto text-emerald-600" size={36} />
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Where we serve</h2>
        <p className="mt-3 text-slate-600">
          We deploy nurses and caregivers <strong>all over India</strong>, including:
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {areas.map((a) => (
            <span key={a} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
              {a}
            </span>
          ))}
          <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">and many more cities</span>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="rounded-[2rem] bg-emerald-700 p-10 sm:p-14 text-center text-white shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Talk to our care team today</h2>
          <p className="mt-3 text-emerald-50 max-w-lg mx-auto">
            Tell us what your family needs and we will match a verified nurse or caregiver quickly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={PHONE_TEL} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-emerald-800 hover:shadow-xl transition">
              <Phone size={18} /> {PHONE}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-8 py-4 font-bold hover:bg-white/10 transition">
              <MessageCircle size={18} /> WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}