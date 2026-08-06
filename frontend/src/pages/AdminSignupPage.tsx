import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, User, Lock, Eye, EyeOff, KeyRound } from 'lucide-react';
import * as api from '../api';

function getPasswordStrength(pw: string): { label: string; color: string; width: string } {
  if (pw.length === 0) return { label: '', color: '', width: '0%' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: 'Weak', color: 'bg-red-500', width: '25%' },
    { label: 'Fair', color: 'bg-orange-400', width: '50%' },
    { label: 'Good', color: 'bg-yellow-400', width: '75%' },
    { label: 'Strong', color: 'bg-green-500', width: '100%' },
  ];
  return map[score - 1] ?? map[0];
}

export default function AdminSignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [signupSecret, setSignupSecret] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const strength = getPasswordStrength(password);
  const passwordsMatch = confirm.length > 0 && password === confirm;
  const passwordsMismatch = confirm.length > 0 && password !== confirm;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (!/[A-Z]/.test(password)) { setError('Password must contain at least one uppercase letter.'); return; }
    if (!/[0-9]/.test(password)) { setError('Password must contain at least one number.'); return; }
    setLoading(true);
    try {
      await api.signupAdmin(username, password, signupSecret);
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/admin/login'), 1500);
    } catch (err: any) {
      setError(err.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#110e0c] flex items-center justify-center p-4 text-white font-sans relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-gold/15 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md bg-[#181512] border border-white/15 rounded-3xl p-8 shadow-2xl z-10"
      >
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex p-3 bg-accent-gold/20 border border-accent-gold/40 rounded-2xl text-accent-gold mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-[#FAF8F4]">
            Aryans Buildcon <br />
            <span className="italic text-accent-gold">Create Admin Account</span>
          </h2>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-950/80 border border-red-500/40 rounded-xl text-red-200 text-xs text-center">{error}</div>
        )}
        {success && (
          <div className="mb-5 p-3 bg-green-950/80 border border-green-500/40 rounded-xl text-green-200 text-xs text-center">{success}</div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-[0.2em] block">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-accent-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                placeholder="3–30 chars, letters/numbers/_"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-[0.2em] block">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-accent-gold rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none transition-all"
                placeholder="Min 8 chars, 1 uppercase, 1 number"
                required
              />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-2.5 text-white/40 hover:text-white/70">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Strength bar */}
            {password.length > 0 && (
              <div className="space-y-1 pt-1">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: strength.width }} />
                </div>
                <p className="text-[10px] text-white/40">Strength: <span className="text-white/70">{strength.label}</span></p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-[0.2em] block">Confirm Password</label>
            <div className="relative">
              <Lock className={`w-4 h-4 absolute left-3.5 top-3 ${passwordsMismatch ? 'text-red-400' : passwordsMatch ? 'text-green-400' : 'text-white/40'}`} />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={`w-full bg-white/5 border rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none transition-all ${passwordsMismatch ? 'border-red-500/60' : passwordsMatch ? 'border-green-500/60' : 'border-white/15 focus:border-accent-gold'}`}
                placeholder="••••••••"
                required
              />
              <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-2.5 text-white/40 hover:text-white/70">
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordsMismatch && <p className="text-[10px] text-red-400">Passwords do not match.</p>}
            {passwordsMatch && <p className="text-[10px] text-green-400">Passwords match.</p>}
          </div>

          {/* Signup Secret */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-[0.2em] block">Signup Secret Key</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              <input
                type="password"
                value={signupSecret}
                onChange={(e) => setSignupSecret(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-accent-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                placeholder="Enter the admin signup secret"
                required
              />
            </div>
            <p className="text-[10px] text-white/30">Contact your system administrator for this key.</p>
          </div>

          <button
            type="submit"
            disabled={loading || passwordsMismatch}
            className="w-full bg-accent-gold hover:bg-accent-dark-gold text-white text-xs font-semibold uppercase tracking-[0.18em] py-3.5 rounded-xl transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating Account...</>
            ) : (
              <><ShieldCheck className="w-3.5 h-3.5" /> Create Account</>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] text-white/40">
            Already have an account?{' '}
            <Link to="/admin/login" className="text-accent-gold hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
