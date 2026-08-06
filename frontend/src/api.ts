const BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, options);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Request failed');
  return data;
}

function authHeaders(token: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const loginAdmin = (username: string, password: string) =>
  request<{ token: string; admin: { username: string; role: string } }>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

export const signupAdmin = (username: string, password: string, signupSecret: string) =>
  request('/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, signupSecret }),
  });

export const verifyToken = (token: string) =>
  request('/auth/verify', { headers: authHeaders(token) });

// ── Upload ───────────────────────────────────────────────────────────────────
export const uploadProjectImage = async (token: string, file: File): Promise<string> => {
  const form = new FormData();
  form.append('image', file);
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Upload failed');
  return data.imageUrl;
};

// ── Projects ──────────────────────────────────────────────────────────────────
export const fetchProjects = () =>
  request<{ data: any[] }>('/projects');

export const fetchProjectById = (id: string) =>
  request<{ data: any }>(`/projects/${id}`);

export const createProject = (token: string, payload: object) =>
  request('/projects', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });

export const updateProject = (token: string, id: string, payload: object) =>
  request(`/projects/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });

export const deleteProject = (token: string, id: string) =>
  request(`/projects/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });

// ── Inquiries ─────────────────────────────────────────────────────────────────
export const submitInquiry = (payload: {
  name: string;
  email: string;
  phone: string;
  projectTitle: string;
  message: string;
}) =>
  request('/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

export const fetchInquiries = (token: string) =>
  request<{ data: any[] }>('/inquiries', { headers: authHeaders(token) });

export const updateInquiryStatus = (token: string, id: string, status: string) =>
  request(`/inquiries/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify({ status }),
  });

export const deleteInquiry = (token: string, id: string) =>
  request(`/inquiries/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
