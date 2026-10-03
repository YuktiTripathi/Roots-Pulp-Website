export type ClinicPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** object-position that keeps faces in frame when the photo is cropped with object-fit: cover. */
  position: string;
};

const care = "/images/clinic/care";

/** Real photographs taken at Roots & Pulp. The single source for paths, sizes and alt text. */
export const photos = {
  listening: {
    src: `${care}/dr-shubham-listening-to-patient.webp`,
    width: 545,
    height: 693,
    alt: "Dr. Shubham Tripathi listening to a patient during a consultation at Roots & Pulp Dental Clinic",
    position: "center 30%",
  },
  consultationDesk: {
    src: `${care}/dr-shubham-consultation-desk.webp`,
    width: 1000,
    height: 1000,
    alt: "Dr. Shubham Tripathi listening to a patient at the consultation desk at Roots & Pulp Dental Clinic",
    position: "center",
  },
  consultation: {
    src: `${care}/dr-shubham-patient-consultation.webp`,
    width: 1024,
    height: 768,
    alt: "Dr. Shubham Tripathi discussing a treatment plan with a patient at Roots & Pulp Dental Clinic in Aliganj",
    position: "center 40%",
  },
  explaining: {
    src: `${care}/dentist-explaining-xray.webp`,
    width: 819,
    height: 1024,
    alt: "Dr. Shubham Tripathi explaining a dental X-ray on a laptop to a patient at Roots & Pulp",
    position: "center 35%",
  },
  planning: {
    src: `${care}/dentist-writing-treatment-plan.webp`,
    width: 819,
    height: 1024,
    alt: "Dr. Shubham Tripathi writing out a treatment plan with a patient at the consultation desk",
    position: "center 42%",
  },
  mirror: {
    src: `${care}/dr-shubham-examining-patient-with-mirror.webp`,
    width: 819,
    height: 1024,
    alt: "Dr. Shubham Tripathi examining a patient's teeth while the patient follows along in a hand mirror",
    position: "center 45%",
  },
  chairside: {
    src: `${care}/dr-shubham-chairside-treatment.webp`,
    width: 819,
    height: 1024,
    alt: "Dr. Shubham Tripathi treating a patient in the dental chair at Roots & Pulp",
    position: "center 30%",
  },
  closeUp: {
    src: `${care}/dental-examination-close-up.webp`,
    width: 819,
    height: 1024,
    alt: "Close view of Dr. Shubham Tripathi examining a patient's front teeth",
    position: "center 45%",
  },
  procedure: {
    src: `${care}/dr-shubham-dental-treatment.webp`,
    width: 545,
    height: 693,
    alt: "Dr. Shubham Tripathi examining a patient's teeth in the treatment room at Roots & Pulp Dental Clinic",
    position: "center 45%",
  },
  branded: {
    src: `${care}/dental-treatment-roots-pulp.webp`,
    width: 819,
    height: 1024,
    alt: "Dr. Shubham Tripathi treating a patient beneath the Roots & Pulp Dental Clinic sign",
    position: "center 42%",
  },
  examination: {
    src: `${care}/dental-examination-patient.webp`,
    width: 819,
    height: 1024,
    alt: "Dr. Shubham Tripathi examining a smiling patient's teeth during a checkup",
    position: "center 40%",
  },
  reviewingSmile: {
    src: `${care}/patient-reviewing-smile.webp`,
    width: 819,
    height: 1024,
    alt: "Patient reviewing her smile in a mirror after a dental appointment at Roots & Pulp",
    position: "center 35%",
  },
  happyPatient: {
    src: `${care}/dr-shubham-with-happy-patient.webp`,
    width: 819,
    height: 1024,
    alt: "Dr. Shubham Tripathi and a smiling patient giving a thumbs up after an appointment",
    position: "center 40%",
  },
  waitingArea: {
    src: "/images/clinic/roots-pulp-waiting-area-lucknow.webp",
    width: 1024,
    height: 858,
    alt: "Patient waiting area at Roots & Pulp Dental Clinic in Aliganj, Lucknow",
    position: "center",
  },
  interior: {
    src: "/images/clinic/roots-pulp-clinic-interior-lucknow.webp",
    width: 1024,
    height: 768,
    alt: "Reception and interior of Roots & Pulp Dental Clinic in Aliganj, Lucknow",
    position: "center",
  },
  treatmentRoom: {
    src: "/images/clinic/roots-pulp-treatment-room-lucknow.webp",
    width: 1024,
    height: 895,
    alt: "Dental treatment room at Roots & Pulp Dental Clinic in Aliganj, Lucknow",
    position: "center",
  },
} satisfies Record<string, ClinicPhoto>;
