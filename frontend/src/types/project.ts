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
  _id?: string;
  id?: string;
  slug: string;
  name: string;
  address: string;
  title: string;
  titleMarathi?: string;
  mainheading: string;
  buttonText?: string;
  category: string;
  location: string;
  googlelocation: string;
  googledescription: string;
  area: string;
  scope: string;
  year: string;
  imageUrl: string;
  imageAlt?: string;
  description: string;
  isFeatured?: boolean;
  mapsheading: string;
  mapdescription: string;
  // Extended real estate project details
  developer?: string;
  taglines?: string[];
  statusFinance?: string[];
  sanctionStatus?: string;
  totalPlots?: string;
  travelsiteh1: string;
  travelsitedescription: string;
  plotAreaText?: string;
  openSpaceArea?: string;
  publicUtilityArea?: string;
  amenitiesheading: string;
  amenities?: string[];
  distances?: ProjectDistance[];
  landmarks?: string[];
  headinglandmark: string;
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
  status: "Ongoing" | "Completed" | "Upcoming";
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
  status: "Ongoing" | "Completed" | "Upcoming";
  imageUrl: string;
  googleMapsUrl: string;
  sanctionStatus: string;
  description: string;
  features: string;
}
