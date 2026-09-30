import React, { useState } from 'react';
import { BlogData } from '../types';
import { Plus, Edit2, Trash2, Search, ExternalLink, Calendar, Tag, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogsGridProps {
  blogs: BlogData[];
  onAddNew: () => void;
  onEdit: (blog: BlogData) => void;
  onDelete: (id: string) => void;
}

export default function BlogsGrid({
  blogs,
  onAddNew,
  onEdit,
  onDelete,
}: BlogsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Published' | 'Draft'>('All');

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filterStatus === 'Published') return matchesSearch && blog.isPublished;
    if (filterStatus === 'Draft') return matchesSearch && !blog.isPublished;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Bar: Search, Filters, and Add New Blog Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-900/80 border border-gray-800 rounded-2xl p-4 shadow-md">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs by title, slug, or keywords..."
            className="w-full bg-gray-950 border border-gray-800 text-xs text-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center bg-gray-950 border border-gray-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setFilterStatus('All')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filterStatus === 'All' ? 'bg-amber-500 text-black font-semibold' : 'text-gray-400 hover:text-white'
              }`}
            >
              All ({blogs.length})
            </button>
            <button
              onClick={() => setFilterStatus('Published')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filterStatus === 'Published' ? 'bg-amber-500 text-black font-semibold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setFilterStatus('Draft')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filterStatus === 'Draft' ? 'bg-amber-500 text-black font-semibold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Drafts
            </button>
          </div>

          <button
            onClick={onAddNew}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10 shrink-0"
          >
            <Plus className="w-4 h-4" /> Create Blog
          </button>
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-12 text-center space-y-3">
          <p className="text-gray-400 text-sm italic">
            {blogs.length === 0
              ? 'No blog posts created yet. Click "Create Blog" to publish your first article!'
              : 'No blogs match your search query.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id || blog.id || blog.slug}
              className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group shadow-md"
            >
              <div>
                {/* Featured Image */}
                <div className="relative h-48 w-full bg-gray-950 overflow-hidden">
                  {blog.imageUrl ? (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs italic">
                      No Image Provided
                    </div>
                  )}

                  {/* Status Badge */}
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
                      blog.isPublished
                        ? 'bg-green-500/90 text-black'
                        : 'bg-amber-500/90 text-black'
                    }`}
                  >
                    {blog.isPublished ? 'Live' : 'Draft'}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-serif text-lg font-medium text-white line-clamp-2 leading-snug group-hover:text-amber-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {blog.subtitle || blog.metaDescription}
                  </p>

                  {/* Keywords */}
                  {blog.keywords && blog.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {blog.keywords.slice(0, 3).map((kw, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-gray-800 text-amber-300 text-[10px] rounded border border-gray-700 font-mono"
                        >
                          #{kw}
                        </span>
                      ))}
                      {blog.keywords.length > 3 && (
                        <span className="text-[10px] text-gray-500">
                          +{blog.keywords.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 border-t border-gray-800/80 bg-gray-950/60 flex items-center justify-between text-xs">
                <Link
                  to={`/blog/${blog.slug}`}
                  target="_blank"
                  className="text-gray-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Article
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(blog)}
                    className="p-2 bg-gray-800 hover:bg-amber-500/20 text-gray-300 hover:text-amber-400 rounded-lg border border-gray-700 transition-colors cursor-pointer"
                    title="Edit Blog"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(blog._id || blog.id || '')}
                    className="p-2 bg-gray-800 hover:bg-red-500/20 text-gray-300 hover:text-red-400 rounded-lg border border-gray-700 transition-colors cursor-pointer"
                    title="Delete Blog"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
