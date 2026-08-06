import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

interface NavbarProps {
  onStartProjectClick: () => void;
}

export default function Navbar({ onStartProjectClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero-section");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverDark, setIsOverDark] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", id: "hero-section", route: "/" },
    { label: "Projects", id: "projects-section", route: "/projects" },
    { label: "About", id: "about-section", route: "/about" },

  ];

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.id === activeSection)
  );

  // Detect if navbar is over a dark or light section
  useEffect(() => {
    const darkSectionIds = ["hero-section", "contact-section"];

    const checkDarkness = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY >= 40);

      if (location.pathname !== "/") {
        // On dedicated pages: hero headers are dark, so always light text at top
        setIsOverDark(scrollY < 80);
        return;
      }

      // On home page: check which section the navbar is over
      let overDark = false;
      for (const id of darkSectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollY + 60 >= top && scrollY + 60 < bottom) {
            overDark = true;
            break;
          }
        }
      }
      setIsOverDark(overDark);

      // Active section detection
      const sectionIds = [
        "hero-section",
        "projects-section",
        "about-section",
      ];
      const scrollPosition = scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", checkDarkness, { passive: true });
    checkDarkness();
    return () => window.removeEventListener("scroll", checkDarkness);
  }, [location.pathname]);

  // Route-based active section
  useEffect(() => {
    if (location.pathname.startsWith("/about")) {
      setActiveSection("about-section");
    } else if (
      location.pathname.startsWith("/project") ||
      location.pathname === "/projects"
    ) {
      setActiveSection("projects-section");
    } else if (location.pathname === "/" && window.scrollY < 200) {
      setActiveSection("hero-section");
    }
  }, [location.pathname]);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    const item = navItems.find((n) => n.id === id);
    if (item) {
      if (location.pathname === item.route) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(item.route);
      }
    }
  };

  const handleLogoClick = () => {
    setActiveSection("hero-section");
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  // Inactive nav text color based on section darkness
  const inactiveTextColor = "#8c3716";
  const ctaTextColor = "#8c3716";

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-16 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "h-[84px] md:h-[96px] bg-cream/90 backdrop-blur-md border-b border-charcoal/10 shadow-sm"
            : "h-[96px] md:h-[112px] bg-transparent"
        }`}
      >
        {/* Brand Logo */}
        <div
          id="brand-logo"
          onClick={handleLogoClick}
          className="flex items-center cursor-pointer select-none group z-10"
        >
          <img
            src={logo}
            alt="Brand Logo"
            className="h-24 md:h-28 lg:h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_4px_20px_rgba(43,27,18,0.22)]"
          />
        </div>

        {/* Desktop Nav Capsule */}
        <div className="hidden md:flex items-center justify-center z-20">
          <div className="relative flex items-center p-1.5 rounded-full backdrop-blur-2xl border border-[#e8d5c0] shadow-[0_8px_32px_0_rgba(0,0,0,0.10)] transition-all duration-500 min-w-[580px] lg:min-w-[660px]" style={{ background: "#fef9e2" }}>
            {/* Gloss strip */}
            <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none rounded-t-full z-0" />

            {/* Active dark pill */}
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full shadow-[0_6px_22px_rgba(0,0,0,0.4),inset_0_1px_1.5px_0_rgba(255,255,255,0.35)] ring-1 ring-white/20 pointer-events-none z-10 transition-transform duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                background: "linear-gradient(to bottom, #b20c0c, #8c3716, #6b2a10)",
                width: `calc((100% - 12px) / ${navItems.length})`,
                transform: `translateX(calc(${activeIndex} * 100%))`,
                left: "6px",
              }}
            />

            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item.id)}
                  className="relative flex-1 py-2 text-[12px] lg:text-[13px] font-sans font-medium uppercase tracking-[0.06em] rounded-full transition-all duration-150 ease-out cursor-pointer select-none text-center z-20 hover:bg-white/35 hover:scale-[1.06] hover:-translate-y-[1px] active:scale-95"
                  style={{
                    color: isActive ? "#ffffff" : inactiveTextColor,
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block z-10">
          <button
            id="btn-navbar-start-project"
            onClick={() => navigate("/contact")}
            className="relative overflow-hidden rounded-full px-6 py-2.5 font-sans text-[12px] lg:text-[13px] font-medium uppercase tracking-[0.10em] border border-[#e8d5c0] hover:bg-[#8c3716] hover:border-[#8c3716] hover:shadow-[0_10px_30px_rgba(140,55,22,0.3)] hover:scale-[1.05] hover:-translate-y-[1px] active:scale-95 transition-all duration-150 ease-out cursor-pointer"
            style={{ background: "#fef9e2", color: "#8c3716" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fef9e2"; e.currentTarget.style.background = "#8c3716"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#8c3716"; e.currentTarget.style.background = "#fef9e2"; }}
          >
            <span className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
            <span className="relative z-10">Book Site Visit</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="btn-mobile-menu-toggle"
          aria-label="Toggle Mobile Menu"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden relative z-50 flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none cursor-pointer"
        >
          {[
            isMobileMenuOpen ? "rotate-45 translate-y-[4px]" : "",
            isMobileMenuOpen ? "opacity-0" : "opacity-100",
            isMobileMenuOpen ? "-rotate-45 -translate-y-[4px]" : "",
          ].map((cls, i) => (
            <span
              key={i}
              className={`w-6 h-[1.5px] transition-all duration-300 ease-out origin-center ${cls}`}
              style={{ backgroundColor: "#8c3716" }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ height: 0 }}
            animate={{ height: "100vh" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-cream w-full flex flex-col justify-between px-8 py-24 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 mt-6">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: 0.1 + index * 0.06, duration: 0.4 }}
                    onClick={() => handleLinkClick(item.id)}
                    className={`w-full text-left font-serif text-[32px] font-light transition-colors duration-300 py-1 flex items-center justify-between ${
                      isActive
                        ? "text-accent-rust"
                        : "text-charcoal hover:text-accent-gold"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-accent-rust" />}
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="w-full mt-8"
            >
              <button
                onClick={() => { setIsMobileMenuOpen(false); onStartProjectClick(); }}
                className="w-full text-center rounded-full bg-charcoal text-white py-4 font-sans text-[13px] font-medium uppercase tracking-[0.12em] hover:bg-accent-gold transition-colors duration-300"
              >
                Book Site Visit
              </button>
              <p className="text-center font-sans text-[10px] text-grey/60 uppercase tracking-[0.18em] mt-4">
                ✦ Premium Plots — Nagpur ✦
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
