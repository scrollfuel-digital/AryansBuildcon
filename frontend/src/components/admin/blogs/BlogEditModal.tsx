import React from 'react';
import BlogForm from './BlogForm';
import { BlogData } from '../../../types/blog';

interface BlogEditModalProps {
  isOpen: boolean;
  blog: BlogData | null;
  onClose: () => void;
  onSuccess: (blog: BlogData) => void;
  token: string;
  showToast: (msg: string, type?: 'success' | 'error') => void;
  apiCreateBlog: (token: string, formData: FormData) => Promise<any>;
  apiUpdateBlog: (token: string, id: string, formData: FormData) => Promise<any>;
}

export const BlogEditModal: React.FC<BlogEditModalProps> = ({
  isOpen,
  blog,
  onClose,
  onSuccess,
  token,
  showToast,
  apiCreateBlog,
  apiUpdateBlog,
}) => {
  if (!isOpen || !blog) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl my-8">
        <BlogForm
          existingBlog={blog}
          token={token}
          showToast={showToast}
          onCancel={onClose}
          onSaveSuccess={(updatedBlog) => {
            onSuccess(updatedBlog);
            onClose();
          }}
          apiCreateBlog={apiCreateBlog}
          apiUpdateBlog={apiUpdateBlog}
        />
      </div>
    </div>
  );
};

export default BlogEditModal;
