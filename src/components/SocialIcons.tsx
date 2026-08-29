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

      {/* WhatsApp */}
      <a href="https://wa.me/201006955626" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" data-social="whatsapp" className={iconWrapper}>
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-opacity duration-300 -z-10" />
        <svg className={`${iconClassName} relative z-10 pointer-events-none p-0.5`} viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
