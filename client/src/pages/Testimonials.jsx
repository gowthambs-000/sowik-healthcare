import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/siteData';
import { api } from '../utils/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);
  useEffect(() => { api.get('/testimonials').then(d => d.length && setTestimonials(d)).catch(() => {}); }, []);

  return (
    <div className="pt-[104px]">
      <PageHeader title="Testimonials" subtitle="Real stories from Bangalore families who found peace of mind with Sowik." />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t._id} delay={(i % 3) * 80}>
              <div className="card h-full">
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating || 5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm text-slate-600 italic leading-relaxed">"{t.message}"</p>
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.location} · {t.service}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}