import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { services } from "../../data";
import { Sparkles, ArrowRight, ShieldCheck, Clock, Hammer } from "lucide-react";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);
  const navigate = useNavigate();

  return (
    <section
      id="services-section"
      className="py-14 md:py-22 bg-[#FAF8F4] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center space-y-4 mb-16 md:mb-24"
        >
          <span className="font-sans text-[11px] font-medium text-accent-gold uppercase tracking-[0.24em] block">
            ✦ Development Strengths
          </span>

          <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-light leading-tight tracking-tight">
            Premium Residential<span className="italic text-accent-gold"> Plots
            </span>
          </h2>

          <p className="font-sans text-sm text-grey leading-relaxed max-w-lg mx-auto font-light pt-2">
            Finding the perfect plot is about more than location—it's about
            choosing a place where your future can grow. At Aryans Buildcons, we
            develop residential plotted communities that offer lasting value,
            planning, and peace of mind.
          </p>
        </motion.div>

        {/* Dual-Column Interactive Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Accoridon Selection List */}
          <div className="lg:col-span-7 space-y-6">
            {services.map((service, idx) => {
              const isOpen = activeService === idx;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setActiveService(idx)}
                  className={`border-b border-black/10 pb-6 cursor-pointer group transition-all duration-300`}
                >
                  {/* Top Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span
                        className={`font-serif text-lg md:text-xl transition-all duration-300 ${
                          isOpen
                            ? "text-accent-gold font-medium"
                            : "text-grey/40 group-hover:text-charcoal"
                        }`}
                      >
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
                      </span>
                      <h3
                        className={`font-serif text-xl md:text-2xl font-light transition-all duration-300 ${
                          isOpen ? "text-accent-gold" : "text-charcoal"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <div
                      className={`p-2 rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "bg-accent-gold border-accent-gold text-white rotate-90"
                          : "border-black/10 text-grey group-hover:text-charcoal group-hover:border-charcoal"
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Body Content with Motion Height */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden pl-12 space-y-4"
                      >
                        <p className="font-sans text-sm text-grey leading-relaxed font-light">
                          {service.description}
                        </p>

                        <div className="flex items-center gap-2 text-accent-gold font-sans text-xs uppercase tracking-[0.12em] font-medium py-1">
                          <Clock className="w-4 h-4" /> Timeframe:{" "}
                          {service.duration}
                        </div>

                        {/* Deliverables */}
                        <div className="space-y-2 pt-2">
                          <span className="font-sans text-[10px] font-medium text-charcoal uppercase tracking-[0.15em] block">
                            Key Deliverables:
                          </span>
                          <ul className="space-y-1.5">
                            {service.deliverables.map((del, dIdx) => (
                              <li
                                key={dIdx}
                                className="flex items-start gap-2.5 font-sans text-xs text-grey font-light"
                              >
                                <span className="text-accent-gold mt-1">✦</span>
                                {del}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Visual Showcase Card Sync with State */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[450px] lg:h-[550px] w-full rounded-2xl overflow-hidden shadow-2xl ">
              {/* Overlay graphics */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-[#FAF8F4]/80 backdrop-blur-md border border-white/20 py-2 px-4 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                <span className="font-sans text-[10px] uppercase tracking-[0.12em] font-medium text-charcoal">
                  Premium Land Standards
                </span>
              </div>

              {/* Seamless image switching with animation */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeService}
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Bottom detail vignette */}
              <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

              {/* Active description card */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="font-sans text-[11px] font-medium text-accent-gold uppercase tracking-[0.2em] mb-1">
                  Aryans Buildcons Signature
                </p>
                <h4 className="font-serif text-xl text-white font-light tracking-wide">
                  {services[activeService].title}
                </h4>
              </div>
            </div>

            {/* Float details behind the card */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-gold/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent-gold/5 rounded-full blur-2xl pointer-events-none" />
          </motion.div>
        </div>

        {/* Dynamic quote/highlight */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 border border-black/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between bg-white/40"
        >
          <div className="space-y-2">
            <h4 className="font-serif text-2xl text-charcoal font-light">
              Are you ready to secure your plot today?
            </h4>
            <p className="font-sans text-sm text-grey font-light">
              We provide full documentation assistance, legal verification
              checks, and easy bank loan approvals.
            </p>
          </div>
          <button
            onClick={() => navigate("/contact")}
            className="rounded-full bg-charcoal hover:bg-accent-gold text-white hover:shadow-lg hover:-translate-y-[1px] px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.14em] whitespace-nowrap cursor-pointer transition-all duration-300"
          >
            Book Site Visit
          </button>
        </motion.div>
      </div>
    </section>
  );
}
