"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function AnimatedButton({
  href,
  children,
  icon,
  className = "",
  target,
  rel,
}: AnimatedButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      data-no-cursor
      className={`group relative z-0 flex min-h-[48px] w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-3 text-[13px] font-medium text-white/80 transition-colors duration-300 hover:border-white/15 hover:text-white sm:gap-3 sm:px-5 sm:py-3.5 sm:text-sm ${className}`}
    >
      {/* curtain fill */}
      <span className="absolute inset-0 -z-10 translate-y-full bg-[#2323E8] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-active:translate-y-0" />

      {icon && (
        <span className="relative flex shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </span>
      )}

      {/* vertical text swap */}
      <span className="relative block overflow-hidden whitespace-nowrap leading-[1.4]">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
    </Link>
  );
}