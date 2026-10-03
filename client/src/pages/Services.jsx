import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EnquiryCTA from '../components/EnquiryCTA';
import { Clock, CheckCircle2, Search, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { SERVICES, SERVICE_CATEGORIES, PHONE, PHONE_TEL, WHATSAPP } from '../data/siteData';
import { api } from '../utils/api';

const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

// Replace any image with your own URL if you prefer a different photo.
const SERVICE_IMAGES = {
  'newborn-baby-mother-care': U('1555252333-9f8e92e65df9'),
  'night-nanny-infant-care': U('1519689680058-324335c77eba'),
  'preterm-infant-care': U('1544126592-807ade215a0b'),
  'elderly-care': U('1576765608535-5f04d1e3f289'),
  'bedridden-care': U('1584515979956-d9f6e5d09982'),
  'dementia-alzheimers-care': U('1576765608535-5f04d1e3f289'),
  'attendant-caregiver': U('1584515933487-779824d29309'),
  '24-7-nursing': U('1584516150909-c43483ee7932'),
  'wound-care': U('1629909613654-28e377c37b09'),
  'medication-assistance': U('1631815589968-fdb09a223b1e'),
  'vital-monitoring': U('1505751172876-fa1923c5c528'),
  'post-surgery': U('1551076805-e1869033e561'),
  'post-hospitalization': U('1586773860418-d37222d8fce3'),
  'palliative-care': U('1516549655169-df83a0774514'),
  physiotherapy: U('1576091160550-2173dba999ef')
};

const CATEGORY_FALLBACK = {
  'Baby Care': SERVICE_IMAGES['newborn-baby-mother-care'],
  'Elderly Care': SERVICE_IMAGES['elderly-care'],
  'Nursing Services': SERVICE_IMAGES['24-7-nursing'],
  'Post-Operative Care': SERVICE_IMAGES['post-surgery'],
  'Rehabilitation & Therapy': SERVICE_IMAGES.physiotherapy
};

const CATEGORY_MAP = {
  'newborn-baby-mother-care': 'Baby Care',
  'night-nanny-infant-care': 'Baby Care',
  'preterm-infant-care': 'Baby Care',
  'elderly-care': 'Elderly Care',
  'bedridden-care': 'Elderly Care',
  'dementia-alzheimers-care': 'Elderly Care',
  'attendant-caregiver': 'Elderly Care',
  'post-surgery': 'Post-Operative Care',
  'post-hospitalization': 'Post-Operative Care',
  'palliative-care': 'Post-Operative Care',
  physiotherapy: 'Rehabilitation & Therapy',
  '24-7-nursing': 'Nursing Services',
  'wound-care': 'Nursing Services',
  'medication-assistance': 'Nursing Services',
  'vital-monitoring': 'Nursing Services'
};

const resolveCategory = (s) =>
  s.category && s.category !== 'Nursing Services' ? s.category : CATEGORY_MAP[s.slug] || 'Nursing Services';

const prepare = (s) => {
  const category = resolveCategory(s);
  return {
    ...s,
    category,
    shortDescription: s.shortDescription || s.description,
    displayImage: s.image || SERVICE_IMAGES[s.slug] || CATEGORY_FALLBACK[category] || SERVICE_IMAGES['24-7-nursing']
  };
};

export default function Services() {
  const [services, setServices] = useState(SERVICES.map(prepare));
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    api
      .get('/services')
      .then((apiData) => {
        if (Array.isArray(apiData) && apiData.length > 0) {
          const fromApi = apiData.map(prepare);
          const have = new Set(fromApi.map((s) => s.slug));
          const missing = SERVICES.filter((s) => !have.has(s.slug)).map(prepare);
          setServices([...fromApi, ...missing]);
        }
      })
      .catch(() => {});
  }, []);

  const countFor = (cat) =>
    cat === 'All' ? services.length : services.filter((s) => s.category.toLowerCase() === cat.toLowerCase()).length;

  const filtered = useMemo(
    () =>
      services.filter(
        (s) =>
          (selectedCategory === 'All' || s.category.toLowerCase() === selectedCategory.toLowerCase()) &&
          `${s.name} ${s.shortDescription || ''}`.toLowerCase().includes(query.toLowerCase())
      ),
    [services, selectedCategory, query]
  );

  return (
    <div className="pt-[104px] bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Our Healthcare Services</h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {services.length}+ specialised home healthcare services, delivered by verified professionals across India.
          </p>
          <label className="relative mt-8 mx-auto block max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, e.g. wound care"
              className="w-full rounded-full bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:ring-emerald-400"
            />
          </label>
        </div>
      </section>

      {/* Category filter */}
      <div className="sticky top-[104px] z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto md:flex-wrap md:justify-center">
          {SERVICE_CATEGORIES.map((cat) => {
            const on = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold border transition cursor-pointer ${
                  on
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                {cat}
                <span className={`rounded-full px-2 py-0.5 text-xs ${on ? 'bg-white/20' : 'bg-slate-100 text-slate-600'}`}>
                  {countFor(cat)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((s) => (
            <article
              key={s.slug || s.name}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <img
                  src={s.displayImage}
                  alt={`${s.name} home healthcare service`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-sky-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md">
                  {s.category}
                </span>
                {s.duration && (
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800">
                    <Clock size={13} className="text-emerald-600" /> {s.duration}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {s.name}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {s.description || s.shortDescription}
                </p>

                {(s.inclusions || []).length > 0 && (
                  <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    {s.inclusions.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-500" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  {s.slug ? (
                    <Link
                      to={`/services/${s.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:underline"
                    >
                      View details <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <span />
                  )}
                  <EnquiryCTA serviceName={s.name} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white py-20 text-center">
            <p className="text-lg text-slate-500">No services match your search.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setQuery(''); }}
              className="mt-3 font-bold text-emerald-700 hover:underline cursor-pointer"
            >
              View all services
            </button>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="rounded-[2rem] bg-slate-900 p-10 sm:p-14 text-center text-white">
          <h2 className="text-3xl font-black tracking-tight">Not sure which service you need?</h2>
          <p className="mt-3 text-slate-300 max-w-lg mx-auto">
            Tell us about the patient and our care coordinator will recommend the right care plan, free of charge.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={PHONE_TEL} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-slate-900 hover:bg-emerald-100 transition">
              <Phone size={18} /> {PHONE}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-8 py-4 font-bold hover:bg-white/10 transition">
              <MessageCircle size={18} /> WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}