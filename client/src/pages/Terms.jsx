import { Link } from 'react-router-dom';
import { Phone, Mail, FileText } from 'lucide-react';

const COMPANY = 'Sowik Home Health Care Private Limited';
const EMAIL = 'support@sowik.in';
const PHONE = '+91 88845 11711';
const PHONE_TEL = 'tel:+918884511711';

const SECTIONS = [
  {
    title: 'Consent to Communication',
    body: `We collect personal details like your name, email address, and phone number etc. By sharing your information, you authorize ${COMPANY} to contact you via SMS, RCS, WhatsApp, Email, and other communication channels. This consent overrides any NDNC/DND registration as per TRAI regulations.`
  },
  {
    title: 'Definitions',
    body: `Definitions used in these Terms: "Customer" means the individual or entity procuring services; "Caretaker" refers to the person deployed by ${COMPANY} or engaged via our platform; "Services" refers to hire & deploy and in-house staffing models, subscriptions, replacement and related services.`
  },
  {
    title: 'Scope of Services',
    body: `${COMPANY} offers (a) Hire & Deploy — matching and placement of independent caretakers, and (b) In-house Staff — employees provided and managed by ${COMPANY}. Specific service inclusions depend on plan purchased.`
  },
  {
    title: 'Eligibility & Acceptance',
    body: `We may accept or decline requests in our discretion. Customers must be legally competent to enter contracts. ${COMPANY} reserves the right to refuse service for safety, legal, or compliance reasons.`
  },
  {
    title: 'Subscriptions, Fees & Payments',
    body: `Subscription/platform fees (e.g., 3-month, 6-month plans) are invoiced as specified. Platform fees are non-refundable unless otherwise stated in the Refund Policy. Caretaker salaries are payable by the Customer as per agreed schedule; failure to pay may result in service suspension.`
  },
  {
    title: 'Non-Refundable Platform Fee',
    body: `Unless explicitly stated, platform/subscription fees are strictly non-refundable. Exceptions may be made only where ${COMPANY} fails to deploy a caretaker within mutually agreed timelines and a refund is approved per Refund Policy.`
  },
  {
    title: 'Deployment & Timelines',
    body: `Estimated deployment timelines (e.g., 3–5 working days) are indicative. Timelines depend on role, background checks, and availability. ${COMPANY} shall use reasonable efforts to meet timelines but will not be liable for delays beyond its control.`
  },
  {
    title: 'Background Verification & Disclosures',
    body: `${COMPANY} conducts identity, KYC, police and employment history checks to the extent permitted. While we use industry-standard checks, ${COMPANY} does not guarantee absolute accuracy of past records and disclaims liability for undisclosed or concealed information discovered later.`
  },
  {
    title: 'Caretaker Conduct & Obligations',
    body: `Caretakers are expected to perform assigned duties professionally, maintain hygiene, respect client property, and follow care plans. Any breach may result in replacement, suspension, or legal action.`
  },
  {
    title: 'Customer Obligations & Safe Workplace',
    body: `Customers must provide safe working conditions, basic amenities, clear instructions, and any necessary medical information. Abuse, harassment or unsafe environments may result in immediate cessation of services and possible legal action.`
  },
  {
    title: 'Payment to Caretakers & Withholding',
    body: `Customers must pay caretaker salaries as agreed. ${COMPANY} may, in certain plans, collect salary on behalf of caretakers. ${COMPANY} reserves the right to withhold or deduct amounts where justified (e.g., proven misconduct) and only after due investigation.`
  },
  {
    title: 'Fraud, Theft, Misconduct — Caretaker',
    body: `Proven fraud, theft, damage, falsification of credentials, impersonation, or criminal acts by caretakers will be reported to law enforcement, the caretaker will be blacklisted, and ${COMPANY} will cooperate with authorities. ${COMPANY} may also pursue civil remedies.`
  },
  {
    title: 'Fraud & Misuse — Customer',
    body: `Customers who attempt to mislead, withhold salary, harass staff, fabricate complaints, or poach caretakers will face service termination, indemnity claims, and potential legal action. Bypassing ${COMPANY} to directly hire caretakers triggers a penalty equal to one year of the caretaker’s salary.`
  },
  {
    title: 'Replacements & Limits',
    body: `Replacements are governed by the plan purchased. For plans that limit replacements, ${COMPANY} will make reasonable efforts — subject to availability — to provide replacements. Special terms for unlimited replacements (if applicable) are bound by plan rules and fair usage.`
  },
  {
    title: 'Insurance & Liability Cap',
    body: `Where insurance is provided, coverage is subject to the insurer’s policy, terms, and approval. ${COMPANY}’s total liability for any claim shall not exceed amounts covered by insurer or, where insurance is not applicable, a cap equal to the total fees paid for the relevant service period, except for gross negligence or willful misconduct.`
  },
  {
    title: 'Health, Medical & Emergencies',
    body: `Caretakers are not substitutes for licensed medical professionals. Customers must seek prompt medical attention in emergencies. ${COMPANY} is not responsible for medical outcomes resulting from delayed medical care or non-compliance with medical instructions.`
  },
  {
    title: 'Intellectual Property & Content',
    body: `All content, trademarks, logos, and materials on ${COMPANY} platforms are owned by ${COMPANY}. Customers and caretakers may not reproduce or misuse our intellectual property.`
  },
  {
    title: 'Privacy & Data Use',
    body: `${COMPANY} collects and processes personal and medical data to deliver services; use is governed by our Privacy Policy. By using services, you consent to such processing.`
  },
  {
    title: 'Dispute Resolution',
    body: `Parties shall attempt amicable resolution first. If unresolved, disputes are subject to the exclusive jurisdiction of courts in Bengaluru, India and governed by Indian law.`
  },
  {
    title: 'Termination & Suspension',
    body: `${COMPANY} may suspend or terminate services immediately for safety violations, non-payment, fraud, or breach of these Terms. Termination will not generally entitle customers to refunds except as per Refund Policy.`
  },
  {
    title: 'Amendments & Notices',
    body: `${COMPANY} may amend these Terms by posting updates on its website. Continued use after posting constitutes acceptance. Notices shall be provided to the email on record or via platform messaging.`
  }
];

export default function Terms() {
  return (
    <div className="pt-[104px] bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold border border-white/20">
            <FileText size={14} /> Legal
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">
            These Terms &amp; Conditions (&quot;Terms&quot;) govern access to and use of services
            provided by {COMPANY} (&quot;{COMPANY}&quot;, &quot;we&quot;, &quot;us&quot;,
            &quot;our&quot;). By engaging our services you agree to be bound by these Terms.
            Please read carefully.
          </p>
          <p className="mt-3 text-xs text-slate-400">Last updated: October 2026</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 grid lg:grid-cols-[250px_1fr] gap-10">
        {/* Table of contents */}
        <aside className="hidden lg:block">
          <nav className="sticky top-[130px] max-h-[calc(100vh-160px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 text-sm">
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
          </nav>
        </aside>

        {/* Content */}
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
              <p className="mt-2.5 text-slate-600 leading-relaxed">{s.body}</p>
            </section>
          ))}

          {/* Contact */}
          <section className="rounded-2xl bg-slate-900 p-6 sm:p-8 text-white">
            <h2 className="text-xl font-extrabold">Questions about these Terms?</h2>
            <p className="mt-2 text-slate-300 text-sm">
              Contact {COMPANY} and we will be happy to help.
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