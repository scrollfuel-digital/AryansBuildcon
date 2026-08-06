import { Building2, RefreshCw, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  isLoading: boolean;
  onRefresh: () => void;
  onLogout: () => void;
}

export default function AdminHeader({ isLoading, onRefresh, onLogout }: AdminHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#171411] border border-white/10 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-accent-gold/20 border border-accent-gold/40 rounded-2xl text-accent-gold">
          <Building2 className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-accent-gold uppercase tracking-[0.2em]">
              ✦ Live Express & MongoDB Control Center
            </span>
            <span className="text-[9px] bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
              Online
            </span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-light text-cream">
            Aryans Buildcon Admin Dashboard
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onRefresh}
          className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white/80 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-accent-gold' : ''}`} />
          <span>Refresh</span>
        </button>

        <button
          onClick={onLogout}
          className="px-4 py-2.5 bg-red-950/60 hover:bg-red-900/80 border border-red-500/30 text-red-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
