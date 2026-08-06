import CompanyOverview from "./CompanyOverview";
import FounderStory from "./FounderStory";
import MissionVision from "./MissionVision";

export default function AboutSection() {
  return (
    <section id="about-section" className="py-20 md:py-32 bg-[#F5F2EC]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-24">
        <FounderStory />
        <MissionVision />
      </div>
    </section>
  );
}

export { CompanyOverview, FounderStory, MissionVision };
