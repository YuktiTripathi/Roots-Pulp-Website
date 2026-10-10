/**
 * Verified clinic facts from the September 2026 production copy deck.
 * Values marked unverified stay empty or unpublished until the clinic confirms them.
 */

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://rootsandpulp.com").replace(/\/$/, "");

/** Public links supplied by the clinic. An environment variable, when set, overrides the default. */
const envUrl = (value: string | undefined) => value?.trim() || "";

/** Google Business Profile share link. */
export const googleBusinessProfileUrl =
  envUrl(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL) || "https://share.google/jGRRvI3dgHxa6rNE4";

/** Google Maps link of the Business Profile. */
export const googleMapsUrl = envUrl(process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL) || "https://maps.app.goo.gl/FVM4m11smeKyYTb2A";

/** Official Instagram. */
export const instagramUrl = envUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL) || "https://www.instagram.com/roots_n_pulp/";

/** [VERIFY] Latitude / longitude from the Business Profile pin. */
export const clinicLatitude = process.env.NEXT_PUBLIC_CLINIC_LAT ?? "";
export const clinicLongitude = process.env.NEXT_PUBLIC_CLINIC_LNG ?? "";

export const clinic = {
  name: "Roots & Pulp Dental Clinic",
  streetAddress: "ED-362, Sector-Q, Aliganj",
  /** First line of the address, used where the locality is shown separately. */
  addressLine1: "ED-362, Sector-Q",
  neighbourhood: "Aliganj",
  locality: "Lucknow",
  region: "Uttar Pradesh",
  postalCode: "226024",
  country: "India",
  countryCode: "IN",
  landmark: "Near Saraswati Vidya Mandir School",
  phoneDisplay: "+91 6386080239",
  phoneTel: "+916386080239",
  phoneSchema: "+91 63860 80239",
  whatsappDisplay: "+91 7746989097",
  whatsappE164: "917746989097",
  whatsappPrefill: "Hello Roots & Pulp Dental Clinic, I would like to book a dental appointment.",
  tagline: "Your smile is our reward.",
  disclaimer:
    "Website information is for general awareness and does not replace a professional dental examination.",
  /** One-line description used in structured data. */
  description:
    "Dental clinic in Sector Q, Aliganj, Lucknow, led by Dr. Shubham Tripathi (BDS, MPH). Checkups, root canal treatment, implants, crowns, braces and aligners, and children's dentistry. Open 7 days.",
} as const;

/** Confirmed by the clinic: 8+ years. Use these everywhere; never type the number elsewhere. */
export const doctorExperience = {
  short: "8+ Years",
  detail: "of Experience",
  inline: "8+ years of clinical experience",
} as const;

export const doctor = {
  name: "Dr. Shubham Tripathi",
  honorificPrefix: "Dr.",
  givenName: "Shubham Tripathi",
  credentials: "BDS, MPH",
  role: "Founder & Director",
  registration: "Reg. No. 20606, U.P. State Dental Council",
  portrait: "/images/dr-shubham-tripathi.webp",
  portraitWidth: 674,
  portraitHeight: 1100,
  heroAlt: "Dr. Shubham Tripathi in navy scrubs with dental loupes, smiling with arms folded",
  profileAlt: "Dr. Shubham Tripathi, dental surgeon and founder of Roots & Pulp Dental Clinic",
  quote: "A smile is the simplest way to spread happiness and creating it is my passion.",
} as const;

/**
 * Drop the clinic film at this path, then it autoplays in the homepage hero.
 * Leave empty until a real, licensed clinic video is supplied.
 */
export const heroVideoPath = "/assets/clinic-hero.mp4";
export const heroVideoSrc = process.env.NEXT_PUBLIC_HERO_VIDEO || "";
export const heroPoster = "/images/hero-poster.jpg";

export function telHref() {
  return `tel:${clinic.phoneTel}`;
}

export function whatsappHref(message: string = clinic.whatsappPrefill) {
  return `https://wa.me/${clinic.whatsappE164}?text=${encodeURIComponent(message)}`;
}

/** Online booking page on Kivi Health. */
export const bookingUrl = "https://kivihealth.com/iam/dr.shubham.tripathi.d4cuynx3jxpn/bookslot";

export const directionsUrl =
  googleMapsUrl ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${clinic.name}, ${clinic.streetAddress}, ${clinic.locality}, ${clinic.region} ${clinic.postalCode}`,
  )}`;

export const fullAddress = `${clinic.streetAddress}, ${clinic.locality}, ${clinic.region} ${clinic.postalCode}`;

export type NavItem = {
  label: string;
  href: string;
  launched: boolean;
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/", launched: true },
  { label: "About", href: "/about/", launched: true },
  { label: "Treatments", href: "/treatments/", launched: true },
  { label: "Doctor", href: "/doctor/dr-shubham-tripathi/", launched: true },
  { label: "Gallery", href: "/gallery/", launched: true },
  { label: "Smile Gallery", href: "/smile-gallery/", launched: false },
  { label: "Reviews", href: "/reviews/", launched: true },
  { label: "Dental Guides", href: "/guides/", launched: false },
  { label: "Contact", href: "/contact/", launched: true },
];

export const launchedNavigation = navigation.filter((item) => item.launched);

export type Treatment = {
  slug: string;
  name: string;
  /** Homepage featured card. Only the six approved home descriptions. */
  homeSummary?: string;
  /** One line from the treatments overview. */
  overview: string;
  group: string;
  featured?: boolean;
};

export const treatments: Treatment[] = [
  {
    slug: "teeth-cleaning",
    name: "Teeth Cleaning",
    overview: "Removes plaque and tartar that brushing misses, to keep gums healthy.",
    group: "Everyday & preventive care",
  },
  {
    slug: "tooth-coloured-fillings",
    name: "Tooth-Coloured Fillings",
    overview: "Repair cavities with fillings matched to your natural teeth.",
    group: "Everyday & preventive care",
  },
  {
    slug: "tooth-extraction",
    name: "Tooth Extraction",
    overview: "Gentle removal of a tooth that can't be saved, with clear aftercare.",
    group: "Everyday & preventive care",
  },
  {
    slug: "gum-and-oral-health",
    name: "Gum & Oral Health",
    overview: "Treatment for bleeding or receding gums, plus oral cancer screening.",
    group: "Everyday & preventive care",
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    homeSummary: "Save an infected or badly decayed tooth and relieve the pain it causes.",
    overview: "Removes infection from inside a tooth so you can keep it. Performed with rotary endodontics.",
    group: "Saving and restoring teeth",
    featured: true,
  },
  {
    slug: "crowns-and-bridges",
    name: "Crowns & Bridges",
    homeSummary: "Protect a weakened tooth, or fill the gap left by a missing one.",
    overview: "Protect a weakened tooth, or replace a missing one with a fixed bridge. Includes inlays and onlays.",
    group: "Saving and restoring teeth",
    featured: true,
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    homeSummary: "A fixed replacement for a missing tooth, anchored in the jawbone.",
    overview: "A fixed, natural-looking replacement anchored in the jawbone.",
    group: "Replacing missing teeth",
    featured: true,
  },
  {
    slug: "dentures",
    name: "Dentures",
    overview: "Removable partial or complete dentures, made to fit comfortably.",
    group: "Replacing missing teeth",
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    overview: "Brighten stained or dull teeth, with realistic expectations set upfront.",
    group: "Cosmetic dentistry",
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    homeSummary: "Whitening, reshaping and restorations planned around your smile.",
    overview: "Reshaping, bonding and restorations planned around your smile.",
    group: "Cosmetic dentistry",
    featured: true,
  },
  {
    slug: "braces-and-aligners",
    name: "Braces & Aligners",
    homeSummary: "Straighten teeth with fixed braces or removable clear aligners.",
    overview: "Fixed braces or removable clear aligners, for teens and adults.",
    group: "Straightening teeth",
    featured: true,
  },
  {
    slug: "childrens-dentistry",
    name: "Children's Dentistry",
    homeSummary: "Gentle checkups and early care for milk teeth and growing smiles.",
    overview: "Gentle checkups, cavity prevention and early care for growing smiles.",
    group: "For children",
    featured: true,
  },
];

export const featuredTreatments = [
  "root-canal-treatment",
  "dental-implants",
  "crowns-and-bridges",
  "braces-and-aligners",
  "childrens-dentistry",
  "cosmetic-dentistry",
]
  .map((slug) => treatments.find((item) => item.slug === slug))
  .filter((item): item is Treatment => Boolean(item));

export const treatmentGroups = [
  "Everyday & preventive care",
  "Saving and restoring teeth",
  "Replacing missing teeth",
  "Cosmetic dentistry",
  "Straightening teeth",
  "For children",
] as const;

export function treatmentHref(slug: string) {
  return `/treatments/${slug}/`;
}

export const concerns = [
  {
    title: "My tooth hurts",
    detail: "Root canal treatment, fillings",
    href: treatmentHref("root-canal-treatment"),
    treatmentSlugs: ["tooth-coloured-fillings", "root-canal-treatment", "tooth-extraction"],
  },
  {
    title: "I'm missing a tooth",
    detail: "Implants, bridges, dentures",
    href: treatmentHref("dental-implants"),
    treatmentSlugs: ["dental-implants", "crowns-and-bridges", "dentures"],
  },
  {
    title: "My gums bleed or feel sore",
    detail: "Gum care and cleaning",
    href: treatmentHref("gum-and-oral-health"),
    treatmentSlugs: ["gum-and-oral-health", "teeth-cleaning"],
  },
  {
    title: "I want to improve my smile",
    detail: "Whitening, cosmetic dentistry, braces and aligners",
    href: treatmentHref("cosmetic-dentistry"),
    treatmentSlugs: ["braces-and-aligners", "teeth-whitening", "cosmetic-dentistry"],
  },
  {
    title: "My child needs dental care",
    detail: "Children's dentistry",
    href: treatmentHref("childrens-dentistry"),
    treatmentSlugs: ["childrens-dentistry"],
  },
  {
    title: "I just need a check-up",
    detail: "Check-ups and cleaning",
    href: treatmentHref("teeth-cleaning"),
    treatmentSlugs: ["teeth-cleaning", "gum-and-oral-health"],
  },
] as const;

export const treatmentExplorerTabs = treatmentGroups.map((group) => ({
  group,
  label: group,
}));

export const carePrinciples = [
  {
    num: "01",
    title: "You'll understand your treatment",
    body: "We explain what we find and walk you through your options before anything begins.",
  },
  {
    num: "02",
    title: "Prevention comes first",
    body: "Public health training means we focus on keeping problems from coming back.",
  },
  {
    num: "03",
    title: "Open seven days",
    body: "Monday to Saturday until 8 PM, and Sundays until 5 PM, so care fits around work and school.",
  },
] as const;

export const expectations = [
  {
    title: "The same dentist, every visit",
    body: "Dr. Tripathi plans and oversees your care from first consultation to follow-up.",
    /** [VERIFY: confirm he sees every patient] */
    published: false,
  },
  {
    title: "You'll understand your treatment",
    body: "We explain what we find and walk you through your options before anything begins.",
    published: true,
  },
  {
    title: "Prevention comes first",
    body: "Public health training means we focus on keeping problems from coming back.",
    published: true,
  },
  {
    title: "Open seven days",
    body: "Monday to Saturday until 8 PM, and Sundays until 5 PM, so care fits around work and school.",
    published: true,
  },
] as const;

/** Homepage "Inside the clinic" grid. Spaces only; people photos live in the showcase carousel above it. */
export const clinicPhotos = [
  {
    src: "/images/clinic-entrance.jpg",
    width: 1024,
    height: 963,
    caption: "Entrance and signage",
    alt: "Entrance and signage of Roots & Pulp Dental Clinic in Sector Q, Aliganj",
  },
  {
    src: "/images/clinic/roots-pulp-waiting-area-lucknow.webp",
    width: 1024,
    height: 858,
    caption: "Waiting area",
    alt: "Patient waiting area at Roots & Pulp Dental Clinic in Aliganj, Lucknow",
  },
  {
    src: "/images/clinic/roots-pulp-clinic-interior-lucknow.webp",
    width: 1024,
    height: 768,
    caption: "Reception",
    alt: "Reception and interior of Roots & Pulp Dental Clinic in Aliganj, Lucknow",
  },
  {
    src: "/images/clinic/roots-pulp-treatment-room-lucknow.webp",
    width: 1024,
    height: 895,
    caption: "Treatment room",
    alt: "Dental treatment room at Roots & Pulp Dental Clinic in Aliganj, Lucknow",
  },
] as const;

export type GoogleReview = {
  name: string;
  date: string;
  text: string;
};

/** Only genuine Google reviews, quoted with permission. Leave empty until supplied. */
export const googleReviews: GoogleReview[] = [];

export const homeFaqs = [
  {
    question: "Do I need an appointment?",
    answer:
      "Booking ahead means shorter waiting times, so we recommend calling, sending a WhatsApp message or booking online.",
  },
  {
    question: "What happens during my first visit?",
    answer:
      "Dr. Tripathi will ask about your concerns and medical history, examine your teeth and gums, and may recommend an X-ray. He'll explain what he finds and discuss your options. There's no pressure to start treatment the same day.",
  },
  {
    question: "Do you treat children?",
    answer: "Yes. We see children of all ages, from their first checkup onwards.",
  },
  {
    question: "Are you open on Sundays?",
    answer: "Yes, from 10:00 AM to 5:00 PM. Monday to Saturday, we're open from 10:00 AM to 8:00 PM.",
  },
  // [VERIFY BEFORE PUBLISHING]: Dr. Shubham to approve this wording.
  {
    question: "What should I do if I have severe tooth pain?",
    answer:
      "Call the clinic or send a WhatsApp message and describe what is happening, and we will tell you how soon to come in. If you have swelling on your face that is spreading, a fever, trouble swallowing or breathing, or an injury to your face or jaw, go to the nearest hospital emergency department.",
  },
] as const;

export const doctorCredentials = [
  "Bachelor of Dental Surgery (BDS)",
  "Master of Public Health (MPH)",
  "Specialised Certification in Rotary Endodontics",
  doctorExperience.inline,
  "Life Member, Indian Dental Association",
  "Chief Dental Consultant, Re-Life Hospital, Bahraich",
  "U.P. State Dental Council Reg. No. 20606",
] as const;

export const homeSeo = {
  title: "Dental Clinic in Aliganj, Lucknow · Roots & Pulp",
  description:
    "Dental clinic in Sector Q, Aliganj, Lucknow. Dr. Shubham Tripathi explains clearly and plans treatment around you. Open 7 days. Book, call or WhatsApp.",
} as const;

export const visitReasons = [
  "Checkup",
  "Tooth pain",
  "Cleaning",
  "Filling",
  "Root canal",
  "Replacing missing teeth",
  "Braces or aligners",
  "Whitening or cosmetic",
  "Child's visit",
  "Other",
] as const;
