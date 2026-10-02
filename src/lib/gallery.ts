export type GalleryCategory = "entrance" | "consultation" | "treatment" | "equipment";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Short line shown under the caption in "named" sections, e.g. what a piece of equipment does. */
  detail?: string;
  /** Intrinsic size, required for "named" sections where photos keep their own shape. */
  width?: number;
  height?: number;
  category: GalleryCategory;
};

export type GallerySection = {
  id: string;
  category: GalleryCategory;
  label: string;
  eyebrow: string;
  heading: string;
  description: string;
  /** "named" shows every photo whole, with its name written underneath. */
  layout?: "feature" | "named";
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
        src: "/images/doctor/explain-consult.jpg",
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
  {
    id: "equipment",
    category: "equipment",
    label: "Equipment",
    eyebrow: "Equipment & sterilisation",
    heading: "The equipment behind your treatment",
    description:
      "Digital X-rays, an intraoral camera that lets you see your own teeth, precise root canal measurement, in-clinic whitening and a step-by-step sterilisation routine for every instrument.",
    layout: "named",
    images: [
      {
        src: "/images/equipment/digital-xray-rvg.jpg",
        alt: "RVG digital X-ray system showing a root canal treated molar on the clinic laptop",
        caption: "Digital X-ray (RVG)",
        detail: "Instant X-rays on screen",
        width: 1086,
        height: 1448,
        category: "equipment",
      },
      {
        src: "/images/equipment/apex-locator.jpg",
        alt: "Electronic apex locator showing a root canal length reading",
        caption: "Apex Locator",
        detail: "Measures root canal length",
        width: 1086,
        height: 1448,
        category: "equipment",
      },
      {
        src: "/images/equipment/teeth-whitening-light.jpg",
        alt: "LED teeth whitening lamp used for in-clinic whitening",
        caption: "Teeth Whitening Light",
        detail: "In-clinic LED whitening",
        width: 1024,
        height: 1536,
        category: "equipment",
      },
      {
        src: "/images/equipment/uv-sterilisation-chamber.jpg",
        alt: "UV cabinet storing sterilised dental instruments",
        caption: "UV Sterilisation Chamber",
        detail: "Storage for sterilised instruments",
        width: 1086,
        height: 1448,
        category: "equipment",
      },
      {
        src: "/images/equipment/intraoral-camera-root-canal.jpg",
        alt: "Intraoral camera screen showing close-up views of a molar during root canal treatment",
        caption: "Intraoral Camera",
        detail: "Close-up view during root canal treatment",
        width: 1536,
        height: 1024,
        category: "equipment",
      },
      {
        src: "/images/equipment/intraoral-camera-cavities.jpg",
        alt: "Intraoral camera screen showing cavities in the grooves of back teeth",
        caption: "Intraoral Camera",
        detail: "See cavities on screen with your dentist",
        width: 1536,
        height: 1024,
        category: "equipment",
      },
      {
        src: "/images/equipment/portable-xray.jpg",
        alt: "Handheld portable dental X-ray unit on its stand",
        caption: "Portable X-ray",
        detail: "Handheld intraoral X-ray",
        width: 1536,
        height: 1024,
        category: "equipment",
      },
      {
        src: "/images/equipment/ultrasonic-cleaner.jpg",
        alt: "Ultrasonic cleaner used to clean dental instruments before sterilisation",
        caption: "Ultrasonic Cleaner",
        detail: "Instrument cleaning before sterilisation",
        width: 1536,
        height: 1024,
        category: "equipment",
      },
    ],
  },
];

export const galleryFilters = [
  { id: "all", label: "All" },
  ...gallerySections.map((section) => ({ id: section.category, label: section.label })),
] as const;
