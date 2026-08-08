
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import plotsBg from "../../assets/background/plots.webp";
import bgVideo from "../../assets/Video1.mp4";

interface HeroSectionProps {
  onExploreProjects: () => void;
  onBookConsultation: () => void;
}

interface SlideContent {
  headlineSpan1: string;
  headlineSpan2: string; // italicized in accent rust (brown)
  headlineSpan3: string;
  stats: {
    value: string;
    label: string;
  }[];
}

const SLIDES: SlideContent[] = [
  {
    headlineSpan1: "Build your future on a",
    headlineSpan2: "Foundation of trust",
    headlineSpan3: "With clear-title residential plots.",
    stats: [
      { value: "100%", label: "Legally Verified" },
      { value: "Pre-Approved", label: "Bank Loan Assistance" },
      { value: "Ready", label: "To Register & Build" },
    ],
  },
  {
    headlineSpan1: "Secure high-growth land",
    headlineSpan2: "In prime growth corridors",
    headlineSpan3: "Near MIHAN & Wardha Road.",
    stats: [
      { value: "High", label: "Appreciation Potential" },
      { value: "30 & 40 Ft", label: "Wide Internal Tar Roads" },
      { value: "Modern", label: "Common Amenities" },
    ],
  },
  {
    headlineSpan1: "Every great home begins",
    headlineSpan2: "With the right land",
    headlineSpan3: "Designed for tomorrow's family.",
    stats: [
      { value: "Prime", label: "Highway Connectivity" },
      { value: "Transparent", label: "Documentation Support" },
      { value: "Trusted", label: "Real Estate Partner" },
    ],
  },
];

export default function HeroSection({
  onExploreProjects,
  onBookConsultation,
}: HeroSectionProps) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cycle slide text content every 5000ms
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen lg:h-screen overflow-hidden"
    >
      {/* ------------------ BACKGROUND MEDIA (Single Element) ------------------ */}
      <video
        id="hero-background-media"
        autoPlay
        muted
        loop
        playsInline
        poster={plotsBg}
        className="absolute inset-0 w-full h-full object-cover select-none z-0 pointer-events-none"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* ------------------ ENVIRONMENTAL GRADING OVERLAYS ------------------ */}

      {/* Top Blend Strip: 250px height, white 30% to transparent */}
      <div
        id="hero-overlay-top-blend"
        className="absolute top-0 left-0 right-0 h-[250px] bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-25"
      />

      {/* Left Content Gradient: covers inset to ensure text legibility */}
      <div
        id="hero-overlay-left-gradient"
        className="absolute inset-0 bg-gradient-to-r from-[#FAF8F4]/93 via-[#FAF8F4]/78 via-[#FAF8F4]/42 via-[#FAF8F4]/06 to-transparent pointer-events-none z-25"
        style={{
          background:
            "linear-gradient(to right, rgba(185, 184, 182, 0.93) 0%, rgba(184, 182, 178, 0.78) 28%, rgba(176, 175, 173, 0.42) 52%, rgba(250,248,244,0.06) 72%, rgba(250,248,244,0) 88%)",
        }}
      />

      {/* Warm Cinematic Grade: mix-blend multiply */}
      <div
        id="hero-overlay-cinematic-grade"
        className="absolute inset-0 mix-blend-multiply pointer-events-none z-25"
        style={{
          background:
            "linear-gradient(155deg, rgba(201,165,106,0.08) 0%, rgba(180,120,60,0.05) 40%, rgba(20,14,6,0.18) 100%)",
        }}
      />

      {/* Bottom Vignette: 35% height, linear to black/dark transparent */}
      <div
        id="hero-overlay-bottom-vignette"
        className="absolute bottom-0 left-0 right-0 h-[35vh] pointer-events-none z-25"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.12) 0%, transparent 100%)",
        }}
      />

      {/* Sunrise Bloom (Top Right): radial, blurred top right bloom */}
      <div
        id="hero-overlay-sunrise-bloom"
        className="absolute top-[-5%] right-[5%] w-[45%] h-[55%] pointer-events-none blur-[40px] z-25 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(35, 35, 34, 0.1) 0%, transparent 70%)",
        }}
      />

      {/* ------------------ MAIN TEXT CONTENT ------------------ */}
      <div className="absolute inset-0 z-30 flex items-center pt-24 md:pt-28 lg:pt-32 px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20">
        <div className="w-full max-w-[900px] xl:max-w-[1100px] space-y-6 md:space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { staggerChildren: 0.15 } },
                exit: {
                  opacity: 0,
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
              className="space-y-8"
            >
              {/* Headline */}
              <motion.h1
                variants={{
                  initial: { opacity: 0, y: 40 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                  },
                  exit: { opacity: 0, y: -25, transition: { duration: 0.5 } },
                }}
                className="font-serif text-[clamp(28px,6vw,50px)] font-light leading-[1.08] tracking-[-0.02em]"
                style={{ color: "#2b1b12" }}
              >
                <span className="block ">{slide.headlineSpan1}</span>
                <span className="block italic text-accent-rust font-light my-2">
                  {slide.headlineSpan2}
                </span>
                <span className="block">{slide.headlineSpan3}</span>
              </motion.h1>

              {/* Call to Action (CTA) Row */}
              <motion.div
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                  },
                  exit: { opacity: 0, y: -15, transition: { duration: 0.4 } },
                }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-10 pt-2 md:pt-4"
              >
                {/* Primary CTA */}
                <button
                  id="btn-hero-explore-projects"
                  onClick={onExploreProjects}
                  className="group flex items-center justify-center gap-3 bg-accent-gold hover:bg-accent-dark-gold text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-sans text-[15px] sm:text-[14px] font-medium uppercase tracking-[0.07em] hover:shadow-[0_12px_40px_rgba(11,116,67,0.40)] hover:-translate-y-[2px] active:translate-y-0 transition-all duration-300 cursor-pointer"
                >
                  Explore Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                {/* Secondary CTA */}
                <button
                  id="btn-hero-book-consultation"
                  onClick={() => navigate("/contact")}
                  className="group font-sans text-[18px] sm:text-[20px] font-bold text-charcoal hover:text-charcoal pb-1 pl-5 transition-all duration-300 cursor-pointer"
                >
                  Book Site Visit
                </button>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                  },
                  exit: { opacity: 0, y: -15, transition: { duration: 0.4 } },
                }}
                className="flex flex-wrap items-center gap-y-4 pt-4 md:pt-10"
              >
                {slide.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="space-y-1">
                      <div
                        className="font-serif text-[25px] sm:text-[28px] md:text-[32px] font-light leading-none tracking-[-0.02em]"
                        style={{ color: "#2b1b12" }}
                      >
                        {stat.value}
                      </div>
                      <div className="font-sans text-[15px] sm:text-[15px] font-medium text-black uppercase tracking-[0.14em] sm:tracking-[0.18em]">
                        {stat.label}
                      </div>
                    </div>
                    {idx < slide.stats.length - 1 && (
                      <div className="mx-4 sm:mx-6 md:mx-10 w-[1px] h-8 bg-black/10 hidden sm:block" />
                    )}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
