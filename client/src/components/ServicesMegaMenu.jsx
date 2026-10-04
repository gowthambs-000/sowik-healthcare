import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const GROUPS = [
  {
    title: 'Nursing & Critical Care',
    color: 'text-sky-700',
    items: [
      ['24/7 Nursing at Home', '/services/24-7-nursing'],
      ['Post-Surgery Nursing Care', '/services/post-surgery'],
      ['Post-Hospitalization Care', '/services/post-hospitalization'],
      ['Sterile Wound Care & Dressing', '/services/wound-care'],
      ['Medication Assistance', '/services/medication-assistance'],
      ['Vital Signs Monitoring', '/services/vital-monitoring']
    ]
  },
  {
    title: 'Caregiver & Senior Support',
    color: 'text-rose-600',
    items: [
      ['Elderly & Senior Care', '/services/elderly-care'],
      ['Bedridden Patient Care', '/services/bedridden-care'],
      ['Dementia & Alzheimer’s Care', '/services/dementia-alzheimers-care'],
      ['Attendant / Caregiver', '/services/attendant-caregiver'],
      ['Palliative Care', '/services/palliative-care']
    ]
  },
  {
    title: 'Baby Care & Rehabilitation',
    color: 'text-emerald-700',
    items: [
      ['Newborn Baby & Mother Care', '/services/newborn-baby-mother-care'],
      ['Night Nanny & Infant Care', '/services/night-nanny-infant-care'],
      ['Preterm Infant Care', '/services/preterm-infant-care'],
      ['Physiotherapy at Home', '/services/physiotherapy'],
      ['Old Age Home Facility', '/services/old-age-home'],
      ['Rehabilitation Center Facility', '/services/rehabilitation-center']
    ]
  }
];

// linkClass is the same NavLink class function the navbar uses, so Services matches the other links.
export default function ServicesMegaMenu({ linkClass }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);

  const show = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) hide();
      }}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      <NavLink to="/services" className={linkClass} aria-haspopup="true" aria-expanded={open}>
        <span className="inline-flex items-center gap-1">
        Services
        <ChevronDown size={15} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </span>
      </NavLink>

      {/* pt-5 acts as an invisible bridge so the menu doesn't close while the mouse travels down */}
      <div
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-5 transition-all duration-200 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <div className="w-[min(860px,92vw)] rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
          <div className="grid grid-cols-3 gap-8">
            {GROUPS.map((g) => (
              <div key={g.title}>
                <h3 className={`text-sm font-extrabold uppercase tracking-wide ${g.color}`}>{g.title}</h3>
                <ul className="mt-4 space-y-1">
                  {g.items.map(([label, to]) => (
                    <li key={to}>
                      <Link
                        to={to}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-[15px] font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300 group-hover:bg-emerald-500 transition" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-sm">
            <Link to="/rentals" onClick={() => setOpen(false)} className="font-semibold text-slate-600 hover:text-emerald-700">
              Medical equipment on rent
            </Link>
            <Link
              to="/services"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:underline"
            >
              View all services <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}