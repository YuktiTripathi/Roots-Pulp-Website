export type GalleryCategory = "entrance" | "consultation" | "treatment";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  category: GalleryCategory;
};

export type GallerySection = {
  id: string;
  category: GalleryCategory;
  label: string;
  eyebrow: string;
  heading: string;
  description: string;
  images: GalleryImage[];
};

/** Real clinic photographs already in the project. No stock or generated images. */
export const gallerySections: GallerySection[] = [
  {
    id: "entrance",
    category: "entrance",
    label: "Entrance",
    eyebrow: "Entrance",
    heading: "Your first impression of Roots & Pulp",
    description: "From the moment you arrive, the clinic is meant to feel clear, calm and easy to find.",
    images: [
      {
        src: "/images/clinic-entrance.jpg",
        alt: "Street entrance and signboard of Roots & Pulp Dental Clinic in Aliganj",
        caption: "Clinic entrance",
        category: "entrance",
      },
    ],
  },
  {
    id: "consultation",
    category: "consultation",
    label: "Consultation",
    eyebrow: "Consultation",
    heading: "A space to talk things through",
    description:
      "Before treatment begins, there is time to discuss your concerns, understand what has been found, and talk through the options.",
    images: [
      {
        src: "/images/doctor/listen-consult.jpg",
        alt: "Dr. Shubham Tripathi in consultation with a patient at the clinic desk",
        caption: "Consultation",
        category: "consultation",
      },
      {
        src: "/images/doctor/explain-consult.png",
        alt: "Dr. Shubham Tripathi speaking with a patient beside the consultation desk",
        category: "consultation",
      },
      {
        src: "/images/consultation-banner.jpg",
        alt: "A patient and Dr. Shubham Tripathi seated across the consultation desk",
        category: "consultation",
      },
    ],
  },
  {
    id: "treatment",
    category: "treatment",
    label: "Treatment spaces",
    eyebrow: "Treatment spaces",
    heading: "Where your treatment happens",
    description:
      "Treatment takes place in a clinical setting, with the chair, instruments and lighting arranged for the procedure.",
    images: [
      {
        src: "/images/doctor/treat.jpg",
        alt: "Dental treatment underway in the chair at Roots & Pulp",
        caption: "Treatment space",
        category: "treatment",
      },
    ],
  },
];

export const galleryFilters = [
  { id: "all", label: "All" },
  ...gallerySections.map((section) => ({ id: section.category, label: section.label })),
] as const;
