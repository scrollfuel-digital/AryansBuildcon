import React from 'react';
import { BlogData } from '../../../types/blog';
import { Edit2, Trash2, ExternalLink, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogTableProps {
  blogs: BlogData[];
  onEdit: (blog: BlogData) => void;
  onDelete: (id: string) => void;
}

export const BlogTable: React.FC<BlogTableProps> = ({ blogs, onEdit, onDelete }) => {
  if (blogs.length === 0) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-12 text-center text-gray-400 text-sm">
        No blogs found.
      </div>
    );
  }

  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-300">
          <thead className="bg-gray-950 text-gray-400 uppercase tracking-wider font-semibold border-b border-gray-800">
            <tr>
              <th className="py-4 px-6">Blog Article</th>
              <th className="py-4 px-6">Category / Tags</th>
              <th className="py-4 px-6">Created Date</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/80">
            {blogs.map((blog) => {
              const id = blog._id || blog.id || '';
              const dateStr = blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString('en-GB')
                : 'N/A';

              return (
                <tr key={id || blog.slug} className="hover:bg-gray-800/40 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">
                    <div className="flex items-center gap-3">
                      {blog.imageUrl && (
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-950 shrink-0 border border-gray-800"
                        />
                      )}
                      <div>
                        <div className="font-semibold text-sm text-gray-100 line-clamp-1">{blog.title}</div>
                        <div className="text-gray-400 font-mono text-[11px]">/blog/{blog.slug || 'no-slug'}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {blog.category && (
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded border border-amber-500/20 font-medium">
                          {blog.category}
                        </span>
                      )}
                      {blog.keywords && blog.keywords.slice(0, 2).map((kw, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded font-mono">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap text-gray-400">{dateStr}</td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        blog.isPublished ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/blog/${blog.slug || id}`}
                        target="_blank"
                        className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                        title="View Live"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => onEdit(blog)}
                        className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogTable;
