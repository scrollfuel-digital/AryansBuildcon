import { Mail, Building2, BookOpen } from 'lucide-react';

interface AdminTabsProps {
  activeTab: 'inquiries' | 'projects' | 'blogs';
  setActiveTab: (tab: 'inquiries' | 'projects' | 'blogs') => void;
  totalLeads: number;
  totalProjects: number;
  totalBlogs?: number;
}

export default function AdminTabs({
  activeTab,
  setActiveTab,
  totalLeads,
  totalProjects,
  totalBlogs = 0,
}: AdminTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-1">
      <button
        onClick={() => setActiveTab('inquiries')}
        className={`px-6 py-3 rounded-xl font-sans text-xs font-semibold uppercase tracking-[0.15em] flex items-center gap-2 transition-all cursor-pointer ${
          activeTab === 'inquiries'
            ? 'bg-accent-gold text-white shadow-lg'
            : 'text-white/60 hover:text-white bg-white/5'
        }`}
      >
        <Mail className="w-4 h-4" />
        <span>Customer Inquiries ({totalLeads})</span>
      </button>

      <button
        onClick={() => setActiveTab('projects')}
        className={`px-6 py-3 rounded-xl font-sans text-xs font-semibold uppercase tracking-[0.15em] flex items-center gap-2 transition-all cursor-pointer ${
          activeTab === 'projects'
            ? 'bg-accent-gold text-white shadow-lg'
            : 'text-white/60 hover:text-white bg-white/5'
        }`}
      >
        <Building2 className="w-4 h-4" />
        <span>Manage Projects ({totalProjects})</span>
      </button>

      <button
        onClick={() => setActiveTab('blogs')}
        className={`px-6 py-3 rounded-xl font-sans text-xs font-semibold uppercase tracking-[0.15em] flex items-center gap-2 transition-all cursor-pointer ${
          activeTab === 'blogs'
            ? 'bg-accent-gold text-white shadow-lg'
            : 'text-white/60 hover:text-white bg-white/5'
        }`}
      >
        <BookOpen className="w-4 h-4" />
        <span>Manage Blogs ({totalBlogs})</span>
      </button>
    </div>
  );
}

