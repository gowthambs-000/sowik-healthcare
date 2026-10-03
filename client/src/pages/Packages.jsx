import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Star, Sun, Moon, Clock, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { PACKAGES, PHONE, PHONE_TEL, WHATSAPP } from '../data/siteData';
import { api } from '../utils/api';

const PERIODS = ['All', 'Daily', 'Weekly', 'Monthly'];

const shiftIcon = (shift = '') => {
  const s = shift.toLowerCase();
  if (s.includes('night')) return Moon;
  if (s.includes('day') && !s.includes('full')) return Sun;
  return Clock;
};

export default function Packages() {
  const [packages, setPackages] = useState(PACKAGES);
  const [period, setPeriod] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/packages')
      .then((d) => Array.isArray(d) && d.length && setPackages(d))
      .catch(() => {});
  }, []);

  const shown = packages.filter((p) => period === 'All' || (p.period || '').toLowerCase() === period.toLowerCase());

  return (
    <div className="pt-[104px] bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Care Packages</h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            12 and 24-hour shifts, day and night plans, plus weekly and monthly packages. Prices start
            from the amounts below. Contact us for a quote that fits your family.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Period filter */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition cursor-pointer ${
                  period === p ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {shown.map((p) => {
            const Icon = shiftIcon(p.shift);
            return (
              <article
                key={p._id || p.name}
                className={`relative flex w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-col rounded-3xl bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                  p.popular ? 'border-2 border-emerald-500 shadow-xl' : 'border border-slate-200 shadow-sm'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-md">
                    <Star size={12} fill="currentColor" /> Most popular
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${p.popular ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    <Icon size={22} />
                  </span>
                  <p className="text-sm font-semibold text-slate-500">
                    {p.shift} · {p.hours === 'Custom' ? 'Custom hours' : `${p.hours} hrs`}
                  </p>
                </div>

                <h2 className="mt-5 text-xl font-extrabold text-slate-900">{p.name}</h2>

                <div className="mt-4">
                  <p className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tight text-slate-900">
                      ₹{Number(p.price).toLocaleString('en-IN')}
                    </span>
                    <span className="text-base font-semibold text-emerald-700">onwards</span>
                  </p>
                  <p className="mt-1 text-sm text-slate-500">billed {(p.period || '').toLowerCase()}</p>
                </div>

                <ul className="mt-6 flex-1 space-y-3 border-t border-slate-100 pt-6 text-sm text-slate-700">
                  {(p.features || []).map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate('/book-a-nurse', { state: { package: p.name } })}
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-bold transition cursor-pointer ${
                    p.popular
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700'
                      : 'border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  Book this package <ArrowRight size={16} />
                </button>
              </article>
            );
          })}
        </div>

        {shown.length === 0 && (
          <p className="mt-12 text-center text-slate-500">No packages in this category yet.</p>
        )}

        <p className="mt-12 text-center text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
          * Prices are starting prices and may vary based on patient condition, location and service type.
          Final quote is confirmed after a free assessment.
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="rounded-[2rem] bg-slate-900 p-10 sm:p-14 text-center text-white">
          <h2 className="text-3xl font-black tracking-tight">Need a custom plan?</h2>
          <p className="mt-3 text-slate-300 max-w-lg mx-auto">
            Tell us about the patient&apos;s needs and we will put together a plan and quote for you, free of charge.
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