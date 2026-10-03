import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ShieldCheck, Globe2, ExternalLink } from 'lucide-react';
import { PHONE, PHONE_TEL, WHATSAPP, EMAIL, ADDRESS, HOURS } from '../data/siteData';
import { api } from '../utils/api';

/* ------------------------------------------------------------------
   EDIT THESE 3 LINES
   1. BG_IMAGE : your background photo, saved in  public/images/
                 (if your file is .png or .jpeg, change the extension here)
   2. MAP_LINK : your Google Maps share link (opens in a new tab)
   3. MAP_EMBED: the src="..." value from Google Maps > Share > Embed a map.
                 Leave it empty '' to show the map using ADDRESS from siteData.js
------------------------------------------------------------------- */
const BG_IMAGE = '/images/contact-bg.jpg';
const MAP_LINK = 'https://share.google/aB8io6znNgbF8Qhav';
const MAP_EMBED = '';

const mapSrc = MAP_EMBED || `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100';
const labelCls = 'mb-1.5 block text-xs font-bold text-slate-700';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/contact', form);
    } catch {}
    setSent(true);
  };

  const info = [
    { icon: Phone, label: 'Call us', value: PHONE, href: PHONE_TEL },
    { icon: MessageCircle, label: 'WhatsApp', value: PHONE, href: WHATSAPP, external: true },
    { icon: Mail, label: 'Email', value: EMAIL, href: EMAIL ? `mailto:${EMAIL}` : undefined },
    { icon: MapPin, label: 'Address', value: ADDRESS, href: MAP_LINK, external: true },
    { icon: Clock, label: 'Hours', value: HOURS }
  ];

  return (
    <div className="pt-[104px] bg-slate-50 min-h-screen">
      {/* Hero with background photo */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <img
          src={BG_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/50" />
        <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-md">
            <Globe2 size={16} className="text-emerald-300" /> Serving families all over India
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">Contact Us</h1>
          <p className="mt-5 text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Talk to our clinical care team, available 24/7. Tell us your city and what care you need, and we will take it from there.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              <Phone size={17} /> Call {PHONE}
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-7 py-3.5 text-sm font-bold backdrop-blur-md transition hover:bg-white/20"
            >
              <MessageCircle size={17} /> WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* Info + form */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10">
        {/* Left: info + map */}
        <div>
          <div className="space-y-4">
            {info.map((c) => {
              const Tag = c.href ? 'a' : 'div';
              return (
                <Tag
                  key={c.label}
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noreferrer' : undefined}
                  className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-white shadow-md">
                    <c.icon size={22} />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-emerald-700">{c.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900">{c.value}</p>
                  </div>
                </Tag>
              );
            })}
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <iframe
              title="Sowik Home Health Care location"
              src={mapSrc}
              className="h-72 w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border-t border-slate-100 p-3.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
            >
              <ExternalLink size={15} /> Open in Google Maps
            </a>
          </div>
        </div>

        {/* Right: form */}
        <div className="h-fit rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <Send size={20} />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">Send an enquiry</h2>
          </div>

          {sent ? (
            <div className="py-12 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <ShieldCheck size={34} />
              </span>
              <p className="mt-4 text-lg font-extrabold text-slate-900">Enquiry sent</p>
              <p className="mt-1 text-sm text-slate-500">Our team will reach out to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Name *</label>
                  <input required className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Phone *</label>
                  <input required className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Subject</label>
                <input
                  className={inputCls}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g., Enquiry about 24-hour nursing in my city"
                />
              </div>
              <div>
                <label className={labelCls}>Message *</label>
                <textarea
                  required
                  rows="4"
                  className={inputCls}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us your city, the patient's needs and when you need care"
                />
              </div>
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-xl"
              >
                <Send size={16} /> Send enquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}