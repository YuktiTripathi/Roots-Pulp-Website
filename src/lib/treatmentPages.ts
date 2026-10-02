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

export type SymptomIcon = "temperature" | "bite" | "night" | "swelling" | "crack" | "shade";

export type TreatmentFaq = { question: string; answer: string; link?: TreatmentLink };

export type TreatmentPageContent = {
  seo: { title: string; description: string };
  /** ISO date of clinical review. While empty the page stays out of search results and no review line shows. */
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
    items: (TreatmentCardItem & { icon: SymptomIcon })[];
    note: string;
  };
  explainer: {
    heading: string;
    paragraphs: string[];
    caption: string;
  };
  process: {
    heading: string;
    intro: string;
    steps: (TreatmentCardItem & { link?: TreatmentLink })[];
    footnote: string;
  };
  comparison: {
    heading: string;
    columns: [string, string];
    rows: { label: string; values: [string, string] }[];
    closing: string;
    links: TreatmentLink[];
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
    image: { src: string; alt: string; width: number; height: number };
  };
  why: {
    heading: string;
    items: TreatmentCardItem[];
    equipment: { src: string; alt: string; caption: string; detail: string; position?: string }[];
    equipmentNote: string;
  };
  doctorQuote: string;
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
  faqs: TreatmentFaq[];
  related: { slug: string; text: string }[];
  cta: { heading: string; text: string };
};

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
          title: "Lingering sensitivity",
          text: "Hot or cold that stays long after the drink or food is gone.",
        },
        { icon: "bite", title: "Pain when biting", text: "A tooth that hurts when you chew or press on it." },
        {
          icon: "night",
          title: "A toothache that wakes you",
          text: "Pain that is throbbing, or that disturbs your sleep.",
        },
        {
          icon: "swelling",
          title: "Swelling or a bump on the gum",
          text: "Puffiness near a tooth, sometimes with a pimple-like spot.",
        },
        {
          icon: "crack",
          title: "Deep decay or a cracked tooth",
          text: "Damage that may have reached the inside of the tooth.",
        },
        {
          icon: "shade",
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
          link: { label: "About crowns & bridges", href: "/treatments/crowns-and-bridges/" },
        },
      ],
      // [CLINIC DETAIL REQUIRED] Typical visit pattern, only if the doctor wants it stated.
      footnote: "Some teeth need more than one visit. Your dentist will tell you what to expect for your tooth.",
    },
    comparison: {
      heading: "Saving a tooth or removing it",
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
        src: "/images/doctor/explain-consult.png",
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
};
