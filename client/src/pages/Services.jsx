import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import EnquiryCTA from '../components/EnquiryCTA';
import { Clock, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../data/siteData';
import { api } from '../utils/api';

export default function Services() {
  const [services, setServices] = useState(SERVICES);
  useEffect(() => { api.get('/services').then(d => setServices(d.map(s => ({ ...s, shortDescription: s.shortDescription, slug: s.slug })))).catch(() => {}); }, []);

  return (
    <div className="pt-[104px]">
      <PageHeader title="Our Services" subtitle="12+ specialized home healthcare services delivered by verified professionals anywhere in Bangalore." />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 80}>
              <div className="card h-full flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-extrabold text-xl text-slate-800">{s.name}</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">{s.description || s.shortDescription}</p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600"><Clock size={22} /></span>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-care-600 mb-2">What's Included</p>
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                    {(s.inclusions || []).slice(0, 4).map(inc => (
                      <li key={inc} className="flex gap-2 text-sm text-slate-600"><CheckCircle2 size={15} className="text-care-500 shrink-0 mt-0.5" />{inc}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm font-bold text-primary-600 flex items-center gap-1.5"><Clock size={15} /> {s.duration}</span>
                  <EnquiryCTA serviceName={s.name} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}