import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, User, Lock } from 'lucide-react';

interface AdminLoginProps {
  loginUsername: string;
  setLoginUsername: (username: string) => void;
  loginPassword: string;
  setLoginPassword: (password: string) => void;
  authError: string;
  isAuthenticating: boolean;
  handleLogin: (e: React.FormEvent) => void;
}

export default function AdminLogin({
  loginUsername,
  setLoginUsername,
  loginPassword,
  setLoginPassword,
  authError,
  isAuthenticating,
  handleLogin,
}: AdminLoginProps) {
  return (
    <div className="min-h-screen bg-[#110e0c] flex items-center justify-center p-4 text-white font-sans relative overflow-hidden">
      {/* Glow ambient */}
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
            <span className="italic text-accent-gold">Admin Portal</span>
          </h2>
          <p className="text-xs text-white/60 font-light">
            Full-Stack Control Panel with Express, MongoDB & JWT Auth
          </p>
        </div>

        {authError && (
          <div className="mb-6 p-3 bg-red-950/80 border border-red-500/40 rounded-xl text-red-200 text-xs text-center font-sans">
            {authError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-[0.2em] block">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-accent-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-[0.2em] block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-accent-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full bg-accent-gold hover:bg-accent-dark-gold text-white font-sans text-xs font-semibold uppercase tracking-[0.18em] py-3.5 rounded-xl transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {isAuthenticating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying Credentials...
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                Authenticate Admin
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] text-white/40 font-mono">
            Default Credentials: <span className="text-accent-gold">admin</span> / <span className="text-accent-gold">admin123</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
