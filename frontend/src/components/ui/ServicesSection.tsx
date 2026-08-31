import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { services } from "../../data";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Hammer,
  MapPin,
  FileCheck2,
  Building2,
} from "lucide-react";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);
  const navigate = useNavigate();

  return (
    <section
      id="services-section"
      className="py-16 md:py-24 bg-cream overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center text-center gap-5 mb-12 md:mb-16"
        >
          <span className="font-sans text-[12px] sm:text-[14px] font-bold text-gold-dark uppercase tracking-[0.24em] inline-flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span> Development Strengths</span>
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-bold leading-[1.15] tracking-tight max-w-3xl">
            Premium Residential{" "}
            <span className="text-gold-dark font-semibold">Plots</span>
          </h2>

          <p className="font-sans text-base md:text-lg text-ink-soft/80 font-bold max-w-2xl leading-relaxed break-all">
            Finding the perfect plot is about more than location—it's about
            choosing a place where your future can grow. At Aryans Buildcon, we
            develop residential plotted communities that offer lasting value,
            thoughtful planning, and peace of mind.
          </p>
        </motion.div>

        {/* =========================================
            MAIN SERVICE AREA
        ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* =====================================
              LEFT — SERVICES ACCORDION
          ===================================== */}
          <div className="lg:col-span-7 space-y-2">
            {services.map((service, idx) => {
              const isOpen = activeService === idx;

              return (
                <motion.div
                  key={service.id}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-40px",
                  }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setActiveService(idx)}
                  className={`group cursor-pointer border-b border-border transition-all duration-500 ${
                    isOpen ? "pb-7" : "pb-6"
                  }`}
                >
                  {/* =============================
                      SERVICE HEADER
                  ============================= */}
                  <div className="flex items-center justify-between gap-5">
                    {/* Number + Title */}
                    <div className="flex items-center gap-5 md:gap-7 min-w-0">
                      <span
                        className={`font-medium text-xl md:text-2xl transition-all duration-300 shrink-0 ${
                          isOpen
                            ? "text-gold-dark"
                            : "text-ink-faint group-hover:text-ink"
                        }`}
                      >
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
                      </span>

                      <h3
                        className={`font-serif text-xl md:text-3xl font-medium transition-all duration-300 truncate ${
                          isOpen
                            ? "text-gold-dark"
                            : "text-ink group-hover:text-gold-dark"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Arrow */}
                    <div
                      className={`shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        isOpen
                          ? "bg-gold-dark border-gold-dark text-white rotate-90"
                          : "border-border text-ink-faint group-hover:border-gold-dark group-hover:text-gold-dark"
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* =============================
                      EXPANDED CONTENT
                  ============================= */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                          marginTop: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          marginTop: 18,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          marginTop: 0,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden pl-12 md:pl-14 pr-2"
                      >
                        {/* Description */}
                        <p className="font-medium text-[14px] sm:text-[16px] text-ink-soft leading-relaxed font-light max-w-2xl">
                          {service.description}
                        </p>

                        {/* Duration */}
                        <div className="flex items-center gap-2 text-gold-dark font-medium text-[11px] uppercase tracking-[0.13em] font-medium mt-5">
                          <Clock className="w-4 h-4" />

                          <span>Timeframe: {service.duration}</span>
                        </div>

                        {/* Deliverables */}
                        <div className="mt-5">
                          <div className="flex items-center gap-2 mb-3">
                            <FileCheck2 className="w-4 h-4 text-gold-dark" />

                            <span className="font-sans text-[11px] font-medium text-ink uppercase tracking-[0.15em]">
                              Key Deliverables
                            </span>
                          </div>

                          <ul className="space-y-2">
                            {service.deliverables.map((del, dIdx) => (
                              <li
                                key={dIdx}
                                className="flex items-start gap-3 font-sans text-[14px] sm:text-[15px] text-ink-soft font-medium"
                              >
                                <span className="text-gold-dark mt-0.5">✦</span>

                                <span>{del}</span>
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

          {/* =====================================
              RIGHT — VISUAL SHOWCASE
          ===================================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              margin: "-60px",
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5 relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-28 h-28 border border-gold/25 rounded-3xl -z-10" />

            <div className="absolute -bottom-7 -right-7 w-32 h-32 bg-gold/10 rounded-full blur-3xl -z-10" />

            {/* Image Card */}
            <div className="relative h-[340px] sm:h-[460px] lg:h-[560px] w-full rounded-2xl overflow-hidden shadow-2xl border border-border bg-black">
              

              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeService}
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  referrerPolicy="no-referrer"
                  initial={{
                    opacity: 0,
                    scale: 1.06,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              {/* Bottom Content */}
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <div className="bg-black/45 backdrop-blur-md border border-white/15 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-light" />

                    <p className="font-sans text-[9px] sm:text-[10px] font-medium text-gold-light uppercase tracking-[0.2em]">
                      Aryans Buildcon Signature
                    </p>
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl text-white font-light tracking-wide">
                    {services[activeService].title}
                  </h4>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        
      </div>
    </section>
  );
}
