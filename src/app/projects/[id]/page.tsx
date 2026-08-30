import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import ProjectStats from "@/components/ProjectStats";
import ScrollToTop from "@/components/ScrollToTop";

type PageProps = { params: Promise<{ id: string; }>; };

/**
 * One fluid gutter for the whole page. clamp() scales the padding smoothly with
 * the viewport instead of jumping at each breakpoint, so there is no width where
 * the layout feels cramped or suddenly loose.
 */
const GUTTER = "px-[clamp(1.25rem,4vw,3rem)]";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) return { title: "Project not found" };

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://abdelrahmandev.com";
  const pageUrl = `${siteUrl}/projects/${id}`;
  const description = project.summary || `${project.descPrefix} ${project.descSuffix}`;
  const ogImages = project.image
    ? [{ url: project.image.src, width: 1200, height: 630, alt: project.title }]
    : undefined;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: project.title,
      description,
      url: pageUrl,
      type: "article",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: project.image ? [project.image.src] : undefined,
    },
  };
}

/** Minimal inline formatter: turns **bold** into <strong>. */
function renderInline(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const index = PROJECTS.findIndex((p) => p.id === id);
  const project = PROJECTS[index];

  if (!project) {
    notFound();
  }

  const hasSiblings = PROJECTS.length > 1;
  const previous = hasSiblings ? PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length] : null;
  const next = hasSiblings ? PROJECTS[(index + 1) % PROJECTS.length] : null;

  return (
    /* --nav-h is declared once and reused by the header height and the content
       offset below it, so the two can never drift apart. */
    <main className="min-h-screen overflow-x-clip bg-[#0C0A15] text-white [--nav-h:64px] selection:bg-[#1E35FF] selection:text-white sm:[--nav-h:76px] lg:[--nav-h:88px]">
      <ScrollToTop />

      {/* ---------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ---------------------------------------------------------------- */}
      <header
        className="fixed left-0 top-0 z-50 flex h-[var(--nav-h)] w-full items-center border-b border-white/5 bg-[#0C0A15]/70 backdrop-blur-md"
        style={{
          paddingLeft: "max(clamp(1.25rem, 4vw, 3rem), env(safe-area-inset-left))",
          paddingRight: "max(clamp(1.25rem, 4vw, 3rem), env(safe-area-inset-right))",
        }}
      >
        <nav aria-label="Breadcrumb" className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
          <Link
            href="/#projects"
            data-no-cursor
            className="group flex min-w-0 shrink-0 items-center gap-2 rounded-full text-sm font-medium text-white/70 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D6DFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0A15] sm:gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:border-white/20 group-hover:bg-white/10 sm:h-10 sm:w-10">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            {/* The label is hidden below 400px so the category pill keeps its room. */}
            <span className="hidden min-[400px]:inline">Back to portfolio</span>
            <span className="sr-only min-[400px]:hidden">Back to portfolio</span>
          </Link>

          <p className="min-w-0 truncate rounded-full border border-[#1E35FF]/30 bg-[#1E35FF]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#7C8AFF] sm:px-4 sm:text-xs">
            {project.category}
          </p>
        </nav>
      </header>

      <article>
        {/* -------------------------------------------------------------- */}
        {/* 1. Cover image                                                  */}
        {/* -------------------------------------------------------------- */}
        <div
          className={`mx-auto w-full max-w-[1600px] pb-8 pt-[calc(var(--nav-h)+1.25rem)] sm:pb-12 sm:pt-[calc(var(--nav-h)+2rem)] ${GUTTER}`}
        >
          {/* The crop widens as the screen does: a 21/9 strip is unreadable on a
              phone, and a 4/3 block wastes the fold on a desktop. */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-white/10 bg-[#161224] shadow-[0_20px_60px_rgba(0,0,0,0.6)] min-[480px]:aspect-[3/2] md:aspect-[16/9] md:rounded-[32px] xl:aspect-[21/9] xl:rounded-[40px] xl:shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_80px_rgba(30,53,255,0.15)]">
            <Image
              src={project.image}
              alt={`${project.title} — project cover`}
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 640px) 100vw, (max-width: 1600px) 92vw, 1600px"
              className="object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[18px] border border-white/10 mix-blend-overlay md:rounded-[32px] xl:rounded-[40px]" />
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 2. Stats                                                        */}
        {/* -------------------------------------------------------------- */}
        <ProjectStats
          clientFrom={project.clientFrom}
          category={project.category}
          duration={project.duration}
          service={project.service}
        />

        {/* -------------------------------------------------------------- */}
        {/* 3. Title + summary                                              */}
        {/* -------------------------------------------------------------- */}
        <header className={`relative mx-auto flex max-w-5xl flex-col items-center text-center ${GUTTER}`}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-6 h-[45vw] max-h-[300px] w-[70vw] max-w-[400px] -translate-x-1/2 rounded-full bg-[#1E35FF] opacity-10 blur-[100px]"
          />

          {/* Fluid type: the vw term does the scaling, the rem term keeps small
              screens from collapsing to an unreadable size. */}
          <h1 className="relative z-10 mb-5 font-urbanist text-[clamp(1.85rem,1rem+4.5vw,4.5rem)] font-bold leading-[1.08] tracking-tight [text-wrap:balance] sm:mb-8">
            {project.title}
          </h1>

          <p className="relative z-10 max-w-[60ch] text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] font-light leading-relaxed text-white/70 [text-wrap:pretty]">
            {project.summary ? (
              project.summary
            ) : (
              <>
                <span className="font-semibold text-white">{project.descPrefix}</span> {project.descSuffix}
              </>
            )}
          </p>
        </header>

        {/* -------------------------------------------------------------- */}
        {/* 4. Detailed sections                                            */}
        {/* -------------------------------------------------------------- */}
        {project.details && project.details.length > 0 && (
          <div className={`mt-14 w-full border-t border-white/5 bg-[#13111C] py-14 sm:mt-20 sm:py-20 lg:py-28 ${GUTTER}`}>
            {/* Measured in ch, not px — the line length stays comfortable to read
                at every font size. */}
            <div className="mx-auto flex w-full max-w-[68ch] flex-col gap-11 sm:gap-16">
              {project.details.map((section, idx) => (
                <section key={idx} className="flex flex-col gap-4 sm:gap-6">
                  <h2 className="flex items-start gap-3 font-urbanist text-[clamp(1.3rem,0.9rem+1.6vw,2rem)] font-bold leading-snug text-white [text-wrap:balance] sm:gap-4">
                    <span aria-hidden="true" className="mt-[0.65em] h-[2px] w-6 shrink-0 bg-[#1E35FF] sm:w-8" />
                    {section.heading}
                  </h2>

                  <div className="text-[clamp(0.95rem,0.9rem+0.25vw,1.125rem)] font-light leading-relaxed text-white/70 [text-wrap:pretty]">
                    {Array.isArray(section.body) ? (
                      <ul className="flex flex-col gap-3 sm:gap-4">
                        {section.body.map((paragraph, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-3">
                            <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#5D6DFF]" />
                            <span className="min-w-0 break-words">{renderInline(paragraph)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{section.body}</p>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Previous / next project                                        */}
      {/* ---------------------------------------------------------------- */}
      {previous && next && (
        <nav
          aria-label="More projects"
          className={`border-t border-white/5 py-12 sm:py-16 lg:py-20 ${GUTTER}`}
          style={{ paddingBottom: "calc(3rem + env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 sm:gap-4">
            {[
              { sibling: previous, label: "Previous project", align: "items-start text-left" },
              { sibling: next, label: "Next project", align: "items-start text-left sm:items-end sm:text-right" },
            ].map(({ sibling, label, align }) => (
              <Link
                key={label}
                href={`/projects/${sibling.id}`}
                data-no-cursor
                className={`group flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-[#1E35FF]/40 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D6DFF] sm:gap-2 sm:p-6 ${align}`}
              >
                <span className="text-[11px] uppercase tracking-widest text-white/40 sm:text-xs">{label}</span>
                <span className="line-clamp-2 font-urbanist text-base font-semibold text-white/90 transition-colors group-hover:text-white sm:text-xl">
                  {sibling.title}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </main>
  );
}