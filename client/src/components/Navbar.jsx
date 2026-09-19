import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { PHONE_TEL, PHONE } from '../data/siteData';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/packages', label: 'Packages' },
  { to: '/team', label: 'Our Team' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' }
];

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
    `text-xs xl:text-sm font-semibold whitespace-nowrap transition ${
      isActive ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'
    }`;

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition ${scrolled ? 'bg-white/95 shadow-md backdrop-blur' : 'bg-white'}`}>
      <div className="bg-gradient-to-r from-primary-600 to-care-600 text-white text-center text-xs py-1.5 px-4">
        🚨 Medical emergency? Call <strong>108 / 112</strong> immediately. We are a home-care service, not an emergency responder.
      </div>
      
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2.5">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img 
            src="/logo.png" 
            alt="Sowik Logo" 
            className="h-10 md:h-12 w-auto object-contain" 
            onError={(e) => { e.currentTarget.src = '/logo.jpeg'; }}
          />
          <div className="leading-tight">
            <span className="block font-extrabold text-slate-800 text-base md:text-lg whitespace-nowrap">
              Sowik Home Health Care
            </span>
            <span className="block text-[9px] md:text-[10px] font-semibold tracking-wider text-care-600 uppercase whitespace-nowrap">
              Caring. Professional. Home.
            </span>
          </div>
        </Link>

        {/* Center Navigation (Only visible on xl screens to prevent wrapping) */}
        <div className="hidden xl:flex items-center gap-5">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={navCls} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
          {user && <NavLink to="/admin" className={navCls}>Admin</NavLink>}
        </div>

        {/* Right Action Items */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a href={PHONE_TEL} className="flex items-center gap-1.5 text-xs xl:text-sm font-bold text-slate-700 hover:text-primary-600 whitespace-nowrap">
            <Phone size={15} className="text-care-600 shrink-0" />
            <span>{PHONE}</span>
          </a>
          <button onClick={() => navigate('/book-a-nurse')} className="btn-primary !py-2 !px-4 !text-xs whitespace-nowrap">
            Book a Nurse
          </button>
        </div>

        {/* Mobile / Tablet Menu Button */}
        <button 
          className="xl:hidden p-1.5 text-slate-700 hover:text-primary-600" 
          onClick={() => setOpen(!open)} 
          aria-label="Toggle Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="xl:hidden bg-white border-t shadow-lg px-6 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
          {links.map(l => (
            <NavLink 
              key={l.to} 
              to={l.to} 
              end={l.to === '/'} 
              onClick={() => setOpen(false)}
              className={({ isActive }) => `block py-1.5 text-sm ${isActive ? 'text-primary-600 font-bold' : 'text-slate-600 font-semibold'}`}
            >
              {l.label}
            </NavLink>
          ))}
          {user && (
            <NavLink to="/admin" onClick={() => setOpen(false)} className="block py-1.5 text-sm font-semibold text-slate-600">
              Admin
            </NavLink>
          )}
          <div className="pt-2 flex flex-col gap-2">
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