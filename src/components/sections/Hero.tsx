
import { useEffect, useState } from "react";
import { ChevronDown, Github, Mail, Linkedin, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const fullText = "React Front-End Developer";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-16"></div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="mb-8" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
            <div className="md:mb-6 mb-0">
              <div className="inline-block px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-8 animate-fade-in">
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium tracking-wide">Available for work</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extralight mb-4 text-white leading-none tracking-tight animate-fade-in">
              ABDELRAHMAN
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extralight mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent leading-none tracking-tight animate-fade-in">
              MOSTAFA
            </h1>
          </div>

          {/* Animated Subtitle */}
          <div className="text-lg sm:text-xl md:text-3xl text-slate-300 mb-5 h-12 flex items-center justify-center font-light tracking-wide">
            <span className="border-r-2 border-blue-400 pr-3 animate-pulse">
              {displayedText}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-3 text-slate-400 mb-10 text-lg animate-slide-in-right">
            <MapPin size={20} className="text-blue-400" />
            <span className="font-light">El Maadi, Cairo, Egypt</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 text-white transition-all duration-500 hover:scale-110 backdrop-blur-md group"
              onClick={() => window.open("https://github.com/Abdouumostafa", "_blank")}
            >
              <Github size={20} className="group-hover:scale-110 transition-transform duration-300" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full bg-white/5 border-white/20 hover:bg-blue-500/20 hover:border-blue-400/40 text-white transition-all duration-500 hover:scale-110 backdrop-blur-md group"
              onClick={() => window.open("https://www.linkedin.com/in/abdelrahman-mostafa-489404224/", "_blank")}
            >
              <Linkedin size={20} className="group-hover:scale-110 transition-transform duration-300" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full bg-white/5 border-white/20 hover:bg-indigo-500/20 hover:border-indigo-400/40 text-white transition-all duration-500 hover:scale-110 backdrop-blur-md group"
              onClick={() => window.open("mailto:abdouumostafa1@gmail.com", "_blank")}
            >
              <Mail size={20} className="group-hover:scale-110 transition-transform duration-300" />
            </Button>
          </div>

          {/* CTA Button */}
          <Button
            onClick={scrollToNext}
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full text-lg font-medium transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 border-0"
          >
            Explore My Work
            <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
