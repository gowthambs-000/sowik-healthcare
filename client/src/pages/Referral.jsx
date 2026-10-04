import { useEffect, useMemo, useState } from 'react';
import { Gift, User, Phone, Mail, MapPin, HeartPulse, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../data/siteData';
import { api } from '../utils/api';

const inputCls =
  'w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:bg-white focus:border-primary-600 outline-none transition';
const labelCls = 'block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5';

const empty = {
  referrerName: '', referrerPhone: '', referrerEmail: '',
  patientName: '', patientPhone: '', location: '', service: '', notes: ''
};

function Field({ label, icon: Icon, children }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="relative">
        <Icon size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
        {children}
      </div>
    </div>
  );
}

export default function Referral() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState('');
  const [apiServices, setApiServices] = useState([]);

  // Also load services from the database, so anything added in Admin shows up here.
  useEffect(() => {
    api
      .get('/services')
      .then((data) => {
        if (Array.isArray(data)) setApiServices(data);
      })
      .catch(() => {});
  }, []);

  // All services from the website data, plus any extra ones that exist only in the database.
  const serviceOptions = useMemo(() => {
    const names = SERVICES.map((s) => s.name);
    apiServices.forEach((s) => {
      if (s?.name && !names.includes(s.name)) names.push(s.name);
    });
    return [...names, 'Equipment Rental', 'Not sure'];
  }, [apiServices]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/referrals', form);
      setDone(res.message);
      setForm(empty);
    } catch (err) {
      setError(err?.message || 'Could not submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[104px] bg-slate-50 min-h-screen">
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold">
            <Gift size={14} /> Refer a family in need
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-black">Refer a Patient</h1>
          <p className="mt-3 text-slate-300 text-sm md:text-base max-w-xl mx-auto">
            Know someone who needs nursing or elder care at home? Share their details and our team will reach out with care and respect.
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 -mt-8 pb-16 relative">
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xl">
          {done ? (
            <div className="text-center py-10">
              <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
              <h2 className="mt-4 text-xl font-black text-slate-900">Referral received</h2>
              <p className="mt-2 text-sm text-slate-600">{done}</p>
              <button onClick={() => setDone('')} className="mt-6 text-sm font-bold text-primary-600 hover:underline cursor-pointer">
                Refer another person
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{error}</div>
              )}

              <div>
                <h2 className="text-sm font-black text-slate-900 mb-3">Your details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Your name" icon={User}>
                    <input required className={inputCls} value={form.referrerName} onChange={set('referrerName')} />
                  </Field>
                  <Field label="Your mobile" icon={Phone}>
                    <input required inputMode="numeric" maxLength={10} className={inputCls} value={form.referrerPhone} onChange={set('referrerPhone')} />
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Your email (optional)" icon={Mail}>
                      <input type="email" className={inputCls} value={form.referrerEmail} onChange={set('referrerEmail')} />
                    </Field>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-black text-slate-900 mb-3">Patient / family details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Patient name" icon={User}>
                    <input required className={inputCls} value={form.patientName} onChange={set('patientName')} />
                  </Field>
                  <Field label="Contact mobile" icon={Phone}>
                    <input required inputMode="numeric" maxLength={10} className={inputCls} value={form.patientPhone} onChange={set('patientPhone')} />
                  </Field>
                  <Field label="Area / location" icon={MapPin}>
                    <input className={inputCls} placeholder="e.g. Jayanagar, Bangalore" value={form.location} onChange={set('location')} />
                  </Field>
                  <Field label="Service needed" icon={HeartPulse}>
                    <select className={inputCls} value={form.service} onChange={set('service')}>
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Anything we should know (optional)" icon={MessageSquare}>
                      <textarea rows={3} maxLength={1000} className={inputCls} value={form.notes} onChange={set('notes')} />
                    </Field>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Please share details only with the family's knowledge. We use them only to contact them about care.
              </p>

              <button
                disabled={loading}
                className="w-full rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit referral'} <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}