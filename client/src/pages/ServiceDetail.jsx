import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, CheckCircle2, ArrowLeft } from 'lucide-react';
import EnquiryCTA from '../components/EnquiryCTA';
import Reveal from '../components/Reveal';
import { SERVICES } from '../data/siteData';
import { api } from '../utils/api';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(SERVICES.find(s => s.slug === slug) || SERVICES[0]);

  useEffect(() => {
    api.get(`/services/${slug}`).then(setService).catch(() =>
      setService(SERVICES.find(s => s.slug === slug) || SERVICES[0]));
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="pt-[104px]">
      <section className="bg-gradient-to-br from-primary-600 to-care-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="text-sm text-white/80 hover:text-white flex items-center gap-1.5"><ArrowLeft size={15} /> All Services</Link>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-3">{service.name}</h1>
          <p className="mt-3 text-white/85 max-w-2xl">{service.description || service.shortDescription}</p>
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold"><Clock size={15} /> {service.duration}</p>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-12">
        <Reveal>
          <h2 className="font-extrabold text-xl text-slate-800 mb-4">Service Inclusions</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {(service.inclusions || []).map(inc => (
              <li key={inc} className="card !p-4 flex items-center gap-3 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-care-500 shrink-0" /> {inc}
              </li>
            ))}
          </ul>
          <div className="card mt-8 bg-gradient-to-r from-primary-50 to-care-50 !border-0">
            <h3 className="font-extrabold text-slate-800">Book {service.name} in Bangalore</h3>
            <p className="text-sm text-slate-500 mt-1">Deployment within 2–12 hours. Free consultation with our clinical team.</p>
            <EnquiryCTA serviceName={service.name} />
          </div>
        </Reveal>
      </section>
    </div>
  );
}