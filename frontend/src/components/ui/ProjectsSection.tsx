import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { projects as staticProjects } from "../../data";
import { fetchProjects } from "../../api";
import {
  ArrowUpRight,
  MapPin,
  Scaling,
  Home,
  Sparkles,
  QrCode,
  X,
  ExternalLink,
  BadgeCheck,
} from "lucide-react";

export default function ProjectsSection() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(staticProjects);
  const [selectedQrProject, setSelectedQrProject] = useState<any | null>(null);

  useEffect(() => {
    fetchProjects()
      .then((res) => {
        if (res.data && res.data.length > 0) {
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
      className="py-10 md:py-20 bg-cream text-ink overflow-hidden"
    >
      <div className="max-w-[1350px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center gap-5 mb-14 md:mb-20"
        >
          <span className="font-sans text-[12px] sm:text-[14px] font-bold text-gold-dark uppercase tracking-[0.24em] inline-flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR DEVELOPMENTS</span>
          </span>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-ink font-bold leading-[1.15] tracking-tight max-w-3xl">
            Explore Our{" "}
            <span className=" text-gold-dark font-semibold">
              Residential Projects
            </span>
          </h2>

          <p className="font-sans text-base md:text-lg text-ink-soft/80 font-bold max-w-xl">
            Discover residential plotted developments designed for comfortable
            living and long-term potential.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.85,
                delay: idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => navigate(`/project/${project.id}`)}
              className="group relative cursor-pointer rounded-[1.75rem] overflow-hidden border border-ink/10 bg-white transition-all duration-500 hover:border-gold/50 hover:shadow-[0_28px_70px_rgba(13,11,8,0.16)]"
            >
              {/* ============ Full-bleed image ============ */}
              <div className="relative h-[340px] sm:h-[420px] md:h-[480px] w-full overflow-hidden bg-black">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Permanent gradient for legible overlay text */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/45 to-black/65 pointer-events-none" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedQrProject(project);
                  }}
                  className="absolute left-5 top-5 z-20 bg-gold hover:bg-white text-cream hover:text-ink px-3.5 py-1.5 rounded-full font-sans text-[10px] font-semibold uppercase tracking-[0.14em] shadow-lg flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
                >
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>NATP Sanctioned</span>
                </button>
                {/* QR Button */}
                {project.googleMapsUrl && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQrProject(project);
                    }}
                    className="absolute top-5 right-5 z-20 bg-white/95 hover:bg-gold text-ink px-3.5 py-1.5 rounded-full font-sans text-[10px] font-semibold uppercase tracking-[0.14em] shadow-lg flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Map</span>
                  </button>
                )}

                {/* ============ Overlay content: name, location, sizes, layout, CTA ============ */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-8 space-y-4">
                  {/* Project Name */}
                  <h3 className="font-serif text-3xl sm:text-4xl md:text-[2.6rem] text-white font-bold leading-[1.1]">
                    {project.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-light shrink-0" />
                    <span className="font-sans text-sm md:text-base text-white/90 font-medium tracking-wide">
                      {project.location}
                    </span>
                  </div>

                  {/* Gold hairline */}
                  <div className="w-12 h-px bg-gold-light/70" />

                  {/* Plot Sizes + Layout Type */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div className="flex items-center gap-2 text-white/90">
                      <Scaling className="w-4 h-4 text-gold-light shrink-0" />
                      <span className="font-sans text-[13px] md:text-[14px] font-medium">
                        {project.area || "Plot sizes on request"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <Home className="w-4 h-4 text-gold-light shrink-0" />
                      <span className="font-sans text-[13px] md:text-[14px] font-medium">
                        Residential Layout
                      </span>
                    </div>
                  </div>

                  {/* View Project CTA */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 font-sans text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-light group-hover:text-white group-hover:gap-3 transition-all duration-300">
                      View Project
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* QR Modal */}
      {selectedQrProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-cream border border-ink/15 rounded-3xl p-6 md:p-8 max-w-sm w-full space-y-5 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedQrProject(null)}
              className="absolute top-4 right-4 p-2 text-ink/60 hover:text-ink bg-black/5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 pt-2">
              <span className="font-sans text-[11px] font-semibold text-gold-dark uppercase tracking-[0.2em] block">
                Google Location Map QR
              </span>
              <h3 className="font-serif text-2xl font-light text-ink">
                {selectedQrProject.title}
              </h3>
              <p className="font-sans text-sm text-ink-soft">
                {selectedQrProject.location}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-black/10 shadow-sm flex justify-center">
              <QRCodeSVG
                value={selectedQrProject.googleMapsUrl}
                size={200}
                bgColor="#ffffff"
                fgColor="#14110d"
                level="H"
              />
            </div>

            <div className="space-y-3 pt-1">
              <p className="font-sans text-sm text-ink-soft text-center font-light leading-relaxed">
                Scan with your phone camera to open Google Maps navigation to{" "}
                {selectedQrProject.title}.
              </p>
              <a
                href={selectedQrProject.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-black hover:bg-gold text-gold-light hover:text-black font-sans text-sm font-medium uppercase tracking-[0.14em] rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
