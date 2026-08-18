import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Landmark,
  ArrowRight,
  Phone,
  CalendarCheck,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import flagshipLayoutImg from "../../assets/about.png";
import WhyInvest from "./WhyInvest";
import WhyChooseUs from "./WhyChooseUs";
import ProjectHighlights from "./ProjectHighlights";
import Connectivity from "./Connectivity";
import ServicesSection from "../ui/ServicesSection";

const buyingSteps = [
  { step: "01", title: "Contact Our Experts" },
  { step: "02", title: "Schedule a Site Visit" },
  { step: "03", title: "Select Your Preferred Plot" },
  { step: "04", title: "Document Verification" },
  { step: "05", title: "Easy Registration" },
  { step: "06", title: "Start Building Your Future" },
];

const faqs = [
  {
    q: "Are all plots legally verified?",
    a: "Yes. Every project is supported by clear legal documentation.",
  },
  {
    q: "Are the plots ready for registration?",
    a: "Yes. We offer ready-to-register residential plots.",
  },
  {
    q: "Is bank finance available?",
    a: "Yes. Finance assistance is available for eligible buyers.",
  },
  {
    q: "Can I build my own home?",
    a: "Absolutely. Our residential plots give you the freedom to design and build according to your preferences.",
  },
  {
    q: "Why should I invest now?",
    a: "Nagpur continues to grow with expanding infrastructure, industrial development, and improved connectivity, making residential land a strong long-term investment.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-black/10 rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-15 py-5 bg-white hover:bg-[#FAF7F2] transition-colors">
        <span className="font-sans text-[13px] sm:text-[20px] font-medium text-charcoal">
          {q}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-accent-gold shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-accent-gold shrink-0" />
        )}
      </div>
      {open && (
        <div className="px-5 pb-5 bg-white border-t border-black/5">
          <p className="font-sans text-[10px] sm:text-[15px] text-grey font-semibold leading-relaxed pt-3">
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function CompanyOverview() {
  const navigate = useNavigate();
  return (
    <div className="space-y-30 bg-cream">
      <ServicesSection />
      <WhyInvest />

      {/* ── 5: Buying Process ── */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-10"
      >
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
            <span> Simple & Transparent</span>
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-bold leading-[1.15] tracking-tight max-w-3xl">
            Our Simple{" "}
            <span className="text-gold-dark font-semibold">Buying Process</span>
          </h2>
        </motion.div>

        <div
          className="
    flex gap-4 overflow-x-auto snap-x snap-mandatory
    pb-4 -mx-4 px-4
    sm:grid sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-6
    sm:gap-10 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0
    scrollbar-hide
  "
        >
          {buyingSteps.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
        relative
        min-w-[75%]
        snap-center
        bg-white rounded-2xl p-5
        border border-black/10
        shadow-md text-center space-y-3
        group
        hover:border-accent-gold
        hover:-translate-y-1
        transition-all duration-300

        sm:min-w-0
      "
            >
              <div className="w-10 h-10 bg-charcoal text-black rounded-xl flex items-center justify-center font-serif text-2xl font-bold mx-auto transition-colors duration-300">
                {s.step}
              </div>

              <p className="font-sans text-sm text-charcoal font-medium leading-snug">
                {s.title}
              </p>

              {idx < buyingSteps.length - 1 && (
                <ArrowRight className="w-3.5 h-5.5 text-accent-gold/40 absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── 6: FAQ ── */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
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
            <span> Got Questions?</span>
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-bold leading-[1.15] tracking-tight max-w-3xl">
            Frequently Asked{" "}
            <span className="text-gold-dark font-semibold">Questions</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-3">
          {faqs.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </motion.div>

      {/* ── 7: CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#181512] text-white rounded-3xl p-8 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden text-center"
      >
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent-gold/15 blur-[100px] rounded-full pointer-events-none" />

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
            <span> Take the First Step</span>
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream font-bold leading-[1.15] tracking-tight max-w-3xl">
            Let's Build Your{" "}
            <span className="text-gold-dark font-semibold">
              Future Together
            </span>
          </h2>
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <p className="font-sans text-[13px] sm:text-[17px] text-white/70 font-semibold leading-relaxed">
              Every successful journey begins with a single step. Take the first
              step toward owning a premium residential plot with Aryans
              Buildcons. Whether you're investing for tomorrow or planning your
              forever home, we're here to guide you at every stage.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 w-full sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
              <a
                href="tel:+918767010825"
                className="flex items-center justify-center gap-2 bg-cream text-black px-4 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Call Today</span>
              </a>

              <button
                onClick={() => navigate("/contact")}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-[0.08em] whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>Book Site Visit</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
