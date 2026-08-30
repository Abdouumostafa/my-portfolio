import type { Metadata, Viewport } from "next";
import { Urbanist, BBH_Bartle } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { PROJECTS } from "@/data/projects";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const bbhBartle = BBH_Bartle({
  variable: "--font-bbh-bartle",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abdelrahmanmostafa.com";

export const viewport: Viewport = {
  themeColor: "#171323",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abdelrahman Mostafa | React Front-End Developer",
    template: "%s | Abdelrahman Mostafa",
  },
  description:
    "Abdelrahman Mostafa — React & Next.js Front-End Developer with 3+ years of experience crafting high-performance SaaS platforms, dashboards, and AI-integrated web applications.",
  keywords: [
    "Abdelrahman Mostafa",
    "React Developer",
    "Next.js Developer",
    "Front-End Developer",
    "TypeScript",
    "Tailwind CSS",
    "GSAP Animation",
    "SaaS Engineer",
    "Web Developer Cairo",
    "Portfolio",
  ],
  authors: [{ name: "Abdelrahman Mostafa", url: siteUrl }],
  creator: "Abdelrahman Mostafa",
  publisher: "Abdelrahman Mostafa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abdelrahman Mostafa | React Front-End Developer",
    description:
      "React & Next.js Front-End Developer crafting high-performance SaaS platforms, dashboards, and AI-integrated web applications with a syntax-first approach.",
    url: "/",
    siteName: "Abdelrahman Mostafa — Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Abdelrahman Mostafa — React Front-End Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelrahman Mostafa | React Front-End Developer",
    description:
      "React & Next.js Front-End Developer crafting scalable, high-performance web applications.",
    images: ["/og.png"],
    creator: "@Abdelrahman_Dev",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

/* JSON-LD structured data — helps search engines understand the profile */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Abdelrahman Mostafa",
      jobTitle: "React Front-End Developer",
      url: siteUrl,
      sameAs: [
        "https://github.com/Abdouumostafa",
        "https://www.linkedin.com/in/abdelrahman-mostafa-489404224/",
        "https://www.facebook.com/abdo.mostafa.551661",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Georgia State University at Cairo University",
      },
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "GSAP",
        "Front-End Architecture",
        "SaaS Development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Abdelrahman Mostafa Portfolio",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
    ...PROJECTS.map((project) => ({
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/projects/${project.id}`,
      name: project.title,
      url: `${siteUrl}/projects/${project.id}`,
      description:
        project.summary || `${project.descPrefix} ${project.descSuffix}`,
      applicationCategory: project.category,
      author: {
        "@id": `${siteUrl}/#person`,
      },
    })),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${bbhBartle.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
