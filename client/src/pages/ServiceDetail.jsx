import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, CheckCircle2, ArrowLeft, ArrowRight, Phone, MessageCircle, ShieldCheck, Timer, Stethoscope, ChevronDown } from 'lucide-react';
import EnquiryCTA from '../components/EnquiryCTA';
import Reveal from '../components/Reveal';
import { SERVICES } from '../data/siteData';
import { api } from '../utils/api';

const PHONE_DISPLAY = '+91 88845 11711';
const PHONE_TEL = '+918884511711';
const WHATSAPP = '918884511711';

const STEPS = [
  { icon: Phone, title: 'Reach out', text: 'Call, WhatsApp or send an enquiry with the patient\'s needs.' },
  { icon: Stethoscope, title: 'Free consultation', text: 'Our clinical team understands the requirement and suggests the right care.' },
  { icon: Timer, title: 'Care starts', text: 'A trained professional is deployed at home, usually within 2–12 hours.' }
];

const FAQS = [
  { q: 'How quickly can care start?', a: 'Deployment is usually within 2–12 hours of confirming the requirement.' },
  { q: 'Is there a consultation fee?', a: 'No. The first consultation with our clinical team is free.' },
  { q: 'Which areas do you cover?', a: 'We serve all areas of Bangalore, 24/7, 365 days a year.' }
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(SERVICES.find((s) => s.slug === slug) || SERVICES[0]);

  useEffect(() => {
    api.get(`/services/${slug}`).then(setService).catch(() =>
      setService(SERVICES.find((s) => s.slug === slug) || SERVICES[0]));
    window.scrollTo(0, 0);
  }, [slug]);

  const related = SERVICES.filter((s) => s.slug !== service.slug && s.category === service.category).slice(0, 3);
  const more = related.length ? related : SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="pt-[104px] bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-20 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <Link to="/services" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition">
              <ArrowLeft size={15} /> All Services
            </Link>
            {service.category && (
              <span className="mt-5 block w-fit rounded-full bg-emerald-400/15 border border-emerald-300/30 px-3.5 py-1 text-xs font-bold text-emerald-200">
                {service.category}
              </span>
            )}
            <h1 className="mt-3 text-3xl md:text-5xl font-black leading-tight">{service.name}</h1>
            <p className="mt-4 text-slate-300 max-w-2xl leading-relaxed">
              {service.description || service.shortDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {service.duration && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm font-bold">
                  <Clock size={15} /> {service.duration}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm font-bold">
                <ShieldCheck size={15} /> Trained & verified staff
              </span>
            </div>
          </div>

          {/* Quick contact card */}
          <div className="rounded-3xl bg-white text-slate-900 p-6 shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Need this service?</p>
            <h2 className="mt-1 text-xl font-black">Talk to our care team</h2>
            <p className="mt-1 text-sm text-slate-500">Free consultation. Care can start in 2–12 hours.</p>
            <div className="mt-5 space-y-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 text-sm transition"
              >
                <Phone size={16} /> Call {PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi, I would like to know about ${service.name}`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-sm transition"
              >
                <MessageCircle size={16} /> WhatsApp us
              </a>
            </div>
            <p className="mt-4 text-center text-[11px] text-slate-400">Available 24/7 across Bangalore</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-14 space-y-16">
        {/* Inclusions */}
        {(service.inclusions || []).length > 0 && (
          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">What you get</p>
              <h2 className="mt-1 text-2xl md:text-3xl font-black text-slate-900">Service Inclusions</h2>
              <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.inclusions.map((inc) => (
                  <li
                    key={inc}
                    className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
                      <CheckCircle2 size={20} />
                    </span>
                    <span className="text-sm font-semibold text-slate-700">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {/* How it works */}
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Simple process</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-black text-slate-900">How it works</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {STEPS.map(({ icon: Icon, title, text }, i) => (
                <div key={title} className="relative rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm">
                  <span className="absolute top-4 right-5 text-5xl font-black text-slate-100">{i + 1}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-50 text-primary-600">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 font-extrabold text-slate-900">{title}</h3>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Booking band */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-8 md:p-10 text-white shadow-xl">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative">
              <h3 className="text-xl md:text-2xl font-black">Book {service.name} in Bangalore</h3>
              <p className="mt-2 text-sm text-slate-300 max-w-xl">
                Deployment within 2–12 hours. Free consultation with our clinical team.
              </p>
              <div className="mt-5">
                <EnquiryCTA serviceName={service.name} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Good to know</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-black text-slate-900">Common questions</h2>
            <div className="mt-6 space-y-3">
              {FAQS.map((f) => (
                <details key={f.q} className="group rounded-2xl bg-white border border-slate-200/80 px-5 py-4 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-slate-800">
                    {f.q}
                    <ChevronDown size={18} className="shrink-0 text-slate-400 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Related services */}
        {more.length > 0 && (
          <Reveal>
            <div>
              <div className="flex items-end justify-between gap-3">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">Other services</h2>
                <Link to="/services" className="text-sm font-bold text-primary-600 hover:underline">View all</Link>
              </div>
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                {more.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="group rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="font-extrabold text-slate-900">{s.name}</h3>
                    <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">{s.shortDescription}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary-600">
                      Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}