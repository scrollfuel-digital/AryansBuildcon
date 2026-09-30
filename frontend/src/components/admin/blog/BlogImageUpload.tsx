import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface BlogImageUploadProps {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  existingImageUrl?: string;
  onRemoveImage?: () => void;
  error?: string;
}

export default function BlogImageUpload({
  imageFile,
  setImageFile,
  existingImageUrl,
  onRemoveImage,
  error,
}: BlogImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const previewUrl = imageFile
    ? URL.createObjectURL(imageFile)
    : existingImageUrl || null;

  const validateAndSelectFile = (file: File) => {
    setFileError(null);
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setFileError('Invalid file type. Please upload a JPG, JPEG, PNG, or WEBP image.');
      return;
    }
    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size too large. Maximum allowed size is 10MB.');
      return;
    }
    setImageFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setImageFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onRemoveImage) onRemoveImage();
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
        Blog Featured Image <span className="text-amber-500">*</span>
      </label>

      {previewUrl ? (
        <div className="relative rounded-xl border border-gray-700 bg-gray-900/60 overflow-hidden group shadow-lg">
          <img
            src={previewUrl}
            alt="Blog Featured Preview"
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-amber-500 text-black font-semibold text-xs rounded-lg hover:bg-amber-400 transition-colors shadow-md cursor-pointer"
            >
              Replace Image
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 bg-red-600 text-white font-semibold text-xs rounded-lg hover:bg-red-500 transition-colors shadow-md cursor-pointer flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
          <div className="p-3 bg-gray-950/80 backdrop-blur-sm border-t border-gray-800 flex justify-between items-center text-xs text-gray-400">
            <span className="truncate max-w-[70%]">
              {imageFile ? imageFile.name : 'Existing featured image'}
            </span>
            {imageFile && (
              <span className="text-gray-500">
                {(imageFile.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            )}
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
            isDragging
              ? 'border-amber-500 bg-amber-500/10 scale-[1.01]'
              : 'border-gray-700 hover:border-amber-500/60 bg-gray-900/40 hover:bg-gray-900/80'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Upload className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-200">
              <span className="text-amber-400 underline font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">
              Supports High-Res JPG, JPEG, PNG, or WEBP (Max 10MB)
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {(error || fileError) && (
        <div className="flex items-center gap-1.5 text-red-400 text-xs mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error || fileError}</span>
        </div>
      )}
    </div>
  );
}
