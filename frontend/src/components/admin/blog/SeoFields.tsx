import React from 'react';
import { Search, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SeoFieldsProps {
  metaTitle: string;
  setMetaTitle: (val: string) => void;
  metaDescription: string;
  setMetaDescription: (val: string) => void;
  metaTitleError?: string;
  metaDescriptionError?: string;
}

export default function SeoFields({
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  metaTitleError,
  metaDescriptionError,
}: SeoFieldsProps) {
  const metaTitleLength = metaTitle.length;
  const metaDescLength = metaDescription.length;

  const isMetaTitleRecommended = metaTitleLength >= 40 && metaTitleLength <= 60;
  const isMetaTitleTooLong = metaTitleLength > 70;

  const isMetaDescRecommended = metaDescLength >= 120 && metaDescLength <= 200;
  const isMetaDescTooLong = metaDescLength > 200;

  return (
    <div className="space-y-5 bg-gray-900/60 border border-gray-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
        <Search className="w-4 h-4 text-amber-500" />
        <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
          Search Engine Optimization (SEO)
        </h3>
      </div>

      {/* SEO Meta Title */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <label className="font-semibold text-gray-300 uppercase tracking-wider">
            SEO Meta Title <span className="text-amber-500">*</span>
          </label>
          <span
            className={`font-mono text-[11px] ${
              isMetaTitleTooLong
                ? 'text-red-400 font-bold'
                : isMetaTitleRecommended
                ? 'text-green-400 font-semibold'
                : 'text-gray-400'
            }`}
          >
            {metaTitleLength} / 60 chars (max 70)
          </span>
        </div>

        <input
          type="text"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          placeholder="e.g. Why Land is the Smartest Long-Term Investment in Nagpur"
          className={`w-full bg-gray-900 border text-sm text-gray-100 rounded-xl px-4 py-2.5 focus:outline-none transition-colors ${
            isMetaTitleTooLong || metaTitleError
              ? 'border-red-500 focus:border-red-400'
              : isMetaTitleRecommended
              ? 'border-green-500/50 focus:border-green-400'
              : 'border-gray-700 focus:border-amber-500'
          }`}
        />

        <div className="flex justify-between items-center text-[11px] pt-0.5">
          <span className="text-gray-400 flex items-center gap-1">
            {isMetaTitleRecommended ? (
              <span className="text-green-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" /> Ideal SEO length for Google results
              </span>
            ) : isMetaTitleTooLong ? (
              <span className="text-red-400 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> Title exceeds 70 characters and may get truncated in search results
              </span>
            ) : (
              'Recommended length: 50 – 60 characters'
            )}
          </span>
        </div>

        {metaTitleError && (
          <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {metaTitleError}
          </p>
        )}
      </div>

      {/* SEO Meta Description */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <label className="font-semibold text-gray-300 uppercase tracking-wider">
            SEO Meta Description <span className="text-amber-500">*</span>
          </label>
          <span
            className={`font-mono text-[11px] ${
              isMetaDescTooLong
                ? 'text-red-400 font-bold'
                : isMetaDescRecommended
                ? 'text-green-400 font-semibold'
                : 'text-gray-400'
            }`}
          >
            {metaDescLength} / 200 chars
          </span>
        </div>

        <textarea
          rows={3}
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="e.g. Explore why land investment in Nagpur is attracting long-term buyers. Learn about plots, infrastructure, location, due diligence and future investment considerations."
          className={`w-full bg-gray-900 border text-sm text-gray-100 rounded-xl px-4 py-2.5 focus:outline-none transition-colors ${
            isMetaDescTooLong || metaDescriptionError
              ? 'border-red-500 focus:border-red-400'
              : isMetaDescRecommended
              ? 'border-green-500/50 focus:border-green-400'
              : 'border-gray-700 focus:border-amber-500'
          }`}
        />

        <div className="flex justify-between items-center text-[11px] pt-0.5">
          <span className="text-gray-400">
            {isMetaDescRecommended ? (
              <span className="text-green-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" /> Optimal description length for search snippets
              </span>
            ) : isMetaDescTooLong ? (
              <span className="text-red-400 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> Exceeds 200 characters
              </span>
            ) : (
              'Recommended length: 120 – 200 characters'
            )}
          </span>
        </div>

        {metaDescriptionError && (
          <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {metaDescriptionError}
          </p>
        )}
      </div>
    </div>
  );
}
