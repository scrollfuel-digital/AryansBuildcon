import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Bookmark, Share2, Quote, ArrowRight, Tag } from 'lucide-react';
import { BlogData } from '../../types/blog';

interface BlogDetailsProps {
  blog: BlogData;
  relatedBlogs?: BlogData[];
}

export const BlogDetails: React.FC<BlogDetailsProps> = ({ blog, relatedBlogs = [] }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const imageSrc = blog.imageUrl || blog.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80';
  const formattedDate = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent';

  const handleShareClick = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="bg-cream min-h-screen text-charcoal pb-24">
      {/* Immersive Hero Image */}
      <div className="relative h-[50vh] md:h-[118vh] w-full overflow-hidden bg-charcoal">
        <img
          src={imageSrc}
          alt={blog.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/10 to-transparent" />
        
        {/* Navigation Button */}
        <div className="absolute top-20 left-6 md:left-12 lg:left-20 z-20">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 bg-charcoal/85 hover:bg-accent-gold backdrop-blur-md text-white px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-[-300px] relative z-10 space-y-12">
        <div className="bg-[#FAF8F4] border border-black/5 rounded-3xl p-8 md:p-16 shadow-2xl space-y-8">
          
          {/* Metadata Block */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
            <div className="flex items-center gap-3">
              {blog.category && (
                <span className="px-3.5 py-1 bg-accent-gold/10 text-accent-gold rounded-full font-sans text-[10px] font-medium uppercase tracking-[0.16em] flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {blog.category}
                </span>
              )}
              <div className="flex items-center gap-4 text-grey/60 font-sans text-[11px] uppercase tracking-[0.12em]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-accent-gold" /> {formattedDate}
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                title="Bookmark article"
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  bookmarked 
                    ? 'bg-accent-gold text-white border-accent-gold' 
                    : 'bg-white/60 border-black/10 hover:border-black/20 text-grey hover:text-charcoal'
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareClick}
                title="Copy link"
                className="p-2 rounded-full bg-white/60 border border-black/10 hover:border-black/20 text-grey hover:text-charcoal transition-all cursor-pointer flex items-center gap-1"
              >
                <Share2 className="w-4 h-4" />
                {copiedLink && <span className="text-[9px] uppercase tracking-wider pr-1 text-accent-gold font-sans font-semibold">Copied!</span>}
              </button>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl md:text-5xl text-charcoal font-bold leading-tight tracking-wide">
            {blog.title}
          </h1>

          {/* Subtitle / Summary Quote */}
          {blog.subtitle && (
            <p className="font-bold text-charcoal font-serif text-lg md:text-xl  flex items-start gap-3 bg-white/50 border-l-2 border-!text-[#D4AF37] p-6 rounded-r-2xl shadow-sm">
              <Quote className="w-10 h-10 !text-[#D4AF37] shrink-0 mt-[-4px]" />
              "{blog.subtitle}"
            </p>
          )}

          {/* Article HTML Content */}
          <div 
            className="prose prose-lg max-w-none text-black/80 leading-relaxed font-sans font-semibold space-y-6 pt-4 [&>p]:leading-relaxed [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:text-[#D4AF37] [&>h3]:font-semibold [&>h3]:text-xl [&>h3]:text-[#D4AF37]"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Keywords / Tags */}
          {blog.keywords && blog.keywords.length > 0 && (
            <div className="pt-6 border-t border-black/10 flex flex-wrap items-center gap-2">
              <span className="text-xs text-black/50 font-bold uppercase tracking-wider mr-2">Tags:</span>
              {blog.keywords.map((kw, i) => (
                <span key={i} className="px-3 py-1 bg-black/5 text-charcoal rounded-full text-sm font-bold">
                  {kw}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="pt-8 border-t border-black/10 flex flex-wrap justify-between items-center gap-4 text-xs">
            <span className="font-sans font-bold text-[10px] uppercase tracking-[0.15em] text-black/80">
              Published by Aryans Buildcons Research Desk
            </span>
            <span className="font-serif font-bold text-black text-sm">
              Aryans Buildcons Investment @ 2026
            </span>
          </div>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="space-y-6 pt-12">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-light text-charcoal tracking-wide">
                Further <span className="italic text-accent-gold">Insights</span>
              </h3>
              <span className="font-sans text-[10px] text-grey/60 uppercase tracking-[0.2em]">Curated Reading</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedBlogs.map((other) => (
                <Link
                  key={other.slug || other._id || other.id}
                  to={`/blog/${other.slug || other._id || other.id}`}
                  className="group flex flex-col justify-between bg-white border border-black/5 hover:border-black/10 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="space-y-4">
                    <div className="relative h-[180px] w-full rounded-xl overflow-hidden bg-charcoal">
                      <img
                        src={other.imageUrl || other.image}
                        alt={other.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    {other.category && (
                      <span className="text-[9px] uppercase tracking-[0.14em] text-accent-gold font-sans font-semibold">
                        {other.category}
                      </span>
                    )}
                    <h4 className="font-serif text-xl text-charcoal font-light leading-snug group-hover:text-accent-gold transition-colors duration-300">
                      {other.title}
                    </h4>
                  </div>
                  <div className="pt-4 mt-4 border-t border-black/5 flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-charcoal font-medium">
                    Read Guide <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
