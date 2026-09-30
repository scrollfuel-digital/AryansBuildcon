export interface AdminUser {
  username: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  admin: AdminUser;
}

export interface Inquiry {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  projectTitle: string;
  message: string;
  status: 'New' | 'Contacted' | 'Site Visit Scheduled' | 'Closed';
  createdAt: string;
}
