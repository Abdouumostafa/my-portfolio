import type { Metadata } from "next";
import { Urbanist, BBH_Bartle } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const bbhBartle = BBH_Bartle({
  variable: "--font-bbh-bartle",
  subsets: ["latin"],
  weight: ["400"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Abdelrahman Mostafa | React Frontend Developer",
  description:
    "Abdelrahman Mostafa — React front-end developer with 3+ years of experience building web apps, dashboards, and SaaS platforms. View projects and experience.",
  openGraph: {
    title: "Abdelrahman Mostafa | React Frontend Developer",
    description:
      "React front-end developer with 3+ years building high-performance web apps, dashboards, and SaaS platforms. Explore projects and experience.",
    url: "/",
    siteName: "Abdelrahman Mostafa Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Abdelrahman Mostafa — React Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelrahman Mostafa | React Frontend Developer",
    description:
      "React front-end developer with 3+ years building high-performance web apps, dashboards, and SaaS platforms.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

/* JSON-LD structured data — helps search engines understand who this
   site belongs to and surface rich results (knowledge panel, etc.). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Abdelrahman Mostafa",
    jobTitle: "React Frontend Developer",
    url: siteUrl,
    sameAs: [
      "https://github.com/Abdouumostafa",
      "https://www.linkedin.com/in/abdelrahman-mostafa-489404224/",
      "https://www.facebook.com/abdo.mostafa.551661",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Frontend Development",
    ],
  },
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
