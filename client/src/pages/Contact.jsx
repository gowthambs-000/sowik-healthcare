import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { PHONE, PHONE_TEL, WHATSAPP, EMAIL, ADDRESS, HOURS } from '../data/siteData';
import { api } from '../utils/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try { await api.post('/contact', form); } catch {}
    setSent(true);
  };

  const info = [
    { icon: Phone, label: 'Call Us', value: PHONE, href: PHONE_TEL },
    { icon: MessageCircle, label: 'WhatsApp', value: PHONE, href: WHATSAPP, external: true },
    { icon: Mail, label: 'Email', value: EMAIL },
    { icon: MapPin, label: 'Address', value: ADDRESS },
    { icon: Clock, label: 'Hours', value: HOURS }
  ];

  return (
    <div className="pt-[104px]">
      <PageHeader title="Contact Us" subtitle="Reach our clinical care team — we respond within 15 minutes, 24/7." />
      <section className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10">
        <Reveal>
          <div className="space-y-4">
            {info.map(c => (
              <a key={c.label} href={c.href} target={c.external ? '_blank' : undefined} rel="noreferrer"
                className="card flex items-center gap-4 hover:-translate-y-0.5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600"><c.icon size={22} /></span>
                <div><p className="text-xs font-bold uppercase tracking-wider text-care-600">{c.label}</p><p className="font-semibold text-slate-800 text-sm mt-0.5">{c.value}</p></div>
              </a>
            ))}
          </div>
          <div className="card mt-6 !p-0 overflow-hidden">
            <iframe
              title="Sowik Home Health Care — Bangalore"
              src="https://www.google.com/maps?q=Bangalore,Karnataka,India&output=embed"
              className="w-full h-72 border-0" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="card !p-8">
            <h3 className="font-extrabold text-xl text-slate-800">Send an Enquiry</h3>
            {sent ? (
              <div className="text-center py-10">
                <Send className="mx-auto text-care-500" size={40} />
                <p className="mt-4 font-bold text-slate-800">Enquiry sent!</p>
                <p className="text-sm text-slate-500 mt-1">Our team will reach out shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="label">Name *</label><input required className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                  <div><label className="label">Phone *</label><input required className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                </div>
                <div><label className="label">Email</label><input type="email" className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div><label className="label">Subject</label><input className="input" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="e.g., Enquiry about 24-hour nursing" /></div>
                <div><label className="label">Message *</label><textarea required rows="4" className="input" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></div>
                <button type="submit" className="btn-primary w-full"><Send size={16} /> Send Enquiry</button>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </div>
  );
}