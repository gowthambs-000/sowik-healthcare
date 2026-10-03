import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Search, Stethoscope, ShieldCheck, Wallet } from 'lucide-react';
import { PHONE, PHONE_TEL, WHATSAPP } from '../data/siteData';
import { RENTALS, RENTAL_CATEGORIES } from '../data/rentalData';
import { api } from '../utils/api';

const perks = [
  [ShieldCheck, 'Cleaned & sanitised before every rental'],
  [Wallet, 'Simple monthly rental, no big upfront cost']
];

const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

export default function Rentals() {
  const [items, setItems] = useState(RENTALS);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    api
      .get('/rentals')
      .then((data) => Array.isArray(data) && data.length && setItems(data))
      .catch(() => {});
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set([...RENTAL_CATEGORIES, ...items.map((i) => i.category)].filter(Boolean))],
    [items]
  );

  const shown = items.filter(
    (i) =>
      i.available !== false &&
      (category === 'All' || i.category === category) &&
      i.name.toLowerCase().includes(query.toLowerCase())
  );

  const whatsappFor = (name) => {
    const text = encodeURIComponent(`Hi, I would like to rent: ${name}`);
    return `${WHATSAPP}${WHATSAPP.includes('?') ? '&' : '?'}text=${text}`;
  };

  return (
    <div className="pt-[104px] bg-slate-50 min-h-screen">
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold border border-white/20">
            <Stethoscope size={14} /> Medical equipment on rent
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight max-w-3xl">
            Rent hospital-grade equipment for your home
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">
            Beds, oxygen and breathing support, monitors, wheelchairs and rehab machines, delivered
            to your door in Bangalore and rented by the month.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 max-w-3xl">
            {perks.map(([Icon, text]) => (
              <div key={text} className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 p-4 text-sm">
                <Icon size={20} className="shrink-0 text-emerald-300" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold border transition cursor-pointer ${
                  category === c
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="relative block md:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search equipment"
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-emerald-500"
            />
          </label>
        </div>

        {shown.length === 0 ? (
          <p className="mt-16 text-center text-slate-500">
            No equipment matches your search. Call us on{' '}
            <a href={PHONE_TEL} className="font-semibold text-emerald-700">{PHONE}</a> and we will arrange it.
          </p>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {shown.map((item) => (
              <article
                key={item._id || item.name}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition"
              >
                {item.image ? (
                  <img src={item.image} alt={item.name} loading="lazy" className="h-44 w-full object-cover bg-slate-100" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
                ) : (
                  <div className="grid h-44 place-items-center bg-gradient-to-br from-emerald-50 to-slate-100 text-emerald-600">
                    <Stethoscope size={44} />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-bold text-emerald-700">{item.category}</span>
                  <h2 className="mt-1 font-bold text-slate-900 leading-snug">{item.name}</h2>
                  {item.description && <p className="mt-2 text-sm text-slate-500">{item.description}</p>}
                  <p className="mt-auto pt-4">
                    <span className="text-2xl font-black text-slate-900">{inr(item.price)}</span>
                    <span className="text-sm text-slate-500"> / month</span>
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <a
                      href={whatsappFor(item.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 transition"
                    >
                      <MessageCircle size={15} /> Rent now
                    </a>
                    <a
                      href={PHONE_TEL}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-300 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100 transition"
                    >
                      <Phone size={15} /> Call
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-10 text-center text-xs text-slate-500">
          Prices are per month and may vary by rental period and deposit. See our{' '}
          <Link to="/terms" className="underline">Terms</Link> and{' '}
          <Link to="/refund-policy" className="underline">Refund Policy</Link>.
        </p>
      </section>
    </div>
  );
}