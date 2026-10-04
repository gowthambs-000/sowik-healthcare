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
    title: 'Baby Care',
    color: 'text-emerald-700',
    items: [
      ['Newborn Baby & Mother Care', '/services/newborn-baby-mother-care'],
      ['Night Nanny & Infant Care', '/services/night-nanny-infant-care'],
      ['Preterm Infant Care', '/services/preterm-infant-care']
    ]
  },
  {
    title: 'Rehabilitation & Facilities',
    color: 'text-violet-700',
    items: [
      ['Physiotherapy at Home', '/services/physiotherapy'],
      ['Old Age Home Facility', '/services/old-age-home'],
      ['Rehabilitation Center Facility', '/services/rehabilitation-center']
    ]
  }
];

// One group = a small heading plus its links
function Group({ g, onPick }) {
  return (
    <div>
      <h3 className={`text-xs font-extrabold uppercase tracking-wide ${g.color}`}>{g.title}</h3>
      <ul className="mt-2 space-y-0.5">
        {g.items.map(([label, to]) => (
          <li key={to}>
            <Link
              to={to}
              onClick={onPick}
              className="group flex items-center gap-2 rounded-md px-1.5 py-1 text-[13px] font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-slate-400 group-hover:bg-emerald-500 transition" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
  const close = () => setOpen(false);

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

      {/* pt-3 acts as an invisible bridge so the menu doesn't close while the mouse travels down */}
      <div
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        {/* Compact panel. Change the 760px below to make it wider or narrower. */}
        <div className="w-[min(760px,94vw)] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
          <div className="grid grid-cols-3 gap-x-6">
            <Group g={GROUPS[0]} onPick={close} />
            <Group g={GROUPS[1]} onPick={close} />
            <div className="space-y-4">
              <Group g={GROUPS[2]} onPick={close} />
              <Group g={GROUPS[3]} onPick={close} />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
            <Link to="/rentals" onClick={close} className="font-semibold text-slate-600 hover:text-emerald-700">
              Medical equipment on rent
            </Link>
            <Link to="/services" onClick={close} className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:underline">
              View all services <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}