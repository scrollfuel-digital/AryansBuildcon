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

export interface ProjectData {
  _id: string;
  id?: string;
  title: string;
  category: string;
  location: string;
  area: string;
  price: string;
  priceUnit: string;
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  imageUrl: string;
  googleMapsUrl?: string;
  sanctionStatus?: string;
  description: string;
  features: string[];
  createdAt?: string;
}

export interface ProjectFormState {
  title: string;
  category: string;
  location: string;
  area: string;
  price: string;
  priceUnit: string;
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  imageUrl: string;
  googleMapsUrl: string;
  sanctionStatus: string;
  description: string;
  features: string;
}
