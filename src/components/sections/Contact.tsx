
import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:abdouumostafa1@gmail.com?subject=${subject}&body=${body}`;

    window.open(mailtoLink);

    toast({
      title: "Email client opened!",
      description: "Your default email client should open with the pre-filled message.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "abdouumostafa1@gmail.com",
      href: "mailto:abdouumostafa1@gmail.com",
      color: "blue"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+201006955626",
      href: "tel:+201006955626",
      color: "indigo"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "El Maadi, Cairo, Egypt",
      href: "#",
      color: "purple"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Abdouumostafa",
      color: "hover:bg-slate-100"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abdelrahman-mostafa-489404224/",
      color: "hover:bg-blue-50 hover:text-blue-600"
    }
  ];

  const getContactColor = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-50",
      indigo: "text-indigo-600 bg-indigo-50",
      purple: "text-purple-600 bg-purple-50"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-16"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium tracking-wide mb-6">
              Get In Touch
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-white tracking-tight mb-6">
              Let's Work Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-12" style={{ transform: `translateY(${scrollY * 0.02}px)` }}>
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-white">Ready to Start a Project?</h3>
                <p className="text-white/80 text-lg leading-relaxed font-light">
                  I'm always interested in new opportunities and exciting projects.
                  Whether you're looking for a dedicated front-end developer or want to
                  collaborate on innovative web solutions, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className={`${getContactColor(item.color)} p-4 rounded-xl border border-white/10 group-hover:border-white/20 transition-all duration-300 backdrop-blur-sm`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm font-medium">{item.label}</p>
                        {item.href === "#" ? (
                          <p className="text-white font-medium">{item.value}</p>
                        ) : (
                          <a
                            href={item.href}
                            className="text-white font-medium hover:text-blue-400 transition-colors duration-300"
                          >
                            {item.value}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-8 border-t border-white/10">
                <h4 className="text-lg font-semibold mb-6 text-white">Connect With Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <Button
                        key={index}
                        // variant="outline"
                        size="icon"
                        className={`w-12 h-12 rounded-xl border-white/20 hover:border-white/40 ${social.color} transition-all duration-300 hover:scale-110 backdrop-blur-sm bg-white/5 hover:bg-white/10`}
                        onClick={() => window.open(social.href, "_blank")}
                      >
                        <Icon size={18} className="text-white" />
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-lg p-8 mt-52 rounded-2xl border border-white/10" style={{ transform: `translateY(${scrollY * -0.02}px)` }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <MessageCircle className="text-blue-400" size={20} />
                </div>
                <h3 className="text-2xl font-semibold text-white">Send Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 backdrop-blur-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    Message
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full h-32 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none backdrop-blur-sm"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 border-0 group"
                >
                  Send Message
                  <Send size={18} className="ml-3 group-hover:translate-x-1 transition-transform duration-300 text-white" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
