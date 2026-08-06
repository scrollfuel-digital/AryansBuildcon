import { Plus, MapPin, Edit2, Trash2 } from 'lucide-react';
import { ProjectData } from './types';

interface ProjectsGridProps {
  projects: ProjectData[];
  onAddNew: () => void;
  onEdit: (proj: ProjectData) => void;
  onDelete: (id: string) => void;
}

export default function ProjectsGrid({
  projects,
  onAddNew,
  onEdit,
  onDelete,
}: ProjectsGridProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#171411] p-4 rounded-2xl border border-white/10">
        <div>
          <h3 className="font-serif text-lg font-light text-cream">Layout Projects Database</h3>
          <p className="text-xs text-white/50">Manage residential and commercial layout listings</p>
        </div>

        <button
          onClick={onAddNew}
          className="px-5 py-2.5 bg-accent-gold hover:bg-accent-dark-gold text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Layout Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj._id || proj.id}
            className="bg-[#171411] border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                  {proj.sanctionStatus || 'NATP SANCTIONED'}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-accent-gold uppercase tracking-[0.2em]">
                    {proj.category}
                  </span>
                  <span className="text-xs font-semibold text-cream bg-white/10 px-2.5 py-0.5 rounded-full">
                    {proj.status}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-light text-cream">{proj.title}</h3>
                <p className="text-xs text-white/60 flex items-start gap-1 font-light">
                  <MapPin className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                  <span>{proj.location}</span>
                </p>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                  <span className="text-white/50">{proj.area}</span>
                  <span className="font-semibold text-accent-gold font-serif">
                    ₹{proj.price} {proj.priceUnit}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#1f1b17] border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => onEdit(proj)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-xl font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-accent-gold" />
                <span>Edit Project</span>
              </button>

              <button
                onClick={() => onDelete(proj._id || proj.id!)}
                className="px-4 py-2 bg-red-950/60 hover:bg-red-900 text-red-300 text-xs rounded-xl font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
