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
      className="relative overflow-hidden rounded-[40px] "
    >
      
      {/* Heading */}
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-rust/20 bg-accent-rust/10 px-4 py-2">
          <Sparkles className="h-4 w-4 text-accent-rust" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-rust">
            Smart Investment
          </span>
        </div>

        <h2 className="mt-6 font-serif text-3xl font-light leading-tight text-charcoal md:text-5xl">
          Why Residential Plots Are the{" "}
          <span className="italic text-accent-rust">Smartest Investment</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-grey md:text-base">
          Residential plots provide long-term appreciation, complete ownership,
          lower maintenance costs, and the flexibility to build your dream home
          whenever you're ready.
        </p>

      </div>

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
          className="pb-16"
        >
          {benefits.map((item, index) => (
            <SwiperSlide key={item.label}>
              <motion.div
                whileHover={{
                  y: -8,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-7 transition-all duration-500 hover:border-accent-gold/40 hover:shadow-2xl"
              >
              

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-gold/10 transition duration-300 group-hover:bg-accent-gold">
                  <CheckCircle2 className="h-7 w-7 text-accent-gold group-hover:text-white" />
                </div>

                {/* Title */}
                <h3 className="text-center text-lg font-semibold leading-7 text-charcoal">
                  {item.label}
                </h3>

                {/* Tag */}
                <div className="mt-6 flex justify-center">
                  <span className="rounded-full bg-accent-rust/10 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-rust">
                    {item.tag}
                  </span>
                </div>

                {/* Bottom Line */}
                <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    
    </motion.section>
  );
}
