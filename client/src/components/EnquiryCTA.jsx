import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { PHONE, PHONE_TEL } from '../data/siteData';

export default function EnquiryCTA({ serviceName }) {
  const navigate = useNavigate();
  const msg = encodeURIComponent(`Hello Sowik Home Health Care, I want to enquire about ${serviceName || 'your services'} in Bangalore.`);
  return (
    <div className="flex flex-wrap gap-3 mt-5">
      <button onClick={() => navigate('/book-a-nurse', { state: { service: serviceName } })} className="btn-primary !text-xs">Enquire / Book Now</button>
      <a href={`https://wa.me/917022755362?text=${msg}`} target="_blank" rel="noreferrer" className="btn-whatsapp !text-xs">WhatsApp Enquiry</a>
      <a href={PHONE_TEL} className="btn-outline !text-xs"><Phone size={14} /> {PHONE}</a>
    </div>
  );
}