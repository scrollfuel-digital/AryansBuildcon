import AboutSection from "../components/about";
import ScrollToTop from "../components/ui/ScrollToTop";
import { ShieldCheck, Award, Users, Landmark, Sparkles } from "lucide-react";
import { motion } from "motion/react";
export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#FAF8F4] overflow-x-hidden selection:bg-accent-gold/20 selection:text-charcoal text-charcoal pt-30">
      <ScrollToTop />

     
      <section className="relative isolate overflow-hidden !bg-[#181512] !text-white border-b border-white/10">
      
        <div className="absolute inset-0 z-0 pointer-events-none">
    
          <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#D4AF37]/10 blur-[140px]" />

          <div className="absolute bottom-[-180px] left-[-100px] w-[450px] h-[350px] rounded-full bg-[#8C3716]/15 blur-[130px]" />

          <div className="absolute bottom-[-160px] right-[-100px] w-[450px] h-[350px] rounded-full bg-[#D4AF37]/5 blur-[130px]" />
        </div>

        <div className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none">
          <div className="absolute inset-0" />
        </div>

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
                Heritage & Leadership Vision
              </span>
            </div>

            <span className="w-8 md:w-14 h-px bg-[#D4AF37]/70" />
          </div>

          {/* Main Heading */}
          <h1 className="!text-white font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
            About Aryans Buildcon
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl font-sans text-sm sm:text-base md:text-lg font-medium leading-relaxed !text-white/70">
            Pioneering 100% NATP & NMRDA sanctioned clear-title residential
            layout developments across Nagpur’s most strategic corridors since
            2016.
          </p>
          {/* Quick Metrics Strip */}
          <div className="pt-8 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-center gap-1.5 text-accent-gold mb-1">
                <Users className="w-4 h-4" />
                <span className="font-serif text-2xl font-light text-cream">
                  1,500+
                </span>
              </div>
              <p className="text-[10px] text-white/60 font-sans uppercase tracking-wider">
                Landowners
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-center gap-1.5 text-accent-gold mb-1">
                <Award className="w-4 h-4" />
                <span className="font-serif text-2xl font-light text-cream">
                  15+
                </span>
              </div>
              <p className="text-[10px] text-white/60 font-sans uppercase tracking-wider">
                Sanctioned Layouts
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-center gap-1.5 text-accent-gold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-serif text-2xl font-light text-cream">
                  100%
                </span>
              </div>
              <p className="text-[10px] text-white/60 font-sans uppercase tracking-wider">
                Clear Title Registry
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-center gap-1.5 text-accent-gold mb-1">
                <Landmark className="w-4 h-4" />
                <span className="font-serif text-2xl font-light text-cream">
                  Bank Loan
                </span>
              </div>
              <p className="text-[10px] text-white/60 font-sans uppercase tracking-wider">
                SBI & HDFC Approved
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-44 h-[2px] bg-[#D4AF37]" />
      </section>
      {/* Dedicated Comprehensive About & Founder Section */}
      <AboutSection />
    </div>
  );
}
