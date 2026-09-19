import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { PHONE, PHONE_TEL, EMAIL, ADDRESS, HOURS, WHATSAPP } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
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
              <p className="text-[10px] tracking-widest text-care-400 uppercase font-semibold">Caring. Professional. Home.</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Sowik Home Health Care Private Limited — bringing verified nurses, caregivers and physiotherapists to your doorstep, anywhere in Bangalore.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {['/', '/about', '/services', '/packages', '/book-a-nurse', '/team', '/faq', '/contact'].map((to, i) => (
              <li key={to}>
                <Link to={to} className="hover:text-care-400 transition">
                  {['Home', 'About Us', 'Services', 'Packages', 'Book a Nurse', 'Our Team', 'FAQ', 'Contact'][i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Elderly & Senior Care</li>
            <li>Post-Surgery Nursing</li>
            <li>24/7 Nursing at Home</li>
            <li>Physiotherapy at Home</li>
            <li>Wound Care & Dressing</li>
            <li>Palliative Care</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <Phone size={16} className="text-care-400 shrink-0 mt-0.5" /> 
              <a href={PHONE_TEL} className="hover:text-care-400">{PHONE}</a>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="text-care-400 shrink-0 mt-0.5" /> 
              <span>{EMAIL}</span>
            </li>
            <li className="flex gap-2">
              <MapPin size={16} className="text-care-400 shrink-0 mt-0.5" /> 
              <span>{ADDRESS}</span>
            </li>
            <li className="flex gap-2">
              <Clock size={16} className="text-care-400 shrink-0 mt-0.5" /> 
              <span>{HOURS}</span>
            </li>
          </ul>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-whatsapp mt-4 !text-xs inline-flex">
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500 px-4">
        <p className="mb-1">© {new Date().getFullYear()} Sowik Home Health Care Private Limited. All rights reserved.</p>
        <p>For medical emergencies, call <strong className="text-slate-300">108 / 112</strong>. In case of a life-threatening emergency, always contact local emergency services first.</p>
      </div>
    </footer>
  );
}