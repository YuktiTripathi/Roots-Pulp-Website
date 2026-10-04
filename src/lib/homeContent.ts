import { treatmentHref } from "./clinic";

/** Homepage copy for the sections added in the homepage refinement. Keep wording exactly as approved. */

export const concernIntro = "You don't need to know what treatment you need. Start with what you're noticing.";

/** Smaller links under the featured treatments grid. */
export const moreTreatmentLinks = [
  { label: "Teeth Cleaning", href: treatmentHref("teeth-cleaning") },
  { label: "Fillings", href: treatmentHref("tooth-coloured-fillings") },
  { label: "Tooth Extraction", href: treatmentHref("tooth-extraction") },
  { label: "Gum Care", href: treatmentHref("gum-and-oral-health") },
  { label: "Dentures", href: treatmentHref("dentures") },
  { label: "Teeth Whitening", href: treatmentHref("teeth-whitening") },
] as const;

export const whyDifferent = {
  eyebrow: "What to expect",
  heading: "Why Roots & Pulp feels different",
  intro: "Dental care should feel clear, thoughtful and personal.",
  items: [
    {
      icon: "see",
      title: "You see what we see",
      body: "X-rays and close-up camera images are shown to you, so a finding is something you can see, not only hear.",
    },
    {
      icon: "options",
      title: "Options before treatment",
      body: "Your options, the number of visits and a clear cost estimate come first. There is no pressure to decide on the day.",
    },
    {
      icon: "wait",
      title: "Some things can wait",
      body: "Not every problem needs treatment today. If yours can wait, or needs none, we will say so.",
    },
    {
      icon: "prevent",
      title: "Prevention is part of the plan",
      body: "Dr. Shubham's public health training shapes a focus on keeping problems from coming back.",
    },
    {
      icon: "calendar",
      title: "Open seven days",
      body: "Monday to Saturday until 8 PM, and Sunday until 5 PM, so care fits around work and school.",
    },
    {
      icon: "child",
      title: "Children are welcome",
      body: "We see children of all ages, from their first checkup onwards.",
    },
  ],
} as const;

export const doctorIntro = {
  heading: "Meet Dr. Shubham Tripathi",
  supporting: "Dentistry is easier when someone takes the time to explain it.",
  paragraphs: [
    "Dr. Shubham Tripathi founded Roots & Pulp around a simple principle: patients should understand their oral health before being asked to make treatment decisions.",
    "His background in dentistry and public health shapes an approach that combines treatment with prevention and long-term oral health.",
  ],
  credentialPrefix: "BDS · MPH · Specialisation in Rotary Endodontics · ",
} as const;

export const firstVisit = {
  eyebrow: "What to expect",
  heading: "Not sure what happens at a dental appointment?",
  intro: "Here's what your first visit at Roots & Pulp typically looks like.",
  steps: [
    {
      num: "01",
      title: "Tell us what brought you in",
      desc: "A short form about your health and your concerns, then a conversation about what you've noticed.",
    },
    { num: "02", title: "A careful examination", desc: "Your teeth and gums are examined, with an X-ray if one is needed." },
    { num: "03", title: "See what we see", desc: "What was found is shown to you and put into plain words." },
    {
      num: "04",
      title: "Understand your options",
      desc: "Options, number of visits and a clear cost estimate. There is no pressure to decide on the day.",
    },
    { num: "05", title: "Treatment, when you're ready", desc: "Treatment is carried out gently, with regular check-ins." },
    { num: "06", title: "Follow-up and prevention", desc: "Aftercare advice and a recommended date for your next checkup." },
  ],
} as const;

export const insideClinic = {
  eyebrow: "The clinic",
  heading: "Inside Roots & Pulp",
  intro: "A calm, clear space in Sector Q, Aliganj.",
  /** Landscape frame (clinic and consultations) and a tall frame for the portrait photographs. */
  slots: [
    ["interior", "listenConsult", "treatmentRoom", "waitingArea", "explainConsult", "consultationDesk"],
    ["happyPatientThumbsUp", "treatingPatient", "chairsideExamination"],
  ],
  photos: [
    {
      src: "/images/doctor/listen-consult.jpg",
      width: 1024,
      height: 653,
      alt: "Dr. Shubham Tripathi in conversation with a patient at the consultation desk, Roots & Pulp",
    },
    {
      src: "/images/doctor/explain-consult.jpg",
      width: 981,
      height: 637,
      alt: "Dr. Shubham Tripathi going through findings with a patient using a laptop",
    },
    {
      src: "/images/clinic/care/dr-shubham-happy-patient-thumbs-up.webp",
      width: 1122,
      height: 1402,
      alt: "Dr. Shubham Tripathi and a smiling patient giving a thumbs up in the treatment chair at Roots & Pulp",
      position: "50% 40%",
    },
    {
      src: "/images/clinic/care/dr-shubham-treating-patient-clinic.webp",
      width: 1122,
      height: 1402,
      alt: "Dr. Shubham Tripathi examining a patient's teeth under the dental light at Roots & Pulp",
      position: "55% 40%",
    },
    {
      src: "/images/clinic/care/dr-shubham-chairside-examination.webp",
      width: 1122,
      height: 1402,
      alt: "Dr. Shubham Tripathi carrying out a chairside dental examination",
      position: "60% 45%",
    },
  ],
} as const;

/** Only these five pieces of equipment are verified. Sizes come from gallery.ts. */
export const technology = {
  eyebrow: "Equipment",
  heading: "Technology that helps you see and understand your care",
  items: [
    { src: "/images/equipment/digital-xray-rvg.jpg", title: "Digital X-ray (RVG)", benefit: "See diagnostic images quickly and clearly." },
    { src: "/images/equipment/intraoral-camera-root-canal.jpg", title: "Intraoral Camera", benefit: "See what your dentist is seeing." },
    { src: "/images/equipment/apex-locator.jpg", title: "Apex Locator", benefit: "Supports accurate root canal measurement." },
    { src: "/images/equipment/uv-sterilisation-chamber.jpg", title: "UV Sterilisation Chamber", benefit: "Storage for sterilised instruments." },
    { src: "/images/equipment/teeth-whitening-light.jpg", title: "Teeth Whitening Light", benefit: "In-clinic LED whitening." },
  ],
} as const;

