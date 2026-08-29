import HeroNavTransition from "@/components/HeroNavTransition";
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
const SkillsSection = dynamic(() => import("@/components/SkillsSection"), {
  ssr: true,
});
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  ssr: true,
});

export default function Home() {
  return (
    <main>
      <HeroNavTransition>
        <AboutSection />
        <WorkSection />
        <ProjectsSection />
        <StatsSection />
        <SkillsSection />
        <ContactSection />
      </HeroNavTransition>
    </main>
  );
}
