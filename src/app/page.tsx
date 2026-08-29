import HeroNavTransition from "@/components/HeroNavTransition";
import SectionTitle from "@/components/SectionTitle";
import AboutSection from "@/components/AboutSection";
import dynamic from "next/dynamic";

const ProjectsSection = dynamic(() => import("@/components/ProjectsSection"), {
  ssr: true,
});
const WorkSection = dynamic(() => import("@/components/WorkSection"), {
  ssr: true,
});
const StatsSection = dynamic(() => import("@/components/StatsSection"), {
  ssr: true,
});

export default function Home() {
  return (
    <main>
      <HeroNavTransition>
        <AboutSection />
        <ProjectsSection />
        <WorkSection />
        <StatsSection />
        <section
          id="skills"
          className="content-auto min-h-screen bg-background flex flex-col items-center justify-center"
        >
          <SectionTitle line1="SKILLS &" line2="TECHNOLOGIES" />
        </section>
      </HeroNavTransition>
    </main>
  );
}
