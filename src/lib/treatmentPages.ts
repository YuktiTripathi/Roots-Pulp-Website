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
  | "chew";

export type StageIllustration = "root-canal" | "implant" | "crown-bridge";

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
    /** Items with a group are shown under that group's label, in order of first appearance. */
    /** An image, when given, is shown instead of the line icon. */
    items: (TreatmentCardItem & { icon: SymptomIcon; image?: string; group?: string; link?: TreatmentLink })[];
    note: string;
  };
  explainer: {
    heading: string;
    paragraphs: string[];
    illustration: StageIllustration;
    /** A supplied image, when given, replaces the drawn illustration. */
    image?: { src: string; alt: string; width: number; height: number };
    caption: string;
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
    items: { title: string; what: string; suits: string; note: string; link?: TreatmentLink }[];
    note?: string;
  };
  /** Two columns render as side-by-side cards; three or more as a scrollable table. */
  comparison: {
    heading: string;
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
    image: { src: string; alt: string; width: number; height: number };
  };
  why: {
    heading: string;
    items: TreatmentCardItem[];
    equipment: { src: string; alt: string; caption: string; detail: string; position?: string }[];
    equipmentNote: string;
  };
  /** Credential lines shown on the doctor card in addition to the standard ones. */
  doctorExtra?: string[];
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
  faqIntro: string;
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
        { icon: "gap", title: "A missing tooth", text: "From an extraction, an injury or a tooth that was never there." },
        { icon: "gaps", title: "Several missing teeth", text: "Gaps that make chewing or speaking harder." },
        {
          icon: "lost",
          title: "A tooth that cannot be saved",
          text: "Your dentist may discuss what could replace it.",
        },
        {
          icon: "denture",
          title: "Difficulty with dentures",
          text: "Removable dentures that feel loose or uncomfortable.",
        },
        { icon: "drift", title: "Gaps affecting your bite", text: "Teeth drifting or tilting into an empty space." },
        {
          icon: "neighbours",
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
          what: "One implant and crown to replace one tooth.",
          suits: "Someone missing a single tooth, with healthy neighbouring teeth.",
          note: "Leaves the neighbouring teeth untouched.",
        },
        {
          title: "Multiple tooth implants",
          what: "Implants that support a bridge or several crowns across a gap.",
          suits: "Someone missing several teeth in a row.",
          note: "One implant can often support more than one tooth, depending on the case.",
        },
        {
          title: "Implant-supported dentures",
          what: "A denture that clips or attaches to implants.",
          suits: "Someone with many or all teeth missing, or who struggles with loose dentures.",
          note: "More stable than a standard denture, but a different treatment.",
          link: { label: "About dentures", href: "/treatments/dentures/" },
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
        src: "/images/doctor/explain-consult.png",
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
          link: { label: "Or compare dentures", href: "/treatments/dentures/" },
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
        src: "/images/doctor/explain-consult.png",
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
};
