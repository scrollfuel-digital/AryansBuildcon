import { motion } from "motion/react";
import { TrendingUp, CheckCircle2, Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const benefits = [
  { label: "Full Ownership", tag: "Legal" },
  { label: "Better Appreciation", tag: "Growth" },
  { label: "Freedom to Build", tag: "Flexible" },
  { label: "Lower Maintenance", tag: "Cost" },
  { label: "Higher Resale Potential", tag: "Returns" },
  { label: "Secure Long-Term Investment", tag: "Safe" },
  { label: "Ideal for Future Planning", tag: "Smart" },
  { label: "Growing Demand", tag: "Market" },
];

export default function WhyInvest() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-[40px] bg-cream"
    >
      {/* Heading */}

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
          <span> Smart Investment</span>
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-bold leading-[1.15] tracking-tight max-w-3xl">
          Smart Plot{" "}
          <span className="text-gold-dark font-semibold">Investment</span>
        </h2>

        <p className="font-sans text-base md:text-lg text-ink-soft/80 font-bold max-w-2xl leading-relaxed">
          Residential plots provide long-term appreciation, complete ownership,
          lower maintenance costs, and the flexibility to build your dream home
          whenever you're ready.
        </p>
      </motion.div>
      {/* Slider */}
      <div className="relative mt-14">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".why-invest-pagination",
          }}
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className="relative !pb-16"
        >
          {benefits.map((item) => (
            <SwiperSlide key={item.label}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white transition-all duration-500 hover:border-accent-gold/40 hover:shadow-2xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-gold/10 transition duration-300 group-hover:bg-accent-gold">
                  <CheckCircle2 className="h-7 w-7 text-accent-gold group-hover:text-black" />
                </div>

                <h3 className="text-center text-lg font-semibold leading-7 text-charcoal">
                  {item.label}
                </h3>

                <div className=" flex justify-center">
                  <span className="rounded-full bg-accent-rust/10 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-rust">
                    {item.tag}
                  </span>
                </div>

                <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots BELOW cards */}
        <div className="why-invest-pagination mt-2 flex justify-center" />
      </div>
    </motion.section>
  );
}
