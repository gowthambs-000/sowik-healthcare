import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { CheckCircle2, Clock, Star } from 'lucide-react';
import { PACKAGES } from '../data/siteData';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Packages() {
  const [packages, setPackages] = useState(PACKAGES);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/packages').then(d => d.length && setPackages(d)).catch(() => {});
  }, []);

  return (
    <div className="pt-[104px]">
      <PageHeader title="Care Packages" subtitle="8/12/24-hour shifts, day & night plans, plus short- and long-term packages. All pricing is indicative — contact us for a customized quote." />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((p, i) => (
            <Reveal key={p._id} delay={(i % 3) * 80}>
              <div className={`card relative h-full flex flex-col ${p.popular ? 'ring-2 ring-care-500 shadow-xl' : ''}`}>
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-care-500 px-4 py-1 text-xs font-bold text-white flex items-center gap-1"><Star size={11} fill="currentColor" /> Most Popular</span>
                )}
                <p className="text-xs font-bold uppercase tracking-wider text-care-600">{p.shift} · {p.hours} hrs</p>
                <h3 className="mt-1 font-extrabold text-lg text-slate-800">{p.name}</h3>
                <p className="mt-4"><span className="text-4xl font-extrabold text-primary-700">₹{p.price?.toLocaleString('en-IN')}</span> <span className="text-sm text-slate-400">/ {p.period?.toLowerCase()}</span></p>
                <ul className="mt-5 space-y-2 text-sm text-slate-600 flex-1">
                  {(p.features || []).map(f => (
                    <li key={f} className="flex gap-2"><CheckCircle2 size={16} className="text-care-500 shrink-0 mt-0.5" />{f}</li>
                  ))}
                </ul>
                <button onClick={() => navigate('/book-a-nurse', { state: { package: p.name } })} className={`mt-6 w-full ${p.popular ? 'btn-whatsapp' : 'btn-outline'}`}>
                  <Clock size={15} /> Book This Package
                </button>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400 mt-10">* Prices are editable by the admin team and may vary based on patient condition, location and service type. Final quote confirmed after free assessment.</p>
      </section>
    </div>
  );
}