import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import bgVideo from "../../assets/video.mp4";

interface VideoIntroProps {
  onComplete: () => void;
}

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Auto-dismiss intro video after 6 seconds if not manually skipped or ended
    const timer = setTimeout(() => {
      handleExit();
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleExit = () => {
    setIsActive(false);
    // Let the animation complete before firing onComplete
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          id="video-intro-overlay"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080808] overflow-hidden"
        >
          {/* Top Vignette */}
          <div
            id="vignette-top"
            className="absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-[#080808]/80 via-[#080808]/40 to-transparent pointer-events-none z-10"
          />

          {/* Bottom Vignette */}
          <div
            id="vignette-bottom"
            className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent pointer-events-none z-10"
          />

          {/* Intro Premium Aerial Video Element */}
          <video
            id="intro-video"
            autoPlay
            muted
            playsInline
            onEnded={handleExit}
            onError={handleExit}
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>

          {/* Skip Intro Button */}
          <button
            onClick={handleExit}
            className="absolute top-6 right-6 z-30 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white/90 hover:text-white text-xs font-sans font-medium uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border border-white/20 transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
          >
            Skip Intro
          </button>

          {/* Luxury Minimalist Text Overlay (No Logo Image) */}
          <motion.div
            id="luxury-title-overlay"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 left-8 right-8 md:bottom-20 md:left-16 z-20 pointer-events-none max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/20 border border-accent-gold/40 backdrop-blur-md text-accent-gold text-[10px] font-sans font-semibold uppercase tracking-[0.25em]">
                <Sparkles className="w-3 h-3 text-accent-gold animate-spin" style={{ animationDuration: '4s' }} />
                Luxury Estate Layouts
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-[-0.02em] leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              ARYANS BUILDCON
            </h1>
            <p className="font-sans text-xs md:text-sm text-white/80 font-light uppercase tracking-[0.25em] mt-2 drop-shadow-md">
              A Tradition of Trust & Luxury Plotted Living
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
