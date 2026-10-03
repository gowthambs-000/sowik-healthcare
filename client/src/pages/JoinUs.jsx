import { useState } from 'react';
import { Briefcase, MessageCircle } from 'lucide-react';

// Put the company WhatsApp number here: country code + number, digits only. Example: 919876543210
const WHATSAPP_NUMBER = '919876543210';

const SKILLS = [
  'Patient care', 'Elderly care', 'Feeding assistance', 'Cooking', 'Diaper changing', 'Housekeeping',
  'Urine bag handling', 'Bathing & grooming', 'Bedridden patient care', 'Emergency handling', 'Medication assistance'
];

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:bg-white focus:border-primary-600 outline-none transition';
const labelCls = 'block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5';

const initial = {
  fullName: '', guardian: '', dob: '', gender: '', marital: '', mobile: '', altMobile: '', email: '',
  permStreet: '', permCity: '', permDistrict: '', permState: '', permPin: '',
  sameAddress: false,
  curStreet: '', curCity: '', curDistrict: '', curState: '', curPin: '',
  position: '', workType: '', location: '', joining: '', holidays: '',
  eduBasic: '', eduBasicYear: '', eduBasicCert: '',
  eduNursing: '', eduNursingYear: '', eduNursingCert: '',
  expOrg: '', expRole: '', expDuration: '', expReason: '',
  skills: [],
  illness: '', disability: '', criminal: '', verification: '',
  emName: '', emRelation: '', emMobile: '',
  agree: false
};

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-sm font-black text-slate-900 pb-2 mb-4 border-b border-slate-100">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default function JoinUs() {
  const [f, setF] = useState(initial);
  const [error, setError] = useState('');

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const text = (k, label, props = {}) => (
    <div>
      <label className={labelCls}>{label}</label>
      <input className={inputCls} value={f[k]} onChange={set(k)} {...props} />
    </div>
  );

  const choice = (k, label, options) => (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            type="button"
            key={o}
            onClick={() => setF({ ...f, [k]: o })}
            className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
              f[k] === o ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );

  const toggleSkill = (s) =>
    setF({ ...f, skills: f.skills.includes(s) ? f.skills.filter((x) => x !== s) : [...f.skills, s] });

  const submit = (e) => {
    e.preventDefault();
    setError('');

    if (!/^[6-9]\d{9}$/.test(f.mobile.replace(/\D/g, ''))) return setError('Please enter a valid 10-digit mobile number.');
    if (!f.gender || !f.position || !f.workType) return setError('Please choose gender, position and work type.');
    if (!f.agree) return setError('Please tick the declaration before sending.');

    const cur = f.sameAddress
      ? 'Same as permanent'
      : [f.curStreet, f.curCity, f.curDistrict, f.curState, f.curPin].filter(Boolean).join(', ');
    const perm = [f.permStreet, f.permCity, f.permDistrict, f.permState, f.permPin].filter(Boolean).join(', ');

    const msg = [
      '*JOB APPLICATION - Sowik Home Health Care*',
      '',
      '*Personal*',
      `Name: ${f.fullName}`,
      `Parent/Guardian: ${f.guardian}`,
      `DOB: ${f.dob}`,
      `Gender: ${f.gender} | Marital: ${f.marital || '-'}`,
      `Mobile: ${f.mobile} | Alt: ${f.altMobile || '-'}`,
      `Email: ${f.email || '-'}`,
      '',
      '*Address*',
      `Permanent: ${perm}`,
      `Current: ${cur}`,
      '',
      '*Job*',
      `Position: ${f.position}`,
      `Work type: ${f.workType}`,
      `Preferred location: ${f.location || '-'}`,
      `Joining date: ${f.joining || '-'}`,
      `Holidays & night shifts: ${f.holidays || '-'}`,
      '',
      '*Education*',
      `Basic: ${f.eduBasic || '-'} (${f.eduBasicYear || '-'}) Cert: ${f.eduBasicCert || '-'}`,
      `Nursing: ${f.eduNursing || '-'} (${f.eduNursingYear || '-'}) Cert: ${f.eduNursingCert || '-'}`,
      '',
      '*Experience*',
      `${f.expOrg || '-'} | ${f.expRole || '-'} | ${f.expDuration || '-'} | Left: ${f.expReason || '-'}`,
      '',
      `*Skills:* ${f.skills.join(', ') || '-'}`,
      '',
      '*Health & background*',
      `Major illness: ${f.illness || '-'}`,
      `Disability affecting work: ${f.disability || '-'}`,
      `Criminal case: ${f.criminal || '-'}`,
      `Willing for verification: ${f.verification || '-'}`,
      '',
      '*Emergency contact*',
      `${f.emName || '-'} (${f.emRelation || '-'}) ${f.emMobile || '-'}`,
      '',
      'I declare the above information is true.'
    ].join('\n');

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="pt-[104px] bg-slate-50 min-h-screen">
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold">
            <Briefcase size={14} /> We are hiring
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-black">Join Our Care Team</h1>
          <p className="mt-3 text-slate-300 text-sm md:text-base max-w-xl mx-auto">
            Caretakers and home nurses: fill the form and send it to us on WhatsApp. We will call you.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 -mt-8 pb-16 relative">
        <form onSubmit={submit} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xl space-y-8">
          {error && <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{error}</div>}

          <Section title="1. Personal details">
            {text('fullName', 'Full name', { required: true })}
            {text('guardian', "Father's / Mother's / Guardian's name", { required: true })}
            {text('dob', 'Date of birth', { type: 'date', required: true })}
            {text('mobile', 'Mobile number', { required: true, inputMode: 'numeric', maxLength: 10 })}
            {text('altMobile', 'Alternate number', { inputMode: 'numeric', maxLength: 10 })}
            {text('email', 'Email (optional)', { type: 'email' })}
            {choice('gender', 'Gender', ['Male', 'Female', 'Other'])}
            {choice('marital', 'Marital status', ['Single', 'Married', 'Other'])}
          </Section>

          <Section title="2. Permanent address">
            <div className="md:col-span-2">{text('permStreet', 'House no / Street', { required: true })}</div>
            {text('permCity', 'Village / Town / City', { required: true })}
            {text('permDistrict', 'District')}
            {text('permState', 'State')}
            {text('permPin', 'PIN code', { inputMode: 'numeric', maxLength: 6 })}
          </Section>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer mb-4">
              <input type="checkbox" checked={f.sameAddress} onChange={(e) => setF({ ...f, sameAddress: e.target.checked })} />
              Current address is the same as permanent
            </label>
            {!f.sameAddress && (
              <Section title="3. Current address">
                <div className="md:col-span-2">{text('curStreet', 'House no / Street')}</div>
                {text('curCity', 'Village / Town / City')}
                {text('curDistrict', 'District')}
                {text('curState', 'State')}
                {text('curPin', 'PIN code', { inputMode: 'numeric', maxLength: 6 })}
              </Section>
            )}
          </div>

          <Section title="4. Job details">
            {choice('position', 'Position applied for', ['Caretaker', 'Home Nurse', 'Other'])}
            {choice('workType', 'Preferred work type', ['24/7 Live-In', 'Day Shift', 'Night Shift'])}
            {text('location', 'Preferred work location')}
            {text('joining', 'Expected date of joining', { type: 'date' })}
            {choice('holidays', 'Willing to work holidays & night shifts', ['Yes', 'No'])}
          </Section>

          <Section title="5. Education">
            {text('eduBasic', 'Basic education / degree')}
            {text('eduBasicYear', 'Year')}
            {choice('eduBasicCert', 'Certificate available', ['Yes', 'No'])}
            <div className="hidden md:block" />
            {text('eduNursing', 'Nursing course (BSc / GNM / ANM / GDA)')}
            {text('eduNursingYear', 'Year')}
            {choice('eduNursingCert', 'Certificate available', ['Yes', 'No'])}
          </Section>

          <Section title="6. Work experience (if any)">
            {text('expOrg', 'Organization / individual')}
            {text('expRole', 'Role')}
            {text('expDuration', 'Duration')}
            {text('expReason', 'Reason for leaving')}
          </Section>

          <div>
            <h2 className="text-sm font-black text-slate-900 pb-2 mb-4 border-b border-slate-100">7. Skills</h2>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleSkill(s)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold border cursor-pointer ${
                    f.skills.includes(s) ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Section title="8. Health & background">
            {choice('illness', 'Any major illness or medical condition?', ['Yes', 'No'])}
            {choice('disability', 'Any physical disability affecting work?', ['Yes', 'No'])}
            {choice('criminal', 'Any criminal case or police complaint?', ['Yes', 'No'])}
            {choice('verification', 'Willing to undergo background verification?', ['Yes', 'No'])}
          </Section>

          <Section title="9. Emergency contact">
            {text('emName', 'Name')}
            {text('emRelation', 'Relationship')}
            {text('emMobile', 'Mobile number', { inputMode: 'numeric', maxLength: 10 })}
          </Section>

          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-600 space-y-2">
            <p>
              Bring originals of your Aadhaar, education certificates, address proof and 2 photos when you come for the interview.
              Please do not type your Aadhaar number here.
            </p>
            <label className="flex items-start gap-2 font-semibold text-slate-700 cursor-pointer">
              <input type="checkbox" className="mt-0.5" checked={f.agree} onChange={(e) => setF({ ...f, agree: e.target.checked })} />
              I declare that all information is true, and I agree to follow company rules and to undergo training, background
              verification and medical checks if required.
            </label>
          </div>

          <button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer">
            <MessageCircle size={16} /> Send application on WhatsApp
          </button>
          <p className="text-center text-[11px] text-slate-400">WhatsApp will open with your details filled in. Press Send there to finish.</p>
        </form>
      </section>
    </div>
  );
}