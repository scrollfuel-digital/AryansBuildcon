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

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
  image: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  imageUrl: string;
}

export interface StudioLocation {
  city: string;
  address: string;
  phone: string;
  email: string;
  timezone?: string;
}
