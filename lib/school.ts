/**
 * Brand + contact facts — single source of truth. Update here, never inline.
 * Sources: official brochures (July 2026) + the school's own profile deck
 * "FIONA 22nd February 2026.pptx" (newer — its statements supersede the
 * brochure where they differ, e.g. the Vision).
 */

export type SocialLink = {
  name: string;
  handle?: string;
  url?: string;
};

/** Real handles from the profile deck. // TODO: TikTok + YouTube handles, Facebook page URL. */
const socials: SocialLink[] = [
  {
    name: "Instagram",
    handle: "@recordsfashionschoolug",
    url: "https://www.instagram.com/recordsfashionschoolug",
  },
  {
    name: "X (Twitter)",
    handle: "@recordsfashionschoolug",
    url: "https://x.com/recordsfashionschoolug",
  },
  { name: "Facebook", handle: "Records Fashion School Uganda" },
  { name: "TikTok" },
  { name: "YouTube" },
];

export const school = {
  name: "Records Fashion School",
  tagline: "Skills for Life",
  city: "Kampala, Uganda",
  addressLines: [
    "Lower Katwe, along Muteesa I Road",
    "Tezira House, Second Floor",
    "Kampala, Uganda",
  ],
  phones: ["+256 (0) 701 316 907", "+256 (0) 784 005 899"],
  email: "info@recordsfashionschool.com",
  website: "https://www.recordsfashionschool.com",
  socials,

  /** A community-based vocational institute, established 7 July 2008. */
  founded: "7 July 2008",
  foundedYear: 2008,
  firstGraduationYear: 2010,
  /** Fashion professionals graduated since 2010 (profile deck, Feb 2026). */
  graduates: 921,
  /** Share of graduates who went straight on to start their own design houses. */
  alumniStartupRate: 91,

  /** Brand statements — the school's own words. */
  mission:
    "To nurture and develop passionate people into professional fashion designers, with an artistic mind-set that meets the evolving design market demands.",
  vision:
    "To become a central hub in research and innovations in both traditional and contemporary forms of garment design and textiles, in Africa and beyond.",
  promise:
    "To impart entrepreneurial skills and attitude to enhance the productivity and competitiveness of the youth in the garment design and textile industry.",
  positioning:
    "We re-imagine the world based on artistry and mastery as essential tools for success in quality design to shape the future.",

  /** Our Values — the school's own words (profile deck). */
  values: [
    {
      name: "Attention to Detail",
      copy: "A great designer is made from the time and care they put into their work. We teach one-on-one, training our students to always see the unseen — and cater for its needs in their work.",
    },
    {
      name: "Artistry",
      copy: "We express this through creativity, drawing inspiration from the artistic perspective of the environments around us — guiding our students through art as a core of the design work they do.",
    },
    {
      name: "Self-Esteem",
      copy: "Records Fashion School is home to garment design — a DNA-coded art, in a team of instructors who instinctively train, guide and develop talent into professional fashion designers able to challenge and meet the ever-evolving design market demands.",
    },
  ],

  /** Design houses started by our graduates (a selection, in the school's words). */
  alumniHouses: [
    "Akachi Designs",
    "Lillian Musisi",
    "Marish Designs",
    "Nzuuno",
    "Hawet Fashionista",
    "Seamline Atelier",
    "Nahmita",
    "Bric Couture",
    "Brix",
    "African Pepper Couture",
    "Sanvra Couture",
    "Tina Ku Wuzi",
  ],

  /** Companies and partners (user-confirmed 2026-07-19; abouts researched
   *  from each partner's own site / public coverage — keep factual). */
  partners: [
    {
      name: "BUZIGAHILL",
      location: "Kampala, Uganda",
      about:
        "Clothing brand founded in Kampala in 2021 by designer Bobby Kolade. BUZIGAHILL upcycles second-hand clothes that arrive in Uganda and redistributes them to the Global North under its Return to Sender project — every piece unique, cut apart and rebuilt in its Kampala studio.",
      url: "https://buzigahill.com",
    },
    {
      name: "IGC Fashion",
      location: "Kampala, Uganda",
      about:
        "Experimental Kampala label established in 2017 by Kasoma Ibrahim and Katende Godfrey, merging historical African craft with modern urban design — barkcloth, raffia, sisal and other overlooked materials worked on zero-waste principles — and sharing skills through its grassroots Fashion Cypher workshops.",
      url: "https://www.igcfashion.africa",
    },
    {
      name: "Stella Atal",
      location: "Kampala · Paris",
      about:
        "Ugandan painter and fashion designer, founder of the Atal Stella fashion house, now based in Paris. A pioneer of eco-fashion built on local, natural and recycled materials, she was named African Designer of the Year at the 2008 Ethical Fashion Awards in London and has shown from Africa Fashion Week New York to Green Fashion Switzerland.",
      url: "https://en.wikipedia.org/wiki/Stella_Atal",
    },
  ],

  /** The flagship programme (profile deck "Course Break Down"). */
  program: {
    name: "Fashion Design",
    duration: "2½ years",
    practicalShare: 95,
    semesters: 5,
    semesterMonths: 5,
    contactHoursPerSemester: 732,
    contactHoursTotal: 3660,
    itemsProduced: 105,
    stageOne:
      "One and a half years through all the basics and specialised professional techniques of fashion craftsmanship.",
    stageTwo:
      "An introduction to creation, innovation and the management of at least four fashion projects, plus one graduation fashion-collection project — each executed independently.",
    units: [
      { name: "Art and Design", abbreviation: "AD", code: "AD111" },
      { name: "Pattern Drafting", abbreviation: "PD", code: "PD112" },
      { name: "Garment Production", abbreviation: "GP", code: "GP113" },
      {
        name: "Fundamentals of Digital Marketing",
        abbreviation: "FDM",
        code: "FDM114",
      },
    ],
    codeNote:
      "A unit code reads unit · semester · year · course unit — e.g. AD111 is Art and Design, Semester One, Year One, Course Unit One. Codes change with the student's semester and year.",
    modules: [
      "Skirts",
      "Trousers (Women's Wear)",
      "Shirts, T-shirts and Trousers (Men's Wear)",
      "Fashion Crafts",
      "Jackets and Over-Garments (Men's Wear)",
      "Blouses",
      "Dresses",
      "Research and Graduation Project (final semester)",
    ],
  },

  /** Fees in Ugandan Shillings (profile deck "Enrollment Requirements"). */
  fees: {
    currencyNote: "All fees are in Ugandan Shillings (UGX).",
    registration: "122,000/=",
    tuitionPerSemester: "1,000,000/=",
    tuitionFullCourse: "5,000,000/=",
    /** Deck prints “One hundred thousand” in words but 150,000/= in figures —
     *  using the figure. // TODO: confirm exact amount with the school. */
    nationalExamsAnnual: "150,000/=",
    requirements: [
      "Past academic papers / transcripts",
      "Six (6) full-colour passport-size photos",
      "Registration fee of 122,000/=",
      "Tuition per semester (5 months) of 1,000,000/=",
      "Annual national examinations registration fee of 150,000/=",
    ],
  },

  /** Flyer headline + enrollment banner. */
  flyerHeadline:
    "Unlock your creativity. Learn from the best. Kickstart your career.",
  enrollmentBanner: "Fashion Design — Enrollment Open",
};
