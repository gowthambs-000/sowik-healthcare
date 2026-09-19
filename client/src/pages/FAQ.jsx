import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { FAQS, WHATSAPP } from '../data/siteData';
import { api } from '../utils/api';

export default function FAQ() {
  const [faqs, setFaqs] = useState(FAQS);
  const [open, setOpen] = useState(0);
  useEffect(() => { api.get('/faqs').then(d => d.length && setFaqs(d)).catch(() => {}); }, []);

  return (
    <div className="pt-[104px]">
      <PageHeader title="Frequently Asked Questions" subtitle="Everything you need to know about booking home nursing care in Bangalore." />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f._id} delay={i * 40}>
              <div className="card !p-0 overflow-hidden">
                <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex justify-between items-center gap-4 p-5 text-left font-bold text-slate-800">
                  {f.question}
                  <span className={`text-primary-600 text-xl transition shrink-0 ${open === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {open === i && <p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">{f.answer}</p>}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="card mt-10 bg-gradient-to-r from-primary-50 to-care-50 !border-0 text-center">
            <h3 className="font-extrabold text-slate-800">Still have questions?</h3>
            <p className="text-sm text-slate-500 mt-1">Our care team responds within 15 minutes on WhatsApp.</p>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-whatsapp mt-4 !text-xs">Chat on WhatsApp</a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}