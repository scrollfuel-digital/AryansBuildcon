import React, { useState, useEffect } from 'react';
import { BlogData } from '../../types/blog';
import BlogTable from '../../components/admin/blogs/BlogTable';
import BlogForm from '../../components/admin/blogs/BlogForm';
import BlogsGrid from '../../components/admin/blog/BlogsGrid';
import AdminLoadingBar from '../../components/admin/AdminLoadingBar';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../../api/blogApi';
import { Plus, LayoutGrid, Table, FileText } from 'lucide-react';

export const AdminBlogsPage: React.FC = () => {
  const [token] = useState<string | null>(localStorage.getItem('adminToken'));
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogData | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading blogs...');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4500);
  };

  useEffect(() => {
    fetchBlogList();
  }, []);

  const fetchBlogList = async () => {
    setIsLoading(true);
    setLoadingMessage('Fetching latest blog articles...');
    try {
      const data = await getBlogs();
      setBlogs(data || []);
    } catch (err: any) {
      showToast(err?.message || 'Failed to connect to blog API', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to delete this blog article?')) return;

    setIsLoading(true);
    setLoadingMessage('Deleting blog post...');
    try {
      await deleteBlog(token, id);
      showToast('Blog article deleted successfully');
      setBlogs((prev) => prev.filter((b) => b._id !== id && b.id !== id));
    } catch (err: any) {
      showToast(err?.message || 'Failed to delete blog', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (blog: BlogData) => {
    setEditingBlog(blog);
    setIsFormOpen(true);
  };

  const handleCreateNew = () => {
    setEditingBlog(null);
    setIsFormOpen(true);
  };

  if (!token) return null;

  return (
    <div className="space-y-6">
      <AdminLoadingBar
        isLoading={isLoading}
        loadingMessage={loadingMessage}
        statusMessage={statusMessage}
        setStatusMessage={setStatusMessage}
      />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-900/80 border border-gray-800 rounded-2xl p-6 shadow-lg">
        <div>
          <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Editorial Content Manager
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-white mt-1">
            Blog Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Create, edit, publish and remove real estate investment articles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-gray-950 border border-gray-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-amber-500 text-black font-semibold' : 'text-gray-400 hover:text-white'
              }`}
              title="Table View"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-amber-500 text-black font-semibold' : 'text-gray-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {!isFormOpen && (
            <button
              onClick={handleCreateNew}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
            >
              <Plus className="w-4 h-4" /> Create Blog
            </button>
          )}
        </div>
      </div>

      {/* Main View / Form Switcher */}
      {isFormOpen ? (
        <BlogForm
          existingBlog={editingBlog}
          token={token}
          showToast={showToast}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingBlog(null);
          }}
          onSaveSuccess={() => {
            setIsFormOpen(false);
            setEditingBlog(null);
            fetchBlogList();
          }}
          apiCreateBlog={createBlog}
          apiUpdateBlog={updateBlog}
        />
      ) : viewMode === 'table' ? (
        <BlogTable blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <BlogsGrid
          blogs={blogs}
          onAddNew={handleCreateNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminBlogsPage;
