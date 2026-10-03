import { useCallback, useEffect, useState } from 'react';
import { Pencil, Lock, RefreshCw } from 'lucide-react';
import { api } from '../../utils/api';
import { RENTAL_CATEGORIES } from '../../data/rentalData';

const REFRESH_MS = 10000; // list refreshes every 10 seconds
const empty = { name: '', category: RENTAL_CATEGORIES[0], price: '', description: '', image: '', available: true };

export default function AdminRentals() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState('');
  const [updated, setUpdated] = useState(null);

  const load = useCallback(
    () =>
      api
        .get('/admin/rentals', true)
        .then((d) => {
          setItems(Array.isArray(d) ? d : []);
          setUpdated(new Date());
        })
        .catch(() => setMsg('Could not load rentals')),
    []
  );

  useEffect(() => {
    load();
    const t = setInterval(load, REFRESH_MS);
    return () => clearInterval(t);
  }, [load]);

  const set = (k) => (e) =>
    setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const reset = () => {
    setForm(empty);
    setEditingId(null);
  };

  // Editing only. Admins cannot add or delete rental items.
  const save = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    const body = { ...form, price: Number(form.price) };
    try {
      await api.put(`/admin/rentals/${editingId}`, body);
      setMsg('Updated');
      reset();
      load();
    } catch {
      setMsg('Save failed. Check you are logged in as admin.');
    }
  };

  const edit = (item) => {
    setEditingId(item._id);
    setForm({ ...empty, ...item });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const live = items.filter((i) => i.available !== false).length;
  const input = 'w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500';

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-slate-900">Rental equipment</h1>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Live
          {updated && <span className="text-slate-400">· {updated.toLocaleTimeString('en-IN')}</span>}
          <button onClick={load} aria-label="Refresh now" className="ml-1 cursor-pointer text-slate-500 hover:text-slate-800">
            <RefreshCw size={13} />
          </button>
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[['Total items', items.length], ['Live', live], ['Hidden', items.length - live]].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{l}</p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-700">{v}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700">
        <Lock size={13} /> You can edit rental items, but not add or delete them
      </p>
      {msg && <p className="mt-2 text-sm text-emerald-700">{msg}</p>}

      {editingId && (
        <form onSubmit={save} className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
          <label className="md:col-span-2 text-sm font-semibold">Name
            <input required value={form.name} onChange={set('name')} className={input} />
          </label>
          <label className="text-sm font-semibold">Category
            <select value={form.category} onChange={set('category')} className={input}>
              {RENTAL_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold">Price per month (₹)
            <input required type="number" min="0" value={form.price} onChange={set('price')} className={input} />
          </label>
          <label className="md:col-span-2 text-sm font-semibold">Image URL (optional)
            <input value={form.image} onChange={set('image')} placeholder="https://..." className={input} />
          </label>
          <label className="md:col-span-2 text-sm font-semibold">Description (optional)
            <textarea rows={2} value={form.description} onChange={set('description')} className={input} />
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={form.available} onChange={set('available')} /> Available to rent
          </label>
          <div className="flex gap-2 md:justify-end">
            <button type="button" onClick={reset} className="cursor-pointer rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold">
              Cancel
            </button>
            <button className="cursor-pointer rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-700">
              Save changes
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3">Name</th><th className="p-3">Category</th>
              <th className="p-3">₹ / month</th><th className="p-3">Status</th><th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i._id} className="border-t border-slate-100">
                <td className="p-3 font-semibold text-slate-800">{i.name}</td>
                <td className="p-3">{i.category}</td>
                <td className="p-3">{Number(i.price).toLocaleString('en-IN')}</td>
                <td className="p-3">{i.available === false ? 'Hidden' : 'Live'}</td>
                <td className="p-3">
                  <div className="flex justify-end">
                    <button onClick={() => edit(i)} aria-label="Edit" className="cursor-pointer rounded-lg p-2 hover:bg-slate-100">
                      <Pencil size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-slate-500">No rental items found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}