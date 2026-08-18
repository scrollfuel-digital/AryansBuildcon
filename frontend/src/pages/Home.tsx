import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeroSection from "../components/ui/HeroSection";
import ProjectsSection from "../components/ui/ProjectsSection";
import CompanyOverview from "../components/about/CompanyOverview";
import AboutusSection from "@/components/ui/AboutusSection";

interface HomeProps {
  onExploreProjects: () => void;
  onBookConsultation: () => void;
}

export default function Home({
  onExploreProjects,
  onBookConsultation,
}: HomeProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if an in-app navigation requested scrolling to a specific section (e.g. Services, Contact, Projects)
    if (location.state && (location.state as any).scrollToId) {
      const id = (location.state as any).scrollToId;

      // Clear the history state immediately so that future page reloads do NOT re-trigger auto-scroll
      // and instead preserve whatever section the user is currently viewing!
      navigate(location.pathname, { replace: true, state: {} });

      // Slight delay to ensure content is fully loaded and layout has settled
      const timer = setTimeout(() => {
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
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  return (
    <>
      {/* Hero Stage Section */}
      <HeroSection
        onExploreProjects={onExploreProjects}
        onBookConsultation={onBookConsultation}
      />

      {/* Curated Projects Section */}
      <ProjectsSection />

      {/* about us section */}
      <AboutusSection />
      {/* company overview */}
      <CompanyOverview />
    </>
  );
}
