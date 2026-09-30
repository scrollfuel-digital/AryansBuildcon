import api from './axios';

function authHeaders(token: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export const loginAdmin = async (username: string, password: string) => {
  const res = await api.post<{ token: string; admin: { username: string; role: string }; success?: boolean; message?: string }>('/auth/login', { username, password });
  if (res.data && 'success' in res.data && !res.data.success) {
    throw new Error(res.data.message || 'Login failed');
  }
  return res.data;
};

export const signupAdmin = async (username: string, password: string, signupSecret: string) => {
  const res = await api.post('/auth/signup', { username, password, signupSecret });
  if (res.data && 'success' in res.data && !res.data.success) {
    throw new Error(res.data.message || 'Signup failed');
  }
  return res.data;
};

export const verifyToken = async (token: string) => {
  const res = await api.get('/auth/verify', { headers: authHeaders(token) });
  if (res.data && 'success' in res.data && !res.data.success) {
    throw new Error(res.data.message || 'Token verification failed');
  }
  return res.data;
};
