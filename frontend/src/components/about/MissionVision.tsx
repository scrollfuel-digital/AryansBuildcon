import { motion } from "motion/react";
import {
  ShieldCheck,
  Landmark,
  CheckCircle2,
  Target,
  Eye,
  Building2,
  HeartHandshake,
} from "lucide-react";

const coreValues = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-accent-gold" />,
    title: "100% Legal Transparency",
    description:
      "Every plot is NATP / NMRDA sanctioned with clear title deeds, 7/12 extract clarity, and complete RERA compliance.",
  },
  {
    icon: <Building2 className="w-5 h-5 text-accent-gold" />,
    title: "Turnkey Infrastructure",
    description:
      "We deliver complete infrastructure—asphalt tar roads, underground drainage, water pipelines, electric poles, and entrance gates.",
  },
  {
    icon: <Landmark className="w-5 h-5 text-accent-gold" />,
    title: "Instant Bank Sanctions",
    description:
      "Pre-approved plot purchase and construction loans from leading nationalized & private banks for quick processing.",
  },
  {
    icon: <HeartHandshake className="w-5 h-5 text-accent-gold" />,
    title: "End-to-End Handholding",
    description:
      "From initial site visit, legal title verification, registry documentation to plot possession—we handle every step.",
  },
];

const romans = ["I", "II", "III", "IV"];
const badges = [
  "RERA Sanctioned",
  "Tar Roads & Drainage",
  "SBI & HDFC Approved",
  "Dedicated Support",
];

export default function MissionVision() {
  return (
    <div className="bg-gradient-to-b from-white via-[#FAF7F2] to-white rounded-3xl p-8 md:p-14 border border-accent-gold/40 shadow-2xl space-y-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-rust/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto space-y-4 relative z-10"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-bold tracking-tight leading-tight">
          Mission, Vision &{" "}
          <span className="text-accent-rust italic font-normal">
            Core Pillars
          </span>
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent mx-auto" />
        <p className="font-sans text-lg md:text-lg text-grey font-light leading-relaxed max-w-2xl mx-auto pt-1">
          Guided by absolute legal integrity, engineered for generational value,
          and dedicated to elevating residential living across Nagpur.
        </p>
      </motion.div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 relative z-10">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white p-8 md:p-11 rounded-3xl border-2 border-accent-gold/30 hover:border-accent-gold transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-accent-gold/15 hover:-translate-y-2 hover:scale-[1.015] space-y-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-gold via-accent-rust to-accent-gold" />
          <div className="flex items-start justify-between gap-4">
            <div className="w-16 h-16 bg-charcoal text-accent-gold rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-accent-gold group-hover:text-white transition-all duration-300">
              <Target className="w-8 h-8" />
            </div>
            <span className="px-3.5 py-1 bg-accent-gold/15 border border-accent-gold/30 rounded-full font-sans text-[10px] font-bold text-charcoal uppercase tracking-[0.2em]">
              01 • Our Mission
            </span>
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal font-bold">
              Master-Planned Legal Excellence
            </h3>
            <p className="font-sans text-lg md:text-lg text-grey leading-relaxed font-light">
              To empower every family and investor in Nagpur with 100% legal,
              clear-title, and NMRDA/NATP sanctioned residential plots equipped
              with world-class infrastructure, enabling them to build their
              dream homes with total confidence.
            </p>
          </div>
          <div className="pt-4 border-t border-black/10 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm font-sans font-medium text-charcoal">
            {["100% Clear Title", "NMRDA Approved", "Instant Registry"].map((t) => (
              <div key={t} className="flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-2 rounded-xl border border-black/5 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white p-8 md:p-11 rounded-3xl border-2 border-accent-gold/30 hover:border-accent-gold transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-accent-gold/15 hover:-translate-y-2 hover:scale-[1.015] space-y-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-rust via-accent-gold to-accent-rust" />
          <div className="flex items-start justify-between gap-4">
            <div className="w-16 h-16 bg-charcoal text-accent-gold rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-accent-gold group-hover:text-white transition-all duration-300">
              <Eye className="w-8 h-8" />
            </div>
            <span className="px-3.5 py-1 bg-accent-gold/15 border border-accent-gold/30 rounded-full font-sans text-[10px] font-bold text-charcoal uppercase tracking-[0.2em]">
              02 • Our Vision
            </span>
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal font-bold">
              Central India's Benchmark Developer
            </h3>
            <p className="font-sans text-lg md:text-lg text-grey leading-relaxed font-light">
              To be Central India's most trusted real estate layout
              developer—renowned for pioneering legal transparency, sustainable
              urban layout designs, and creating high-appreciation residential
              communities across strategic growth corridors.
            </p>
          </div>
          <div className="pt-4 border-t border-black/10 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm font-sans font-medium text-charcoal">
            {["Growth Corridors", "Eco Infrastructure", "High Appreciation"].map((t) => (
              <div key={t} className="flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-2 rounded-xl border border-black/5 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 4 Pillars */}
      <div className="space-y-8 pt-4 relative z-10">
        <div className="text-center space-y-2">
          <span className="font-sans text-lg font-bold uppercase tracking-[0.25em] text-accent-rust block">
            The Four Pillars of Aryans Buildcon
          </span>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">
            Unmatched Standards of Quality & Legal Rigor
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-7 rounded-2xl border border-black/10 hover:border-accent-gold transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-accent-gold/20 hover:-translate-y-2 hover:scale-[1.02] space-y-5 relative group overflow-hidden"
            >
              <div className="absolute top-3 right-4 font-serif text-4xl font-bold text-accent-gold/15 select-none pointer-events-none group-hover:text-accent-gold/30 transition-colors">
                {romans[idx]}
              </div>
              <div className="p-3 bg-[#FAF7F2] border border-accent-gold/30 rounded-xl w-fit group-hover:bg-charcoal group-hover:text-accent-gold transition-colors duration-300 shadow-xs">
                {val.icon}
              </div>
              <div className="space-y-3 pt-1">
                <h4 className="font-serif text-2xl text-charcoal font-bold group-hover:text-accent-rust transition-colors">
                  {val.title}
                </h4>
                <p className="font-sans text-sm text-grey font-light leading-relaxed">
                  {val.description}
                </p>
              </div>
              <div className="pt-3 border-t border-black/5 flex items-center justify-between text-[12px] font-sans font-semibold text-accent-gold uppercase tracking-wider">
                <span>{badges[idx]}</span>
                <span>✦</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
