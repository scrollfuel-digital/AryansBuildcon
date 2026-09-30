export * from './blog';
export * from './project';
export * from './auth';

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
