import {
  Building2,
  Landmark,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import flagshipLayoutImg from "../../assets/about1.png";

const AboutusSection = () => {
  const stats = [
    {
      number: "1,500+",
      title: "Happy Landowners",
      icon: MapPin,
    },
    {
      number: "15+",
      title: "Sanctioned Townships",
      icon: Building2,
    },
    {
      number: "100%",
      title: "Clear Title Guarantee",
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="about-section"
      className="bg-cream py-10 md:py-20 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* ==============================
            SECTION HEADING
        ============================== */}
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
            <span>About Aryans Buildcon</span>
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-bold leading-[1.15] tracking-tight max-w-3xl">
            Verified Residential{" "}
            <span className="text-gold-dark font-semibold">Plots</span>
          </h2>

          <p className="font-sans text-base md:text-lg text-ink-soft/80 font-bold max-w-2xl leading-relaxed">
            Explore residential plots in Nagpur with clear titles, verified
            documents, and planned infrastructure for secure ownership and
            future growth.
          </p>
        </motion.div>

        {/* ==============================
            TRUST STATISTICS
        ============================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  margin: "-50px",
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative bg-white/80 border border-black/10 rounded-2xl p-3 md:p-4 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Decorative Background */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all duration-500" />

                {/* Icon */}
                <div className="relative mx-auto mb-4 w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-5 h-5 text-gold-dark" />
                </div>

                {/* Number */}
                <h3 className="relative font-serif text-3xl md:text-4xl font-bold text-ink">
                  {stat.number}
                </h3>

                {/* Title */}
                <p className="relative mt-2 font-sans text-sm md:text-base font-semibold text-ink-soft">
                  {stat.title}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ==============================
            IMAGE + CONTENT
        ============================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ==============================
              LEFT — IMAGE
          ============================== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl h-[320px] sm:h-[420px] md:h-[600px] w-full bg-black group">
              <img
                src={flagshipLayoutImg}
                alt="Aryans Buildcon residential plots in Nagpur"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-all duration-700"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Quote Box */}
              <div className="hidden md:block absolute bottom-6 left-6 right-6 bg-charcoal/90 backdrop-blur-md p-4 rounded-2xl border border-white/15 shadow-2xl">
                <p className="font-serif italic text-[14px] text-white/90 leading-relaxed font-light mb-3">
                  "Land is not just a real estate transaction—it is the
                  foundation of family security, pride, and generational
                  wealth."
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-cream-light uppercase tracking-[0.15em]">
                      Aryans Buildcon
                    </h4>

                    <p className="text-[10px] text-white/60 font-mono mt-1">
                      Nagpur's Trusted Land Developer
                    </p>
                  </div>

                  <span className="shrink-0 text-[10px] bg-gold/20 text-gold-dark border border-gold/40 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                    NMRDA Sanctioned
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-28 h-28 border border-accent-gold/30 rounded-3xl -z-10 pointer-events-none" />

            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-gold/10 rounded-full blur-2xl -z-10 pointer-events-none" />
          </motion.div>

          {/* ==============================
              RIGHT — CONTENT
          ============================== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-7 space-y-1"
          >
            {/* Company Story */}
            <div className="space-y-3  font-sans text-[15px] sm:text-[17px] text-ink-soft/90 leading-relaxed font-semibold break-all">
              <p >
                Founded in the heart of Nagpur,{" "}
                <strong className="text-gold font-bold">Aryans Buildcon</strong>{" "}
                develops residential plots with a focus on clear documentation,
                thoughtful planning, and well-connected locations. We aim to
                make plot ownership simple, transparent, and convenient for
                families planning to build their future homes.
              </p>

              <p>
                Our residential plot developments are strategically located
                across key growth corridors including{" "}
                <span className="text-gold font-bold">
                  Wardha Road, MIHAN SEZ, Samruddhi Mahamarg, Besa-Pipla
                  Corridor, and Jamtha
                </span>
                . These locations offer convenient connectivity to major roads,
                employment hubs, educational institutions, healthcare
                facilities, commercial areas, and everyday amenities.
              </p>

              <p>
                Every plotted development is thoughtfully planned with{" "}
                <strong className="text-charcoal font-bold">
                  well-defined plots, wide internal roads, essential
                  infrastructure, and open green spaces
                </strong>
                . Our focus is to create residential layouts that offer a
                comfortable environment for families while providing easy access
                to important city connections.
              </p>
            </div>

            {/* ==============================
                TRUST FEATURES
            ============================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3">
              {/* Clear Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group rounded-2xl bg-white border border-black/10 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <ShieldCheck className="w-5 h-5 text-gold-dark" />
                  </div>

                  <div>
                    <h3 className="font-sans text-lg font-bold text-ink">
                      100% Clear Title
                    </h3>

                    <p className="mt-1 font-bold text-sm text-ink-soft/80 leading-relaxed">
                      Thorough legal verification with immediate 7/12 registry.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bank Loan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.12,
                }}
                className="group rounded-2xl bg-white border border-black/10 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Landmark className="w-5 h-5 text-gold-dark" />
                  </div>

                  <div>
                    <h3 className="font-sans text-lg font-bold text-ink">
                      Bank Loan Approved
                    </h3>

                    <p className="mt-1 font-bold text-sm text-ink-soft/80 leading-relaxed">
                      Pre-approved by SBI, HDFC, ICICI & major nationalized
                      banks.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.12,
              }}
              className="group rounded-2xl bg-white border border-black/10 p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 "
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Landmark className="w-5 h-5 text-gold-dark" />
                </div>

                <div>
                  <h3 className="font-sans text-lg font-bold text-ink/90">
                    24-Month 0% Interest EMI Plan
                  </h3>

                  <p className="mt-1 font-bold text-sm text-ink-soft/80 leading-relaxed">
                    Flexible EMI facility with 0% interest and 30%–50% down
                    payment options.
                  </p>
                </div>
              </div>
            </motion.div>
            {/* ==============================
                BOTTOM TRUST STRIP
            ============================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="mt-4 flex flex-wrap items-center justify-between  gap-y-3 pt-5 border-t border-black/10"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-dark" />
                <span className="font-sans text-xs sm:text-sm font-bold text-ink-soft">
                  Verified Documentation
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-dark" />
                <span className="font-sans text-xs sm:text-sm font-bold text-ink-soft">
                  Prime Nagpur Locations
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gold-dark" />
                <span className="font-sans text-xs sm:text-sm font-bold text-ink-soft">
                  Planned Infrastructure
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutusSection;
