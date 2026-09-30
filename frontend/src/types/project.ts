export interface ProjectDistance {
  label: string;
  distance: string;
}

export interface ProjectContact {
  office: string;
  phone: string[];
  email: string;
}

export interface Project {
  id: string;
  title: string;
  titleMarathi?: string;
  category: 'Residential' | 'Investment' | 'Highway' | 'Premium';
  location: string;
  area: string;
  scope: string;
  year: string;
  imageUrl: string;
  description: string;
  isFeatured?: boolean;

  // Extended real estate project details
  developer?: string;
  taglines?: string[];
  statusFinance?: string[];
  sanctionStatus?: string;
  totalPlots?: number | string;
  plotAreaText?: string;
  openSpaceArea?: string;
  publicUtilityArea?: string;
  amenities?: string[];
  distances?: ProjectDistance[];
  landmarks?: string[];
  developerContact?: ProjectContact;
  locationQrCode?: string;
  googleMapsUrl?: string;
  galleryImages?: string[];
  layoutMapImages?: string[];
}

export interface ProjectData {
  _id?: string;
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
