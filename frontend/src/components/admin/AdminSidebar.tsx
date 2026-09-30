import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Building2, MessageSquare, LogOut, ShieldCheck } from 'lucide-react';

interface AdminSidebarProps {
  onLogout?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  const navItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Blog Management', path: '/admin/blogs', icon: FileText },
    { label: 'Projects', path: '/admin/projects', icon: Building2 },
    { label: 'Leads & Inquiries', path: '/admin/inquiries', icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-[#14110d] border-r border-gray-800/80 flex flex-col justify-between p-4 shrink-0 min-h-screen text-gray-200 font-sans">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 p-3 bg-gray-900/60 rounded-xl border border-gray-800">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-sm font-semibold text-white tracking-wide">Aryans Buildcon</h1>
            <p className="text-[10px] text-amber-400 uppercase tracking-widest font-mono">Control Panel</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-widest text-gray-500">
            Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="pt-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-semibold transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
