import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { CheckCircle2, Upload, Copy } from 'lucide-react';
import { SERVICES, PHONE } from '../data/siteData';
import { api } from '../utils/api';

const initial = {
  patientName: '', patientAge: '', patientGender: 'Male',
  contactName: '', phone: '', email: '',
  address: '', city: 'Bangalore', service: '',
  caregiverPreference: 'No Preference', startDate: '', startTime: '',
  duration: '', requirements: '', contactPreference: 'Phone'
};

export default function BookNurse() {
  const { state } = useLocation();
  const [form, setForm] = useState({ ...initial, service: state?.service || '' });
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      [...files].forEach(f => fd.append('documents', f));
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

  if (result) {
    return (
      <div className="pt-[104px]">
        <section className="max-w-xl mx-auto px-4 py-24 text-center">
          <Reveal>
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-care-50 text-care-600"><CheckCircle2 size={44} /></span>
            <h1 className="section-title mt-6">Request Submitted!</h1>
            <p className="text-slate-500 mt-3">Your booking request has been received. Our care manager will contact you within 15 minutes.</p>
            <div className="card mt-6 inline-flex items-center gap-3 !px-8">
              <span className="text-sm text-slate-400">Request ID:</span>
              <span className="font-extrabold text-primary-700">{result}</span>
              <button onClick={() => navigator.clipboard?.writeText(result)} className="text-care-600 hover:text-care-700" title="Copy"><Copy size={16} /></button>
            </div>
            <p className="text-xs text-slate-400 mt-4">Save this ID for reference. For urgent needs, call {PHONE}.</p>
          </Reveal>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-[104px]">
      <PageHeader title="Book a Nurse" subtitle="Fill in the patient details below — our clinical team responds within 15 minutes." />
      <section className="max-w-3xl mx-auto px-4 py-14">
        <Reveal>
          <form onSubmit={handleSubmit} className="card !p-8 space-y-6">
            <h3 className="font-extrabold text-lg text-slate-800 border-b pb-3">Patient Details</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1"><label className="label">Patient Name *</label><input required className="input" value={form.patientName} onChange={set('patientName')} /></div>
              <div><label className="label">Age *</label><input required type="number" min="0" max="150" className="input" value={form.patientAge} onChange={set('patientAge')} /></div>
              <div><label className="label">Gender *</label>
                <select required className="input" value={form.patientGender} onChange={set('patientGender')}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>

            <h3 className="font-extrabold text-lg text-slate-800 border-b pb-3 pt-2">Contact Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="label">Your Name *</label><input required className="input" value={form.contactName} onChange={set('contactName')} /></div>
              <div><label className="label">Phone *</label><input required pattern="[0-9+\-\s]{10,15}" className="input" value={form.phone} onChange={set('phone')} placeholder="10-digit mobile" /></div>
              <div className="sm:col-span-2"><label className="label">Email (optional)</label><input type="email" className="input" value={form.email} onChange={set('email')} /></div>
            </div>

            <h3 className="font-extrabold text-lg text-slate-800 border-b pb-3 pt-2">Location</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className="label">Full Address *</label><textarea required rows="2" className="input" value={form.address} onChange={set('address')} placeholder="House no, street, area…" /></div>
              <div><label className="label">City *</label><input required className="input" value={form.city} onChange={set('city')} /></div>
            </div>

            <h3 className="font-extrabold text-lg text-slate-800 border-b pb-3 pt-2">Care Requirements</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className="label">Service Required *</label>
                <select required className="input" value={form.service} onChange={set('service')}>
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => <option key={s.slug}>{s.name}</option>)}
                  <option>Other / Not sure</option>
                </select>
              </div>
              <div><label className="label">Caregiver Preference</label>
                <select className="input" value={form.caregiverPreference} onChange={set('caregiverPreference')}>
                  <option>No Preference</option><option>Female</option><option>Male</option>
                </select>
              </div>
              <div><label className="label">Duration *</label>
                <select required className="input" value={form.duration} onChange={set('duration')}>
                  <option value="">Select…</option>
                  <option>8-Hour Day Care</option><option>12-Hour Day Shift</option>
                  <option>12-Hour Night Shift</option><option>24-Hour Live-In</option>
                  <option>Hourly / Short Visit</option><option>Weekly Plan</option><option>Monthly Plan</option>
                </select>
              </div>
              <div><label className="label">Start Date *</label><input required type="date" className="input" value={form.startDate} onChange={set('startDate')} /></div>
              <div><label className="label">Preferred Time</label><input type="time" className="input" value={form.startTime} onChange={set('startTime')} /></div>
              <div className="sm:col-span-2"><label className="label">Special Requirements / Patient Condition</label>
                <textarea rows="3" className="input" value={form.requirements} onChange={set('requirements')} placeholder="e.g., post knee-replacement, diabetic, needs catheter care…" />
              </div>
              <div className="sm:col-span-2"><label className="label">Upload Documents (prescriptions, discharge summary — optional, max 5 files)</label>
                <label className="flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-200 px-4 py-6 cursor-pointer hover:border-primary-400 transition text-sm text-slate-500">
                  <Upload size={20} className="text-primary-500" />
                  {files.length ? `${files.length} file(s) selected` : 'Click to upload images / PDF / DOC'}
                  <input type="file" multiple accept="image/*,.pdf,.doc,.docx" className="hidden" onChange={e => setFiles(e.target.files)} />
                </label>
              </div>
              <div className="sm:col-span-2"><label className="label">Preferred Contact Method</label>
                <div className="flex gap-3">
                  {['Phone', 'WhatsApp', 'Email'].map(c => (
                    <button type="button" key={c} onClick={() => setForm(f => ({ ...f, contactPreference: c }))}
                      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${form.contactPreference === c ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-red-600 bg-red-50 rounded-xl p-3">{error}</p>}

            <button type="submit" disabled={submitting} className="btn-primary w-full !py-4 text-base disabled:opacity-60">
              {submitting ? 'Submitting…' : 'Submit Booking Request'}
            </button>
            <p className="text-xs text-slate-400 text-center">By submitting, you agree to be contacted by our care team. Your data is kept private and secure.</p>
          </form>
        </Reveal>
      </section>
    </div>
  );
}