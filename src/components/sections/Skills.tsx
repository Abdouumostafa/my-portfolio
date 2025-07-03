
import { useEffect, useRef, useState } from "react";
import { Code, Palette, Wrench, Zap } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Core Technologies",
    icon: Code,
    color: "blue",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"]
  },
  {
    title: "Frameworks & Libraries",
    icon: Palette,
    color: "indigo",
    skills: ["React.js", "Next.js", "React Native", "Bootstrap", "Tailwind CSS", "SASS"]
  },
  {
    title: "Development Tools",
    icon: Wrench,
    color: "purple",
    skills: ["Responsive Design", "Cross-browser Compatibility", "Framer Motion", "Three.js"]
  },
  {
    title: "Specializations",
    icon: Zap,
    color: "violet",
    skills: ["Modern Animations", "3D Web Design", "API Integration", "Performance Optimization"]
  }
];

export const Skills = () => {
  const [visibleCategories, setVisibleCategories] = useState<number[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = categoryRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1 && !visibleCategories.includes(index)) {
              setTimeout(() => {
                setVisibleCategories(prev => [...prev, index]);
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    categoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleCategories]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        icon: "text-blue-600",
        bg: "from-blue-50 to-white",
        border: "border-blue-100",
        hover: "hover:border-blue-200",
        shadow: "hover:shadow-blue-500/10"
      },
      indigo: {
        icon: "text-indigo-600",
        bg: "from-indigo-50 to-white",
        border: "border-indigo-100",
        hover: "hover:border-indigo-200",
        shadow: "hover:shadow-indigo-500/10"
      },
      purple: {
        icon: "text-purple-600",
        bg: "from-purple-50 to-white",
        border: "border-purple-100",
        hover: "hover:border-purple-200",
        shadow: "hover:shadow-purple-500/10"
      },
      violet: {
        icon: "text-violet-600",
        bg: "from-violet-50 to-white",
        border: "border-violet-100",
        hover: "hover:border-violet-200",
        shadow: "hover:shadow-violet-500/10"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium tracking-wide mb-6">
            Technical Expertise
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-6">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {skillCategories.map((category, index) => {
            const colorClasses = getColorClasses(category.color);
            const Icon = category.icon;

            return (
              <div
                key={index}
                ref={(el) => (categoryRefs.current[index] = el)}
                className={`transition-all duration-1000 ${visibleCategories.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
                  }`}
              >
                <div className={`bg-gradient-to-br ${colorClasses.bg} p-8 rounded-2xl border ${colorClasses.border} ${colorClasses.hover} hover:shadow-2xl ${colorClasses.shadow} transition-all duration-500 h-full group hover:-translate-y-2`}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`${colorClasses.icon}`} size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{category.title}</h3>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={`text-slate-600 text-sm p-3 bg-white/80 rounded-xl border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-sm font-medium ${visibleCategories.includes(index) ? 'animate-fade-in' : ''
                          }`}
                        style={{ animationDelay: `${skillIndex * 50}ms` }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center flex-col sm:flex-row gap-8 bg-gradient-to-r from-white to-slate-50 p-8 rounded-2xl border border-slate-200 shadow-xl">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3+</div>
              <div className="text-sm text-slate-600 font-medium">Years Experience</div>
            </div>
            {/* <div className="w-px h-16 bg-slate-200"></div> */}
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">15+</div>
              <div className="text-sm text-slate-600 font-medium">Projects Delivered</div>
            </div>
            {/* <div className="w-px h-16 bg-slate-200"></div> */}
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-sm text-slate-600 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
