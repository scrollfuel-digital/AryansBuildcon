import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { projects as staticProjects } from "../data";
import { fetchProjectById, submitInquiry } from "../api";
import { Project } from "../types";
import {
  ArrowLeft,
  Compass,
  Scaling,
  Tag,
  Calendar,
  ShieldCheck,
  Mail,
  Sparkles,
  Phone,
  CheckCircle2,
  MapPin,
  Building2,
  Navigation,
  Layers,
  Award,
  QrCode,
  ExternalLink,
  FileDown,
  ArrowDown,
} from "lucide-react";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const staticProject = staticProjects.find((p) => p.id === id);
  const [project, setProject] = useState<Project | null>(staticProject ?? null);
  const [inquirySent, setInquirySent] = useState(false);
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (!id) return;
    fetchProjectById(id)
      .then((res: any) => {
        if (res?.data && typeof res.data === "object") {
          // Merge API data with static data to keep local images and preserve existing imageUrl when the API payload lacks it.
          setProject((prev: any) => {
            const apiProject =
              res.data && typeof res.data === "object" ? res.data : {};
            return {
              ...prev,
              ...apiProject,
              imageUrl: prev?.imageUrl ?? apiProject.imageUrl ?? prev?.imageUrl,
            };
          });
        }
      })
      .catch(() => {
        /* keep static fallback */
      });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-ink">
        <span className="font-sans text-[11px] font-medium text-gold uppercase tracking-[0.24em] mb-4">
          ✦ 404 Exception
        </span>
        <h2 className="font-serif text-3xl font-light mb-6">
          Plotted Layout <span className="italic text-gold">Not Found</span>
        </h2>
        <Link
          to="/"
          className="bg-ink text-white hover:bg-gold font-sans text-xs font-semibold uppercase tracking-[0.16em] py-4 px-8 rounded-full transition-all duration-300"
        >
          Return to Plotted Layouts
        </Link>
      </div>
    );
  }

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingInquiry(true);
    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email || "Not Provided",
        phone: formData.phone,
        projectTitle: project.title,
        message: formData.message || `Site visit inquiry for ${project.title}`,
      });
    } catch {
      /* show success regardless */
    }
    setIsSubmittingInquiry(false);
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setFormData({ name: "", phone: "", email: "", message: "" });
    }, 4500);
  };

  const displayAmenities = project.amenities || [
    "Grand Entrance Gate",
    "Wide Tar Road Network",
    "Electric Pole Network",
    "Lush Plantation & Greenery",
    "Layout Boundary Fencing",
    "Landscaped Garden Park",
  ];

  return (
    <div className="bg-cream min-h-screen text-ink pb-24">
      {/* Immersive Header Hero Stage */}
      <div className="relative h-[100vh] sm:h-[100vh] md:h-[100vh] w-full overflow-hidden bg-ink">
        <motion.img
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          src={project.imageUrl}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Floating Back Navigation */}
        <div className="absolute top-25 sm:top-28 left-4 sm:left-6 md:left-12 lg:left-20 z-20 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-gold-dark border border-white/20 px-5 py-2.5 rounded-full font-sans text-sm uppercase tracking-[0.15em] font-bold transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Layouts
          </button>
        </div>

        {/* Hero Meta Description Overlay */}
        <div className="absolute bottom-8 sm:bottom-12 top-37 sm:top-75 left-4 sm:left-6 md:left-12 lg:left-20 right-4 sm:right-6 z-20 text-white max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="space-y-4"
          >
            {/* Category + Status */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 bg-gold text-white rounded-full font-sans text-[12px] font-medium uppercase tracking-[0.16em]">
                {project.category} Plotted Community
              </span>

              {project.sanctionStatus && (
                <span className="px-3.5 py-1 bg-emerald-700/80 backdrop-blur-md text-white rounded-full font-sans text-[10px] font-medium uppercase tracking-[0.16em] border border-emerald-400/30">
                  ✓ {project.sanctionStatus}
                </span>
              )}
            </div>
            {/* Project Title */}
            <div>
              <h1 className="font-serif text-5xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gold-light tracking-tight leading-tight">
                {project.title}
              </h1>
            </div>
            
            {/* Developer */}
            {project.developer && (
              <div className="font-sans text-sm font-bold text-white/75 uppercase tracking-[0.15em]">
                Developer:{" "}
                <strong className="text-white font-semibold">
                  {project.developer}
                </strong>
              </div>
            )}

            {/* Location - Below Developer */}
            <div className="font-sans text-sm md:text-base font-medium text-white/80 tracking-[0.08em]">
              Located in{" "}
              <span className="text-cream font-semibold">
                {project.location}
              </span>
            </div>

            {/* Description */}
            <p className="font-sans text-lg md:text-lg text-white/80 font-bold leading-relaxed max-w-3xl">
              Ready for registry with instant conveyancing.
            </p>

            {/* Taglines */}
            {project.taglines && project.taglines.length > 0 && (
              <div className="pt-2 flex flex-wrap items-center gap-2">
                {project.taglines.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/10 border border-white/20 rounded-full font-sans text-[15px] text-cream/80 font-medium"
                  >
                    ✦ {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Narrative Split & Specification Board */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Comprehensive Architectural & Legal Specification */}
          <div className="lg:col-span-7 space-y-12">
            {/* Overview & Description */}
            <div className="space-y-6">
              <span className="font-sans text-[11px] font-medium text-gold uppercase tracking-[0.24em] block">
                ✦ Project Overview & Master Planning
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-ink font-light leading-tight tracking-tight">
                Carefully planned layout with <br />
                <span className="italic text-gold">
                  NATP & Town Planning approvals.
                </span>
              </h2>
              <p className="font-sans text-base text-ink-soft leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Key Project Scale Metrics Cards */}
            {(project.totalPlots ||
              project.openSpaceArea ||
              project.publicUtilityArea) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.totalPlots && (
                  <div className="p-5 rounded-2xl bg-white/60 border border-border space-y-1">
                    <span className="font-sans text-[10px] text-ink-faint uppercase tracking-[0.16em]">
                      Total Plots
                    </span>
                    <p className="font-serif text-2xl text-gold font-light">
                      {project.totalPlots} Plots
                    </p>
                  </div>
                )}
                {project.openSpaceArea && (
                  <div className="p-5 rounded-2xl bg-white/60 border border-border space-y-1">
                    <span className="font-sans text-[10px] text-ink-faint uppercase tracking-[0.16em]">
                      Dedicated Open Space
                    </span>
                    <p className="font-serif text-xl text-ink font-light">
                      {project.openSpaceArea}
                    </p>
                  </div>
                )}
                {project.publicUtilityArea && (
                  <div className="p-5 rounded-2xl bg-white/60 border border-border space-y-1">
                    <span className="font-sans text-[10px] text-ink-faint uppercase tracking-[0.16em]">
                      Public Utility (PU)
                    </span>
                    <p className="font-serif text-xl text-ink font-light">
                      {project.publicUtilityArea}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Official Layout Maps & Sanctioned Blueprints Showcase */}
            {project.layoutMapImages && project.layoutMapImages.length > 0 && (
              <div className="space-y-6 bg-white/70 border border-border rounded-3xl p-8 backdrop-blur-md shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[11px] font-medium text-gold uppercase tracking-[0.24em] block">
                    ✦ Sanctioned Layout Plans & Blueprints
                  </span>
                  <span className="px-3 py-1 bg-gold/10 text-gold rounded-full font-sans text-[10px] font-semibold uppercase tracking-[0.14em]">
                    {project.layoutMapImages.length} Official Plans
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-light text-ink">
                  Master Plot Layout & Site Blueprint Maps
                </h3>
                <p className="font-sans text-lg text-ink-soft font-light leading-relaxed">
                  Download the official sanctioned layout blueprints with plot
                  dimensions, demarcation numbers, and reserved green open
                  space.
                </p>

                <div className="space-y-3 pt-2">
                  {project.layoutMapImages.map((imgUrl, imgIdx) => (
                    <a
                      key={imgIdx}
                      href={imgUrl}
                      download={`${project.title}-Brochure-${imgIdx + 1}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-white border border-border hover:border-gold hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:border-gold transition-colors duration-300">
                          <FileDown className="w-5 h-5 text-gold group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <p className="font-sans text-sm font-medium text-ink group-hover:text-gold transition-colors">
                            {project.title} — Brochure {imgIdx + 1}
                          </p>
                          <p className="font-sans text-[10px] text-ink-faint font-light uppercase tracking-wider mt-0.5">
                            Official Layout Blueprint • PDF / Image
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gold">
                        <span className="font-sans text-[10px] font-semibold uppercase tracking-wider hidden sm:block">
                          Download
                        </span>
                        <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Layout Amenities Segment */}
            <div className="space-y-6 bg-white/50 border border-border rounded-3xl p-8 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-medium text-gold uppercase tracking-[0.24em] block">
                  ✦ Key Layout Amenities
                </span>
                <Award className="w-4 h-4 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-light text-ink">
                Infrastructure Features & Upgrades
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {displayAmenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/80 border border-border flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-sans text-xs text-ink font-medium">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Distances & Strategic Connectivity */}
            {project.distances && project.distances.length > 0 && (
              <div className="space-y-6">
                <span className="font-sans text-[11px] font-medium text-gold uppercase tracking-[0.24em] block">
                  ✦ Strategic Distances & Connectivity
                </span>
                <h3 className="font-serif text-2xl font-light text-ink">
                  Travel Times from Site
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.distances.map((dist, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/60 border border-border space-y-1"
                    >
                      <div className="flex items-center gap-2 text-gold">
                        <Navigation className="w-3.5 h-3.5" />
                        <span className="font-sans text-[10px] uppercase tracking-[0.14em] font-medium text-ink-faint">
                          {dist.label}
                        </span>
                      </div>
                      <p className="font-serif text-xl font-light text-ink">
                        {dist.distance}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Surrounding Landmarks & Growth Drivers */}
            {project.landmarks && project.landmarks.length > 0 && (
              <div className="space-y-4 bg-white/40 border border-border rounded-3xl p-8">
                <span className="font-sans text-[11px] font-medium text-gold uppercase tracking-[0.24em] block">
                  ✦ Regional Growth Drivers & Landmarks
                </span>
                <h3 className="font-serif text-2xl font-light text-ink">
                  Surrounding Infrastructure & Multi-Billion Projects
                </h3>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  {project.landmarks.map((lm, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-2 bg-white/90 border border-border rounded-xl font-sans text-xs text-ink font-light shadow-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span>{lm}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Spec Sheet & Developer Inquiry Form */}
          <div className="lg:col-span-5 space-y-8">
            {/* Google Location QR Navigation Card */}
            {project.googleMapsUrl && (
              <div className="bg-white border border-border rounded-3xl p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-gold" />
                    <span className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
                      Google Location Map QR
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-sans text-[8px] sm:text-[11px] font-medium uppercase tracking-[0.1em]">
                    Scan & Navigate
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
                  <div className="shrink-0 bg-white p-3 rounded-2xl border border-border shadow-sm">
                    <QRCodeSVG
                      value={project.googleMapsUrl}
                      size={148}
                      bgColor="#ffffff"
                      fgColor="#14110d"
                      level="H"
                    />
                  </div>

                  <div className="space-y-3 text-center sm:text-left flex-1">
                    <h4 className="font-serif text-lg font-medium text-ink">
                      Scan to Open Map Location
                    </h4>
                    <p className="font-sans text-[15px] text-ink-soft font-light leading-relaxed">
                      Use your phone camera to scan this QR code and get instant
                      turn-by-turn navigation on Google Maps to {project.title}.
                    </p>
                    <a
                      href={project.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink hover:bg-gold text-cream text-[11px] font-sans font-medium uppercase tracking-[0.14em] rounded-full transition-all duration-300 shadow-sm cursor-pointer"
                    >
                      <span>Open Map Location</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Technical Specifications Board */}
            <div className="bg-ink text-white rounded-3xl p-8 md:p-10 space-y-8 shadow-xl">
              <div className="border-b border-white/10 pb-6">
                <span className="font-sans text-[10px] font-medium text-gold uppercase tracking-[0.24em] block mb-2">
                  ✦ Layout Summary & Status
                </span>
                <h3 className="font-serif text-2xl font-light">
                  Layout Specifications
                </h3>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="font-sans text-xs text-white/50 uppercase tracking-[0.15em] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-gold" /> Location
                  </span>
                  <span className="font-serif text-xs md:text-sm text-white/95 text-right max-w-[220px] leading-tight">
                    {project.location}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="font-sans text-xs text-white/50 uppercase tracking-[0.15em] flex items-center gap-2">
                    <Scaling className="w-4 h-4 text-gold" /> Total Layout Area
                  </span>
                  <span className="font-serif text-sm text-white/95">
                    {project.area}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="font-sans text-xs text-white/50 uppercase tracking-[0.15em] flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gold" /> Sanction Status
                  </span>
                  <span className="font-serif text-sm text-gold font-medium">
                    {project.sanctionStatus || project.scope}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="font-sans text-xs text-white/50 uppercase tracking-[0.15em] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-gold" /> Total Plots
                  </span>
                  <span className="font-serif text-sm text-white/95">
                    {project.totalPlots || "Demarcated"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="font-sans text-xs text-white/50 uppercase tracking-[0.15em] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold" /> Possession Status
                  </span>
                  <span className="font-serif text-sm text-white/95">
                    Ready to Registry
                  </span>
                </div>
              </div>

              {/* Developer Office Card */}
              {project.developerContact && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-gold">
                    <Building2 className="w-4 h-4" />
                    <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.12em]">
                      {project.developer || "Aryans Buildcon"} Office
                    </h4>
                  </div>
                  <p className="font-sans text-xs text-white/80 font-light leading-relaxed">
                    {project.developerContact.office}
                  </p>
                  <div className="pt-1 font-sans text-xs text-white/70 space-y-1">
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gold" />
                      <span>{project.developerContact.phone.join(" / ")}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gold" />
                      <span>{project.developerContact.email}</span>
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-sans text-xs font-semibold text-emerald-300 uppercase tracking-[0.1em]">
                    100% Legal Title & Bank Finance
                  </h4>
                  <p className="font-sans text-[11px] text-white/70 leading-relaxed font-light">
                    Every plot is legally verified with clear titles, search
                    reports, and pre-approved loan assistance from nationalized
                    banks.
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Inquiry Contact Box */}
            <div className="bg-white border border-border rounded-3xl p-8 space-y-6 shadow-sm">
              <div className="space-y-2">
                <span className="font-sans text-[10px] font-medium text-gold uppercase tracking-[0.24em] block">
                  ✦ Plot Booking & Inquiry
                </span>
                <h3 className="font-serif text-2xl font-light text-ink">
                  Book Site Visit
                </h3>
                <p className="font-sans text-[15px] sm:text-[16px] text-ink-soft leading-relaxed font-light">
                  Interested in visiting {project.title}? Speak directly with
                  our Nagpur plot advisors to receive layout maps, pricing
                  options, or coordinate free site transport.
                </p>
              </div>

              {inquirySent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gold/10 border border-gold/20 text-gold p-6 rounded-2xl text-center space-y-2"
                >
                  <Sparkles className="w-8 h-8 mx-auto tag-pulse text-gold" />
                  <h4 className="font-serif text-lg font-medium">
                    Inquiry Dispatched
                  </h4>
                  <p className="font-sans text-xs text-ink-soft leading-relaxed font-light">
                    Our sales advisor has logged your interest in{" "}
                    {project.title}. We will contact you shortly to coordinate
                    your visit.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-[0.16em] text-ink-faint font-medium">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Anand Sharma"
                      className="w-full bg-cream-light border border-border rounded-xl px-4 py-3 font-sans text-xs text-ink focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-[0.16em] text-ink-faint font-medium">
                      Contact Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="e.g. 8767010825"
                      className="w-full bg-cream-light border border-border rounded-xl px-4 py-3 font-sans text-xs text-ink focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-[0.16em] text-ink-faint font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="e.g. anand@gmail.com"
                      className="w-full bg-cream-light border border-border rounded-xl px-4 py-3 font-sans text-xs text-ink focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-[0.16em] text-ink-faint font-medium">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={`I am interested in visiting ${project.title}, please send layout plan and plot prices...`}
                      className="w-full bg-cream-light border border-border rounded-xl px-4 py-3 font-sans text-xs text-ink focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingInquiry}
                    className="w-full bg-ink hover:bg-gold text-white font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg disabled:opacity-60"
                  >
                    {isSubmittingInquiry ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Phone className="w-4 h-4" /> Schedule Visit & Request
                        Quotes
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* No lightbox needed - brochures use direct download */}
    </div>
  );
}
