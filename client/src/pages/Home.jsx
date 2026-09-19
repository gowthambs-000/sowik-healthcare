import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Clock, Stethoscope, UserCheck, Phone, MessageCircle, ArrowRight, CheckCircle2, Star, AlertTriangle } from 'lucide-react';
import Reveal from '../components/Reveal';
import { SERVICES, PACKAGES, NURSES, TESTIMONIALS, FAQS, PHONE, PHONE_TEL, WHATSAPP } from '../data/siteData';
import { api } from '../utils/api';
import { useEffect, useState } from 'react';

const whyUs = [
  { icon: ShieldCheck, title: '100% Police Verified', text: 'Every nurse is background-checked and police-verified before home deployment.' },
  { icon: Stethoscope, title: 'Qualified GNM / B.Sc', text: 'Hospital-trained registered nurses with ICU, post-op and critical care expertise.' },
  { icon: Clock, title: '2–12 Hour Deployment', text: 'Rapid caregiver deployment anywhere in Bangalore, 365 days a year.' },
  { icon: UserCheck, title: 'Doctor Supervision', text: 'Regular supervisor visits and tele-consultation to keep recovery on track.' }
];

const steps = [
  { n: '01', title: 'Share Patient Needs', text: 'Call or WhatsApp us with patient details, Bangalore location and care requirements.' },
  { n: '02', title: 'Free Assessment & Match', text: 'Our Clinical Lead matches a verified nurse or caregiver specialized in your need.' },
  { n: '03', title: 'Nurse Arrives', text: 'Your assigned nurse arrives with an initial vital checkup and care chart creation.' },
  { n: '04', title: 'Continuous Monitoring', text: 'Doctor oversight, replacements when needed, and a 24/7 care manager helpline.' }
];

export default function Home() {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState(FAQS.slice(0, 4));
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => { api.get('/faqs').then(setFaqs).catch(() => {}); }, []);

  return (
    <div className="pt-[104px]">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-care-600 text-white">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-care-400/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="badge !bg-white/15 !text-white mb-4">Serving all areas of Bangalore, 24/7</span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
              Professional Healthcare <span className="text-care-200">at Your Doorstep</span>
            </h1>
            <p className="mt-5 text-lg text-white/85 max-w-xl">
              Sowik Home Health Care deploys certified GNM/B.Sc nurses, senior caregivers and physiotherapists to your home within 2–12 hours — for elderly, post-surgery, bedridden and chronic care patients.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => navigate('/book-a-nurse')} className="rounded-full bg-white px-7 py-3.5 font-bold text-primary-700 shadow-xl hover:-translate-y-0.5 transition flex items-center gap-2">
                Book a Nurse <ArrowRight size={18} />
              </button>
              <a href={PHONE_TEL} className="rounded-full border-2 border-white/60 px-7 py-3.5 font-bold hover:bg-white/10 transition flex items-center gap-2">
                <Phone size={18} /> Call Now: {PHONE}
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[['1,000+', 'Happy Families'], ['100%', 'Verified Nurses'], ['2–12h', 'Deployment']].map(([v, l]) => (
                <div key={l} className="rounded-2xl bg-white/10 backdrop-blur p-4 text-center">
                  <p className="text-2xl font-extrabold">{v}</p><p className="text-xs text-white/75">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150} className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Elderly Care', '👴'], ['Post-Surgery', '🏥'], ['24/7 Nursing', '🩺'],
                ['Physiotherapy', '💪'], ['Wound Care', '🩹'], ['Palliative Care', '💚']
              ].map(([t, e]) => (
                <div key={t} className="rounded-2xl bg-white/95 text-slate-800 p-5 shadow-xl hover:-translate-y-1 transition">
                  <span className="text-3xl">{e}</span>
                  <p className="mt-2 font-bold text-sm">{t}</p>
                  <p className="text-xs text-care-600 font-semibold mt-0.5">At-home service</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <Reveal className="text-center mb-12">
          <span className="badge">Our Services</span>
          <h2 className="section-title mt-3">Complete Home Healthcare, One Call Away</h2>
          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">From daily elderly support to 24/7 critical nursing — every service delivered by verified professionals at your Bangalore home.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.slice(0, 8).map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <Link to={`/services/${s.slug}`} className="card block h-full group">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition"><CheckCircle2 size={22} /></span>
                <h3 className="mt-4 font-bold text-slate-800 group-hover:text-primary-600 transition">{s.name}</h3>
                <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">{s.shortDescription}</p>
                <p className="mt-3 text-xs font-bold text-care-600">{s.duration}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="btn-outline">View All 12+ Services</Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4">
        <Reveal>
          <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6 flex items-start gap-4">
            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={26} />
            <div>
              <h3 className="font-extrabold text-red-700">Medical Emergency Notice</h3>
              <p className="text-sm text-red-600 mt-1">
                Sowik Home Health Care is <strong>not</strong> an emergency medical service. For life-threatening emergencies (chest pain, stroke, severe bleeding, breathing difficulty), call <strong>108 / 112</strong> or rush to the nearest hospital immediately.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-slate-50 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <span className="badge">Why Choose Us</span>
            <h2 className="section-title mt-3">Unmatched Quality Standards</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <div className="card text-center h-full">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-care-500 text-white"><w.icon size={26} /></span>
                  <h3 className="mt-4 font-bold text-slate-800">{w.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <Reveal className="text-center mb-12">
          <span className="badge">Simple Process</span>
          <h2 className="section-title mt-3">Care in 4 Easy Steps</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="card relative h-full">
                <span className="text-5xl font-extrabold text-primary-100 absolute top-4 right-5">{s.n}</span>
                <h3 className="font-bold text-slate-800 relative">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-500 relative">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10"><button onClick={() => navigate('/book-a-nurse')} className="btn-primary">Start Your Booking</button></div>
      </section>

      <section className="bg-gradient-to-br from-primary-700 to-care-700 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <h2 className="section-title !text-white">Flexible Care Packages</h2>
            <p className="text-white/80 mt-3">8-hour day care to 24/7 live-in — and weekly & monthly long-term plans.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PACKAGES.slice(0, 4).map((p, i) => (
              <Reveal key={p._id} delay={i * 70}>
                <div className="rounded-2xl bg-white/10 backdrop-blur p-6 hover:bg-white/15 transition h-full">
                  <p className="text-xs font-bold uppercase tracking-wider text-care-200">{p.shift} Shift</p>
                  <h3 className="font-bold text-lg mt-1">{p.name}</h3>
                  <p className="mt-3"><span className="text-3xl font-extrabold">₹{p.price.toLocaleString('en-IN')}</span><span className="text-white/70 text-sm"> / {p.period.toLowerCase()}</span></p>
                  <ul className="mt-4 space-y-1.5 text-sm text-white/85">
                    {p.features.slice(0, 3).map(f => <li key={f} className="flex gap-2"><CheckCircle2 size={15} className="shrink-0 mt-0.5 text-care-300" />{f}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10"><Link to="/packages" className="rounded-full bg-white px-7 py-3 font-bold text-primary-700 hover:-translate-y-0.5 transition inline-block">View All Packages</Link></div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <Reveal className="text-center mb-12">
          <span className="badge">Our Team</span>
          <h2 className="section-title mt-3">Meet Our Verified Care Professionals</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {NURSES.slice(0, 3).map((n, i) => (
            <Reveal key={n._id} delay={i * 80}>
              <div className="card text-center">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary-100 to-care-100 text-2xl font-extrabold text-primary-700">
                  {n.name.split(' ').slice(-2).map(w => w[0]).join('')}
                </span>
                <h3 className="mt-4 font-bold text-slate-800">{n.name}</h3>
                <p className="text-sm text-care-600 font-semibold">{n.qualification} · {n.experience}</p>
                <p className="text-sm text-slate-500 mt-1">{n.specialization}</p>
                <span className="badge mt-3">{n.availability}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10"><Link to="/team" className="btn-outline">View Full Team</Link></div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <span className="badge">Testimonials</span>
            <h2 className="section-title mt-3">Trusted by Bangalore Families</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t._id} delay={i * 80}>
                <div className="card h-full">
                  <div className="flex gap-1 text-amber-400">{[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}</div>
                  <p className="mt-3 text-sm text-slate-600 italic">"{t.message}"</p>
                  <p className="mt-4 font-bold text-slate-800 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.location} · {t.service}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-20">
        <Reveal className="text-center mb-10">
          <span className="badge">FAQ</span>
          <h2 className="section-title mt-3">Common Questions</h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.slice(0, 4).map((f, i) => (
            <Reveal key={f._id} delay={i * 50}>
              <div className="card !p-0 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-800 text-sm">
                  {f.question}
                  <span className={`text-primary-600 transition ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && <p className="px-5 pb-5 text-sm text-slate-500">{f.answer}</p>}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-8"><Link to="/faq" className="btn-outline">View All FAQs</Link></div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-20">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-r from-care-600 to-primary-600 p-10 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-extrabold">Need a Nurse Today?</h2>
            <p className="text-white/85 mt-2">Deployment within 2–12 hours, anywhere in Bangalore.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button onClick={() => navigate('/book-a-nurse')} className="rounded-full bg-white px-7 py-3 font-bold text-primary-700 hover:-translate-y-0.5 transition">Book a Nurse</button>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-full border-2 border-white/60 px-7 py-3 font-bold hover:bg-white/10 transition flex items-center gap-2"><MessageCircle size={18} /> WhatsApp Us</a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}