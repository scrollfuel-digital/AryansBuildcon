import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Inquiry,
  ProjectData,
  ProjectFormState,
} from '../components/admin/types';

import AdminHeader from '../components/admin/AdminHeader';
import AdminStats from '../components/admin/AdminStats';
import AdminTabs from '../components/admin/AdminTabs';
import InquiriesTable from '../components/admin/InquiriesTable';
import ProjectsGrid from '../components/admin/ProjectsGrid';
import ProjectModal from '../components/admin/ProjectModal';
import AdminLoadingBar from '../components/admin/AdminLoadingBar';
import * as api from '../api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [token] = useState<string | null>(localStorage.getItem('adminToken'));

  // Redirect to login if no token
  useEffect(() => {
    if (!token) navigate('/admin/login', { replace: true });
  }, [token, navigate]);

  const [activeTab, setActiveTab] = useState<'inquiries' | 'projects'>('inquiries');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('Syncing backend API...');
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [projectForm, setProjectForm] = useState<ProjectFormState>({
    title: '',
    category: 'Residential Layout',
    location: '',
    area: '',
    price: '',
    priceUnit: 'Lakhs onwards',
    status: 'Ongoing',
    imageUrl: '',
    googleMapsUrl: '',
    sanctionStatus: 'NATP SANCTIONED',
    description: '',
    features: ''
  });

  useEffect(() => {
    if (token) fetchData(token);
  }, [token]);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4500);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const fetchData = async (authToken: string) => {
    setIsLoading(true);
    setLoadingMessage('Fetching latest inquiries & projects...');
    try {
      const [inqData, projData] = await Promise.all([
        api.fetchInquiries(authToken),
        api.fetchProjects(),
      ]) as any[];
      if (inqData?.data) setInquiries(inqData.data);
      if (projData?.data) setProjects(projData.data);
    } catch (err: any) {
      showToast(err?.message || 'Network error while connecting to backend API', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateInquiryStatus = (id: string, newStatus: string) => {
    setIsLoading(true);
    setLoadingMessage(`Updating lead status to ${newStatus}...`);
    api.updateInquiryStatus(token!, id, newStatus)
      .then(() => {
        showToast(`Inquiry status changed to ${newStatus}`);
        setInquiries((prev) => prev.map((item) => (item._id === id || item.id === id ? { ...item, status: newStatus as any } : item)));
      })
      .catch((err: any) => showToast(err?.message || 'Failed to update status', 'error'))
      .finally(() => setIsLoading(false));
  };

  const handleDeleteInquiry = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead record?')) return;
    setIsLoading(true);
    setLoadingMessage('Deleting inquiry record...');
    api.deleteInquiry(token!, id)
      .then(() => {
        showToast('Lead record deleted');
        setInquiries((prev) => prev.filter((item) => item._id !== id && item.id !== id));
      })
      .catch((err: any) => showToast(err?.message || 'Failed to delete inquiry', 'error'))
      .finally(() => setIsLoading(false));
  };

  const handleSaveProject = async (e: React.FormEvent, imageFile: File | null) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.location) {
      showToast('Please fill in title and location.', 'error');
      return;
    }
    const isEditing = !!editingProject;
    setIsLoading(true);
    setIsSavingProject(true);
    setLoadingMessage(isEditing ? 'Updating project layout...' : 'Creating new project layout...');
    try {
      let imageUrl = projectForm.imageUrl;
      if (imageFile) {
        setLoadingMessage('Uploading image...');
        imageUrl = await api.uploadProjectImage(token!, imageFile);
      }
      const payload = {
        ...projectForm,
        imageUrl,
        features: projectForm.features.split(',').map((f) => f.trim()).filter(Boolean)
      };
      if (isEditing) {
        await api.updateProject(token!, editingProject._id || editingProject.id, payload);
      } else {
        await api.createProject(token!, payload);
      }
      showToast(isEditing ? 'Project layout updated successfully!' : 'New project layout added!');
      setIsProjectModalOpen(false);
      setEditingProject(null);
      resetProjectForm();
      if (token) fetchData(token);
    } catch (err: any) {
      showToast(err?.message || 'Failed to save project', 'error');
    } finally {
      setIsLoading(false);
      setIsSavingProject(false);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (!window.confirm('Delete this project layout from database?')) return;
    setIsLoading(true);
    setLoadingMessage('Deleting project layout...');
    api.deleteProject(token!, id)
      .then(() => {
        showToast('Project layout deleted successfully');
        setProjects((prev) => prev.filter((p) => p._id !== id && p.id !== id));
      })
      .catch((err: any) => showToast(err?.message || 'Failed to delete project', 'error'))
      .finally(() => setIsLoading(false));
  };

  const openEditProjectModal = (proj: ProjectData) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title || '',
      category: proj.category || 'Residential Layout',
      location: proj.location || '',
      area: proj.area || '',
      price: proj.price || '',
      priceUnit: proj.priceUnit || 'Lakhs onwards',
      status: proj.status || 'Ongoing',
      imageUrl: proj.imageUrl || '',
      googleMapsUrl: proj.googleMapsUrl || '',
      sanctionStatus: proj.sanctionStatus || 'NATP SANCTIONED',
      description: proj.description || '',
      features: Array.isArray(proj.features) ? proj.features.join(', ') : ''
    });
    setIsProjectModalOpen(true);
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      category: 'Residential Layout',
      location: '',
      area: '',
      price: '',
      priceUnit: 'Lakhs onwards',
      status: 'Ongoing',
      imageUrl: '',
      googleMapsUrl: '',
      sanctionStatus: 'NATP SANCTIONED',
      description: '',
      features: ''
    });
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['Date', 'Name', 'Phone', 'Email', 'Project/Location', 'Status', 'Message'];
    const rows = inquiries.map((i) => [
      new Date(i.createdAt).toLocaleDateString(),
      `"${i.name}"`,
      `"${i.phone}"`,
      `"${i.email}"`,
      `"${i.projectTitle}"`,
      `"${i.status}"`,
      `"${i.message.replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `aryans_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalLeads = inquiries.length;
  const newLeads = inquiries.filter((i) => i.status === 'New').length;
  const scheduledVisits = inquiries.filter((i) => i.status === 'Site Visit Scheduled').length;

  if (!token) return null;

  return (
    <div className="min-h-screen bg-[#0f0d0b] text-white font-sans pt-24 pb-16 px-4 md:px-8 relative">
      <AdminLoadingBar
        isLoading={isLoading}
        loadingMessage={loadingMessage}
        statusMessage={statusMessage}
        setStatusMessage={setStatusMessage}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        <AdminHeader
          isLoading={isLoading}
          onRefresh={() => fetchData(token)}
          onLogout={handleLogout}
        />

        <AdminStats
          totalLeads={totalLeads}
          newLeads={newLeads}
          scheduledVisits={scheduledVisits}
          totalProjects={projects.length}
        />

        <AdminTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          totalLeads={totalLeads}
          totalProjects={projects.length}
        />

        {activeTab === 'inquiries' && (
          <InquiriesTable
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            filteredInquiries={filteredInquiries}
            handleExportCSV={handleExportCSV}
            handleUpdateInquiryStatus={handleUpdateInquiryStatus}
            handleDeleteInquiry={handleDeleteInquiry}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsGrid
            projects={projects}
            onAddNew={() => {
              setEditingProject(null);
              resetProjectForm();
              setIsProjectModalOpen(true);
            }}
            onEdit={openEditProjectModal}
            onDelete={handleDeleteProject}
          />
        )}
      </div>

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => { setIsProjectModalOpen(false); }}
        editingProject={editingProject}
        projectForm={projectForm}
        setProjectForm={setProjectForm}
        handleSaveProject={handleSaveProject}
        isSavingProject={isSavingProject}
      />
    </div>
  );
}
