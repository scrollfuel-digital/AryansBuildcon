import { Sparkles } from "lucide-react";
import ProjectsSection from "../components/ui/ProjectsSection";
import ScrollToTop from "../components/ui/ScrollToTop";
import { motion } from "motion/react";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FAF8F4] selection:bg-[#D4AF37]/20 selection:text-[#181512] text-[#181512] pt-24 md:pt-28">
      <ScrollToTop />

      {/* ================= PROJECTS HEADER ================= */}
      <section className="relative isolate overflow-hidden !bg-[#181512] !text-white border-b border-white/10">
        {/* Background Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Center gold glow */}
          <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#D4AF37]/10 blur-[140px]" />

          {/* Rust glow */}
          <div className="absolute bottom-[-180px] left-[-100px] w-[450px] h-[350px] rounded-full bg-[#8C3716]/15 blur-[130px]" />

          {/* Gold glow */}
          <div className="absolute bottom-[-160px] right-[-100px] w-[450px] h-[350px] rounded-full bg-[#D4AF37]/5 blur-[130px]" />
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none">
          <div
            className="absolute inset-0"
            
          />
        </div>

        {/* Side Decorative Lines */}
        <div className="absolute left-0 top-1/2 w-24 md:w-48 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/30" />

        <div className="absolute right-0 top-1/2 w-24 md:w-48 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/30" />

        {/* ================= CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 max-w-5xl mx-auto px-6 py-14 md:py-20 lg:py-24 flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <span className="w-8 md:w-14 h-px bg-[#D4AF37]/70" />

            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />

              <span className="font-sans text-[10px] sm:text-[11px] md:text-[12px] font-semibold !text-[#D4AF37] uppercase tracking-[0.3em]">
                Premium Residential Projects
              </span>
            </div>

            <span className="w-8 md:w-14 h-px bg-[#D4AF37]/70" />
          </div>

          {/* Main Heading */}
          <h1 className="!text-white font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
            Our Projects
          </h1>

          {/* Gold Heading */}
          <h2 className="mt-4 font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight !text-[#D4AF37]">
            Across Nagpur's Growth Corridors
          </h2>

          {/* Description */}
          <p className="mt-7 max-w-2xl font-sans text-sm sm:text-base md:text-lg font-medium leading-relaxed !text-white/70">
            Explore thoughtfully planned residential plot layouts with clear
            titles, sanctioned approvals, premium infrastructure, and strong
            growth potential.
          </p>

          {/* Project Highlights */}
          <div className="mt-9 flex flex-wrap justify-center items-center gap-x-5 gap-y-3">
            <span className="text-[20px] sm:text-[15px] md:text-[15px] uppercase tracking-[0.22em] !text-white/50">
              NMRDA Approved
            </span>

            <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />

            <span className="text-[20px] sm:text-[15px] md:text-[15px] uppercase tracking-[0.22em] !text-white/50">
              NATP Sanctioned
            </span>

            <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />

            <span className="text-[20px] sm:text-[15px] md:text-[15px] uppercase tracking-[0.22em] !text-white/50">
              Clear Title
            </span>

            <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />

            <span className="text-[20px] sm:text-[15px] md:text-[15px] uppercase tracking-[0.22em] !text-white/50">
              Nagpur
            </span>
          </div>
        </motion.div>

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-44 h-[2px] bg-[#D4AF37]" />
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <ProjectsSection />
    </div>
  );
}
