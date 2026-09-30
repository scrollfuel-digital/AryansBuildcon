import React from 'react';
import BlogForm from './BlogForm';
import { BlogData } from '../../../types/blog';

interface BlogCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (blog: BlogData) => void;
  token: string;
  showToast: (msg: string, type?: 'success' | 'error') => void;
  apiCreateBlog: (token: string, formData: FormData) => Promise<any>;
  apiUpdateBlog: (token: string, id: string, formData: FormData) => Promise<any>;
}

export const BlogCreateModal: React.FC<BlogCreateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  token,
  showToast,
  apiCreateBlog,
  apiUpdateBlog,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl my-8">
        <BlogForm
          token={token}
          showToast={showToast}
          onCancel={onClose}
          onSaveSuccess={(blog) => {
            onSuccess(blog);
            onClose();
          }}
          apiCreateBlog={apiCreateBlog}
          apiUpdateBlog={apiUpdateBlog}
        />
      </div>
    </div>
  );
};

export default BlogCreateModal;
