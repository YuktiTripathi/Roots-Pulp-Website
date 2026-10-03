import { photos, type ClinicPhoto } from "@/lib/photos";

export type GalleryCategory = "entrance" | "inside" | "consultation" | "treatment" | "people" | "equipment";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Short line shown under the caption in "named" sections, e.g. what a piece of equipment does. */
  detail?: string;
  /** Intrinsic size, required for "named" sections where photos keep their own shape. */
  width?: number;
  height?: number;
  /** object-position used when the photo is cropped, so faces stay in frame. */
  position?: string;
  category: GalleryCategory;
};

function fromPhoto(photo: ClinicPhoto, caption: string, category: GalleryCategory): GalleryImage {
  return { ...photo, caption, category };
}

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
    id: "inside",
    category: "inside",
    label: "Inside Roots & Pulp",
    eyebrow: "Inside Roots & Pulp",
    heading: "A look around the clinic",
    description: "Real views of the spaces where patients arrive, wait and receive care.",
    layout: "named",
    images: [
      {
        src: "/images/clinic/roots-pulp-waiting-area-lucknow.webp",
        alt: "Patient waiting area at Roots & Pulp Dental Clinic in Aliganj, Lucknow",
        caption: "Comfortable patient waiting area",
        width: 1024,
        height: 858,
        category: "inside",
      },
      {
        src: "/images/clinic/roots-pulp-clinic-interior-lucknow.webp",
        alt: "Clinic interior at Roots & Pulp Dental Clinic in Lucknow",
        caption: "Clinic reception and patient space",
        width: 1024,
        height: 768,
        category: "inside",
      },
      {
        src: "/images/clinic/roots-pulp-treatment-room-lucknow.webp",
        alt: "Dental treatment room at Roots & Pulp Dental Clinic in Aliganj, Lucknow",
        caption: "Dental treatment room",
        width: 1024,
        height: 895,
        category: "inside",
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
    layout: "named",
    images: [
      fromPhoto(photos.listening, "Listening to a patient's concerns", "consultation"),
      fromPhoto(photos.explaining, "Explaining findings clearly", "consultation"),
      fromPhoto(photos.planning, "Planning the next steps", "consultation"),
      fromPhoto(photos.consultation, "Talking through the options", "consultation"),
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
    layout: "named",
    images: [
      fromPhoto(photos.mirror, "Patient involved in their care", "treatment"),
      fromPhoto(photos.chairside, "Treatment in the dental chair", "treatment"),
      fromPhoto(photos.closeUp, "A careful dental examination", "treatment"),
      fromPhoto(photos.procedure, "Care in progress", "treatment"),
      fromPhoto(photos.branded, "A checkup in progress", "treatment"),
      fromPhoto(photos.examination, "Checking teeth and gums", "treatment"),
    ],
  },
  {
    id: "people",
    category: "people",
    label: "Patient moments",
    eyebrow: "Patient moments",
    heading: "Real moments from a visit",
    description:
      "Appointments include time to see, understand and talk about your smile, along with the treatment itself.",
    layout: "named",
    images: [
      fromPhoto(photos.reviewingSmile, "Reviewing her smile", "people"),
      fromPhoto(photos.happyPatient, "Dr. Shubham with a patient", "people"),
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
