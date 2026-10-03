import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Trash2, Plus, Pencil, X, Lock, RefreshCw, Search, LayoutDashboard, CalendarCheck,
  Stethoscope, Package, BedDouble, Users, Star, HelpCircle, Mail, Gift
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SERVICE_CATEGORIES, SERVICES, PACKAGES, NURSES, FAQS, TESTIMONIALS } from '../../data/siteData';
import { RENTAL_CATEGORIES, RENTALS } from '../../data/rentalData';
import { api } from '../../utils/api';

const REFRESH_MS = 10000; // data refreshes every 10 seconds

const STATUSES = ['New', 'Contacted', 'Confirmed', 'Assigned', 'In Progress', 'Completed', 'Cancelled'];
const ACTIVE = ['Confirmed', 'Assigned', 'In Progress'];
const statusColor = {
  New: 'bg-blue-50 text-blue-700',
  Contacted: 'bg-purple-50 text-purple-700',
  Confirmed: 'bg-emerald-50 text-emerald-700',
  Assigned: 'bg-amber-50 text-amber-700',
  'In Progress': 'bg-orange-50 text-orange-700',
  Completed: 'bg-emerald-50 text-emerald-700',
  Cancelled: 'bg-red-50 text-red-600'
};

/* Admins can only EDIT these. No add, no delete. */
const LOCKED = ['services', 'packages', 'rentals'];

const money = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

/* The data written in the website code. "Sync" copies anything missing into the database. */
const DEFAULTS = {
  services: SERVICES, packages: PACKAGES, rentals: RENTALS,
  nurses: NURSES, testimonials: TESTIMONIALS, faqs: FAQS
};
const idOf = (i) => String(i.slug || i.name || i.question || '').trim().toLowerCase();

/* Tab setup: where to read, where to save, which fields can be edited.
   type: text (default) | number | textarea | checkbox | select | list
   list = saved as an array. sep is what separates the items when typing. */
const TABS = {
  Services: {
    key: 'services', icon: Stethoscope, singular: 'Service', read: '/admin/services', write: '/admin/services',
    title: (i) => i.name,
    detail: (i) => [i.category, i.duration, i.shortDescription].filter(Boolean).join(' · ') || '—',
    fields: [
      { k: 'name', label: 'Name' },
      { k: 'category', label: 'Category', type: 'select', options: SERVICE_CATEGORIES.filter((c) => c !== 'All') },
      { k: 'shortDescription', label: 'Short description' },
      { k: 'description', label: 'Description', type: 'textarea' },
      { k: 'duration', label: 'Duration' },
      { k: 'image', label: 'Image URL (optional)' },
      { k: 'inclusions', label: "What's included (one per line)", type: 'list', sep: '\n' },
      { k: 'order', label: 'Display order', type: 'number' }
    ]
  },
  Packages: {
    key: 'packages', icon: Package, singular: 'Package', read: '/admin/packages', write: '/admin/packages',
    title: (i) => i.name,
    detail: (i) => `${money(i.price)} onwards / ${i.period || '—'} · ${i.shift || ''}${i.hours ? ` · ${i.hours}h` : ''}${i.popular ? ' · Most popular' : ''}`,
    fields: [
      { k: 'name', label: 'Name' },
      { k: 'shift', label: 'Shift (Day / Night / Full Day)' },
      { k: 'hours', label: 'Hours (e.g. 12, 24 or Custom)' },
      { k: 'price', label: 'Starting price (₹)', type: 'number' },
      { k: 'period', label: 'Period', type: 'select', options: ['Daily', 'Weekly', 'Monthly'] },
      { k: 'features', label: 'Features (one per line)', type: 'list', sep: '\n' },
      { k: 'popular', label: 'Show "Most popular" badge', type: 'checkbox', def: false }
    ]
  },
  Rentals: {
    key: 'rentals', icon: BedDouble, singular: 'Rental item', read: '/admin/rentals', write: '/admin/rentals',
    title: (i) => i.name,
    detail: (i) => `${money(i.price)} / month · ${i.category || '—'} · ${i.available === false ? 'Hidden' : 'Live'}`,
    fields: [
      { k: 'name', label: 'Name' },
      { k: 'category', label: 'Category', type: 'select', options: RENTAL_CATEGORIES },
      { k: 'price', label: 'Price per month (₹)', type: 'number' },
      { k: 'image', label: 'Image path or URL (e.g. /rentals/bp-monitor.jpg)' },
      { k: 'description', label: 'Description', type: 'textarea' },
      { k: 'available', label: 'Available to rent (shown on website)', type: 'checkbox', def: true }
    ]
  },
  Nurses: {
    key: 'nurses', icon: Users, singular: 'Team member', read: '/admin/nurses', write: '/admin/nurses',
    title: (i) => i.name,
    detail: (i) => [i.qualification, i.specialization, i.experience].filter(Boolean).join(' · ') || '—',
    fields: [
      { k: 'name', label: 'Name (e.g. Ms. Megha)' },
      { k: 'qualification', label: 'Qualification (e.g. B.Sc Nursing)' },
      { k: 'specialization', label: 'Specialization' },
      { k: 'experience', label: 'Experience (optional, e.g. 5+ years)' },
      { k: 'languages', label: 'Languages (optional, comma separated)', type: 'list', sep: ',' }
    ]
  },
  Testimonials: {
    key: 'testimonials', icon: Star, singular: 'Testimonial', read: '/admin/testimonials', write: '/admin/testimonials',
    title: (i) => i.name,
    detail: (i) => i.message || '—',
    fields: [
      { k: 'name', label: 'Name' },
      { k: 'location', label: 'Location' },
      { k: 'service', label: 'Service' },
      { k: 'message', label: 'Review', type: 'textarea' },
      { k: 'rating', label: 'Rating (1-5)', type: 'number' }
    ]
  },
  FAQs: {
    key: 'faqs', icon: HelpCircle, singular: 'FAQ', read: '/admin/faqs', write: '/admin/faqs',
    title: (i) => i.question,
    detail: (i) => i.answer || '—',
    fields: [
      { k: 'question', label: 'Question' },
      { k: 'answer', label: 'Answer', type: 'textarea' }
    ]
  },
  Contacts: {
    key: 'contacts', icon: Mail, singular: 'Enquiry', read: '/admin/contacts', write: null, // view and delete only
    title: (i) => i.name,
    detail: (i) => [i.phone, i.subject, i.message].filter(Boolean).join(' · ') || '—',
    fields: []
  },
  Referrals: {
    key: 'referrals', icon: Gift, singular: 'Referral', read: '/admin/referrals', write: '/admin/referrals',
    noAdd: true, // referrals come from the public form, so the admin only edits the status or deletes
    title: (i) => i.patientName,
    detail: (i) =>
      [i.status, i.patientPhone, i.service, i.location, `Referred by ${i.referrerName} (${i.referrerPhone})`]
        .filter(Boolean).join(' · '),
    fields: [
      { k: 'status', label: 'Status', type: 'select', options: ['New', 'Contacted', 'Converted', 'Closed'] }
    ]
  }
};

const TAB_ICONS = { Overview: LayoutDashboard, Bookings: CalendarCheck };
const TAB_NAMES = ['Overview', 'Bookings', ...Object.keys(TABS)];
const inputCls = 'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100';

const emptyData = {
  bookings: [], services: [], packages: [], rentals: [],
  nurses: [], testimonials: [], faqs: [], contacts: [], referrals: []
};

const initialsOf = (name = '') =>
  name.replace(/^(Mr|Mrs|Ms|Mss|Miss|Sr|Dr)\.?\s+/i, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('Overview');
  const [data, setData] = useState(emptyData);
  const [updated, setUpdated] = useState(null);
  const [online, setOnline] = useState(true);
  const [modal, setModal] = useState(null); // { cfg, item, form }
  const [msg, setMsg] = useState('');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [syncing, setSyncing] = useState(false);

  /* ---------- live data ---------- */
  const load = useCallback(async () => {
    const jobs = [['bookings', '/bookings'], ...Object.values(TABS).map((c) => [c.key, c.read])];
    const results = await Promise.allSettled(jobs.map(([, path]) => api.get(path, true)));
    setData((prev) => {
      const next = { ...prev };
      results.forEach((r, i) => {
        if (r.status === 'fulfilled' && Array.isArray(r.value)) next[jobs[i][0]] = r.value;
      });
      return next;
    });
    setOnline(results.some((r) => r.status === 'fulfilled'));
    setUpdated(new Date());
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, REFRESH_MS);
    const onFocus = () => load();
    window.addEventListener('focus', onFocus);
    return () => {
      clearInterval(t);
      window.removeEventListener('focus', onFocus);
    };
  }, [load]);

  useEffect(() => { setQuery(''); setStatusFilter('All'); }, [tab]);

  /* ---------- numbers shown on Overview ---------- */
  const { bookings, rentals } = data;
  const byService = Object.entries(
    bookings.reduce((acc, b) => {
      const s = b.service || 'Other';
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);
  const maxService = byService[0]?.[1] || 1;
  const rentEnquiries = bookings.filter((b) => /rent/i.test(b.service || '')).length;
  const live = rentals.filter((r) => r.available !== false).length;

  const statCards = [
    ['Total bookings', bookings.length, CalendarCheck, 'from-emerald-500 to-emerald-600'],
    ['New requests', bookings.filter((b) => b.status === 'New').length, Mail, 'from-sky-500 to-blue-600'],
    ['Active care', bookings.filter((b) => ACTIVE.includes(b.status)).length, Stethoscope, 'from-amber-500 to-orange-600'],
    ['Completed', bookings.filter((b) => b.status === 'Completed').length, Star, 'from-violet-500 to-purple-600'],
    ['Services', data.services.length, Stethoscope, 'from-slate-700 to-slate-900'],
    ['Packages', data.packages.length, Package, 'from-slate-700 to-slate-900'],
    ['Rental items', `${live} live / ${rentals.length - live} hidden`, BedDouble, 'from-slate-700 to-slate-900'],
    ['Rental enquiries', rentEnquiries, BedDouble, 'from-slate-700 to-slate-900'],
    ['Team members', data.nurses.length, Users, 'from-slate-700 to-slate-900'],
    ['Testimonials', data.testimonials.length, Star, 'from-slate-700 to-slate-900'],
    ['FAQs', data.faqs.length, HelpCircle, 'from-slate-700 to-slate-900'],
    ['Contact enquiries', data.contacts.length, Mail, 'from-slate-700 to-slate-900'],
    ['Referrals', data.referrals.length, Gift, 'from-slate-700 to-slate-900']
  ];

  /* ---------- actions ---------- */
  const flash = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 3500);
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      load();
    } catch {
      flash('Could not update status');
    }
  };

  const deleteBooking = async (b) => {
    if (!window.confirm(`Delete booking ${b.requestId}?`)) return;
    const before = data.bookings;
    setData((p) => ({ ...p, bookings: p.bookings.filter((x) => x._id !== b._id) }));
    try {
      await api.del(`/bookings/${b._id}`);
      flash('Booking deleted');
      load();
    } catch {
      setData((p) => ({ ...p, bookings: before }));
      flash('Delete failed. The server did not accept the request.');
    }
  };

  const deleteItem = async (cfg, item) => {
    if (LOCKED.includes(cfg.key)) return; // never allowed for services, packages, rentals
    if (!window.confirm('Delete this item?')) return;
    try {
      await api.del(`/admin/${cfg.key}/${item._id}`);
      load();
    } catch {
      flash('Delete failed');
    }
  };

  const defaultFor = (f) => (f.type === 'checkbox' ? f.def ?? true : f.type === 'select' ? f.options[0] : '');

  const openModal = (cfg, item = null) => {
    const form = {};
    cfg.fields.forEach((f) => {
      const v = item ? item[f.k] : undefined;
      if (f.type === 'list') form[f.k] = Array.isArray(v) ? v.join(f.sep === ',' ? ', ' : '\n') : '';
      else form[f.k] = v ?? defaultFor(f);
    });
    setModal({ cfg, item, form });
  };

  const saveModal = async (e) => {
    e.preventDefault();
    const { cfg, item, form } = modal;
    const body = { ...(item || {}), ...form };
    cfg.fields.forEach((f) => {
      if (f.type === 'number' && body[f.k] !== '') body[f.k] = Number(body[f.k]);
      if (f.type === 'list') body[f.k] = String(form[f.k]).split(f.sep === ',' ? ',' : '\n').map((s) => s.trim()).filter(Boolean);
    });
    try {
      if (item) await api.put(`${cfg.write}/${item._id}`, body);
      else if (!LOCKED.includes(cfg.key)) await api.post(`/admin/${cfg.key}`, body);
      setModal(null);
      flash(item ? 'Changes saved' : 'Added');
      load();
    } catch {
      flash('Save failed. Check you are logged in as admin.');
    }
  };

  const missingFor = (key) => {
    const have = new Set((data[key] || []).map(idOf));
    return (DEFAULTS[key] || []).filter((d) => !have.has(idOf(d)));
  };
  const totalMissing = Object.keys(DEFAULTS).reduce((n, k) => n + missingFor(k).length, 0);

  const syncDefaults = async () => {
    if (!window.confirm(`Add ${totalMissing} missing item(s) from the website data to the database?`)) return;
    setSyncing(true);
    let ok = 0;
    let failed = 0;
    for (const key of Object.keys(DEFAULTS)) {
      for (const item of missingFor(key)) {
        const { _id, ...body } = item; // database creates its own id
        try {
          await api.post(`/admin/${key}`, body);
          ok += 1;
        } catch {
          failed += 1;
        }
      }
    }
    setSyncing(false);
    await load();
    flash(failed ? `Added ${ok}. ${failed} could not be added (the server refused them).` : `Added ${ok} item(s) to the database.`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cfg = TABS[tab];
  const canAdd = cfg && cfg.write && !LOCKED.includes(cfg.key) && !cfg.noAdd;
  const canDelete = cfg && !LOCKED.includes(cfg.key);
  const canEdit = cfg && cfg.write && cfg.fields.length > 0;
  const q = query.trim().toLowerCase();
  const items = cfg
    ? data[cfg.key].filter((it) => !q || `${cfg.title(it)} ${cfg.detail(it)}`.toLowerCase().includes(q))
    : [];
  const shownBookings = bookings.filter(
    (b) =>
      (statusFilter === 'All' || b.status === statusFilter) &&
      (!q || `${b.requestId} ${b.patientName} ${b.service} ${b.phone} ${b.city}`.toLowerCase().includes(q))
  );

  const SearchBox = () => (
    <label className="relative block w-full sm:w-72">
      <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className={`${inputCls} !rounded-full pl-9`} />
    </label>
  );

  return (
    <div className="pt-[104px] min-h-screen bg-slate-100">
      {/* Header band */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-slate-300">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-xs font-semibold">
              <span className={`h-2 w-2 rounded-full ${online ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
              {online ? 'Live' : 'Offline'}
              {updated && <span className="text-slate-300">· {updated.toLocaleTimeString('en-IN')}</span>}
            </span>
            <button onClick={load} aria-label="Refresh now" className="rounded-full bg-white/10 border border-white/15 p-2 hover:bg-white/20 cursor-pointer">
              <RefreshCw size={15} />
            </button>
            <button onClick={handleLogout} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 hover:bg-emerald-100 cursor-pointer">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {msg && <p className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700">{msg}</p>}

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-1 rounded-2xl bg-white p-1.5 shadow-sm">
          {TAB_NAMES.map((t) => {
            const Icon = TAB_ICONS[t] || TABS[t].icon;
            const count = t === 'Bookings' ? bookings.length : TABS[t] ? data[TABS[t].key].length : null;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-semibold transition cursor-pointer ${
                  tab === t ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={14} /> {t}
                {count !== null && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[11px] ${tab === t ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>{count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Overview */}
        {tab === 'Overview' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map(([l, v, Icon, grad], i) => (
                <div key={l} className={`relative overflow-hidden rounded-2xl p-5 shadow-sm ${i < 4 ? `bg-gradient-to-br ${grad} text-white` : 'border border-slate-200 bg-white'}`}>
                  <Icon size={i < 4 ? 22 : 18} className={i < 4 ? 'opacity-80' : 'text-emerald-600'} />
                  <p className={`mt-3 text-sm ${i < 4 ? 'text-white/80' : 'text-slate-500'}`}>{l}</p>
                  <p className={`mt-1 font-extrabold ${typeof v === 'string' ? 'text-xl' : 'text-3xl'} ${i < 4 ? '' : 'text-slate-900'}`}>{v}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-extrabold text-slate-900">Who is taking which service</h2>
              <p className="mt-1 text-xs text-slate-500">Number of bookings per service, updated live.</p>
              <div className="mt-5 space-y-4">
                {byService.length === 0 && <p className="text-sm text-slate-400">No bookings yet.</p>}
                {byService.map(([name, count]) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-slate-700">{name}</span>
                      <span className="font-bold text-emerald-700">{count}</span>
                    </div>
                    <div className="mt-1.5 h-2.5 rounded-full bg-slate-100">
                      <div className="h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500" style={{ width: `${(count / maxService) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-extrabold text-slate-900">Website data vs database</h2>
                  <p className="mt-1 text-xs text-slate-500">The admin pages show what is saved in the database. Anything written in the website code but missing there can be added here.</p>
                </div>
                <button
                  onClick={syncDefaults}
                  disabled={syncing || totalMissing === 0}
                  className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 cursor-pointer"
                >
                  {syncing ? 'Adding…' : totalMissing === 0 ? 'Everything is in the database' : `Add ${totalMissing} missing item(s)`}
                </button>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {Object.keys(DEFAULTS).map((k) => (
                  <div key={k} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 text-sm">
                    <span className="font-semibold capitalize text-slate-700">{k}</span>
                    <span className="text-xs text-slate-500">
                      Database {data[k].length} · Website {DEFAULTS[k].length}
                      {missingFor(k).length > 0 && <span className="ml-2 font-bold text-amber-600">{missingFor(k).length} missing</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bookings */}
        {tab === 'Bookings' && (
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <SearchBox />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`${inputCls} !w-auto !rounded-full`}>
                <option>All</option>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
              <table className="w-full text-sm min-w-[900px]">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="p-4">Request ID</th><th className="p-4">Patient</th><th className="p-4">Service</th>
                    <th className="p-4">Phone</th><th className="p-4">City</th><th className="p-4">Status</th><th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {shownBookings.length === 0 && (
                    <tr><td colSpan="7" className="p-10 text-center text-slate-400">No bookings found. New requests will appear here.</td></tr>
                  )}
                  {shownBookings.map((b) => (
                    <tr key={b._id} className="border-t border-slate-100 hover:bg-slate-50/70">
                      <td className="p-4 font-mono font-bold text-emerald-700">{b.requestId}</td>
                      <td className="p-4 font-medium text-slate-800">{b.patientName} <span className="text-slate-400">({b.patientAge}, {b.patientGender?.[0]})</span></td>
                      <td className="p-4">{b.service}</td>
                      <td className="p-4">{b.phone}</td>
                      <td className="p-4">{b.city}</td>
                      <td className="p-4">
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b._id, e.target.value)}
                          className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor[b.status] || ''}`}
                        >
                          {STATUSES.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="p-4">
                        <button onClick={() => deleteBooking(b)} aria-label="Delete booking" className="rounded-lg p-2 text-red-500 hover:bg-red-50 cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Generic data tabs */}
        {cfg && (
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <SearchBox />
              {canAdd && (
                <button onClick={() => openModal(cfg)} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-emerald-700 cursor-pointer">
                  <Plus size={15} /> Add {cfg.singular}
                </button>
              )}
              {LOCKED.includes(cfg.key) && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-4 py-2 text-xs font-semibold text-amber-700">
                  <Lock size={13} /> You can edit these, but not add or delete them
                </span>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr><th className="p-4">Name</th><th className="p-4">Details</th><th className="p-4 text-right">Action</th></tr>
                </thead>
                <tbody>
                  {items.length === 0 && <tr><td colSpan="3" className="p-10 text-center text-slate-400">Nothing found.</td></tr>}
                  {items.map((it) => (
                    <tr key={it._id} className="border-t border-slate-100 hover:bg-slate-50/70">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {it.image ? (
                            <img src={it.image} alt="" className="h-10 w-10 shrink-0 rounded-xl bg-slate-100 object-cover" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
                          ) : (
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-xs font-extrabold text-emerald-700">
                              {initialsOf(cfg.title(it) || '?')}
                            </span>
                          )}
                          <span className="font-semibold text-slate-900">{cfg.title(it)}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-500 text-xs max-w-md truncate">{cfg.detail(it)}</td>
                      <td className="p-4">
                        <div className="flex justify-end gap-1">
                          {canEdit && (
                            <button onClick={() => openModal(cfg, it)} aria-label="Edit" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 cursor-pointer">
                              <Pencil size={16} />
                            </button>
                          )}
                          {canDelete && (
                            <button onClick={() => deleteItem(cfg, it)} aria-label="Delete" className="rounded-lg p-2 text-red-600 hover:bg-red-50 cursor-pointer">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit / add window */}
      {modal && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <form onSubmit={saveModal} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900">
                {modal.item ? 'Edit' : 'Add'} {modal.cfg.singular}
              </h2>
              <button type="button" onClick={() => setModal(null)} aria-label="Close" className="rounded-lg p-2 hover:bg-slate-100 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {modal.cfg.fields.map((f) => {
                const set = (v) => setModal({ ...modal, form: { ...modal.form, [f.k]: v } });
                const val = modal.form[f.k];
                if (f.type === 'checkbox')
                  return (
                    <label key={f.k} className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                      <input type="checkbox" checked={!!val} onChange={(e) => set(e.target.checked)} className="h-4 w-4 accent-emerald-600" />
                      {f.label}
                    </label>
                  );
                return (
                  <label key={f.k} className="block text-sm font-semibold text-slate-700">
                    {f.label}
                    {f.type === 'textarea' || f.type === 'list' ? (
                      <textarea rows={f.type === 'list' ? 4 : 3} className={`${inputCls} mt-1`} value={val} onChange={(e) => set(e.target.value)} />
                    ) : f.type === 'select' ? (
                      <select className={`${inputCls} mt-1`} value={val} onChange={(e) => set(e.target.value)}>
                        {[...new Set([...(val ? [val] : []), ...f.options])].map((o) => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={f.type === 'number' ? 'number' : 'text'} className={`${inputCls} mt-1`} value={val} onChange={(e) => set(e.target.value)} />
                    )}
                  </label>
                );
              })}
            </div>

            <div className="mt-7 flex justify-end gap-2">
              <button type="button" onClick={() => setModal(null)} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 cursor-pointer">
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}