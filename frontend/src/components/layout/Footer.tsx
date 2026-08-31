import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { studioLocations } from "../../data";
import footerLogo from "../../assets/logo.png";
import {
  Mail,
  Instagram,
  Facebook,
  Youtube,
  Phone,
  MapPin,
  ChevronUp,
  Building2,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeOffice, setActiveOffice] = React.useState<number>(0);

  const handleNavClick = (id: string) => {
    if (id === "hero-section") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (id === "about-section") {
      if (location.pathname === "/about") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/about");
      }
      return;
    }

    if (id === "projects-route") {
      navigate("/projects");
      return;
    }

    if (id === "contact-route") {
      navigate("/contact");
      return;
    }

    if (id === "admin-route") {
      navigate("/admin");
      return;
    }

    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else {
      navigate("/", { state: { scrollToId: id } });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { label: "Home", id: "hero-section" },
    { label: "About Us", id: "about-section" },
    { label: "Projects", id: "projects-route" },
    { label: "Contact Us", id: "contact-route" },
  ];

  const primeCorridors = [
    { name: "Govindraj Nagari", desc: "Wardha Road • NATP Sanctioned", id: "proj-govindraj-nagari" },
    { name: "Amrutsiddhi", desc: "Deoli-Butibori • 47 Acres Gated", id: "proj-amrutsiddhi" },
  ];

  return (
    <footer className="relative bg-cream text-gold overflow-hidden border-t border-gold/20 rounded-t-[2.5rem] md:rounded-t-[3.5rem] mt-10 md:mt-14 shadow-lg">
      {/* Background Decorative Ambient Glow & Texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-gold/08 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#0b7443]/05 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#8c3716_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-8 md:pt-10 pb-6">
        {/* Main Footer Multi-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-6 pb-8 md:pb-5 border-b border-black/10">
          {/* Column 1: Grand Brand Info & Location QR Link (span 4) */}
          <div className="lg:col-span-4 space-y-1">
            <div
              onClick={() => handleNavClick("hero-section")}
              className="inline-block cursor-pointer group"
            >
              <img
                src={footerLogo}
                alt="Aryans Buildcons Logo"
                className="h-24 md:h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_12px_rgba(140,55,22,0.15)]"
              />
            </div>

            <p className="font-sans text-[13px] sm:text-[15px] text-ink/60 font-bold max-w-sm break-all">
              Aryans Buildcons is Nagpur's premier developer of
              high-appreciation residential plotted layouts. We empower families
              and investors with 100% legally clear, ready-to-register land
              along Wardha Road, MIHAN, and Samruddhi Expressway.
            </p>

            {/* Direct Google Maps Location Link */}
            <div className="pt-5">
              <a
                href="https://maps.google.com/?q=Aryans+Tower,+Near+Chinchbhavan+Metro+Station,+Wardha+Road,+Nagpur"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream/10 border border-cream/30 text-[13px] text-ink font-bold hover:bg-ink hover:text-white transition-all duration-300 shadow-sm"
              >
                <MapPin className="w-5 h-5 text-gold transition-colors duration-300 group-hover:text-white" />

                <span>Open Head Office in Google Maps</span>

                <ExternalLink className="w-5 h-5 text-gold transition-colors duration-300 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-[15px] sm:text-[17px] text-ink/70 font-bold tracking-wide border-b border-gold/30 pb-1.5 inline-block">
              Navigation
            </h4>
            <ul className="space-y-2.5 font-sans text-[15px] sm:text-[17px] font-semibold text-ink/70">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="flex items-center gap-2 hover:text-gold hover:translate-x-1 transition-all duration-200 cursor-pointer text-left py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Real Estate Projects (span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans text-[15px] sm:text-[17px] text-ink/70 font-bold tracking-wide border-b border-gold/30 pb-1.5 inline-block">
              Our Projects
            </h4>
            <div className="space-y-2">
              {primeCorridors.map((item) => (
                <div
                  key={item.name}
                  onClick={() => navigate(`/project/${item.id}`)}
                  className="group p-2.5 rounded-xl bg-white/60 border border-black/10 hover:border-gold/40 hover:bg-white transition-all duration-300 cursor-pointer flex items-center justify-between shadow-xs"
                >
                  <div>
                    <p className="font-sans text-[13px] sm:text-[15px] font-medium text-gold group-hover:text-gold transition-colors">
                      {item.name}
                    </p>
                    <p className="font-sans text-[13px] sm:text-[15px] text-ink/70 font-medium mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gold/60 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Offices (span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between border-b border-gold/30 pb-1.5">
              <h4 className="font-sans text-[15px] sm:text-[17px] text-ink/70 font-bold tracking-wide pb-1.5 inline-block">
                Offices
              </h4>
              <a
                href="tel:8767010825"
                className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-black hover:underline"
              >
                <Phone className="w-3 h-3 text-gold" />
                <span className="font-sans text-[13px] sm:text-[15px]">+91 8767010825</span>
              </a>
            </div>

            {/* Office Location Selection Tabs */}
            <div className="flex items-center gap-1 bg-black/5 p-1 rounded-xl border border-black/10 overflow-x-auto">
              {studioLocations.map((loc, idx) => (
                <button
                  key={loc.city}
                  onClick={() => setActiveOffice(idx)}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-sans text-[15px] font-medium transition-all duration-300 text-center cursor-pointer ${
                    activeOffice === idx
                      ? "bg-gold text-white shadow-xs"
                      : "text-gold/70 hover:text-gold hover:bg-white/50"
                  }`}
                >
                  {idx === 0 ? "Head Office" : "Developer Office"}
                </button>
              ))}
            </div>

            {/* Active Office Address Card */}
            {studioLocations[activeOffice] && (
              <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 space-y-2.5 transition-all duration-300 shadow-xs">
                <div className="flex items-center justify-between">
                  <h5 className="font-serif text-lg font-semibold text-ink">
                    {studioLocations[activeOffice].city}
                  </h5>
                  
                </div>

                <p className="flex items-start gap-2 font-sans text-[14px] text-ink/70 font-semibold leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <span>{studioLocations[activeOffice].address}</span>
                </p>

                <div className="pt-2 border-t border-black/10 flex items-center justify-between font-sans  text-[12px] text-ink/70">
                  <a
                    href={`tel:${studioLocations[activeOffice].phone}`}
                    className="flex items-center gap-1.5 hover:text-gold transition-colors"
                  >
                    <Phone className="w-3 h-3 text-gold" />
                    <span>{studioLocations[activeOffice].phone}</span>
                  </a>
                  <a
                    href={`mailto:${studioLocations[activeOffice].email}`}
                    className="flex items-center gap-1.5 hover:text-gold transition-colors"
                  >
                    <Mail className="w-3 h-3 text-gold" />
                    <span>aryansbuildcon@gmail.com</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Rights, Socials & Back to Top */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright & Location Tag */}
          <div className="text-center md:text-left space-y-0.5">
            <p className="font-sans text-sm text-ink/70 font-semibold">
              © {new Date().getFullYear()}{" "}
              <span className="text-gold-dark font-medium">
                Aryans Buildcons
              </span>
              . All rights reserved.
            </p>
            <p className="font-sans text-[10px] text-gold-dark uppercase tracking-[0.2em] font-semibold">
              Nagpur — Maharashtra — India
            </p>
          </div>

          {/* Right Group: Social Links & Back to Top */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 font-sans">
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/aryansbuildcon?igsh=ODR0a2Npa3Vvc2J5"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2.5 bg-white/70 rounded-full border border-black/10 text-ink hover:text-white hover:bg-gold hover:border-gold hover:shadow-md transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/aryansbuildcon"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2.5 bg-white/70 rounded-full border border-black/10 text-ink hover:text-white hover:bg-gold hover:border-gold hover:shadow-md transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@aryansrealtorsbuildcon?si=lgP9iZmpVIMLGJaG"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="p-2.5 bg-white/70 rounded-full border border-black/10 text-ink hover:text-white hover:bg-gold hover:border-gold hover:shadow-md transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink/90 border border-black/10 text-gold hover:border-gold hover:bg-gold hover:text-white transition-all duration-300 cursor-pointer shadow-xs ml-2"
            >
              <span className="text-[10px] font-medium uppercase tracking-wider">
                Back to Top
              </span>
              <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
