/**
 * Full content for individual treatment pages, keyed by treatment slug.
 * A slug without an entry here falls back to the short placeholder page.
 *
 * Copy follows the approved content package: no prices, no visit counts, no "painless"
 * claims, and equipment is described as used "where needed". Items marked
 * [CLINIC DETAIL REQUIRED] in the package are deliberately left out until confirmed.
 */

export type TreatmentLink = { label: string; href: string };

export type TreatmentCardItem = { title: string; text: string };

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

export type StageIllustration = "root-canal" | "implant" | "crown-bridge" | "braces" | "cosmetic" | "milk-teeth";

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
  };
  glance: TreatmentCardItem[];
  symptoms: {
    heading: string;
    intro: string;
    /** Items with a group are shown under that group's label, in order of first appearance. */
    /** An image, when given, is shown instead of the line icon. */
    items: (TreatmentCardItem & { icon: SymptomIcon; image?: string; group?: string; link?: TreatmentLink })[];
    note: string;
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
    footnote: string;
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
  decides: {
    heading: string;
    intro: string;
    items: TreatmentCardItem[];
    closing: string;
  };
  comfort: {
    heading: string;
    paragraphs: string[];
    tips?: { heading: string; items: string[] };
    image: { src: string; alt: string; width: number; height: number };
  };
  why: {
    heading: string;
    items: TreatmentCardItem[];
    equipment: { src: string; alt: string; caption: string; detail?: string; position?: string }[];
    equipmentNote: string;
    /** Defaults to "See more in the gallery", linking to the gallery's equipment section. */
    galleryLink?: TreatmentLink;
  };
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
    followUp: string;
  };
  warning: {
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

const consultationStrip = [
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
];

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
      { slug: "emergency-dental-care", text: "For severe pain or swelling, call first." },
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
        link: { label: "Emergency dental care", href: "/treatments/emergency-dental-care/" },
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
      { slug: "emergency-dental-care", text: "For a knocked tooth, swelling or severe pain." },
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
  "teeth-cleaning": {
    seo: {
      title: "Teeth Cleaning in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Professional teeth cleaning to remove plaque and tartar that brushing misses, and help keep gums healthy. Roots & Pulp Dental Clinic, Aliganj, Lucknow.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION]
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Everyday & preventive care",
      heading: "Teeth Cleaning in Aliganj, Lucknow",
      lede: "Removes the plaque and tartar that brushing misses, to help keep your gums healthy.",
      text: "Even with careful brushing, hard deposits called tartar can build up where a toothbrush cannot reach. A professional cleaning removes them and gives your dentist a chance to check your teeth and gums. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi examines first and explains what he finds.",
    },
    glance: [
      { title: "What it is", text: "Professional removal of plaque and tartar from the teeth, above and around the gum line." },
      { title: "Main goal", text: "Help keep gums healthy and make daily cleaning more effective." },
      { title: "Planning", text: "Starts with a look at your teeth and gums, so your dentist can advise what you need." },
      { title: "Comfort", text: "Most people feel vibration and pressure. Tell your dentist if any area is sensitive." },
      { title: "Afterwards", text: "Advice on brushing and cleaning between teeth, and when to return." },
    ],
    symptoms: {
      heading: "When might a cleaning help?",
      intro: "These are common reasons people book a professional cleaning.",
      items: [
        { icon: "swelling", title: "Gums that bleed when brushing", text: "Bleeding can be an early sign of gum inflammation." },
        { icon: "spots", title: "Hard deposits on the teeth", text: "Yellow or brown build-up near the gum line that brushing does not remove." },
        { icon: "shade", title: "Surface stains", text: "Staining from tea, coffee or tobacco on the tooth surface." },
        { icon: "brush", title: "Areas that are hard to clean", text: "Crowded teeth, braces or restorations can trap plaque." },
        { icon: "sparkle", title: "A routine check is due", text: "A regular visit to keep problems small and easy to deal with." },
        { icon: "chew", title: "Bad breath that lingers", text: "Plaque and tartar can contribute to persistent bad breath." },
      ],
      note: "These signs can have different causes. An examination helps find out what is happening and whether a cleaning, gum treatment or something else is appropriate.",
    },
    explainer: {
      heading: "What is a professional teeth cleaning?",
      paragraphs: [
        "Plaque is a soft, sticky film of bacteria that forms on teeth every day. If it is not removed, it can harden into tartar, also called calculus, which a toothbrush cannot remove.",
        "During a cleaning, tartar and plaque are removed from the tooth surfaces and around the gum line, and the teeth are usually polished. This is sometimes called scaling and polishing.",
        "A cleaning does not replace brushing at home. It resets the starting point, so your daily routine can keep things healthy.",
      ],
    },
    process: {
      heading: "What happens during a cleaning",
      intro: "Every mouth is different, so your visit may vary. This is the general journey.",
      steps: [
        {
          title: "Check-up first",
          text: "Dr. Tripathi asks about any concerns and examines your teeth and gums. An X-ray is taken only if it is needed.",
        },
        {
          title: "Removing tartar",
          text: "Hard deposits are removed from the teeth and around the gum line.",
        },
        { title: "Polishing", text: "The teeth are usually polished to remove surface stains and leave them smooth." },
        {
          title: "Advice for home",
          text: "You hear how to brush and clean between your teeth, and when to come back.",
          links: [{ label: "About gum health", href: "/treatments/gum-and-oral-health/" }],
        },
      ],
      footnote: "If your gums need more than a routine cleaning, Dr. Tripathi will explain why and what is involved.",
    },
    decides: {
      heading: "How your dentist plans your cleaning",
      intro: "Your dentist will look at:",
      items: [
        { title: "Your gums", text: "Any bleeding, swelling or signs of gum disease." },
        { title: "How much build-up there is", text: "Which affects how long the cleaning takes." },
        { title: "Your teeth", text: "Any decay, worn areas or restorations to keep an eye on." },
        { title: "Your routine", text: "How you clean at home, and what could make it easier." },
        { title: "Your health", text: "Some conditions and medicines affect the gums." },
      ],
      closing: "If nothing more is needed, Dr. Tripathi will say so.",
    },
    comfort: {
      heading: "Feeling comfortable",
      paragraphs: [
        "Most people find a cleaning straightforward. You may feel vibration, pressure or a scraping sensation, and some areas can feel sensitive.",
        "Tell Dr. Tripathi if anything is uncomfortable, and he can pause. Questions are always welcome.",
      ],
      image: consultImage,
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      items: whyCore,
      equipment: consultationStrip,
      equipmentNote: "Your visit starts with a conversation.",
      galleryLink: { label: "See the clinic in the gallery", href: "/gallery/" },
    },
    doctorQuote: standardDoctorQuote,
    aftercare: {
      heading: "Afterwards",
      intro: "Your dentist's instructions always come first. This is general guidance.",
      items: [
        { title: "Straight after", text: "Teeth may feel smoother, and gums can feel a little tender for a short time." },
        { title: "Sensitivity", text: "Some people notice mild sensitivity for a few days. Tell your dentist if it does not settle." },
        { title: "Daily cleaning", text: "Brush twice a day and clean between your teeth, as your dentist shows you." },
        { title: "Next visit", text: "Your dentist will say how often you should return. It varies from person to person." },
      ],
      followUp: "Regular cleanings work best alongside a good routine at home.",
    },
    warning: {
      heading: "When should I contact my dentist?",
      intro: "Please call the clinic if you notice:",
      signs: [
        "gums that keep bleeding or are getting more swollen",
        "pain that is getting worse",
        "swelling of the gum or face",
        "a tooth that feels loose",
        "sensitivity that is strong or does not settle",
      ],
      emergency: emergencyLine,
    },
    cost: {
      heading: "What affects the cost of a cleaning?",
      intro: "We do not publish a fixed price, because needs vary. The main factors are:",
      items: [
        { title: "How much build-up there is", text: "Heavier tartar takes longer to remove." },
        { title: "The health of your gums", text: "Gum disease may need more than a routine cleaning." },
        { title: "X-rays", text: "Taken only if needed." },
        { title: "Follow-up", text: "Whether further visits are recommended." },
      ],
      // [CLINIC DETAIL REQUIRED] Whether the consultation is charged separately.
      closing: "After an examination, Dr. Tripathi will explain what you need and give you an estimate first.",
    },
    faqIntro: "Straight answers about teeth cleaning. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "Does a professional cleaning hurt?",
        answer:
          "Most people feel vibration and pressure rather than pain. Some areas can feel sensitive, especially if the gums are inflamed. Tell Dr. Tripathi and he can pause or adjust.",
      },
      {
        question: "How often should I have my teeth cleaned?",
        answer:
          "It varies. Some people need cleaning more often than others, depending on their gums, how quickly tartar builds up and their routine at home. Your dentist will advise what suits you.",
      },
      {
        question: "Will a cleaning make my teeth whiter?",
        answer:
          "It can remove surface stains, so teeth may look brighter, but it does not change the natural colour of teeth. Whitening is a separate treatment.",
        link: { label: "About teeth whitening", href: "/treatments/teeth-whitening/" },
      },
      {
        question: "My gums bleed when I brush. Should I stop brushing there?",
        answer:
          "No. Bleeding is often a sign of gum inflammation, and gentle, thorough cleaning usually helps. Have your gums checked so the cause can be found.",
        link: { label: "About gum health", href: "/treatments/gum-and-oral-health/" },
      },
      {
        question: "How much does teeth cleaning cost in Lucknow?",
        answer:
          "It depends on how much build-up there is, the health of your gums and whether X-rays are needed. After an examination at our Aliganj clinic, you will get an estimate before treatment begins.",
      },
      appointmentFaq,
    ],
    related: [
      { slug: "gum-and-oral-health", text: "When gums need more than a routine cleaning." },
      { slug: "tooth-coloured-fillings", text: "Repairing cavities found at a check-up." },
      { slug: "childrens-dentistry", text: "Checkups and prevention for growing teeth." },
    ],
    cta: {
      heading: "Due for a cleaning?",
      text: "Book a visit, and Dr. Tripathi will check your teeth and gums and explain what, if anything, they need.",
    },
  },
  "tooth-coloured-fillings": {
    seo: {
      title: "Tooth-Coloured Fillings in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Repair cavities with tooth-coloured fillings matched to your natural teeth. What to expect, aftercare and cost factors. Roots & Pulp, Aliganj, Lucknow.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION] [CLINIC DETAIL REQUIRED] Filling materials used.
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Everyday & preventive care",
      heading: "Tooth-Coloured Fillings in Aliganj, Lucknow",
      lede: "Repair cavities with fillings matched to your natural teeth.",
      text: "A filling repairs a tooth that has been damaged by decay or a small break, so it can work normally again. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi examines the tooth first, shows you what he finds and explains your options.",
    },
    glance: [
      { title: "What it treats", text: "Cavities from decay, and small chips or worn areas." },
      { title: "Main goal", text: "Remove decay, restore the tooth's shape and stop the damage spreading." },
      { title: "Appearance", text: "Tooth-coloured material is matched as closely as possible to your teeth." },
      { title: "Comfort", text: "The area is usually numbed when needed. Your dentist will explain." },
      { title: "Afterwards", text: "Good cleaning and check-ups help the filling and tooth last." },
    ],
    symptoms: {
      heading: "When might you need a filling?",
      intro: "These are common reasons people ask a dentist about a filling.",
      items: [
        { icon: "spots", title: "A dark spot or small hole", text: "Visible marks or holes that can be signs of decay." },
        { icon: "temperature", title: "Sensitivity to sweet, hot or cold", text: "A twinge that comes and goes when eating or drinking." },
        { icon: "crack", title: "A chipped or broken edge", text: "A small piece of tooth that has broken off." },
        { icon: "bite", title: "Food catching in one place", text: "A rough area or gap where food keeps getting stuck." },
        { icon: "filling", title: "An old filling that has worn", text: "A filling that is cracked, leaking or coming loose." },
        { icon: "sparkle", title: "Found at a check-up", text: "Early decay can be found before it causes any pain." },
      ],
      note: "These signs can have different causes. An examination, and sometimes an X-ray, shows whether a filling or another treatment is appropriate.",
    },
    explainer: {
      heading: "What is a tooth-coloured filling?",
      paragraphs: [
        "When decay damages a tooth, it leaves a weak or hollow area called a cavity. Left alone, decay can grow deeper toward the inside of the tooth.",
        "A filling removes the decayed part and rebuilds the tooth with a tooth-coloured material, shaped to fit your bite.",
        "Small cavities are usually simpler to repair. If decay has reached the inside of the tooth, a different treatment may be needed.",
      ],
    },
    process: {
      heading: "What happens during a filling",
      intro: "Every tooth is different, so your own plan may vary. This is the general journey.",
      steps: [
        {
          title: "Examination",
          text: "Dr. Tripathi examines the tooth and may take an X-ray. An intraoral camera can show you the area on screen.",
        },
        { title: "Numbing, if needed", text: "The area is numbed so you are comfortable." },
        { title: "Removing decay", text: "The decayed part of the tooth is removed and the area is prepared." },
        { title: "Filling and shaping", text: "Tooth-coloured material is placed, shaped and set, then your bite is checked." },
      ],
      footnote: "If the damage is larger, Dr. Tripathi will explain other options, such as an inlay, onlay or crown.",
    },
    decides: {
      heading: "How your dentist decides",
      intro: "Your dentist will look at:",
      items: [
        { title: "How deep the decay is", text: "And whether it is close to the inside of the tooth." },
        { title: "How much tooth remains", text: "Which decides whether a filling is strong enough." },
        { title: "Where the tooth is", text: "Front and back teeth take different forces." },
        { title: "Your bite", text: "How the tooth meets the teeth opposite." },
        { title: "Existing fillings", text: "Whether old fillings need replacing or can stay." },
      ],
      closing: "Old fillings are replaced only if they need to be. Dr. Tripathi will tell you if something can wait.",
    },
    comfort: {
      heading: "Feeling comfortable",
      paragraphs: [
        "The area is numbed when needed, so you should not feel sharp pain. You may feel pressure or vibration.",
        "Tell Dr. Tripathi if anything is uncomfortable, and he can pause. You can ask to see the tooth on screen before and after.",
      ],
      image: consultImage,
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      items: [
        ...whyCore.slice(0, 2),
        { title: "See what he sees", text: "An intraoral camera lets you view your own teeth on screen with your dentist." },
        ...whyCore.slice(2),
      ],
      equipment: [
        {
          src: "/images/equipment/intraoral-camera-cavities.jpg",
          alt: "Intraoral camera screen showing cavities in the grooves of back teeth",
          caption: "Intraoral Camera",
          detail: "See cavities on screen with your dentist",
        },
        {
          src: "/images/equipment/digital-xray-rvg.jpg",
          alt: "Digital dental X-ray shown on the clinic laptop",
          caption: "Digital X-ray (RVG)",
          detail: "Instant X-rays on screen",
          position: "center 30%",
        },
        consultationStrip[0],
      ],
      equipmentNote: "Examination at Roots & Pulp.",
    },
    doctorQuote: standardDoctorQuote,
    aftercare: {
      heading: "Afterwards",
      intro: "Your dentist's instructions always come first. This is general guidance.",
      items: [
        { title: "Straight after", text: "If you were numbed, avoid chewing on that side until feeling returns." },
        { title: "The first days", text: "Mild sensitivity can happen and usually settles. Tell your dentist if it does not." },
        { title: "Your bite", text: "If the tooth feels high when you bite, ask for it to be adjusted." },
        { title: "Long term", text: "Brush, clean between teeth and keep up check-ups. Decay can start again at the edges." },
      ],
      followUp: "Early repair of small cavities is usually simpler than waiting.",
    },
    warning: {
      heading: "When should I contact my dentist?",
      intro: "Please call the clinic if you notice:",
      signs: [
        "pain that is getting worse, or that wakes you",
        "sensitivity that is strong or does not settle",
        "a filling that has cracked or come out",
        "a bite that feels too high",
        "swelling of the gum or face",
      ],
      emergency: emergencyLine,
    },
    cost: {
      heading: "What affects the cost of a filling?",
      intro: "We do not publish a fixed price, because it depends on your tooth. The main factors are:",
      items: [
        { title: "The size of the cavity", text: "Larger repairs take more time and material." },
        { title: "How many teeth", text: "One filling or several." },
        { title: "The material", text: "Materials differ in strength, look and cost." },
        { title: "Imaging", text: "X-rays needed to plan the work." },
      ],
      closing: "After an examination, Dr. Tripathi will explain your options and give you an estimate first.",
    },
    faqIntro: "Straight answers about fillings. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "Does getting a filling hurt?",
        answer:
          "The area is numbed when needed, so most people feel pressure rather than pain. Some sensitivity afterwards is common and usually settles.",
      },
      {
        question: "Can tooth-coloured fillings be used on back teeth?",
        answer:
          "Often, yes, depending on the size of the cavity and your bite. If a filling would not be strong enough, your dentist will explain other options.",
        link: { label: "About crowns & bridges", href: "/treatments/crowns-and-bridges/" },
      },
      {
        question: "Should I replace my old silver fillings?",
        answer:
          "Not automatically. A filling that is sound may not need replacing. Your dentist will check them and tell you if any need attention.",
      },
      {
        question: "What if the decay is deep?",
        answer:
          "If decay has reached the inside of the tooth, a filling alone may not be enough. Dr. Tripathi will explain the options, which can include root canal treatment.",
        link: { label: "About root canal treatment", href: "/treatments/root-canal-treatment/" },
      },
      {
        question: "How much does a filling cost in Lucknow?",
        answer:
          "It depends on the size of the cavity, the number of teeth and the material. After an examination at our Aliganj clinic, you will get an estimate before treatment begins.",
      },
      appointmentFaq,
    ],
    related: [
      { slug: "root-canal-treatment", text: "When decay has reached the inside of the tooth." },
      { slug: "crowns-and-bridges", text: "For teeth with more damage than a filling can repair." },
      { slug: "teeth-cleaning", text: "Prevention, to help stop new cavities forming." },
    ],
    cta: {
      heading: "Think you might need a filling?",
      text: "Small problems are easier to fix early. Book a check-up, and Dr. Tripathi will show you what he finds and explain the options.",
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
  "gum-and-oral-health": {
    seo: {
      title: "Gum Treatment & Oral Health in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Care for bleeding or receding gums, plus oral cancer screening. Signs to watch for, what to expect and aftercare. Roots & Pulp, Aliganj, Lucknow.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION]
    // [CLINIC DETAIL REQUIRED] Gum treatments offered (deep cleaning, gum surgery) and how screening is done.
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Everyday & preventive care",
      heading: "Gum Treatment & Oral Health in Aliganj, Lucknow",
      lede: "Care for bleeding or receding gums, plus oral cancer screening.",
      text: "Healthy gums hold your teeth in place. Gum problems often start quietly, so a check can catch them early. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi, whose public health training shapes a focus on prevention, examines your gums and mouth and explains what he finds.",
    },
    glance: [
      { title: "What it covers", text: "Bleeding, swollen or receding gums, and checks of the soft tissues of the mouth." },
      { title: "Main goal", text: "Find problems early and keep gums healthy enough to support your teeth." },
      { title: "Planning", text: "Starts with an examination of your gums, and X-rays if needed." },
      { title: "Screening", text: "A look at the soft tissues of the mouth for anything unusual." },
      { title: "At home", text: "Daily cleaning makes the biggest difference. We will show you how." },
    ],
    symptoms: {
      heading: "Signs worth having checked",
      intro: "These are common reasons people ask a dentist about their gums or mouth.",
      items: [
        { icon: "swelling", title: "Bleeding gums", text: "Bleeding when brushing or cleaning between teeth." },
        { icon: "uneven", title: "Receding gums", text: "Teeth that look longer, or gums that have pulled back." },
        { icon: "chew", title: "Bad breath that lingers", text: "Persistent bad breath or a bad taste." },
        { icon: "bite", title: "Loose or moving teeth", text: "Teeth that feel loose or have shifted." },
        { icon: "temperature", title: "Sensitive teeth near the gum", text: "Sensitivity where the root surface is exposed." },
        { icon: "spots", title: "A patch or sore that does not heal", text: "A white or red patch, lump or ulcer in the mouth." },
      ],
      note: "These signs can have many causes, and most are not serious. An examination helps find out what is happening and what, if anything, is needed.",
    },
    explainer: {
      heading: "Why do gums matter?",
      paragraphs: [
        "When plaque stays on the teeth, the gums can become inflamed. This is called gingivitis, and it often shows as redness or bleeding. It can usually be reversed with professional cleaning and good daily care.",
        "If inflammation continues, it can affect the deeper tissues and bone that support the teeth. This is called periodontitis, and over time it can loosen teeth.",
        "An oral examination also includes a look at the soft tissues of the mouth, so anything unusual can be noticed early and followed up.",
      ],
    },
    process: {
      heading: "What happens at a gum check",
      intro: "Every mouth is different, so your own plan may vary. This is the general journey.",
      steps: [
        {
          title: "Listening and examination",
          text: "Dr. Tripathi asks about your concerns and health, then examines your gums, teeth and the soft tissues of the mouth.",
        },
        { title: "X-rays, if needed", text: "X-rays can show the bone around the teeth." },
        {
          title: "Cleaning",
          text: "Plaque and tartar are removed. Some gums need deeper cleaning, which your dentist will explain.",
          links: [{ label: "About teeth cleaning", href: "/treatments/teeth-cleaning/" }],
        },
        { title: "Your plan", text: "You hear what was found, what is needed and how to care for your gums at home." },
        { title: "Review", text: "A follow-up visit checks how your gums are responding." },
      ],
      footnote: "If anything needs further investigation, Dr. Tripathi will explain why and what the next step is.",
    },
    decides: {
      heading: "How your dentist plans your care",
      intro: "Your dentist will look at:",
      items: [
        { title: "Your gums", text: "Bleeding, swelling and how firmly they hold the teeth." },
        { title: "The bone", text: "What X-rays show around the roots, if they are needed." },
        { title: "Your routine", text: "How you clean at home, and what could make it easier." },
        { title: "Your health", text: "Conditions such as diabetes, and habits such as smoking, affect the gums." },
        { title: "Your history", text: "Past gum problems and dental treatment." },
      ],
      closing: "Gum care works best as a partnership. Your dentist will explain what you can do between visits.",
    },
    comfort: {
      heading: "Feeling comfortable",
      paragraphs: [
        "A gum check is usually quick and gentle. If your gums are inflamed, cleaning can feel tender, and the area can be numbed if needed.",
        "Tell Dr. Tripathi if anything is uncomfortable, and he can pause. Questions are always welcome.",
      ],
      image: consultImage,
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      items: whyCore,
      equipment: consultationStrip,
      equipmentNote: "Your visit starts with a conversation.",
      galleryLink: { label: "See the clinic in the gallery", href: "/gallery/" },
    },
    doctorQuote: standardDoctorQuote,
    aftercare: {
      heading: "Looking after your gums",
      intro: "Your dentist's instructions always come first. This is general guidance.",
      items: [
        { title: "Brushing", text: "Brush twice a day, gently, along the gum line." },
        { title: "Between the teeth", text: "Clean between your teeth daily, as your dentist shows you." },
        { title: "After a cleaning", text: "Gums can feel tender or bleed a little at first. This usually settles." },
        { title: "Regular visits", text: "Keep your review appointments, so changes are noticed early." },
      ],
      followUp: "If you smoke, stopping helps your gums heal. Ask if you would like advice.",
    },
    warning: {
      heading: "When should I contact my dentist?",
      intro: "Please call the clinic if you notice:",
      signs: [
        "swelling of the gum or face",
        "a tooth that has become loose",
        "pus or a bad taste near a tooth",
        "a sore, patch or lump that has not healed in about two weeks",
        "bleeding that does not settle",
      ],
      emergency: emergencyLine,
    },
    cost: {
      heading: "What affects the cost of gum care?",
      intro: "We do not publish fixed prices, because needs vary. The main factors are:",
      items: [
        { title: "How much treatment is needed", text: "A routine cleaning differs from deeper gum care." },
        { title: "How many areas", text: "One area of the mouth or several." },
        { title: "X-rays", text: "Taken only if needed." },
        { title: "Follow-up", text: "Review visits to check healing." },
      ],
      closing: "After an examination, Dr. Tripathi will explain what you need and give you an estimate first.",
    },
    faqIntro: "Straight answers about gum health. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "Why do my gums bleed when I brush?",
        answer:
          "Bleeding is often a sign of gum inflammation caused by plaque. It can usually improve with professional cleaning and good daily care, but it is worth having checked.",
      },
      {
        question: "Can gum disease be reversed?",
        answer:
          "Early gum inflammation can usually be reversed. More advanced gum disease can often be controlled, though some changes may not fully reverse. Your dentist will explain what applies to you.",
      },
      {
        question: "What is an oral cancer screening?",
        answer:
          "It is a look at the soft tissues of your mouth, tongue and throat area for anything unusual, done as part of an examination. If anything needs further checks, Dr. Tripathi will explain the next step.",
      },
      {
        question: "Does smoking affect my gums?",
        answer:
          "Yes. Smoking is linked to gum disease and can slow healing. It can also hide bleeding, so problems may be noticed later.",
      },
      {
        question: "How much does gum treatment cost in Lucknow?",
        answer:
          "It depends on how much treatment is needed, how many areas are involved and any X-rays. After an examination at our Aliganj clinic, you will get an estimate before treatment begins.",
      },
      appointmentFaq,
    ],
    related: [
      { slug: "teeth-cleaning", text: "Professional removal of plaque and tartar." },
      { slug: "tooth-extraction", text: "When a tooth has lost too much support to stay." },
      { slug: "dental-implants", text: "Replacing a missing tooth, once gums are healthy." },
    ],
    cta: {
      heading: "Noticed bleeding or receding gums?",
      text: "Gum problems are easier to manage early. Book a check, and Dr. Tripathi will explain what he finds and what helps.",
    },
  },
  dentures: {
    seo: {
      title: "Dentures in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Removable partial or complete dentures, made to fit comfortably. What to expect, getting used to them and aftercare. Roots & Pulp Dental Clinic, Aliganj, Lucknow.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION] [CLINIC DETAIL REQUIRED] Denture materials and laboratory.
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Replacing missing teeth",
      heading: "Dentures in Aliganj, Lucknow",
      lede: "Removable partial or complete dentures, made to fit comfortably.",
      text: "Dentures replace missing teeth with a removable appliance, so you can eat and smile with more confidence. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi will examine your mouth, explain your options and help you through the adjustment period.",
    },
    glance: [
      { title: "What they replace", text: "A few missing teeth, or a full set in the upper or lower jaw." },
      { title: "Two main types", text: "Partial dentures, and complete dentures for when all teeth in a jaw are missing." },
      { title: "Planning", text: "Starts with an examination of your gums and any remaining teeth." },
      { title: "Fitting", text: "Usually takes more than one visit, so the denture can be made to fit you." },
      { title: "Getting used to them", text: "Takes some time. Adjustments are part of the process." },
    ],
    symptoms: {
      heading: "Could dentures be relevant to you?",
      intro: "These are common reasons people ask a dentist about dentures.",
      items: [
        { icon: "gaps", title: "Several missing teeth", text: "Gaps that make eating or speaking harder." },
        { icon: "lost", title: "All teeth missing in one jaw", text: "A complete denture can replace a full set." },
        { icon: "denture", title: "An old denture that no longer fits", text: "Dentures can loosen as the gums and bone change." },
        { icon: "chew", title: "Difficulty chewing", text: "Missing teeth can make some foods hard to eat." },
        { icon: "adult", title: "Wanting a removable option", text: "Some people prefer a denture they can take out." },
        { icon: "drift", title: "Teeth drifting into gaps", text: "A partial denture can help hold the space." },
      ],
      note: "Everyone's situation is different. An examination helps find out whether dentures, or another option such as an implant or bridge, would suit you.",
    },
    explainer: {
      heading: "What are dentures?",
      paragraphs: [
        "A denture is a removable replacement for missing teeth. False teeth are set into a base that rests on the gums.",
        "A partial denture fills gaps when some natural teeth remain, and often clips onto them. A complete denture replaces all the teeth in the upper or lower jaw.",
        "Dentures are made to fit your mouth, but they feel different from natural teeth at first. Most people need some time and a few adjustments to settle in.",
      ],
    },
    process: {
      heading: "What the process can look like",
      intro: "Every case is different, and your own plan may vary. This is the general journey.",
      steps: [
        { title: "Examination", text: "Dr. Tripathi examines your gums and any remaining teeth, and may take X-rays." },
        {
          title: "Your plan",
          text: "You hear your options, what each involves and an estimate of cost. There is no pressure to decide on the day.",
        },
        // [CLINIC DETAIL REQUIRED] Impression method and laboratory arrangements.
        { title: "Impressions", text: "Moulds of your mouth are taken so the denture can be made to fit." },
        { title: "Try-in and fitting", text: "The denture is checked for fit, bite and appearance before it is finished." },
        { title: "Adjustments", text: "Small adjustments in the following weeks help it settle comfortably." },
      ],
      footnote: "The number of visits depends on your case and is explained at your consultation.",
    },
    comparison: {
      heading: "Denture, bridge or implant?",
      layout: "table",
      columns: ["Denture", "Bridge", "Implant"],
      rows: [
        {
          label: "How it works",
          values: [
            "A removable set that rests on the gums",
            "A replacement tooth held by crowns on the teeth either side",
            "A post in the jawbone supports a crown",
          ],
        },
        { label: "Removable", values: ["Yes", "No", "No"] },
        { label: "Surgery", values: ["No", "No", "Yes, a minor surgical step"] },
        {
          label: "Suits",
          values: [
            "Many missing teeth, or when surgery is not suitable",
            "Healthy teeth either side of the gap",
            "Enough healthy bone and gums",
          ],
        },
      ],
      closing: "The right option depends on your oral health, priorities and clinical assessment. No option is best for everyone.",
      links: [
        { label: "Dental implants", href: "/treatments/dental-implants/" },
        { label: "Crowns & bridges", href: "/treatments/crowns-and-bridges/" },
      ],
    },
    decides: {
      heading: "How your dentist decides",
      intro: "Your dentist will look at:",
      items: [
        { title: "Your remaining teeth", text: "How many there are, and how healthy they are." },
        { title: "Your gums and bone", text: "The shape and health of the ridges the denture rests on." },
        { title: "Your bite", text: "How the upper and lower jaws meet." },
        { title: "Your health", text: "Conditions such as a dry mouth affect how dentures feel." },
        { title: "Your priorities", text: "Comfort, appearance, cost and whether you prefer a removable option." },
      ],
      closing: "If another option would suit you better, Dr. Tripathi will explain why. You can take time to decide.",
    },
    comfort: {
      heading: "Getting used to dentures",
      paragraphs: [
        "New dentures can feel bulky, and speaking and eating may feel different at first. This is common and usually improves with practice.",
        "Sore spots can happen in the first weeks. Tell your dentist rather than waiting, as small adjustments usually help.",
      ],
      image: consultImage,
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      items: whyCore,
      equipment: consultationStrip,
      equipmentNote: "Your visit starts with a conversation.",
      galleryLink: { label: "See the clinic in the gallery", href: "/gallery/" },
    },
    doctorQuote: standardDoctorQuote,
    aftercare: {
      heading: "Caring for your dentures",
      intro: "Your dentist's instructions always come first. This is general guidance.",
      items: [
        { title: "Daily cleaning", text: "Clean your dentures every day as your dentist shows you, and rinse after eating." },
        { title: "At night", text: "Many people are advised to take dentures out at night. Ask what suits you." },
        { title: "Your mouth", text: "Clean your gums, tongue and any natural teeth too." },
        { title: "Check-ups", text: "Gums change over time, so dentures may need adjusting or relining." },
      ],
      followUp: "Do not try to adjust a denture yourself. A small professional adjustment is safer.",
    },
    warning: {
      heading: "When should I contact my dentist?",
      intro: "Please call the clinic if you notice:",
      signs: [
        "a sore spot that does not heal",
        "a denture that is cracked, broken or has lost a tooth",
        "a denture that has become loose or uncomfortable",
        "swelling of the gums",
        "a patch or ulcer in the mouth that does not heal in about two weeks",
      ],
      emergency: emergencyLine,
    },
    cost: {
      heading: "What affects the cost of dentures?",
      intro: "We do not publish fixed prices, because needs vary. The main factors are:",
      items: [
        { title: "Partial or complete", text: "How many teeth the denture replaces." },
        { title: "One jaw or both", text: "Upper, lower or both." },
        { title: "The material", text: "Materials differ in strength, look and cost." },
        { title: "Preparation", text: "Any extractions or gum care needed first." },
        { title: "Adjustments", text: "Follow-up visits to help the denture settle." },
      ],
      closing: "After an examination, Dr. Tripathi will explain your options and give you an estimate first.",
    },
    faqIntro: "Straight answers about dentures. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "How long does it take to get used to dentures?",
        answer:
          "It varies. Many people find the first weeks the hardest, and things improve with practice and small adjustments. Your dentist will help you through it.",
      },
      {
        question: "Can I eat normally with dentures?",
        answer:
          "Most people can eat a wide range of food, though it takes practice. Start with soft food cut into small pieces, and build up gradually.",
      },
      {
        question: "Should I sleep with my dentures in?",
        answer:
          "Many people are advised to take them out at night to rest the gums, but follow the advice your dentist gives for you.",
      },
      {
        question: "Can dentures be held in place by implants?",
        answer:
          "In some cases, yes. Implant-supported dentures are a different treatment, and your dentist can explain whether they may suit you.",
        link: { label: "About dental implants", href: "/treatments/dental-implants/" },
      },
      {
        question: "How much do dentures cost in Lucknow?",
        answer:
          "It depends on whether you need a partial or complete denture, one jaw or both, the material and any preparation. After an examination at our Aliganj clinic, you will get an estimate before treatment begins.",
      },
      appointmentFaq,
    ],
    related: [
      { slug: "dental-implants", text: "A fixed alternative, including implant-supported dentures." },
      { slug: "crowns-and-bridges", text: "A fixed way to fill a gap using the teeth beside it." },
      { slug: "tooth-extraction", text: "When teeth that cannot be saved are removed first." },
    ],
    cta: {
      heading: "Missing several teeth?",
      text: "There is more than one way to replace them. Come in for an examination, and Dr. Tripathi will explain what could work for you.",
    },
  },
  "teeth-whitening": {
    seo: {
      title: "Teeth Whitening in Aliganj, Lucknow · Roots & Pulp",
      description:
        "In-clinic teeth whitening for stained or dull teeth, with realistic expectations set upfront. Who it suits, what to expect and aftercare. Roots & Pulp, Aliganj.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION]
    // [CLINIC DETAIL REQUIRED] Whitening system, whether take-home trays are offered, and session details.
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Cosmetic dentistry",
      heading: "Teeth Whitening in Aliganj, Lucknow",
      lede: "Brighten stained or dull teeth, with realistic expectations set upfront.",
      text: "Teeth naturally darken with age, and tea, coffee and tobacco can stain them. Whitening lightens the natural colour of your teeth. At Roots & Pulp in Aliganj, Dr. Shubham Tripathi checks your teeth and gums first and explains what result is realistic for you.",
    },
    glance: [
      { title: "What it does", text: "Lightens the natural colour of teeth." },
      { title: "What it does not change", text: "The colour of fillings, crowns or other restorations." },
      { title: "Health first", text: "Decay and gum problems are treated before whitening." },
      { title: "In the clinic", text: "In-clinic whitening uses an LED whitening light." },
      { title: "Results", text: "Vary from person to person, and fade over time." },
    ],
    symptoms: {
      heading: "Could whitening be relevant to you?",
      intro: "These are common reasons people ask a dentist about whitening.",
      items: [
        { icon: "shade", title: "Yellowing with age", text: "Teeth that have gradually darkened over time." },
        { icon: "temperature", title: "Stains from tea or coffee", text: "Surface and deeper staining from food and drink." },
        { icon: "spots", title: "Tobacco staining", text: "Discolouration from smoking or chewing tobacco." },
        { icon: "sparkle", title: "A special occasion", text: "Many people ask before a wedding or event. Planning ahead helps." },
        { icon: "filling", title: "Uneven shades", text: "Some teeth looking darker than others." },
        { icon: "adult", title: "After braces", text: "Some people consider whitening once braces are finished." },
      ],
      note: "Not all discolouration responds to whitening. A single dark tooth, for example, can have a different cause. An examination helps find out what is behind the colour you notice.",
    },
    explainer: {
      heading: "How does teeth whitening work?",
      paragraphs: [
        "Whitening uses a gel that lightens the colour inside the tooth's surface layers. In the clinic, a whitening light may be used as part of the process.",
        "It works on natural tooth colour. Fillings, crowns and veneers do not change colour, so they may need replacing afterwards if you want them to match.",
        "Results vary. Some stains lighten well, others less so, and the effect fades gradually, especially with staining food, drink or tobacco.",
      ],
    },
    process: {
      heading: "What the journey can look like",
      intro: "Every smile is different, so your own plan may vary. This is the general journey.",
      steps: [
        {
          title: "Examination",
          text: "Dr. Tripathi checks your teeth and gums, and looks at the cause of the discolouration.",
        },
        {
          title: "Expectations",
          text: "You hear what result is realistic, how your fillings or crowns may look afterwards and an estimate of cost.",
        },
        {
          title: "Health first",
          text: "Any decay or gum problems are treated before whitening.",
          links: [{ label: "About teeth cleaning", href: "/treatments/teeth-cleaning/" }],
        },
        { title: "Whitening", text: "The gums are protected and the whitening gel is applied, with the whitening light where used." },
        { title: "Review", text: "The result is checked, and you receive aftercare advice." },
      ],
      footnote: "The number of sessions depends on your teeth and is explained at your consultation.",
    },
    decides: {
      heading: "Is whitening right for me?",
      intro: "Your dentist will look at:",
      items: [
        { title: "The cause of the colour", text: "Surface stains, age-related darkening or something else." },
        { title: "Your teeth and gums", text: "Decay and gum problems are treated first." },
        { title: "Existing restorations", text: "Fillings and crowns at the front of the mouth will not change colour." },
        { title: "Sensitivity", text: "Teeth that are already sensitive may need a different approach." },
        { title: "Your goals", text: "What you would like, and what is realistic." },
      ],
      closing: "If whitening is unlikely to give the result you want, Dr. Tripathi will tell you and explain other options.",
    },
    comfort: {
      heading: "Feeling comfortable",
      paragraphs: [
        "Whitening does not usually need an anaesthetic. Some people feel temporary sensitivity during or after treatment.",
        "Tell Dr. Tripathi if anything is uncomfortable. He will explain what to expect and what to do if sensitivity happens.",
      ],
      image: consultImage,
    },
    why: {
      heading: "Why patients in Aliganj choose Roots & Pulp",
      items: [
        { title: "Realistic expectations", text: "What is possible, and what is not, is explained upfront." },
        { title: "Health before looks", text: "Teeth and gums are checked before any whitening." },
        ...whyCore.slice(3),
      ],
      equipment: [
        {
          src: "/images/equipment/teeth-whitening-light.jpg",
          alt: "LED teeth whitening light used for in-clinic whitening",
          caption: "Teeth Whitening Light",
          detail: "In-clinic LED whitening",
          position: "center 45%",
        },
        consultationStrip[0],
        consultationStrip[1],
      ],
      equipmentNote: "In-clinic whitening at Roots & Pulp.",
      galleryLink: { label: "See the equipment in the gallery", href: "/gallery/#equipment" },
    },
    doctorQuote: standardDoctorQuote,
    aftercare: {
      heading: "Afterwards, and keeping your result",
      intro: "Your dentist's instructions always come first. This is general guidance.",
      items: [
        { title: "Sensitivity", text: "Temporary sensitivity is common. Tell your dentist if it is strong or does not settle." },
        { title: "The first days", text: "Your dentist may suggest avoiding strongly staining food and drink for a while." },
        { title: "Everyday care", text: "Brush twice a day and keep up regular cleaning." },
        { title: "Over time", text: "Whitening fades gradually. Your dentist can advise on keeping your result." },
      ],
      followUp: "Results vary from person to person, and are not permanent.",
    },
    warning: {
      heading: "When should I contact my dentist?",
      intro: "Please call the clinic if you notice:",
      signs: [
        "sensitivity that is strong or does not settle",
        "sore or white patches on the gums after whitening",
        "pain in a particular tooth",
        "swelling of the gums",
      ],
      emergency: emergencyLine,
    },
    cost: {
      heading: "What affects the cost of whitening?",
      intro: "We do not publish fixed prices, because needs vary. The main factors are:",
      items: [
        { title: "The type of whitening", text: "The approach your dentist recommends." },
        { title: "How many sessions", text: "Some stains need more than one session." },
        { title: "Health work first", text: "Cleaning or fillings that may be needed beforehand." },
        { title: "Matching restorations", text: "Whether fillings or crowns need replacing afterwards." },
      ],
      closing: "After an examination, Dr. Tripathi will explain your options and give you an estimate first.",
    },
    faqIntro: "Straight answers about teeth whitening. For anything else, call or send a WhatsApp message.",
    faqs: [
      {
        question: "Does teeth whitening hurt?",
        answer:
          "Whitening does not usually hurt, but some people feel temporary sensitivity. Your dentist will check your teeth first and explain what to expect.",
      },
      {
        question: "Will whitening work on my fillings or crowns?",
        answer:
          "No. Whitening works on natural tooth colour only. Fillings and crowns keep their colour, so they may stand out afterwards. Your dentist will discuss this before you start.",
      },
      {
        question: "How long does whitening last?",
        answer:
          "It varies. Results fade gradually, faster with tea, coffee and tobacco. Your dentist can advise how to look after your result.",
      },
      {
        question: "Is whitening safe for my teeth?",
        answer:
          "When planned and carried out by a dentist after an examination, whitening is a commonly used treatment. Teeth and gums are checked first, and any problems treated before you begin.",
      },
      {
        question: "How much does teeth whitening cost in Lucknow?",
        answer:
          "It depends on the type of whitening, the number of sessions and any treatment needed first. After an examination at our Aliganj clinic, you will get an estimate before treatment begins.",
      },
      appointmentFaq,
    ],
    related: [
      { slug: "cosmetic-dentistry", text: "Other ways to change how your teeth look." },
      { slug: "teeth-cleaning", text: "Removing surface stains and tartar first." },
      { slug: "tooth-coloured-fillings", text: "Replacing fillings that no longer match." },
    ],
    cta: {
      heading: "Thinking about whitening?",
      text: "Start with a check. Dr. Tripathi will look at what is causing the colour you notice and explain what is realistic, with no pressure.",
    },
  },
  "emergency-dental-care": {
    seo: {
      title: "Emergency Dentist in Aliganj, Lucknow · Roots & Pulp",
      description:
        "Severe tooth pain, swelling, or a broken or knocked-out tooth? Call Roots & Pulp in Aliganj, Lucknow first. Open 7 days. What to do before you arrive.",
    },
    // [CLINICAL REVIEW REQUIRED BEFORE PUBLICATION]
    // [CLINIC DETAIL REQUIRED] Whether same-day emergency slots are kept and any out-of-hours arrangement.
    // The page does not claim 24-hour care.
    clinicallyReviewedOn: "",
    hero: {
      eyebrow: "Urgent care",
      heading: "Emergency Dental Care in Aliganj, Lucknow",
      lede: "Severe pain, swelling, or a broken or knocked-out tooth? Call us first.",
      text: "Dental problems rarely happen at a convenient time. Roots & Pulp in Aliganj is open seven days, Monday to Saturday until 8 PM and Sunday until 5 PM. Call first, so we can advise you and plan your visit.",
    },
    glance: [
      { title: "Call first", text: "Phone or WhatsApp so we can advise you and plan your visit." },
      { title: "Open seven days", text: "Monday to Saturday 10 AM to 8 PM, Sunday 10 AM to 5 PM." },
      { title: "First aim", text: "Find the cause and relieve pain, then plan any further treatment." },
      { title: "Medical emergencies", text: "Breathing difficulty or spreading swelling needs emergency medical care first." },
      { title: "Afterwards", text: "A clear plan for any treatment the tooth needs." },
    ],
    symptoms: {
      heading: "Common dental emergencies",
      intro: "These are common reasons people call the clinic urgently.",
      items: [
        { icon: "night", title: "Severe toothache", text: "Pain that is throbbing, constant or keeping you awake." },
        { icon: "swelling", title: "Swelling", text: "Swelling of the gum, face or jaw." },
        { icon: "crack", title: "A broken or chipped tooth", text: "A piece of tooth that has broken off." },
        { icon: "lost", title: "A knocked-out tooth", text: "A tooth that has come out after a knock or fall." },
        { icon: "filling", title: "A lost filling or crown", text: "A filling, crown or temporary that has come off." },
        { icon: "bite", title: "Pain after treatment", text: "Pain or swelling that is getting worse after dental work." },
      ],
      note: "If you have difficulty breathing or swallowing, swelling spreading toward the eye or neck, or a serious injury to the head or face, seek emergency medical care straight away.",
    },
    explainer: {
      heading: "What to do before you arrive",
      paragraphs: [
        "Knocked-out adult tooth: handle it by the crown, not the root, and do not scrub it. Keep it moist, for example in milk, and call us straight away. Time matters. Do not put a baby tooth back in.",
        "Broken tooth or lost filling: keep any pieces, rinse your mouth gently with water and avoid chewing on that side. Do not try to glue a crown or filling yourself.",
        "Toothache or swelling: call us for advice. Do not place painkillers directly on the gum. If you take pain relief, follow the instructions on the pack.",
      ],
    },
    process: {
      heading: "What happens at an urgent visit",
      intro: "Every situation is different. This is the general journey.",
      steps: [
        { title: "Call first", text: "Tell us what has happened, so we can advise you and plan your visit." },
        {
          title: "Examination",
          text: "Dr. Tripathi listens, examines the area and usually takes an X-ray to find the cause.",
        },
        { title: "Relief first", text: "The first aim is to relieve pain and stabilise the problem." },
        {
          title: "Your plan",
          text: "You hear what further treatment, if any, the tooth needs and an estimate of cost.",
          links: [{ label: "About root canal treatment", href: "/treatments/root-canal-treatment/" }],
        },
      ],
      footnote: "Some problems can be fully treated in one visit, others need follow-up. Dr. Tripathi will explain what applies to you.",
    },
    decides: {
      heading: "How your dentist decides",
      intro: "Your dentist will look at:",
      items: [
        { title: "The cause of the pain", text: "Decay, infection, a crack, gums or something else." },
        { title: "The X-ray", text: "What is happening inside the tooth and around the root." },
        { title: "Whether the tooth can be saved", text: "Saving the tooth is considered first." },
        { title: "Any swelling or infection", text: "And whether it is spreading." },
        { title: "Your health", text: "Relevant medical conditions and medicines." },
      ],
      closing: "You will be told what needs doing now and what can wait.",
    },
    comfort: {
      heading: "Feeling comfortable",
      paragraphs: [
        "Being in pain is stressful. The first aim is to find the cause and help you feel better.",
        "If treatment is needed, the area is numbed first, and you can tell Dr. Tripathi at any time if you feel anything.",
      ],
      image: consultImage,
    },
    why: {
      heading: "Why patients in Aliganj call Roots & Pulp",
      items: [
        { title: "Open seven days", text: "Monday to Saturday until 8 PM, Sunday until 5 PM." },
        { title: "Call or WhatsApp first", text: "So we can advise you before you travel." },
        { title: "Diagnosis before treatment", text: "The cause is found before anything is done." },
        { title: "Saving teeth first", text: "Removal is recommended only when a tooth cannot be saved." },
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
          src: "/images/clinic-entrance.jpg",
          alt: "Street entrance and signboard of Roots & Pulp Dental Clinic in Aliganj",
          caption: "Our entrance in Sector Q, Aliganj",
          position: "center 40%",
        },
        consultationStrip[0],
      ],
      equipmentNote: "Find us in Sector Q, Aliganj.",
      galleryLink: { label: "Get directions and contact details", href: "/contact/" },
    },
    doctorQuote: standardDoctorQuote,
    aftercare: {
      heading: "After an urgent visit",
      intro: "Your dentist's instructions always come first. This is general guidance.",
      items: [
        { title: "Follow the plan", text: "Complete any further treatment the tooth needs, so the problem does not return." },
        { title: "Pain relief", text: "Use pain relief only as advised, and follow the instructions on the pack." },
        { title: "Eating", text: "Avoid chewing on the affected side until your dentist says it is ready." },
        { title: "Watch for changes", text: "Call if pain or swelling gets worse." },
      ],
      followUp: "Temporary relief is not the same as a fix. Keep your follow-up appointment.",
    },
    warning: {
      heading: "When to seek urgent help",
      intro: "Call the clinic straight away if you have:",
      signs: [
        "a knocked-out adult tooth",
        "swelling of the face, gum or jaw",
        "severe pain that is not settling",
        "a fever with tooth pain",
        "bleeding that does not stop with firm pressure",
      ],
      emergency: emergencyLine,
    },
    cost: {
      heading: "What affects the cost of emergency care?",
      intro: "We do not publish fixed prices, because every situation is different. The main factors are:",
      items: [
        { title: "The cause", text: "What is behind the pain or damage." },
        { title: "Treatment needed now", text: "What is done to relieve pain and stabilise the tooth." },
        { title: "Imaging", text: "X-rays needed to find the cause." },
        { title: "Further treatment", text: "Any follow-up the tooth needs." },
      ],
      closing: "Dr. Tripathi will explain what is needed and give you an estimate before treatment begins.",
    },
    faqIntro: "Straight answers for urgent dental problems. Call us first if you are in pain.",
    faqs: [
      {
        question: "What counts as a dental emergency?",
        answer:
          "Severe pain, swelling, a knocked-out adult tooth, a broken tooth or bleeding that does not stop are all reasons to call. If you are unsure, call and we will advise.",
      },
      {
        question: "What should I do if a tooth is knocked out?",
        answer:
          "For an adult tooth, handle it by the crown, do not scrub it, keep it moist, for example in milk, and call us straight away. Do not put a baby tooth back in. For serious head or face injuries, seek emergency medical care first.",
        link: { label: "About children's dentistry", href: "/treatments/childrens-dentistry/" },
      },
      {
        question: "Are you open on Sundays?",
        answer: "Yes. We are open Monday to Saturday 10:00 AM to 8:00 PM and Sunday 10:00 AM to 5:00 PM.",
      },
      {
        question: "My crown or filling fell out. Is that an emergency?",
        answer:
          "It is usually not dangerous, but call us so the tooth can be protected. Keep the crown safe, avoid chewing on that side and do not glue it yourself.",
      },
      {
        question: "Should I go to a hospital instead?",
        answer:
          "For difficulty breathing or swallowing, swelling spreading toward the eye or neck, or a serious head or face injury, seek emergency medical care straight away.",
      },
      {
        question: "How much does emergency dental care cost in Lucknow?",
        answer:
          "It depends on the cause and the treatment needed. At our Aliganj clinic, Dr. Tripathi will explain what is needed and give you an estimate before treatment begins.",
      },
    ],
    related: [
      { slug: "root-canal-treatment", text: "Treating infection inside a tooth." },
      { slug: "tooth-extraction", text: "When a tooth cannot be saved." },
      { slug: "crowns-and-bridges", text: "Protecting a broken or weakened tooth." },
    ],
    cta: {
      heading: "In pain? Call us first.",
      text: "We are open seven days. Call or WhatsApp and tell us what has happened, so we can advise you and plan your visit.",
    },
  },
};
