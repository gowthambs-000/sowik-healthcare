import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { PHONE_TEL, PHONE } from '../data/siteData';
import { useAuth } from '../context/AuthContext';
import ServicesMegaMenu from './ServicesMegaMenu';

// Shown directly in the top bar
const mainLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/rentals', label: 'Rentals' },
  { to: '/packages', label: 'Packages' },
  { to: '/team', label: 'Our Team' },
  { to: '/contact', label: 'Contact' }
];

// Tucked into the "More" dropdown
const moreLinks = [
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/faq', label: 'FAQ' },
  { to: '/referral', label: 'Referral Program' },
  { to: '/join-us', label: 'Join Us' }
];

const mobileLinks = [...mainLinks.slice(0, 6), ...moreLinks, mainLinks[6]];

function MoreMenu({ linkClass }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), 150); };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      <button type="button" aria-expanded={open} className={`${linkClass({ isActive: false })} inline-flex items-center gap-1 cursor-pointer`}>
        More <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 transition-all duration-200 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="w-44 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
          {moreLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navCls = ({ isActive }) =>
    `text-sm font-semibold whitespace-nowrap transition ${
      isActive ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'
    }`;

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition ${scrolled ? 'bg-white/95 shadow-md backdrop-blur' : 'bg-white'}`}>
      <div className="bg-gradient-to-r from-primary-600 to-care-600 text-white text-center text-xs py-1.5 px-4">
        🚨 Medical emergency? Call <strong>108 / 112</strong> immediately. We are a home-care service, not an emergency responder.
      </div>

      <nav className="max-w-7xl mx-auto flex items-center gap-8 px-4 py-2.5">
        {/* Brand: pinned to the left */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 mr-auto xl:mr-0">
          <img
            src="/logo.png"
            alt="Sowik Logo"
            className="h-10 md:h-11 w-auto object-contain"
            onError={(e) => { e.currentTarget.src = '/logo.jpeg'; }}
          />
          <div className="leading-tight">
            <span className="block font-extrabold text-slate-800 text-base whitespace-nowrap">Sowik Home Health Care</span>
            <span className="block text-[9px] font-semibold tracking-wider text-care-600 uppercase whitespace-nowrap">
              Your Loved Ones, Our Care.
            </span>
          </div>
        </Link>

        {/* Pages (wide screens only) */}
        <div className="hidden xl:flex flex-1 items-center justify-center gap-6">
          {mainLinks.map((l) =>
            l.to === '/services' ? (
              <ServicesMegaMenu key={l.to} linkClass={navCls} />
            ) : (
              <NavLink key={l.to} to={l.to} className={navCls} end={l.to === '/'}>
                {l.label}
              </NavLink>
            )
          )}
          <MoreMenu linkClass={navCls} />
          {user && <NavLink to="/admin" className={navCls}>Admin</NavLink>}
        </div>

        {/* Call + book */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <a href={PHONE_TEL} className="flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-primary-600 whitespace-nowrap">
            <Phone size={15} className="text-care-600 shrink-0" />
            {PHONE}
          </a>
          <button onClick={() => navigate('/book-a-nurse')} className="btn-primary !py-2 !px-4 !text-xs whitespace-nowrap">
            Book a Nurse
          </button>
        </div>

        {/* Mobile / tablet menu button */}
        <button className="xl:hidden p-1.5 text-slate-700 hover:text-primary-600" onClick={() => setOpen(!open)} aria-label="Toggle Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="xl:hidden bg-white border-t shadow-lg px-6 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {mobileLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `block py-2 text-sm ${isActive ? 'text-primary-600 font-bold' : 'text-slate-600 font-semibold'}`}
            >
              {l.label}
            </NavLink>
          ))}
          {user && (
            <NavLink to="/admin" onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold text-slate-600">
              Admin
            </NavLink>
          )}
          <div className="pt-3 flex flex-col gap-2">
            <button onClick={() => { setOpen(false); navigate('/book-a-nurse'); }} className="btn-primary w-full">
              Book a Nurse
            </button>
            <a href={PHONE_TEL} className="btn-whatsapp w-full flex items-center justify-center gap-1.5">
              <Phone size={16} /> Call {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}