import { motion } from "motion/react";
import founderImg from "../../assets/ratnakar-sir.png";
import { Sparkles } from "lucide-react";

export default function FounderStory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className=" text-black rounded-3xl p-8 md:p-14 border border-white/10  relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-accent-gold/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        {/* Founder Image */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative rounded-2xl overflow-hidden border border-accent-gold/30 shadow-2xl bg-[#221e1a]">
            <img
              src={founderImg}
              alt="Founder & Managing Director - Aryans Buildcon"
              className="w-full h-[450px] md:h-[520px] object-cover object-top filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181512] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <span className="text-[12px] font-bold text-cream/90 uppercase tracking-[0.2em] font-mono">
                Founder & Managing Director
              </span>
              <h3 className="font-serif text-2xl text-cream font-semibold leading-tight tracking-tight">
                Mr. Ratnakar Nagpure
              </h3>
              <p className="text-lg text-white/60 font-medium font-sans">
                Visionary Leader & Chief Real Estate Strategist
              </p>
            </div>
          </div>
        </div>

        {/* Founder Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="font-sans text-[12px] sm:text-[14px] font-bold text-gold-dark uppercase tracking-[0.24em] inline-flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Leadership Vision</span>
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-black font-bold leading-tight">
              The Founder's Story: <br />
              <span className=" text-accent-gold">
                Building Trust in Every Acre
              </span>
            </h2>
          </div>

          <div className="space-y-4 text-lg md:text-lg text-black/70 font-semibold leading-relaxed">
            <p>
              The story of{" "}
              <strong className="text-accent-gold">Aryans Buildcon</strong>{" "}
              began with a clear vision to bring{" "}
              <strong className="text-accent-gold">
                trust, transparency, and professionalism
              </strong>{" "}
              to Nagpur's evolving real estate landscape.
            </p>

            <p>
              Founded by{" "}
              <strong className="text-accent-gold">Mr. Ratnakar Nagpure</strong>
              , Aryans Buildcon was established with a strong belief that real
              estate should be built on integrity, quality, and long-term
              customer relationships. His commitment to responsible development
              continues to shape the company's approach to every project and
              customer interaction.
            </p>

            <p>
              Under his visionary leadership,{" "}
              <strong className="text-accent-gold">Aryans Buildcon</strong> has
              focused on delivering{" "}
              <span className="text-accent-gold font-semibold">
                quality-driven development, transparent processes, reliable
                infrastructure, and customer-focused services
              </span>
              . Today, the company continues to contribute to Nagpur's growing
              real estate sector with a commitment to excellence, credibility,
              and lasting value.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
