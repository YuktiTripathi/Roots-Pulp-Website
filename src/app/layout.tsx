import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/dm-sans";
import "@fontsource/dm-serif-display/400.css";
import "@fontsource/dm-serif-display/400-italic.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteCursor } from "@/components/SiteCursor";
import { FloatingContactActions } from "@/components/FloatingContactActions";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { clinic, homeSeo, siteUrl } from "@/lib/clinic";
import { clinicJsonLd, doctorJsonLd, websiteJsonLd } from "@/lib/schema";
import { defaultOgImage, jsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeSeo.title,
    template: "%s",
  },
  description: homeSeo.description,
  applicationName: clinic.name,
  robots: { index: true, follow: true, "max-image-preview": "large" },
  formatDetection: { telephone: false },
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    siteName: clinic.name,
    locale: "en_IN",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: homeSeo.description,
    images: [defaultOgImage.url],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const graph = [clinicJsonLd(), websiteJsonLd(), doctorJsonLd()];

  return (
    <html lang="en">
      <head>
        {/*
          Decorative script face for the 12px logo tagline. Loaded as a non-blocking stylesheet
          (media="print", switched to "all" once loaded) so a third-party host never delays first paint.
        */}
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="" />
        <link id="script-font" rel="stylesheet" href="https://fonts.cdnfonts.com/css/playlist-script" media="print" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var l=document.getElementById('script-font');if(!l)return;var on=function(){l.media='all'};if(l.sheet)on();else l.addEventListener('load',on);})();",
          }}
        />
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
        <FloatingContactActions />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(graph)} />
      </body>
    </html>
  );
}
