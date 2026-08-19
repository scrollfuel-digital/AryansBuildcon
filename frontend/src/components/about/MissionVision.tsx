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
    icon: <ShieldCheck className="w-10 h-10 text-gold-dark" />,
    title: "100% Legal Transparency",
    description:
      "Every plot is NATP / NMRDA sanctioned with clear title deeds, 7/12 extract clarity, and complete RERA compliance.",
  },
  {
    icon: <Building2 className="w-10 h-10 text-gold-dark" />,
    title: "Complete Infrastructure",
    description:
      "We provide complete site infrastructure, including asphalt roads, underground drainage, water pipelines, electric poles, and secure entrance gates.",
  },
  {
    icon: <Landmark className="w-10 h-10  text-gold-dark" />,
    title: "Instant Bank Sanctions",
    description:
      "Pre-approved plot purchase and construction loans from leading nationalized and private banks for quick processing.",
  },
  {
    icon: <HeartHandshake className="w-10 h-10 text-gold-dark" />,
    title: "End-to-End Handholding",
    description:
      "From the initial site visit and legal title verification to registry documentation and plot possession, we handle every step.",
  },
];

export default function MissionVision() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b ">
      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-accent-gold/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent-rust/10 blur-3xl" />

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 mx-auto max-w-3xl space-y-4 text-center"
      >
        <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-black md:text-5xl">
          Real Estate <span className="text-gold-dark">Excellence</span>
        </h2>

        <p className="mx-auto max-w-2xl pt-1 font-sans text-lg font-semibold leading-relaxed text-black/55">
          Guided by absolute legal integrity, engineered for generational value,
          and dedicated to elevating residential living across Nagpur.
        </p>
      </motion.div>

      {/* ================= MISSION & VISION ================= */}
      <div className="relative z-10 mt-16 grid grid-cols-1 items-stretch gap-8 md:gap-10 lg:grid-cols-2">
        {/* ================= MISSION CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative flex h-full flex-col space-y-6 overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] hover:shadow-2xl hover:shadow-accent-gold/15 md:p-11"
        >
          {/* Top Gold Border */}
          <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-accent-gold via-accent-rust to-accent-gold" />

          {/* Icon + Label */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-charcoal shadow-lg">
              <Target className="h-8 w-8 text-gold-dark" />
            </div>

            <span className="rounded-md bg-accent-gold/15 px-3.5 py-1 font-sans text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.2em] text-black/55">
              01 • Our Mission
            </span>
          </div>

          {/* Mission Content */}
          <div className="flex-1 space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal md:text-2xl">
              Master-Planned Legal Excellence
            </h3>

            <p className="font-sans text-lg font-medium leading-relaxed text-black/50">
              To empower every family and investor in Nagpur with 100% legal,
              clear-title, and NMRDA/NATP sanctioned residential plots equipped
              with world-class infrastructure, enabling them to build their
              dream homes with total confidence.
            </p>
          </div>

          {/* Mission Badges */}
          <div className="grid grid-cols-1 gap-2 border-t border-black/10 pt-4 text-sm font-sans font-medium text-charcoal sm:grid-cols-3">
            {["100% Clear Title", "NMRDA Approved", "Instant Registry"].map(
              (t) => (
                <div
                  key={t}
                  className="flex items-center gap-1.5 rounded-xl border border-black/5 bg-[#FAF7F2] px-3 py-2 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-gold" />
                  <span>{t}</span>
                </div>
              ),
            )}
          </div>
        </motion.div>

        {/* ================= VISION CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.85,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative flex h-full flex-col space-y-6 overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] hover:shadow-2xl hover:shadow-accent-gold/15 md:p-11"
        >
          {/* Top Gold/Rust Border */}
          <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-accent-rust via-accent-gold to-accent-rust" />

          {/* Icon + Label */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-charcoal shadow-lg">
              <Eye className="h-8 w-8 text-gold-dark" />
            </div>

            <span className="rounded-md bg-accent-gold/15 px-3.5 py-1 font-sans text-[15px] font-bold uppercase tracking-[0.2em] text-black/55">
              02 • Our Vision
            </span>
          </div>

          {/* Vision Content */}
          <div className="flex-1 space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal md:text-2xl">
              Central India's Benchmark Developer
            </h3>

            <p className="font-sans text-lg font-medium leading-relaxed text-black/50">
              Aryans Buildcon is committed to developing trusted residential
              communities across Central India with quality infrastructure,
              transparent planning, strategic locations, and lasting property
              value growth.
            </p>
          </div>

          {/* Vision Badges */}
          <div className="grid grid-cols-1 gap-2 border-t border-black/10 pt-4 text-sm font-sans font-medium text-charcoal sm:grid-cols-3">
            {[
              "Growth Corridors",
              "Eco Infrastructure",
              "High Appreciation",
            ].map((t) => (
              <div
                key={t}
                className="flex items-center gap-1.5 rounded-xl border border-black/5 bg-[#FAF7F2] px-3 py-2 shadow-sm"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-gold" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ================= CORE VALUES ================= */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 mt-30"
      >
        {/* Core Values Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
            What Guides Us
          </span>

          <h3 className="mt-3 font-serif text-3xl font-bold text-charcoal md:text-4xl">
            Our Core Values
          </h3>

          <p className="mx-auto max-w-2xl pt-1 font-sans text-lg font-semibold leading-relaxed text-black/55">
            The principles that shape how we plan, develop, and build lasting
            relationships with our customers.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((value, index) => (
            <motion.article
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent-gold/10"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal transition-transform duration-300 group-hover:scale-110">
                {value.icon}
              </div>

              {/* Title */}
              <h4 className="mt-5 font-serif text-xl font-bold text-charcoal">
                {value.title}
              </h4>

              {/* Description */}
              <p className="mt-3 flex-1 font-sans text-sm font-medium leading-6 text-black/55">
                {value.description}
              </p>

              {/* Bottom Accent */}
              <div className="mt-5 h-0.5 w-0 bg-accent-gold transition-all duration-500 group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </motion.div>

      {/* ================= BOTTOM STATEMENT ================= */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto mt-16 max-w-4xl text-center"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />

        <p className="px-4 pt-8 font-serif text-xl font-semibold leading-relaxed text-charcoal md:text-2xl">
          "Thoughtful planning today creates stronger communities for tomorrow."
        </p>
      </motion.div>
    </div>
  );
}
