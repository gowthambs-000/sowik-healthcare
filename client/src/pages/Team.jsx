import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { GraduationCap, Briefcase, Languages } from 'lucide-react';
import { NURSES } from '../data/siteData';
import { api } from '../utils/api';

const availColor = { Available: 'bg-care-50 text-care-700', 'On Duty': 'bg-amber-50 text-amber-700', Unavailable: 'bg-slate-100 text-slate-500' };

export default function Team() {
  const [nurses, setNurses] = useState(NURSES);
  useEffect(() => { api.get('/nurses').then(d => d.length && setNurses(d)).catch(() => {}); }, []);

  return (
    <div className="pt-[104px]">
      <PageHeader title="Our Team" subtitle="Verified, police-checked and hospital-trained nurses, caregivers and physiotherapists." />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nurses.map((n, i) => (
            <Reveal key={n._id} delay={(i % 3) * 80}>
              <div className="card h-full">
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary-100 to-care-100 text-xl font-extrabold text-primary-700">
                    {n.name.split(' ').slice(-2).map(w => w[0]).join('')}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-800">{n.name}</h3>
                    <span className={`badge ${availColor[n.availability] || availColor.Available} mt-1`}>{n.availability}</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p className="flex items-center gap-2"><GraduationCap size={16} className="text-primary-500" /> {n.qualification}</p>
                  <p className="flex items-center gap-2"><Briefcase size={16} className="text-primary-500" /> {n.experience} experience · {n.specialization}</p>
                  <p className="flex items-center gap-2"><Languages size={16} className="text-primary-500" /> {(n.languages || []).join(', ')}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}