import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { BlogData } from '../../types/blog';

interface BlogCardProps {
  blog: BlogData;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const targetId = blog.slug || blog._id || blog.id;
  const imageSrc = blog.imageUrl || blog.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80';
  const formattedDate = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent';

  return (
    <div className="group flex flex-col justify-between bg-white/40 border border-black/5 hover:border-black/10 rounded-2xl p-5 cursor-pointer hover:shadow-xl transition-all duration-500 hover:bg-white">
      <div className="space-y-4">
        {/* Image */}
        <div className="relative h-[220px] w-full rounded-xl overflow-hidden bg-charcoal">
          <img
            src={imageSrc}
            alt={blog.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
          />
          {blog.category && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md py-1 px-3.5 rounded-full font-sans text-[9px] uppercase tracking-[0.14em] text-charcoal font-medium shadow-sm flex items-center gap-1">
              <Tag className="w-3 h-3 !text-[#D4AF37]" />
              {blog.category}
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-grey/60 font-sans text-[10px] uppercase tracking-[0.12em]">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 !text-[#D4AF37]" /> {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl text-charcoal font-bold leading-tight tracking-wide group-hover:text-accent-gold transition-colors duration-300 line-clamp-2">
          {blog.title}
        </h3>

        {/* Short Summary */}
        <p className="font-sans text-sm !text-black/70 font-bold leading-relaxed line-clamp-3">
          {blog.subtitle || blog.metaDescription || blog.description || 'Discover key market insights and expert land investment advice from Aryans Buildcons.'}
        </p>
      </div>

      {/* Read More Link */}
      <Link
        to={`/blog/${targetId}`}
        className="pt-6 mt-6 border-t border-black/5 flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-black font-bold group-hover:text-accent-gold transition-colors duration-300"
      >
        Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  );
};

export default BlogCard;
