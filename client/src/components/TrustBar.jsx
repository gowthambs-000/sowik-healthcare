import { ShieldCheck, Award, Clock, HeartPulse, CheckCircle2 } from 'lucide-react';

const ITEMS = [
  { icon: ShieldCheck, label: '100% Verified GNM/B.Sc', iconCls: 'text-slate-800', textCls: 'text-slate-800' },
  { icon: Award, label: 'Police Background Checked', iconCls: 'text-rose-700', textCls: 'text-slate-800' },
  { icon: Clock, label: 'Rapid Deployment', iconCls: 'text-lime-600', textCls: 'text-slate-800' },
  { icon: HeartPulse, label: 'Doctor Supervision', iconCls: 'text-slate-800', textCls: 'text-slate-800' },
  { icon: CheckCircle2, label: '1,000+ Happy Families', iconCls: 'text-rose-700', textCls: 'text-rose-700' }
];

export default function TrustBar() {
  return (
    <div className="border-b border-slate-200 bg-white">
      <ul className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 lg:justify-between">
        {ITEMS.map(({ icon: Icon, label, iconCls, textCls }) => (
          <li key={label} className="flex items-center gap-2.5">
            <Icon size={20} strokeWidth={2} className={`shrink-0 ${iconCls}`} />
            <span className={`text-sm font-bold whitespace-nowrap ${textCls}`}>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}