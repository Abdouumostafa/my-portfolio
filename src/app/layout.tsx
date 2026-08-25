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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Abdelrahman Mostafa | Frontend Developer",
  description: "Portfolio built with Next.js, TypeScript, and Tailwind CSS",
  openGraph: {
    title: "Abdelrahman Mostafa | Frontend Developer",
    description: "Creative Frontend Developer crafting dynamic, high-performance web experiences. Explore my portfolio of Next.js and React projects.",
    url: "/",
    siteName: "Abdelrahman Mostafa Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelrahman Mostafa | Frontend Developer",
    description: "Creative Frontend Developer crafting dynamic, high-performance web experiences. Explore my portfolio of Next.js and React projects.",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

