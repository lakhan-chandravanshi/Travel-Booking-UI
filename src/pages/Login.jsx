import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../components/AuthLayout.jsx';
import Spinner from '../components/Spinner.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form);
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () =>
    setForm({ email: 'demo@trrip.app', password: 'demo1234' });

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to access your trips and itineraries."
      footer={
        <>
          New to Trrip?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="label" htmlFor="email">Email</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="input pl-10"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="password">Password</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              id="password"
              type={showPw ? 'text' : 'password'}
              autoComplete="current-password"
              required
              className="input px-10"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary btn-lg w-full">
          {loading ? <Spinner label="Logging in…" /> : 'Log in'}
        </button>
      </form>

      <button
        onClick={fillDemo}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-brand-200 bg-brand-50/50 px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
      >
        <Sparkles className="h-4 w-4" />
        Use demo credentials
      </button>
    </AuthLayout>
  );
}
