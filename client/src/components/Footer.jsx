import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { PHONE, PHONE_TEL, EMAIL, ADDRESS, WHATSAPP } from '../data/siteData';

const INSTAGRAM = 'https://www.instagram.com/sowik_home_health_care';
const FACEBOOK = 'https://www.facebook.com/profile.php?id=61594714877949';

const quickLinks = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Services', '/services'],
  ['Rentals', '/rentals'],
  ['Packages', '/packages'],
  ['Book a Nurse', '/book-a-nurse'],
  ['Our Team', '/team'],
  ['FAQ', '/faq'],
  ['Contact', '/contact']
];

const serviceLinks = [
  ['Elderly & Senior Care', '/services/elderly-care'],
  ['Post-Surgery Nursing', '/services/post-surgery'],
  ['24/7 Nursing at Home', '/services/24-7-nursing'],
  ['Physiotherapy at Home', '/services/physiotherapy'],
  ['Wound Care & Dressing', '/services/wound-care'],
  ['Palliative Care', '/services/palliative-care']
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.png"
              alt="Sowik Home Health Care Logo"
              className="h-12 w-auto object-contain bg-white rounded-xl p-1.5 shadow-sm"
              onError={(e) => { e.currentTarget.src = '/logo.jpeg'; }}
            />
            <div>
              <p className="font-extrabold text-white text-base leading-snug">Sowik Home Health Care</p>
              <p className="text-[10px] tracking-widest text-care-400 uppercase font-semibold">Your Loved Ones, Our Care.</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Sowik Home Health Care Private Limited — bringing verified nurses, caregivers and physiotherapists to your doorstep, anywhere in India.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              aria-label="Sowik Home Health Care on Instagram"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-pink-500"
            >
              <Instagram size={18} />
            </a>
            <a
              href={FACEBOOK}
              target="_blank"
              rel="noreferrer"
              aria-label="Sowik Home Health Care on Facebook"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-blue-600"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="hover:text-care-400 transition">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-bold mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            {serviceLinks.map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="hover:text-care-400 transition">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <Phone size={16} className="text-care-400 shrink-0 mt-0.5" />
              <a href={PHONE_TEL} className="hover:text-care-400">{PHONE}</a>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="text-care-400 shrink-0 mt-0.5" />
              <a href={`mailto:${EMAIL}`} className="hover:text-care-400">{EMAIL}</a>
            </li>
            <li className="flex gap-2">
              <MapPin size={16} className="text-care-400 shrink-0 mt-0.5" />
              <span>{ADDRESS}</span>
            </li>
            <li className="flex gap-2">
              <Clock size={16} className="text-care-400 shrink-0 mt-0.5" />
              <span>Available 24/7 — 365 days a year, across India</span>
            </li>
          </ul>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-whatsapp mt-4 !text-xs inline-flex">
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-slate-400">
        <p>© 2026 Sowik Home Health Care Private Limited. All rights reserved.</p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link to="/terms" className="font-semibold text-slate-300 hover:text-white underline">
            Terms &amp; Conditions
          </Link>
          <Link to="/refund-policy" className="font-semibold text-slate-300 hover:text-white underline">
            Refund Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}