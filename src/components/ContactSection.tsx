"use client";

import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const chrome: CSSProperties = {
  backgroundImage:
    "linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 62%, #F1F1F5 72%, #DEDEE5 85%, #CBCBD4 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
};

const LINES = [
  { text: "LETS", indent: "0em" },
  { text: "GET IN", indent: "0.6em" },
  { text: "TOUCH", indent: "0em" },
];

const inputClass =
  "peer w-full appearance-none rounded-none border-0 border-b border-white/25 bg-transparent pb-2 text-[16px] text-white outline-none ring-0 transition-colors duration-300 sm:text-[15px] focus:border-white focus:outline-none focus:ring-0 focus-visible:outline-none";

const labelClass =
  "pointer-events-none absolute bottom-2 left-0 origin-left text-[16px] uppercase tracking-[0.02em] text-[#D6D3E3] transition-all duration-300 ease-out sm:text-[15px] " +
  "peer-focus:-translate-y-7 peer-focus:scale-[0.78] peer-focus:text-white/55 " +
  "peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-[0.78] peer-[:not(:placeholder-shown)]:text-white/55";

const ICONS: Record<string, ReactNode> = {
  mail: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" ry="2" /><path d="M3 7l9 6 9-6" /></svg>
  ),
  phone: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
  ),
  pin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
  clock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
  ),
};

type InfoItem = {
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
};

const INFO_ITEMS: InfoItem[] = [
  {
    label: "Direct Contact - Email",
    value: "abdouumostafa1@gmail.com",
    href: "mailto:abdouumostafa1@gmail.com",
    icon: ICONS.mail,
  },
  {
    label: "Direct Contact - Phone",
    value: "+201006955626",
    href: "https://wa.me/201006955626",
    icon: ICONS.phone,
  },
  { label: "Location", value: "Maadi, Cairo, Egypt", icon: ICONS.pin },
  { label: "Response Time", value: "< 24 Hours", icon: ICONS.clock },
];

function InfoCard({ label, value, href, icon }: InfoItem) {
  return (
    <div
      {...(href
        ? {
          onClick: () => window.open(href, "_blank", "noopener,noreferrer"),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              window.open(href, "_blank", "noopener,noreferrer");
            }
          },
          role: "link",
          tabIndex: 0,
          "aria-label": `${label}: ${value}`,
        }
        : {})}
      className={[
        "group rounded-2xl border border-white/5 bg-white/[0.02] transition-colors",
        // موبايل: صف أفقي، المعلومة ظاهرة من غير hover
        "flex items-center gap-4 p-4",
        // md وفوق: الشكل العمودي الأصلي
        "md:flex-col md:items-center md:justify-center md:gap-0 md:p-6",
        href
          ? "cursor-pointer hover:bg-white/[0.04] active:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          : "",
      ].join(" ")}
    >
      {/* أيقونة الموبايل */}
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#2323E8] text-white md:hidden">
        {icon}
      </span>

      <span className="min-w-0 flex-1 md:w-full md:flex-none">
        <span className="block text-[10px] uppercase tracking-widest text-white/50 md:mb-4 md:text-center">
          {label}
        </span>

        {/* القيمة على الموبايل */}
        <span className="mt-1 block truncate text-[15px] font-medium text-white md:hidden">
          {value}
        </span>

        {/* md وفوق: أيقونة + كشف القيمة عند الـ hover */}
        <span className="hidden h-10 w-full items-center justify-center overflow-hidden md:flex">
          <span className="flex items-center transition-all duration-300 group-hover:gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#2323E8] text-white">
              {icon}
            </span>
            <span className="grid grid-cols-[0fr] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-cols-[1fr] group-hover:opacity-100">
              <span className="overflow-hidden whitespace-nowrap">
                <span className="text-[13px] font-medium text-white lg:text-[11px] xl:text-[13px]">
                  {value}
                </span>
              </span>
            </span>
          </span>
        </span>
      </span>
    </div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // الأنيميشن بيتلغّي بالكامل لو المستخدم مفعّل "تقليل الحركة" —
      // ومفيش حالة مخفية متسيبة، لأن كل القيم في fromTo مش في CSS.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (textRef.current) {
          gsap.fromTo(
            textRef.current.querySelectorAll(".contact-text-line"),
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 1.2,
              stagger: 0.08,
              ease: "expo.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (formRef.current) {
          gsap.fromTo(
            gsap.utils.toArray(".contact-field"),
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: formRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          gsap.fromTo(
            ".contact-btn",
            { autoAlpha: 0, scale: 0.9 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: ".contact-btn",
                start: "top 95%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = String(formData.get("fullName") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const message = String(formData.get("message") ?? "");

    // encodeURIComponent ضروري: غيره أي & أو # في الرسالة بيكسر الـ mailto
    const subject = encodeURIComponent(`Portfolio Contact from ${fullName}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:abdouumostafa1@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden bg-[#17151F] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Typography */}
          <div className="flex flex-col items-start justify-center">
            <h2
              ref={textRef}
              className="flex w-fit max-w-full flex-col items-start font-bartle uppercase leading-[1] tracking-[-0.02em] whitespace-nowrap select-none"
              style={{ fontSize: "clamp(2.75rem, 11vw, 5rem)" }}
              aria-label="Let's get in touch"
            >
              {LINES.map(({ text, indent }) => (
                <span key={text} className="block w-full overflow-hidden" aria-hidden="true">
                  <span
                    className="contact-text-line block w-full"
                    style={{ ...chrome, paddingLeft: indent }}
                  >
                    {text}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          {/* Right Column: Form */}
          <div className="flex flex-col justify-center">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-8 sm:gap-10"
            >
              {/* Full Name */}
              <div className="contact-field relative pt-7">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder=" "
                  autoComplete="name"
                  className={inputClass}
                  required
                />
                <label htmlFor="fullName" className={labelClass}>
                  Full Name
                </label>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
                <div className="contact-field relative pt-7">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    autoComplete="email"
                    inputMode="email"
                    className={inputClass}
                    required
                  />
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                </div>
                <div className="contact-field relative pt-7">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder=" "
                    autoComplete="tel"
                    inputMode="tel"
                    className={inputClass}
                  />
                  <label htmlFor="phone" className={labelClass}>
                    Phone Number
                  </label>
                </div>
              </div>

              {/* Message */}
              <div className="contact-field relative pt-7">
                <textarea
                  id="message"
                  name="message"
                  rows={1}
                  placeholder=" "
                  className={`${inputClass} resize-none`}
                  required
                />
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
              </div>

              {/* Submit Button */}
              <div className="contact-btn mt-4 flex justify-stretch sm:justify-end">
                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#2323E8] px-9 py-4 text-[15px] font-medium text-white transition-transform active:scale-[0.98] sm:w-auto sm:hover:scale-105 sm:hover:shadow-[0_0_28px_rgba(35,35,232,0.45)]"
                >
                  <span className="relative z-10">Send Message</span>
                  <svg
                    className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="19" x2="19" y2="5" />
                    <polyline points="10 5 19 5 19 14" />
                  </svg>
                  <span className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Information Cards */}
        <div className="mt-14 grid w-full grid-cols-1 gap-3 sm:mt-16 md:mt-20 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {INFO_ITEMS.map((item) => (
            <InfoCard key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}