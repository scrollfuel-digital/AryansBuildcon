import { Sparkles } from "lucide-react";
import ProjectsSection from "../components/ui/ProjectsSection";
import ScrollToTop from "../components/ui/ScrollToTop";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-[#FAF8F4] overflow-x-hidden selection:bg-accent-gold/20 selection:text-charcoal text-charcoal pt-30">
      <ScrollToTop />

      <div className="bg-[#181512] text-white py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent-rust/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2">
            <span className="font-sans text-[12px] sm:text-[14px] font-medium text-accent-gold uppercase tracking-[0.24em] inline-flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sanctioned Residential Layouts</span>
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-cream font-light leading-tight">
            Our Projects <br />
            <span className="italic text-cream">
              Across Nagpur's Growth Corridors
            </span>
          </h1>
          <p className="font-sans text-lg md:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Explore 100% NMRDA & NATP sanctioned, clear-title residential plot
            layouts with world-class infrastructure.
          </p>
        </div>
      </div>

      <ProjectsSection />
    </div>
  );
}
