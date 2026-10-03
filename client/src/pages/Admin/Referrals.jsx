import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Trash2, ArrowLeft } from 'lucide-react';
import { api } from '../../utils/api';

const STATUSES = ['New', 'Contacted', 'Converted', 'Closed'];
const badge = {
  New: 'bg-blue-50 text-blue-700',
  Contacted: 'bg-amber-50 text-amber-700',
  Converted: 'bg-emerald-50 text-emerald-700',
  Closed: 'bg-slate-100 text-slate-600'
};

export default function Referrals() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setItems(await api.get('/referrals', true));
    } catch {
      setError('Could not load referrals. Please sign in again.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const changeStatus = async (id, status) => {
    const res = await api.put(`/referrals/${id}`, { status });
    if (res?._id) setItems((list) => list.map((r) => (r._id === id ? res : r)));
    else alert(res?.message || 'Save failed');
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this referral?')) return;
    const res = await api.del(`/referrals/${id}`);
    if (res?.message === 'Deleted') setItems((list) => list.filter((r) => r._id !== id));
    else alert(res?.message || 'Delete failed');
  };

  const shown = filter === 'All' ? items : items.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen pt-[104px] bg-slate-50 px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        <Link to="/admin" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800">
          <ArrowLeft size={14} /> Back to dashboard
        </Link>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Referrals</h1>
            <p className="text-xs text-slate-500">{items.length} total</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', ...STATUSES].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
                  filter === s ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
        {loading && <p className="mt-6 text-sm text-slate-500">Loading...</p>}
        {!loading && !error && shown.length === 0 && <p className="mt-6 text-sm text-slate-500">No referrals yet.</p>}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {shown.map((r) => (
            <div key={r._id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black text-slate-900">{r.patientName}</p>
                  <p className="text-xs text-slate-500">
                    {r.service || 'Service not specified'}{r.location ? ` · ${r.location}` : ''}
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${badge[r.status]}`}>{r.status}</span>
              </div>

              <div className="mt-3 flex gap-2">
                <a href={`tel:${r.patientPhone}`} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
                  <Phone size={13} /> {r.patientPhone}
                </a>
                <a
                  href={`https://wa.me/91${r.patientPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"
                >
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </div>

              {r.notes && <p className="mt-3 text-xs text-slate-600 italic">"{r.notes}"</p>}

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                Referred by <b className="text-slate-700">{r.referrerName}</b> · {r.referrerPhone}
                {r.referrerEmail ? ` · ${r.referrerEmail}` : ''}
                <br />
                {new Date(r.createdAt).toLocaleString('en-IN')}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <select
                  value={r.status}
                  onChange={(e) => changeStatus(r._id, e.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold"
                >
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
                <button onClick={() => remove(r._id)} className="text-red-500 hover:text-red-700 cursor-pointer" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}