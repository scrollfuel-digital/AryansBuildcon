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
      <div className="flex items-center justify-between p-5 bg-white hover:bg-[#FAF7F2] transition-colors">
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
          <p className="font-sans text-[13px] sm:text-[17px] text-grey font-light leading-relaxed pt-3">
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
    <div className="space-y-30">
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
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2">
            <span className="font-sans text-[12px] sm:text-[14px] font-medium text-accent-gold uppercase tracking-[0.24em] inline-flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span> Simple & Transparent</span>
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-bold">
            Our Simple Buying Process
          </h2>
        </div>
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
              <div className="w-10 h-10 bg-charcoal text-cream rounded-xl flex items-center justify-center font-serif text-sm font-bold mx-auto group-hover:bg-accent-gold group-hover:text-white transition-colors duration-300">
                {s.step}
              </div>

              <p className="font-sans text-xs text-charcoal font-medium leading-snug">
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
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2">
            <span className="font-sans text-[12px] sm:text-[14px] font-medium text-accent-gold uppercase tracking-[0.24em] inline-flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span> Got Questions?</span>
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-bold">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
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
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2">
            <span className="font-sans text-[12px] sm:text-[14px] font-medium text-accent-gold uppercase tracking-[0.24em] inline-flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Take the First Step</span>
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-cream font-light leading-tight">
            Let's Build Your{" "}
            <span className="italic text-accent-gold">Future Together</span>
          </h2>
          <p className="font-sans text-[13px] sm:text-[17px] text-white/70 font-light leading-relaxed">
            Every successful journey begins with a single step. Take the first
            step toward owning a premium residential plot with Aryans Buildcons.
            Whether you're investing for tomorrow or planning your forever home,
            we're here to guide you at every stage.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2 w-full sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
            <a
              href="tel:+918767010825"
              className="flex items-center justify-center gap-2 bg-accent-gold hover:bg-accent-dark-gold text-white px-4 py-3 rounded-full font-sans text-xs font-medium uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call Today</span>
            </a>

            <button
              onClick={() => navigate("/contact")}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-3 rounded-full font-sans text-xs font-medium uppercase tracking-[0.08em] whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 shrink-0" />
              <span>Book Site Visit</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
