import { motion } from "motion/react";
import { ShieldCheck, CheckCircle2, Award } from "lucide-react";

const strengths = [
  { label: "Premium Residential Plot Developments", icon: "🏡" },
  { label: "Legally Verified Properties", icon: "⚖️" },
  { label: "Ready-to-Register Plots", icon: "📋" },
  { label: "Bank Finance Support", icon: "🏦" },
  { label: "Prime Growth Corridors", icon: "📈" },
  { label: "Wide Internal Roads", icon: "🛣️" },
  { label: "Planned Layouts", icon: "🗺️" },
  { label: "Transparent Documentation", icon: "📄" },
  { label: "Customer-Centric Approach", icon: "🤝" },
  { label: "Professional Assistance from Inquiry to Registration", icon: "✅" },
];

export default function WhyChooseUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className=" rounded-[2rem] p-6 md:p-9  hover:border-accent-gold/30 transition-all duration-500 flex flex-col gap-6 group relative overflow-hidden"
    >
      
    
      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-gold/20 bg-accent-gold/10 px-5 py-2">
          <Award className="w-4 h-4 text-accent-gold" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-accent-gold">
            Our Strengths
          </span>
        </div>

        <h2 className="mt-6 font-serif text-3xl md:text-5xl font-light text-cream leading-tight">
          Why Choose{" "}
          <span className="italic text-accent-gold">Aryans Buildcons?</span>
        </h2>

        <p className="mt-5 text-white/70 text-base leading-7 max-w-2xl mx-auto">
          Buying land is one of life's biggest investments. We combine
          transparency, legal assurance, and expert guidance to deliver a
          seamless property buying experience you can trust.
        </p>

       
      </div>

      {/* Strength Cards */}
      <div className="relative z-10 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {strengths.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.06,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -8,
            }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-center transition-all duration-500 hover:border-accent-gold/40 hover:bg-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          >
            {/* Number */}
            <span className="absolute top-4 right-5 text-5xl font-serif text-accent-gold/10 group-hover:text-accent-gold/20 transition">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-gold/10 text-3xl transition-all duration-300 group-hover:bg-accent-gold group-hover:scale-110">
              <span className="group-hover:scale-110 transition">
                {item.icon}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-6 text-lg font-medium text-cream leading-7">
              {item.label}
            </h3>

            {/* Bottom Accent */}
            <div className="mt-6 mx-auto h-[2px] w-0 bg-gradient-to-r from-accent-gold to-accent-rust transition-all duration-500 group-hover:w-20" />
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
}
