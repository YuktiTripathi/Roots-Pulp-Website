export type PatientReview = {
  id: string;
  name: string;
  rating: 5;
  date: string;
  source: "Google";
  text: string;
};

export type PatientVideo = {
  id: string;
  src: string;
  poster?: string;
  name?: string;
  treatment?: string;
  duration?: string;
  description?: string;
};

export type PatientStory = {
  id: string;
  title: string;
  summary: string;
};

/** Genuine Google reviews supplied for the Reviews page. Quoted exactly as written. */
export const patientReviews: PatientReview[] = [
  {
    id: "ahhhdityaa",
    name: "ahhhdityaa",
    rating: 5,
    date: "a year ago",
    source: "Google",
    text: "I recently had the pleasure of visiting Roots & Pulp Dental Clinic and I couldn't be more impressed with the service I received. The clinic is modern, clean, and equipped with the latest technology, which made my visit even more reassuring.\n\nDr. Shubham was incredibly thorough and professional, taking the time to explain every step of the treatment. They made sure I was fully informed and answered all my questions with patience. The procedure itself was virtually painless, and I felt at ease throughout.\n\nIf you're looking for a reliable, caring, and professional dental clinic, I highly recommend Roots & Pulp. They truly go above and beyond to provide excellent care. I will definitely be returning for all my future dental needs!",
  },
  {
    id: "anurag-gautam",
    name: "anurag gautam",
    rating: 5,
    date: "a year ago",
    source: "Google",
    text: "The experience was amazing and all my problems were solved and Dr. Shubham explained everything in detail. Overall experience was very good. Must visit by all who seek a professional in dental care.",
  },
  {
    id: "pankaj-verma",
    name: "Pankaj Verma",
    rating: 5,
    date: "a month ago",
    source: "Google",
    text: "A very good dentist with very reasonable consultation and treatment charges. My mother is extremely happy with the overall treatment and experience.\n\nThe doctor listens to the patient carefully, understands the concerns, and explains everything clearly before proceeding with the treatment. We really appreciate the patience, professionalism, and care provided throughout.\n\nHighly recommended!",
  },
  {
    id: "tanu",
    name: "Tanu",
    rating: 5,
    date: "4 months ago",
    source: "Google",
    text: "Dr. Bhut patiently sunte hai aur samjhate hai. he is very polite Dr. , highly recommended\nBest dentist in lucknow, just 10/10\nThank you so much✨",
  },
  {
    id: "prashant-p",
    name: "Prashant P",
    rating: 5,
    date: "3 months ago",
    source: "Google",
    text: "Had a wonderful experience at Roots & Pulp Dental Clinic. The clinic is equipped with high quality dental machines & equipments. Dr Shubham is very friendly & polite. He explains each and every procedure in detail which comforts the patients. He also gives sufficient time to his patients. Overall a very good experience and I totally recommend Dr Shubham and Roots & Pulp Dental Clinic.",
  },
  {
    id: "viveek",
    name: "Viveek",
    rating: 5,
    date: "a year ago",
    source: "Google",
    text: "Had a great experience at the clinic! Definitely recommend! the staff was friendly and welcoming. Dr. Shubham was very professional, explained everything clearly, and made whole process feel easy and comfortable. really appreciated the gentle care and positive vibe. Thanks!",
  },
  {
    id: "avnish-singh",
    name: "Avnish Singh",
    rating: 5,
    date: "8 months ago",
    source: "Google",
    text: "We recently visited Root & Pulp Dental clinic for routine dental checkup for me and my wife and fixing my mother teeth. We are really happy with the professionalism and expertise of Dr. Shubham. He provided right guidance and never ever tried to push towards expensive treatments or anything. I would definitely recommend him to everyone.",
  },
  {
    id: "ravindra-pal-singh",
    name: "Ravindra Pal Singh",
    rating: 5,
    date: "9 months ago",
    source: "Google",
    text: "Recently got my teeth done from here. I am very happy with the work done. Dr. Shubham Tripathi is very friendly and understanding. He is very good and takes all the care needed. I am happy to recommend Root & Pulp clinic and I am confident that anyone who visits would return happily.",
  },
  {
    id: "yash-pratap-singh-rathour",
    name: "Yash Pratap Singh Rathour",
    rating: 5,
    date: "4 months ago",
    source: "Google",
    text: "One of the best treatment I've got in this clinic.\nI'm appreciating doctor's kind behaviour. Dr. Like shuabham Tripathi I've never yet met before.\n😊\nI'm sharing personal experience with you all. My sister had severe pain in tooth with swelling, I'm in search of a best doctor in Lucknow and suddenly i found some information regarding his clinic where i went with my sister for her treatment. Now she is absolutely fine.\nI appreciate his kind attention to patient for which i thank to doctor and his team.\nIt is totally amazing and satisfying 😊",
  },
];

/** Clinic-supplied patient videos. Titles come from on-screen text or the given file name. */
export const patientVideos: PatientVideo[] = [
  {
    id: "patient-story-1",
    src: "/videos/patient-story-1.mp4",
    poster: "/images/videos/patient-story-1.jpg",
  },
  {
    id: "patient-story-arun",
    src: "/videos/patient-story-2.mp4",
    poster: "/images/videos/patient-story-2.jpg",
  },
  {
    id: "patient-story-3",
    src: "/videos/patient-story-3.mp4",
    poster: "/images/videos/patient-story-3.jpg",
  },
];

/** Add real clinic-supplied stories here. Do not invent outcomes. */
export const patientStories: PatientStory[] = [];
