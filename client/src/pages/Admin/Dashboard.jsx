import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const STATUSES = ['New', 'Contacted', 'Confirmed', 'Assigned', 'In Progress', 'Completed', 'Cancelled'];
const statusColor = {
  New: 'bg-blue-50 text-blue-700', Contacted: 'bg-purple-50 text-purple-700',
  Confirmed: 'bg-care-50 text-care-700', Assigned: 'bg-amber-50 text-amber-700',
  'In Progress': 'bg-orange-50 text-orange-700', Completed: 'bg-emerald-50 text-emerald-700',
  Cancelled: 'bg-red-50 text-red-600'
};

const tabs = ['Overview', 'Bookings', 'Services', 'Packages', 'Nurses', 'Testimonials', 'FAQs', 'Contacts'];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('Overview');
  const [stats, setStats] = useState({});
  const [bookings, setBookings] = useState([]);
  const [items, setItems] = useState([]);
  const [nurses, setNurses] = useState([]);

  const loadTab = async (t) => {
    setTab(t);
    try {
      if (t === 'Overview') setStats(await api.get('/admin/stats', true));
      if (t === 'Bookings') setBookings(await api.get('/bookings', true));
      if (['Services', 'Packages', 'Testimonials', 'FAQs', 'Contacts'].includes(t)) {
        setItems(await api.get(`/admin/${t.toLowerCase()}`, true));
      }
      if (t === 'Nurses') setNurses(await api.get('/admin/nurses', true));
    } catch { /* backend offline */ }
  };

  useEffect(() => { loadTab('Overview'); }, []);

  const updateBookingStatus = async (id, status) => {
    await api.put(`/bookings/${id}`, { status });
    loadTab('Bookings');
  };

  const deleteItem = async (collection, id) => {
    if (!confirm('Delete this item?')) return;
    await api.del(`/admin/${collection}/${id}`);
    loadTab(tab);
  };

  const addItem = async (collection) => {
    const name = prompt('Enter name/title:');
    if (!name) return;
    const body = collection === 'faqs' ? { question: name, answer: prompt('Answer:') || '' }
      : collection === 'packages' ? { name, hours: '12', shift: 'Day', price: Number(prompt('Price:') || 0), period: 'Daily', features: [] }
      : { name, slug: name.toLowerCase().replace(/\s+/g, '-'), shortDescription: '', description: '', inclusions: [], duration: 'Custom', order: 99 };
    await api.post(`/admin/${collection}`, body);
    loadTab(tab);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const statCards = [
    ['Total Bookings', stats.totalBookings], ['New Requests', stats.newBookings],
    ['Active Care', stats.activeBookings], ['Nurses', stats.totalNurses],
    ['Services', stats.totalServices], ['Testimonials', stats.totalTestimonials]
  ];

  return (
    <div className="pt-[104px] min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Admin Dashboard</h1>
            <p className="text-sm text-slate-400">Welcome, {user?.name}</p>
          </div>
          <button onClick={handleLogout} className="btn-outline !text-xs !py-2"><LogOut size={14} /> Logout</button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(t => (
            <button key={t} onClick={() => loadTab(t)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tab === t ? 'bg-primary-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'Overview' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {statCards.map(([l, v]) => (
              <div key={l} className="card"><p className="text-sm text-slate-400">{l}</p><p className="text-3xl font-extrabold text-primary-700 mt-1">{v ?? '—'}</p></div>
            ))}
          </div>
        )}

        {tab === 'Bookings' && (
          <div className="card !p-0 overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead className="bg-slate-50 text-left text-xs uppercase text-slate-400">
                <tr><th className="p-4">Request ID</th><th className="p-4">Patient</th><th className="p-4">Service</th><th className="p-4">Phone</th><th className="p-4">City</th><th className="p-4">Status</th><th className="p-4">Action</th></tr>
              </thead>
              <tbody>
                {bookings.length === 0 && <tr><td colSpan="7" className="p-8 text-center text-slate-400">No bookings found. New requests will appear here. (Offline bookings are stored in the browser.)</td></tr>}
                {bookings.map(b => (
                  <tr key={b._id} className="border-t border-slate-100">
                    <td className="p-4 font-mono font-bold text-primary-700">{b.requestId}</td>
                    <td className="p-4">{b.patientName} ({b.patientAge}, {b.patientGender?.[0]})</td>
                    <td className="p-4">{b.service}</td>
                    <td className="p-4">{b.phone}</td>
                    <td className="p-4">{b.city}</td>
                    <td className="p-4">
                      <select value={b.status} onChange={e => updateBookingStatus(b._id, e.target.value)}
                        className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor[b.status]}`}>
                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="p-4"><button onClick={() => deleteItem('bookings', b._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'Nurses' && (
          <div>
            <button onClick={() => addItem('nurses')} className="btn-primary !text-xs mb-4"><Plus size={14} /> Add Nurse</button>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nurses.map(n => (
                <div key={n._id} className="card flex justify-between items-start">
                  <div><p className="font-bold text-slate-800">{n.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{n.qualification} · {n.experience}</p>
                    <p className="text-xs text-care-600 font-semibold mt-1">{n.specialization}</p>
                    <span className={`badge mt-2 ${statusColor[n.availability === 'Available' ? 'Confirmed' : 'Assigned']}`}>{n.availability}</span>
                  </div>
                  <button onClick={() => deleteItem('nurses', n._id)} className="text-red-500"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {['Services', 'Packages', 'Testimonials', 'FAQs', 'Contacts'].includes(tab) && (
          <div>
            <button onClick={() => addItem(tab.toLowerCase())} className="btn-primary !text-xs mb-4"><Plus size={14} /> Add {tab.slice(0, -1)}</button>
            <div className="card !p-0 overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead className="bg-slate-50 text-left text-xs uppercase text-slate-400">
                  <tr><th className="p-4">Name / Question</th><th className="p-4">Details</th><th className="p-4">Action</th></tr>
                </thead>
                <tbody>
                  {items.length === 0 && <tr><td colSpan="3" className="p-8 text-center text-slate-400">No items yet.</td></tr>}
                  {items.map(it => (
                    <tr key={it._id} className="border-t border-slate-100">
                      <td className="p-4 font-semibold text-slate-800">{it.name || it.question}</td>
                      <td className="p-4 text-slate-500 text-xs max-w-md truncate">
                        {it.price ? `₹${it.price.toLocaleString('en-IN')} / ${it.period}` : it.message || it.answer || it.specialization || it.duration || '—'}
                      </td>
                      <td className="p-4"><button onClick={() => deleteItem(tab.toLowerCase(), it._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}