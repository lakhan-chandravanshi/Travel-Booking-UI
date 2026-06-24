import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../components/AuthLayout.jsx';
import Spinner from '../components/Spinner.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const pwStrength = (() => {
    const p = form.password;
    let s = 0;
    if (p.length >= 6) s += 1;
    if (p.length >= 10) s += 1;
    if (/[0-9]/.test(p) && /[a-zA-Z]/.test(p)) s += 1;
    return s; // 0..3
  })();

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const user = await register(form);
      toast.success(`Welcome aboard, ${user.name.split(' ')[0]}! ✈️`);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const strengthLabel = ['Too short', 'Weak', 'Good', 'Strong'][pwStrength];
  const strengthColor = ['bg-rose-400', 'bg-amber-400', 'bg-lime-400', 'bg-emerald-500'][pwStrength];

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start turning your bookings into smart itineraries."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="label" htmlFor="name">Full name</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              id="name"
              required
              className="input pl-10"
              placeholder="Asha Rao"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        </div>

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
              autoComplete="new-password"
              required
              className="input px-10"
              placeholder="At least 6 characters"
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
          {form.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex h-1.5 flex-1 gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`h-full flex-1 rounded-full transition ${
                      i < pwStrength ? strengthColor : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-slate-400">{strengthLabel}</span>
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn-primary btn-lg w-full">
          {loading ? <Spinner label="Creating account…" /> : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  );
}
