
import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin } from "lucide-react";

interface ExperienceItem {
  company: string;
  position: string;
  location: string;
  period: string;
  description: string[];
  website?: string;
  current?: boolean;
  color: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Blue202, USA",
    position: "Front-End Developer (React JS, Next JS, React Native)",
    location: "On site in Egypt branch",
    period: "October 2024 – Present",
    description: [
      "Developed SIAA website with complex functionalities and collaborated with professional back-end to integrate with AI API (ChatGPT)",
      "Made comprehensive refactor for the overall website including dashboard implementation",
      "Built Seller-AMP website with advanced functionalities integrated with Keepa API for Amazon product monitoring"
    ],
    current: true,
    color: "blue"
  },
  {
    company: "PROGO, Cairo",
    position: "Front-End Developer (React JS, Next JS)",
    location: "Remote",
    period: "September 2023 – August 2024",
    description: [
      "Worked directly with international clients to deliver high-quality projects",
      "Integrated back-end functionality with designer mockups for seamless user experiences",
      "Built and maintained websites and web applications using React JS and Next JS",
      "Collaborated with design team and back-end developers to ensure project success"
    ],
    color: "indigo"
  },
  {
    company: "Clouds Zone, Saudi Arabia",
    position: "Front-End Developer (Internship)",
    location: "Remote",
    period: "July 2023 – September 2023",
    description: [
      "Participated in hands-on internship working on real client projects for Saudi market",
      "Developed websites and control panels in collaboration with back-end developers",
      "Focused on optimizing front-end performance and ensuring smooth integration with back-end services"
    ],
    color: "purple"
  }
];

export const Experience = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1 && !visibleItems.includes(index)) {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleItems]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        dot: "bg-blue-500 border-blue-200",
        accent: "text-blue-600",
        bg: "from-blue-50 to-white",
        border: "border-blue-100",
        shadow: "hover:shadow-blue-500/10"
      },
      indigo: {
        dot: "bg-indigo-500 border-indigo-200",
        accent: "text-indigo-600",
        bg: "from-indigo-50 to-white",
        border: "border-indigo-100",
        shadow: "hover:shadow-indigo-500/10"
      },
      purple: {
        dot: "bg-purple-500 border-purple-200",
        accent: "text-purple-600",
        bg: "from-purple-50 to-white",
        border: "border-purple-100",
        shadow: "hover:shadow-purple-500/10"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="experience" ref={sectionRef} className="pt-32 pb-44 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-slate-900/5 bg-grid-16"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium tracking-wide mb-6">
            Professional Journey
          </div>
          <h2 className="text-5xl md:text-6xl font-light text-slate-900 tracking-tight mb-6">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          {experiences.map((exp, index) => {
            const colorClasses = getColorClasses(exp.color);

            return (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`mb-12 transition-all duration-1000 ${visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
                  }`}
                style={{ transform: `translateY(${scrollY * 0.02 * (index + 1)}px)` }}
              >
                <div className="relative group">
                  {/* Timeline */}
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-slate-200 to-transparent hidden lg:block"></div>
                  <div className={`absolute left-6 top-12 w-4 h-4 ${colorClasses.dot} border-4 rounded-full hidden lg:block group-hover:scale-125 transition-transform duration-300`}></div>

                  <div className="lg:ml-20 relative">
                    <div className={`bg-gradient-to-br ${colorClasses.bg} p-8 rounded-2xl shadow-lg hover:shadow-2xl ${colorClasses.shadow} transition-all duration-500 border ${colorClasses.border} group-hover:-translate-y-2 ${exp.current ? 'ring-2 ring-blue-200 shadow-blue-500/20' : ''
                      }`}>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-semibold text-slate-900 mb-2">{exp.company}</h3>
                          <p className={`${colorClasses.accent} font-medium text-lg`}>{exp.position}</p>
                        </div>
                        {exp.current && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full font-medium">
                              Current
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-6 mb-6 text-slate-500">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span className="text-sm font-medium">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span className="text-sm font-medium">{exp.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <ul className="space-y-3 mb-6">
                        {exp.description.map((item, idx) => (
                          <li key={idx} className="text-slate-600 leading-relaxed flex items-start gap-3 text-sm">
                            <span className={`w-1.5 h-1.5 ${colorClasses.dot.split(' ')[0]} rounded-full flex-shrink-0 mt-2`}></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
