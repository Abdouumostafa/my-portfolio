import HeroNavTransition from "@/components/HeroNavTransition";
import SectionTitle from "@/components/SectionTitle";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main>
      <HeroNavTransition>
        <AboutSection />
        <ProjectsSection />
        <section id="work" className="content-auto min-h-screen bg-grey-darker flex flex-col items-center justify-center">
          <SectionTitle line1="WORK" line2="EXPERIENCE" />
        </section>
        <section id="skills" className="content-auto min-h-screen bg-background flex flex-col items-center justify-center">
          <SectionTitle line1="SKILLS &" line2="TECHNOLOGIES" />
        </section>
      </HeroNavTransition>
    </main>
  );
}
