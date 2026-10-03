import { Link } from 'react-router-dom';
import { Phone, Mail, FileText } from 'lucide-react';

const COMPANY = 'Sowik Home Health Care Private Limited';
const EMAIL = 'support@sowik.in';
const PHONE = '+91 88845 11711';
const PHONE_TEL = 'tel:+91 88845 11711';

const SECTIONS = [
  {
    title: 'Overview',
    body: `${COMPANY} provides subscription-based homecare services. Platform and subscription fees are in most cases non-refundable except where ${COMPANY} explicitly agrees or where deployment obligations are not met as per agreed timelines.`
  },
  {
    title: 'When Refunds May Be Considered',
    items: [
      `${COMPANY} fails to deploy any caretaker within the guaranteed deployment window confirmed in writing.`,
      `Material breach by ${COMPANY} where resolution is not possible within a reasonable timeframe.`
    ]
  },
  {
    title: 'When Refunds Will Not Be Granted',
    items: [
      `Customer dissatisfaction with caretaker performance where replacements were offered and reasonable corrective steps were taken by ${COMPANY}.`,
      'Change of mind, relocation, or user error.',
      'Partial periods where services were already delivered and used.'
    ]
  },
  {
    title: 'How to Request a Refund',
    items: [
      `Email ${EMAIL} with booking details and supporting evidence.`,
      'Provide order ID, booking reference, timeline, and evidence (chat logs, screenshots, dates).',
      `${COMPANY} will acknowledge within 48 hours and investigate; decisions may require 7–15 working days.`
    ]
  },
  {
    title: 'Processing Approved Refunds',
    body: `Approved refunds are processed to the original payment instrument (bank/card/wallet) within 15 working days. ${COMPANY} is not liable for delays by banks or payment processors.`
  },
  {
    title: 'Fraudulent Claims',
    body: `${COMPANY} reserves the right to reject and take action against fraudulent refund claims. Criminal or civil action may be pursued where necessary.`
  },
  {
    title: 'Changes to This Policy',
    body: `${COMPANY} may update this Refund Policy; the updated version will be posted on the website and will apply to new transactions.`
  }
];

export default function Refund() {
  return (
    <div className="pt-[104px] bg-slate-50 min-h-screen">
      <section className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold border border-white/20">
            <FileText size={14} /> Legal
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight">Refund Policy</h1>
          <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">
            Our Refund Policy explains when {COMPANY} may consider providing refunds for platform
            fees, subscriptions or services. The policy is governed by the{' '}
            <Link to="/terms" className="underline hover:text-white">
              Terms &amp; Conditions
            </Link>{' '}
            and applies to customers who have made payments to {COMPANY}.
          </p>
          <p className="mt-3 text-xs text-slate-400">Last updated: October 2026</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 grid lg:grid-cols-[250px_1fr] gap-10">
        <aside className="hidden lg:block">
          <nav className="sticky top-[130px] rounded-2xl border border-slate-200 bg-white p-4 text-sm">
            <p className="mb-2 font-bold text-slate-900">On this page</p>
            <ul className="space-y-1">
              {SECTIONS.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#section-${i}`}
                    className="block rounded-lg px-2 py-1.5 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition"
                  >
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ul>
            <Link
              to="/terms"
              className="mt-4 block rounded-lg bg-slate-100 px-3 py-2 text-center font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              Read Terms &amp; Conditions
            </Link>
          </nav>
        </aside>

        <article className="space-y-5">
          {SECTIONS.map((s, i) => (
            <section
              key={s.title}
              id={`section-${i}`}
              className="scroll-mt-32 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm"
            >
              <h2 className="text-lg font-extrabold text-slate-900">
                <span className="mr-2 text-emerald-600">{i + 1}.</span>
                {s.title}
              </h2>
              {s.body && <p className="mt-2.5 text-slate-600 leading-relaxed">{s.body}</p>}
              {s.items && (
                <ul className="mt-3 space-y-2.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-3 text-slate-600 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="rounded-2xl bg-slate-900 p-6 sm:p-8 text-white">
            <h2 className="text-xl font-extrabold">Need to request a refund?</h2>
            <p className="mt-2 text-slate-300 text-sm">
              Send us your booking details and we will respond within 48 hours.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:bg-emerald-100 transition"
              >
                <Mail size={16} /> {EMAIL}
              </a>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-bold hover:bg-white/10 transition"
              >
                <Phone size={16} /> {PHONE}
              </a>
            </div>
          </section>

          <p className="pt-2 text-center text-xs text-slate-500">
            © 2026 {COMPANY}. All rights reserved. ·{' '}
            <Link to="/" className="underline hover:text-emerald-700">
              Back to home
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
}