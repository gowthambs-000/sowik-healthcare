import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { HeartHandshake, Target, Eye, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-[104px]">
      <PageHeader title="About Sowik Home Health Care" subtitle="Caring. Professional. Home. — bridging the gap between hospital care and home comfort across Bangalore." />
      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <Reveal>
          <span className="badge">Who We Are</span>
          <h2 className="section-title mt-3 !text-3xl">Sowik Home Health Care Private Limited</h2>
          <p className="mt-4 text-slate-500 leading-relaxed">
            Sowik Home Health Care is Bangalore's trusted home healthcare provider. We bring registered nurses (GNM & B.Sc), trained caregivers and physiotherapists straight to your doorstep — for elderly care, post-surgery recovery, bedridden patients, chronic illness management and palliative support.
          </p>
          <p className="mt-3 text-slate-500 leading-relaxed">
            Every member of our team is 100% police-verified, background-checked and supervised by qualified clinical leads. We deploy care professionals within 2–12 hours across all areas of Bangalore, 365 days a year.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="grid grid-cols-2 gap-4">
            {[['1,000+', 'Happy Families'], ['50+', 'Verified Nurses'], ['12+', 'Care Services'], ['24/7', 'Availability']].map(([v, l]) => (
              <div key={l} className="card text-center !p-5">
                <p className="text-3xl font-extrabold text-primary-600">{v}</p>
                <p className="text-sm text-slate-500 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-5">
          {[
            { icon: HeartHandshake, t: 'Our Mission', d: 'To make professional, compassionate healthcare accessible at every Bangalore home — so families heal together, at home.' },
            { icon: Eye, t: 'Our Vision', d: 'To be the most trusted home healthcare brand in Karnataka, known for verified staff, rapid response and genuine care.' },
            { icon: ShieldCheck, t: 'Our Promise', d: 'Police-verified staff, transparent pricing, doctor-supervised care and free replacements — no questions asked.' }
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 80}>
              <div className="card h-full">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-care-50 text-care-600"><c.icon size={24} /></span>
                <h3 className="mt-4 font-bold text-slate-800">{c.t}</h3>
                <p className="mt-2 text-sm text-slate-500">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Reveal>
          <Target className="mx-auto text-primary-600" size={36} />
          <h2 className="section-title mt-4 !text-3xl">Areas We Serve</h2>
          <p className="text-slate-500 mt-3">We deploy nurses and caregivers across <strong>all areas of Bangalore</strong> — Indiranagar, Whitefield, Koramangala, Jayanagar, Malleshwaram, HSR Layout, Yelahanka, Hebbal, Electronic City, Bannerghatta, JP Nagar, Rajajinagar, Vijayanagar and everywhere in between.</p>
        </Reveal>
      </section>
    </div>
  );
}