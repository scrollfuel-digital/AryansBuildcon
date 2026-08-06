import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, UploadCloud } from 'lucide-react';
import { ProjectData, ProjectFormState } from './types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProject: ProjectData | null;
  projectForm: ProjectFormState;
  setProjectForm: React.Dispatch<React.SetStateAction<ProjectFormState>>;
  handleSaveProject: (e: React.FormEvent, imageFile: File | null) => void;
  isSavingProject: boolean;
}

export default function ProjectModal({
  isOpen,
  onClose,
  editingProject,
  projectForm,
  setProjectForm,
  handleSaveProject,
  isSavingProject,
}: ProjectModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleClose = () => {
    setImageFile(null);
    setPreviewUrl(null);
    onClose();
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setProjectForm({ ...projectForm, imageUrl: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-[#171411] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif text-xl font-light text-cream">
                {editingProject ? 'Edit Layout Project' : 'Add New Layout Project'}
              </h3>
              <button
                onClick={handleClose}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white/80 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => handleSaveProject(e, imageFile)} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-wider block">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. Govindraj Nagari"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-gold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-wider block">
                    Category
                  </label>
                  <input
                    type="text"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    placeholder="e.g. Residential Layout"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-gold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-wider block">
                  Location Address *
                </label>
                <input
                  type="text"
                  value={projectForm.location}
                  onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                  placeholder="e.g. Mouza-Tamaswadi, Wardha Road, Nagpur"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-gold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-wider block">
                    Plot Area / Total Plots
                  </label>
                  <input
                    type="text"
                    value={projectForm.area}
                    onChange={(e) => setProjectForm({ ...projectForm, area: e.target.value })}
                    placeholder="e.g. 97 Plots | 23,856 SQ.M."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-wider block">
                    Starting Price
                  </label>
                  <input
                    type="text"
                    value={projectForm.price}
                    onChange={(e) => setProjectForm({ ...projectForm, price: e.target.value })}
                    placeholder="e.g. 22.5"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-wider block">
                    Status
                  </label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-gold cursor-pointer"
                  >
                    <option value="Ongoing" className="bg-[#171411]">Ongoing</option>
                    <option value="Completed" className="bg-[#171411]">Completed</option>
                    <option value="Upcoming" className="bg-[#171411]">Upcoming</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-wider block">
                  Project Image
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border border-dashed border-white/20 hover:border-accent-gold rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  {previewUrl || projectForm.imageUrl ? (
                    <img
                      src={previewUrl || projectForm.imageUrl}
                      alt="preview"
                      className="h-36 w-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <UploadCloud className="w-7 h-7 text-white/40" />
                      <span className="text-white/40 text-[11px]">Click to upload image (max 5MB)</span>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {(previewUrl || projectForm.imageUrl) && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="text-[10px] text-red-400 hover:text-red-300 mt-1"
                  >
                    Remove image
                  </button>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-wider block">
                  Layout Sanction Status
                </label>
                <input
                  type="text"
                  value={projectForm.sanctionStatus}
                  onChange={(e) => setProjectForm({ ...projectForm, sanctionStatus: e.target.value })}
                  placeholder="e.g. NATP & NMRDA SANCTIONED"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-wider block">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Provide overview of the layout, distance from highway, bank loans..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-gold resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-accent-gold uppercase tracking-wider block">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  value={projectForm.features}
                  onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                  placeholder="Tar Roads, Electric Poles, Entrance Gate, Garden Park"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingProject}
                  className="px-6 py-2.5 bg-accent-gold hover:bg-accent-dark-gold disabled:opacity-50 text-white rounded-xl text-xs font-semibold uppercase tracking-wider shadow-lg cursor-pointer flex items-center gap-2"
                >
                  {isSavingProject ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
