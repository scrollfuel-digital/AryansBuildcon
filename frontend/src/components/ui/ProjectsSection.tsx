import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { fetchProjects } from "../../api";
import { projects as staticProjects } from "../../data";
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

interface Project {
  id?: string;
  _id?: string;
  slug?: string;
  title: string;
  location: string;
  area?: string;
  imageUrl?: string;
  imageAlt?: string;
  googleMapsUrl?: string;
  buttonText?: string;
}

export default function ProjectsSection() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>(
    () => (Array.isArray(staticProjects) && staticProjects.length > 0 ? (staticProjects as unknown as Project[]) : [])
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedQrProject, setSelectedQrProject] = useState<Project | null>(
    null,
  );

  // Fetch projects from API, with static projects as resilient fallback
  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        setError("");

        const res = await fetchProjects();

        if (!isMounted) return;

        // API response: { success: true, data: [...] }
        const apiProjects = Array.isArray(res?.data) ? res.data : [];

        if (apiProjects.length > 0) {
          setProjects(apiProjects);
        }
      } catch (err) {
        console.warn("Unable to fetch projects from API, falling back to static projects:", err);

        if (isMounted) {
          // If we already have projects, ensure they are shown without an error banner
          setProjects((prev) =>
            prev.length > 0 ? prev : (staticProjects as unknown as Project[])
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const getProjectButtonText = (project: Project): string => {
    const title = project.title.toLowerCase();

    if (title.includes("govindraj nagari")) {
      return "View Govindraj Nagari Project";
    }

    if (title.includes("amrutsiddhi")) {
      return "View Amrutsiddhi Project";
    }

    if (title.includes("oasis") || title.includes("vatika")) {
      return "View Oasis-Vatika Shirul Project";
    }

    return project.buttonText || `View ${project.title} Project`;
  };

  const generateProjectSlug = (project: Project): string => {
    // Use API slug if available
    if (project.slug?.trim()) {
      return project.slug.trim().replace(/^\/|\/$/g, "");
    }

    const title = project.title.toLowerCase().trim();

    // Match known project names
    if (title.includes("govindraj nagari")) {
      return "govindraj-nagari-plots-wardha-road-nagpur";
    }

    if (title.includes("amrutsiddhi")) {
      return "amrutsiddhi-residential-plots-nagpur";
    }

    if (title.includes("oasis") || title.includes("vatika")) {
      return "oasis-vatika-shirul-residential-plots-nagpur";
    }

    // Generic fallback
    return title.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  const handleProjectClick = (project: Project) => {
    const slug = generateProjectSlug(project);

    if (!slug) {
      console.error("Unable to generate project slug:", project);
      return;
    }

    console.log("Redirecting to:", `/projects/${slug}/`);

    navigate(`/projects/${slug}/`);
  };

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
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center text-center gap-5 mb-14 md:mb-20"
        >
          <span className="font-sans text-[12px] sm:text-[14px] font-bold text-gold-dark uppercase tracking-[0.24em] inline-flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR DEVELOPMENTS</span>
          </span>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-ink font-bold leading-[1.15] tracking-tight max-w-3xl">
            Residential Plot Projects{" "}
            <span className="text-gold-dark font-semibold">in Nagpur</span>
          </h2>

          <p className="font-sans text-center md:text-lg text-ink-soft/80 font-bold max-w-3xl">
            Discover residential plot projects in Nagpur by Aryans Buildcon.
            Explore our developments, project locations, layout details and
            available amenities to help you find a suitable plot for your future
            home.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && projects.length === 0 && (
          <div className="py-16 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>

            <p className="text-ink-soft font-medium">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && projects.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-red-600 font-medium">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 rounded-full bg-black text-white hover:bg-gold hover:text-black transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-ink-soft font-medium">
              No projects available at the moment.
            </p>
          </div>
        )}

        {/* Projects Grid */}
        {projects.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 md:gap-12 lg:gap-16">
            {projects.map((project, idx) => {
              const projectId = project.id || project._id;

              return (
                <motion.article
                  key={projectId || idx}
                  initial={{ opacity: 0, y: 45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    margin: "-60px",
                  }}
                  transition={{
                    duration: 0.85,
                    delay: idx * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => handleProjectClick(project)}
                  className="group relative cursor-pointer rounded-[1.75rem] overflow-hidden border border-ink/10 bg-white transition-all duration-500 hover:border-gold/50 hover:shadow-[0_28px_70px_rgba(13,11,8,0.16)]"
                >
                  {/* Project Image */}
                  <div className="relative h-[340px] sm:h-[420px] md:h-[480px] w-full overflow-hidden bg-black">
                    <img
                      src={project.imageUrl || "/placeholder-project.jpg"}
                      alt={project.imageAlt || project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Image Gradient */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/45 to-black/65 pointer-events-none" />

                    {/* Sanction Badge */}
                    <div className="absolute left-5 top-5 z-20 bg-gold text-cream px-3.5 py-1.5 rounded-full font-sans text-[10px] font-semibold uppercase tracking-[0.14em] shadow-lg flex items-center gap-1.5">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      <span>NATP Sanctioned</span>
                    </div>

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

                    {/* Project Details Overlay */}
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

                      {/* Gold Divider */}
                      <div className="w-12 h-px bg-gold-light/70" />

                      {/* Plot Sizes and Layout */}
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
                      <div className="pt-3">
                        <span className="inline-flex items-center gap-2 font-sans text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-light group-hover:text-white group-hover:gap-3 transition-all duration-300">
                          {getProjectButtonText(project)}

                          <ArrowUpRight className="w-4 h-4 shrink-0" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {selectedQrProject && selectedQrProject.googleMapsUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedQrProject(null)}
        >
          <div
            className="bg-cream border border-ink/15 rounded-3xl p-6 md:p-8 max-w-sm w-full space-y-5 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedQrProject(null)}
              className="absolute top-4 right-4 p-2 text-ink/60 hover:text-ink bg-black/5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
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

            {/* QR Code */}
            <div className="bg-white p-4 rounded-2xl border border-black/10 shadow-sm flex justify-center">
              <QRCodeSVG
                value={selectedQrProject.googleMapsUrl}
                size={200}
                bgColor="#ffffff"
                fgColor="#14110d"
                level="H"
              />
            </div>

            {/* Google Maps Link */}
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
