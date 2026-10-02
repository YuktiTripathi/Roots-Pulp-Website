import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, DM_Serif_Display, Lato, Montserrat } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileActionBar } from "@/components/MobileActionBar";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SiteCursor } from "@/components/SiteCursor";
import { clinic, homeSeo, siteUrl } from "@/lib/clinic";
import { clinicJsonLd, websiteJsonLd } from "@/lib/schema";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || "http://localhost:3000"),
  title: {
    default: homeSeo.title,
    template: "%s",
  },
  description: homeSeo.description,
  applicationName: clinic.name,
  robots: { index: true, follow: true },
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    siteName: clinic.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Roots & Pulp Dental Clinic, Aliganj, Lucknow",
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const graph = [clinicJsonLd(), websiteJsonLd()].filter(Boolean);

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${montserrat.variable} ${lato.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/playlist-script" />
      </head>
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <SiteCursor />
        <Header />
        <RevealOnScroll />
        {children}
        <Footer />
        <MobileActionBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      </body>
    </html>
  );
}
