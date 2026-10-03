/** Photography for each treatment, shared by the treatments pages and the homepage cards. */
export const treatmentImages: Record<string, { src: string; alt: string }> = {
  "root-canal-treatment": {
    src: "/images/treatments/root-canal-treatment.jpg",
    alt: "Illustration of a root canal file inside a tooth",
  },
  "dental-implants": {
    src: "/images/treatments/dental-implants.jpg",
    alt: "Illustration of a dental implant crown and abutment",
  },
  "crowns-and-bridges": {
    src: "/images/treatments/crowns-and-bridges.jpg",
    alt: "Illustration of a dental bridge replacing missing teeth",
  },
  "braces-and-aligners": {
    src: "/images/treatments/braces-aligners/braces-and-aligners-hero.png",
    alt: "Tooth-coloured fixed braces on upper and lower teeth",
  },
  "childrens-dentistry": {
    src: "/images/treatments/childrens-dentistry.jpg",
    alt: "A child in a dental chair during a checkup",
  },
  "cosmetic-dentistry": {
    src: "/images/treatments/cosmetic-dentistry.jpg",
    alt: "Shade guide held beside a smile",
  },
  "teeth-cleaning": {
    src: "/images/treatments/teeth-cleaning.webp",
    alt: "Dental scaler cleaning tartar from teeth",
  },
  "tooth-coloured-fillings": {
    src: "/images/treatments/tooth-coloured-fillings.webp",
    alt: "Filling material being placed in a tooth",
  },
  "tooth-extraction": {
    src: "/images/treatments/tooth-extraction.jpg",
    alt: "Illustration of a tooth being removed",
  },
  "gum-and-oral-health": {
    src: "/images/treatments/gum-and-oral-health.jpg",
    alt: "A clinician examining the lower gums",
  },
  dentures: {
    src: "/images/treatments/dentures.jpg",
    alt: "A partial denture held in a gloved hand",
  },
  "teeth-whitening": {
    src: "/images/treatments/teeth-whitening.webp",
    alt: "A smile shown before and after whitening",
  },
};

export function treatmentImage(slug: string) {
  return treatmentImages[slug];
}
