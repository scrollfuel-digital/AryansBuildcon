import React, { useState, useEffect } from 'react';
import { ProjectData, ProjectFormState } from '../../types/project';
import ProjectsGrid from '../../components/admin/ProjectsGrid';
import ProjectModal from '../../components/admin/ProjectModal';
import AdminLoadingBar from '../../components/admin/AdminLoadingBar';
import { fetchProjects, createProject, updateProject, deleteProject, uploadProjectImage } from '../../api/projectApi';

export const AdminProjectsPage: React.FC = () => {
  const [token] = useState<string | null>(localStorage.getItem('adminToken'));
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Fetching projects...');
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

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
    features: '',
  });

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4500);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    setLoadingMessage('Fetching latest projects...');
    try {
      const res = await fetchProjects();
      if (res?.data) setProjects(res.data);
    } catch (err: any) {
      showToast(err?.message || 'Failed to fetch projects', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent, imageFile: File | null) => {
    e.preventDefault();
    if (!token) return;

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
        imageUrl = await uploadProjectImage(token, imageFile);
      }

      const payload = {
        ...projectForm,
        imageUrl,
        features: projectForm.features
          .split(',')
          .map((f) => f.trim())
          .filter(Boolean),
      };

      if (isEditing) {
        const projectId = editingProject?._id || editingProject?.id;
        if (!projectId) throw new Error('Project ID missing');
        await updateProject(token, projectId, payload);
      } else {
        await createProject(token, payload);
      }

      showToast(isEditing ? 'Project updated successfully!' : 'New project added!');
      setIsProjectModalOpen(false);
      setEditingProject(null);
      resetProjectForm();
      loadProjects();
    } catch (err: any) {
      showToast(err?.message || 'Failed to save project', 'error');
    } finally {
      setIsLoading(false);
      setIsSavingProject(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Delete this project layout from database?')) return;
    setIsLoading(true);
    setLoadingMessage('Deleting project layout...');
    try {
      await deleteProject(token, id);
      showToast('Project layout deleted successfully');
      setProjects((prev) => prev.filter((p) => p._id !== id && p.id !== id));
    } catch (err: any) {
      showToast(err?.message || 'Failed to delete project', 'error');
    } finally {
      setIsLoading(false);
    }
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
      features: Array.isArray(proj.features) ? proj.features.join(', ') : '',
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
      features: '',
    });
  };

  if (!token) return null;

  return (
    <div className="space-y-6">
      <AdminLoadingBar
        isLoading={isLoading}
        loadingMessage={loadingMessage}
        statusMessage={statusMessage}
        setStatusMessage={setStatusMessage}
      />

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

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        editingProject={editingProject}
        projectForm={projectForm}
        setProjectForm={setProjectForm}
        handleSaveProject={handleSaveProject}
        isSavingProject={isSavingProject}
      />
    </div>
  );
};

export default AdminProjectsPage;
