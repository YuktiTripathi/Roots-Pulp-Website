/**
 * Full content for individual treatment pages, keyed by treatment slug.
 * A slug without an entry here falls back to the short placeholder page.
 *
 * Copy follows the approved content package: no prices, no visit counts, no "painless"
 * claims, and equipment is described as used "where needed". Items marked
 * [CLINIC DETAIL REQUIRED] in the package are deliberately left out until confirmed.
 */

export type TreatmentLink = { label: string; href: string };

export type TreatmentCardItem = { title: string; text?: string };

export type SymptomIcon =
  | "temperature"
  | "bite"
  | "night"
  | "swelling"
  | "crack"
  | "shade"
  | "gap"
  | "gaps"
  | "lost"
  | "denture"
  | "drift"
  | "neighbours"
  | "filling"
  | "treated"
  | "chew"
  | "sparkle"
  | "spots"
  | "thumb"
  | "crowded"
  | "brush"
  | "uneven"
  | "adult";

export type StageIllustration =
  | "root-canal"
  | "implant"
  | "crown-bridge"
  | "braces"
  | "cosmetic"
  | "milk-teeth"
  | "cleaning"
  | "filling"
  | "gum-stages"
  | "dentures"
  | "whitening";

export type TreatmentFaq = { question: string; answer: string; link?: TreatmentLink };

export type TreatmentPageContent = {
  seo: { title: string; description: string };
  /**
   * ISO date of Dr. Tripathi's clinical review. While empty, no "clinically reviewed" line or
   * MedicalWebPage markup is shown, so the page never claims a review that has not happened.
   */
  clinicallyReviewedOn: string;
  hero: {
    eyebrow: string;
    heading: string;
    lede: string;
    text: string;
    /** Overrides the treatment's listing image in the hero only. */
    image?: { src: string; alt: string };
  };
  glance: TreatmentCardItem[];
  symptoms: {
    heading: string;
    intro: string;
    /** Items with a group are shown under that group's label, in order of first appearance. */
    /** An image, when given, is shown instead of the line icon. */
    items: (TreatmentCardItem & { icon: SymptomIcon; image?: string; group?: string; link?: TreatmentLink })[];
    note: string;
    illustration?: StageIllustration;
    caption?: string;
  };
  /** Myth and fact cards, shown after the symptom cards. */
  myths?: {
    heading: string;
    intro: string;
    items: { myth: string; fact: string }[];
    illustration?: StageIllustration;
    caption?: string;
  };
  explainer?: {
    heading: string;
    paragraphs: string[];
    illustration?: StageIllustration;
    /** A supplied image, when given, replaces the drawn illustration. */
    image?: { src: string; alt: string; width: number; height: number };
    caption?: string;
  };
  process: {
    heading: string;
    intro: string;
    steps: (TreatmentCardItem & { links?: TreatmentLink[] })[];
    footnote?: string;
    illustration?: StageIllustration;
    caption?: string;
  };
  /** Option cards. [CONFIRM SERVICE AVAILABILITY] before the page is reviewed and indexed. */
  options?: {
    heading: string;
    /** Label for the second line of each card. Defaults to "May suit". */
    suitsLabel?: string;
    items: { title: string; what: string; suits: string; note?: string; image?: string; links?: TreatmentLink[] }[];
    note?: string;
  };
  /** Two columns render as side-by-side cards unless layout is "table"; three or more as a scrollable table. */
  comparison?: {
    heading: string;
    layout?: "cards" | "table";
    /** Highlights the first card. Only for a genuine "keep the tooth" style preference. */
    highlightFirst?: boolean;
    /** Header for the row-label column of the table. */
    rowHeader?: string;
    columns: string[];
    rows: { label: string; values: string[] }[];
    closing: string;
    links?: TreatmentLink[];
    aside?: { text: string; link: TreatmentLink };
  };
  /** A short set of cards with links, e.g. "When a filling may not be enough". */
  infoCards?: {
    heading: string;
    intro?: string;
    items: (TreatmentCardItem & { link?: TreatmentLink })[];
    closing?: string;
  };
  /** Two side-by-side lists, e.g. "What whitening can and cannot do". */
  twoLists?: {
    heading: string;
    columns: { title: string; items: string[] }[];
    closing?: string;
    links?: TreatmentLink[];
  };
  /** A standalone explanatory section, e.g. oral cancer screening. */
  extra?: {
    id: string;
    heading: string;
    paragraphs: string[];
    listHeading?: string;
    list?: string[];
    closing?: string;
  };
  decides?: {
    heading: string;
    intro: string;
    items: TreatmentCardItem[];
    closing: string;
  };
  comfort?: {
    heading: string;
    paragraphs: string[];
    tips?: { heading: string; items: string[] };
    image: { src: string; alt: string; width: number; height: number };
  };
  why: {
    heading: string;
    items: TreatmentCardItem[];
    equipment?: { src: string; alt: string; caption: string; detail?: string; position?: string }[];
    equipmentNote: string;
    /** Defaults to "See more in the gallery", linking to the gallery's equipment section. */
    galleryLink?: TreatmentLink;
  };
  /**
   * Compact pages leave out the doctor card and instead show a short link to the
   * doctor's profile (and the review line, once reviewed) in the "Why" section.
   */
  compact?: boolean;
  /** Credential lines shown on the doctor card in addition to the standard ones. */
  doctorExtra?: string[];
  /** A quote shown on the doctor card. */
  doctorQuote?: string;
  /** A plain line shown on the doctor card instead of a quote. */
  doctorNote?: string;
  aftercare: {
    heading: string;
    intro: string;
    items: TreatmentCardItem[];
    followUp?: string;
    /** Short "when should I call?" line, used on compact pages instead of the warning section. */
    callLine?: string;
  };
  warning?: {
    heading: string;
    intro: string;
    signs: string[];
    emergency: string;
  };
  cost: {
    heading: string;
    intro: string;
    items: TreatmentCardItem[];
    closing: string;
  };
  faqIntro: string;
  faqs: TreatmentFaq[];
  related: { slug: string; text: string }[];
  cta: { heading: string; text: string };
};

/* Shared blocks for the shorter treatment pages. Every claim here is already verified elsewhere on the site. */
const consultImage = {
  src: "/images/doctor/explain-consult.jpg",
  alt: "Dr. Shubham Tripathi speaking with a patient beside the consultation desk",
  width: 981,
  height: 637,
};

const standardDoctorQuote =
  "Dental treatment can feel confusing. Findings, options and the reasoning behind a treatment plan are explained in simple, understandable terms.";


const whyCore = [
  { title: "Listen first", text: "Dr. Tripathi starts by understanding your concerns, then examines." },
  {
    title: "Diagnosis before treatment",
    text: "Every recommendation follows an examination, and you are told when something can wait.",
  },
  {
    title: "Prevention matters",
    text: "Dr. Tripathi's public health training shapes a focus on keeping problems from coming back.",
  },
  { title: "Open seven days", text: "Monday to Saturday until 8 PM, Sunday until 5 PM." },
];

const appointmentFaq: TreatmentFaq = {
  question: "Do I need an appointment, and are you open on Sundays?",
  answer:
    "Booking ahead means shorter waits, so we recommend calling, WhatsApp or booking online. We are open Monday to Saturday 10:00 AM to 8:00 PM and Sunday 10:00 AM to 5:00 PM.",
};

const emergencyLine =
  "For difficulty breathing or swallowing, or swelling spreading toward the eye or neck, seek emergency medical care straight away.";

export const treatmentPages: Record<string, TreatmentPageContent> = {
  "root-canal-treatment": {
    seo: {
      title: "Root Canal Treatment in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Understand root canal treatment: why it may be needed, what happens, aftercare and cost factors. Roots & Pulp Dental Clinic, Aliganj, Lucknow. Open 7 days.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION] Set the review date once Dr. Tripathi has approved the page.
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Saving and restoring teeth",
      heading: "Root Canal Treatment in Lucknow",
      lede: "Relief for an infected tooth, with the aim of keeping it.",
      text: "A root canal removes infection from inside a tooth so the tooth can often stay in your mouth instead of being taken out. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi examines the tooth first and explains what he finds before anything begins.",
    },
    glance: [
      {
        title: "What it treats",
        text: "Infection or inflammation inside the tooth, often after deep decay, a crack or an injury.",
      },
      {
        title: "Main goal",
        text: "Remove the infected tissue and seal the tooth so it can be kept, where possible.",
      },
      // [CLINIC DETAIL REQUIRED] Confirm the anaesthesia approach.
      { title: "Comfort", text: "Local anaesthetic is generally used to numb the area." },
      {
        title: "Planning",
        text: "Starts with an examination and usually an X-ray, so your dentist can explain your options.",
      },
      {
        title: "Afterwards",
        text: "Most teeth need a protective restoration, such as a filling or crown. Your dentist will advise.",
      },
    ],
    symptoms: {
      heading: "Could this treatment be relevant to you?",
      intro: "These are common reasons people see a dentist about a tooth that may need a root canal.",
      items: [
        {
          icon: "temperature",
          image: "/images/treatments/root-canal/lingering-sensitivity.webp",
          title: "Lingering sensitivity",
          text: "Hot or cold that stays long after the drink or food is gone.",
        },
        {
          icon: "bite",
          image: "/images/treatments/root-canal/pain-when-biting.webp",
          title: "Pain when biting",
          text: "A tooth that hurts when you chew or press on it.",
        },
        {
          icon: "night",
          image: "/images/treatments/root-canal/toothache-at-night.webp",
          title: "A toothache that wakes you",
          text: "Pain that is throbbing, or that disturbs your sleep.",
        },
        {
          icon: "swelling",
          image: "/images/treatments/root-canal/gum-swelling.webp",
          title: "Swelling or a bump on the gum",
          text: "Puffiness near a tooth, sometimes with a pimple-like spot.",
        },
        {
          icon: "crack",
          image: "/images/treatments/root-canal/cracked-tooth.webp",
          title: "Deep decay or a cracked tooth",
          text: "Damage that may have reached the inside of the tooth.",
        },
        {
          icon: "shade",
          image: "/images/treatments/root-canal/darkening-tooth.webp",
          title: "A tooth that is darkening",
          text: "A tooth that has changed colour compared with its neighbours.",
        },
      ],
      note: "These signs can have different causes. An examination, and sometimes an X-ray, helps determine what is happening and whether root canal treatment or another approach is appropriate.",
    },
    explainer: {
      heading: "What is root canal treatment?",
      paragraphs: [
        "Inside every tooth is soft tissue called the pulp. It holds the tooth's nerves and blood supply, and it runs down narrow channels in the roots. These channels are the “root canals”.",
        "If bacteria reach the pulp through deep decay, a crack or an injury, it can become inflamed or infected. That is often what causes the pain.",
        "Root canal treatment removes the affected pulp, cleans and shapes the canals, and seals them. The tooth is then restored so you can keep using it.",
      ],
      illustration: "root-canal",
      image: {
        src: "/images/treatments/root-canal/root-canal-stages.webp",
        alt: "Four-stage illustration of root canal treatment: infected pulp, canal cleaning and shaping, filling and sealing, and the final restoration.",
        width: 1405,
        height: 739,
      },
      caption:
        "From inflamed pulp to a cleaned, sealed and restored tooth. Your dentist will explain what applies to your tooth.",
    },
    process: {
      heading: "What happens during a root canal",
      intro: "Every tooth is different, so your own plan may vary. This is the general journey.",
      steps: [
        {
          title: "Examination and X-ray",
          text: "Dr. Tripathi listens to your symptoms, examines the tooth and usually takes an X-ray. He explains what he finds.",
        },
        {
          title: "Your plan",
          text: "You hear your options, what each involves and an estimate of cost. There is no pressure to decide on the day.",
        },
        // [CLINIC DETAIL REQUIRED] Confirm isolation / rubber dam use before naming it.
        {
          title: "Numbing and access",
          text: "The area is numbed, and a small opening is made in the tooth to reach the pulp.",
        },
        {
          title: "Cleaning and shaping",
          text: "The infected tissue is removed and the canals are cleaned and shaped. Where needed, the length of each canal is measured with an apex locator, and an intraoral camera can show a close-up view.",
        },
        {
          title: "Sealing and restoring",
          text: "The canals are sealed and the tooth is protected with a filling or, often, a crown. Aftercare advice and a follow-up date are given.",
          links: [{ label: "About crowns & bridges", href: "/treatments/crowns-and-bridges/" }],
        },
      ],
      // [CLINIC DETAIL REQUIRED] Typical visit pattern, only if the doctor wants it stated.
      footnote: "Some teeth need more than one visit. Your dentist will tell you what to expect for your tooth.",
    },
    comparison: {
      heading: "Saving a tooth or removing it",
      highlightFirst: true,
      columns: ["Root canal treatment", "Tooth extraction"],
      rows: [
        {
          label: "What happens",
          values: ["The infected pulp is removed and the tooth is kept", "The tooth is removed"],
        },
        { label: "Natural tooth", values: ["Kept, where it can be saved", "Gap left, may need replacing"] },
        {
          label: "After",
          values: [
            "Usually needs a restoration such as a crown",
            "May need an implant, bridge or denture to fill the gap",
          ],
        },
        {
          label: "Best suited",
          values: ["A tooth with enough healthy structure to rebuild", "A tooth that cannot be restored"],
        },
      ],
      closing:
        "The right option depends on your oral health, priorities and clinical assessment. Some teeth cannot be saved, and Dr. Tripathi will tell you honestly if that is the case.",
      links: [
        { label: "Tooth extraction", href: "/treatments/tooth-extraction/" },
        { label: "Dental implants", href: "/treatments/dental-implants/" },
      ],
    },
    decides: {
      heading: "How your dentist decides",
      intro: "Treatment is never chosen automatically. Your dentist will assess:",
      items: [
        { title: "The tooth itself", text: "How much healthy structure remains, and whether it can be rebuilt." },
        { title: "The X-ray", text: "What it shows around the root and the surrounding bone." },
        { title: "The gums and bone", text: "Whether the tooth has solid support." },
        { title: "Your bite", text: "How the tooth meets the teeth opposite it." },
        { title: "Your health and history", text: "Relevant medical conditions and past dental work." },
      ],
      closing: "If you would rather wait, ask questions or take time to decide, that is fine.",
    },
    comfort: {
      heading: "Feeling comfortable during treatment",
      // [CLINIC DETAIL REQUIRED] Any additional comfort measures the clinic confirms, e.g. topical gel.
      paragraphs: [
        "Many people arrive nervous. That is normal, and it is worth saying so.",
        "The area is generally numbed before treatment begins, and you can tell Dr. Tripathi at any time if you feel anything. You may feel pressure or vibration, which is not the same as pain.",
        "Asking questions is part of the process. Findings are explained to you in plain language before consent.",
      ],
      image: {
        src: "/images/doctor/explain-consult.jpg",
        alt: "Dr. Shubham Tripathi speaking with a patient beside the consultation desk",
        width: 981,
        height: 637,
      },
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp for root canal care",
      items: [
        {
          title: "Rotary endodontics training",
          text: "Dr. Tripathi holds a specialised certification in rotary endodontics, and root canal treatment at the clinic is performed with rotary endodontics.",
        },
        {
          title: "Careful instruments and measurement",
          text: "Digital X-rays, an apex locator to measure canal length and an intraoral camera for close-up views are part of the clinic's equipment, used where treatment needs them.",
        },
        {
          title: "Explanation first",
          text: "Diagnosis before treatment, and a plain-language explanation before consent.",
        },
        {
          title: "Open seven days",
          text: "Monday to Saturday until 8 PM, Sunday until 5 PM, so you can be seen when pain does not wait.",
        },
      ],
      // [CLINIC DETAIL REQUIRED] Sterilisation routine sentence, before the UV chamber or cleaner is shown here.
      equipment: [
        {
          src: "/images/equipment/digital-xray-rvg.jpg",
          alt: "Digital dental X-ray of a root canal treated molar shown on the clinic laptop",
          caption: "Digital X-ray (RVG)",
          detail: "Instant X-rays on screen",
          position: "center 30%",
        },
        {
          src: "/images/equipment/apex-locator.jpg",
          alt: "Apex locator showing a root canal length reading",
          caption: "Apex Locator",
          detail: "Measures root canal length",
          position: "center 45%",
        },
        {
          src: "/images/equipment/intraoral-camera-root-canal.jpg",
          alt: "Intraoral camera screen showing close-up views of a molar during root canal treatment",
          caption: "Intraoral Camera",
          detail: "Close-up view during root canal treatment",
        },
      ],
      equipmentNote: "Equipment at Roots & Pulp Dental Clinic.",
    },
    doctorExtra: ["Specialised Certification in Rotary Endodontics."],
    doctorQuote:
      "Dental treatment can feel confusing. Findings, options and the reasoning behind a treatment plan are explained in simple, understandable terms.",
    aftercare: {
      heading: "Afterwards: what to expect",
      intro: "Your dentist's own instructions always come first. This is general guidance.",
      items: [
        {
          title: "Straight after",
          text: "The numbness wears off over a few hours. Take care not to bite your lip or cheek while it does.",
        },
        {
          title: "The first few days",
          text: "The tooth may feel tender, especially when biting. This commonly settles, but tell your dentist if it is getting worse.",
        },
        {
          title: "Eating and cleaning",
          text: "Your dentist will tell you when to eat normally and which side to avoid. Keep brushing and cleaning between teeth as usual.",
        },
        {
          title: "Long-term care",
          text: "The tooth still needs a lasting restoration and regular check-ups. A treated tooth can decay again around the edges.",
        },
      ],
      followUp:
        "Attend your follow-up and complete the restoration your dentist recommends. Delay can put the tooth at risk.",
    },
    warning: {
      heading: "When should I contact my dentist?",
      intro: "Please call the clinic if you notice:",
      signs: [
        "swelling of the face, gum or jaw",
        "pain that is severe or getting worse after the first few days",
        "a fever",
        "a temporary filling or crown that has come off",
        "difficulty swallowing or breathing",
      ],
      emergency:
        "For difficulty breathing or swallowing, or swelling spreading toward the eye or neck, seek emergency medical care straight away.",
    },
    cost: {
      heading: "What affects the cost of a root canal?",
      intro: "We do not publish a fixed price, because the cost depends on your tooth. The main factors are:",
      items: [
        { title: "Which tooth", text: "Front teeth and back teeth have different numbers of canals." },
        {
          title: "How complex it is",
          text: "Curved canals, previous treatment or heavy infection take more time.",
        },
        { title: "Imaging", text: "X-rays needed to plan and check the work." },
        { title: "The restoration", text: "A filling or crown afterwards is a separate decision and cost." },
        { title: "Anything extra", text: "For example, treating an infection or an earlier root filling." },
      ],
      // [CLINIC DETAIL REQUIRED] Whether the consultation or X-ray is charged separately.
      closing:
        "After an examination, Dr. Tripathi gives you a clear plan and cost estimate before treatment begins.",
    },
    faqIntro: "Straight answers about root canal treatment. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "Does a root canal hurt?",
        answer:
          "The area is generally numbed before treatment, so most people feel pressure rather than pain. Experiences vary, and the tooth may be tender for a few days afterwards. If you feel anything during treatment, tell Dr. Tripathi and he will help.",
      },
      {
        question: "How do I know if I need a root canal?",
        answer:
          "Lingering sensitivity to hot or cold, pain when biting, swelling near a tooth or a darkening tooth can all be signs. They can also have other causes. Only an examination, and often an X-ray, can confirm what is needed.",
      },
      {
        question: "How long does a root canal take?",
        answer:
          "It depends on the tooth and how complex the case is. Some teeth need more than one visit. Dr. Tripathi will tell you what to expect for your tooth after examining it.",
      },
      {
        question: "How much does a root canal cost in Lucknow?",
        answer:
          "The cost depends on which tooth is treated, how complex it is, the imaging needed and the restoration afterwards. After an examination at our Aliganj clinic, you will get a clear plan and estimate before treatment begins.",
      },
      {
        question: "What happens after a root canal?",
        answer:
          "The numbness wears off in a few hours, and the tooth may feel tender for a few days. You will be given aftercare instructions, and the tooth will usually need a filling or crown to protect it. Follow your dentist's advice.",
      },
      {
        question: "Can I eat after a root canal?",
        answer:
          "Your dentist will tell you when to eat normally. Until the numbness wears off, take care not to bite your lip or cheek. Many people are advised to avoid hard food on that tooth until it is fully restored.",
      },
      {
        question: "How long does a root canal last?",
        answer:
          "There is no fixed lifespan. How long a treated tooth lasts depends on the tooth, the final restoration, your cleaning habits and regular check-ups. Many are kept for years with good care.",
      },
      {
        question: "What if I delay or do not get it done?",
        answer:
          "An infection inside a tooth does not usually clear up by itself, and it can spread or cause more pain and swelling. If you have symptoms, it is worth having the tooth examined sooner rather than later.",
      },
      {
        question: "Is extraction an alternative?",
        answer:
          "Sometimes. If a tooth cannot be restored, extraction may be recommended, and a gap would then need to be considered. Your dentist will explain which option suits your tooth.",
        link: { label: "About tooth extraction", href: "/treatments/tooth-extraction/" },
      },
      {
        question: "Do I need an appointment, and are you open on Sundays?",
        answer:
          "Booking ahead means shorter waits, so we recommend calling, WhatsApp or booking online. We are open Monday to Saturday 10:00 AM to 8:00 PM and Sunday 10:00 AM to 5:00 PM.",
      },
    ],
    related: [
      { slug: "crowns-and-bridges", text: "Many treated teeth are protected with a crown afterwards." },
      {
        slug: "tooth-coloured-fillings",
        text: "Sometimes a filling alone restores the tooth, or catches decay earlier.",
      },
      { slug: "tooth-extraction", text: "When a tooth cannot be saved." },
    ],
    cta: {
      heading: "Not sure what your tooth needs?",
      text: "Tooth pain is hard to ignore, and hard to read. Start with an examination, and Dr. Tripathi will explain what is happening and what your options are.",
    },
  },
  "dental-implants": {
    seo: {
      title: "Dental Implants in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Learn how dental implants replace a missing tooth, who they may suit, what to expect and what affects cost. Roots & Pulp, Aliganj, Lucknow. Open 7 days.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION]
    // [CONFIRM SERVICE AVAILABILITY] Implant placement at Roots & Pulp, and by whom. If placement is by a
    // visiting or referral surgeon, the process and "Why" sections need rewording.
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Replacing missing teeth",
      heading: "Dental Implants in Lucknow",
      lede: "A fixed way to replace a missing tooth, anchored in the jawbone.",
      text: "A dental implant is a small post placed in the jaw to support a replacement tooth. It is one of several ways to fill a gap, and it is not right for everyone. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi will examine you first and explain which options may suit you.",
    },
    glance: [
      {
        title: "What it replaces",
        text: "One missing tooth, several teeth, or in some cases a full set, depending on your case.",
      },
      {
        title: "How it works",
        text: "A post is placed in the jawbone, and a crown or other restoration is attached to it.",
      },
      {
        title: "Planning",
        text: "Starts with an examination and imaging, so your dentist can check gums, bone and bite.",
      },
      {
        title: "Time",
        text: "Healing is part of the process, and it varies from person to person. Your dentist will explain what to expect for you.",
      },
      {
        title: "Alternatives",
        text: "Bridges and dentures are other options. The right one depends on your situation.",
      },
    ],
    symptoms: {
      heading: "Could dental implants be relevant to you?",
      intro: "These are common situations in which people ask a dentist about implants.",
      items: [
        {
          icon: "gap",
          image: "/images/treatments/dental-implants/missing-tooth.webp",
          title: "A missing tooth",
          text: "From an extraction, an injury or a tooth that was never there.",
        },
        {
          icon: "gaps",
          image: "/images/treatments/dental-implants/several-missing-teeth.webp",
          title: "Several missing teeth",
          text: "Gaps that make chewing or speaking harder.",
        },
        {
          icon: "lost",
          image: "/images/treatments/dental-implants/tooth-cannot-be-saved.webp",
          title: "A tooth that cannot be saved",
          text: "Your dentist may discuss what could replace it.",
        },
        {
          icon: "denture",
          image: "/images/treatments/dental-implants/loose-denture.webp",
          title: "Difficulty with dentures",
          text: "Removable dentures that feel loose or uncomfortable.",
        },
        {
          icon: "drift",
          image: "/images/treatments/dental-implants/teeth-drifting-into-gap.webp",
          title: "Gaps affecting your bite",
          text: "Teeth drifting or tilting into an empty space.",
        },
        {
          icon: "neighbours",
          image: "/images/treatments/dental-implants/implant-beside-healthy-teeth.webp",
          title: "Wanting to avoid shaping healthy neighbouring teeth",
          text: "One reason people compare implants with bridges.",
        },
      ],
      note: "Everyone's situation is different. An examination and imaging are needed to find out whether implants, or another option, would suit you.",
    },
    explainer: {
      heading: "What is a dental implant?",
      paragraphs: [
        "Think of a tooth in two parts: the crown you see, and the root hidden in the jaw. When a tooth is lost, the root goes too.",
        // [CLINIC DETAIL REQUIRED] Confirm implant system and material before naming any.
        "A dental implant replaces the root. It is a small post, usually made of titanium, placed in the jawbone. Over time, the bone can grow around it and hold it in place.",
        "A connector and a crown are then attached on top. The result is a tooth that is fixed in place, not removed at night like a denture.",
      ],
      illustration: "implant",
      image: {
        src: "/images/treatments/dental-implants/implant-procedure.webp",
        alt: "Four-stage illustration of a dental implant: the implant is placed in the bone, the bone heals around it, the connector is attached, and a crown is fitted.",
        width: 1838,
        height: 743,
      },
      caption:
        "From a missing tooth to a restored one: post, connector and crown. Your dentist will explain what your plan involves.",
    },
    process: {
      heading: "What the implant journey can look like",
      intro: "Every case is different, and some steps may not apply to you. This is a general overview.",
      steps: [
        {
          title: "Consultation",
          text: "Dr. Tripathi listens to your concerns, asks about your health and examines your mouth. He explains what he finds.",
        },
        // [CLINIC DETAIL REQUIRED] Which imaging the clinic uses for implant planning, e.g. OPG or CBCT.
        {
          title: "Imaging and planning",
          text: "X-rays or other imaging help your dentist assess the bone and nearby teeth. You then hear your options, and an estimate of cost.",
        },
        // [CONFIRM SERVICE AVAILABILITY] Extraction, gum treatment and bone grafting in-house or by referral.
        {
          title: "Preparing the area, if needed",
          text: "Sometimes a tooth needs removing, gum disease treating or bone building up before an implant can be placed.",
          links: [
            { label: "Tooth extraction", href: "/treatments/tooth-extraction/" },
            { label: "Gum health", href: "/treatments/gum-and-oral-health/" },
          ],
        },
        // [CONFIRM SERVICE AVAILABILITY] Implant placement at Roots & Pulp, and by whom.
        {
          title: "Placing the implant",
          text: "The area is numbed, and the implant post is placed in the jawbone.",
        },
        {
          title: "Healing",
          text: "The bone needs time to settle around the implant. This period varies. A temporary solution may be discussed for the gap.",
        },
        {
          title: "The crown and review",
          text: "Once healing is checked, a crown is attached and your bite is adjusted. You receive care advice and a review plan.",
          links: [{ label: "About crowns & bridges", href: "/treatments/crowns-and-bridges/" }],
        },
      ],
      footnote: "Timeframes and number of visits depend on your case and are explained at your consultation.",
    },
    // [CONFIRM SERVICE AVAILABILITY] Which of the three the clinic offers. Delete any card not offered.
    options: {
      heading: "Types of implant treatment",
      items: [
        {
          title: "Single tooth implant",
          image: "/images/treatments/dental-implants/single-tooth-implant.webp",
          what: "One implant and crown to replace one tooth.",
          suits: "Someone missing a single tooth, with healthy neighbouring teeth.",
          note: "Leaves the neighbouring teeth untouched.",
        },
        {
          title: "Multiple tooth implants",
          image: "/images/treatments/dental-implants/multiple-tooth-implants.webp",
          what: "Implants that support a bridge or several crowns across a gap.",
          suits: "Someone missing several teeth in a row.",
          note: "One implant can often support more than one tooth, depending on the case.",
        },
        {
          title: "Implant-supported dentures",
          image: "/images/treatments/dental-implants/implant-supported-denture.webp",
          what: "A denture that clips or attaches to implants.",
          suits: "Someone with many or all teeth missing, or who struggles with loose dentures.",
          note: "More stable than a standard denture, but a different treatment.",
          links: [{ label: "About dentures", href: "/treatments/dentures/" }],
        },
      ],
    },
    comparison: {
      heading: "Implant, bridge or denture?",
      columns: ["Dental implant", "Dental bridge", "Denture"],
      rows: [
        {
          label: "How it works",
          values: [
            "A post in the jawbone supports a crown",
            "A crown on each side holds a replacement tooth in the gap",
            "A removable set that rests on the gums",
          ],
        },
        { label: "Removable", values: ["No", "No", "Yes"] },
        {
          label: "Neighbouring teeth",
          values: [
            "Left untouched",
            "Usually reshaped to hold the bridge",
            "Not reshaped, though some partials clip onto teeth",
          ],
        },
        { label: "Surgery", values: ["Yes, a minor surgical step", "No", "No"] },
        { label: "Treatment time", values: ["Longer, because of healing", "Generally shorter", "Generally shorter"] },
        {
          label: "Upkeep",
          values: [
            "Cleaning, as with natural teeth, plus check-ups",
            "Careful cleaning under the bridge",
            "Daily removal and cleaning",
          ],
        },
        {
          label: "Suits",
          values: [
            "Enough healthy bone and gums",
            "Healthy teeth either side of the gap",
            "Many missing teeth, or when surgery is not suitable",
          ],
        },
      ],
      closing:
        "The right option depends on your oral health, priorities and clinical assessment. No option is best for everyone.",
      links: [
        { label: "Crowns & bridges", href: "/treatments/crowns-and-bridges/" },
        { label: "Dentures", href: "/treatments/dentures/" },
      ],
    },
    decides: {
      heading: "Is it right for me?",
      intro: "Implants are planned individually. Your dentist will look at:",
      items: [
        { title: "Bone", text: "Whether there is enough, and whether it is healthy." },
        { title: "Gums", text: "Gum disease should be treated before an implant is placed." },
        {
          title: "Your general health",
          text: "Some conditions and habits, such as smoking, can affect healing.",
        },
        { title: "Your bite", text: "How the new tooth will meet the teeth opposite it." },
        { title: "The missing tooth", text: "Its position, and the space and teeth around it." },
        {
          title: "Your age and growth",
          text: "Implants are generally considered once the jaw has finished growing.",
        },
      ],
      closing:
        "If implants are not right for you, Dr. Tripathi will say so, and explain other options. You can take time to decide.",
    },
    comfort: {
      heading: "Feeling comfortable",
      // [CLINIC DETAIL REQUIRED] Sedation or additional comfort options. Do not mention sedation until confirmed.
      paragraphs: [
        "Surgery is a big word, and it is natural to feel nervous about it. Questions are welcome at any point.",
        "The area is numbed for placement, and you can tell Dr. Tripathi if you feel anything during it. Afterwards, some tenderness or swelling is common, and your dentist will explain what to expect.",
      ],
      image: {
        src: "/images/doctor/explain-consult.jpg",
        alt: "Dr. Shubham Tripathi speaking with a patient beside the consultation desk",
        width: 981,
        height: 637,
      },
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      // [CLINIC DETAIL REQUIRED] Implant training, implant system, and how placement and restoration are coordinated.
      items: [
        { title: "Listen first", text: "Dr. Tripathi starts by understanding your concerns, then examines." },
        {
          title: "Diagnosis before treatment",
          text: "Every recommendation follows an examination, and you are told when something can wait.",
        },
        { title: "Plain explanation", text: "Findings, options and reasons are explained before you decide." },
        {
          title: "Prevention matters",
          text: "Dr. Tripathi's public health training shapes a focus on keeping your remaining teeth and gums healthy.",
        },
        { title: "Open seven days", text: "Monday to Saturday until 8 PM, Sunday until 5 PM." },
      ],
      // Shown as examination tools only. Not described as implant-planning equipment.
      equipment: [
        {
          src: "/images/doctor/listen-consult.jpg",
          alt: "Dr. Shubham Tripathi in consultation with a patient at the clinic desk",
          caption: "Consultation",
          detail: "Your concerns heard first",
        },
        {
          src: "/images/equipment/digital-xray-rvg.jpg",
          alt: "Digital dental X-ray of a root canal treated molar shown on the clinic laptop",
          caption: "Digital X-ray (RVG)",
          detail: "Instant X-rays on screen",
          position: "center 30%",
        },
        {
          src: "/images/equipment/intraoral-camera-cavities.jpg",
          alt: "Intraoral camera screen showing cavities in the grooves of back teeth",
          caption: "Intraoral Camera",
          detail: "See your own teeth on screen with your dentist",
        },
      ],
      equipmentNote: "Examination and imaging at Roots & Pulp.",
    },
    doctorQuote:
      "Dental treatment can feel confusing. Findings, options and the reasoning behind a treatment plan are explained in simple, understandable terms.",
    aftercare: {
      heading: "Afterwards: what to expect",
      intro: "Your dentist's instructions always come first. This is general guidance.",
      items: [
        {
          title: "After placement",
          text: "Some swelling, tenderness or minor bleeding can be normal. Your dentist will tell you how to care for the area and what to eat.",
        },
        {
          title: "While it heals",
          text: "Keep the area clean as instructed, and avoid pressure on it. Attend any check-ups you are given.",
        },
        {
          title: "After the crown",
          text: "Clean around your implant every day, as you would a natural tooth. Your dentist will show you how.",
        },
        {
          title: "Long term",
          text: "Implants can develop gum inflammation if cleaning slips, so regular check-ups and professional cleaning matter.",
        },
      ],
      followUp: "Keep your review appointments. Early attention to any change is easier than late.",
    },
    warning: {
      heading: "When should I contact my dentist?",
      intro: "Please call the clinic if you notice:",
      signs: [
        "pain or swelling that is getting worse after the first few days",
        "bleeding that does not settle",
        "a fever, or pus or a bad taste near the implant",
        "an implant, crown or screw that feels loose",
        "numbness or tingling that continues after the anaesthetic should have worn off",
      ],
      emergency:
        "For difficulty breathing or swallowing, or swelling spreading toward the eye or neck, seek emergency medical care straight away.",
    },
    cost: {
      heading: "What affects the cost of dental implants?",
      intro: "We do not publish a fixed price, because every case is different. The main factors are:",
      items: [
        { title: "How many teeth", text: "One implant, several, or a full set." },
        { title: "Preparation needed", text: "Extraction, gum treatment or bone building." },
        { title: "Imaging", text: "The scans needed to plan safely." },
        { title: "The restoration", text: "The type of crown or bridge attached." },
        { title: "The implant itself", text: "The system and materials used." },
        { title: "Review and follow-up", text: "Check-ups afterwards." },
      ],
      // [CLINIC DETAIL REQUIRED] Whether the consultation or imaging is charged separately.
      closing:
        "After an examination, Dr. Tripathi gives you a clear written plan and estimate. You can compare it with other options, such as a bridge or denture.",
    },
    faqIntro: "Straight answers about dental implants. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "Are dental implants painful?",
        answer:
          "The area is numbed for placement, so you should not feel pain during it, though you may feel pressure. Some tenderness and swelling afterwards are common. Your dentist will explain what to expect and how to manage it.",
      },
      {
        question: "How do I know if I'm suitable for an implant?",
        answer:
          "It depends on your bone, gums, general health and bite. That is why an examination and imaging come first. If implants are not suitable, Dr. Tripathi will explain other options, such as a bridge or denture.",
      },
      {
        question: "How long does the implant process take?",
        answer:
          "It varies, because the bone needs time to settle around the implant and some people need preparation first. Your dentist will give you an outline for your own case at the consultation.",
      },
      {
        question: "How much do dental implants cost in Lucknow?",
        answer:
          "The cost depends on how many teeth are replaced, any preparation needed, the imaging, the type of crown and the implant system. After an examination at our Aliganj clinic, you will receive a clear plan and estimate.",
      },
      {
        question: "How long do dental implants last?",
        answer:
          "There is no fixed lifespan. Many last for years with good cleaning, regular check-ups and healthy gums. Gum disease or heavy bite forces can shorten that, which is why follow-up matters.",
      },
      {
        question: "What is the difference between an implant and a bridge?",
        answer:
          "An implant is supported by a post in the jawbone. A bridge is held by crowns on the teeth either side of the gap, which usually have to be shaped. Each has advantages, and the right one depends on your mouth.",
        link: { label: "About crowns & bridges", href: "/treatments/crowns-and-bridges/" },
      },
      {
        question: "Can anyone get dental implants?",
        answer:
          "Not necessarily. Gum disease, low bone volume, some health conditions and smoking can affect suitability or healing. They are also generally considered once the jaw has finished growing. Many of these can be addressed first.",
      },
      {
        question: "What can I eat after the procedure?",
        answer:
          "Your dentist will tell you. In general, soft food is advised at first, and hard or chewy food on that area is avoided until your dentist says it is ready. Follow the instructions you are given.",
      },
      {
        question: "Is an implant better than a denture?",
        answer:
          "Not always. An implant is fixed and does not come out, but involves a surgical step and a longer process. A denture is removable and generally quicker. Your dentist will explain what suits your situation.",
        link: { label: "About dentures", href: "/treatments/dentures/" },
      },
      {
        question: "Do I need an appointment, and are you open on Sundays?",
        answer:
          "Booking ahead means shorter waits, so we recommend calling, WhatsApp or booking online. We are open Monday to Saturday 10:00 AM to 8:00 PM and Sunday 10:00 AM to 5:00 PM.",
      },
    ],
    related: [
      { slug: "crowns-and-bridges", text: "The crown that sits on an implant, and the bridge alternative." },
      { slug: "dentures", text: "A removable option, including implant-supported versions." },
      { slug: "tooth-extraction", text: "Where an unsaveable tooth is removed before replacement." },
    ],
    cta: {
      heading: "Missing a tooth? Start with the options.",
      text: "There is more than one way to fill a gap, and the right one depends on you. Come in for an examination, and Dr. Tripathi will explain what could work and what each involves.",
    },
  },
  "crowns-and-bridges": {
    seo: {
      title: "Dental Crowns & Bridges in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Learn how dental crowns and bridges protect a tooth or fill a gap, what to expect and what affects cost. Roots & Pulp, Aliganj, Lucknow. Open 7 days.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION]
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Saving and restoring teeth",
      heading: "Dental Crowns and Bridges in Lucknow",
      lede: "Protect a weakened tooth, or close the gap left by a missing one.",
      text: "A crown covers and strengthens a damaged tooth. A bridge fills a gap using the teeth beside it. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi will examine your teeth first, explain what he finds and talk through the options before anything is done.",
    },
    glance: [
      { title: "A crown", text: "A cap that covers a tooth to protect and strengthen it." },
      {
        title: "A bridge",
        text: "A replacement tooth held in place by crowns on the teeth either side of a gap.",
      },
      {
        title: "Inlays and onlays",
        text: "Partial coverings for a tooth that needs more than a filling but less than a full crown.",
      },
      {
        title: "Planning",
        text: "Starts with an examination and usually an X-ray, so your dentist can explain what suits your tooth.",
      },
      {
        title: "Visits",
        text: "Often more than one visit, because the restoration is made to fit your tooth. Your dentist will explain what to expect.",
      },
    ],
    symptoms: {
      heading: "Could crowns or bridges be relevant to you?",
      intro: "These are common reasons people ask a dentist about a crown or a bridge.",
      items: [
        {
          group: "To protect a tooth",
          icon: "filling",
          title: "A large filling or heavy decay",
          text: "Not much natural tooth is left to hold a filling.",
        },
        {
          group: "To protect a tooth",
          icon: "crack",
          title: "A cracked or worn tooth",
          text: "A crown can help hold it together, depending on the crack.",
        },
        {
          group: "To protect a tooth",
          icon: "treated",
          title: "After a root canal",
          text: "Many treated teeth are protected with a crown.",
          link: { label: "About root canal treatment", href: "/treatments/root-canal-treatment/" },
        },
        { group: "To fill a gap", icon: "gap", title: "A missing tooth", text: "A bridge is one way to replace it." },
        {
          group: "To fill a gap",
          icon: "drift",
          title: "Teeth drifting into a gap",
          text: "A gap can let neighbouring teeth tilt.",
        },
        {
          group: "To fill a gap",
          icon: "chew",
          title: "Chewing on one side",
          text: "Because a gap makes the other side work harder.",
        },
      ],
      note: "These situations can have different causes and solutions. An examination, and sometimes an X-ray, helps determine whether a filling, crown, bridge or another option is appropriate.",
    },
    explainer: {
      heading: "What are dental crowns and bridges?",
      paragraphs: [
        "A crown, sometimes called a tooth cap, fits over a tooth like a snug cover. It restores the tooth's shape and strength, and protects what is left of it.",
        "A bridge replaces a missing tooth. A false tooth sits in the gap, and it is held by crowns on the teeth either side. Those teeth act like anchors.",
        "Both are made to match the shape, bite and, where possible, the colour of your own teeth. Both are fixed in place, so they are not taken out at night.",
      ],
      illustration: "crown-bridge",
      caption:
        "A crown covers one tooth. A bridge replaces a missing tooth using the teeth beside the gap. Your dentist will explain what your plan involves.",
    },
    process: {
      heading: "What happens during treatment",
      intro: "Every case is different, and your own plan may vary. This is the general journey.",
      steps: [
        {
          title: "Examination and X-ray",
          text: "Dr. Tripathi listens to your concerns, examines your teeth and gums and usually takes an X-ray. He shows you and explains what he finds.",
        },
        {
          title: "Your plan",
          text: "You hear your options, what each involves and an estimate of cost. There is no pressure to decide on the day.",
        },
        // [CLINIC DETAIL REQUIRED] Confirm the sequence, anaesthesia approach and any treatment of the tooth beforehand.
        {
          title: "Preparing the tooth",
          text: "The area is numbed, and the tooth is gently shaped to make room for the crown. For a bridge, the teeth beside the gap are shaped.",
        },
        // [CLINIC DETAIL REQUIRED] Impression or scan method, laboratory and temporaries. Do not name digital scanning.
        {
          title: "Impression and temporary",
          text: "A mould or scan of your teeth is taken so the restoration fits. A temporary crown or bridge may protect the teeth in the meantime.",
        },
        {
          title: "Fitting and review",
          text: "The final crown or bridge is checked for fit, bite and appearance, then fixed in place. You receive care advice and a review plan.",
        },
      ],
      footnote: "The number of visits and timings depend on your case and are explained at your consultation.",
    },
    // [CONFIRM SERVICE AVAILABILITY] Which materials are offered, and whether inlays and onlays are offered.
    options: {
      heading: "Types of restoration",
      items: [
        {
          title: "Crown",
          what: "A cap that covers the whole visible part of a tooth.",
          suits: "A tooth that is heavily filled, cracked, worn or root-treated.",
          note: "Needs the tooth to be shaped to fit.",
        },
        {
          title: "Bridge",
          what: "A replacement tooth supported by crowns on the teeth either side of a gap.",
          suits: "Someone with a missing tooth and healthy teeth beside the gap.",
          note: "The neighbouring teeth are shaped to hold it.",
          links: [{ label: "Or compare dentures", href: "/treatments/dentures/" }],
        },
        {
          title: "Inlay or onlay",
          what: "A lab-made piece that fills or covers part of a tooth.",
          suits: "A tooth with moderate damage that does not need a full crown.",
          note: "Keeps more of the natural tooth than a full crown.",
        },
      ],
      note: "Crowns and bridges can be made from metal, porcelain, ceramics or a combination. Your dentist will explain which are suitable for your tooth, where it sits in your mouth and your bite.",
    },
    comparison: {
      heading: "Filling, inlay or onlay, or crown?",
      columns: ["Filling", "Inlay or onlay", "Crown"],
      rows: [
        {
          label: "Covers",
          values: ["Part of a tooth, placed directly", "Part of a tooth, made to fit", "The whole visible tooth"],
        },
        {
          label: "Tooth removal",
          values: ["The least", "Moderate", "The most, because the tooth is shaped"],
        },
        { label: "Strength it adds", values: ["Limited", "More", "The most protection"] },
        { label: "Visits", values: ["Often one", "Usually more than one", "Usually more than one"] },
        {
          label: "Suits",
          values: [
            "Smaller areas of damage",
            "Moderate damage",
            "Heavily damaged, cracked or root-treated teeth",
          ],
        },
      ],
      closing:
        "The right option depends on how much healthy tooth is left, your bite and your clinical assessment. A bigger restoration is not automatically better.",
      links: [{ label: "Tooth-coloured fillings", href: "/treatments/tooth-coloured-fillings/" }],
      aside: {
        text: "Comparing a bridge with an implant for a missing tooth? The two are compared side by side on the dental implants page.",
        link: { label: "Dental implants", href: "/treatments/dental-implants/" },
      },
    },
    decides: {
      heading: "Is it right for me?",
      intro: "Treatment is never chosen automatically. Your dentist will look at:",
      items: [
        { title: "How much healthy tooth remains", text: "This decides what can be rebuilt." },
        { title: "The X-ray", text: "What it shows around the roots and in the bone." },
        { title: "Your gums", text: "Healthy gums are needed to support any restoration." },
        {
          title: "Your bite",
          text: "How the tooth meets the teeth opposite, and whether you clench or grind.",
        },
        { title: "The teeth beside a gap", text: "Whether they are strong enough to support a bridge." },
        { title: "Your goals", text: "Including appearance and how long you want the treatment to last." },
      ],
      closing:
        "If a smaller treatment would do, or if something can wait, Dr. Tripathi will say so. You can take time to decide.",
    },
    comfort: {
      heading: "Feeling comfortable",
      // [CLINIC DETAIL REQUIRED] Additional comfort measures the clinic confirms.
      paragraphs: [
        "The teeth are numbed before they are shaped, so you should not feel sharp pain. You may notice pressure, vibration or the sound of the handpiece.",
        "Tell Dr. Tripathi if anything is uncomfortable, and he can pause. Questions are always welcome, and you can ask to see what he is looking at.",
        "Your teeth may be sensitive for a while afterwards. This is common, and your dentist will explain what to expect.",
      ],
      image: {
        src: "/images/doctor/explain-consult.jpg",
        alt: "Dr. Shubham Tripathi speaking with a patient beside the consultation desk",
        width: 981,
        height: 637,
      },
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      // [CLINIC DETAIL REQUIRED] Materials offered, laboratory or digital workflow, and any training to state.
      items: [
        { title: "Listen first", text: "Dr. Tripathi starts by understanding your concerns, then examines." },
        {
          title: "Diagnosis before treatment",
          text: "Every recommendation follows an examination, and you are told when something can wait.",
        },
        {
          title: "See what he sees",
          text: "An intraoral camera lets you view your own teeth on screen with your dentist.",
        },
        {
          title: "Prevention matters",
          text: "Dr. Tripathi's public health training shapes a focus on keeping your teeth and gums healthy, so you need fewer repairs.",
        },
        { title: "Open seven days", text: "Monday to Saturday until 8 PM, Sunday until 5 PM." },
      ],
      // Shown as examination tools only. Not described as crown-making equipment.
      equipment: [
        {
          src: "/images/doctor/listen-consult.jpg",
          alt: "Dr. Shubham Tripathi in consultation with a patient at the clinic desk",
          caption: "Consultation",
          detail: "Your concerns heard first",
        },
        {
          src: "/images/equipment/digital-xray-rvg.jpg",
          alt: "Digital dental X-ray of a root canal treated molar shown on the clinic laptop",
          caption: "Digital X-ray (RVG)",
          detail: "Instant X-rays on screen",
          position: "center 30%",
        },
        {
          src: "/images/equipment/intraoral-camera-cavities.jpg",
          alt: "Intraoral camera screen showing cavities in the grooves of back teeth",
          caption: "Intraoral Camera",
          detail: "See cavities on screen with your dentist",
        },
      ],
      equipmentNote: "Examination at Roots & Pulp.",
    },
    doctorQuote:
      "Dental treatment can feel confusing. Findings, options and the reasoning behind a treatment plan are explained in simple, understandable terms.",
    aftercare: {
      heading: "Afterwards: what to expect",
      intro: "Your dentist's instructions always come first. This is general guidance.",
      items: [
        {
          title: "Straight after",
          text: "Numbness wears off over a few hours. Take care not to bite your lip or cheek, and avoid very hot drinks until feeling returns.",
        },
        {
          title: "While you have a temporary",
          text: "It is not as strong as the final one. Avoid sticky or hard food on that side, and clean gently.",
        },
        {
          title: "Getting used to it",
          text: "The new tooth may feel slightly different at first. If your bite feels too high or uncomfortable, ask for it to be adjusted. Do not just wait for it to settle.",
        },
        {
          title: "Long term",
          text: "A crown protects the tooth, but the edges can still decay. Clean carefully around it, and under a bridge, as your dentist shows you. Keep up with check-ups.",
        },
      ],
      followUp: "Attend your review. A small adjustment early is easier than a problem later.",
    },
    warning: {
      heading: "When should I contact my dentist?",
      intro: "Please call the clinic if you notice:",
      signs: [
        "a crown, bridge or temporary that has come off or feels loose (keep it safe and bring it with you)",
        "a bite that feels too high, or a sharp edge",
        "pain that is getting worse, or that does not settle",
        "swelling of the gum or face",
        "a bad taste or a pimple-like spot near the tooth",
      ],
      emergency:
        "For difficulty breathing or swallowing, or swelling spreading toward the eye or neck, seek emergency medical care straight away.",
    },
    cost: {
      heading: "What affects the cost of crowns and bridges?",
      intro: "We do not publish a fixed price, because it depends on your teeth. The main factors are:",
      items: [
        { title: "How many teeth", text: "One crown, several, or a bridge with more than one false tooth." },
        { title: "The type of restoration", text: "A crown, bridge, inlay or onlay." },
        { title: "The material", text: "Materials differ in look, strength and cost." },
        {
          title: "Preparation",
          text: "Whether the tooth needs a root canal, a build-up or gum treatment first.",
        },
        { title: "Imaging", text: "The X-rays needed to plan and check the work." },
        { title: "Laboratory work", text: "Restorations are made to fit your teeth." },
      ],
      // [CLINIC DETAIL REQUIRED] Whether the consultation or X-ray is charged separately.
      closing:
        "After an examination, Dr. Tripathi gives you a clear plan and estimate before treatment begins.",
    },
    faqIntro: "Straight answers about crowns and bridges. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "Does getting a dental crown hurt?",
        answer:
          "The tooth is numbed before it is shaped, so you should not feel sharp pain. You may feel pressure or vibration. Some sensitivity afterwards is common. If anything is uncomfortable, tell Dr. Tripathi and he can pause or adjust.",
      },
      {
        question: "How do I know if I need a crown?",
        answer:
          "A large filling, a cracked or worn tooth, or a root canal can all lead a dentist to recommend one. A smaller treatment is sometimes enough. Only an examination, and often an X-ray, can tell which.",
      },
      {
        question: "How long does the treatment take?",
        answer:
          "It depends on the case. Crowns and bridges are usually made to fit your teeth, so treatment often takes more than one visit. Your dentist will outline what to expect once he has examined you.",
      },
      {
        question: "How much does a dental crown cost in Lucknow?",
        answer:
          "Cost depends on the number of teeth, the type of restoration, the material, any preparation needed and the imaging. After an examination at our Aliganj clinic, you will receive a clear plan and estimate before treatment begins.",
      },
      {
        question: "How long does a dental crown last?",
        answer:
          "There is no fixed lifespan. A crown can last for many years with good cleaning and regular check-ups, but the tooth beneath can still decay. Habits such as grinding can also shorten its life, which is why review visits matter.",
      },
      {
        question: "What is the difference between a crown and a filling?",
        answer:
          "A filling repairs part of a tooth. A crown covers the whole visible tooth to protect it. A crown suits a tooth with more damage, though it needs more of the tooth to be shaped. Your dentist will advise which fits.",
      },
      {
        question: "Is a bridge better than an implant?",
        answer:
          "Not necessarily. A bridge does not need surgery and is generally quicker, but it uses the teeth either side of the gap as supports. An implant is supported by the jawbone instead. The right choice depends on your teeth, gums, bone and priorities.",
        link: { label: "About dental implants", href: "/treatments/dental-implants/" },
      },
      {
        question: "Can a tooth under a crown still decay?",
        answer:
          "Yes. The crown itself cannot decay, but the natural tooth at its edge can. Cleaning carefully around it, and under a bridge, and attending check-ups helps protect the tooth.",
      },
      {
        question: "What should I do if my crown comes off?",
        answer:
          "Keep the crown safe, avoid chewing on that side, and call the clinic. Do not try to glue it yourself. We will advise you on next steps. If you have severe pain or swelling, contact us urgently.",
      },
      {
        question: "Do I need an appointment, and are you open on Sundays?",
        answer:
          "Booking ahead means shorter waits, so we recommend calling, WhatsApp or booking online. We are open Monday to Saturday 10:00 AM to 8:00 PM and Sunday 10:00 AM to 5:00 PM.",
      },
    ],
    related: [
      {
        slug: "root-canal-treatment",
        text: "Often the step before a crown, when the inside of a tooth is infected.",
      },
      {
        slug: "dental-implants",
        text: "Another way to replace a missing tooth, without shaping the teeth beside the gap.",
      },
      { slug: "tooth-coloured-fillings", text: "A smaller repair, sometimes all a tooth needs." },
    ],
    cta: {
      heading: "Not sure whether you need a crown?",
      text: "A bigger treatment is not always the right one. Come in for an examination, and Dr. Tripathi will explain what your tooth needs and what the options are.",
    },
  },
  "braces-and-aligners": {
    seo: {
      title: "Braces & Clear Aligners in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Compare fixed braces and clear aligners, learn what to expect and what affects cost. Roots & Pulp Dental Clinic, Aliganj, Lucknow. Open 7 days.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION]
    // [CLINIC DETAIL REQUIRED] Who provides orthodontic care at Roots & Pulp, and any orthodontic training.
    // Until answered, the page never says "orthodontist" or implies a specialty.
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Straightening teeth",
      heading: "Braces and Clear Aligners in Lucknow",
      lede: "Straighten your teeth with fixed braces or removable clear aligners, planned around you.",
      text: "Crooked or crowded teeth can be harder to clean and can affect how you bite. Braces and aligners are two ways to move teeth gently into a better position. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi will examine your teeth first and explain which options may suit you.",
    },
    glance: [
      { title: "What it addresses", text: "Crowding, gaps and bite differences, for teens and adults." },
      {
        title: "Two main routes",
        text: "Fixed braces, which stay on your teeth, and clear aligners, which you can take out.",
      },
      {
        title: "Planning",
        text: "Starts with an examination and X-rays, so your dentist can explain what is possible.",
      },
      {
        title: "Time",
        text: "Treatment commonly takes many months, and some cases take longer. Your dentist will give an estimate for you.",
      },
      { title: "After treatment", text: "Retainers are usually needed to keep teeth in their new position." },
    ],
    symptoms: {
      heading: "Could braces or aligners be relevant to you?",
      intro: "These are common reasons people ask a dentist about straightening their teeth.",
      items: [
        {
          icon: "crowded",
          title: "Crowded teeth",
          text: "Teeth that overlap or twist because there is not enough space.",
        },
        { icon: "gap", title: "Gaps between teeth", text: "Spaces that bother you or catch food." },
        {
          icon: "bite",
          title: "Teeth that stick out, or an uneven bite",
          text: "The upper and lower teeth do not meet as they should.",
        },
        { icon: "brush", title: "Teeth that are hard to clean", text: "Crowding can make plaque harder to remove." },
        {
          icon: "sparkle",
          title: "A child or teenager whose teeth are coming through crooked",
          text: "Early advice can help parents plan.",
          link: { label: "About children's dentistry", href: "/treatments/childrens-dentistry/" },
        },
        {
          icon: "adult",
          title: "Wanting to straighten teeth as an adult",
          text: "Many adults ask about this, and it is not only for teens.",
        },
      ],
      note: "Everyone's teeth and jaws are different. An examination and X-rays are needed to find out what is going on and what treatment, if any, is appropriate.",
    },
    explainer: {
      heading: "How do braces and aligners work?",
      paragraphs: [
        "Teeth are held in the jaw by bone and a thin layer of tissue around each root. When gentle, steady pressure is applied, the bone slowly remodels, and the tooth moves.",
        "Braces use small brackets and a wire to apply that pressure. Clear aligners use a series of removable trays, each one moving the teeth a little.",
        "Teeth move gradually. That is why treatment takes months, and why check-ups along the way matter.",
      ],
      illustration: "braces",
      caption:
        "Teeth move gradually, and a retainer helps keep them in place afterwards. Your dentist will explain your plan.",
    },
    process: {
      heading: "What the journey can look like",
      intro: "Every case is different, and your own plan may vary. This is the general journey.",
      steps: [
        {
          title: "Consultation and examination",
          text: "Dr. Tripathi listens to what you want to change, examines your teeth and gums and usually takes X-rays.",
        },
        // [CLINIC DETAIL REQUIRED] Records taken, and impression or scan method. Do not name digital scanning.
        {
          title: "Records and planning",
          text: "Photographs, X-rays and impressions or scans may be taken so your treatment can be planned.",
        },
        {
          title: "Your plan",
          text: "You hear your options, the expected timeline and an estimate of cost. There is no pressure to decide on the day.",
        },
        // [CONFIRM SERVICE AVAILABILITY] Fixed braces and aligners, and who fits them.
        {
          title: "Starting treatment",
          text: "Braces are fitted to the teeth, or your first aligners are given, with instructions on how to wear and clean them.",
        },
        {
          title: "Regular check-ups",
          text: "You return for adjustments or aligner checks, so your dentist can follow progress and make changes.",
        },
        {
          title: "Finishing and retention",
          text: "Braces are removed or aligners finished, and a retainer is given to help hold your teeth in place.",
        },
      ],
      footnote:
        "Treatment times and visit patterns depend on your case and are explained at your consultation.",
    },
    // [CONFIRM SERVICE AVAILABILITY] Braces types and aligner system. The repository only confirms
    // "fixed braces or removable clear aligners". Do not name an aligner brand.
    options: {
      heading: "Your options",
      items: [
        {
          title: "Fixed metal braces",
          what: "Brackets bonded to the teeth with a wire that is adjusted over time.",
          suits: "A wide range of cases, including more complex ones.",
          note: "Stay in place throughout treatment.",
        },
        // [CONFIRM SERVICE AVAILABILITY] Delete this card if tooth-coloured braces are not offered.
        {
          title: "Fixed tooth-coloured braces",
          what: "Similar to metal braces, with brackets that blend in with the teeth.",
          suits: "People who want braces that are less noticeable.",
        },
        {
          title: "Clear aligners",
          what: "A series of clear, removable trays that move the teeth step by step.",
          suits: "Many mild to moderate cases, when the person can wear them as instructed.",
          note: "Removable for eating and cleaning, but they only work when worn.",
        },
        {
          title: "Retainers",
          what: "A removable or fixed device that holds teeth in position after treatment.",
          suits: "Everyone finishing treatment.",
          note: "Part of treatment, not an extra.",
        },
      ],
    },
    comparison: {
      heading: "Braces or clear aligners?",
      columns: ["Fixed braces", "Clear aligners"],
      rows: [
        {
          label: "How they work",
          values: ["Brackets and a wire, adjusted by your dentist", "Removable trays, changed step by step"],
        },
        { label: "Removable", values: ["No", "Yes, for eating and cleaning"] },
        { label: "Appearance", values: ["Visible, though some types are less noticeable", "Clear and discreet"] },
        { label: "Eating", values: ["Some foods need avoiding", "Remove them to eat"] },
        {
          label: "Your part",
          values: ["Careful cleaning around brackets", "Wearing them for most of the day, as instructed"],
        },
        {
          label: "Suits",
          values: ["A wide range of cases, including complex ones", "Many mild to moderate cases"],
        },
      ],
      closing:
        "The right option depends on your teeth, your bite, your priorities and clinical assessment. Neither is better for everyone.",
    },
    decides: {
      heading: "Is it right for me?",
      intro: "Your plan is made for you. Your dentist will look at:",
      items: [
        {
          title: "Your teeth and gums",
          text: "Decay and gum disease are treated first, because moving teeth needs a healthy base.",
        },
        { title: "Your bite", text: "How the upper and lower teeth meet." },
        { title: "The X-rays", text: "Roots, bone and teeth that have not yet come through." },
        {
          title: "Your age and growth",
          text: "Teens and adults are treated differently, and a growing jaw is considered.",
        },
        { title: "Your goals", text: "What you want to change, and what is realistic." },
        { title: "Your habits", text: "For example, whether you can wear aligners as instructed." },
      ],
      closing: "If treatment is not needed, or if it can wait, Dr. Tripathi will tell you. You can take time to decide.",
    },
    comfort: {
      heading: "Feeling comfortable",
      // [CLINIC DETAIL REQUIRED] Any comfort measures the clinic offers.
      paragraphs: [
        "It is normal to feel some soreness or pressure for a few days after braces are fitted, after an adjustment, or when you switch to a new aligner. This usually settles.",
        "Braces and aligners can also feel odd against your lips and tongue at first. Your dentist will explain what is normal and how to cope. Questions are always welcome.",
      ],
      image: {
        src: "/images/doctor/explain-consult.jpg",
        alt: "Dr. Shubham Tripathi speaking with a patient beside the consultation desk",
        width: 981,
        height: 637,
      },
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      // [CLINIC DETAIL REQUIRED] Who provides orthodontic care, aligner system or braces type, check-up frequency.
      items: [
        { title: "Listen first", text: "Dr. Tripathi starts by understanding what you want, then examines." },
        {
          title: "Diagnosis before treatment",
          text: "Every recommendation follows an examination, and you are told when something can wait.",
        },
        {
          title: "Plain explanation",
          text: "Options, timelines and the reasons behind them are explained before you decide.",
        },
        {
          title: "Prevention matters",
          text: "Dr. Tripathi's public health training shapes a focus on keeping teeth and gums healthy during treatment, and after it.",
        },
        {
          title: "Open seven days",
          text: "Monday to Saturday until 8 PM, Sunday until 5 PM, which helps when treatment fits around school or work.",
        },
      ],
      equipment: [
        {
          src: "/images/doctor/listen-consult.jpg",
          alt: "Dr. Shubham Tripathi in consultation with a patient at the clinic desk",
          caption: "Listening first",
        },
        {
          src: "/images/doctor/explain-consult.jpg",
          alt: "Dr. Shubham Tripathi speaking with a patient beside the consultation desk",
          caption: "Explaining your options",
        },
        {
          src: "/images/consultation-banner.jpg",
          alt: "A patient and Dr. Shubham Tripathi seated across the consultation desk",
          caption: "Time to talk it through",
        },
      ],
      equipmentNote: "Your first visit is a conversation.",
      galleryLink: { label: "See the clinic in the gallery", href: "/gallery/" },
    },
    doctorQuote:
      "Dental treatment can feel confusing. Findings, options and the reasoning behind a treatment plan are explained in simple, understandable terms.",
    aftercare: {
      heading: "During treatment and afterwards",
      intro: "Your dentist's instructions always come first. This is general guidance.",
      items: [
        {
          title: "The first days",
          text: "Teeth can feel tender, and this tends to ease. It can return after adjustments.",
        },
        {
          title: "Cleaning",
          text: "Brush carefully, and clean around brackets or wear aligners only on clean teeth. Plaque builds up more easily around braces. Your dentist will show you how.",
        },
        {
          title: "Eating",
          text: "With braces, your dentist will list foods to avoid, usually very hard or sticky ones. With aligners, take them out to eat and drink anything other than water, as advised.",
        },
        {
          title: "Retainers",
          text: "After treatment, wear your retainer as instructed. Teeth can drift back if it is left out.",
        },
      ],
      followUp: "Keep your appointments. Missed visits can slow treatment.",
    },
    warning: {
      heading: "When should I contact my dentist?",
      intro: "Please call the clinic if you notice:",
      signs: [
        "a bracket or wire that has come loose, or a wire that is sticking into your cheek",
        "an aligner that has cracked, is lost or no longer fits",
        "pain that is severe or getting worse",
        "swelling of the gums or face",
        "a sore in the mouth that does not heal",
      ],
      emergency:
        "For difficulty breathing or swallowing, or swelling spreading toward the eye or neck, seek emergency medical care straight away.",
    },
    cost: {
      heading: "What affects the cost of braces and aligners?",
      intro: "We do not publish a fixed price, because every case is different. The main factors are:",
      items: [
        {
          title: "How complex the case is",
          text: "Mild alignment changes differ from complex bite problems.",
        },
        { title: "The treatment type", text: "Fixed braces or clear aligners." },
        { title: "How long treatment takes", text: "Longer treatment means more check-ups." },
        { title: "Records", text: "X-rays, photographs and impressions or scans." },
        { title: "Other treatment needed first", text: "For example, fillings or gum care." },
        { title: "Retainers", text: "Needed afterwards." },
      ],
      // [CLINIC DETAIL REQUIRED] Whether the consultation or records are charged separately, and any payment plan.
      closing:
        "After an examination, Dr. Tripathi gives you a clear plan and estimate before treatment begins.",
    },
    faqIntro: "Straight answers about braces and aligners. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "Do braces hurt?",
        answer:
          "Braces are not usually painful, but teeth can feel sore and tender for a few days after fitting and after adjustments. This generally settles. Your dentist will explain what to expect and how to cope with it.",
      },
      {
        question: "How long does treatment take?",
        answer:
          "It depends on how far the teeth need to move and on how well the plan is followed. Treatment commonly takes many months, and some cases take longer. Dr. Tripathi will give an estimate once he has examined you.",
      },
      {
        question: "Can adults get braces or aligners?",
        answer:
          "Yes. Many adults have treatment, and it is not only for teenagers. Healthy gums and teeth are needed, and your dentist will check these first.",
      },
      {
        question: "What is the difference between braces and clear aligners?",
        answer:
          "Braces are fixed to the teeth and adjusted by your dentist. Aligners are removable trays, sometimes searched for as “invisible braces”, though they are visible up close. Each suits different cases, and your dentist will advise which fits you.",
      },
      {
        question: "How much do braces or aligners cost in Lucknow?",
        answer:
          "Cost depends on how complex your case is, the treatment type, how long it takes, the records needed and retainers. After an examination at our Aliganj clinic, you will receive a clear plan and estimate before treatment begins.",
      },
      {
        question: "Are clear aligners suitable for everyone?",
        answer:
          "No. They suit many mild to moderate cases, and need to be worn for most of the day. Some bites need braces. Your dentist will tell you honestly what he thinks will work best.",
      },
      {
        question: "Do I need to wear a retainer afterwards?",
        answer:
          "Usually, yes. Teeth can slowly drift back after treatment, and a retainer helps hold them in place. Your dentist will explain what type you need and how long to wear it.",
      },
      {
        question: "What can I eat with braces?",
        answer:
          "Your dentist will give you a list. In general, very hard, sticky or chewy foods are avoided, because they can damage brackets or wires. Cut harder food into small pieces, and clean carefully after eating.",
      },
      {
        question: "At what age can a child have braces?",
        answer:
          "It depends on the child's teeth and jaw growth, and there is no single age. A dental check can show whether treatment is needed now or can wait.",
        link: { label: "About children's dentistry", href: "/treatments/childrens-dentistry/" },
      },
      {
        question: "Do I need an appointment, and are you open on Sundays?",
        answer:
          "Booking ahead means shorter waits, so we recommend calling, WhatsApp or booking online. We are open Monday to Saturday 10:00 AM to 8:00 PM and Sunday 10:00 AM to 5:00 PM.",
      },
    ],
    related: [
      { slug: "teeth-cleaning", text: "Keeps teeth and gums healthy during treatment." },
      { slug: "gum-and-oral-health", text: "Healthy gums are needed before and during braces." },
      { slug: "childrens-dentistry", text: "Early checks help parents plan for growing teeth." },
    ],
    cta: {
      heading: "Curious what straighter teeth would involve?",
      text: "An examination is the simplest way to find out what is possible for you. Dr. Tripathi will explain your options, the timeline and the cost, with no pressure.",
    },
  },
  "childrens-dentistry": {
    seo: {
      title: "Children's Dentistry in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Gentle checkups and early care for milk teeth and growing smiles. What to expect at your child's first visit. Roots & Pulp, Aliganj, Lucknow. Open 7 days.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION] Paediatric advice (first-visit age, toothpaste, injuries) needs particular care.
    // [VERIFY BEFORE PUBLISHING] Provenance and parental consent for the hero image childrens-dentistry.jpg.
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "For children",
      heading: "Children's Dentistry in Lucknow",
      lede: "Gentle checkups and early care for milk teeth and growing smiles.",
      text: "A good first dental visit is calm, short and mostly about getting to know us. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi sees children of all ages, from their first checkup onwards, and explains everything to you and your child as he goes.",
    },
    glance: [
      { title: "Who it is for", text: "Children of all ages, from their first checkup onwards." },
      { title: "What it covers", text: "Checkups, cavity prevention and early care for growing teeth." },
      {
        title: "A first visit",
        text: "Mostly looking and talking. There is no pressure to start treatment on the same day.",
      },
      { title: "X-rays", text: "Only if your dentist thinks one is needed." },
      {
        title: "At home",
        text: "Simple daily habits do most of the work. We will show you what suits your child.",
      },
    ],
    symptoms: {
      heading: "When might your child need a dental visit?",
      intro:
        "Many children first come in for a routine checkup. Others come because something has caught a parent's eye.",
      items: [
        {
          icon: "sparkle",
          title: "A first checkup",
          text: "It is commonly advised once the first tooth appears, and by around the first birthday.",
        },
        { icon: "spots", title: "Dark spots or small holes", text: "These can be early signs of decay." },
        {
          icon: "temperature",
          title: "Toothache or sensitivity",
          text: "Pain with hot, cold or sweet food, or when chewing.",
        },
        {
          icon: "swelling",
          title: "Bleeding or red gums",
          text: "Especially when brushing.",
          link: { label: "About gum health", href: "/treatments/gum-and-oral-health/" },
        },
        {
          icon: "thumb",
          title: "Thumb sucking or a dummy",
          text: "Habits that continue as teeth come through.",
        },
        {
          icon: "crowded",
          title: "Crowded or crooked teeth",
          text: "An early look can help you plan ahead.",
          link: { label: "About braces & aligners", href: "/treatments/braces-and-aligners/" },
        },
        {
          icon: "crack",
          title: "A knock to the mouth",
          text: "A chipped, loosened or knocked tooth needs prompt attention.",
        },
      ],
      note: "These signs can have different causes. An examination helps find out what is happening and what, if anything, is needed.",
    },
    myths: {
      heading: "Do milk teeth really matter?",
      intro: "Yes. Even though they fall out, milk teeth do real work.",
      items: [
        {
          myth: "They will fall out anyway.",
          fact: "Milk teeth help your child eat, speak and smile. They also hold space for the permanent teeth coming behind them.",
        },
        {
          myth: "A cavity in a milk tooth is not serious.",
          fact: "Decay can cause pain and infection, and it can affect the teeth coming through. It is easier to deal with early.",
        },
        {
          myth: "Only sweets cause cavities.",
          fact: "How often your child has sugary food and drink matters as much as how much. Cleaning habits matter too.",
        },
      ],
      illustration: "milk-teeth",
      caption: "Milk teeth hold the space for the permanent teeth developing beneath them.",
    },
    process: {
      heading: "What happens at your child's first visit",
      intro: "Every child is different, so the pace is set by your child. This is the general journey.",
      steps: [
        {
          title: "Arrive and settle in",
          text: "There is no rush. Your child can look around, and you can tell us what worries you both.",
        },
        {
          title: "A friendly chat",
          text: "Dr. Tripathi starts by listening, to you and to your child. He asks about brushing, food and any concerns.",
        },
        {
          title: "A gentle look",
          text: "He looks at the teeth, gums and bite, and may use a small mirror. An X-ray is only taken if it is needed.",
        },
        {
          title: "Explaining what he sees",
          text: "He explains what he finds in plain words, to you and, in simple terms, to your child.",
        },
        {
          title: "Next steps",
          text: "You hear what care is needed, if any, and when. There is no pressure to start treatment on the same day.",
        },
      ],
      footnote: "If treatment is needed, Dr. Tripathi will explain what it involves before anything begins.",
    },
    // [CONFIRM SERVICE AVAILABILITY] Fluoride application, fissure sealants, milk-tooth root treatment,
    // space maintainers and milk-tooth extraction. Add a card only for services confirmed.
    options: {
      heading: "How we can help",
      suitsLabel: "Why it helps",
      items: [
        {
          title: "Checkups",
          what: "A regular look at teeth, gums and bite as your child grows.",
          suits: "Problems are easier to deal with when found early.",
        },
        {
          title: "Cleaning and prevention",
          what: "Professional cleaning, plus advice on brushing, diet and fluoride toothpaste.",
          suits: "Prevention is the focus of the clinic.",
          links: [{ label: "About teeth cleaning", href: "/treatments/teeth-cleaning/" }],
        },
        {
          title: "Fillings for cavities",
          what: "Tooth-coloured repair of decayed teeth.",
          suits: "Stops decay spreading.",
          links: [{ label: "About tooth-coloured fillings", href: "/treatments/tooth-coloured-fillings/" }],
        },
        {
          title: "Early care and advice",
          what: "Guidance on habits such as thumb sucking, and when to review growing teeth.",
          suits: "Helps you plan, so you are not caught by surprise.",
        },
      ],
    },
    decides: {
      heading: "How care is planned for your child",
      intro: "Care is not one size fits all. Your dentist will look at:",
      items: [
        { title: "Your child's age and stage", text: "Milk teeth, mixed teeth or permanent teeth." },
        { title: "The teeth and gums", text: "Any decay, gum problems or early signs worth watching." },
        { title: "Diet and cleaning habits", text: "What your child eats and drinks, and how often." },
        { title: "Growth and bite", text: "How the jaws and teeth are developing." },
        { title: "Your child's comfort", text: "How they cope, so the pace suits them." },
      ],
      closing: "If something can wait, Dr. Tripathi will say so. We do not treat what does not need treating.",
    },
    comfort: {
      heading: "Helping your child feel at ease",
      // [CLINIC DETAIL REQUIRED] How anxious children are helped, whether a parent can stay, child-friendly
      // measures. Do not mention sedation or "painless".
      paragraphs: [
        "Many children feel nervous, and many parents do too. That is normal.",
        "Dr. Tripathi takes his time, explains each step and checks that your child is comfortable. You can ask him to pause at any point.",
      ],
      tips: {
        heading: "A few things that help at home",
        items: [
          "Talk about the visit in a calm, positive way.",
          "Avoid words like “needle”, “pain” or “hurt”. Say the dentist will “count and check your teeth”.",
          "Book a time when your child is rested and not hungry.",
          "Tell us about any worries beforehand, so we can plan.",
        ],
      },
      image: {
        src: "/images/doctor/explain-consult.jpg",
        alt: "Dr. Shubham Tripathi speaking with a patient beside the consultation desk",
        width: 981,
        height: 637,
      },
    },
    why: {
      heading: "Why families in Aliganj choose Roots & Pulp",
      // [CLINIC DETAIL REQUIRED] Child-specific training (never "paediatric specialist" unless he is one), child-friendly features.
      items: [
        { title: "Children of all ages", text: "We see children from their first checkup onwards." },
        { title: "Listen first", text: "Dr. Tripathi starts by understanding your child and your concerns." },
        {
          title: "Plain explanation",
          text: "You are told what he finds, and your options, before anything begins.",
        },
        {
          title: "Prevention first",
          text: "Dr. Tripathi's public health training shapes a focus on stopping problems before they start.",
        },
        {
          title: "Open seven days",
          text: "Monday to Saturday until 8 PM, Sunday until 5 PM, so visits fit around school and work.",
        },
      ],
      // [NEW PHOTO REQUIRED] Treatment room with no patient, as a third image.
      equipment: [
        {
          src: "/images/clinic-entrance.jpg",
          alt: "Street entrance and signboard of Roots & Pulp Dental Clinic in Aliganj",
          caption: "Our entrance in Sector Q, Aliganj",
          position: "center 40%",
        },
        {
          src: "/images/doctor/listen-consult.jpg",
          alt: "Dr. Shubham Tripathi in consultation with a patient at the clinic desk",
          caption: "Dr. Tripathi listens first",
        },
      ],
      equipmentNote: "Knowing what to expect helps.",
      galleryLink: { label: "See more in the gallery", href: "/gallery/" },
    },
    doctorNote: "Treats patients across different stages of life, from a child's first dental check-up onwards.",
    aftercare: {
      heading: "Looking after your child's teeth",
      intro: "Your dentist's instructions for your own child always come first. This is general guidance.",
      items: [
        {
          title: "Brushing",
          text: "Twice a day, with an adult helping or checking until your child can brush well alone. Ask your dentist which toothpaste and how much suits your child's age.",
        },
        {
          title: "Food and drink",
          text: "Fewer sugary snacks and drinks between meals. Avoid sweet drinks in a bottle at bedtime.",
        },
        {
          title: "After treatment",
          text: "If the mouth was numbed, watch that your child does not bite their lip or cheek until feeling returns. Your dentist will tell you when to eat.",
        },
        // [CLINIC DETAIL REQUIRED] Recommended recall interval.
        {
          title: "Regular checkups",
          text: "Your dentist will say how often your child should return. Many children are seen about every six months, but it varies.",
        },
      ],
      followUp: "Early, regular visits help keep children comfortable at the dentist.",
    },
    warning: {
      heading: "When should I contact the dentist?",
      intro: "Please call the clinic if your child has:",
      signs: [
        "a toothache that lasts, or that stops them eating or sleeping",
        "swelling of the gum or face, or a pimple-like spot on the gum",
        "a tooth that is broken, chipped, loosened or knocked out",
        "a fever with a toothache",
        "bleeding from the mouth that does not settle",
      ],
      emergency:
        "For difficulty breathing or swallowing, swelling spreading toward the eye or neck, or a serious injury to the head or face, seek emergency medical care straight away.",
    },
    cost: {
      heading: "What affects the cost of children's dental care?",
      intro: "We do not publish fixed prices, because needs vary. The main factors are:",
      items: [
        { title: "The type of care", text: "A checkup, a cleaning or a treatment." },
        { title: "How many teeth", text: "One tooth or several." },
        { title: "X-rays", text: "Taken only if needed." },
        { title: "Time", text: "Some children need a slower pace." },
        { title: "Follow-up", text: "Whether further visits are needed." },
      ],
      // [CLINIC DETAIL REQUIRED] Whether a first checkup or consultation is charged separately.
      closing:
        "After an examination, Dr. Tripathi will explain what your child needs and give you an estimate before any treatment begins.",
    },
    faqIntro: "Straight answers for parents. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "When should my child first see a dentist?",
        answer:
          "It is commonly advised once the first tooth appears, and by around the first birthday. Early visits are mostly about getting comfortable and giving you advice. If your child is older and has not been yet, it is never too late to start.",
      },
      {
        question: "Do baby teeth need treatment if they will fall out?",
        answer:
          "Often, yes. Milk teeth help your child eat, speak and keep space for the permanent teeth. Decay in a milk tooth can cause pain and infection. Your dentist will advise what a particular tooth needs.",
      },
      {
        question: "How can I prepare my child for the dentist?",
        answer:
          "Talk about the visit calmly and positively, and avoid scary words. Choose a time when your child is rested, and tell us about any worries beforehand. Your calm helps your child feel safe.",
      },
      {
        question: "Will my child be in pain?",
        answer:
          "A routine checkup is gentle and should not hurt. If treatment is needed, the area is numbed first, and Dr. Tripathi will explain what to expect and check your child is comfortable. Tell us if your child is worried.",
      },
      {
        question: "How often should my child have a checkup?",
        answer:
          "Many children are seen about every six months, but it depends on your child's teeth, diet and risk of decay. Your dentist will tell you what suits your child at the end of each visit.",
      },
      {
        question: "What toothpaste should my child use?",
        answer:
          "Your dentist can advise on the right toothpaste and amount for your child's age. Use only a small amount, and supervise brushing so your child does not swallow it. Please ask us rather than guess.",
      },
      {
        question: "My child sucks their thumb or uses a dummy. Is that a problem?",
        answer:
          "It is very common in young children, and many stop on their own. If it continues as permanent teeth come through, it can affect how they grow. Your dentist can check and suggest gentle ways to help.",
      },
      {
        question: "How much does children's dental treatment cost in Lucknow?",
        answer:
          "It depends on the type of care, how many teeth are involved, any X-rays and how long the visit takes. After an examination at our Aliganj clinic, you will receive a clear explanation and estimate before treatment begins.",
      },
      {
        question: "What should I do if my child breaks or knocks out a tooth?",
        answer:
          "Call us straight away. If a permanent tooth is knocked out, handle it by the crown and do not scrub it. Do not put a baby tooth back in. For serious injuries to the head or face, seek emergency medical care first.",
        link: { label: "Contact the clinic", href: "/contact/" },
      },
      {
        question: "Do I need an appointment, and are you open on Sundays?",
        answer:
          "Booking ahead means shorter waits, so we recommend calling, WhatsApp or booking online. We are open Monday to Saturday 10:00 AM to 8:00 PM and Sunday 10:00 AM to 5:00 PM.",
        link: { label: "Contact us", href: "/contact/" },
      },
    ],
    related: [
      { slug: "teeth-cleaning", text: "Professional cleaning and prevention." },
      { slug: "tooth-coloured-fillings", text: "Repairing cavities in milk and permanent teeth." },
      { slug: "braces-and-aligners", text: "When to check how teeth and jaws are growing." },
    ],
    cta: {
      heading: "A calm first visit starts here.",
      text: "There is no need to wait for a problem. Bring your child in for a gentle checkup, and Dr. Tripathi will explain what he sees, in words you both understand.",
    },
  },
  "cosmetic-dentistry": {
    seo: {
      title: "Cosmetic Dentistry in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Whitening, reshaping, bonding and restorations planned around your smile. What to expect and what affects cost. Roots & Pulp, Aliganj, Lucknow.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION]
    // [VERIFY BEFORE PUBLISHING] Provenance and consent for cosmetic-dentistry.jpg and teeth-whitening.webp.
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Cosmetic dentistry",
      heading: "Cosmetic Dentistry in Lucknow",
      lede: "Changes to your smile, planned around your goals and the health of your teeth.",
      text: "Cosmetic dentistry covers a range of ways to improve how your teeth look, from whitening and reshaping to bonding and restorations. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi will listen to what you want, examine your teeth first and explain what is realistic.",
    },
    glance: [
      { title: "What it covers", text: "Whitening, reshaping, bonding and restorations." },
      { title: "Main goal", text: "Improve how your teeth look, while keeping them healthy." },
      {
        title: "Planning",
        text: "Starts with your goals and an examination, so your dentist can explain what is realistic.",
      },
      { title: "Health first", text: "Decay and gum disease are dealt with before cosmetic work." },
      {
        title: "Visits",
        text: "Some changes are quick, others take several visits. Your dentist will explain what to expect.",
      },
    ],
    symptoms: {
      heading: "Could cosmetic dentistry be relevant to you?",
      intro: "These are common reasons people ask a dentist about changing how their teeth look.",
      items: [
        { icon: "shade", title: "Stained or dull teeth", text: "Colour that has darkened or faded over time." },
        { icon: "crack", title: "A chipped or worn front tooth", text: "An edge that has broken or worn down." },
        { icon: "gap", title: "A gap between teeth", text: "Spaces you would like to close or reduce." },
        {
          icon: "uneven",
          title: "Uneven, short or oddly shaped teeth",
          text: "Teeth that look different from their neighbours.",
        },
        { icon: "filling", title: "Old fillings that stand out", text: "Fillings that no longer match your teeth." },
        {
          icon: "sparkle",
          title: "A smile for a special occasion",
          text: "Many people ask before a wedding or event. Planning ahead helps.",
        },
      ],
      note: "Looks and health are linked. An examination helps find out what is causing the change you notice, and whether it needs treatment first.",
    },
    explainer: {
      heading: "What is cosmetic dentistry?",
      paragraphs: [
        "Cosmetic dentistry is not one treatment. It is a group of treatments that change the colour, shape, size or position of your teeth.",
        "Many do more than improve appearance. For example, repairing a chipped tooth can also protect it, and a well-fitted restoration can help you bite comfortably.",
        "The best results start with healthy teeth and gums, and with realistic expectations. That is why your dentist will talk through your goals first.",
      ],
      illustration: "cosmetic",
      caption: "Different concerns call for different treatments. Your dentist will explain what suits your teeth.",
    },
    process: {
      heading: "What the journey can look like",
      intro: "Every smile is different, so your own plan may vary. This is the general journey.",
      steps: [
        {
          title: "Listening to your goals",
          text: "Dr. Tripathi starts by asking what you would like to change, and what bothers you about your smile.",
        },
        {
          title: "Examination",
          text: "He examines your teeth and gums and usually takes X-rays, because healthy teeth are the base for any cosmetic change.",
        },
        // [CLINIC DETAIL REQUIRED] Mock-ups, previews or shade matching. Do not mention digital smile design.
        {
          title: "Options and expectations",
          text: "You hear what is possible, what each option involves, the likely look and an estimate of cost. There is no pressure to decide on the day.",
        },
        {
          title: "Treating any health needs first",
          text: "Cavities, gum disease or other problems are treated before cosmetic work begins.",
          links: [{ label: "Gum health", href: "/treatments/gum-and-oral-health/" }],
        },
        // [CONFIRM SERVICE AVAILABILITY] Bonding, reshaping, restorations, veneers.
        {
          title: "Cosmetic treatment",
          text: "Treatment is carried out in stages that suit the option chosen.",
        },
        {
          title: "Review and care",
          text: "Your result is checked, and you receive advice on keeping it. A follow-up date is given.",
        },
      ],
      footnote: "The number of visits depends on your treatment and is explained at your consultation.",
    },
    options: {
      heading: "Types of cosmetic treatment",
      items: [
        {
          title: "Teeth whitening",
          what: "Lightens the natural colour of teeth.",
          suits: "Stained or dull teeth with healthy gums.",
          note: "Results vary, and it does not change fillings or crowns.",
          links: [{ label: "About teeth whitening", href: "/treatments/teeth-whitening/" }],
        },
        {
          title: "Dental bonding",
          what: "Tooth-coloured material shaped onto a tooth to repair or reshape it.",
          suits: "Small chips, small gaps or worn edges.",
          note: "Usually a quick, conservative option.",
        },
        {
          title: "Reshaping",
          what: "Gentle adjustments to the shape of a tooth.",
          suits: "Slightly uneven or pointed edges.",
          note: "Only suitable where there is enough healthy tooth.",
        },
        {
          title: "Restorations",
          what: "Tooth-coloured fillings, inlays, onlays and crowns.",
          suits: "Teeth with more damage that need protection as well as a better look.",
          links: [
            { label: "Tooth-coloured fillings", href: "/treatments/tooth-coloured-fillings/" },
            { label: "Crowns & bridges", href: "/treatments/crowns-and-bridges/" },
          ],
        },
        // [CONFIRM SERVICE AVAILABILITY] Veneers are not mentioned anywhere else on the site. Delete if not offered.
        {
          title: "Veneers",
          what: "Thin shells that cover the front of a tooth.",
          suits: "More visible changes in colour or shape.",
        },
      ],
    },
    comparison: {
      heading: "Which treatment for which concern?",
      layout: "table",
      rowHeader: "Your concern",
      columns: ["Treatments your dentist may discuss", "Worth knowing"],
      rows: [
        {
          label: "Stained or dull teeth",
          values: ["Teeth whitening", "Works on natural tooth colour, not on fillings or crowns"],
        },
        { label: "Chipped or small gaps", values: ["Bonding", "Tooth-coloured material shaped onto the tooth"] },
        {
          label: "Uneven or short teeth",
          values: ["Reshaping", "Small adjustments to the tooth's shape, where there is enough tooth"],
        },
        {
          label: "Large damage or weak tooth",
          values: ["Crowns, inlays or onlays", "Protect as well as improve appearance"],
        },
        { label: "Old, dark fillings", values: ["Tooth-coloured fillings", "Replaced only if needed"] },
        // [CONFIRM SERVICE AVAILABILITY] Veneers.
        { label: "Wide changes in shape or colour", values: ["Veneers", "Thin shells over the front of teeth"] },
        { label: "Crooked teeth", values: ["Braces or aligners", "Move the teeth rather than covering them"] },
      ],
      closing:
        "The right option depends on your teeth, your goals and clinical assessment. Sometimes a smaller change is enough.",
      links: [
        { label: "Teeth whitening", href: "/treatments/teeth-whitening/" },
        { label: "Tooth-coloured fillings", href: "/treatments/tooth-coloured-fillings/" },
        { label: "Crowns & bridges", href: "/treatments/crowns-and-bridges/" },
        { label: "Braces & aligners", href: "/treatments/braces-and-aligners/" },
      ],
    },
    decides: {
      heading: "Is it right for me?",
      intro: "Cosmetic work is planned around your teeth, not a template. Your dentist will look at:",
      items: [
        { title: "Your goals", text: "What you want to change, and what is realistic." },
        { title: "Your teeth", text: "How much healthy tooth there is, and what is already in it." },
        { title: "Your gums", text: "Healthy gums are the frame for any change." },
        { title: "Your bite", text: "A change should not interfere with how you chew." },
        { title: "Your habits", text: "For example, grinding or biting hard objects." },
        { title: "Your priorities", text: "Time, cost and how long you want the result to last." },
      ],
      closing:
        "If a simple treatment will do, or if nothing is needed, Dr. Tripathi will say so. You can take time to decide.",
    },
    comfort: {
      heading: "Feeling comfortable",
      // [CLINIC DETAIL REQUIRED] Comfort measures the clinic offers.
      paragraphs: [
        "Many cosmetic treatments are gentle, and some need no anaesthetic at all. Where the area is numbed, you can tell Dr. Tripathi if you feel anything.",
        "Some treatments, such as whitening, can leave teeth sensitive for a short time. Your dentist will explain what to expect, and what to do if it happens.",
        "Questions are always welcome, including awkward ones about how you will look.",
      ],
      image: {
        src: "/images/doctor/explain-consult.jpg",
        alt: "Dr. Shubham Tripathi speaking with a patient beside the consultation desk",
        width: 981,
        height: 637,
      },
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      // [CLINIC DETAIL REQUIRED] Cosmetic training, materials or systems, previews or shade matching.
      items: [
        { title: "Goals first", text: "Dr. Tripathi listens to what you want before suggesting anything." },
        {
          title: "Realistic expectations",
          text: "What is possible, and what is not, is explained upfront.",
        },
        {
          title: "Honest advice",
          text: "You are told when something can wait, or does not need treatment at all.",
        },
        {
          title: "Health before looks",
          text: "Prevention shapes the approach, so cosmetic work sits on healthy teeth and gums.",
        },
        { title: "Open seven days", text: "Monday to Saturday until 8 PM, Sunday until 5 PM." },
      ],
      equipment: [
        {
          src: "/images/doctor/listen-consult.jpg",
          alt: "Dr. Shubham Tripathi in consultation with a patient at the clinic desk",
          caption: "Listening to your goals",
        },
        {
          src: "/images/doctor/explain-consult.jpg",
          alt: "Dr. Shubham Tripathi speaking with a patient beside the consultation desk",
          caption: "Explaining what is realistic",
        },
        {
          src: "/images/equipment/teeth-whitening-light.jpg",
          alt: "LED teeth whitening light glowing blue",
          caption: "Teeth Whitening Light",
          detail: "In-clinic LED whitening",
          position: "center 45%",
        },
      ],
      equipmentNote: "Your first visit is a conversation.",
      galleryLink: { label: "See the clinic in the gallery", href: "/gallery/" },
    },
    doctorNote: "Treats restorative and aesthetic concerns, including smile makeovers.",
    aftercare: {
      heading: "Afterwards, and keeping your result",
      intro: "Your dentist's instructions always come first. This is general guidance.",
      items: [
        {
          title: "Straight after",
          text: "If your mouth was numbed, take care not to bite your lip or cheek until feeling returns.",
        },
        {
          title: "The first days",
          text: "Teeth may feel a little sensitive. Your dentist may also suggest limiting strongly staining food and drink for a while.",
        },
        {
          title: "Everyday care",
          text: "Brush and clean between teeth as usual. Avoid biting hard objects, such as pens, ice or nails, which can chip bonded or restored teeth.",
        },
        {
          title: "Maintenance",
          text: "Cosmetic results are not permanent. Teeth can stain and wear, and restorations may need repair or replacement over time. Regular check-ups and cleaning help.",
        },
      ],
      followUp: "Attend your review. Small adjustments are easier to make early.",
    },
    warning: {
      heading: "When should I contact my dentist?",
      intro: "Please call the clinic if you notice:",
      signs: [
        "a bonded or restored area that has chipped, cracked or come off",
        "a rough or sharp edge",
        "sensitivity that is strong or that does not settle",
        "bleeding, swelling or soreness in the gums",
        "pain that is getting worse",
      ],
      emergency:
        "For difficulty breathing or swallowing, or swelling spreading toward the eye or neck, seek emergency medical care straight away.",
    },
    cost: {
      heading: "What affects the cost of cosmetic dentistry?",
      intro: "We do not publish fixed prices, because every smile is different. The main factors are:",
      items: [
        { title: "The treatment", text: "Whitening, bonding, restorations or another option." },
        { title: "How many teeth", text: "One tooth or several." },
        { title: "The material", text: "Materials differ in look, strength and cost." },
        { title: "How complex it is", text: "Simple changes differ from larger ones." },
        {
          title: "Health work first",
          text: "Fillings, cleaning or gum care that may be needed beforehand.",
        },
        { title: "Maintenance", text: "Check-ups, and repair or replacement over time." },
      ],
      // [CLINIC DETAIL REQUIRED] Whether the consultation is charged separately.
      closing:
        "After an examination, Dr. Tripathi will explain your options and give you an estimate before treatment begins.",
    },
    faqIntro: "Straight answers about cosmetic dentistry. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "What does cosmetic dentistry include?",
        answer:
          "It is a group of treatments that change the colour, shape, size or position of teeth, such as whitening, bonding, reshaping and restorations. Which one suits you depends on your teeth and your goals. Dr. Tripathi will explain the options after an examination.",
      },
      {
        question: "Will cosmetic treatment look natural?",
        answer:
          "The aim is for it to blend with your own teeth, and materials are chosen to match the colour and shape of your teeth as closely as possible. No one can promise exactly how a result will look, so we explain what is realistic before you begin.",
      },
      {
        question: "Does cosmetic dentistry damage teeth?",
        answer:
          "It depends on the treatment. Whitening and bonding are generally conservative. Some treatments, such as crowns, need part of the tooth to be shaped. Your dentist will tell you what each involves, and whether a smaller option would do.",
      },
      {
        question: "How long do cosmetic results last?",
        answer:
          "There is no fixed time. Results depend on the treatment, your habits, how well you look after your teeth and regular check-ups. Teeth can stain and wear, and restorations may need repair or replacement over time.",
      },
      {
        question: "Can I have cosmetic treatment if I have cavities or gum problems?",
        answer:
          "Usually these are treated first, because healthy teeth and gums are the base for cosmetic work. Your dentist will examine you and explain the order of treatment.",
      },
      // [CONFIRM SERVICE AVAILABILITY] Delete the veneers part if not offered.
      {
        question: "Which is better, bonding or veneers?",
        answer:
          "Neither is better for everyone. Bonding is generally a quicker and more conservative way to repair small changes. Veneers cover more of the tooth and suit larger changes.",
      },
      {
        question: "Does teeth whitening hurt?",
        answer:
          "Some people feel temporary sensitivity. Your dentist will check your teeth and gums first and explain what to expect.",
        link: { label: "About teeth whitening", href: "/treatments/teeth-whitening/" },
      },
      {
        question: "How much does cosmetic dentistry cost in Lucknow?",
        answer:
          "The cost depends on the treatment, how many teeth are involved, the material, the complexity and any health work needed first. After an examination at our Aliganj clinic, you will receive a clear explanation and estimate before treatment begins.",
      },
      {
        question: "How many visits will I need?",
        answer:
          "Some changes are quick, and others take several visits. It depends on the treatment you choose. Dr. Tripathi will explain what to expect for your plan at your consultation.",
      },
      {
        question: "Do I need an appointment, and are you open on Sundays?",
        answer:
          "Booking ahead means shorter waits, so we recommend calling, WhatsApp or booking online. We are open Monday to Saturday 10:00 AM to 8:00 PM and Sunday 10:00 AM to 5:00 PM.",
      },
    ],
    related: [
      { slug: "teeth-whitening", text: "Lightens stained or dull teeth." },
      { slug: "crowns-and-bridges", text: "Protect and restore damaged teeth." },
      { slug: "braces-and-aligners", text: "Move crooked teeth rather than covering them." },
    ],
    cta: {
      heading: "Thinking about changing your smile?",
      text: "Start with a conversation. Dr. Tripathi will listen to what you would like, examine your teeth and explain what is possible, with no pressure.",
    },
  },
  "tooth-extraction": {
    seo: {
      title: "Tooth Extraction in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Removal of a tooth that cannot be saved, with clear aftercare. When it may be needed, what to expect and replacement options. Roots & Pulp, Aliganj, Lucknow.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION]
    // [CONFIRM SERVICE AVAILABILITY] Surgical and wisdom tooth extractions: in-house or referral.
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Everyday & preventive care",
      heading: "Tooth Extraction in Aliganj, Lucknow",
      lede: "Careful removal of a tooth that cannot be saved, with clear aftercare.",
      text: "Keeping your natural teeth is always the first aim. When a tooth cannot be saved, removing it can relieve pain and protect your other teeth. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi will examine the tooth, explain why removal is recommended and talk through what comes next.",
    },
    glance: [
      { title: "When it is considered", text: "When a tooth is too damaged, infected or loose to be saved." },
      { title: "First choice", text: "Saving the tooth is considered first, where it is possible." },
      { title: "Planning", text: "Starts with an examination and usually an X-ray." },
      { title: "Comfort", text: "The area is numbed before the tooth is removed." },
      { title: "Afterwards", text: "Clear aftercare advice, and a talk about replacing the tooth if needed." },
    ],
    symptoms: {
      heading: "Why might a tooth need removing?",
      intro: "These are common reasons a dentist may discuss extraction.",
      items: [
        { icon: "lost", title: "A tooth that cannot be repaired", text: "Decay or a break that has gone too far to restore." },
        { icon: "crack", title: "A badly cracked tooth", text: "Some cracks extend too far below the gum to fix." },
        { icon: "swelling", title: "Severe gum disease", text: "When a tooth has lost too much support to stay." },
        { icon: "night", title: "Ongoing pain or infection", text: "When other treatment is not possible or not suitable." },
        { icon: "crowded", title: "Crowding", text: "Occasionally, as part of a plan to straighten teeth." },
        { icon: "sparkle", title: "A problem wisdom tooth", text: "A wisdom tooth that is causing repeated trouble." },
      ],
      note: "Removing a tooth is never automatic. An examination and X-ray show whether the tooth can be saved, and what the options are.",
    },
    explainer: {
      heading: "What happens when a tooth is removed?",
      paragraphs: [
        "A tooth is held in the jaw by its roots and the bone and gum around them. An extraction gently loosens the tooth from that support and removes it.",
        "Most extractions are done with the area numbed, and you will feel pressure rather than pain. Some teeth, such as broken or impacted ones, can take longer.",
        "Afterwards, a blood clot forms in the socket. It protects the area while it heals, which is why the aftercare advice matters.",
      ],
    },
    process: {
      heading: "What to expect",
      intro: "Every tooth is different, so your own plan may vary. This is the general journey.",
      steps: [
        {
          title: "Examination and X-ray",
          text: "Dr. Tripathi examines the tooth, usually takes an X-ray and explains whether it can be saved.",
        },
        {
          title: "Your plan",
          text: "You hear why removal is recommended, the alternatives and an estimate of cost. There is no pressure to decide on the day.",
        },
        { title: "Numbing", text: "The area is numbed, and you can say if you feel anything." },
        { title: "Removing the tooth", text: "The tooth is loosened and removed. You may feel pressure." },
        {
          title: "Aftercare and next steps",
          text: "You receive aftercare advice and, if needed, a talk about replacing the tooth.",
          links: [{ label: "About dental implants", href: "/treatments/dental-implants/" }],
        },
      ],
      footnote: "Your dentist will explain what to expect for your tooth, including whether a review visit is needed.",
    },
    comparison: {
      heading: "Removing a tooth or saving it",
      columns: ["Saving the tooth", "Removing the tooth"],
      rows: [
        {
          label: "What happens",
          values: ["The tooth is repaired, for example with a filling, root canal or crown", "The tooth is taken out"],
        },
        { label: "Natural tooth", values: ["Kept, where it can be saved", "Gap left, which may need replacing"] },
        {
          label: "Best suited",
          values: ["A tooth with enough healthy structure to rebuild", "A tooth that cannot be restored"],
        },
      ],
      closing:
        "The right option depends on the tooth, your health and clinical assessment. Dr. Tripathi will tell you honestly whether a tooth can be saved.",
      links: [
        { label: "Root canal treatment", href: "/treatments/root-canal-treatment/" },
        { label: "Dental implants", href: "/treatments/dental-implants/" },
        { label: "Dentures", href: "/treatments/dentures/" },
      ],
    },
    decides: {
      heading: "How your dentist decides",
      intro: "Your dentist will look at:",
      items: [
        { title: "Whether the tooth can be saved", text: "How much healthy structure remains." },
        { title: "The X-ray", text: "The roots, the bone and nearby teeth." },
        { title: "Your gums and bone", text: "How well the tooth is supported." },
        { title: "Your health and medicines", text: "Some conditions and medicines affect healing." },
        { title: "What comes next", text: "Whether and how the gap should be filled." },
      ],
      closing: "Please tell your dentist about any medicines you take, especially blood thinners.",
    },
    comfort: {
      heading: "Feeling comfortable",
      // [CLINIC DETAIL REQUIRED] Any additional comfort measures. Do not mention sedation unless confirmed.
      paragraphs: [
        "It is normal to feel nervous about having a tooth out. The area is numbed first, and you can tell Dr. Tripathi at any time if you feel anything.",
        "You may feel pressure and movement, which is not the same as pain. Questions are always welcome.",
      ],
      image: consultImage,
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      items: [
        { title: "Saving teeth first", text: "Removal is recommended only when a tooth cannot reasonably be saved." },
        ...whyCore.slice(0, 2),
        whyCore[3],
      ],
      equipment: [
        {
          src: "/images/equipment/digital-xray-rvg.jpg",
          alt: "Digital dental X-ray shown on the clinic laptop",
          caption: "Digital X-ray (RVG)",
          detail: "Instant X-rays on screen",
          position: "center 30%",
        },
        {
          src: "/images/equipment/ultrasonic-cleaner.jpg",
          alt: "Ultrasonic cleaner used to clean dental instruments before sterilisation",
          caption: "Ultrasonic Cleaner",
          detail: "Instrument cleaning before sterilisation",
        },
        {
          src: "/images/equipment/uv-sterilisation-chamber.jpg",
          alt: "UV chamber holding sterilised dental instruments",
          caption: "UV Sterilisation Chamber",
          detail: "Storage for sterilised instruments",
          position: "center 40%",
        },
      ],
      equipmentNote: "Equipment at Roots & Pulp Dental Clinic.",
    },
    doctorQuote: standardDoctorQuote,
    aftercare: {
      heading: "Afterwards: what to expect",
      intro: "Your dentist's instructions always come first. This is general guidance.",
      items: [
        { title: "The first hours", text: "Bite gently on the gauze as advised. Some bleeding at first is normal." },
        { title: "Protect the clot", text: "Avoid rinsing hard, spitting, smoking or using a straw, as your dentist advises." },
        { title: "Eating", text: "Choose soft food and chew on the other side until the area settles." },
        { title: "Healing", text: "Some swelling and discomfort are common. Follow the advice you are given on pain relief." },
      ],
      followUp: "Ask about replacing the tooth. A gap can let neighbouring teeth drift over time.",
    },
    warning: {
      heading: "When should I contact my dentist?",
      intro: "Please call the clinic if you notice:",
      signs: [
        "bleeding that does not settle with firm pressure",
        "pain that gets worse after the first few days",
        "swelling that is increasing",
        "a fever, or a bad taste or smell from the socket",
        "numbness that continues after the anaesthetic should have worn off",
      ],
      emergency: emergencyLine,
    },
    cost: {
      heading: "What affects the cost of an extraction?",
      intro: "We do not publish a fixed price, because it depends on the tooth. The main factors are:",
      items: [
        { title: "Which tooth", text: "Teeth have different numbers and shapes of roots." },
        { title: "How complex it is", text: "Broken or impacted teeth can take longer." },
        { title: "Imaging", text: "X-rays needed to plan safely." },
        { title: "Replacing the tooth", text: "A separate decision, if you choose to fill the gap." },
      ],
      closing: "After an examination, Dr. Tripathi will explain your options and give you an estimate first.",
    },
    faqIntro: "Straight answers about tooth extraction. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "Does having a tooth out hurt?",
        answer:
          "The area is numbed first, so most people feel pressure rather than pain. Some soreness afterwards is common, and your dentist will explain how to manage it.",
      },
      {
        question: "Can the tooth be saved instead?",
        answer:
          "Sometimes. Saving the tooth is always considered first, for example with a filling, root canal treatment or a crown. Dr. Tripathi will explain whether that is possible.",
        link: { label: "About root canal treatment", href: "/treatments/root-canal-treatment/" },
      },
      {
        question: "What can I eat after an extraction?",
        answer:
          "Soft food is usually advised at first, and chewing on the other side. Your dentist will tell you when you can eat normally.",
      },
      {
        question: "Do I need to replace the tooth?",
        answer:
          "Not always, but a gap can affect your bite and let nearby teeth drift. Options include an implant, a bridge or a denture, depending on your situation.",
        link: { label: "About dental implants", href: "/treatments/dental-implants/" },
      },
      {
        question: "How much does a tooth extraction cost in Lucknow?",
        answer:
          "It depends on which tooth, how complex the removal is and the imaging needed. After an examination at our Aliganj clinic, you will get an estimate before treatment begins.",
      },
      appointmentFaq,
    ],
    related: [
      { slug: "root-canal-treatment", text: "Saving a tooth when the inside is infected." },
      { slug: "dental-implants", text: "A fixed way to replace a missing tooth." },
      { slug: "dentures", text: "A removable way to replace missing teeth." },
    ],
    cta: {
      heading: "Worried about a tooth?",
      text: "Start with an examination. Dr. Tripathi will tell you honestly whether the tooth can be saved, and explain the options either way.",
    },
  },
  "teeth-cleaning": {
    seo: {
      title: "Teeth Cleaning in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Professional teeth cleaning removes plaque and tartar and helps protect your gums. What to expect and how often. Roots & Pulp, Aliganj, Lucknow.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION]
    // [CLINIC DETAIL REQUIRED] Scaling method and equipment, recall interval, comfort measures,
    // whether the check-up or X-ray is charged separately. [CONFIRM SERVICE AVAILABILITY] Deeper gum cleaning.
    clinicallyReviewedOn: "",
    compact: true,
    hero: {
      eyebrow: "Everyday & preventive care",
      heading: "Teeth Cleaning in Lucknow",
      lede: "Remove what brushing misses, and help keep your gums healthy.",
      text: "Over time, plaque and tartar build up along the gumline, even if you brush well. A professional clean removes them, and it is one of the simplest ways to look after your gums. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi will check your teeth and gums first and explain what he finds.",
    },
    glance: [
      { title: "What it does", text: "Removes plaque, tartar and some surface stains." },
      { title: "Who it is for", text: "Most adults, and children as advised by the dentist." },
      { title: "Comfort", text: "Usually gentle. Tell us if your teeth or gums are tender." },
      { title: "How often", text: "Your dentist will advise what suits your mouth." },
    ],
    symptoms: {
      heading: "Why a professional clean may help",
      intro: "Brushing is essential, but it cannot remove hardened tartar. These are common reasons people book a clean.",
      items: [
        { icon: "spots", title: "Yellow or brown build-up", text: "Often tartar, which brushing cannot remove." },
        { icon: "swelling", title: "Bleeding gums", text: "Gums can bleed when plaque has built up along them." },
        { icon: "chew", title: "Bad breath that lingers", text: "Plaque and tartar can be a cause." },
        { icon: "brush", title: "A rough feel on the teeth", text: "Tartar feels hard and uneven to the tongue." },
        { icon: "sparkle", title: "It has been a while", text: "Regular cleans help prevent problems from starting." },
        {
          icon: "filling",
          title: "Before other treatment",
          text: "A clean gives your dentist a clearer view, and a healthier base.",
        },
      ],
      note: "These signs can have different causes, including gum disease. An examination helps find out what is happening and whether a clean is enough. If you have ongoing bleeding or gum changes, see Gum & Oral Health.",
    },
    process: {
      heading: "What happens during teeth cleaning",
      intro: "Your own visit may differ slightly. This is the general journey.",
      steps: [
        {
          title: "A quick check",
          text: "Dr. Tripathi looks at your teeth and gums, and asks about any bleeding or sensitivity. An X-ray is taken only if it is needed.",
        },
        // [CLINIC DETAIL REQUIRED] Scaling method. Do not name equipment unless confirmed.
        {
          title: "Scaling",
          text: "Plaque and tartar are removed from the teeth, including along the gumline and between the teeth, using dental instruments.",
        },
        {
          title: "Polishing",
          text: "The teeth are polished, which smooths the surface and removes some stains. Smooth teeth collect plaque more slowly.",
        },
        {
          title: "Advice",
          text: "You hear what he found, how to clean at home and when to come back. If your gums need more than a routine clean, he will explain why and what the next step is.",
          links: [{ label: "About gum health", href: "/treatments/gum-and-oral-health/" }],
        },
      ],
      illustration: "cleaning",
      caption: "Tartar builds up where brushing cannot reach. A professional clean removes it.",
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      items: [
        {
          title: "Prevention first",
          text: "Dr. Tripathi's public health training shapes a focus on keeping problems from starting.",
        },
        {
          title: "A check before a clean",
          text: "Every recommendation starts with an examination, so you get what you need, nothing more.",
        },
        { title: "Clear explanation", text: "You are shown what he finds, in plain language." },
      ],
      equipmentNote: "",
    },
    aftercare: {
      heading: "What to expect afterwards",
      intro: "Your dentist's instructions come first. This is general guidance.",
      items: [
        {
          title: "Straight after",
          text: "Your mouth may feel fresh and smooth. Gums can be a little tender or may bleed slightly.",
        },
        {
          title: "Sensitivity",
          text: "Teeth can feel sensitive to hot or cold for a short while. This usually settles. Tell us if it does not.",
        },
        {
          title: "Keeping it clean",
          text: "Brush twice a day and clean between your teeth. Regular cleans work best alongside good habits at home.",
        },
      ],
      callLine: "Please contact us if bleeding does not settle, or if you notice swelling or severe pain.",
    },
    cost: {
      heading: "What affects the cost of teeth cleaning?",
      intro: "We do not publish fixed prices, because every mouth is different. The main factors are:",
      items: [
        { title: "How much plaque and tartar there is" },
        { title: "The condition of your gums" },
        { title: "Whether more than one visit is needed" },
        { title: "Whether an X-ray or other treatment is needed" },
      ],
      closing: "After a quick examination, Dr. Tripathi will tell you what you need and what it will cost, before you begin.",
    },
    faqIntro: "Straight answers about teeth cleaning. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "Is teeth cleaning necessary?",
        answer:
          "Brushing removes plaque, but it cannot remove tartar once it hardens. A professional clean removes both, and helps protect your gums. Dr. Tripathi will check your teeth first, and tell you whether a clean is needed, and how often.",
      },
      {
        question: "Does teeth cleaning hurt?",
        answer:
          "It is usually comfortable, though you may feel scraping or vibration. Gums that are inflamed can be tender. Tell Dr. Tripathi if anything is uncomfortable, and he can adjust or pause.",
      },
      {
        question: "Does scaling loosen teeth or damage enamel?",
        answer:
          "No, scaling removes tartar, not the tooth itself. Teeth can sometimes feel looser or show gaps afterwards, because tartar and swollen gums had been hiding gum problems. If so, your dentist will explain what is happening.",
      },
      // [CLINIC DETAIL REQUIRED] Recommended recall interval.
      {
        question: "How often should I have my teeth cleaned?",
        answer:
          "Many people have a clean about every six months, but it depends on your gums, how quickly tartar builds up and how you clean at home. Your dentist will tell you what suits you.",
      },
      {
        question: "Will cleaning whiten my teeth?",
        answer:
          "Polishing removes some surface stains, so teeth often look brighter. It does not change the natural colour of your teeth.",
        link: { label: "About teeth whitening", href: "/treatments/teeth-whitening/" },
      },
      {
        question: "How much does teeth cleaning cost in Lucknow?",
        answer:
          "It depends on how much plaque and tartar there is, the condition of your gums, whether more than one visit is needed and whether X-rays are needed. After a quick examination at our Aliganj clinic, you will be told the cost before you begin.",
      },
      {
        question: "Is it normal for my gums to bleed afterwards?",
        answer:
          "Slight bleeding or tenderness can happen, especially if your gums were inflamed. It should settle in a day or two as the gums heal. If it continues, or you have swelling or pain, please contact us.",
      },
    ],
    related: [
      { slug: "gum-and-oral-health", text: "When bleeding or receding gums need more than a routine clean." },
      { slug: "tooth-coloured-fillings", text: "If your check-up finds a cavity." },
      { slug: "teeth-whitening", text: "A cleaner surface is the first step before whitening." },
    ],
    cta: {
      heading: "Due for a clean?",
      text: "A short visit can help protect your gums for the long term. Dr. Tripathi will check your teeth and explain what you need.",
    },
  },
  "tooth-coloured-fillings": {
    seo: {
      title: "Tooth-Coloured Fillings in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Tooth-coloured fillings repair cavities with a material matched to your natural teeth. What to expect and what affects cost. Roots & Pulp, Aliganj, Lucknow.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION]
    // [CLINIC DETAIL REQUIRED] Filling material and how it is placed, anaesthesia approach, charges.
    // [CONFIRM SERVICE AVAILABILITY] Silver (amalgam) fillings: the page says nothing either way.
    // [VERIFY BEFORE PUBLISHING] Hero image is only 500x500.
    clinicallyReviewedOn: "",
    compact: true,
    hero: {
      eyebrow: "Everyday & preventive care",
      heading: "Tooth-Coloured Fillings in Lucknow",
      lede: "Repair a cavity with a filling matched to your natural teeth.",
      text: "A cavity is a hole that decay has made in a tooth. A filling removes the decay and rebuilds the tooth, and tooth-coloured fillings are chosen to blend in with the teeth around them. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi will show you the cavity and explain what is needed before he begins.",
    },
    glance: [
      { title: "What it treats", text: "Cavities and small areas of tooth damage." },
      { title: "Goal", text: "Remove decay, rebuild the tooth and protect it." },
      { title: "Comfort", text: "The area is numbed where needed." },
      { title: "Visits", text: "Often one, but it depends on the tooth. Your dentist will explain." },
    ],
    symptoms: {
      heading: "Signs you may need a filling",
      intro: "Early cavities often cause no pain at all, which is why check-ups matter. Later, you might notice:",
      items: [
        { icon: "spots", title: "A dark spot or small hole", text: "On the tooth surface, or between teeth." },
        { icon: "temperature", title: "Sensitivity", text: "To sweet food, or to hot or cold." },
        { icon: "bite", title: "Food getting stuck", text: "In the same place, again and again." },
        { icon: "crack", title: "A rough or sharp edge", text: "On a tooth that feels chipped or worn." },
        { icon: "night", title: "Pain when you chew", text: "Or a tooth that aches now and then." },
        { icon: "filling", title: "An old filling that has cracked", text: "Or one that has come loose." },
      ],
      note: "These signs can have different causes. An examination, and sometimes an X-ray, shows what is happening and whether a filling is the right treatment.",
    },
    process: {
      heading: "What happens during a filling",
      intro: "Your own visit may differ slightly. This is the general journey.",
      steps: [
        {
          title: "Examination",
          text: "Dr. Tripathi looks at the tooth, and an X-ray is taken if it is needed. With an intraoral camera, you can see the cavity on screen with him.",
        },
        // [CLINIC DETAIL REQUIRED] Confirm anaesthesia approach.
        {
          title: "Numbing",
          text: "The area around the tooth is numbed where needed, so you should not feel pain during the work.",
        },
        { title: "Removing the decay", text: "The decayed part of the tooth is removed, and the space is cleaned." },
        // [CLINIC DETAIL REQUIRED] Filling material and how it is placed. Do not name a brand.
        {
          title: "Placing the filling",
          text: "The tooth-coloured material is placed, shaped to match your tooth and hardened.",
        },
        {
          title: "Checking your bite",
          text: "He checks that your teeth meet comfortably, and adjusts the filling if needed. You hear how to look after it.",
        },
      ],
      illustration: "filling",
      caption: "The decayed part is removed and the tooth is rebuilt with a tooth-coloured filling.",
    },
    infoCards: {
      heading: "When a filling may not be enough",
      intro: "Not every damaged tooth can be rebuilt with a filling alone. Your dentist will advise.",
      items: [
        {
          title: "A large or weakened tooth",
          text: "If a lot of the tooth is missing, a crown, inlay or onlay may protect it better.",
          link: { label: "About crowns & bridges", href: "/treatments/crowns-and-bridges/" },
        },
        {
          title: "Decay that has reached the nerve",
          text: "The tooth may be painful, and may need root canal treatment.",
          link: { label: "About root canal treatment", href: "/treatments/root-canal-treatment/" },
        },
      ],
      closing:
        "A small cavity treated early is simpler than a big one later, which is why we recommend regular check-ups.",
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      items: [
        {
          title: "See it for yourself",
          text: "An intraoral camera lets you view your own teeth on screen with your dentist.",
        },
        {
          title: "Only what is needed",
          text: "Diagnosis comes before treatment, and you are told when something can wait.",
        },
        {
          title: "Prevention first",
          text: "Dr. Tripathi's public health training shapes a focus on stopping cavities before they grow.",
        },
      ],
      equipment: [
        {
          src: "/images/equipment/intraoral-camera-cavities.jpg",
          alt: "Intraoral camera screen showing cavities in the grooves of back teeth",
          caption: "Intraoral Camera",
          detail: "See cavities on screen with your dentist",
        },
      ],
      equipmentNote: "Examination at Roots & Pulp.",
    },
    aftercare: {
      heading: "What to expect afterwards",
      intro: "Your dentist's instructions come first. This is general guidance.",
      items: [
        {
          title: "While you are numb",
          text: "Take care not to bite your lip, cheek or tongue. Your dentist will tell you when to eat.",
        },
        {
          title: "Sensitivity",
          text: "The tooth may be sensitive to hot or cold for a short time. Tell us if it does not settle.",
        },
        {
          title: "Your bite",
          text: "If the tooth feels too high or uncomfortable, ask for it to be adjusted. Do not wait for it to settle.",
        },
        {
          title: "Long term",
          text: "Decay can return at the edges of a filling, and fillings can wear or chip. Clean between your teeth, and keep up your check-ups.",
        },
      ],
      callLine: "Please contact us if a filling breaks or comes out, if pain is getting worse, or if you notice swelling.",
    },
    cost: {
      heading: "What affects the cost of tooth-coloured fillings?",
      intro: "We do not publish fixed prices, because every tooth is different. The main factors are:",
      items: [
        { title: "The size and number of cavities" },
        { title: "Where the tooth is in your mouth" },
        { title: "The material used" },
        { title: "Whether an X-ray or other treatment is needed" },
      ],
      closing: "After an examination, Dr. Tripathi will explain what you need and what it will cost before you begin.",
    },
    faqIntro: "Straight answers about fillings. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "Does a filling hurt?",
        answer:
          "The area is numbed where needed, so you should not feel pain during the work. You may feel pressure or vibration. If anything is uncomfortable, tell Dr. Tripathi and he can pause or adjust. The tooth can be sensitive for a short time afterwards.",
      },
      {
        question: "How do I know if I need a filling?",
        answer:
          "A dark spot or hole, sensitivity to sweet, hot or cold food, and food catching in one place can all be signs. Early cavities often cause no symptoms, so only an examination, and sometimes an X-ray, can tell.",
      },
      {
        question: "How long does a filling take?",
        answer:
          "It depends on the size and position of the cavity. Many fillings are done in one visit, but some teeth need more. Dr. Tripathi will tell you what to expect after examining you.",
      },
      // [CLINIC DETAIL REQUIRED] Confirm the material the clinic uses.
      {
        question: "What are tooth-coloured fillings made of?",
        answer:
          "They are made from a tooth-coloured material that is shaped onto the tooth and hardened. The exact material depends on the tooth and your dentist's advice.",
      },
      {
        question: "Are tooth-coloured fillings better than silver ones?",
        answer:
          "They are different. Tooth-coloured fillings blend in with your teeth, and the right material for a particular tooth depends on its size, position and your bite. Your dentist will explain the options for your tooth.",
      },
      {
        question: "How much does a tooth filling cost in Lucknow?",
        answer:
          "It depends on the size and number of cavities, where the tooth is, the material and whether an X-ray is needed. After an examination at our Aliganj clinic, you will be told the cost before you begin.",
      },
      {
        question: "When can I eat after a filling?",
        answer:
          "Your dentist will tell you. In general, avoid eating while your mouth is numb, so you do not bite your lip or cheek. Be gentle with the tooth until you are advised that it is fully ready.",
      },
      {
        question: "How long does a filling last?",
        answer:
          "There is no fixed lifespan. A filling can last for years, but it can wear, chip or have decay form at its edge. Good cleaning and regular check-ups help your dentist spot problems early.",
      },
    ],
    related: [
      { slug: "crowns-and-bridges", text: "Protect a tooth that is too damaged for a filling." },
      { slug: "root-canal-treatment", text: "For decay that has reached the inside of the tooth." },
      { slug: "teeth-cleaning", text: "Regular cleans help prevent new cavities." },
    ],
    cta: {
      heading: "Spotted something on a tooth?",
      text: "An early check is simpler, and usually smaller, than a late one. Dr. Tripathi will show you what he finds and explain your options.",
    },
  },
  "gum-and-oral-health": {
    seo: {
      title: "Gum Treatment in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Treatment for bleeding or receding gums, plus oral cancer screening. Learn the signs, what happens and what affects cost. Roots & Pulp, Aliganj, Lucknow.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION] Screening, ulcer guidance and reversibility need particular care.
    // [CONFIRM SERVICE AVAILABILITY] Deeper cleaning below the gumline (card hidden until confirmed),
    // care for receding gums and referral practice. [CLINIC DETAIL REQUIRED] How gum health is measured,
    // how screening is done and the referral pathway, comfort measures, charges.
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Gum & Oral Health",
      heading: "Gum Treatment in Lucknow",
      lede: "Bleeding gums are worth checking, not ignoring.",
      text: "Healthy gums are the foundation of healthy teeth. If your gums bleed, look swollen or have started to pull away from your teeth, an examination can show what is happening and what can help. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi also checks your mouth for early signs of oral cancer.",
    },
    glance: [
      { title: "What it treats", text: "Bleeding, swollen or receding gums, and gum disease." },
      { title: "Also includes", text: "Oral cancer screening." },
      { title: "Planning", text: "Starts with an examination of your gums and an X-ray if needed." },
      { title: "Early is easier", text: "Gum problems are generally simpler to manage when caught early." },
      { title: "Long term", text: "Good home care and regular visits matter as much as treatment." },
    ],
    symptoms: {
      heading: "Could this be relevant to you?",
      intro: "These are common reasons people ask a dentist about their gums.",
      items: [
        {
          icon: "swelling",
          title: "Bleeding when you brush or clean between your teeth",
          text: "This is the most common sign.",
        },
        { icon: "spots", title: "Red, swollen or tender gums", text: "Healthy gums are usually pink and firm." },
        { icon: "chew", title: "Bad breath that does not go away", text: "Or a bad taste in your mouth." },
        {
          icon: "uneven",
          title: "Gums pulling away from your teeth",
          text: "Teeth may look longer, or feel sensitive.",
        },
        {
          icon: "bite",
          title: "Teeth that feel loose or have moved",
          text: "Or a change in how your bite fits together.",
        },
        { icon: "lost", title: "Pus or a bump on the gum", text: "Sometimes with tenderness." },
        {
          icon: "sparkle",
          title: "A mouth ulcer, lump or patch that does not heal",
          text: "See the oral cancer screening section below.",
        },
      ],
      note: "These signs can have different causes. An examination helps find out what is happening and what, if anything, is needed.",
    },
    explainer: {
      heading: "What is gum disease?",
      paragraphs: [
        "Plaque is a sticky film of bacteria that builds up on teeth every day. If it is not cleaned away, it can irritate the gums and make them inflamed.",
        "This early stage is called gingivitis. It is common, and usually goes away with good cleaning at home and a professional clean.",
        "If it is left, the inflammation can spread deeper, and the tissues that support the teeth can start to break down. This more advanced stage is called periodontitis.",
      ],
      illustration: "gum-stages",
      caption: "Gum disease develops in stages, and it is easier to manage early. Your dentist will explain what applies to you.",
    },
    process: {
      heading: "What happens during gum treatment",
      intro: "Every mouth is different, so your own plan may vary. This is the general journey.",
      steps: [
        // [CLINIC DETAIL REQUIRED] How gum health is measured at the clinic.
        {
          title: "Listening and examination",
          text: "Dr. Tripathi asks about your symptoms, health and habits, then examines your gums and teeth. He may measure the space between your gum and tooth with a small instrument.",
        },
        {
          title: "X-ray, if needed",
          text: "An X-ray can show the bone that supports your teeth, and how much of it remains.",
        },
        {
          title: "Explaining what he finds",
          text: "With an intraoral camera, you can see your own gums and teeth on screen, while he explains what is happening.",
        },
        {
          title: "Your plan",
          text: "You hear the options, what each involves, how many visits are likely and an estimate of cost. There is no pressure to decide on the day.",
        },
        // [CONFIRM SERVICE AVAILABILITY] Deeper cleaning below the gumline.
        {
          title: "Professional cleaning",
          text: "Plaque and tartar are removed from above and, where needed, just below the gumline.",
          links: [{ label: "About teeth cleaning", href: "/treatments/teeth-cleaning/" }],
        },
        {
          title: "Review and maintenance",
          text: "Your gums are rechecked to see how they have responded, and you are shown how to keep them healthy. A follow-up schedule is agreed.",
        },
      ],
      footnote:
        "The number of visits and the type of treatment depend on your gums. Dr. Tripathi will explain what to expect for you.",
    },
    options: {
      heading: "Your options",
      items: [
        {
          title: "Professional cleaning",
          what: "Removal of plaque and tartar from the teeth and gumline.",
          suits: "Early gum inflammation, and as a regular check on gum health.",
          links: [{ label: "About teeth cleaning", href: "/treatments/teeth-cleaning/" }],
        },
        // [CONFIRM SERVICE AVAILABILITY] "Deeper gum cleaning" card omitted until confirmed.
        // [CONFIRM SERVICE AVAILABILITY and referral practice] Care for receding gums.
        {
          title: "Care for receding gums",
          what: "Finding the cause, and protecting the exposed root. This may involve changes to brushing, treating gum disease, or reducing sensitivity.",
          suits: "Gums that have pulled back from the teeth.",
          note: "Gum tissue does not grow back on its own. If more specialised treatment is needed, Dr. Tripathi will explain, including whether a referral is appropriate.",
        },
        {
          title: "Home-care guidance",
          what: "Showing you how to brush and clean between your teeth effectively.",
          suits: "Everyone, and often the most important part.",
        },
      ],
    },
    comparison: {
      heading: "Early and advanced gum problems",
      columns: ["Early (gingivitis)", "Advanced (periodontitis)"],
      rows: [
        {
          label: "What is affected",
          values: ["The gums only", "The gums and the bone and tissue supporting teeth"],
        },
        {
          label: "Common signs",
          values: ["Bleeding, redness, swelling", "Gums pulling away, bad breath, loose teeth, bone loss on X-ray"],
        },
        {
          label: "Can it be reversed?",
          values: [
            "Usually, with good cleaning and care",
            "Damage already done cannot be reversed, but it can often be managed",
          ],
        },
        {
          label: "Typical approach",
          values: ["Professional clean and better home care", "Deeper cleaning and closer follow-up, sometimes more"],
        },
        {
          label: "Why it matters",
          values: ["Easy to turn around", "Can lead to loose or lost teeth if not controlled"],
        },
      ],
      closing:
        "Only an examination can tell which stage applies to you, so please do not diagnose yourself from a table. The right approach depends on your oral health and clinical assessment.",
    },
    extra: {
      id: "oral-cancer-screening",
      heading: "Oral cancer screening",
      // [CLINIC DETAIL REQUIRED] How screening is done at the clinic, and the referral pathway.
      paragraphs: [
        "A screening is a careful check of your mouth for changes that may need a closer look. It is usually a quick look at, and gentle feel of, your lips, cheeks, tongue, the floor and roof of your mouth, and your neck.",
        "It is useful for anyone, and particularly for people who smoke or use tobacco in any form, including chewing tobacco, gutka and paan, or who drink alcohol regularly.",
        "Most changes in the mouth turn out to be harmless. Finding any that are not, early, gives the best chance of treating them.",
      ],
      listHeading: "Please see a dentist or doctor if you notice",
      list: [
        "a mouth ulcer that has not healed within three weeks",
        "a white or red patch that stays",
        "a lump or thickening in the mouth or neck",
        "unexplained bleeding, numbness, or difficulty swallowing or moving your tongue",
      ],
      closing: "If anything needs a closer look, Dr. Tripathi will explain what he has seen and what the next step is.",
    },
    decides: {
      heading: "How your dentist decides",
      intro: "Your plan is made for you. Your dentist will look at:",
      items: [
        { title: "Your gums", text: "Their colour, firmness, bleeding and the space around each tooth." },
        { title: "The X-ray", text: "How much supporting bone remains." },
        { title: "Your teeth", text: "Whether any are loose, or have moved." },
        {
          title: "Your habits",
          text: "Cleaning, diet, and smoking or tobacco use, which affect gum health.",
        },
        {
          title: "Your health",
          text: "Some conditions, such as diabetes, can affect gums, and gum disease can affect them. Please tell us about any you have.",
        },
        { title: "Your priorities", text: "Time, comfort and what you want to protect." },
      ],
      closing: "If treatment can wait, or is not needed, Dr. Tripathi will say so.",
    },
    comfort: {
      heading: "Feeling comfortable",
      // [CLINIC DETAIL REQUIRED] Comfort measures for sensitive patients.
      paragraphs: [
        "Inflamed gums can be tender, so a clean may feel more sensitive than you expect. Tell Dr. Tripathi if anything is uncomfortable, and he can adjust or pause.",
        "Where numbing is needed, it is used. Questions are always welcome, including worries about what the findings mean.",
      ],
      image: consultImage,
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      items: [
        {
          title: "Prevention first",
          text: "Dr. Tripathi's public health training shapes a focus on stopping problems before they start, which is exactly what gum care is about.",
        },
        {
          title: "See it for yourself",
          text: "An intraoral camera lets you view your own gums and teeth on screen.",
        },
        {
          title: "Honest and clear",
          text: "Diagnosis comes before treatment, and you hear your options in plain language.",
        },
        { title: "Open seven days", text: "Monday to Saturday until 8 PM, Sunday until 5 PM." },
      ],
      equipment: [
        {
          src: "/images/equipment/digital-xray-rvg.jpg",
          alt: "RVG digital X-ray system shown on the clinic laptop",
          caption: "Digital X-rays at Roots & Pulp",
          position: "center 30%",
        },
        {
          src: "/images/equipment/intraoral-camera-cavities.jpg",
          alt: "Intraoral camera screen showing close-up views of back teeth",
          caption: "See your own teeth on screen",
        },
      ],
      equipmentNote: "Examination at Roots & Pulp.",
    },
    doctorNote:
      "His training in public health shapes an emphasis on prevention, early attention to dental concerns and helping patients keep their teeth healthy.",
    aftercare: {
      heading: "Afterwards, and keeping your gums healthy",
      intro: "Your dentist's instructions always come first. This is general guidance.",
      items: [
        {
          title: "Straight after",
          text: "Gums can be tender and may bleed slightly. This usually settles in a day or two.",
        },
        {
          title: "Sensitivity",
          text: "Teeth can feel more sensitive once tartar is gone, especially where gums have receded. It usually eases. Tell us if it does not.",
        },
        {
          title: "Every day",
          text: "Brush gently twice a day with a soft brush, and clean between your teeth. Your dentist will show you the technique that suits you.",
        },
        {
          title: "Long term",
          text: "Gum disease can return. Regular check-ups, professional cleans and avoiding tobacco help protect your gums.",
        },
      ],
      followUp: "Keep your review appointments. They are how problems are caught early.",
    },
    warning: {
      heading: "When should I contact my dentist?",
      intro: "Please call the clinic if you notice:",
      signs: [
        "gum bleeding that does not settle, or is getting heavier",
        "swelling, pus, or a painful lump on the gum",
        "a tooth that is becoming loose",
        "a mouth ulcer, lump or patch that has not healed within three weeks",
        "pain that is getting worse",
      ],
      emergency: emergencyLine,
    },
    cost: {
      heading: "What affects the cost of gum treatment?",
      intro: "We do not publish fixed prices, because every mouth is different. The main factors are:",
      items: [
        { title: "How advanced the problem is", text: "Early inflammation differs from advanced gum disease." },
        { title: "How much of the mouth is affected", text: "One area, or several." },
        { title: "The type of treatment", text: "A routine clean, or deeper cleaning." },
        { title: "How many visits", text: "More complex cases need more." },
        { title: "X-rays", text: "Needed to see the bone." },
        { title: "Maintenance", text: "Regular reviews and cleans afterwards." },
      ],
      closing: "After an examination, Dr. Tripathi will explain what you need and what it will cost before you begin.",
    },
    faqIntro: "Straight answers about gum health. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "Why do my gums bleed when I brush?",
        answer:
          "The most common cause is plaque building up along the gumline and irritating the gums. Bleeding does not mean you should stop brushing. It usually means the gums need better cleaning. If it continues for more than a week or two, have your gums checked.",
      },
      {
        question: "Can gum disease be cured?",
        answer:
          "Early gum disease (gingivitis) can usually be reversed with good cleaning. More advanced disease cannot be reversed once bone has been lost, but it can often be controlled with treatment and regular care. An examination shows which applies.",
      },
      {
        question: "Can receding gums grow back?",
        answer:
          "Gum tissue does not usually grow back by itself. The cause is found and treated to stop it getting worse, and sensitivity can be managed. If more specialised treatment is needed, Dr. Tripathi will explain, including whether a referral is appropriate.",
      },
      {
        question: "Does gum treatment hurt?",
        answer:
          "Inflamed gums can be tender, so some discomfort is possible. Numbing is used where needed, and you can tell Dr. Tripathi at any point if you feel anything. Gums are often sore for a day or two afterwards.",
      },
      {
        question: "Will I lose my teeth?",
        answer:
          "Not necessarily. Most gum problems can be managed, especially when found early. Advanced gum disease can lead to loose teeth if it is not controlled, which is why early checks matter. Dr. Tripathi will tell you honestly where you stand.",
        link: { label: "About dentures", href: "/treatments/dentures/" },
      },
      {
        question: "How many visits will gum treatment take?",
        answer:
          "It depends on how advanced the problem is and how much of the mouth is affected. Early problems may need little more than a clean and better home care. Dr. Tripathi will outline what to expect after examining you.",
      },
      {
        question: "How much does gum treatment cost in Lucknow?",
        answer:
          "It depends on how advanced the problem is, how much of the mouth is affected, the type of treatment, the number of visits and X-rays needed. After an examination at our Aliganj clinic, you will be told the cost before you begin.",
      },
      {
        question: "What is oral cancer screening, and who should have it?",
        answer:
          "It is a careful check of your mouth, tongue, cheeks and neck for changes that may need a closer look. Anyone can have it, and it is especially worthwhile if you smoke or use tobacco, including chewing tobacco and paan, or drink alcohol regularly.",
      },
      {
        question: "I have a mouth ulcer. Should I be worried?",
        answer:
          "Most mouth ulcers are harmless and heal within one to two weeks. If an ulcer has not healed after three weeks, or you notice a lump, a white or red patch or unexplained bleeding, please have it checked promptly.",
      },
      appointmentFaq,
    ],
    related: [
      { slug: "teeth-cleaning", text: "A routine professional clean, and part of keeping gums healthy." },
      { slug: "tooth-extraction", text: "When a tooth has lost too much support to be saved." },
      { slug: "dental-implants", text: "One way to replace a tooth that has been lost." },
    ],
    cta: {
      heading: "Noticed something with your gums? Start with a check.",
      text: "Gum problems are easier to manage when they are found early. Dr. Tripathi will examine your gums and mouth, and explain what he finds in plain words.",
    },
  },
  dentures: {
    seo: {
      title: "Dentures in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Partial and complete dentures made to fit comfortably. What to expect, getting used to them, and what affects cost. Roots & Pulp, Aliganj, Lucknow.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION]
    // [CONFIRM SERVICE AVAILABILITY] Immediate and implant-supported dentures (cards hidden until confirmed).
    // [CLINIC DETAIL REQUIRED] Laboratory, shade and tooth selection, adjustment arrangements, repairs and relines,
    // charges. [VERIFY BEFORE PUBLISHING] Provenance of dentures.jpg (678x452).
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Replacing missing teeth",
      heading: "Dentures in Lucknow",
      lede: "Replace missing teeth with dentures made to fit you comfortably.",
      text: "Dentures are removable teeth that replace some or all of the teeth you have lost, so you can chew, speak and smile with more confidence. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi will examine your mouth first, explain your options and make sure you know what to expect.",
    },
    glance: [
      { title: "What they replace", text: "One or several missing teeth, or a full set." },
      { title: "Two main types", text: "Partial dentures and complete dentures." },
      { title: "Removable", text: "You take them out to clean them." },
      { title: "Planning", text: "Starts with an examination, so your dentist can explain what suits you." },
      {
        title: "Time",
        text: "Making dentures takes several steps over more than one visit. Your dentist will explain what to expect.",
      },
    ],
    symptoms: {
      heading: "Could dentures be relevant to you?",
      intro: "These are common reasons people ask a dentist about dentures.",
      items: [
        { icon: "gaps", title: "Several missing teeth", text: "Gaps that make chewing difficult." },
        { icon: "denture", title: "All teeth missing in one or both jaws", text: "A full set may be considered." },
        {
          icon: "lost",
          title: "Teeth that cannot be saved",
          text: "Your dentist may discuss what could replace them.",
          link: { label: "About tooth extraction", href: "/treatments/tooth-extraction/" },
        },
        { icon: "chew", title: "Chewing mostly on one side", text: "Because gaps make the other side work harder." },
        {
          icon: "adult",
          title: "Changes in speech or in how your face looks",
          text: "Missing teeth can affect both.",
        },
        { icon: "uneven", title: "An old denture that no longer fits", text: "Gums change shape over time." },
      ],
      note: "Everyone's situation is different. An examination is needed to find out whether dentures, or another option, would suit you.",
    },
    explainer: {
      heading: "What are dentures?",
      paragraphs: [
        "Dentures are replacement teeth, set in a base that rests on your gums. They are made for your mouth, from impressions of your gums and teeth, so they fit you and not a standard shape.",
        "A partial denture fills gaps while you still have some of your own teeth. A complete denture replaces all the teeth in the upper jaw, the lower jaw or both.",
        "They can be taken out for cleaning, and some people also take them out at night. Your dentist will advise what is best for you.",
      ],
      illustration: "dentures",
      caption:
        "A partial denture fills gaps between your own teeth. A complete denture replaces a full arch. Your dentist will explain what suits you.",
    },
    process: {
      heading: "What happens during treatment",
      intro: "Every mouth is different, so your own plan may vary. This is the general journey.",
      steps: [
        {
          title: "Consultation and examination",
          text: "Dr. Tripathi listens to your concerns, examines your teeth, gums and bite, and usually takes X-rays.",
        },
        {
          title: "Your plan",
          text: "You hear your options, what each involves, how long it may take and an estimate of cost. There is no pressure to decide on the day.",
        },
        {
          title: "Preparing your mouth",
          text: "If teeth need removing or your gums need treatment, this is done first, and the gums are given time to heal.",
          links: [{ label: "About gum health", href: "/treatments/gum-and-oral-health/" }],
        },
        // [CLINIC DETAIL REQUIRED] Laboratory arrangements, and how shade and tooth shape are chosen.
        {
          title: "Impressions and measurements",
          text: "Impressions of your gums and teeth are taken, and your bite is recorded, so the denture is made to fit you.",
        },
        {
          title: "Try-in and fitting",
          text: "You may try the denture before it is finished, so shape and fit can be checked. The final denture is then fitted, and you are shown how to put it in, take it out and clean it.",
        },
        {
          title: "Adjustments and review",
          text: "It is common for a new denture to need small adjustments. You return for check-ups, so any sore spots can be eased.",
        },
      ],
      footnote: "The number of visits depends on your case and is explained at your consultation.",
    },
    options: {
      heading: "Types of denture",
      items: [
        {
          title: "Partial dentures",
          what: "Replace some missing teeth, and attach to remaining teeth.",
          suits: "Someone with several teeth missing but healthy teeth remaining.",
          note: "Your remaining teeth need to be healthy, and need careful cleaning.",
        },
        {
          title: "Complete dentures",
          what: "Replace all the teeth in one or both jaws.",
          suits: "Someone with no teeth in that jaw.",
          note: "Rest on the gums, so gum shape matters.",
        },
        // [CONFIRM SERVICE AVAILABILITY] "Immediate dentures" and "Implant-supported dentures" cards are
        // omitted until confirmed. The site confirms removable partial and complete dentures only.
      ],
    },
    comparison: {
      heading: "Partial or complete dentures",
      columns: ["Partial denture", "Complete denture"],
      rows: [
        { label: "Replaces", values: ["Some missing teeth", "All teeth in the upper jaw, lower jaw or both"] },
        {
          label: "Your own teeth",
          values: ["Remain in place and may help hold it", "None remaining, so it rests on the gums"],
        },
        {
          label: "Held in place by",
          values: [
            "Clips or contact with your remaining teeth, and your gums",
            "Close fit to the gums, and suction in the upper jaw",
          ],
        },
        { label: "Removable", values: ["Yes", "Yes"] },
        {
          label: "Suits",
          values: ["People with some healthy teeth remaining", "People with no teeth, or teeth that cannot be saved"],
        },
      ],
      closing:
        "The right type depends on your remaining teeth, your gums and clinical assessment. Neither is better in every case.",
      aside: {
        text: "Dentures are removable. If you are comparing them with a bridge or an implant, the three are compared side by side on the dental implants page.",
        link: { label: "Dental implants", href: "/treatments/dental-implants/" },
      },
    },
    decides: {
      heading: "How your dentist decides",
      intro: "Your dentures are planned for you. Your dentist will look at:",
      items: [
        { title: "Your remaining teeth", text: "Which can be kept, and how healthy they are." },
        { title: "Your gums and bone", text: "Their shape and the support they give." },
        { title: "Your bite", text: "How your jaws meet, and how much space there is." },
        { title: "Your health", text: "Conditions or medicines that affect your mouth. Please tell us about any." },
        {
          title: "Your priorities",
          text: "Comfort, appearance, eating, cost and whether you would prefer a fixed option.",
        },
        { title: "Whether another option may suit you better", text: "Such as a bridge or implants." },
      ],
      closing: "If dentures are not the best answer, Dr. Tripathi will say so. You can take time to decide.",
    },
    comfort: {
      heading: "Getting used to your dentures",
      // [CLINIC DETAIL REQUIRED] Follow-up and adjustment arrangements, and whether adjustments are included.
      paragraphs: [
        "A new denture feels strange at first, and that is normal. Your mouth needs time to learn it.",
        "You may notice extra saliva, a feeling of fullness, and some difficulty with speaking and chewing. Sore spots can appear, and they can be eased with adjustments, so please do not put up with them.",
        "Many people find it helps to start with soft food cut into small pieces, chew on both sides together, and practise speaking aloud. Your dentist will give you advice, and every mouth adjusts at its own pace.",
      ],
      image: consultImage,
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      items: [
        {
          title: "Made to fit comfortably",
          text: "Comfort is the aim of every denture, and adjustments are part of the process.",
        },
        {
          title: "Listen first",
          text: "Dr. Tripathi starts by understanding what matters to you, including how you eat, speak and smile.",
        },
        { title: "Clear explanation", text: "You hear your options, including fixed ones, before you decide." },
        {
          title: "Open seven days",
          text: "Monday to Saturday until 8 PM, Sunday until 5 PM, which helps when adjustments are needed.",
        },
      ],
      equipmentNote: "",
    },
    doctorQuote: standardDoctorQuote,
    aftercare: {
      heading: "Caring for your dentures",
      intro: "Your dentist's instructions come first. This is general guidance.",
      items: [
        {
          title: "Clean them every day",
          text: "Brush your dentures gently, using a method your dentist recommends, and rinse them after meals. Hold them over a basin of water, in case they slip.",
        },
        {
          title: "Look after your mouth",
          text: "Clean your gums, tongue and any remaining teeth too. Plaque on remaining teeth causes decay and gum disease.",
        },
        {
          title: "Rest and storage",
          text: "Your dentist will tell you whether to remove them at night. Keep them in water or a cleaning solution when out, away from very hot water, which can warp them.",
        },
        {
          title: "Keep your reviews",
          text: "Gums and bone change shape over time, so dentures may need adjusting or replacing. Regular check-ups also include a look for any changes in your mouth.",
        },
      ],
      followUp: "A denture that no longer fits well can cause sores, so please do not wait.",
    },
    warning: {
      heading: "When should I contact my dentist?",
      intro: "Please call the clinic if you notice:",
      signs: [
        "a sore spot that does not improve within a few days",
        "a denture that is loose, cracked or broken",
        "difficulty eating, or the denture rubbing or moving",
        "a mouth ulcer, white or red patch or lump that has not healed within three weeks",
        "swelling, pus or bleeding from the gums",
      ],
      emergency: emergencyLine,
    },
    cost: {
      heading: "What affects the cost of dentures?",
      intro: "We do not publish fixed prices, because every denture is made for one mouth. The main factors are:",
      items: [
        { title: "The type", text: "Partial or complete, and whether one or both jaws." },
        { title: "How many teeth are replaced" },
        { title: "Materials", text: "Different materials differ in look, strength and cost." },
        { title: "Preparation", text: "Extractions or gum treatment needed first." },
        { title: "Visits", text: "Fittings, adjustments and reviews." },
        { title: "Future care", text: "Repairs, adjustments, relines or replacement over time." },
      ],
      closing: "After an examination, Dr. Tripathi will explain your options and give you an estimate before treatment begins.",
    },
    faqIntro: "Straight answers about dentures. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "How long does it take to get used to dentures?",
        answer:
          "It varies. Many people feel more comfortable within a few weeks, but chewing and speaking can take longer to feel natural. Sore spots are common at first and can be eased with adjustments, so please come back instead of waiting.",
      },
      // [CLINIC DETAIL REQUIRED] How shade and tooth shape are chosen.
      {
        question: "Will dentures look natural?",
        answer:
          "Dentures are made to fit your mouth, and the shape and shade of the teeth are chosen with you. No one can promise exactly how they will look, so Dr. Tripathi will discuss what is realistic before you begin.",
      },
      {
        question: "Can I eat normally with dentures?",
        answer:
          "Most people can eat a wide range of foods once they have adjusted, although chewing is generally less firm than with natural teeth. Start with soft food cut into small pieces, and chew on both sides at once. Your dentist will advise.",
      },
      {
        question: "Will my dentures fall out or move?",
        answer:
          "A well-fitted denture should feel stable, but some movement is possible, particularly lower dentures, because the lower jaw has less to hold on to. If a denture feels loose, tell us, as it may need adjusting.",
        link: { label: "About dental implants", href: "/treatments/dental-implants/" },
      },
      {
        question: "Can I sleep with my dentures in?",
        answer:
          "Many dentists advise taking them out at night, to rest the gums and keep them clean, but it depends on your mouth. Your dentist will tell you what is best for you.",
      },
      {
        question: "How long do dentures last?",
        answer:
          "There is no fixed lifespan. Gums and bone change shape over time, so dentures may need adjusting, relining or replacing. Regular check-ups let your dentist spot when this is needed.",
      },
      {
        question: "What is the difference between partial and complete dentures?",
        answer:
          "A partial denture fills gaps while you still have some natural teeth. A complete denture replaces all the teeth in a jaw. Which one you need depends on how many healthy teeth you have left.",
      },
      {
        question: "Are dentures or implants better?",
        answer:
          "Neither is better for everyone. Dentures are removable and usually a shorter process. Implants are fixed but need surgery, healing time and enough healthy bone. Dr. Tripathi will explain which suits you.",
        link: { label: "Compare on the dental implants page", href: "/treatments/dental-implants/" },
      },
      {
        question: "How much do dentures cost in Lucknow?",
        answer:
          "It depends on the type, how many teeth are replaced, the materials, any preparation such as extractions, and the number of visits. After an examination at our Aliganj clinic, you will be told the cost before you begin.",
      },
      appointmentFaq,
    ],
    related: [
      { slug: "dental-implants", text: "A fixed way to replace missing teeth." },
      { slug: "crowns-and-bridges", text: "A fixed bridge can fill a gap using nearby teeth." },
      { slug: "tooth-extraction", text: "Where teeth that cannot be saved are removed first." },
    ],
    cta: {
      heading: "Missing teeth? Let us talk through your options.",
      text: "Dentures are one of several ways to replace teeth, and the right one depends on you. Come in for an examination, and Dr. Tripathi will explain what could work and what to expect.",
    },
  },
  "teeth-whitening": {
    seo: {
      title: "Teeth Whitening in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Professional teeth whitening for stained or dull teeth, with realistic expectations. What to expect and what affects cost. Roots & Pulp, Aliganj, Lucknow.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION] Safety FAQ and sensitivity guidance need particular care.
    // [CLINIC DETAIL REQUIRED] Whitening product, session length and number, starting shade, maintenance or
    // take-home options, charges. [CONFIRM SERVICE AVAILABILITY] LED light used for every session ("may be used").
    // [VERIFY BEFORE PUBLISHING] Provenance and consent of teeth-whitening.webp (used on listing cards only).
    clinicallyReviewedOn: "",
    compact: true,
    hero: {
      eyebrow: "Cosmetic dentistry",
      heading: "Teeth Whitening in Lucknow",
      lede: "Brighten stained or dull teeth, with realistic expectations set from the start.",
      text: "Everyday habits like tea, coffee and tobacco, and the passing of time, can leave teeth looking dull or stained. Professional whitening can lighten them, and a short check beforehand helps make sure it is right for you. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi will explain what is realistic before you begin.",
      image: {
        src: "/images/equipment/teeth-whitening-light.jpg",
        alt: "LED teeth whitening lamp used for in-clinic whitening at Roots & Pulp",
      },
    },
    glance: [
      { title: "What it does", text: "Lightens the natural colour of your own teeth." },
      { title: "What it does not change", text: "The colour of fillings, crowns or veneers." },
      { title: "A check first", text: "Cavities and gum problems are treated before whitening." },
      { title: "Results", text: "Vary from person to person, and fade over time." },
    ],
    symptoms: {
      heading: "Why teeth lose their brightness",
      intro: "Teeth are rarely pure white, and most of us notice them darkening with time. Common reasons include:",
      items: [
        { icon: "temperature", title: "Tea and coffee", text: "Regular cups can stain the surface of the teeth over time." },
        {
          icon: "spots",
          title: "Tobacco and paan",
          text: "Smoking, chewing tobacco, gutka and paan are strong stainers.",
        },
        { icon: "shade", title: "Ageing", text: "The surface wears, and the layer underneath shows through as yellower." },
        {
          icon: "chew",
          title: "Certain foods and drinks",
          text: "Such as dark sauces, red wine and some fruits.",
        },
        {
          icon: "crack",
          title: "Other causes",
          text: "Some medicines, an injury to a tooth or developmental changes can darken teeth from the inside.",
        },
      ],
      note: "Stains have different causes, and not all of them respond to whitening in the same way. A quick examination shows what kind you have, and whether whitening is likely to help.",
      illustration: "whitening",
      caption: "Whitening lightens natural tooth colour. Fillings and crowns keep their original shade.",
    },
    process: {
      heading: "What happens during teeth whitening",
      intro: "Your own visit may differ slightly. This is the general journey.",
      steps: [
        {
          title: "Examination",
          text: "Dr. Tripathi looks at your teeth and gums, asks about any sensitivity and discusses what you would like to change.",
        },
        {
          title: "Treating anything else first",
          text: "Whitening is not done on teeth with untreated cavities or inflamed gums. If a clean or filling is needed, that comes first.",
          links: [{ label: "About teeth cleaning", href: "/treatments/teeth-cleaning/" }],
        },
        // [CLINIC DETAIL REQUIRED] Whether a starting shade is recorded, and how results are measured.
        {
          title: "Agreeing what is realistic",
          text: "You hear what whitening can and cannot do for your teeth, and what to expect. There is no pressure to go ahead.",
        },
        // [CLINIC DETAIL REQUIRED] Product, session length, number of sessions. No brand or percentage.
        {
          title: "The whitening session",
          text: "A whitening product is applied to your teeth, with your gums and lips protected. An LED light may be used during the session.",
        },
        {
          title: "Review and advice",
          text: "You see the result, and you are told how to look after your teeth afterwards, and how to keep the result for as long as possible.",
        },
      ],
      footnote: "Results and time vary from person to person. Your dentist will explain what to expect for you.",
    },
    twoLists: {
      heading: "What whitening can and cannot do",
      columns: [
        {
          title: "It can",
          items: [
            "lighten the natural colour of your own teeth",
            "reduce stains built up from drinks, food and tobacco",
            "help your teeth look brighter",
          ],
        },
        {
          title: "It cannot",
          items: [
            "change the colour of fillings, crowns or veneers",
            "remove every kind of stain, particularly deeper ones",
            "make teeth permanently white. Teeth can stain again, especially with the same habits",
          ],
        },
      ],
      closing:
        "Results vary, and no one can promise a particular shade. If whitening is not right for your teeth, Dr. Tripathi will tell you and suggest other options.",
      links: [{ label: "Cosmetic dentistry", href: "/treatments/cosmetic-dentistry/" }],
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      items: [
        {
          title: "Realistic expectations, set upfront",
          text: "You will hear what whitening can and cannot do for your teeth before you decide.",
        },
        {
          title: "A check first",
          text: "Diagnosis comes before treatment, so cavities and gum problems are dealt with before whitening.",
        },
        {
          title: "In-clinic LED whitening",
          text: "The clinic has an in-clinic LED whitening light, as seen in our gallery.",
        },
      ],
      equipmentNote: "",
    },
    aftercare: {
      heading: "What to expect afterwards",
      intro: "Your dentist's instructions always come first. This is general guidance.",
      items: [
        {
          title: "Sensitivity",
          text: "Teeth can feel sensitive to hot, cold or air for a short time. This usually settles. Tell us if it is strong or lasts.",
        },
        {
          title: "Staining foods and drinks",
          text: "For a short period after whitening, your teeth can pick up stain more easily. Your dentist will tell you what to avoid and for how long.",
        },
        {
          title: "Everyday care",
          text: "Brush twice a day and clean between your teeth. Regular professional cleans help keep your teeth looking their best.",
        },
        {
          title: "Making it last",
          text: "Stopping tobacco and cutting back on staining drinks helps. How long results last differs for everyone.",
        },
      ],
      callLine: "Please contact us if sensitivity is severe, your gums are sore or swollen, or you have pain that does not settle.",
    },
    cost: {
      heading: "What affects the cost of teeth whitening?",
      intro: "We do not publish fixed prices, because needs differ. The main factors are:",
      items: [
        { title: "The type of whitening, and how many sessions it takes" },
        { title: "How stained your teeth are" },
        { title: "Any cleaning or other treatment needed first" },
        { title: "Any follow-up or maintenance" },
      ],
      closing: "After a short examination, Dr. Tripathi will tell you what you need and what it will cost before you begin.",
    },
    faqIntro: "Straight answers about teeth whitening. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "Is teeth whitening safe?",
        answer:
          "When it is done properly, after an examination and under a dentist's supervision, it is generally considered safe. Whitening is not suitable for everyone, for example if you have untreated cavities or gum problems, so Dr. Tripathi will check your teeth first.",
      },
      {
        question: "Does teeth whitening cause sensitivity?",
        answer:
          "It can. Some people notice temporary sensitivity to hot, cold or air, which usually settles within a short time. Tell us if you are prone to sensitive teeth, as this can be taken into account.",
      },
      {
        question: "How long do the results last?",
        answer:
          "It varies. Teeth can stain again, especially with tea, coffee, tobacco and paan. Regular cleaning and cutting down on stains help results last longer. Your dentist will give advice for your own teeth.",
      },
      {
        question: "Will whitening work on crowns, fillings or veneers?",
        answer:
          "No. Whitening only changes the natural colour of your own teeth, so crowns, fillings and veneers stay the same. If one of them is visible, your dentist will discuss options, such as replacing it to match.",
        link: { label: "About tooth-coloured fillings", href: "/treatments/tooth-coloured-fillings/" },
      },
      {
        question: "How white will my teeth get?",
        answer:
          "It depends on the type and depth of the stains and the natural colour of your teeth. No one can promise a particular shade. Dr. Tripathi will explain what is realistic for you before you begin.",
      },
      {
        question: "Is whitening the same as teeth cleaning?",
        answer:
          "No. Cleaning removes plaque and tartar, and polishing removes some surface stains. Whitening changes the natural colour of the tooth. A clean is often done first.",
        link: { label: "About teeth cleaning", href: "/treatments/teeth-cleaning/" },
      },
      {
        question: "How much does teeth whitening cost in Lucknow?",
        answer:
          "It depends on the type of whitening, how many sessions are needed, how stained your teeth are, and any cleaning or treatment needed first. After a short examination at our Aliganj clinic, you will be told the cost before you begin.",
      },
    ],
    related: [
      { slug: "teeth-cleaning", text: "A clean surface comes first, and helps keep results." },
      { slug: "cosmetic-dentistry", text: "Options for chips, gaps and shape, as well as colour." },
      { slug: "tooth-coloured-fillings", text: "For old or stained fillings that whitening cannot change." },
    ],
    cta: {
      heading: "Thinking about whitening? Start with a check.",
      text: "A short examination shows whether whitening is right for your teeth, and what to expect. Dr. Tripathi will explain everything, with no pressure.",
    },
  },
};
