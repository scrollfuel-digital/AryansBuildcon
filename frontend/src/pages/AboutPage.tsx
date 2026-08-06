import AboutSection from '../components/about';
import ScrollToTop from '../components/ui/ScrollToTop';
import { ShieldCheck, Award, Users, Landmark } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#FAF8F4] overflow-x-hidden selection:bg-accent-gold/20 selection:text-charcoal text-charcoal pt-30">
      <ScrollToTop />

      {/* About Page Hero Header */}
      <div className="bg-[#181512] text-white py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent-gold/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center space-y-6 relative z-10">
          <span className="font-sans text-[11px] font-medium text-accent-gold uppercase tracking-[0.28em] block font-mono">
            ✦ Heritage & Leadership Vision
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-cream font-light leading-tight">
            About Aryans Buildcon <br />
            {/* <span className="italic text-accent-gold">& The Founder's Story</span> */}
          </h1>
          <p className="font-sans text-xs md:text-sm text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Pioneering 100% NATP & NMRDA sanctioned clear-title residential layout developments across Nagpur’s most strategic corridors since 2016.
          </p>

          {/* Quick Metrics Strip */}
          <div className="pt-8 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-center gap-1.5 text-accent-gold mb-1">
                <Users className="w-4 h-4" />
                <span className="font-serif text-xl font-light text-cream">1,500+</span>
              </div>
              <p className="text-[10px] text-white/60 font-sans uppercase tracking-wider">Landowners</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-center gap-1.5 text-accent-gold mb-1">
                <Award className="w-4 h-4" />
                <span className="font-serif text-xl font-light text-cream">15+</span>
              </div>
              <p className="text-[10px] text-white/60 font-sans uppercase tracking-wider">Sanctioned Layouts</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-center gap-1.5 text-accent-gold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-serif text-xl font-light text-cream">100%</span>
              </div>
              <p className="text-[10px] text-white/60 font-sans uppercase tracking-wider">Clear Title Registry</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-center gap-1.5 text-accent-gold mb-1">
                <Landmark className="w-4 h-4" />
                <span className="font-serif text-xl font-light text-cream">Bank Loan</span>
              </div>
              <p className="text-[10px] text-white/60 font-sans uppercase tracking-wider">SBI & HDFC Approved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Comprehensive About & Founder Section */}
      <AboutSection />
    </div>
  );
}
