import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0f0d0b] text-white flex">
      {/* Sidebar Navigation */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Content Viewport */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
