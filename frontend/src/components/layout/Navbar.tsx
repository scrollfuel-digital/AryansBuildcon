import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

interface NavbarProps {
  onStartProjectClick: () => void;
}

export default function Navbar({ onStartProjectClick }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>("hero-section");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", id: "hero-section", route: "/" },
    { label: "Projects", id: "projects-section", route: "/projects" },
    { label: "About", id: "about-section", route: "/about" },
  ];

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.id === activeSection),
  );

  // Active section detection (scroll position + route)
  useEffect(() => {
    const checkActiveSection = () => {
      if (location.pathname !== "/") return;

      const sectionIds = ["hero-section", "projects-section", "about-section"];
      const scrollPosition = window.scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", checkActiveSection, { passive: true });
    checkActiveSection();
    return () => window.removeEventListener("scroll", checkActiveSection);
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

  // ============ Theme tokens (black / white / gold / cream) ============
  const inactiveTextColor = "#4a4033"; // ink-soft
  const goldDark = "#8c6b2e";
  const gold = "#c9a24b";
  const goldLight = "#f9dc85";
  const ink = "#14110d";
  const black = "#0d0b08";
  const cream = "#fbf6ec";
  const border = "#e7dcc5";

  return (
    <>
      <nav
        id="main-navbar"
        className="fixed bg-white top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-16 h-[86px] md:h-[100px] transition-all duration-300"
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
            className="h-24 md:h-28 lg:h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_4px_20px_rgba(13,11,8,0.22)]"
          />
        </div>

        {/* Desktop Nav Capsule */}
        <div className="hidden md:flex items-center justify-center z-20">
          <div
            className="relative flex items-center p-1.5 rounded-full transition-all duration-500 min-w-[380px] lg:min-w-[460px]"
           
          >
            {/* Gloss strip */}
            <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none rounded-t-full z-0" />

            {/* Active pill — black with a subtle gold ring, premium instead of red/brown */}
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full pointer-events-none z-10 transition-transform duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                background: `linear-gradient(to bottom, ${ink}, ${ink} 50%, ${goldLight} 150%)`,
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
                  className="group relative flex-1 py-2 text-[14px] lg:text-[15px] font-sans font-bold uppercase tracking-[0.06em] rounded-full transition-all duration-300 ease-out cursor-pointer select-none text-center z-20 hover:scale-[1.06] hover:-translate-y-[1px] active:scale-95"
                  style={{
                    color: isActive ? goldLight : inactiveTextColor,
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  <span className="relative z-10 flex flex-col items-center justify-center overflow-hidden">
                    <span className="relative inline-block transition-all duration-300 ease-out group-hover:tracking-[0.12em]">
                      {item.label}
                      {!isActive && (
                        <span
                          className="absolute left-0 -bottom-1 h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                          style={{ backgroundColor: goldDark }}
                        />
                      )}
                    </span>
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
            className="relative overflow-hidden rounded-full px-6 py-2.5 font-sans text-[12px] lg:text-[13px] font-medium uppercase tracking-[0.10em] border hover:shadow-[0_10px_30px_rgba(13,11,8,0.30)] hover:scale-[1.05] hover:-translate-y-[1px] active:scale-95 transition-all duration-150 ease-out cursor-pointer"
            style={{ background: cream, color: ink, borderColor: border , }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = goldLight;
              e.currentTarget.style.background = black;
              e.currentTarget.style.borderColor = black;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ink;
              e.currentTarget.style.background = cream;
              e.currentTarget.style.borderColor = border;
            }}
          >
            <span className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
            <span className="relative z-10 font-bold" >Book Site Visit</span>
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
              style={{ backgroundColor: ink }}
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
                    className={`group w-full text-left font-serif text-[32px] font-normal transition-all duration-300 py-1 flex items-center justify-between ${
                      isActive ? "" : "hover:tracking-[0.02em]"
                    }`}
                    style={{ color: isActive ? goldDark : ink }}
                  >
                    <span className="relative inline-block">
                      {item.label}
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] origin-left transition-transform duration-300 ease-out ${
                          isActive
                            ? "w-full scale-x-100"
                            : "w-full scale-x-0 group-hover:scale-x-100"
                        }`}
                        style={{ backgroundColor: goldDark }}
                      />
                    </span>
                    {isActive && (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: gold }}
                      />
                    )}
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
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onStartProjectClick();
                }}
                className="w-full text-center rounded-full py-4 font-sans text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-300"
                style={{ backgroundColor: black, color: cream }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = gold;
                  e.currentTarget.style.color = black;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = black;
                  e.currentTarget.style.color = cream;
                }}
              >
                Book Site Visit
              </button>
              <p
                className="text-center font-sans text-[10px] uppercase tracking-[0.18em] mt-4"
                style={{ color: "#8a7d68" }}
              >
                ✦ Premium Plots — Nagpur ✦
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
