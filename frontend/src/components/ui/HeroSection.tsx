import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  ShieldCheck,
  Landmark,
  Route,
  FileCheck2,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import background_IMAGE from "../../assets/amrutsidhi3.png";
import background_VIDEO from "../../assets/ALP.mp4";

interface HeroSectionProps {
  videoSrc?: string;
  posterSrc?: string;
  imageSrc?: string;
  onExploreProjects?: () => void;
  onBookConsultation?: () => void;
}

interface HighlightItem {
  icon: ComponentType<{ className?: string }>;
  label: string;
}

const HERO_MAIN_TEXT = "Premium Residential Plots";
const HERO_ACCENT_TEXT = "in Nagpur";

const REVEAL_DURATION = 6;
const CYCLE_DURATION_MS = 10000;
const SHIMMER_START = 6.3;

const HIGHLIGHTS: HighlightItem[] = [
  { icon: ShieldCheck, label: "Legally Verified" },
  { icon: Landmark, label: "Bank Finance Assistance" },
  { icon: Route, label: "Excellent Connectivity" },
  { icon: FileCheck2, label: "Ready to Register" },
];

function renderTypedWords(
  text: string,
  charOffset: number,
  totalChars: number,
  accent: boolean
): ReactNode {
  const words = text.split(" ");
  let runningIndex = charOffset;

  return words.map((word, wIdx) => {
    const letterSpans = word.split("").map((char, i) => {
      const globalIndex = runningIndex + i;
      const revealDelay =
        totalChars > 1
          ? (globalIndex / (totalChars - 1)) * REVEAL_DURATION
          : 0;

      return (
        <span
          key={`${wIdx}-${i}`}
          className={`hs-letter${accent ? " hs-letter-accent" : ""}`}
          style={{
            animationDelay: `${revealDelay.toFixed(2)}s, ${SHIMMER_START}s`,
          }}
        >
          {char}
        </span>
      );
    });

    runningIndex += word.length + 1;

    return (
      <span className="hs-word" key={`word-${wIdx}`}>
        {letterSpans}
        {wIdx < words.length - 1 ? "\u00A0" : ""}
      </span>
    );
  });
}

export default function HeroSection({
  videoSrc = background_VIDEO,
  posterSrc = background_IMAGE,
  imageSrc = background_IMAGE,
  onExploreProjects = () => {},
  onBookConsultation = () => {},
}: HeroSectionProps) {
  const [cycle, setCycle] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInViewRef = useRef(true);

  const totalChars = useMemo(
    () => HERO_MAIN_TEXT.length + HERO_ACCENT_TEXT.length,
    []
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (isInViewRef.current) {
        setCycle((c) => c + 1);
      }
    }, CYCLE_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative w-full min-h-screen overflow-hidden bg-cream flex flex-col"
    >
      {/* ================= FULL-BLEED BACKGROUND MEDIA ================= */}
      <div className="hs-media-fade absolute inset-0 z-0">
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={posterSrc || imageSrc}
            className="absolute inset-0 w-full h-full object-cover select-none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={posterSrc || imageSrc}
            alt="Tree-lined access road running through a landscaped residential plot development"
            className="absolute inset-0 w-full h-full object-cover select-none"
            draggable={false}
          />
        )}
      </div>

      {/* ================= FULL-PAGE OVERLAY (black, not green-tinted) ================= */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/45 to-black/65 pointer-events-none" />

      {/* ================= TEXT CONTENT ================= */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-24 lg:py-16 text-center">
        <div className="w-full mx-auto flex flex-col items-center pt-32 lg:pt-40">
          <h1
            key={cycle}
            className="max-w-[760px] text-balance font-serif uppercase text-[clamp(36px,7vw,68px)] font-bold leading-[1.1] tracking-[-0.015em]"
          >
            <span className="hs-line hs-line-1">
              {renderTypedWords(HERO_MAIN_TEXT, 0, totalChars, false)}
            </span>
            <span className="hs-line hs-line-2 hs-accent-underline">
              {renderTypedWords(
                HERO_ACCENT_TEXT,
                HERO_MAIN_TEXT.length,
                totalChars,
                true
              )}
            </span>
          </h1>

          <div className="hs-cta-group flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-14 sm:pt-16">
            <button
              id="btn-hero-explore-projects"
              onClick={onExploreProjects}
              className="group flex items-center justify-center gap-3 bg-black hover:bg-ink text-white px-7 sm:px-8 py-4 rounded-lg font-sans text-[15px] sm:text-[16px] font-semibold tracking-wide transition-all duration-300 cursor-pointer hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(201,162,75,0.35)] active:translate-y-0 border border-gold/40"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 text-gold-light group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button
              id="btn-hero-book-consultation"
              onClick={onBookConsultation}
              className="flex items-center justify-center gap-2.5 border border-white/70 hover:border-white text-ink px-7 sm:px-8 py-4 rounded-lg font-sans text-[15px] sm:text-[16px] font-semibold tracking-wide transition-all duration-300 cursor-pointer bg-white hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
            >
              <Calendar className="w-4 h-4 text-gold-dark" />
              Book Site Visit
            </button>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM: FULL-WIDTH STATS BAR ================= */}
      <div className="hs-anim-4 relative z-20 bg-black/30 border-t border-white/10 backdrop-blur-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
          {HIGHLIGHTS.map(({ icon: Icon, label }, idx) => (
            <div
              key={idx}
              className="hs-stat-item flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-6"
              style={{ animationDelay: `${6.9 + idx * 0.12}s` }}
            >
              <span className="hs-stat-icon flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold/15 border border-gold/30 shrink-0">
                <Icon className="w-5 h-5 text-gold-light" />
              </span>
              <span className="font-sans text-[15px] sm:text-[16px] font-semibold leading-tight text-white">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}