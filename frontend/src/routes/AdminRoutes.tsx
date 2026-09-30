import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminBlogsPage from '../pages/admin/AdminBlogsPage';
import AdminProjectsPage from '../pages/admin/AdminProjectsPage';
import AdminInquiriesPage from '../pages/admin/AdminInquiriesPage';

export const AdminRoutes: React.FC = () => {
  return (
    <ProtectedRoute>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="blogs" element={<AdminBlogsPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="inquiries" element={<AdminInquiriesPage />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
};

export default AdminRoutes;
