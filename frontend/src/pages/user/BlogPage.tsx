import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getBlogs } from "../../api/blogApi";
import { BlogData } from "../../types/blog";
import BlogGrid from "../../components/blog/BlogGrid";
import { Sparkles } from "lucide-react";

export const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);

      const data = await getBlogs();

      console.log("Blogs API data:", data);

      const publishedBlogs = data.filter((blog) => blog.isPublished !== false);

      setBlogs(publishedBlogs);
    } catch (error) {
      console.error("Failed to load blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden !bg-[#181512] !text-white border-b border-white/10">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#D4AF37]/10 blur-[140px]" />

          <div className="absolute bottom-[-180px] left-[-100px] w-[450px] h-[350px] rounded-full bg-[#8C3716]/15 blur-[130px]" />

          <div className="absolute bottom-[-160px] right-[-100px] w-[450px] h-[350px] rounded-full bg-[#D4AF37]/5 blur-[130px]" />
        </div>

        <div className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none">
          <div className="absolute inset-0" />
        </div>

        <div className="absolute left-0 top-1/2 w-24 md:w-48 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/30" />

        <div className="absolute right-0 top-1/2 w-24 md:w-48 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/30" />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 max-w-5xl mx-auto px-6 py-14 md:py-20 lg:py-24 flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <span className="w-8 md:w-14 h-px bg-[#D4AF37]/70" />

            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />

              <span className="font-sans text-[10px] sm:text-[11px] md:text-[12px] font-semibold !text-[#D4AF37] uppercase tracking-[0.3em]">
                Real Estate Insights
              </span>
            </div>

            <span className="w-8 md:w-14 h-px bg-[#D4AF37]/70" />
          </div>

          {/* Heading */}
          <h1 className="!text-white font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
            Investment Journal
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl font-sans text-sm sm:text-base md:text-lg font-medium leading-relaxed !text-white/70">
            Explore expert articles on Nagpur&apos;s growth corridors, plot
            valuation, legal due diligence, and smart land investment
            strategies.
          </p>
        </motion.div>

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-44 h-[2px] bg-[#D4AF37]" />
      </section>

      {/* ================= BLOG GRID ================= */}
      <section className="py-15 md:py-14 bg-cream min-h-screen">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-12">
          <BlogGrid blogs={blogs} loading={loading} />
        </div>
      </section>
    </>
  );
};

export default BlogPage;
