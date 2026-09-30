import api from "./axios";
import { BlogData } from "../types/blog";

export const BASE =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "/api";

interface BlogsResponse {
  success: boolean;
  count: number;
  data: BlogData[];
}

interface BlogResponse {
  success: boolean;
  data: BlogData;
  message?: string;
}

function authHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * USER + ADMIN
 * GET all blogs
 */
export const getBlogs = async (): Promise<BlogData[]> => {
  const response = await api.get<BlogsResponse>("/blogs");

  if (!response.data?.success) {
    throw new Error("Failed to fetch blogs");
  }

  return response.data.data || [];
};

export const fetchBlogs = getBlogs;

/**
 * USER + ADMIN
 * GET blog by ID
 */
export const getBlogById = async (id: string): Promise<BlogData> => {
  const response = await api.get<BlogResponse>(`/blogs/${id}`);

  if (!response.data?.success || !response.data?.data) {
    throw new Error("Blog not found");
  }

  return response.data.data;
};

export const fetchBlogById = getBlogById;

/**
 * USER + ADMIN
 * GET blog by slug
 */
export const getBlogBySlug = async (slug: string): Promise<BlogData> => {
  const response = await api.get<BlogResponse>(
    `/blogs/slug/${encodeURIComponent(slug)}`,
  );

  if (!response.data?.success || !response.data?.data) {
    throw new Error("Blog not found");
  }

  return response.data.data;
};

export const fetchBlogBySlug = getBlogBySlug;

/**
 * ADMIN ONLY
 * CREATE blog
 */
export const createBlog = async (token: string, formData: FormData) => {
  const response = await api.post("/blogs", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.data && !response.data.success) {
    throw new Error(response.data.message || "Failed to create blog");
  }

  return response.data;
};

/**
 * ADMIN ONLY
 * UPDATE blog
 */
export const updateBlog = async (
  token: string,
  id: string,
  formData: FormData,
) => {
  const response = await api.put(`/blogs/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.data && !response.data.success) {
    throw new Error(response.data.message || "Failed to update blog");
  }

  return response.data;
};

/**
 * ADMIN ONLY
 * DELETE blog
 */
export const deleteBlog = async (token: string, id: string) => {
  const response = await api.delete(`/blogs/${id}`, {
    headers: authHeaders(token),
  });

  if (response.data && !response.data.success) {
    throw new Error(response.data.message || "Failed to delete blog");
  }

  return response.data;
};
