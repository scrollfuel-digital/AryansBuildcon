import api from './axios';
import { Inquiry } from '../types/auth';

function authHeaders(token: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export const submitInquiry = async (payload: {
  name: string;
  email: string;
  phone: string;
  projectTitle: string;
  message: string;
}) => {
  const res = await api.post('/inquiries', payload);
  if (res.data && typeof res.data === 'object' && 'success' in res.data && !res.data.success) {
    throw new Error(res.data.message || 'Failed to submit inquiry');
  }
  return res.data;
};

export const fetchInquiries = async (token: string): Promise<{ data: Inquiry[] }> => {
  const res = await api.get('/inquiries', { headers: authHeaders(token) });
  if (res.data && typeof res.data === 'object' && 'success' in res.data && !res.data.success) {
    throw new Error(res.data.message || 'Failed to fetch inquiries');
  }
  return res.data;
};

export const updateInquiryStatus = async (token: string, id: string, status: string) => {
  const res = await api.put(`/inquiries/${id}`, { status }, { headers: authHeaders(token) });
  if (res.data && typeof res.data === 'object' && 'success' in res.data && !res.data.success) {
    throw new Error(res.data.message || 'Failed to update inquiry status');
  }
  return res.data;
};

export const deleteInquiry = async (token: string, id: string) => {
  const res = await api.delete(`/inquiries/${id}`, { headers: authHeaders(token) });
  if (res.data && typeof res.data === 'object' && 'success' in res.data && !res.data.success) {
    throw new Error(res.data.message || 'Failed to delete inquiry');
  }
  return res.data;
};
