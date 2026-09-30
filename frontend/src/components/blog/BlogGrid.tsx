import React from 'react';
import { BlogCard } from './BlogCard';
import { BlogData } from '../../types/blog';

interface BlogGridProps {
  blogs: BlogData[];
  loading?: boolean;
}

export const BlogGrid: React.FC<BlogGridProps> = ({ blogs, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white/40 border border-black/5 rounded-2xl p-5 space-y-4 animate-pulse">
            <div className="h-[220px] bg-black/10 rounded-xl" />
            <div className="h-4 bg-black/10 rounded w-1/3" />
            <div className="h-6 bg-black/10 rounded w-3/4" />
            <div className="h-12 bg-black/10 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="bg-white/40 border border-black/5 rounded-2xl p-12 text-center space-y-3">
        <p className="font-serif text-xl text-charcoal font-light">No articles available</p>
        <p className="font-sans text-xs text-grey">Check back soon for latest real estate market guides and insights.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.slug || blog._id || blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogGrid;
