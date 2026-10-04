import { useEffect, useState } from 'react';
import { GraduationCap, Briefcase, Languages, ShieldCheck, Stethoscope } from 'lucide-react';
import { NURSES } from '../data/siteData';
import { api } from '../utils/api';
import TrustBar from '../components/TrustBar';

const initials = (name = '') =>
  name
    .replace(/^(Mr|Mrs|Ms|Mss|Miss|Sr|Dr)\.?\s+/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

// Normalise a name so "Mr. Varun" and "mr. varun " count as the same person
const key = (n) => (n.name || '').trim().toLowerCase();

// Keep every nurse from the API, and add any nurse from siteData.js
// that the API doesn't have yet (so the new ones don't vanish).
const mergeNurses = (fromApi) => {
  const inApi = new Set(fromApi.map(key));
  const extras = NURSES.filter((n) => !inApi.has(key(n)));
  return [...extras, ...fromApi];
};

export default function Team() {
  const [nurses, setNurses] = useState(NURSES);

  useEffect(() => {
    api
      .get('/nurses')
      .then((d) => Array.isArray(d) && d.length && setNurses(mergeNurses(d)))
      .catch(() => {});
  }, []);

  return (
    <div className="pt-[104px] bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Our Team</h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Verified, police-checked and hospital-trained nurses, caregivers and physiotherapists.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold">
            <ShieldCheck size={16} className="text-emerald-300" /> 100% police verified
          </span>
        </div>
      </section>

      {/* Trust strip */}
      <TrustBar />

      {/* Team grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nurses.map((n) => (
            <article
              key={n._id || n.name}
              className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-xl font-extrabold text-white shadow-md">
                  {initials(n.name)}
                </span>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 leading-tight">{n.name}</h2>
                  {n.qualification && (
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                      <GraduationCap size={16} /> {n.qualification}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 flex-1 space-y-3 border-t border-slate-100 pt-5 text-sm text-slate-700">
                {n.specialization && (
                  <p className="flex items-start gap-2.5">
                    <Stethoscope size={17} className="mt-0.5 shrink-0 text-emerald-600" />
                    <span className="font-semibold text-slate-900">{n.specialization}</span>
                  </p>
                )}
                {n.experience && (
                  <p className="flex items-start gap-2.5">
                    <Briefcase size={17} className="mt-0.5 shrink-0 text-emerald-600" />
                    <span>{n.experience} experience</span>
                  </p>
                )}
                {(n.languages || []).length > 0 && (
                  <p className="flex items-start gap-2.5">
                    <Languages size={17} className="mt-0.5 shrink-0 text-emerald-600" />
                    <span>{n.languages.join(', ')}</span>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}