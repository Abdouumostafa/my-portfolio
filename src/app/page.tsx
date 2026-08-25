import HeroNavTransition from "@/components/HeroNavTransition";

export default function Home() {
  return (
    <main>
      <HeroNavTransition>
        {/* Placeholder sections to enable scrolling past the hero */}
        <section id="about" className="min-h-screen bg-grey-darker flex items-center justify-center">
          <h2 className="font-bartle text-4xl sm:text-6xl text-white/20 uppercase">About Me</h2>
        </section>
        <section id="projects" className="min-h-screen bg-background flex items-center justify-center">
          <h2 className="font-bartle text-4xl sm:text-6xl text-white/20 uppercase">Projects</h2>
        </section>
        <section id="work" className="min-h-screen bg-grey-darker flex items-center justify-center">
          <h2 className="font-bartle text-4xl sm:text-6xl text-white/20 uppercase">Work Experience</h2>
        </section>
        <section id="skills" className="min-h-screen bg-background flex items-center justify-center">
          <h2 className="font-bartle text-4xl sm:text-6xl text-white/20 uppercase">Skills &amp; Tech</h2>
        </section>
      </HeroNavTransition>
    </main>
  );
}
