
import { useEffect, useRef, useState } from "react";
import { GraduationCap, Briefcase, Code2 } from "lucide-react";

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" ref={sectionRef} className="pt-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-slate-900/5 bg-grid-16"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Section Title */}
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium tracking-wide mb-6">
              About Me
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-slate-900 tracking-tight mb-6">
              Crafting Digital Experiences
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Content Section */}
            <div className="space-y-8" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
              <div className="space-y-6">
                <p className="text-xl text-slate-700 leading-relaxed font-light">
                  I'm a passionate <span className="font-semibold text-blue-600">React Front-End Developer</span> with
                  extensive experience in building modern, responsive web applications. Currently working at
                  <span className="font-semibold text-slate-900"> Blue202 USA</span>, I specialize in creating
                  sophisticated user interfaces and integrating complex functionalities with AI APIs.
                </p>

                <p className="text-lg text-slate-600 leading-relaxed font-light">
                  My expertise spans across React.js, Next.js, TypeScript, and modern animation libraries.
                  I have a proven track record of delivering international-level projects and collaborating
                  with professional teams to create seamless user experiences that drive business results.
                </p>
              </div>

              {/* Stats */}
              <div className="grid sm:grid-cols-3 grid-rows-3 gap-6 py-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">3+</div>
                  <div className="text-sm text-slate-600 font-medium">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">15+</div>
                  <div className="text-sm text-slate-600 font-medium">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                  <div className="text-sm text-slate-600 font-medium">Client Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Cards Section */}
            <div className="space-y-6 lg:mt-0 mt-20" style={{ transform: `translateY(${scrollY * -0.05}px)` }}>
              {/* Education Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Education</h3>
                      <div className="w-12 h-0.5 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-800 font-medium">Bachelor of Business Information Systems</p>
                    <p className="text-blue-600 font-medium">Georgia State University at Cairo University</p>
                    <p className="text-slate-500 text-sm">GPA: 3.4/4.0 (2020-2024)</p>
                  </div>
                </div>
              </div>

              {/* Current Role Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Briefcase className="text-indigo-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Current Role</h3>
                      <div className="w-12 h-0.5 bg-indigo-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-800 font-medium">Front-End Developer</p>
                    <p className="text-indigo-600 font-medium">Blue202, USA (Egypt Branch)</p>
                    <p className="text-slate-500 text-sm">October 2024 - Present</p>
                  </div>
                </div>
              </div>

              {/* Specialization Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Code2 className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Specialization</h3>
                      <div className="w-12 h-0.5 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-800 font-medium">React Ecosystem Expert</p>
                    <p className="text-slate-600 text-sm">Modern web technologies, AI integration, and 3D web design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
