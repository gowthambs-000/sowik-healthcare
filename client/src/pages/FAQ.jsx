import { useEffect, useState } from 'react';
import { MessageCircle, ShieldCheck, Plus } from 'lucide-react';
import { FAQS, WHATSAPP } from '../data/siteData';
import { api } from '../utils/api';

// Match FAQs by question so the same one isn't shown twice
const key = (f) => (f.question || '').trim().toLowerCase();

// Keep every FAQ from the API, and add any FAQ from siteData.js
// that the API doesn't have yet (so the new ones don't vanish).
const mergeFaqs = (fromApi) => {
  const inApi = new Set(fromApi.map(key));
  const extras = FAQS.filter((f) => !inApi.has(key(f)));
  return [...extras, ...fromApi];
};

export default function FAQ() {
  const [faqs, setFaqs] = useState(FAQS);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    api
      .get('/faqs')
      .then((d) => Array.isArray(d) && d.length && setFaqs(mergeFaqs(d)))
      .catch(() => {});
  }, []);

  return (
    <div className="pt-[104px] bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about booking home nursing care anywhere in India.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold">
            <ShieldCheck size={16} className="text-emerald-300" /> 100% police verified staff
          </span>
        </div>
      </section>

      {/* Questions */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={f._id || key(f)}
              className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                open === i ? 'border-emerald-300 shadow-xl' : 'border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-bold text-slate-900"
              >
                <span>{f.question}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 transition-transform duration-300 ${
                    open === i ? 'rotate-45' : ''
                  }`}
                >
                  <Plus size={18} />
                </span>
              </button>
              {open === i && (
                <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-600">
                  {f.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="relative mt-12 overflow-hidden rounded-3xl bg-slate-900 p-8 text-center text-white shadow-xl sm:p-10">
          <div className="absolute -top-20 -right-16 h-60 w-60 rounded-full bg-emerald-500/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-60 w-60 rounded-full bg-blue-500/25 blur-3xl" />
          <div className="relative">
            <h3 className="text-xl font-extrabold">Still have questions?</h3>
            <p className="mt-2 text-sm text-slate-300">
              Message our care team on WhatsApp and we will help you choose the right care.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}