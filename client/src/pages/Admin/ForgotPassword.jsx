import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, KeyRound, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { api } from '../../utils/api';

const inputCls =
  'w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:bg-white focus:border-primary-600 outline-none transition';
const labelCls = 'block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter code + new password, 3 = done
  const [email, setEmail] = useState('support@sowik.in');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const sendCode = async (e) => {
    e?.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    try {
      const res = await api.post('/auth/forgot-password', { email: email.trim() });
      setInfo(res?.message || 'If this email belongs to an admin account, a 6-digit code has been sent.');
      setStep(2);
    } catch (err) {
      setError(err?.message || 'Could not send the code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('The two passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email: email.trim(), otp: otp.trim(), newPassword: password });
      setStep(3);
    } catch (err) {
      setError(err?.message || 'Could not reset the password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-[104px] bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl">
        <div className="text-center mb-8">
          <span className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-primary-50 text-primary-600 mb-3 shadow-sm">
            {step === 3 ? <CheckCircle2 size={28} /> : <ShieldCheck size={28} />}
          </span>
          <h1 className="text-2xl font-black text-slate-900">
            {step === 3 ? 'Password updated' : 'Reset password'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {step === 1 && 'Enter your admin email and we will send you a 6-digit code.'}
            {step === 2 && 'Enter the code from your email and choose a new password.'}
            {step === 3 && 'You can now sign in with your new password.'}
          </p>
        </div>

        {info && step === 2 && (
          <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold leading-relaxed">
            {info}
          </div>
        )}
        {error && (
          <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold leading-relaxed">
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={sendCode} className="space-y-4">
            <div>
              <label className={labelCls}>Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send code'} <ArrowRight size={16} />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={resetPassword} className="space-y-4">
            <div>
              <label className={labelCls}>6-digit code</label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className={`${inputCls} tracking-[0.4em] font-bold`}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>New password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">At least 8 characters, with an uppercase letter, a lowercase letter and a number.</p>
            </div>
            <div>
              <label className={labelCls}>Confirm new password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Set new password'} <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={sendCode}
              disabled={loading}
              className="w-full text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Did not get a code? Send it again (you can ask once a minute)
            </button>
          </form>
        )}

        {step === 3 && (
          <Link
            to="/admin/login"
            className="w-full rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            Go to sign in <ArrowRight size={16} />
          </Link>
        )}

        {step !== 3 && (
          <div className="mt-6 text-center">
            <Link to="/admin/login" className="text-xs text-slate-400 hover:text-slate-600 transition">
              ← Back to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}