export interface BlogData {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  slug?: string;
  content: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  isPublished?: boolean;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogFilterOptions {
  category?: string;
  search?: string;
  isPublished?: boolean;
}
