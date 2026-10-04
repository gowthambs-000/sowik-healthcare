import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Clock, Stethoscope, UserCheck, Phone, MessageCircle,
  ArrowRight, CheckCircle2, Star, AlertTriangle, HeartPulse, Quote
} from 'lucide-react';
import {
  SERVICES, PACKAGES, NURSES, TESTIMONIALS, FAQS, PHONE, PHONE_TEL, WHATSAPP
} from '../data/siteData';
import { api } from '../utils/api';
import { useEffect, useRef, useState } from 'react';

// Fades content in on scroll. Falls back to visible if the observer
// is unavailable or never fires, so sections can never stay blank.
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px 120px 0px' }
    );
    io.observe(el);
    const fallback = setTimeout(() => setShown(true), 2500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(16px)',
        transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

const FALLBACK = {
  hero: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
  family: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
  support: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80',
  bg: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1920&q=70'
};

// Shows your own photo from the /public folder; if the file is missing, uses the fallback photo.
function Photo({ src, fallback, alt, className = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={(e) => {
        if (e.currentTarget.dataset.fb) return;
        e.currentTarget.dataset.fb = '1';
        e.currentTarget.src = fallback;
      }}
    />
  );
}

const HERO_IMAGES = [
  { src: '/hero-grandfather.jpg', fb: FALLBACK.hero, alt: 'Nurse caring for an elderly man at home' },
  { src: '/hero-2.jpg', fb: FALLBACK.family, alt: 'Nurse checking an elderly woman at home' },
  { src: '/hero-3.jpg', fb: FALLBACK.support, alt: 'Physiotherapist helping an elderly man exercise' }
];

// Hero photos that fade into each other every 5 seconds
function HeroSlides() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative h-full w-full">
      {HERO_IMAGES.map((h, k) => (
        <Photo
          key={h.src}
          src={h.src}
          fallback={h.fb}
          alt={h.alt}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${i === k ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {HERO_IMAGES.map((h, k) => (
          <button
            key={h.src}
            onClick={() => setI(k)}
            aria-label={`Show photo ${k + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${i === k ? 'w-6 bg-white' : 'w-2 bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
}

const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=70`;
const BG_IMAGES = [
  { src: '/bg-quality.jpg', fb: U('1586773860418-d37222d8fce3') },
  { src: '/bg-process.jpg', fb: U('1584515979956-d9f6e5d09982') },
  { src: '/bg-packages.jpg', fb: U('1516549655169-df83a0774514') },
  { src: '/bg-team.jpg', fb: U('1576091160550-2173dba999ef') }
];

// Background photo that changes as you scroll. Sections marked data-bg="0..3" pick the photo.
function ScrollBackground({ children }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.bg))),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    document.querySelectorAll('[data-bg]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative mt-12 bg-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 h-screen overflow-hidden">
          {BG_IMAGES.map((b, i) => (
            <Photo
              key={b.src}
              src={b.src}
              fallback={b.fb}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${active === i ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-white/60" />
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

const whyUs = [
  { icon: ShieldCheck, title: '100% Police Verified', text: 'Every nurse is background-checked and police-verified before home deployment.' },
  { icon: Stethoscope, title: 'Qualified GNM / B.Sc', text: 'Hospital-trained registered nurses with ICU, post-op and critical care expertise.' },
  { icon: Clock, title: '2–12 Hour Deployment', text: 'Rapid caregiver deployment across India, 365 days a year.' },
  { icon: UserCheck, title: 'Doctor Supervision', text: 'Regular supervisor visits and tele-consultation to keep recovery on track.' }
];

const steps = [
  ['Share patient needs', 'Call or WhatsApp us with patient details, location and care requirements.'],
  ['Free assessment & match', 'Our Clinical Lead matches a verified nurse specialised in your need.'],
  ['Nurse arrives', 'Your nurse arrives with an initial vital checkup and a care chart.'],
  ['Continuous monitoring', 'Doctor oversight, replacements when needed, and a 24/7 helpline.']
];

const quick = [
  ['Elderly Care', 'Assistance & vitals', '/services/elderly-care'],
  ['Baby Care', 'Newborn & mother', '/services'],
  ['24/7 Nursing', 'GNM/B.Sc ICU care', '/services/24-7-nursing'],
  ['Post-Surgery', 'Sterile wound care', '/services/post-surgery'],
  ['Physiotherapy', 'BPT rehab at home', '/services/physiotherapy'],
  ['Bedridden Care', '24h hygiene & turning', '/services/bedridden-care']
];

const Heading = ({ badge, title, text, light }) => (
  <Reveal className="text-center mb-9">
    <span className="badge">{badge}</span>
    <h2 className={`mt-3 text-3xl md:text-4xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    {text && <p className={`mt-3 max-w-2xl mx-auto ${light ? 'text-white/80' : 'text-slate-600'}`}>{text}</p>}
    <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-care-400" />
  </Reveal>
);

export default function Home() {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState(FAQS.slice(0, 4));
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    api.get('/faqs').then(setFaqs).catch(() => {});
  }, []);

  return (
    <div className="pt-[104px] bg-gradient-to-b from-white via-slate-50 to-white">
      <style>{`
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes pulseRing{0%{box-shadow:0 0 0 0 rgba(52,211,153,.6)}100%{box-shadow:0 0 0 14px rgba(52,211,153,0)}}
        @keyframes kenburns{from{transform:scale(1.05)}to{transform:scale(1.15)}}
        .floaty{animation:floaty 5s ease-in-out infinite}
        .ring{animation:pulseRing 1.8s infinite}
        .kb{animation:kenburns 18s ease-in-out infinite alternate}
        @media (prefers-reduced-motion:reduce){.floaty,.ring,.kb{animation:none}}
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-24 lg:pt-16 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur-md border border-white/20">
                <span className="ring h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Nurses available now across India, 24/7
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight">
                <span className="text-sky-300">Hospital-grade</span> <span className="text-white">care,</span>
                <span className="block">
                  <span className="text-emerald-300">in the comfort of</span> <span className="text-amber-300">home.</span>
                </span>
              </h1>

              <p className="mt-6 text-lg text-slate-200 max-w-xl leading-relaxed">
                Sowik Home Health Care sends{' '}
                <span className="font-semibold text-emerald-300">certified GNM/B.Sc nurses</span>,{' '}
                <span className="font-semibold text-sky-300">senior caregivers</span>,{' '}
                <span className="font-semibold text-amber-300">baby care specialists</span> and{' '}
                <span className="font-semibold text-rose-300">physiotherapists</span> to your door within{' '}
                <span className="font-semibold text-emerald-300">2–12 hours</span>.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/book-a-nurse')}
                  className="group rounded-full bg-emerald-500 px-8 py-4 font-bold shadow-xl shadow-emerald-500/30 hover:bg-emerald-400 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  Book a Nurse
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={PHONE_TEL}
                  className="rounded-full border border-white/50 bg-white/5 px-7 py-4 font-bold backdrop-blur-md hover:bg-white/15 transition flex items-center gap-2"
                >
                  <Phone size={18} /> {PHONE}
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
                {[['1,000+', 'Happy families'], ['100%', 'Verified nurses'], ['2–12h', 'Deployment']].map(([v, l]) => (
                  <div key={l} className="border-l-2 border-emerald-400 pl-4">
                    <p className="text-3xl font-black">{v}</p>
                    <p className="text-xs text-slate-300 font-medium">{l}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {quick.map(([title, , link]) => (
                  <Link
                    key={title}
                    to={link}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold hover:bg-white hover:text-slate-900 transition"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Clear, un-blurred photo */}
          <div className="relative">
            <Reveal delay={150}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/20">
                <HeroSlides />
              </div>
              <div className="floaty absolute -bottom-6 left-4 sm:left-8 flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 text-slate-900 shadow-2xl">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500 text-white">
                  <ShieldCheck size={22} />
                </span>
                <div className="leading-tight">
                  <p className="font-extrabold text-sm">100% police verified</p>
                  <p className="text-xs text-slate-500">Nurses and caregivers</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="relative z-10 -mt-10 max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-3xl bg-slate-200 shadow-xl">
          {whyUs.map((item) => (
            <div key={item.title} className="bg-white p-5 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
                <item.icon size={22} />
              </span>
              <p className="font-bold text-sm text-slate-800">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <Heading
          badge="Our Services"
          title="Complete home healthcare, one call away"
          text="From daily elderly support and baby care to 24/7 critical nursing, delivered by verified professionals at your home."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.slice(0, 4).map((s, i) => (
            <Reveal key={s.slug || s.name} delay={i * 60}>
              <Link
                to={`/services/${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-7 border border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl hover:shadow-primary-500/20"
              >
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary-500 to-care-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-600 bg-gradient-to-br from-primary-500 to-care-500 text-white shadow-lg">
                  <HeartPulse size={22} />
                </span>
                <span className="mt-5 text-xs font-bold text-care-600">{s.category || 'Home Care'}</span>
                <h3 className="mt-1 font-extrabold text-xl text-slate-900 group-hover:text-primary-600 transition-colors">{s.name}</h3>
                <p className="mt-3 flex-grow text-sm leading-relaxed text-slate-600">
                  {s.shortDescription || s.description || 'Professional home healthcare provided by trained care staff.'}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary-600">
                  Learn more <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-bold text-white hover:bg-primary-600 transition shadow-lg">
            View all services <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Care that feels like family */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
              <Photo
                src="/care-family.jpg"
                fallback={FALLBACK.family}
                alt="Caregiver helping an older person at home"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="badge">Care that feels like family</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Gentle, dignified care for your loved ones
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Our nurses and caregivers look after parents and grandparents with patience, respect and
              medical skill, so they can recover and live comfortably in their own home.
            </p>
            <ul className="mt-6 space-y-3 text-slate-700">
              {[
                'Trained nurses for daily care, medication and vitals',
                'A care plan built around your family’s routine',
                'Doctor supervision and regular updates for the family'
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-500" />
                  {t}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/book-a-nurse')}
              className="mt-8 rounded-full bg-slate-900 px-8 py-3.5 font-bold text-white hover:bg-emerald-600 transition cursor-pointer"
            >
              Book a Nurse
            </button>
          </Reveal>
        </div>
      </section>

      {/* Emergency notice */}
      <section className="max-w-5xl mx-auto px-4">
        <Reveal>
          <div className="rounded-3xl border border-red-200 border-l-8 border-l-red-500 bg-red-50 p-6 sm:p-8 flex items-start gap-4">
            <AlertTriangle className="text-red-500 shrink-0 mt-1" size={28} />
            <div>
              <h3 className="font-extrabold text-red-800 text-lg">Medical emergency notice</h3>
              <p className="text-sm text-red-700/90 mt-1.5 leading-relaxed">
                Sowik Home Health Care is <strong>not</strong> an emergency ambulance service. For life-threatening
                emergencies (acute chest pain, stroke symptoms, heavy trauma, breathing arrest), dial{' '}
                <strong>108 / 112</strong> or go to the nearest hospital immediately.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <ScrollBackground>
      {/* Why us */}
      <section data-bg="0" className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <Heading badge="Why Choose Us" title="Unmatched quality standards" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="h-full rounded-3xl bg-white p-7 text-center shadow-sm border border-slate-100 hover:shadow-xl transition">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-600 bg-gradient-to-br from-primary-500 to-care-500 text-white shadow-lg ring-8 ring-primary-50">
                    <item.icon size={28} />
                  </span>
                  <h3 className="mt-5 font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section data-bg="1" className="max-w-7xl mx-auto px-4 py-14">
        <Heading badge="Simple Process" title="Care in 4 easy steps" />
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block absolute top-7 left-[12%] right-[12%] border-t-2 border-dashed border-primary-200" />
          {steps.map(([title, text], i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="relative text-center">
                <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-600 bg-gradient-to-br from-primary-600 to-care-500 text-lg font-black text-white shadow-lg ring-8 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-extrabold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/book-a-nurse')}
            className="rounded-full bg-primary-600 bg-gradient-to-r from-primary-600 to-care-500 px-9 py-4 font-bold text-white shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Start your booking
          </button>
        </div>
      </section>

      {/* Packages */}
      <section data-bg="2" className="relative overflow-hidden bg-slate-950/90 py-14 text-white">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary-600/30 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-care-600/30 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4">
          <Heading
            light
            badge="Packages"
            title="Flexible care packages"
            text="From 8-hour day assistance to round-the-clock live-in nurses, with weekly and monthly savings."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.slice(0, 4).map((p, i) => (
              <Reveal key={p._id} delay={i * 70}>
                <div className={`h-full rounded-3xl p-7 border transition hover:-translate-y-1 ${
                  p.popular ? 'bg-gradient-to-b from-primary-500/30 to-white/5 border-care-400/60 shadow-2xl' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}>
                  {p.popular && <span className="mb-3 inline-block rounded-full bg-care-400 px-3 py-1 text-[11px] font-bold text-slate-900">Most popular</span>}
                  <span className="block text-xs font-semibold text-care-200">{p.shift} shift</span>
                  <h3 className="font-bold text-lg mt-1">{p.name}</h3>
                  <p className="mt-4">
                    <span className="text-4xl font-black">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="text-white/60 text-xs"> / {p.period.toLowerCase()}</span>
                  </p>
                  <ul className="mt-5 space-y-2.5 text-sm text-white/90">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex gap-2 items-start">
                        <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-care-300" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/packages" className="inline-block rounded-full bg-white px-8 py-4 font-bold text-slate-900 hover:bg-care-100 transition">
              View all packages
            </Link>
          </div>
        </div>
      </section>

      {/* Team */}
      <section data-bg="3" className="max-w-7xl mx-auto px-4 py-14">
        <Heading badge="Our Team" title="Meet our verified care professionals" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NURSES.slice(0, 3).map((n, i) => (
            <Reveal key={n._id} delay={i * 80}>
              <div className="rounded-3xl bg-white p-8 text-center border border-slate-200 hover:shadow-xl transition">
                <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-primary-600 bg-gradient-to-br from-primary-500 to-care-400 text-3xl font-black text-white ring-8 ring-primary-50">
                  {n.name.replace(/^(Mr|Mrs|Ms|Mss|Miss|Sr|Dr)\.?\s+/i, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()}
                </span>
                <h3 className="mt-5 font-bold text-lg text-slate-900">{n.name}</h3>
                <p className="text-sm text-care-600 font-semibold mt-1">{n.qualification}{n.experience ? ` · ${n.experience}` : ''}</p>
                <p className="text-sm text-slate-500 mt-1">{n.specialization}</p>
                {n.availability && <span className="badge mt-4">{n.availability}</span>}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/team" className="btn-outline">View full team</Link>
        </div>
      </section>

      </ScrollBackground>

      {/* Testimonials */}
      <section className="py-14 bg-gradient-to-br from-primary-50/70 to-care-50/60">
        <div className="max-w-7xl mx-auto px-4">
          <Heading badge="Testimonials" title="Trusted by families across India" />
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t._id} delay={i * 80}>
                <div className="relative h-full flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm border border-slate-100 hover:shadow-xl transition">
                  <Quote className="absolute top-6 right-6 text-primary-100" size={44} />
                  <div>
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, k) => <Star key={k} size={16} fill="currentColor" />)}
                    </div>
                    <p className="mt-4 text-slate-600 leading-relaxed">&quot;{t.message}&quot;</p>
                  </div>
                  <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-100">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-600 bg-gradient-to-br from-primary-500 to-care-400 font-bold text-white">
                      {t.name[0]}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.location} · {t.service}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-4 py-14">
        <Heading badge="FAQ" title="Common questions" />
        <div className="space-y-3">
          {faqs.slice(0, 4).map((faq, i) => (
            <Reveal key={faq._id} delay={i * 50}>
              <div className={`overflow-hidden rounded-2xl border bg-white transition ${openFaq === i ? 'border-primary-300 shadow-lg' : 'border-slate-200'}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-800 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-600 text-xl transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{faq.answer}</p>}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/faq" className="btn-outline">View all FAQs</Link>
        </div>
      </section>

      {/* Booking callout */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 sm:p-16 text-center text-white shadow-2xl">
            <Photo src="/care-support.jpg" fallback={FALLBACK.support} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/70" />
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10" />
            <div className="relative">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Need a nurse today?</h2>
              <p className="mt-4 max-w-lg mx-auto text-white/90">
                We deploy caregivers within 2–12 hours across India. Talk to our clinical care coordinator now.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/book-a-nurse')}
                  className="rounded-full bg-white px-9 py-4 font-bold text-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  Book a Nurse
                </button>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border-2 border-white/70 px-8 py-4 font-bold hover:bg-white/10 transition flex items-center gap-2"
                >
                  <MessageCircle size={18} /> WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}