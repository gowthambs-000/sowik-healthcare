import { useEffect, useState } from 'react';
import { Star, MapPin, HeartPulse, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/siteData';
import { api } from '../utils/api';

const initials = (name = '') =>
  name
    .replace(/^(Mr|Mrs|Ms|Mss|Miss|Sr|Dr)\.?\s+/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

// Match reviews by name + message so the same review isn't shown twice
const key = (t) => `${(t.name || '').trim().toLowerCase()}|${(t.message || '').trim().toLowerCase()}`;

// Keep every review from the API, and add any review from siteData.js
// that the API doesn't have yet (so the new ones don't vanish).
const mergeTestimonials = (fromApi) => {
  const inApi = new Set(fromApi.map(key));
  const extras = TESTIMONIALS.filter((t) => !inApi.has(key(t)));
  return [...extras, ...fromApi];
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);

  useEffect(() => {
    api
      .get('/testimonials')
      .then((d) => Array.isArray(d) && d.length && setTestimonials(mergeTestimonials(d)))
      .catch(() => {});
  }, []);

  return (
    <div className="pt-[104px] bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Testimonials</h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stories from Bangalore families who found peace of mind with Sowik.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold">
            <ShieldCheck size={16} className="text-emerald-300" /> Trusted by 1,000+ families
          </span>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <article
              key={t._id || key(t)}
              className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              {/* Name first */}
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-lg font-extrabold text-white shadow-md">
                  {initials(t.name)}
                </span>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 leading-tight">{t.name}</h2>
                  {t.location && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={13} className="text-emerald-600" /> {t.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Then their description */}
              <div className="mt-5 flex flex-1 flex-col border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, j) => (
                      <Star key={j} size={16} fill="currentColor" />
                    ))}
                  </div>
                  {t.service && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      <HeartPulse size={13} /> {t.service}
                    </span>
                  )}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{t.message}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}