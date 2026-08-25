import React from 'react';

interface SocialIconsProps {
  className?: string;
  iconClassName?: string;
}

export default function SocialIcons({ 
  className = "gap-6 text-white/70", 
  iconClassName = "w-6 h-6" 
}: SocialIconsProps) {
  const iconWrapper = "relative flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/20 hover:text-white hover:scale-110 transition-all duration-300 group";

  return (
    <div className={`flex items-center ${className}`}>
      {/* GitHub */}
      <a href="https://github.com/Abdouumostafa" target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-social="github" className={iconWrapper}>
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-opacity duration-300 -z-10" />
        <svg className={`${iconClassName} relative z-10 pointer-events-none`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      </a>
      
      {/* LinkedIn */}
      <a href="https://www.linkedin.com/in/abdelrahman-mostafa-489404224/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-social="linkedin" className={iconWrapper}>
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-opacity duration-300 -z-10" />
        <svg className={`${iconClassName} relative z-10 pointer-events-none`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </a>

      {/* Facebook */}
      <a href="https://www.facebook.com/abdo.mostafa.551661" target="_blank" rel="noopener noreferrer" aria-label="Facebook" data-social="facebook" className={iconWrapper}>
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-opacity duration-300 -z-10" />
        <svg className={`${iconClassName} relative z-10 pointer-events-none`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </a>
    </div>
  );
}
