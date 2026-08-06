import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeroSection from "../components/ui/HeroSection";
import ProjectsSection from "../components/ui/ProjectsSection";
import CompanyOverview from "../components/about/CompanyOverview";
import { Landmark, Quote, ShieldCheck, Sparkles } from "lucide-react";
import flagshipLayoutImg from "../assets/about.png";
interface HomeProps {
  onExploreProjects: () => void;
  onBookConsultation: () => void;
}

export default function Home({
  onExploreProjects,
  onBookConsultation,
}: HomeProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if an in-app navigation requested scrolling to a specific section (e.g. Services, Contact, Projects)
    if (location.state && (location.state as any).scrollToId) {
      const id = (location.state as any).scrollToId;

      // Clear the history state immediately so that future page reloads do NOT re-trigger auto-scroll
      // and instead preserve whatever section the user is currently viewing!
      navigate(location.pathname, { replace: true, state: {} });

      // Slight delay to ensure content is fully loaded and layout has settled
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  return (
    <>
      {/* Hero Stage Section */}
      <HeroSection
        onExploreProjects={onExploreProjects}
        onBookConsultation={onBookConsultation}
      />

      {/* Curated Projects Section */}
      <ProjectsSection />

      {/* About us */}
      <section id="about-section" className="bg-[#F5F2EC] py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Image Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[480px] md:h-[620px] w-full bg-charcoal group border border-black/10">
            <img
              src={flagshipLayoutImg}
              alt="Aryans Buildcon Master Layout Development Nagpur"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-all duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Overlay Quote Box */}
            <div className="absolute bottom-6 left-6 right-6 bg-charcoal/90 backdrop-blur-md p-6 rounded-2xl border border-white/15 shadow-2xl">
             
              <p className="font-serif italic text-xs md:text-sm text-white/90 leading-relaxed font-light mb-3">
                "Land is not just a real estate transaction—it is the foundation
                of family security, pride, and generational wealth."
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-sans text-xs font-semibold text-cream uppercase tracking-[0.15em]">
                    Aryans Buildcon
                  </h4>
                  <p className="text-[10px] text-white/60 font-mono">
                    Nagpur's Trusted Layout Developer
                  </p>
                </div>
                <span className="text-[10px] bg-accent-gold/20 text-accent-gold border border-accent-gold/40 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                  NMRDA Sanctioned
                </span>
              </div>
            </div>
          </div>

          {/* Background luxury graphics */}
          <div className="absolute -top-6 -right-6 w-28 h-28 border border-accent-gold/30 rounded-3xl -z-10 pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-gold/10 rounded-full blur-2xl -z-10 pointer-events-none" />
        </div>

        {/* Right Column: Company Story */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="font-sans text-[11px] font-medium text-accent-gold uppercase tracking-[0.24em] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> About Aryans Buildcon
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-light leading-tight tracking-tight">
              Redefining Plotted Landownership <br />
              <span className="italic text-accent-gold">
                With Absolute Legal Clarity
              </span>
            </h2>
          </div>

          <div className="space-y-5 font-sans text-sm text-grey leading-relaxed font-light">
            <p>
              Founded in the heart of Nagpur,{" "}
              <strong className="text-charcoal font-medium">
                Aryans Buildcon
              </strong>{" "}
              has emerged as one of Central India’s most dependable real estate
              layout developers. We specialize in acquiring high-potential
              residential land, securing complete government sanctions (NATP &
              NMRDA), and developing turnkey residential plotted townships.
            </p>
            <p>
              Our developments are strategically located along Nagpur’s most
              booming growth arteries—including{" "}
              <span className="text-charcoal font-medium">
                Wardha Road, MIHAN SEZ, Samruddhi Mahamarg Expressway,
                Besa-Piproba Corridor, and Jamtha
              </span>
              . Every layout is master-planned with wide asphalt roads, sewage
              networks, electricity, and green recreational parks.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/10">
            <div className="flex items-start gap-3 bg-white/60 p-4 rounded-2xl border border-black/5">
              <ShieldCheck className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans text-xs font-semibold text-charcoal uppercase tracking-wider">
                  100% Clear Title
                </h4>
                <p className="text-[11px] text-grey font-light mt-0.5">
                  Thorough legal verification with immediate 7/12 registry.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/60 p-4 rounded-2xl border border-black/5">
              <Landmark className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans text-xs font-semibold text-charcoal uppercase tracking-wider">
                  Bank Loan Approved
                </h4>
                <p className="text-[11px] text-grey font-light mt-0.5">
                  Pre-approved by SBI, HDFC, ICICI & major nationalized banks.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/10 text-center">
            <div className="space-y-1">
              <span className="font-serif text-3xl font-light text-charcoal">
                1,500+
              </span>
              <p className="text-[10px] font-sans text-grey uppercase tracking-wider">
                Happy Landowners
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl font-light text-accent-gold">
                15+
              </span>
              <p className="text-[10px] font-sans text-grey uppercase tracking-wider">
                Sanctioned Townships
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl font-light text-charcoal">
                100%
              </span>
              <p className="text-[10px] font-sans text-grey uppercase tracking-wider">
                Clear Title Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      </section>

      {/* company overview */}
      <CompanyOverview />
    </>
  );
}
