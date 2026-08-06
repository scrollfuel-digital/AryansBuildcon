interface AdminStatsProps {
  totalLeads: number;
  newLeads: number;
  scheduledVisits: number;
  totalProjects: number;
}

export default function AdminStats({
  totalLeads,
  newLeads,
  scheduledVisits,
  totalProjects,
}: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[#171411] border border-white/10 rounded-2xl p-5 space-y-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50 block">
          Total Customer Inquiries
        </span>
        <div className="flex items-baseline justify-between">
          <span className="font-serif text-3xl font-light text-cream">{totalLeads}</span>
          <span className="text-xs text-accent-gold font-mono">Form Submissions</span>
        </div>
      </div>

      <div className="bg-[#171411] border border-white/10 rounded-2xl p-5 space-y-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400/80 block">
          New Leads (Action Needed)
        </span>
        <div className="flex items-baseline justify-between">
          <span className="font-serif text-3xl font-light text-amber-300">{newLeads}</span>
          <span className="text-xs text-amber-400 font-mono">Unprocessed</span>
        </div>
      </div>

      <div className="bg-[#171411] border border-white/10 rounded-2xl p-5 space-y-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400/80 block">
          Scheduled Site Visits
        </span>
        <div className="flex items-baseline justify-between">
          <span className="font-serif text-3xl font-light text-emerald-300">{scheduledVisits}</span>
          <span className="text-xs text-emerald-400 font-mono font-medium">VIP Tours</span>
        </div>
      </div>

      <div className="bg-[#171411] border border-white/10 rounded-2xl p-5 space-y-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-gold block">
          Active Layout Projects
        </span>
        <div className="flex items-baseline justify-between">
          <span className="font-serif text-3xl font-light text-cream">{totalProjects}</span>
          <span className="text-xs text-accent-gold font-mono">MongoDB Documents</span>
        </div>
      </div>
    </div>
  );
}
