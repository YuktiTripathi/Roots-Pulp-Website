import type { ReactNode } from "react";

const frames: Record<string, ReactNode> = {
  "root-canal-treatment": (
    <>
      <path d="M320 78c46 0 78 28 88 78 12 62-6 96-10 118l-22 92c-8 28-28 46-56 46s-48-18-56-46l-22-92c-4-22-22-56-10-118 10-50 42-78 88-78Z" fill="#102048" />
      <path d="M292 196c8 36 10 70 6 108M320 188c2 40 0 78-2 116M348 196c-8 36-10 70-6 108" stroke="#d7ebe8" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M268 132c34 18 70 18 104 0" stroke="#a81820" strokeWidth="6" fill="none" strokeLinecap="round" />
    </>
  ),
  "dental-implants": (
    <>
      <path d="M250 92h140c18 0 28 16 24 34l-18 78c-6 28-24 40-46 40h-20c-22 0-40-12-46-40l-18-78c-4-18 6-34 24-34Z" fill="#102048" />
      <path d="M300 244h40l8 28-14 18-28 0-14-18 8-28Z" fill="#0e4a47" />
      <path d="M308 292c6 16 4 28-2 48 8 6 20 6 28 0-6-20-8-32-2-48" stroke="#102048" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M286 150c28 10 50 10 78 0" stroke="#a81820" strokeWidth="6" fill="none" strokeLinecap="round" />
    </>
  ),
  "crowns-and-bridges": (
    <>
      <path d="M214 150h70c10 0 16 10 14 20l-10 70c-6 28-20 40-39 40s-33-12-39-40l-10-70c-2-10 4-20 14-20Z" fill="#1c3566" />
      <path d="M292 118h78c14 0 22 12 18 26l-16 96c-8 36-26 52-51 52s-43-16-51-52l-16-96c-4-14 4-26 18-26Z" fill="#102048" />
      <path d="M386 150h70c10 0 16 10 14 20l-10 70c-6 28-20 40-39 40s-33-12-39-40l-10-70c-2-10 4-20 14-20Z" fill="#1c3566" />
      <path d="M314 168c18 8 38 8 56 0" stroke="#a81820" strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ),
  "braces-and-aligners": (
    <>
      <path d="M150 210c40-70 90-100 170-100s130 30 170 100" stroke="#102048" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M176 196c36-48 78-70 144-70s108 22 144 70" stroke="#0e4a47" strokeWidth="3" fill="none" />
      {[210, 260, 320, 380, 430].map((x) => (
        <rect key={x} x={x - 10} y="168" width="20" height="16" rx="3" fill="#f7f3eb" stroke="#102048" strokeWidth="2" />
      ))}
      <path d="M250 250c40 18 100 18 140 0" stroke="#a81820" strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ),
  "childrens-dentistry": (
    <>
      <circle cx="320" cy="200" r="92" fill="none" stroke="#0e4a47" strokeOpacity="0.35" strokeWidth="2" />
      <path d="M268 150c22-28 82-28 104 0 16 22 10 40 6 58-6 28-18 40-28 58-8 14-18 18-30 18s-22-4-30-18c-10-18-22-30-28-58-4-18-10-36 6-58Z" fill="#102048" />
      <path d="M292 176c16 8 40 8 56 0" stroke="#a81820" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="214" cy="132" r="8" fill="#0e4a47" fillOpacity="0.45" />
      <circle cx="430" cy="148" r="6" fill="#102048" fillOpacity="0.25" />
    </>
  ),
  "cosmetic-dentistry": (
    <>
      <path d="M170 230c50-90 110-120 150-120s100 30 150 120" stroke="#102048" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M196 214c42-62 90-86 124-86s82 24 124 86" stroke="#f7f3eb" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M230 248c46 22 134 22 180 0" stroke="#a81820" strokeWidth="6" fill="none" strokeLinecap="round" />
    </>
  ),
};

export function TreatmentIllustration({ slug }: { slug: string }) {
  return (
    <svg className="treat-art" viewBox="0 0 640 420" aria-hidden="true">
      <rect width="640" height="420" fill="#e7eef2" />
      <circle cx="120" cy="70" r="70" fill="none" stroke="#102048" strokeOpacity="0.12" />
      <circle cx="540" cy="340" r="90" fill="none" stroke="#0e4a47" strokeOpacity="0.18" />
      {frames[slug] ?? frames["root-canal-treatment"]}
    </svg>
  );
}

export function TreatmentGlyph({ slug }: { slug: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="glyph">
      <path
        d="M16 4c3.2 0 5.4 2 6.2 5.2.8 3.6-.2 5.6-.6 7l-1.4 6.2c-.5 1.8-1.8 3-4.2 3s-3.7-1.2-4.2-3L10.4 16.2c-.4-1.4-1.4-3.4-.6-7C10.6 6 12.8 4 16 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {slug === "braces-and-aligners" ? <path d="M8 20h16" stroke="currentColor" strokeWidth="1.4" /> : null}
      {slug === "dental-implants" ? <path d="M16 22v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /> : null}
    </svg>
  );
}
