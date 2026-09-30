import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Inquiry, ProjectData, BlogData } from '../../types';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminStats from '../../components/admin/AdminStats';
import AdminLoadingBar from '../../components/admin/AdminLoadingBar';
import { fetchInquiries } from '../../api/contactApi';
import { fetchProjects } from '../../api/projectApi';
import { getBlogs } from '../../api/blogApi';
import { FileText, Building2, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [token] = useState<string | null>(localStorage.getItem('adminToken'));

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Syncing backend API...');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login', { replace: true });
    } else {
      fetchOverviewData(token);
    }
  }, [token, navigate]);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4500);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const fetchOverviewData = async (authToken: string) => {
    setIsLoading(true);
    setLoadingMessage('Fetching dashboard statistics...');
    try {
      const [inqData, projData, blogData] = await Promise.all([
        fetchInquiries(authToken).catch(() => ({ data: [] })),
        fetchProjects().catch(() => ({ data: [] })),
        getBlogs().catch(() => []),
      ]);

      if (inqData?.data) setInquiries(inqData.data);
      if (projData?.data) setProjects(projData.data);
      if (Array.isArray(blogData)) setBlogs(blogData);
    } catch (err: any) {
      showToast(err?.message || 'Error syncing overview data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const totalLeads = inquiries.length;
  const newLeads = inquiries.filter((i) => i.status === 'New').length;
  const scheduledVisits = inquiries.filter((i) => i.status === 'Site Visit Scheduled').length;

  if (!token) return null;

  return (
    <div className="space-y-8">
      <AdminLoadingBar
        isLoading={isLoading}
        loadingMessage={loadingMessage}
        statusMessage={statusMessage}
        setStatusMessage={setStatusMessage}
      />

      <AdminHeader
        isLoading={isLoading}
        onRefresh={() => fetchOverviewData(token)}
        onLogout={handleLogout}
      />

      {/* Top Statistics Bar */}
      <AdminStats
        totalLeads={totalLeads}
        newLeads={newLeads}
        scheduledVisits={scheduledVisits}
        totalProjects={projects.length}
      />

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Blog Management Card */}
        <Link
          to="/admin/blogs"
          className="bg-gray-900/80 border border-gray-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 group shadow-md flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white font-mono">{blogs.length}</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-white group-hover:text-amber-400 transition-colors">
              Blog Management
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Create, edit, and publish real estate investment guides and market insights.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-800 flex items-center justify-between text-xs font-semibold text-amber-400">
            <span>Manage Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Projects Card */}
        <Link
          to="/admin/projects"
          className="bg-gray-900/80 border border-gray-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 group shadow-md flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white font-mono">{projects.length}</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-white group-hover:text-amber-400 transition-colors">
              Projects Catalogue
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Update residential layout projects, plot availability, images, and pricing.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-800 flex items-center justify-between text-xs font-semibold text-amber-400">
            <span>Manage Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Leads & Inquiries Card */}
        <Link
          to="/admin/inquiries"
          className="bg-gray-900/80 border border-gray-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 group shadow-md flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white font-mono">{totalLeads}</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-white group-hover:text-amber-400 transition-colors">
              Customer Leads
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Review customer contact submissions, update lead statuses, and schedule site visits.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-800 flex items-center justify-between text-xs font-semibold text-amber-400">
            <span>View Leads ({newLeads} New)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Recent Inquiries Preview */}
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif text-lg font-medium text-white">Recent Customer Inquiries</h3>
          </div>
          <Link to="/admin/inquiries" className="text-xs text-amber-400 hover:underline">
            View All ({inquiries.length}) →
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No inquiries received yet.</p>
        ) : (
          <div className="space-y-3">
            {inquiries.slice(0, 4).map((inq) => (
              <div
                key={inq._id || inq.id}
                className="flex items-center justify-between p-3 bg-gray-950 rounded-xl border border-gray-800 text-xs"
              >
                <div>
                  <span className="font-semibold text-gray-200">{inq.name}</span>
                  <span className="text-gray-400 ml-2">({inq.phone})</span>
                  <p className="text-gray-400 font-mono text-[11px] mt-0.5">{inq.projectTitle}</p>
                </div>
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full font-semibold text-[10px]">
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
