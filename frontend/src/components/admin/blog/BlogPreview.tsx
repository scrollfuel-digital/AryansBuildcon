import React from 'react';
import { X, Calendar, Clock, Tag, Share2, Bookmark, Eye } from 'lucide-react';

interface BlogPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  contentHtml: string;
  imageUrl?: string | null;
  keywords: string[];
  metaTitle?: string;
}

export default function BlogPreview({
  isOpen,
  onClose,
  title,
  subtitle,
  contentHtml,
  imageUrl,
  keywords,
}: BlogPreviewProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fadeIn">
      <div className="bg-[#FAF8F4] text-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-500/30 relative">
        {/* Modal Floating Bar Header */}
        <div className="sticky top-0 z-30 bg-[#FAF8F4]/90 backdrop-blur-md px-6 py-4 border-b border-black/10 flex justify-between items-center">
          <div className="flex items-center gap-2 text-amber-700 font-sans text-xs uppercase tracking-widest font-semibold">
            <Eye className="w-4 h-4 text-amber-600" />
            <span>Public Website Preview Mode</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-black/5 hover:bg-black/10 text-gray-700 hover:text-black rounded-full transition-colors cursor-pointer"
            title="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Public Article Layout Reproduction */}
        <div className="p-6 md:p-12 space-y-8 font-sans">
          {/* Featured Image */}
          {imageUrl ? (
            <div className="relative h-[300px] md:h-[420px] w-full rounded-2xl overflow-hidden shadow-lg bg-gray-900">
              <img
                src={imageUrl}
                alt={title || 'Blog Preview'}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-48 w-full bg-amber-900/10 rounded-2xl border border-dashed border-amber-600/30 flex items-center justify-center text-amber-700 text-sm italic">
              No featured image uploaded yet
            </div>
          )}

          {/* Article Header Card */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 bg-amber-600/10 text-amber-700 font-semibold rounded-full text-[11px] uppercase tracking-wider">
                  Real Estate Insight
                </span>
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" /> Today
                </span>
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> 5 min read
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <Bookmark className="w-4 h-4 cursor-pointer hover:text-amber-700" />
                <Share2 className="w-4 h-4 cursor-pointer hover:text-amber-700" />
              </div>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl text-gray-900 font-bold leading-tight">
              {title || 'Untitled Blog Post'}
            </h1>

            {/* Subtitle / Summary */}
            {subtitle && (
              <p className="text-base md:text-lg text-gray-700 font-serif italic border-l-2 border-amber-600 pl-4 py-1 bg-amber-500/5 rounded-r-lg">
                "{subtitle}"
              </p>
            )}

            {/* Keywords Chips */}
            {keywords.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Tag className="w-3.5 h-3.5 text-amber-700" />
                {keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 bg-gray-200 text-gray-800 rounded-md text-[11px] font-medium"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Main Article Content Body */}
          <div className="border-t border-black/10 pt-8">
            <div
              className="prose max-w-none text-gray-800 text-base leading-relaxed space-y-4
                [&_h1]:font-serif [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-4
                [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:my-4
                [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:my-3
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4
                [&_blockquote]:border-l-4 [&_blockquote]:border-amber-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-gray-700
                [&_a]:text-amber-700 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: contentHtml || '<p class="italic text-gray-400">Blog content is empty...</p>' }}
            />
          </div>

          {/* Footer Note */}
          <div className="pt-8 border-t border-black/10 flex justify-between items-center text-xs text-gray-500">
            <span>Published by Aryans Buildcons Research Desk</span>
            <span>Aryans Buildcons © 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
