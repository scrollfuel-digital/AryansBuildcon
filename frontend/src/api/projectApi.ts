import api from './axios';
import { ProjectData } from '../types/project';

function authHeaders(token: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export const fetchProjects = async (): Promise<{ data: ProjectData[] }> => {
  const res = await api.get('/projects');
  if (res.data && typeof res.data === 'object' && 'success' in res.data && !res.data.success) {
    throw new Error(res.data.message || 'Failed to fetch projects');
  }
  return res.data;
};

export const fetchProjectById = async (id: string): Promise<{ data: ProjectData }> => {
  const res = await api.get(`/projects/${id}`);
  if (res.data && typeof res.data === 'object' && 'success' in res.data && !res.data.success) {
    throw new Error(res.data.message || 'Failed to fetch project');
  }
  return res.data;
};

export const createProject = async (token: string, payload: object) => {
  const res = await api.post('/projects', payload, { headers: authHeaders(token) });
  if (res.data && typeof res.data === 'object' && 'success' in res.data && !res.data.success) {
    throw new Error(res.data.message || 'Failed to create project');
  }
  return res.data;
};

export const updateProject = async (token: string, id: string, payload: object) => {
  const res = await api.put(`/projects/${id}`, payload, { headers: authHeaders(token) });
  if (res.data && typeof res.data === 'object' && 'success' in res.data && !res.data.success) {
    throw new Error(res.data.message || 'Failed to update project');
  }
  return res.data;
};

export const deleteProject = async (token: string, id: string) => {
  const res = await api.delete(`/projects/${id}`, { headers: authHeaders(token) });
  if (res.data && typeof res.data === 'object' && 'success' in res.data && !res.data.success) {
    throw new Error(res.data.message || 'Failed to delete project');
  }
  return res.data;
};

export const uploadProjectImage = async (token: string, file: File): Promise<string> => {
  const form = new FormData();
  form.append('image', file);
  const res = await api.post('/upload', form, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
  });
  if (!res.data.success) throw new Error(res.data.message || 'Upload failed');
  return res.data.imageUrl;
};
