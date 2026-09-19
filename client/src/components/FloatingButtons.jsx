import { Phone, MessageCircle } from 'lucide-react';
import { PHONE_TEL, WHATSAPP } from '../data/siteData';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a href={PHONE_TEL} aria-label="Call now"
        className="grid h-14 w-14 place-items-center rounded-full bg-primary-600 text-white shadow-xl shadow-primary-500/40 animate-bounce hover:scale-110 transition">
        <Phone size={24} />
      </a>
      <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-care-600 text-white shadow-xl shadow-care-500/40 hover:scale-110 transition">
        <MessageCircle size={24} />
      </a>
    </div>
  );
}