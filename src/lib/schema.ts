import {
  clinic,
  clinicLatitude,
  clinicLongitude,
  doctor,
  googleBusinessProfileUrl,
  googleMapsUrl,
  homeSeo,
  instagramUrl,
  siteUrl,
} from "./clinic";
import { time24, weeklyHours } from "./openingHours";

function absolute(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

const clinicId = `${siteUrl}/#clinic`;
const websiteId = `${siteUrl}/#website`;
const doctorId = `${siteUrl}/#dr-shubham-tripathi`;
const doctorPath = "/doctor/dr-shubham-tripathi/";

export function clinicJsonLd() {
  const sameAs = [googleBusinessProfileUrl, instagramUrl].filter(Boolean);
  const lat = Number(clinicLatitude);
  const lng = Number(clinicLongitude);
  const hasGeo = clinicLatitude !== "" && clinicLongitude !== "" && Number.isFinite(lat) && Number.isFinite(lng);

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": clinicId,
    name: clinic.name,
    description: clinic.description,
    url: absolute("/"),
    telephone: clinic.phoneSchema,
    logo: absolute("/images/logo.png"),
    image: [absolute("/images/clinic-entrance.jpg"), absolute("/images/og-home.jpg")],
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.streetAddress,
      addressLocality: clinic.locality,
      addressRegion: clinic.region,
      postalCode: clinic.postalCode,
      addressCountry: clinic.countryCode,
    },
    ...(hasGeo ? { geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng } } : {}),
    areaServed: { "@type": "City", name: clinic.locality },
    openingHoursSpecification: weeklyHours.map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...row.dayNames],
      opens: time24(row.open),
      closes: time24(row.close),
    })),
    ...(googleMapsUrl ? { hasMap: googleMapsUrl } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    founder: { "@id": doctorId },
    employee: { "@id": doctorId },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: clinic.name,
    url: absolute("/"),
    publisher: { "@id": clinicId },
    inLanguage: "en-IN",
  };
}

/**
 * Dr. Shubham Tripathi. Only credentials stated elsewhere on the site are used.
 * Experience is confirmed as 8+ years. It is not emitted in Person schema.
 */
export function doctorJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": doctorId,
    name: doctor.name,
    givenName: "Shubham",
    familyName: "Tripathi",
    honorificPrefix: doctor.honorificPrefix,
    honorificSuffix: doctor.credentials,
    jobTitle: `${doctor.role}, ${clinic.name}`,
    url: absolute(doctorPath),
    image: absolute(doctor.portrait),
    worksFor: { "@id": clinicId },
    knowsAbout: ["Dentistry", "Root canal treatment", "Rotary endodontics", "Preventive dentistry", "Public health"],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "Bachelor of Dental Surgery (BDS)" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "Master of Public Health (MPH)" },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: "Specialised Certification in Rotary Endodontics",
      },
    ],
    memberOf: { "@type": "Organization", name: "Indian Dental Association" },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "U.P. State Dental Council registration number",
      value: "20606",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

/** A WebPage plus its breadcrumb trail, for ordinary inner pages. */
export function webPageJsonLd({
  name,
  description,
  path,
  breadcrumb,
  type = "WebPage",
  image,
}: {
  name: string;
  description: string;
  path: string;
  breadcrumb: { name: string; path: string }[];
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ProfilePage";
  image?: string;
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": type,
      "@id": `${absolute(path)}#webpage`,
      name,
      description,
      url: absolute(path),
      isPartOf: { "@id": websiteId },
      about: { "@id": type === "ProfilePage" ? doctorId : clinicId },
      ...(type === "ProfilePage" ? { mainEntity: { "@id": doctorId } } : {}),
      ...(image ? { primaryImageOfPage: absolute(image) } : {}),
      inLanguage: "en-IN",
    },
    breadcrumbJsonLd(breadcrumb),
  ];
}

export function homeWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    name: homeSeo.title,
    description: homeSeo.description,
    url: absolute("/"),
    isPartOf: { "@id": websiteId },
    about: { "@id": clinicId },
    primaryImageOfPage: absolute(doctor.portrait),
    inLanguage: "en-IN",
  };
}

export function contactPageJsonLd(description: string) {
  const [page, breadcrumb] = webPageJsonLd({
    name: "Contact & Directions · Roots & Pulp Dental Clinic, Aliganj",
    description,
    path: "/contact/",
    breadcrumb: [{ name: "Contact", path: "/contact/" }],
    type: "ContactPage",
  });
  return [{ ...page, mainEntity: { "@id": clinicId } }, breadcrumb];
}

/**
 * Treatment page: a WebPage (or a MedicalWebPage once a real clinical review date exists),
 * plus its breadcrumb. No MedicalProcedure or Offer markup: the site holds no verified
 * procedure data or prices to put in it.
 */
export function treatmentPageJsonLd(
  treatment: { slug: string; name: string },
  seo: { title: string; description: string },
  options: { image?: string; reviewedOn?: string } = {},
) {
  const path = `/treatments/${treatment.slug}/`;
  const reviewed = options.reviewedOn
    ? { "@type": "MedicalWebPage", lastReviewed: options.reviewedOn, reviewedBy: { "@id": doctorId } }
    : { "@type": "WebPage" };
  return [
    {
      "@context": "https://schema.org",
      ...reviewed,
      "@id": `${absolute(path)}#webpage`,
      name: seo.title,
      description: seo.description,
      url: absolute(path),
      isPartOf: { "@id": websiteId },
      about: { "@id": clinicId },
      ...(options.image ? { primaryImageOfPage: absolute(options.image) } : {}),
      inLanguage: "en-IN",
    },
    breadcrumbJsonLd([
      { name: "Treatments", path: "/treatments/" },
      { name: treatment.name, path },
    ]),
  ];
}
