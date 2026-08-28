/**
 * Everything on the site that is written by hand lives here.
 *
 * Publications and the collaborator map are fetched from ORCID, Crossref and
 * OpenAlex instead, and live in public/data (see scripts/fetch-data.mjs).
 * To change a person, a research theme, a software package or a gallery
 * caption, edit this file only.
 *
 * Wording is carried over verbatim from the lab's Google Site
 * (sites.google.com/view/noblelab), including its capitalisation, except for
 * the handful of typo fixes noted inline with "typo fixed".
 */
import { PALETTE } from "./palette";

export const SITE = {
  shortName: "Noble Lab",
  name: "Noble Lab",
  strapline: "Evolutionary, Ecological and Conservation Physiology",
  institution: "Division of Ecology & Evolution, Research School of Biology",
  university: "The Australian National University",
  city: "Canberra",
  email: "daniel.noble@anu.edu.au",
  address: [
    "Division of Ecology & Evolution",
    "Research School of Biology",
    "The Australian National University",
    "Canberra ACT 2600, Australia",
  ],
};

/* ------------------------------------------------------------------ links */

export type LinkItem = { label: string; href: string; icon: IconName };
export type IconName = "scholar" | "orcid" | "github" | "bluesky" | "x" | "youtube" | "mail" | "cv";

export const LINKS: LinkItem[] = [
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=w69ezLIAAAAJ",
    icon: "scholar",
  },
  { label: "ORCID", href: "https://orcid.org/0000-0001-9460-8743", icon: "orcid" },
  { label: "GitHub", href: "https://github.com/daniel1noble", icon: "github" },
  { label: "Bluesky", href: "https://bsky.app/profile/danielwanoble.bsky.social", icon: "bluesky" },
  { label: "X", href: "https://x.com/DanielWANoble", icon: "x" },
];

/** No CV file is published; pages hide the CV button while this is null. */
export const CV_URL: string | null = null;

/**
 * Public path of the logo mark shown beside the wordmark, e.g.
 * "/images/logo-mark.png". No mark has been drawn yet, so this stays null and
 * LogoMark renders nothing (no request, no layout shift) until a file exists.
 */
export const LOGO_MARK: string | null = null;

/* -------------------------------------------------------------- research */

/** The "What we do?" introduction on the Research page, paragraph by paragraph. */
export const RESEARCH_INTRO: string[] = [
  "Fundamentally, we are interested in how organisms respond and adapt to changing environments.",
  "Our work is highly integrative. We combine theory, modelling and meta-analysis with experimentation to understand and predict how and why populations are able to adapt (or not) to changing environments.",
  "Our work focuses on the impacts of diverse environmental stressors, from extreme heat to novel anthropogenic stressors (e.g., pesticides, plastics), and how they interact across an individuals life cycle to affect physiology, growth, fitness and ultimately population growth and adaptive evolution.",
  "Our study systems are diverse, but generally focus on lizards, insects, fish and amphibians.",
  "Below we detail some of the major (more recent) research themes in our group.",
];

/** A scientific figure from the Google Site's per-theme carousel. */
export type ThemeFigure = { src: string; alt: string; width: number; height: number };

export type Theme = {
  id: string;
  title: string;
  lead: string;
  questions: string[];
  /** The first of `images`; the home-page teaser shows this one. */
  image: string;
  /** Every figure the Google Site showed for this theme, in its order. */
  images: ThemeFigure[];
  accent: string;
};

export const THEMES: Theme[] = [
  {
    id: "extreme-heat",
    title: "Predicting the effects of extreme heat on organisms",
    lead:
      "Extreme heat is becoming an increasing challenge to organisms. Heatwaves are set to increase with climate change and organisms are expected to be exposed to conditions that threaten physiological function and fitness. We use microclimate / biophysical models to predict temperature exposure and combine these approaches with thermal load sensitivity and dynamic energy budget theory to predict the impacts of extreme heat on organisms across life. We are also doing experiments and meta-analyses to better understand how thermal tolerance can be adjusted to protect against extreme heat.",
    questions: [],
    image: "/images/theme-1-1.png",
    images: [
      {
        src: "/images/theme-1-1.png",
        alt: "Figure: coupled mechanistic models of thermal exposure/sensitivity",
        width: 1600,
        height: 1120,
      },
      {
        src: "/images/theme-1-2.jpg",
        alt: "Figure: plant/grasshopper multi-panel diagram",
        width: 1600,
        height: 705,
      },
    ],
    accent: PALETTE.terracotta,
  },
  {
    id: "developmental-environments",
    title:
      "How different early developmental environments interact to impact physiology and life history",
    lead:
      "Metabolic processes are an essential and universal feature of life; they provide all the available energy organisms have to invest in growth, reproduction and survival. We explore how early developmental experiences impact physiology and metabolic function using targeted experimental manipulations of early life stages in ectotherms combined with large-scale meta-analytic and comparative approaches. We explore how physiological changes brought about by developmental responses cascade to affect life-history and fitness – insights that are critical to ascertain the long-term consequences of such changes.",
    questions: [],
    image: "/images/theme-2-1.jpg",
    images: [
      {
        src: "/images/theme-2-1.jpg",
        alt: "Figure: population ecology / energy allocation / mitochondrial bioenergetics flow diagram",
        width: 1305,
        height: 1600,
      },
      {
        src: "/images/theme-2-2.jpg",
        alt: "Figure: orchard plot of lnRR Q10 by habitat",
        width: 1600,
        height: 1312,
      },
    ],
    accent: PALETTE.sage,
  },
  {
    id: "plasticity-and-adaptation",
    title:
      "Relative role of phenotypic plasticity and adaptive genetic evolution to population divergence",
    // typo fixed: "reciprocol" -> "reciprocal"
    lead:
      "Understanding the relative role of phenotypic plasticity in the adaptive process is crucial in an era of unprecedented environmental change. Plasticity is thought to allow populations to cope in the face of environmental change and may 'buy' time for genetic adaption to occur. We have been exploring whether plasticity might facilitate or impede adaptation using meta-analyses and reciprocal transplant experiments.",
    questions: [],
    image: "/images/theme-3-1.jpg",
    images: [
      {
        src: "/images/theme-3-1.jpg",
        alt: "Figure: polar plot and trait-space diagram of plasticity vectors",
        width: 1121,
        height: 1600,
      },
      {
        src: "/images/theme-3-2.png",
        alt: "Figure: stacked bar chart of variance components",
        width: 540,
        height: 425,
      },
      {
        src: "/images/theme-3-3.png",
        alt: "Figure: luminance/chromatic contrast vs background environment with chameleon illustrations",
        width: 1600,
        height: 895,
      },
    ],
    accent: PALETTE.ochre,
  },
  {
    id: "statistics-and-software",
    title:
      "Developing new statistical approaches and software for meta-analysis and experimental data",
    lead:
      "The biological questions we address often demand new methods and approaches to address and overcome the challenges of complex biological data. As such, we develop new statistical approaches, effect sizes and software to help address the need for robust statistical inference and improved prediction. We often borrow from methods in other disparate research fields to help address new problems.",
    questions: [],
    image: "/images/theme-4-1.png",
    images: [
      {
        src: "/images/theme-4-1.png",
        alt: "Figure: effect-size taxonomy",
        width: 1600,
        height: 774,
      },
      {
        src: "/images/theme-4-2.jpg",
        alt: "Figure: \"nuisance heterogeneity\" standardising effects diagram with animal silhouettes and temperature bubbles",
        width: 1600,
        height: 1268,
      },
    ],
    accent: PALETTE.rust,
  },
];

export type ThemePaper = { citation: string; href: string };

/**
 * The "Selected Publications" listed under each theme on the Google Site,
 * citation text and link verbatim (the fourth theme heads its list
 * "Relevant Publications"). Keyed by Theme.id.
 */
export const THEME_PAPERS: Record<string, ThemePaper[]> = {
  "extreme-heat": [
    {
      citation:
        "Noble et al. 2025. A systems modelling approach to predict biological responses to extreme heat. EcoEvoRxiv",
      href: "https://ecoevorxiv.org/repository/view/9667/",
    },
    {
      citation:
        "Arnold et al. 2025. A framework for modelling thermal load sensitivity across life. Global Change Biology, 31 (7) e70315.",
      href: "https://onlinelibrary.wiley.com/doi/full/10.1111/gcb.70315",
    },
    {
      citation:
        "Pottier et al. 2022. Developmental plasticity in thermal tolerance. Ontogenetic variation, persistence, and future directions. Ecology Letters, 25, 2245-2268",
      href: "https://onlinelibrary.wiley.com/doi/full/10.1111/ele.14083",
    },
    {
      citation:
        "Urban et al. 2024. When and how can we predict adaptive responses to climate change? Evolution Letters, 8(1), 172-187.",
      href: "https://academic.oup.com/evlett/article/8/1/172/7455738?login=false",
    },
  ],
  "developmental-environments": [
    {
      citation:
        "Noble et al. 2018. Developmental temperatures and phenotypic plasticity in reptiles: a systematic review and meta-analysis. Biological Reviews, 93, 72-79.",
      href: "https://onlinelibrary.wiley.com/doi/abs/10.1111/brv.12333",
    },
    {
      citation:
        "Koch et al. 2021. Integrating mitochondrial aerobic metabolism into ecology and evolution. Trends in Ecology and Evolution, 36 (4) 321-332.",
      href: "https://www.cell.com/trends/ecology-evolution/abstract/S0169-5347%2820%2930354-2",
    },
    {
      citation:
        "Kar et al. 2022. Impact of developmental temperatures on thermal plasticity and repeatability in metabolic rate. Evolutionary Ecology, 36 (2), 199-216.",
      href: "https://link.springer.com/article/10.1007/s10682-022-10160-1",
    },
    {
      citation:
        "Crino et al. 2022. From eggs to adulthood: sustained effects of early developmental temperature and corticosterone exposure on physiology and body size in an Australian lizard. Journal of Experimental Biology, 227 (24), jeb249234.",
      href: "https://journals.biologists.com/jeb/article/227/24/jeb249234/363429",
    },
  ],
  "plasticity-and-adaptation": [
    {
      citation:
        "Noble et al. 2019. Plastic responses to novel environments are biased towards phenotype dimensions with high additive genetic variation. Proceedings of the National Academy of Sciences USA (PNAS), 116, 13452-13461.",
      href: "https://www.pnas.org/doi/abs/10.1073/pnas.1821066116",
    },
    {
      citation:
        "Radsmera et al. 2020. Plasticity leaves a phenotypic signature during local adaptation. Evolution Letters, 4, 360-370.",
      href: "https://academic.oup.com/evlett/article/4/4/360/6697532?login=false",
    },
    {
      citation:
        "Whiting et al. 2022. Invasive chameleons released from predation display more conspicuous colors. Science Advances, 8 (19) eabn2414.",
      href: "https://www.science.org/doi/full/10.1126/sciadv.abn2415",
    },
    {
      citation:
        "Noble et al. 2025. Limited plasticity but increased variance in physiological rates across ectotherm populations under climate change. Functional Ecology, 39 (5), 1141-1317.",
      href: "https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/1365-2435.70031",
    },
  ],
  "statistics-and-software": [
    {
      citation:
        "Noble et al. 2019. Plastic responses to novel environments are biased towards phenotype dimensions with high additive genetic variation. Proceedings of the National Academy of Sciences USA (PNAS), 116, 13452-13461.",
      href: "https://www.pnas.org/doi/abs/10.1073/pnas.1821066116",
    },
    {
      citation:
        "Noble et al. 2022. Meta-analytic approaches and effect sizes to account for 'nuisance heterogeneity' in comparative physiology. Journal of Experimental Biology, 225, jeb243225.",
      href: "https://journals.biologists.com/jeb/article/225/Suppl_1/jeb243225/274278/Meta-analytic-approaches-and-effect-sizes-to",
    },
    {
      citation:
        "Pottier et al. 2024. New horizons for comparative studies and meta-analyses. Trends in Ecology and Evolution, 39 (5), 435-445.",
      href: "https://www.cell.com/action/doSearch?type=quicksearch&text1=New+Horizons&field1=AllField&journalCode=tree&SeriesKey=tree",
    },
    {
      citation:
        "Nakagawa et al. 2023. orchaRd 2.0: An R package for visualising meta-analyses with orchard plots. Methods in Ecology and Evolution, 14 (8), 2003-2010.",
      href: "https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210X.14152",
    },
    {
      citation:
        "Nakagawa et al. 2022. Methods for testing publication bias in ecological and evolutionary meta-analyses. Methods in Ecology and Evolution, 13, 4-21.",
      href: "https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/2041-210X.13724",
    },
    {
      citation:
        "O'Dea, Noble & Nakagawa. 2022. Unifying individual differences in personality, predictability, and plasticity: a practical guide. Methods in Ecology and Evolution, 13, 278-293.",
      href: "https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/2041-210X.13755",
    },
  ],
};

/* ---------------------------------------------------------------- people */

export type Person = {
  name: string;
  role: string;
  affiliation?: string;
  /** Public path under /images, or null when the site has no photo. */
  photo?: string | null;
  /** Biography paragraphs, verbatim from the site. */
  bio?: string[];
  /** The same biography as one string, for layouts that want a single block. */
  blurb?: string;
  links?: { label: string; href: string }[];
  years?: string;
  /** Co-advisor line, where the site gives one separately from the bio. */
  note?: string;
  now?: string;
};

export const PI: Person = {
  name: "Daniel Noble",
  role: "ARC Future Fellow (2023–2027) and Associate Professor",
  affiliation: `${SITE.institution}, ${SITE.university}`,
  photo: "/images/people-daniel-noble-2025.jpg",
  links: [
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=w69ezLIAAAAJ" },
    { label: "ORCID", href: "https://orcid.org/0000-0001-9460-8743" },
    { label: "Email", href: "mailto:daniel.noble@anu.edu.au" },
  ],
};

/** Always visible beside the PI photo. */
export const PI_INTRO =
  "Dan is currently an ARC Future Fellow (2023–2027) and Associate Professor at the ANU. Dan moved from UNSW Sydney where he was an ARC DECRA fellow in 2019 to start his lab group up.";

/** Revealed by the "Learn more" button, below the intro. */
export const PI_BIO: string[] = [
  "He completed his PhD at Macquarie University in Sydney after having done an MSc and BSc at the University of Guelph, Canada.",
];

/** Shown at the end of the expanded biography. Empty: the site has no candid PI photos. */
export const PI_PHOTOS: { src: string; alt: string }[] = [];

export type MemberGroup = { name: string; members: Person[] };

/**
 * The People page groups, in the order and under the headings the site uses.
 * Years are verbatim (bracketed where the site brackets them).
 */
export const MEMBER_GROUPS: MemberGroup[] = [
  {
    name: "PhD Students",
    members: [
      {
        name: "Naomi Laven",
        role: "PhD student",
        years: "(2023 – Present)",
        photo: "/images/people-naomi-laven.jpg",
        bio: [
          "I’ve moved to Canberra after an undergrad, honours and lots of field assistant work in the Australian tropics. My research here at ANU will focus on the implications of sex-reversal in a local alpine skink species, including looking at the ways sexual phenotypes or genotypes might impact behaviour, cognition, and mating traits. Understanding how sex-reversal impacts fitness is vital for predicting the future directions of populations prone to this phenomenon",
        ],
        links: [],
      },
      {
        name: "Dalton Leibold",
        role: "PhD student",
        years: "(2022 – Present)",
        photo: "/images/people-dalton-leibold.jpg",
        bio: [
          "Evolutionary ecologist by passion, physiologist by profession. I use reptiles as a system for identifying relationships between the environment, physiological processes, and fitness and all of its associated phenotypes. During my PhD I aim testing the programmatic effects of early-life experiences (i.e., maternal effects and the developmental environment) on physiological biomarkers of fitness (mitochondrial function, oxidative stress, and DNA damage), life-history tradeoffs, and lifetime reproductive success.",
        ],
        links: [],
      },
      {
        name: "Joel Treutlein",
        role: "PhD student",
        years: "(2024 – Present)",
        note: "Co-advised with Sarah Perkins-Kirkpatrick",
        photo: "/images/people-joel-treutlein.jpg",
        bio: [
          "Joel is interested in the consequences of future heatwave trends on ecosystems given carbon emission targets. His research interests span multiple disciplines and combine high-resolution climate modelling with ecological analyses such as the use of microclimate and biophysical models. The primary objective of his work is to determine how heatwaves are changing at an ecologically-relevant fine-scale, and subsequently their predicted ecological impacts.",
        ],
        links: [],
      },
      {
        name: "Xingyi Xiu",
        role: "PhD student",
        years: "(2026 – Present)",
        photo: "/images/people-xingyi-xiu.jpg",
        bio: [
          "Xingyi just finished doing a big meta-analysis on microplastic impacts on aquatic organisms. Now time to publish!",
        ],
        links: [],
      },
    ],
  },
  {
    name: "MSc/Honours Students",
    members: [
      {
        name: "Niamh O'Kelly",
        role: "MSc/Honours student",
        years: "(2025 – 2026)",
        photo: "/images/people-niamh-okelly.jpg",
        bio: [
          "Niamh is co-advised by Bernd Gruber at UC. She's working on developing eDNA sampling protocols for detecting the critically endangered Canberra Earless Dragon",
        ],
        links: [],
      },
    ],
  },
  {
    name: "Past Postdoctoral Researchers",
    members: [
      {
        name: "Dr. Patrice Pottier",
        role: "Past postdoctoral researcher",
        years: "(2024 – 2025)",
        photo: "/images/people-patrice-pottier.jpg",
        bio: [
          "I’m an evolutionary ecologist exploring how rapid environmental change shapes the physiology, life-history, and behaviour of ectothermic animals. My interests are broad, and I use a combination of evidence synthesis, comparative analyses, and laboratory experiments to address exciting questions in a broad range of organisms. Patrice is now working with Fredrik Jutfelt at Gothenburg University, Sweden",
        ],
        links: [],
      },
      {
        name: "Dr. Ondi Crino",
        role: "Past postdoctoral researcher",
        years: "(2020 – 2022)",
        photo: "/images/people-ondi-crino.jpg",
        bio: [
          "Ondi was a postdoctoral researcher working on early environmental effects on physiology and is now running her own lab at Flinder’s University!",
        ],
        links: [],
      },
      {
        name: "Dr. Kris Wild",
        role: "Past postdoctoral researcher",
        years: "(2022 – 2023)",
        photo: "/images/people-kris-wild.jpg",
        bio: [
          // typo fixed: "extraordinaireand" -> "extraordinaire and" (two adjacent spans with no space on the site)
          "Microclimate modeller extraordinaire and sex-reversal whisperer. Kris is now doing a postdoctoral fellowship with Mike Kearney at the University of Melbourne.",
        ],
        links: [],
      },
      {
        name: "Dr. Essie Rodgers",
        role: "Past postdoctoral researcher",
        years: "(2019 – 2020)",
        photo: "/images/people-essie-rodgers.jpg",
        bio: [
          "Ecophysiology and Conservation Physiology of all things big (crocodiles to be exact) and small (lizards, fish and insects!). Now runs her own physiology lab at the Murdoch University!",
        ],
        links: [],
      },
    ],
  },
  {
    name: "Lab alumni",
    members: [
      {
        name: "Pablo Recio",
        role: "Past PhD student",
        years: "(2022 – 2025)",
        now: "Now a postdoctoral researcher at Flinders University",
        photo: "/images/people-pablo-recio.jpg",
        bio: [
          "My research focuses mainly on the evolution of animal behaviour, using reptiles as a model species. During my PhD I aim to unravel how maternal condition together with early environment affect cognitive abilities of the delicate skink. I am highly skilled at catching lizards with a fishing rod.",
        ],
        links: [{ label: "ResearchGate", href: "https://www.researchgate.net/profile/Pablo-Recio" }],
      },
      {
        name: "Amelia Peardon",
        role: "Past Honours student",
        years: "(2024 – 2025)",
        photo: "/images/people-amelia-peardon.jpg",
        // typo fixed: "challanges" -> "challenges"
        bio: [
          "Amelia is exploring new approaches to measuring thermal load sensitivity for cells to overcome challenges in applying these methods in vertebrates",
        ],
        links: [],
      },
      {
        name: "Aidan Lowe",
        role: "Past Honours student",
        years: "(2024 – 2025)",
        photo: null,
        bio: [
          "Aidan is looking at how mito-nuclear discordance impacts mitochondrial function in grasshoppers and flour beetles",
        ],
        links: [],
      },
    ],
  },
].map((group) => ({
  ...group,
  members: group.members.map((m) => ({ ...m, blurb: m.bio.join("\n\n") })),
}));

/** Derived aliases: everyone not under a "Past …" heading counts as current. */
export const CURRENT_MEMBERS: Person[] = MEMBER_GROUPS.filter(
  (g) => !/^(past|lab alumni)/i.test(g.name),
).flatMap((g) => g.members);

export const PAST_MEMBERS: Person[] = MEMBER_GROUPS.filter((g) => /^(past|lab alumni)/i.test(g.name)).flatMap(
  (g) => g.members,
);

/* -------------------------------------------------------- publications -- */

/**
 * DOIs of the papers pinned to the top of the Publications page: every
 * THEME_PAPERS link that carries a DOI, in the order the themes list them.
 * Everything else comes from the generated data file.
 */
export const HIGHLIGHTED_DOIS: string[] = Array.from(
  new Set(
    Object.values(THEME_PAPERS)
      .flat()
      .map((p) => /10\.\d{4,9}\/[^\s?#]+/.exec(p.href)?.[0].toLowerCase())
      .filter((d): d is string => Boolean(d)),
  ),
);

/* ----------------------------------------------------------------- join */

/** The "Join the Lab!" panel on the home page. */
export const JOIN: { intro: string[]; cta: { label: string; href: string }[] } = {
  intro: [
    "If you're interested in joining the lab we welcome new students, postdocs and lab visitors!",
    "Canberra is a fantastic place to live and RSB and ANU a superb environment for EMCRs to flourish and grow",
  ],
  cta: [
    { label: "Get in touch!", href: "mailto:daniel.noble@anu.edu.au" },
    {
      label: "Canberra, a fantastic place to live",
      href: "https://study.anu.edu.au/stories/why-canberra-best-city-world-quality-life",
    },
  ],
};

/* ------------------------------------------------------------------ home */

/** The two lines under the home-page banner. */
export const HOME_INTRO: string[] = [
  "Welcome to the Noble Lab webpage!",
  "We are located in the Division of Ecology and Evolution in the Research School of Biology at the Australian National University (ANU)",
];

/** The two short home-page columns, each with its button. */
export const HOME_SECTIONS: { heading: string; text: string[]; cta: { label: string; to: string } }[] =
  [
    {
      heading: "Research Systems",
      text: [
        "We work on a diverse set of model systems, mainly reptiles, but also insects, fish and amphibians. We are open to new systems",
        "We conduct research in the field, lab and under semi-natural (mesocosm) conditions",
      ],
      cta: { label: "Our Facilities", to: "/gallery" },
    },
    {
      heading: "Research Questions",
      text: [
        "We are interested in how organisms and populations adapt to changing environments.",
        "We combine experimentation with simulation modelling and meta-analysis to tackle questions across diverse systems",
      ],
      cta: { label: "Our Research", to: "/research" },
    },
  ];

/** YouTube id of the video embedded on the home page, or null. */
export const HOME_VIDEO: string | null = "2f80ttu9vdg";

/** Title of that video, as the site's embed labels it. */
export const HOME_VIDEO_TITLE =
  "How Evolution Meets Ecology: A/Prof Daniel Noble on Biodiversity and Climate Change";

/* ------------------------------------------------------------------ news */

export type NewsTag = "Paper" | "Opportunities" | "Events" | "Award" | "Media" | "Lab";

export type NewsItem = {
  date: string; // ISO date, drives ordering
  tag: NewsTag;
  title: string;
  body: string;
  href?: string;
  image?: string;
  /** "contain" suits a logo, which must not be cropped. Photographs use cover. */
  imageFit?: "cover" | "contain";
};

/**
 * Newest first. Add an entry by copying a block; the date drives the ordering
 * and the tag drives the colour of the chip. Empty until there is news to add.
 */
export const NEWS: NewsItem[] = [];

/* -------------------------------------------------------------- software */

export const SOFTWARE_INTRO =
  "We have developed and/or contributed to a few different software packages which we hope are useful for the community.";

export type SoftwarePackage = {
  name: string;
  description: string;
  href: string;
  repo?: string;
  /** YouTube id, where the site embeds a video for the package. */
  video?: string;
  videoTitle?: string;
};

export const SOFTWARE: SoftwarePackage[] = [
  {
    name: "orchaRd",
    description:
      "Package for calculating marginalised or conditional meta-analytic means, calculating heterogeneity statistics, effect sizes and plotting orchard and bubble plots of meta-analytic models",
    href: "https://daniel1noble.github.io/orchaRd/",
  },
  {
    name: "metaDigitise",
    description: "R based package for extracting summary statistics from figures for meta-analysis",
    href: "https://github.com/daniel1noble/metaDigitise",
    repo: "https://github.com/daniel1noble/metaDigitise",
    video: "VhDrH2weyAk",
    videoTitle: "Scraping the data from graphs with {metaDigitise}",
  },
  {
    // typo fixed: the site spells the name "shinyDigise"; the repository is shinyDigitise
    name: "shinyDigitise",
    description: "The Graphical User Interface (GUI) of metaDigitise.",
    href: "https://github.com/EIvimeyCook/shinyDigitise",
    repo: "https://github.com/EIvimeyCook/shinyDigitise",
    video: "b9KvRsO8SPY",
    videoTitle: "ESMARConf2023: {shinyDigitise} tutorial",
  },
];

/* -------------------------------------------------------------- teaching */

export const TEACHING: {
  intro: string[];
  workshop: { title: string; description: string; href: string; embed: boolean };
} = {
  // typo fixed: "BIology" -> "Biology"
  intro: [
    "Below is material Dan has put together for a meta-analysis workshop that he's run at the Society for Experimental Biology, but he has also used it for teaching meta-analysis at various Universities.",
  ],
  workshop: {
    title: "Introduction to Meta-Analysis in Comparative Physiology",
    description: "Meta-analysis Workshop",
    href: "https://daniel1noble.github.io/meta-workshop/",
    embed: true,
  },
};

/* --------------------------------------------------------------- gallery */

export type GalleryPhoto = {
  src: string;
  thumb: string;
  alt: string;
  /** Only where the site captions the photograph; verbatim. */
  caption?: string;
  width: number;
  height: number;
};

export type GallerySection = {
  section: string;
  /** The section's introductory lines, verbatim from the Research Photos page. */
  intro: string[];
  photos: GalleryPhoto[];
};

const lab = (
  stem: string,
  alt: string,
  width: number,
  height: number,
  caption?: string,
): GalleryPhoto => ({
  src: `/images/${stem}.jpg`,
  thumb: `/images/${stem}-thumb.jpg`,
  alt,
  width,
  height,
  ...(caption ? { caption } : {}),
});

export const GALLERY: GallerySection[] = [
  {
    section: "Fieldwork",
    intro: [
      "We've worked on a bunch of different model systems, mainly lizards, which have taken us far and wide",
      "We've done fieldwork in Australia, Canada, France, China, Panama, US, UK, Costa Rica, Malaysia, and Vietnam",
      "Have a look through the photos of some of the wonderful and curious critters we've have the privilege of seeing in the wild",
    ],
    photos: [
      lab(
        "gallery-field-02-painted-dragon",
        "A dragon lizard on a weathered log in red sand country",
        1200,
        1600,
        "Painted Dragon",
      ),
      lab(
        "gallery-field-23-unhappy-sleepy-lizard",
        "A large stout-bodied lizard on red sand with its mouth open",
        1050,
        1400,
        "Unhappy Sleepy Lizard",
      ),
      lab(
        "gallery-field-24-sand-monitor",
        "A long-tailed lizard on red earth beside a pale-leaved shrub, casting a shadow",
        1050,
        1400,
        "Sand Monitor",
      ),
      // typo fixed: "Pygmy Bluetounge" -> "Pygmy Bluetongue"
      lab(
        "gallery-field-25-pygmy-bluetongue",
        "A small lizard resting in an open hand",
        1200,
        1600,
        "Pygmy Bluetongue",
      ),
      lab(
        "gallery-field-26-maria-island-tasmania",
        "Panorama of grassland and scattered trees running to sea cliffs under cloud",
        1600,
        469,
        "Maria Island, Tasmania",
      ),
      lab(
        "gallery-field-28-sleepy-lizard",
        "A large stout-bodied lizard on red soil among leaf litter, mouth open",
        1050,
        1400,
        "Sleepy lizard",
      ),
    ],
  },
  {
    section: "Lab facilities",
    intro: [
      "We have outstanding lab facilities at the ANU.",
      "Facilities include temperature controlled rooms that are capable of housing hundreds of animals as well as outdoor semi-natural enclosures",
      "We are also fortunate to have outstanding Animal Lab Technicians who help take care of all the animals",
    ],
    photos: [
      lab(
        "gallery-01-lab-shelving",
        "Shelving units of clear plastic lizard enclosures under strip lights and heat lamps",
        1600,
        1067,
      ),
      // typo fixed: the site's caption reads "MOre lizard enclosures"
      lab(
        "gallery-02-animal-room",
        "Rows of labelled clear plastic enclosures on black shelving in the lizard animal room",
        1600,
        1067,
        "More lizard enclosures",
      ),
      lab("gallery-03-heat-lamps", "Clear plastic enclosures beneath strip lights and heat lamps", 1600, 1067),
      lab("gallery-04-enclosures", "Labelled clear plastic enclosures with record cards on a shelf", 1600, 1067),
      lab(
        "gallery-05-shelving-tall",
        "Tall shelving of clear enclosures and heat lamps, viewed from below",
        1067,
        1600,
        "Lizard lab",
      ),
      lab("gallery-06-lizard-bark", "A small lizard sheltering under a piece of bark beside a pipe hide", 1600, 1067),
      lab(
        "gallery-07-lizard-pipe",
        "A small lizard emerging from a pipe hide onto green mesh in its enclosure",
        1600,
        1600,
      ),
      lab("gallery-08-lizard-in-hand", "A small lizard held gently between a researcher's fingers", 1600, 1067),
      lab("gallery-09-hatchling", "A hatchling lizard in a labelled cup of vermiculite held in a hand", 1600, 1067),
      lab("gallery-10-egg-cups", "Labelled cups of vermiculite, covered with film, on incubator racks", 1600, 1067),
      lab("gallery-11-incubator-hands", "Hands adjusting labelled cups on an incubator rack", 1600, 1067),
      lab("gallery-12-incubator-check", "A researcher examining a small cup beside laboratory incubators", 1600, 1067),
      lab("gallery-13-incubator-loading", "A researcher placing cups of vermiculite into an incubator", 1600, 1067),
      lab("gallery-14-crickets", "Crickets in a plastic container", 1600, 1067),
      lab(
        "gallery-15-animal-room-work",
        "A researcher working at a bench in the lizard animal room, surrounded by shelves of enclosures",
        1600,
        1067,
      ),
      lab("gallery-16-checking-tubs", "A researcher checking enclosures at a bench", 1600, 1067),
      lab("gallery-17-shelf-tub", "A researcher reaching into a shelf of enclosures, holding a small tub", 1600, 1067),
      lab(
        "gallery-18-stack-of-tubs",
        "A researcher smiling while holding a stack of small tubs beside shelves of enclosures",
        1600,
        1067,
      ),
      lab("gallery-19-lab-bench", "Two researchers preparing small tubs at a laboratory bench", 1600, 1067),
      lab(
        "gallery-20-holding-tubs",
        "A researcher holding a stack of small tubs in the animal room",
        1600,
        1067,
        "Pablo tending the eggs",
      ),
      lab("gallery-21-inspecting-tubs", "A researcher inspecting a stack of small tubs", 1600, 1067),
      lab("gallery-22-conversation", "A researcher in conversation in the laboratory", 1600, 1067),
      lab(
        "gallery-23-researcher-cup",
        "A researcher holding a small cup in front of shelves of enclosures",
        1600,
        1067,
        "Amelia with some eggs",
      ),
      lab(
        "gallery-24-lab-doorway",
        "Doorway into laboratory room G.31 with shelves of enclosures visible",
        1067,
        1600,
      ),
      lab("gallery-25-eggs", "Four small white eggs on vermiculite in a plastic container", 1600, 1067),
      lab(
        "gallery-26-animal-room-wide",
        "Wide view of the lizard animal room with shelving units of enclosures and a work trolley",
        1600,
        1600,
        "Lizard lab",
      ),
      lab("gallery-27-bench-prep", "Two researchers preparing tubs at a laboratory sink bench", 1600, 1067),
      lab("gallery-28-incubator-researcher", "A researcher beside a laboratory incubator", 1600, 1067),
      lab(
        "gallery-field-37-lab-experiments",
        "A blue trolley of small yellow-capped cups in a laboratory, with a person working at the far bench",
        1200,
        1600,
        "Dr. Kar doing experiments",
      ),
    ],
  },
];
