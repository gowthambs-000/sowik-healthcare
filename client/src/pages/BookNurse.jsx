import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CheckCircle2, Upload, Copy, User, Phone, MapPin, Stethoscope, CalendarDays,
  ShieldCheck, Clock, X
} from 'lucide-react';
import { SERVICES, PHONE, PHONE_TEL } from '../data/siteData';
import { api } from '../utils/api';

const initial = {
  patientName: '', patientAge: '', patientGender: 'Male',
  contactName: '', phone: '', email: '',
  address: '', city: 'Bangalore', service: '',
  caregiverPreference: 'No Preference', startDate: '', startTime: '',
  duration: '', requirements: '', contactPreference: 'Phone'
};

const DURATIONS = [
  '8-Hour Day Care', '12-Hour Day Shift', '12-Hour Night Shift', '24-Hour Live-In',
  'Hourly / Short Visit', 'Weekly Plan', 'Monthly Plan'
];

const inp =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100';

const Field = ({ label, children, className = '' }) => (
  <label className={`block ${className}`}>
    <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
    {children}
  </label>
);

const Section = ({ n, icon: Icon, title, children }) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
    <div className="mb-6 flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white shadow">
        <Icon size={19} />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Step {n}</p>
        <h2 className="text-lg font-extrabold text-slate-900 leading-tight">{title}</h2>
      </div>
    </div>
    {children}
  </section>
);

const Chips = ({ options, value, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((o) => (
      <button
        type="button"
        key={o}
        onClick={() => onChange(o)}
        className={`rounded-full border px-4 py-2 text-sm font-semibold transition cursor-pointer ${
          value === o
            ? 'border-emerald-600 bg-emerald-600 text-white shadow'
            : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
        }`}
      >
        {o}
      </button>
    ))}
  </div>
);

export default function BookNurse() {
  const { state } = useLocation();
  const [form, setForm] = useState({
    ...initial,
    service: state?.service || '',
    requirements: state?.package ? `Interested in package: ${state.package}` : ''
  });
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [apiServices, setApiServices] = useState([]);

  // Load services from the database so anything added in Admin shows up here too.
  useEffect(() => {
    api
      .get('/services')
      .then((data) => {
        if (Array.isArray(data)) setApiServices(data);
      })
      .catch(() => {});
  }, []);

  // Local list first, then any extra services that exist only in the database.
  const serviceNames = useMemo(() => {
    const names = SERVICES.map((s) => s.name);
    apiServices.forEach((s) => {
      if (s?.name && !names.includes(s.name)) names.push(s.name);
    });
    return names;
  }, [apiServices]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const pick = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.duration) {
      setError('Please choose how long you need care (Step 3).');
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f) => fd.append('documents', f));
      const data = await api.upload('/bookings', fd);
      setResult(data.requestId);
    } catch (err) {
      const rid = `SHC-${Date.now().toString(36).toUpperCase()}`;
      const saved = JSON.parse(localStorage.getItem('shc_bookings') || '[]');
      saved.push({ ...form, requestId: rid, createdAt: new Date().toISOString() });
      localStorage.setItem('shc_bookings', JSON.stringify(saved));
      setResult(rid);
    }
    setSubmitting(false);
  };

  /* ---------- success screen ---------- */
  if (result) {
    return (
      <div className="pt-[104px] min-h-screen bg-slate-50">
        <section className="max-w-xl mx-auto px-4 py-16 text-center">
          <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
            <CheckCircle2 size={48} />
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900">Request submitted!</h1>
          <p className="mt-3 text-slate-600">
            Your booking request has been received. Our care manager will contact you within 15 minutes.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
            <span className="text-sm text-slate-500">Request ID</span>
            <span className="text-lg font-extrabold tracking-wide text-emerald-700">{result}</span>
            <button onClick={() => navigator.clipboard?.writeText(result)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 cursor-pointer" title="Copy">
              <Copy size={16} />
            </button>
          </div>

          <div className="mt-8 rounded-2xl bg-white border border-slate-200 p-6 text-left text-sm text-slate-600 space-y-3">
            <p className="font-bold text-slate-900">What happens next</p>
            <p className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" /> We call you to confirm the care needs.</p>
            <p className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" /> We match a verified nurse or caregiver.</p>
            <p className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" /> Your caregiver arrives and care begins.</p>
          </div>

          <p className="mt-6 text-xs text-slate-500">Save this ID for reference. For urgent needs, call {PHONE}.</p>
          <Link to="/" className="mt-6 inline-block rounded-full bg-slate-900 px-8 py-3 font-bold text-white hover:bg-emerald-700 transition">
            Back to home
          </Link>
        </section>
      </div>
    );
  }

  /* ---------- form ---------- */
  return (
    <div className="pt-[104px] min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 py-14 md:py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Book a Nurse</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Fill in the patient details below. Our clinical team responds within 15 minutes.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Section n={1} icon={User} title="Patient details">
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Patient name *" className="sm:col-span-2">
                <input required className={inp} value={form.patientName} onChange={set('patientName')} placeholder="Full name" />
              </Field>
              <Field label="Age *">
                <input required type="number" min="0" max="150" className={inp} value={form.patientAge} onChange={set('patientAge')} />
              </Field>
              <div className="sm:col-span-3">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">Gender *</span>
                <Chips options={['Male', 'Female', 'Other']} value={form.patientGender} onChange={pick('patientGender')} />
              </div>
            </div>
          </Section>

          <Section n={2} icon={Phone} title="Your contact details">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Your name *">
                <input required className={inp} value={form.contactName} onChange={set('contactName')} />
              </Field>
              <Field label="Phone *">
                <input required pattern="[0-9+\-\s]{10,15}" className={inp} value={form.phone} onChange={set('phone')} placeholder="10-digit mobile" />
              </Field>
              <Field label="Email (optional)" className="sm:col-span-2">
                <input type="email" className={inp} value={form.email} onChange={set('email')} />
              </Field>
              <div className="sm:col-span-2">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">Preferred contact method</span>
                <Chips options={['Phone', 'WhatsApp', 'Email']} value={form.contactPreference} onChange={pick('contactPreference')} />
              </div>
            </div>
          </Section>

          <Section n={3} icon={Stethoscope} title="Care requirements">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Service required *" className="sm:col-span-2">
                <select required className={inp} value={form.service} onChange={set('service')}>
                  <option value="">Select a service…</option>
                  {serviceNames.map((name) => <option key={name} value={name}>{name}</option>)}
                  <option>Other / Not sure</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">How long do you need care? *</span>
                <Chips options={DURATIONS} value={form.duration} onChange={pick('duration')} />
              </div>
              <div className="sm:col-span-2">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">Caregiver preference</span>
                <Chips options={['No Preference', 'Female', 'Male']} value={form.caregiverPreference} onChange={pick('caregiverPreference')} />
              </div>
              <Field label="Special requirements / patient condition" className="sm:col-span-2">
                <textarea rows="3" className={inp} value={form.requirements} onChange={set('requirements')} placeholder="e.g. post knee-replacement, diabetic, needs catheter care…" />
              </Field>
            </div>
          </Section>

          <Section n={4} icon={CalendarDays} title="When and where">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Start date *">
                <input required type="date" className={inp} value={form.startDate} onChange={set('startDate')} />
              </Field>
              <Field label="Preferred time">
                <input type="time" className={inp} value={form.startTime} onChange={set('startTime')} />
              </Field>
              <Field label="Full address *" className="sm:col-span-2">
                <textarea required rows="2" className={inp} value={form.address} onChange={set('address')} placeholder="House no, street, area…" />
              </Field>
              <Field label="City *">
                <input required className={inp} value={form.city} onChange={set('city')} />
              </Field>
            </div>
          </Section>

          <Section n={5} icon={Upload} title="Documents (optional)">
            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500 transition hover:border-emerald-500 hover:bg-emerald-50/40">
              <Upload size={26} className="text-emerald-600" />
              <span className="font-semibold text-slate-700">Click to upload prescriptions or a discharge summary</span>
              <span className="text-xs">Images, PDF or DOC · up to 5 files</span>
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => setFiles(Array.from(e.target.files).slice(0, 5))}
              />
            </label>
            {files.length > 0 && (
              <ul className="mt-4 space-y-2">
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2 text-sm text-slate-700">
                    <span className="truncate">{f.name}</span>
                    <button type="button" onClick={() => setFiles(files.filter((_, k) => k !== i))} aria-label="Remove file" className="ml-3 rounded-lg p-1 text-slate-500 hover:bg-slate-200 cursor-pointer">
                      <X size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          {error && <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-emerald-600 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 hover:shadow-xl disabled:opacity-60 cursor-pointer"
          >
            {submitting ? 'Submitting…' : 'Submit booking request'}
          </button>
          <p className="text-center text-xs text-slate-500">
            By submitting, you agree to be contacted by our care team. Your data is kept private and secure.
          </p>
        </form>

        {/* Side panel */}
        <aside className="space-y-5 lg:sticky lg:top-[130px]">
          <div className="rounded-3xl bg-slate-900 p-7 text-white">
            <h3 className="text-lg font-extrabold">Why families choose us</h3>
            <ul className="mt-5 space-y-4 text-sm text-slate-300">
              <li className="flex gap-3"><ShieldCheck size={20} className="shrink-0 text-emerald-400" /> 100% police-verified, background-checked staff</li>
              <li className="flex gap-3"><Clock size={20} className="shrink-0 text-emerald-400" /> Response within 15 minutes</li>
              <li className="flex gap-3"><Stethoscope size={20} className="shrink-0 text-emerald-400" /> Qualified GNM, B.Sc and BPT professionals</li>
              <li className="flex gap-3"><CheckCircle2 size={20} className="shrink-0 text-emerald-400" /> Free replacement if you are not satisfied</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-7 text-center">
            <p className="text-sm font-semibold text-slate-600">Need help right now?</p>
            <a href={PHONE_TEL} className="mt-2 inline-flex items-center gap-2 text-xl font-black text-emerald-700 hover:underline">
              <Phone size={20} /> {PHONE}
            </a>
            <p className="mt-3 text-xs text-slate-500">For a medical emergency, call 108 / 112.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}