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

function absolute(path: string) {
  if (!siteUrl) return undefined;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function clinicJsonLd() {
  const sameAs = [googleBusinessProfileUrl, instagramUrl].filter(Boolean);
  const lat = Number(clinicLatitude);
  const lng = Number(clinicLongitude);
  const hasGeo = clinicLatitude !== "" && clinicLongitude !== "" && Number.isFinite(lat) && Number.isFinite(lng);

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    ...(siteUrl ? { "@id": `${siteUrl}/#clinic` } : {}),
    name: clinic.name,
    ...(absolute("/") ? { url: absolute("/") } : {}),
    telephone: clinic.phoneSchema,
    ...(absolute("/images/logo.png") ? { logo: absolute("/images/logo.png") } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.streetAddress,
      addressLocality: clinic.locality,
      addressRegion: clinic.region,
      postalCode: clinic.postalCode,
      addressCountry: clinic.countryCode,
    },
    ...(hasGeo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: lat,
            longitude: lng,
          },
        }
      : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "17:00",
      },
    ],
    ...(googleMapsUrl ? { hasMap: googleMapsUrl } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    founder: {
      "@type": "Person",
      ...(siteUrl ? { "@id": `${siteUrl}/#dr-shubham-tripathi` } : {}),
      name: doctor.givenName,
      honorificPrefix: doctor.honorificPrefix,
      honorificSuffix: doctor.credentials,
      jobTitle: doctor.role,
    },
  };
}

export function websiteJsonLd() {
  if (!siteUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: clinic.name,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#clinic` },
  };
}

export function homeWebPageJsonLd() {
  if (!siteUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    name: homeSeo.title,
    description: homeSeo.description,
    url: `${siteUrl}/`,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#clinic` },
    primaryImageOfPage: absolute(doctor.portrait),
  };
}

export function contactPageJsonLd() {
  if (!siteUrl) return null;
  return [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${siteUrl}/contact/#webpage`,
      name: "Contact & Directions · Roots & Pulp Dental Clinic, Aliganj",
      description:
        "ED-362, Sector-Q, Aliganj, Lucknow. Clinic timings, phone, WhatsApp and directions. Open 7 days.",
      url: `${siteUrl}/contact/`,
      about: { "@id": `${siteUrl}/#clinic` },
      mainEntity: { "@id": `${siteUrl}/#clinic` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact/` },
      ],
    },
  ];
}

export function treatmentPageJsonLd(treatment: { slug: string; name: string }, seo: { title: string; description: string }, image?: string) {
  if (!siteUrl) return null;
  const url = `${siteUrl}/treatments/${treatment.slug}/`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: seo.title,
      description: seo.description,
      url,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#clinic` },
      ...(image ? { primaryImageOfPage: absolute(image) } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Treatments", item: `${siteUrl}/treatments/` },
        { "@type": "ListItem", position: 3, name: treatment.name, item: url },
      ],
    },
  ];
}
