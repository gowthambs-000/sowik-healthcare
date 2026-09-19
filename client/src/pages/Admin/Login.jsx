import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) { setError('Invalid credentials. Please try again.'); }
    setLoading(false);
  };

  return (
    <div className="pt-[104px] min-h-screen grid place-items-center bg-gradient-to-br from-primary-50 to-care-50 px-4">
      <div className="card w-full max-w-md !p-8">
        <h1 className="text-2xl font-extrabold text-slate-800 text-center">Admin Login</h1>
        <p className="text-sm text-slate-400 text-center mt-1">Sowik Home Health Care Dashboard</p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div className="relative">
            <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="email" required placeholder="Email address" className="input !pl-11" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="relative">
            <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="password" required placeholder="Password" className="input !pl-11" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 rounded-xl p-3">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">{loading ? 'Signing in…' : 'Sign In'}</button>
        </form>
      </div>
    </div>
  );
}