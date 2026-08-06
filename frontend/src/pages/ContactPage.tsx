import ContactSection from '../components/ui/ContactSection';
import ScrollToTop from '../components/ui/ScrollToTop';

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#FAF8F4] overflow-x-hidden selection:bg-accent-gold/20 selection:text-charcoal text-charcoal pt-30">
      <ScrollToTop />

      <div className="bg-[#181512] text-white py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent-gold/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center space-y-4 relative z-10">
          <span className="font-sans text-[11px] font-medium text-accent-gold uppercase tracking-[0.28em] block font-mono">
            ✦ Get In Touch
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-cream font-light leading-tight">
            Contact Us <br />
            <span className="italic text-accent-gold">Book a Site Visit Today</span>
          </h1>
          <p className="font-sans text-xs md:text-sm text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Speak with our experts and schedule a confidential consultation for your dream plot in Nagpur.
          </p>
        </div>
      </div>

      <ContactSection />
    </div>
  );
}
