import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { projects as staticProjects } from "../../data";
import { fetchProjects } from "../../api";
import {
  ArrowRight,
  MapPin,
  Scaling,
  FileCheck,
  Building2,
  ShieldCheck,
  Sparkles,
  Award,
  Navigation,
  QrCode,
  X,
  ExternalLink,
} from "lucide-react";

export default function ProjectsSection() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(staticProjects);
  const [selectedQrProject, setSelectedQrProject] = useState<any | null>(null);

  useEffect(() => {
    fetchProjects()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          // Merge API data with static rich data (images, distances, etc.)
          const merged = staticProjects.map((sp) => {
            const api = res.data.find(
              (p: any) => p.id === sp.id || p._id === sp.id,
            );
            return api ? { ...sp, ...api, imageUrl: sp.imageUrl } : sp;
          });
          setProjects(merged as any);
        }
      })
      .catch(() => {
        // silently keep static data on network error
      });
  }, []);

  return (
    <section
      id="projects-section"
      className="py-10 md:py-20 bg-cream text-charcoal overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center gap-6 mb-14 md:mb-20"
        >
          <div className="max-w-2xl space-y-3">
            <span className="font-sans text-[11px] font-medium text-accent-gold uppercase tracking-[0.24em] inline-flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FLAGSHIP PLOTTED DEVELOPMENTS</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-light leading-[1.15] tracking-tight">
              Residential Plots{" "}<span className="italic text-accent-rust font-normal">Designed for Tomorrow</span>
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="font-sans text-xs md:text-sm text-grey/80 font-light leading-relaxed">
              Finding the perfect plot is about more than location—it's about choosing a place where your future can grow. Explore our NMRDA sanctioned communities across Nagpur's prime growth corridors.
            </p>
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 45, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.85,
                delay: idx * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-[#EFDFD6] border border-charcoal/15 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-9 shadow-[0_16px_48px_rgba(43,27,18,0.08)] hover:shadow-[0_24px_64px_rgba(43,27,18,0.15)] hover:border-accent-rust/40 transition-all duration-500 flex flex-col justify-between group relative"
            >
              <div className="space-y-6">
                {/* Cover Image */}
                <div className="relative h-[220px] sm:h-[280px] md:h-[350px] w-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-charcoal">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Sanction Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-emerald-950/90 backdrop-blur-md text-white border border-emerald-400/30 px-3 py-1.5 rounded-full font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.14em] shadow-md flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span>
                        {project.sanctionStatus || "SANCTIONED LAYOUT"}
                      </span>
                    </div>
                  </div>

                  {/* QR Button — shown when googleMapsUrl exists */}
                  {project.googleMapsUrl && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedQrProject(project);
                      }}
                      className="absolute top-4 right-4 z-10 bg-accent-gold/90 hover:bg-accent-gold text-white border border-white/30 px-3.5 py-1.5 rounded-full font-sans text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.14em] shadow-lg flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Location QR</span>
                    </button>
                  )}

                  {/* Location Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/60 backdrop-blur-md text-cream p-3.5 rounded-xl flex items-center justify-between border border-white/10">
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="w-4 h-4 text-accent-gold shrink-0" />
                      <span className="font-sans text-xs md:text-sm font-medium tracking-wide truncate">
                        {project.location}
                      </span>
                    </div>
                    <span className="font-serif italic text-xs text-accent-gold shrink-0 ml-2">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] md:text-[11px] font-semibold text-accent-gold uppercase tracking-[0.20em]">
                      {project.developer || "Aryans Buildcon"}
                    </span>
                    <span className="font-sans text-[11px] text-charcoal/70 font-medium bg-white/70 px-3 py-1 rounded-full border border-black/5">
                      {project.totalPlots
                        ? `${project.totalPlots} Plots`
                        : "Ready Layout"}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-light leading-snug group-hover:text-accent-rust transition-colors">
                    {project.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-grey font-light leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {project.taglines && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {project.taglines.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-accent-gold/10 text-accent-gold border border-accent-gold/20 rounded-full font-sans text-[10px] font-medium uppercase tracking-[0.10em]"
                        >
                          ✦ {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Distances */}
                {project.distances && project.distances.length > 0 && (
                  <div className="bg-white/60 border border-black/5 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-accent-gold text-[10px] font-sans uppercase tracking-[0.14em] font-semibold">
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Transit Hubs:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {project.distances.slice(0, 2).map((d, i) => (
                        <span
                          key={i}
                          className="font-sans text-[11px] text-charcoal font-medium"
                        >
                          {d.label}:{" "}
                          <strong className="text-accent-rust font-semibold">
                            {d.distance}
                          </strong>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Spec Badges */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="flex items-center gap-2 bg-white/80 border border-charcoal/10 rounded-full px-3.5 py-2 text-[11px] font-sans text-charcoal">
                    <Scaling className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                    <span className="truncate">{project.area}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 border border-charcoal/10 rounded-full px-3.5 py-2 text-[11px] font-sans text-charcoal">
                    <FileCheck className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                    <span className="truncate">Ready to Registry</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 border border-charcoal/10 rounded-full px-3.5 py-2 text-[11px] font-sans text-charcoal">
                    <Building2 className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                    <span className="truncate">Bank Loan Approved</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 border border-charcoal/10 rounded-full px-3.5 py-2 text-[11px] font-sans text-charcoal">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                    <span className="truncate">100% Clear Title</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6">
                <button
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="w-full py-4 px-6 rounded-full bg-charcoal text-cream font-sans text-[12px] font-medium uppercase tracking-[0.14em] group-hover:bg-accent-gold group-hover:shadow-[0_10px_30px_rgba(169,113,66,0.3)] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>Explore Layout & Specifications</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* QR Modal */}
      {selectedQrProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-cream border border-charcoal/20 rounded-3xl p-6 md:p-8 max-w-sm w-full space-y-5 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedQrProject(null)}
              className="absolute top-4 right-4 p-2 text-charcoal/60 hover:text-charcoal bg-black/5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 pt-2">
              <span className="font-sans text-[10px] font-semibold text-accent-gold uppercase tracking-[0.2em] block">
                Google Location Map QR
              </span>
              <h3 className="font-serif text-2xl font-light text-charcoal">
                {selectedQrProject.title}
              </h3>
              <p className="font-sans text-xs text-grey">
                {selectedQrProject.location}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-black/10 shadow-sm flex justify-center">
              <QRCodeSVG
                value={selectedQrProject.googleMapsUrl}
                size={200}
                bgColor="#ffffff"
                fgColor="#1a1a1a"
                level="H"
              />
            </div>

            <div className="space-y-3 pt-1">
              <p className="font-sans text-xs text-grey text-center font-light leading-relaxed">
                Scan with your phone camera to open Google Maps navigation to{" "}
                {selectedQrProject.title}.
              </p>
              <a
                href={selectedQrProject.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-charcoal hover:bg-accent-gold text-white font-sans text-xs font-medium uppercase tracking-[0.14em] rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
