import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CalendarDays,
  Users,
  Building2,
  Camera,
  Sparkles,
} from "lucide-react";
import gallery1 from "../../assets/gallery/gallery1.jpeg";
import gallery2 from "../../assets/gallery/gallery2.jpeg";
import gallery3 from "../../assets/gallery/gallery3.jpeg";
import gallery4 from "../../assets/gallery/gallery4.jpeg";
import gallery5 from "../../assets/gallery/gallery5.jpeg";
type GalleryCategory =
  | "All"
  | "Meetings"
  | "Site Visits"
  | "Team"
  | "Events"
  | "Client Interactions";

interface GalleryItem {
  id: number;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  image: string;
  date: string;
  description: string;
  size?: "small" | "medium" | "large";
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Management Meeting",
    category: "Meetings",
    image: gallery1,
    date: "October 2026",
    description:
      "Strategic discussions and planning sessions with our leadership team.",
    size: "large",
  },
  {
    id: 2,
    title: "Project Discussion",
    category: "Meetings",
    image: gallery2,
    date: "September 2026",
    description:
      "Our team discussing project development and upcoming milestones.",
    size: "medium",
  },
  {
    id: 3,
    title: "Team Collaboration",
    category: "Team",
    image: gallery3,
    date: "September 2026",
    description: "Collaborative work between our design and development teams.",
    size: "medium",
  },
  {
    id: 4,
    title: "Site Progress Visit",
    category: "Site Visits",
    image: gallery4,
    date: "August 2026",
    description: "A detailed site inspection to review construction progress.",
    size: "large",
  },
  {
    id: 5,
    title: "Client Interaction",
    category: "Client Interactions",
    image: gallery5,
    date: "August 2026",
    description:
      "Understanding our clients' expectations and creating better experiences.",
    size: "medium",
  },
];

const categories: {
  label: GalleryCategory;
  icon: React.ElementType;
}[] = [
  { label: "All", icon: Camera },
  { label: "Meetings", icon: Users },
  { label: "Site Visits", icon: Building2 },
  { label: "Team", icon: Users },
  { label: "Events", icon: CalendarDays },
  { label: "Client Interactions", icon: Users },
];

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");

  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const currentIndex = selectedImage
    ? filteredImages.findIndex((item) => item.id === selectedImage.id)
    : -1;

  const showPrevious = () => {
    if (currentIndex === -1) return;

    const previousIndex =
      currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;

    setSelectedImage(filteredImages[previousIndex]);
  };

  const showNext = () => {
    if (currentIndex === -1) return;

    const nextIndex =
      currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;

    setSelectedImage(filteredImages[nextIndex]);
  };

  /* Keyboard navigation */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;

      if (event.key === "Escape") {
        setSelectedImage(null);
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, currentIndex]);

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* =========================================
            HEADER
        ========================================== */}

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

        {/* ================= CONTENT ================= */}
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
                Our Gallery
              </span>
            </div>

            <span className="w-8 md:w-14 h-px bg-[#D4AF37]/70" />
          </div>

          {/* Main Heading */}
          <h1 className="!text-white font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
            Project Highlights
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl font-sans text-sm sm:text-base md:text-lg font-medium leading-relaxed !text-white/70">
            A glimpse into the people, conversations, projects and experiences
            that shape our journey.
          </p>
        </motion.div>

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-44 h-[2px] bg-[#D4AF37]" />
      </section>
      {/* =========================================
            CATEGORY FILTER
        ========================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12 mt-10 flex w-full flex-col items-center gap-5 px-6 md:mt-16"
      >
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-3 md:justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.label;

            return (
              <button
                key={category.label}
                onClick={() => setActiveCategory(category.label)}
                className={`group relative flex shrink-0 items-center gap-2 border px-5 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                  isActive
                    ? "border-ink bg-ink text-cream"
                    : "border-border bg-cream-light text-ink-soft hover:border-gold hover:text-gold-dark"
                }`}
              >
                <Icon
                  size={14}
                  strokeWidth={1.5}
                  className={isActive ? "text-gold-light" : "text-bronze"}
                />

                {category.label}

                {isActive && (
                  <motion.span
                    layoutId="galleryActive"
                    className="absolute -bottom-[1px] left-1/2 h-[2px] w-8 -translate-x-1/2 bg-gold"
                  />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* =========================================
            GALLERY GRID
        ========================================== */}
      {/* =========================================
      SIMPLE GALLERY GRID
========================================== */}

      <motion.div
        layout
        className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-4
    px-6
    md:px-8
    lg:px-10
  "
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((item, index) => (
            <motion.article
              key={item.id}
              layout
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 20,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.04,
              }}
              onClick={() => setSelectedImage(item)}
              className="
          group
          relative
          cursor-pointer
          overflow-hidden
          border
          border-border/60
          bg-black
          aspect-[4/3]
        "
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
              />

              {/* Dark gradient */}
              <div
                className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/80
            via-black/10
            to-transparent
            opacity-80
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
              />

              {/* Gold top line */}
              <div
                className="
            absolute
            left-0
            right-0
            top-0
            h-[2px]
            origin-left
            scale-x-0
            bg-gradient-to-r
            from-bronze
            via-gold
            to-gold-light
            transition-transform
            duration-500
            group-hover:scale-x-100
          "
              />

              {/* Expand button */}
              <div
                className="
            absolute
            right-4
            top-4
            flex
            h-9
            w-9
            items-center
            justify-center
            border
            border-white/20
            bg-black/30
            text-white
            opacity-0
            backdrop-blur-md
            transition-all
            duration-300
            group-hover:opacity-100
          "
              >
                <Maximize2 size={14} strokeWidth={1.5} />
              </div>

              
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* =========================================
            FOOTER
        ========================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-14 flex flex-col gap-5 border-t border-border pt-7 md:flex-row md:items-center md:justify-center md:gap-10 md:pt-10 lg:mt-20"
      >
        <div className="flex items-center gap-3">
          <Sparkles size={15} strokeWidth={1.5} className="text-gold" />

          <p className="font-sans text-sm text-ink-soft">
            Capturing the people and moments behind{" "}
            <span className="font-medium text-ink">every project.</span>
          </p>
        </div>
      </motion.div>

      {/* =========================================
          LIGHTBOX
      ========================================== */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close */}

            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close gallery"
              className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center border border-white/20 bg-white/5 text-white backdrop-blur-md transition hover:border-gold hover:text-gold"
            >
              <X size={19} strokeWidth={1.5} />
            </button>

            {/* Previous */}

            <button
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-white/5 text-white backdrop-blur-md transition hover:border-gold hover:text-gold md:left-8"
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>

            {/* Next */}

            <button
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-white/5 text-white backdrop-blur-md transition hover:border-gold hover:text-gold md:right-8"
            >
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>

            {/* Modal */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
              }}
              transition={{
                duration: 0.35,
              }}
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden border border-white/10 bg-[#0d0b08] shadow-2xl lg:flex-row"
            >
              {/* Image */}

              <div className="relative flex min-h-[45vh] flex-1 items-center justify-center bg-black lg:min-h-[650px]">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="h-full max-h-[70vh] w-full object-contain"
                />
              </div>

              {/* Details */}

              <div className="flex w-full flex-col justify-end bg-ink p-7 lg:w-[340px] lg:p-9">
                <span className="mb-4 font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-gold">
                  {selectedImage.category}
                </span>

                <h3 className="font-serif text-3xl leading-tight text-white md:text-4xl">
                  {selectedImage.title}
                </h3>

                <div className="mt-5 flex items-center gap-2 font-sans text-xs text-white/45">
                  <CalendarDays size={14} strokeWidth={1.5} />

                  {selectedImage.date}
                </div>

                <p className="mt-5 font-sans text-sm leading-7 text-white/55">
                  {selectedImage.description}
                </p>

                <div className="my-7 h-px bg-white/10" />

                <div className="flex items-center justify-between">
                  <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/30">
                    Gallery
                  </span>

                  <span className="font-sans text-[10px] text-gold">
                    {String(currentIndex + 1).padStart(2, "0")} /{" "}
                    {String(filteredImages.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
