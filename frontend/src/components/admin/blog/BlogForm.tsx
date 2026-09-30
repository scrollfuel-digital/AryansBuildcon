import React, { useState, useEffect } from 'react';
import { BlogData } from '../types';
import BlogImageUpload from './BlogImageUpload';
import KeywordInput from './KeywordInput';
import SeoFields from './SeoFields';
import BlogEditor from './BlogEditor';
import BlogPreview from './BlogPreview';

import {
  Save,
  Send,
  X,
  Eye,
  Link as LinkIcon,
  RefreshCw,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface BlogFormProps {
  existingBlog?: BlogData | null;
  onSaveSuccess: (blog: BlogData, isUpdate: boolean) => void;
  onCancel: () => void;
  token: string;
  showToast: (msg: string, type?: 'success' | 'error') => void;
  apiCreateBlog: (token: string, formData: FormData) => Promise<any>;
  apiUpdateBlog: (token: string, id: string, formData: FormData) => Promise<any>;
}

export default function BlogForm({
  existingBlog,
  onSaveSuccess,
  onCancel,
  token,
  showToast,
  apiCreateBlog,
  apiUpdateBlog,
}: BlogFormProps) {
  const isEditing = !!existingBlog;

  // Form Field States
  const [title, setTitle] = useState(existingBlog?.title || '');
  const [subtitle, setSubtitle] = useState(existingBlog?.subtitle || '');
  const [slug, setSlug] = useState(existingBlog?.slug || '');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const [metaTitle, setMetaTitle] = useState(existingBlog?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(existingBlog?.metaDescription || '');
  const [keywords, setKeywords] = useState<string[]>(existingBlog?.keywords || []);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string>(existingBlog?.imageUrl || existingBlog?.image || '');

  // HTML Content State (React 19 compatible)
  const [content, setContent] = useState<string>(existingBlog?.content || '');

  const [isPublished, setIsPublished] = useState<boolean>(
    existingBlog ? (existingBlog.isPublished !== undefined ? existingBlog.isPublished : true) : true
  );

  // Validation errors map
  const [errors, setErrors] = useState<Record<string, string>>({});

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Helper slug generator function
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // remove special characters
      .replace(/[\s_-]+/g, '-') // replace spaces & underscores with single hyphen
      .replace(/^-+|-+$/g, ''); // trim hyphens
  };

  // Auto update slug when title changes (unless manually edited by admin)
  useEffect(() => {
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(title));
    }
  }, [title, isSlugManuallyEdited]);

  // Validation handler
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Featured Image
    if (!imageFile && !existingImageUrl) {
      newErrors.image = 'A featured blog image is required.';
    }

    // 2. Title
    if (!title.trim()) {
      newErrors.title = 'Blog main title is required.';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long.';
    }

    // 3. Subtitle
    if (!subtitle.trim()) {
      newErrors.subtitle = 'Blog subtitle/summary is required.';
    }

    // 4. Slug
    if (!slug.trim()) {
      newErrors.slug = 'URL slug is required.';
    }

    // 5. SEO Title
    if (!metaTitle.trim()) {
      newErrors.metaTitle = 'SEO Meta Title is required.';
    } else if (metaTitle.trim().length > 70) {
      newErrors.metaTitle = 'SEO Title must not exceed 70 characters.';
    }

    // 6. SEO Description
    if (!metaDescription.trim()) {
      newErrors.metaDescription = 'SEO Meta Description is required.';
    } else if (metaDescription.trim().length < 40) {
      newErrors.metaDescription = 'SEO Meta Description should be at least 40 characters.';
    }

    // 7. Keywords
    if (keywords.length === 0) {
      newErrors.keywords = 'Please add at least one SEO keyword tag.';
    }

    // 8. Blog Content (HTML check)
    const plainText = content.replace(/<[^>]*>/g, '').trim();
    if (!plainText || plainText === '') {
      newErrors.content = 'Blog content cannot be empty.';
    } else if (plainText.length < 20) {
      newErrors.content = 'Blog content is too short. Write a detailed article.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent, publishStatus: boolean = isPublished) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      showToast('Please fix validation errors before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(isEditing ? 'Updating blog post...' : 'Creating new blog post...');

    try {
      // Create FormData payload as required
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('subtitle', subtitle.trim());
      formData.append('slug', slug.trim());
      formData.append('content', content.trim());
      formData.append('metaTitle', metaTitle.trim());
      formData.append('metaDescription', metaDescription.trim());
      formData.append('keywords', JSON.stringify(keywords));
      formData.append('isPublished', String(publishStatus));

      if (imageFile) {
        formData.append('image', imageFile);
      } else if (existingImageUrl) {
        formData.append('imageUrl', existingImageUrl);
      }

      let resData: any;
      if (isEditing && existingBlog) {
        const blogId = existingBlog._id || existingBlog.id;
        resData = await apiUpdateBlog(token, blogId!, formData);
      } else {
        resData = await apiCreateBlog(token, formData);
      }

      const savedBlog: BlogData = resData.data || resData.blog || {
        _id: resData._id || 'temp-id',
        title,
        subtitle,
        slug,
        content: content.trim(),
        imageUrl: resData.imageUrl || existingImageUrl,
        metaTitle,
        metaDescription,
        keywords,
        isPublished: publishStatus,
      };

      showToast(
        isEditing
          ? 'Blog post updated successfully!'
          : 'New blog post published successfully!'
      );
      onSaveSuccess(savedBlog, isEditing);
    } catch (err: any) {
      console.error('Blog submission error:', err);
      showToast(err?.message || 'Failed to save blog post.', 'error');
    } finally {
      setIsSubmitting(false);
      setSubmitMessage('');
    }
  };

  const previewImageUrl = imageFile
    ? URL.createObjectURL(imageFile)
    : existingImageUrl;

  return (
    <div className="bg-[#0f0d0b] text-gray-100 rounded-2xl border border-gray-800 shadow-2xl p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto font-sans">
      {/* Header Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 border-b border-gray-800 pb-5">
        <div>
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Blog Management System
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-white mt-1">
            {isEditing ? 'Edit Blog Article' : 'Create New Blog Article'}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-850 text-gray-200 border border-gray-700 hover:border-amber-500/50 font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Live Preview</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl transition-colors cursor-pointer"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Main Editorial Content (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Blog Image Upload */}
          <BlogImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            existingImageUrl={existingImageUrl}
            onRemoveImage={() => setExistingImageUrl('')}
            error={errors.image}
          />

          {/* 2. Blog Main Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Blog Main Title <span className="text-amber-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Why Land is the Smartest Long-Term Investment in Nagpur"
              className={`w-full bg-gray-900 border text-base font-medium text-white rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                errors.title ? 'border-red-500' : 'border-gray-700 focus:border-amber-500'
              }`}
            />
            {errors.title && (
              <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.title}
              </p>
            )}
          </div>

          {/* 3. Blog Subtitle / Summary */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Blog Subtitle / Summary <span className="text-amber-500">*</span>
            </label>
            <textarea
              rows={2}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. A practical guide to understanding land investment, location, infrastructure, due diligence and long-term opportunities in Nagpur."
              className={`w-full bg-gray-900 border text-sm text-gray-200 rounded-xl px-4 py-2.5 focus:outline-none transition-colors ${
                errors.subtitle ? 'border-red-500' : 'border-gray-700 focus:border-amber-500'
              }`}
            />
            {errors.subtitle && (
              <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.subtitle}
              </p>
            )}
          </div>

          {/* 4. Blog Rich Text Content */}
          <BlogEditor
            value={content}
            onChange={setContent}
            error={errors.content}
          />
        </div>

        {/* RIGHT COLUMN: Metadata & Settings (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Slug Configuration */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 space-y-3 shadow-sm">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-amber-500" /> URL Slug <span className="text-amber-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsSlugManuallyEdited(false);
                  setSlug(generateSlug(title));
                }}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                title="Regenerate slug from main title"
              >
                <RefreshCw className="w-3 h-3" /> Auto Sync
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setIsSlugManuallyEdited(true);
                  setSlug(e.target.value);
                }}
                placeholder="why-land-is-smartest-long-term-investment-in-nagpur"
                className={`w-full bg-gray-900 border text-xs font-mono text-amber-300 rounded-xl px-4 py-2.5 focus:outline-none transition-colors ${
                  errors.slug ? 'border-red-500' : 'border-gray-700 focus:border-amber-500'
                }`}
              />
            </div>
            <p className="text-[11px] text-gray-400">
              Preview URL: <span className="text-gray-300 font-mono">/blog/{slug || 'your-slug'}</span>
            </p>
            {errors.slug && (
              <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.slug}
              </p>
            )}
          </div>

          {/* Keywords Manager */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 shadow-sm">
            <KeywordInput
              keywords={keywords}
              setKeywords={setKeywords}
              error={errors.keywords}
            />
          </div>

          {/* SEO Meta Titles & Descriptions */}
          <SeoFields
            metaTitle={metaTitle}
            setMetaTitle={setMetaTitle}
            metaDescription={metaDescription}
            setMetaDescription={setMetaDescription}
            metaTitleError={errors.metaTitle}
            metaDescriptionError={errors.metaDescription}
          />

          {/* Status & Publish Options */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider border-b border-gray-800 pb-2">
              Publishing Options
            </h3>

            <div className="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-800">
              <span className="text-xs font-medium text-gray-200">
                Publish Status:{' '}
                <strong className={isPublished ? 'text-green-400' : 'text-amber-400'}>
                  {isPublished ? 'Published (Live)' : 'Draft'}
                </strong>
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* Submit Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={(e) => handleSubmit(e, false)}
                className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>Save Draft</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{submitMessage || 'Saving...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{isEditing ? 'Update Post' : 'Publish Post'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Live Blog Preview Modal */}
      <BlogPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={title}
        subtitle={subtitle}
        contentHtml={content}
        imageUrl={previewImageUrl}
        keywords={keywords}
        metaTitle={metaTitle}
      />
    </div>
  );
}
