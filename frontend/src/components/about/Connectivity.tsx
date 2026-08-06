import { motion } from "motion/react";
import { MapPin, Navigation, Compass } from "lucide-react";

const landmarks = [
  { label: "Wardha–Nagpur Road", type: "Highway" },
  { label: "Butibori MIDC", type: "Industry" },
  { label: "MIHAN", type: "SEZ" },
  { label: "Nagpur Airport", type: "Transport" },
  { label: "Chinchbhavan Metro Station", type: "Metro" },
  { label: "IIT Nagpur", type: "Education" },
  { label: "Mountfort School", type: "School" },
  { label: "Suretech Hospital", type: "Health" },
  { label: "Pallotti College", type: "College" },
  { label: "GPCE College", type: "College" },
  { label: "Hingna MIDC", type: "Industry" },
  { label: "Mumbai Samruddhi Expressway", type: "Highway" },
];

const typeColors: Record<string, string> = {
  Highway: "text-accent-gold bg-accent-gold/15 border-accent-gold/30",
  Industry: "text-blue-300 bg-blue-400/10 border-blue-400/20",
  SEZ: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
  Transport: "text-purple-300 bg-purple-400/10 border-purple-400/20",
  Metro: "text-purple-300 bg-purple-400/10 border-purple-400/20",
  Education: "text-sky-300 bg-sky-400/10 border-sky-400/20",
  School: "text-sky-300 bg-sky-400/10 border-sky-400/20",
  College: "text-sky-300 bg-sky-400/10 border-sky-400/20",
  Health: "text-rose-300 bg-rose-400/10 border-rose-400/20",
};

export default function Connectivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#181512] border border-white/10 rounded-[2rem] p-6 md:p-9 shadow-[0_16px_48px_rgba(43,27,18,0.2)] hover:shadow-[0_24px_64px_rgba(43,27,18,0.35)] hover:border-accent-gold/30 transition-all duration-500 flex flex-col gap-6 group relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent-gold/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-rust/10 blur-[60px] rounded-full pointer-events-none" />

      {/* Top accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold via-accent-rust to-accent-gold rounded-t-[2rem]" />

      {/* Location badge */}
      <div className="absolute top-5 right-5 z-10">
        <span className="bg-accent-gold/20 backdrop-blur-md text-accent-gold border border-accent-gold/30 px-3 py-1.5 rounded-full font-sans text-[10px] font-semibold uppercase tracking-[0.14em] shadow-md flex items-center gap-1.5">
          <Navigation className="w-3 h-3" /> Nagpur
        </span>
      </div>

      {/* Header */}
      <div className="flex items-start gap-4 pt-2 relative z-10">
        <div className="w-14 h-14 bg-accent-gold/20 border border-accent-gold/30 text-accent-gold rounded-2xl flex items-center justify-center shadow-lg shrink-0 group-hover:bg-accent-gold group-hover:text-white transition-all duration-300">
          <Compass className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <span className="font-sans text-[10px] font-semibold text-accent-gold uppercase tracking-[0.22em] block">
            Nearby Landmarks
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-cream font-light leading-tight">
            Excellent <span className="italic text-accent-gold">Connectivity</span>
          </h2>
        </div>
      </div>

      <p className="font-sans text-sm text-white/60 font-light leading-relaxed relative z-10">
        Location is the biggest advantage of any real estate investment. Our projects enjoy connectivity to major roads, industries, educational institutions, hospitals, and transport hubs.
      </p>

      {/* Landmarks grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 relative z-10">
        {landmarks.map((l, idx) => (
          <motion.div
            key={l.label}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.04 }}
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/8 hover:border-accent-gold/20 px-3.5 py-2.5 rounded-xl transition-all duration-300 group/item"
          >
            <div className="flex items-center gap-2.5">
              <MapPin className="w-3.5 h-3.5 text-accent-gold shrink-0" />
              <span className="font-sans text-xs text-white/80 font-light">{l.label}</span>
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border hidden sm:block ${typeColors[l.type] ?? "text-white/40 bg-white/5 border-white/10"}`}>
              {l.type}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-sans font-semibold text-accent-gold uppercase tracking-wider relative z-10">
        <span>12 Key Locations</span>
        <span>✦</span>
      </div>
    </motion.div>
  );
}
