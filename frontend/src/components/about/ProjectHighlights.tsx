import { motion } from "motion/react";
import { Building2, FileCheck, Scaling, ShieldCheck } from "lucide-react";

const features = [
  { label: "Approved Residential Layout", icon: <FileCheck className="w-4 h-4 text-accent-gold" /> },
  { label: "Ready-to-Register Plots", icon: <ShieldCheck className="w-4 h-4 text-accent-gold" /> },
  { label: "Bank Finance Available", icon: <Building2 className="w-4 h-4 text-accent-gold" /> },
  { label: "Wide Internal Roads", icon: <Scaling className="w-4 h-4 text-accent-gold" /> },
  { label: "Open Spaces", icon: <FileCheck className="w-4 h-4 text-accent-gold" /> },
  { label: "Excellent Road Connectivity", icon: <ShieldCheck className="w-4 h-4 text-accent-gold" /> },
  { label: "Peaceful Residential Environment", icon: <Building2 className="w-4 h-4 text-accent-gold" /> },
  { label: "Ideal for Home Construction", icon: <Scaling className="w-4 h-4 text-accent-gold" /> },
  { label: "Investment-Friendly Location", icon: <FileCheck className="w-4 h-4 text-accent-gold" /> },
  { label: "Future Growth Potential", icon: <ShieldCheck className="w-4 h-4 text-accent-gold" /> },
];

export default function ProjectHighlights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#EFDFD6] border border-charcoal/15 rounded-[2rem] p-6 md:p-9 shadow-[0_16px_48px_rgba(43,27,18,0.08)] hover:shadow-[0_24px_64px_rgba(43,27,18,0.15)] hover:border-accent-gold/40 transition-all duration-500 flex flex-col gap-6 group relative overflow-hidden"
    >
      {/* Top accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold via-accent-rust to-accent-gold rounded-t-[2rem]" />

      {/* Sanction badge */}
      <div className="absolute top-5 right-5">
        <span className="bg-charcoal/90 backdrop-blur-md text-white border border-white/10 px-3 py-1.5 rounded-full font-sans text-[10px] font-medium uppercase tracking-[0.14em] shadow-md flex items-center gap-1.5">
          <Building2 className="w-3 h-3 text-accent-gold" /> Project Features
        </span>
      </div>

      {/* Header */}
      <div className="space-y-2 pt-2">
        <span className="font-sans text-[10px] font-semibold text-accent-rust uppercase tracking-[0.22em]">
          Infrastructure & Amenities
        </span>
        <h2 className="font-serif text-2xl md:text-3xl text-charcoal font-light leading-tight">
          Project <span className="italic text-accent-rust">Highlights</span>
        </h2>
        <p className="font-sans text-sm text-grey font-light leading-relaxed">
          Every Aryans Buildcons project is developed with future-ready infrastructure and customer convenience in mind.
        </p>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {features.map((f, idx) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="flex items-center gap-2.5 bg-white/80 hover:bg-white px-3.5 py-2.5 rounded-xl border border-black/5 shadow-sm hover:shadow-md hover:border-accent-gold/30 transition-all duration-300"
          >
            {f.icon}
            <span className="font-sans text-xs text-charcoal font-medium">{f.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-sans font-semibold text-accent-gold uppercase tracking-wider">
        <span>NMRDA Sanctioned Layout</span>
        <span>✦</span>
      </div>
    </motion.div>
  );
}
