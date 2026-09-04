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
export type IconName =
  | "scholar"
  | "orcid"
  | "github"
  | "researchgate"
  | "bluesky"
  | "x"
  | "tea"
  | "globe"
  | "youtube"
  | "mail"
  | "cv";

export const LINKS: LinkItem[] = [
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=w69ezLIAAAAJ",
    icon: "scholar",
  },
  { label: "ORCID", href: "https://orcid.org/0000-0001-9460-8743", icon: "orcid" },
  { label: "GitHub", href: "https://github.com/daniel1noble", icon: "github" },
  {
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Daniel-Noble-2",
    icon: "researchgate",
  },
  { label: "Bluesky", href: "https://bsky.app/profile/danielwanoble.bsky.social", icon: "bluesky" },
  { label: "X", href: "https://x.com/DanielWANoble", icon: "x" },
  {
    label: "Thermal Ecology Alliance",
    href: "https://www.thermalecologyalliance.org/",
    icon: "tea",
  },
];

/** Daniel's own wording (29 Aug 2026); shown on the Join us page. */
export const TEA = {
  eyebrow: "Thermal Ecology Alliance",
  title: "Joining the Thermal Ecology Alliance",
  text: [
    "Daniel is one of the organisers of the Thermal Ecology Alliance.",
    "Anyone interested in how temperature shapes life can join the Thermal Ecology Alliance. Please sign up through the Alliance's website.",
  ],
  href: "https://www.thermalecologyalliance.org/",
  label: "thermalecologyalliance.org",
};

/** No CV file is published; pages hide the CV button while this is null. */
export const CV_URL: string | null = null;

/**
 * Public path of the logo mark shown beside the wordmark, e.g.
 * "/images/logo-mark.png". No mark has been drawn yet, so this stays null and
 * LogoMark renders nothing (no request, no layout shift) until a file exists.
 */
export const LOGO_MARK: string | null = "/images/logo-mark.png";

/* -------------------------------------------------------------- research */

/** The "What we do?" introduction on the Research page, paragraph by paragraph. */
export const RESEARCH_INTRO: string[] = [
  "Fundamentally, we are interested in how organisms respond and adapt to changing environments.",
  "Our work is highly integrative. We combine theory, modelling and meta-analysis with experimentation to understand and predict how and why populations are able to adapt (or not) to changing environments.",
  "Our work focuses on the impacts of diverse environmental stressors, from extreme heat to novel anthropogenic stressors (e.g., pesticides, plastics), and how they interact across an individuals life cycle to affect physiology, growth, fitness and ultimately population growth and adaptive evolution.",
  "Our study systems are diverse, but generally focus on lizards, insects, fish and amphibians.",
  "Below we detail some of the major (more recent) research themes in our group.",
];

/**
 * The photographs shown beside that introduction: a small collage of the
 * animals the lab works on and photographs from the field, so the opening
 * paragraphs are not a wall of text. Reptiles, an amphibian and insects, to
 * match the study systems the last paragraph names.
 *
 * Square 900px crops of the fieldwork photographs from the Google Site, in
 * public/images (see that folder's manifest). `alt` describes only what is
 * visible; the painted dragon is the one animal the site's own captions name.
 * `span` is the tile's place in the three-column mosaic: the first photograph
 * takes a two-by-two block, the rest are single cells.
 */
export type CollagePhoto = { src: string; alt: string; span?: string };

export const RESEARCH_COLLAGE: CollagePhoto[] = [
  {
    src: "/images/collage-painted-dragon.jpg",
    alt: "A painted dragon on a weathered log in red-sand country",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/collage-red-frog.jpg",
    alt: "A small bright red frog with pale blue legs on a mossy tree trunk",
  },
  {
    src: "/images/collage-green-beetle.jpg",
    alt: "A metallic green beetle on lichen-covered bark",
  },
  {
    src: "/images/collage-caterpillar.jpg",
    alt: "A bright orange hairy caterpillar on a green plant stem",
  },
  {
    src: "/images/collage-crested-lizard.jpg",
    alt: "A crested lizard gripping a plant stem at night",
  },
  {
    src: "/images/collage-butterfly.jpg",
    alt: "A brown and white butterfly resting on stony ground",
  },
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
    image: "/images/theme-1-1.webp",
    images: [
      {
        src: "/images/theme-1-1.webp",
        alt: "Figure: coupled mechanistic models of thermal exposure/sensitivity",
        width: 1400,
        height: 980,
      },
      {
        src: "/images/theme-1-2.webp",
        alt: "Figure: plant/grasshopper multi-panel diagram",
        width: 1400,
        height: 617,
      },
      {
        // Figures 6 and 5 of the 2026 thermal-tolerance preprint (transparent WebP, shared with the Software page).
        src: "/images/figure-bayestls.webp",
        alt: "Figure: heat-injury accumulation and predicted survival under field temperature series for a vinegar fly and three cereal aphids",
        width: 1800,
        height: 1469,
      },
      {
        src: "/images/figure-freqtls.webp",
        alt: "Figure: posterior densities of thermal sensitivity and critical thermal limit across four case studies",
        width: 1800,
        height: 1280,
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
    image: "/images/theme-2-1.webp",
    images: [
      {
        src: "/images/theme-2-1.webp",
        alt: "Figure: population ecology / energy allocation / mitochondrial bioenergetics flow diagram",
        width: 1142,
        height: 1400,
      },
      {
        src: "/images/theme-2-2.webp",
        alt: "Figure: orchard plot of lnRR Q10 by habitat",
        width: 1400,
        height: 1148,
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
    image: "/images/theme-3-1.webp",
    images: [
      {
        src: "/images/theme-3-1.webp",
        alt: "Figure: polar plot and trait-space diagram of plasticity vectors",
        width: 981,
        height: 1400,
      },
      {
        src: "/images/theme-3-2.webp",
        alt: "Figure: stacked bar chart of variance components",
        width: 540,
        height: 425,
      },
      {
        src: "/images/theme-3-3.webp",
        alt: "Figure: luminance/chromatic contrast vs background environment with chameleon illustrations",
        width: 1400,
        height: 783,
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
    image: "/images/theme-4-1.webp",
    images: [
      {
        src: "/images/theme-4-1.webp",
        alt: "Figure: effect-size taxonomy",
        width: 1400,
        height: 677,
      },
      {
        src: "/images/theme-4-2.webp",
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
      // Published version (was the EcoEvoRxiv preprint on the old site); details from publications.json.
      citation:
        "Noble et al. 2026. A systems modelling approach to predict biological responses to extreme heat. Trends in Ecology & Evolution, 41(5), 451-464.",
      href: "https://doi.org/10.1016/j.tree.2026.01.009",
    },
    {
      // bayesTLS/freqTLS preprint (Daniel, 30 Aug 2026); details from publications.json.
      citation:
        "Noble et al. 2026. A flexible modelling framework for estimating thermal tolerance and sensitivity. bioRxiv preprint.",
      href: "https://doi.org/10.64898/2026.07.16.738378",
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
  photo: "/images/people-daniel-noble-garden.jpg",
  links: [
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=w69ezLIAAAAJ" },
    { label: "ORCID", href: "https://orcid.org/0000-0001-9460-8743" },
    { label: "ResearchGate", href: "https://www.researchgate.net/profile/Daniel-Noble-2" },
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
        name: "Xinyi Liu",
        role: "PhD student",
        years: "(2026 – Present)",
        photo: "/images/people-xingyi-xiu.jpg",
        bio: [
          "I moved from my MSc into a PhD at ANU, where I study the effects of micro-plastics on freshwater aquatic insects. My current research focuses on how plastic pollution and temperature interact to affect life-history traits such as survival, growth, development, and emergence. Using chironomid midges as a model system, I am interested in understanding how responses to micro-plastics vary across life stages and environmental conditions. My work combines experimental approaches with evidence synthesis to better understand the ecological impacts of plastic pollution in freshwater ecosystems.",
        ],
        links: [],
      },
    ],
  },
  {
    name: "MSc/Honours Students",
    members: [
    ],
  },
  {
    // Visitors (Daniel, 31 Aug 2026). Text verbatim from docs/people/Text-Qian.docx.
    name: "Visitors",
    members: [
      {
        name: "Qian Hu",
        role: "Visiting PhD student",
        years: "(2025 – Present)",
        photo: "/images/people-qian-hu.jpg",
        bio: [
          "I'm a PhD student at Beijing Forestry University, currently based at ANU for a year-long research placement in the Dan Lab. My research explores how birds adjust their reproductive strategies and parental care to changing thermal environments, and how these adjustments shape embryonic development and reproductive outcomes. Here at ANU, I'm using meta-analysis to investigate how incubation temperature influences avian embryonic development, and how reproductive strategies shape thermal plasticity across species.",
        ],
        links: [{ label: "Website", href: "https://awingqian.github.io/QianWebpage/" }],
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
        // Six-month postdoc with Daniel (his account, 1 Sep 2026). Current role and
        // PhD from theconversation.com/profiles/maider-iglesias-carrasco-1536710.
        name: "Dr. Maider Iglesias-Carrasco",
        role: "Past postdoctoral researcher",
        years: "(2020 - 2021)",
        note: "ANU Futures Postdoctoral Fellow",
        photo: "/images/people-maider-iglesias-carrasco.jpg",
        bio: [
          "Maider studies how human-altered habitats affect the behaviour and physiology of animals, and the long-term consequences of those effects. She is now a postdoctoral researcher at the Estacion Biologica de Donana (EBD-CSIC) in Seville.",
        ],
        links: [
          { label: "Google Scholar", href: "https://scholar.google.com/citations?user=nAoSHNUAAAAJ" },
          { label: "ORCID", href: "https://orcid.org/0000-0003-0349-7967" },
        ],
      },
      {
        // Endeavour Fellowship at UNSW, co-hosted with Lisa Schwanz (Daniel's account).
        // Current role: mta.ca/directory/julia-riley.
        name: "Dr. Julia Riley",
        role: "Past postdoctoral researcher",
        years: "(2018)",
        note: "Endeavour Research Fellowship at UNSW; co-hosted with Lisa Schwanz",
        photo: "/images/people-julia-riley.jpg",
        bio: [
          "Julia's research spans the natural history, behavioural ecology, evolutionary biology and conservation of amphibians and reptiles. She is now an Associate Professor at Mount Allison University and Canada Research Chair in Integrative Wildlife Ecology.",
        ],
        links: [
          { label: "Website", href: "https://www.rbglabs.ca/rileyecology-welcome" },
          { label: "Google Scholar", href: "https://scholar.google.com/citations?user=SYDzQYEAAAAJ" },
          { label: "ORCID", href: "https://orcid.org/0000-0001-7691-6910" },
        ],
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
    // The alumni split by degree (Daniel, 1 Sep 2026).
    name: "Past PhD students",
    members: [
      {
        // PhD UNSW 2016-2021 (her ORCID/site); co-advised with Shinichi Nakagawa.
        // Current role: research.monash.edu/en/persons/fonti-kar.
        name: "Dr. Fonti Kar",
        role: "Past PhD student",
        years: "(2015 - 2021)",
        note: "UNSW; co-advised with Shinichi Nakagawa",
        photo: "/images/people-fonti-kar.jpg",
        bio: [
          "Fonti's PhD asked how developmental temperature shapes phenotypic development and evolution. She is now a Lecturer in Econometrics and Business Statistics at Monash University, and describes herself as an evolutionary biologist wearing R developer and educator shoes.",
        ],
        links: [
          { label: "Website", href: "https://fontikar.github.io/" },
          { label: "Google Scholar", href: "https://scholar.google.com/citations?user=4hGqp6sAAAAJ" },
          { label: "ORCID", href: "https://orcid.org/0000-0002-2760-3974" },
          { label: "GitHub", href: "https://github.com/fontikar" },
          { label: "Bluesky", href: "https://bsky.app/profile/fontikar.bsky.social" },
        ],
      },
      {
        // PhD Macquarie 2016-2019 (ORCID). Pronouns they/them, per their own Bluesky bio.
        name: "Dr. Birgit Szabo",
        role: "Past PhD student",
        years: "(2015 - 2019)",
        note: "Macquarie University; co-advised with Martin Whiting",
        photo: "/images/people-birgit-szabo.jpg",
        bio: [
          "Birgit's PhD studied behavioural flexibility and learning in lizards of the Egernia group. They are now a postdoctoral researcher at Ghent University, linking early-life experience to the development of behaviour and cognition to improve welfare in chickens.",
        ],
        links: [
          { label: "Website", href: "https://birgitszabo.wixsite.com/cogsciresearch" },
          { label: "Google Scholar", href: "https://scholar.google.com/citations?user=BtJUB2YAAAAJ" },
          { label: "ORCID", href: "https://orcid.org/0000-0002-3226-8621" },
          { label: "Bluesky", href: "https://bsky.app/profile/birgitszabo.bsky.social" },
        ],
      },
      {
        // PhD University of Tasmania, completed 2018; Geoff While main advisor,
        // Daniel co-advisor (his account). Current role: discover.utas.edu.au.
        name: "Kirke L. Munch",
        role: "Past PhD student",
        years: "(2015 - 2019)",
        note: "Co-advised with Geoff While at the University of Tasmania",
        photo: null,
        bio: [
          "Kirke's PhD, Learning from lizards, examined the causes and consequences of plasticity. She is now a Senior Research Project Officer in the Office of Health at the University of Tasmania.",
        ],
        links: [{ label: "ORCID", href: "https://orcid.org/0000-0003-2929-6805" }],
      },
      {
        name: "Pablo Recio",
        role: "Past PhD student",
        years: "(2022 – 2025)",
        now: "Now a postdoctoral researcher at Flinders University",
        photo: "/images/people-pablo-recio.jpg",
        bio: [
          "My research focused mainly on the evolution of animal behaviour, using reptiles as a model species. During my PhD I aimed to unravel how maternal condition together with early environment affect cognitive abilities of the delicate skink. I am highly skilled at catching lizards with a fishing rod.",
        ],
        links: [{ label: "ResearchGate", href: "https://www.researchgate.net/profile/Pablo-Recio" }],
      },
    ],
  },
  {
    name: "Past Honours students",
    members: [
      {
        // Honours (H2A), ANU, 2020; primary supervisor Daniel. Thesis title and year
        // from the promotion CV (ANU_Promotion/cv-noble/cv-noble.pdf, p. 7).
        name: "Eoin Noble",
        role: "Past Honours student",
        years: "(2020)",
        photo: null,
        bio: [
          "Eoin's Honours thesis looked at the impact of developmental temperature and maternal investment on fitness, metabolism and life history in two species of Australian lizards.",
        ],
        links: [],
      },
      {
        name: "Niamh O'Kelly",
        role: "Past Honours student",
        years: "(2025 – 2026)",
        photo: "/images/people-niamh-okelly.jpg",
        bio: [
          "Niamh was co-advised by Bernd Gruber at UC. She worked on developing eDNA sampling protocols for detecting the critically endangered Canberra Earless Dragon.",
        ],
        links: [],
      },
      {
        name: "Amelia Peardon",
        role: "Past Honours student",
        years: "(2024 – 2025)",
        photo: "/images/people-amelia-peardon.jpg",
        // typo fixed: "challanges" -> "challenges"
        bio: [
          "Amelia explored new approaches to measuring thermal load sensitivity for cells, to overcome challenges in applying these methods in vertebrates.",
        ],
        links: [],
      },
      {
        name: "Aidan Lowe",
        role: "Past Honours student",
        years: "(2024 – 2025)",
        photo: null,
        bio: [
          "Aidan looked at how mito-nuclear discordance impacts mitochondrial function in grasshoppers and flour beetles.",
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
  "We study how ectotherms adapt to a changing environment. Explore our research and meet the team to find out more about the kinds of questions we ask." // Daniel's wording, 30 Aug 2026,
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
  /**
   * Verbatim from the source named in the comment above each entry: the old
   * Google Site for the first three packages, CRAN or the repository's own
   * description for the rest. Never rewritten.
   */
  description: string;
  /** The package's front door: its website where it has one, else its repository. */
  href: string;
  /** Repository. Every package has one, so this is not optional. */
  github: string;
  /** CRAN landing page, for the packages published there. */
  cran?: string;
  /** Version string, verbatim from the Version field of the CRAN page. */
  version?: string;
  /** Public path of the hex sticker, for the packages that have one. */
  hex?: string;
  /** YouTube id, where the site embeds a video for the package. */
  video?: string;
  videoTitle?: string;
  /** A figure shown where a package has no video (public path + alt text). */
  figure?: { src: string; alt: string };
  /**
   * Verbatim from the Author field of the CRAN page, where the site should not
   * leave the reader to guess who wrote and maintains the package.
   */
  authors?: string;
};

/**
 * Links, versions and authorship checked against CRAN and the repositories on
 * 29 August 2026; the source for each entry is named in its comment. Hex
 * stickers live in public/images and are listed in that folder's manifest.
 */
export const SOFTWARE: SoftwarePackage[] = [
  {
    // description: the repository's own one-line description on GitHub.
    // Version and authors: https://CRAN.R-project.org/package=bayesTLS
    // (1.0.0, published 2026-07-21). No hex sticker exists.
    name: "bayesTLS",
    description: "A flexible model for estimating thermal tolerance and sensitivity",
    href: "https://daniel1noble.github.io/bayesTLS/",
    github: "https://github.com/daniel1noble/bayesTLS",
    cran: "https://CRAN.R-project.org/package=bayesTLS",
    version: "1.0.0",
    authors:
      "Daniel W. A. Noble [aut, cre], Pieter A. Arnold [aut], Shinichi Nakagawa [aut], Patrice Pottier [aut]",
    figure: {
      src: "/images/figure-bayestls.webp",
      alt: "Heat-injury accumulation and predicted survival under field temperature–time series, panels for a vinegar fly by sex and three cereal aphid species",
    },
    hex: "/images/hex-bayestls.png",
  },
  {
    // description: the first sentence of the Description field on
    // https://CRAN.R-project.org/package=freqTLS (0.1.0, published 2026-07-21),
    // quoted as written. authors: the Author field of the same page; the
    // package is written and maintained by Shinichi Nakagawa, not by the lab.
    // No hex sticker exists.
    // Description follows CRAN's wording except that Nakagawa is named among the bayesTLS authors (Daniel, 30 Aug 2026; matches bayesTLS's CRAN Author field).
    name: "freqTLS",
    description:
      "A maximum-likelihood implementation of the thermal-load-sensitivity framework for thermal death-time modelling introduced by Noble, Arnold, Nakagawa and Pottier in the 'bayesTLS' package, providing the frequentist counterpart to that Bayesian workflow.",
    href: "https://itchyshin.github.io/freqTLS/",
    github: "https://github.com/itchyshin/freqTLS",
    cran: "https://CRAN.R-project.org/package=freqTLS",
    version: "0.1.0",
    authors:
      "Shinichi Nakagawa [aut, cre, cph], Pieter A. Arnold [aut] (co-author of the bayesTLS framework), Patrice Pottier [aut] (co-author of the bayesTLS framework), Daniel W. A. Noble [aut] (senior author of the bayesTLS thermal-load-sensitivity framework)",
    figure: {
      src: "/images/figure-freqtls.webp",
      alt: "Posterior densities of thermal sensitivity (z) and the critical thermal limit (CTmax) across four case studies",
    },
    hex: "/images/hex-freqtls.png",
  },
  {
    // description: the old Google Site, unchanged. Version and links:
    // https://CRAN.R-project.org/package=orchaRd and the repository.
    name: "orchaRd",
    description:
      "Package for calculating marginalised or conditional meta-analytic means, calculating heterogeneity statistics, effect sizes and plotting orchard and bubble plots of meta-analytic models",
    href: "https://daniel1noble.github.io/orchaRd/",
    github: "https://github.com/daniel1noble/orchaRd",
    cran: "https://CRAN.R-project.org/package=orchaRd",
    version: "2.2.1",
    // Hex sticker: hex/orchaRd_hex.png in github.com/daniel1noble/orchaRd (added 29 Aug 2026).
    hex: "/images/hex-orchard.png",
    // Figure: from the package README on daniel1noble.github.io/orchaRd (orchard plot of lnRR by trait category).
    figure: {
      src: "/images/figure-orchard.webp",
      alt: "Orchard plot of log response ratios for four trait categories, with precision-scaled points, mean estimates and intervals",
    },
  },
  {
    // description: the old Google Site, unchanged. Version and links:
    // https://CRAN.R-project.org/package=metaDigitise and the repository.
    // Hex sticker: inst/shinyDigitise/www/img/metaDigitise_logo.png in
    // github.com/EIvimeyCook/shinyDigitise.
    name: "metaDigitise",
    description: "R based package for extracting summary statistics from figures for meta-analysis",
    href: "https://github.com/daniel1noble/metaDigitise",
    github: "https://github.com/daniel1noble/metaDigitise",
    cran: "https://CRAN.R-project.org/package=metaDigitise",
    version: "1.0.2",
    hex: "/images/hex-metadigitise.png",
    video: "VhDrH2weyAk",
    videoTitle: "Scraping the data from graphs with {metaDigitise}",
  },
  {
    // typo fixed: the site spells the name "shinyDigise"; the repository is shinyDigitise.
    // Not on CRAN. Hex sticker: inst/shinyDigitise/www/img/shinyDigitise.png
    // in the same repository.
    name: "shinyDigitise",
    description: "The Graphical User Interface (GUI) of metaDigitise.",
    href: "https://github.com/EIvimeyCook/shinyDigitise",
    github: "https://github.com/EIvimeyCook/shinyDigitise",
    hex: "/images/hex-shinydigitise.png",
    video: "b9KvRsO8SPY",
    videoTitle: "ESMARConf2023: {shinyDigitise} tutorial",
  },
];

/* -------------------------------------------------------------- teaching */

export const TEACHING: {
  intro: string[];
  workshops: { title: string; description: string; href: string; repo?: string; embed: boolean }[];
} = {
  // Daniel's wording, 30 Aug 2026.
  intro: [
    "Dan teaches a number of undergraduate courses including Comparative Physiology, Functional Ecology, Diversity of Life and Ecology. Dan has also taught quantitative courses such as Data Science for Biologists and given numerous workshops on meta-analysis methods and approaches in biology.",
    "Below is access to the meta-analysis workshop materials I've taught in the past and continue to teach.",
  ],
  workshops: [
    {
      // The SEB workshop reworked for Lund University (Daniel, 30 Aug 2026).
      title: "Meta-Analysis Workshop",
      description: "Lund University",
      href: "https://daniel1noble.github.io/meta-analysis_workshop/",
      repo: "https://github.com/daniel1noble/meta-analysis_workshop",
      embed: true,
    },
    {
      title: "Introduction to Meta-Analysis in Comparative Physiology",
      description: "Society for Experimental Biology",
      href: "https://daniel1noble.github.io/meta-workshop/",
      embed: true,
    },
  ],
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
      {
        src: "/images/gallery-field-40-broad-headed-snake.jpg",
        thumb: "/images/gallery-field-40-broad-headed-snake-thumb.jpg",
        alt: "A broad-headed snake coiled on dark rock, banded head clear at the edge of the coil",
        caption: "Broad-headed snake",
        width: 1600,
        height: 1067,
      },
      {
        src: "/images/gallery-field-41-india-viper.jpg",
        thumb: "/images/gallery-field-41-india-viper-thumb.jpg",
        alt: "A saw-scaled viper coiled on granite at night",
        caption: "Saw-scaled viper, India, June 2023",
        width: 1600,
        height: 1023,
      },
      {
        src: "/images/gallery-field-42-india-gecko.jpg",
        thumb: "/images/gallery-field-42-india-gecko-thumb.jpg",
        alt: "A marbled gecko in profile on pale granite at night",
        caption: "Gecko, India, June 2023",
        width: 1600,
        height: 991,
      },
      {
        src: "/images/gallery-field-43-india-golden-frog.jpg",
        thumb: "/images/gallery-field-43-india-golden-frog-thumb.jpg",
        alt: "A golden-brown frog sitting on a rock among grass at night",
        caption: "Frog, India, June 2023",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/gallery-field-44-india-rock-lizard.jpg",
        thumb: "/images/gallery-field-44-india-rock-lizard-thumb.jpg",
        alt: "A lizard with orange limbs pressed against granite at night",
        caption: "Rock lizard, India, June 2023",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/gallery-field-45-india-toad.jpg",
        thumb: "/images/gallery-field-45-india-toad-thumb.jpg",
        alt: "A warty toad in profile on a concrete step",
        caption: "Toad, India, June 2023",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/gallery-field-46-india-moth.jpg",
        thumb: "/images/gallery-field-46-india-moth-thumb.jpg",
        alt: "A moth with eyespot wing markings resting on a rendered wall",
        caption: "Moth, India, June 2023",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/gallery-field-47-india-chameleon.jpg",
        thumb: "/images/gallery-field-47-india-chameleon-thumb.jpg",
        alt: "A bright green chameleon in full profile held on fingers at night",
        caption: "Chameleon, India, June 2023",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/gallery-field-48-india-vine-snake.jpg",
        thumb: "/images/gallery-field-48-india-vine-snake-thumb.jpg",
        alt: "A slender green vine snake looped through a hand at night, head raised",
        caption: "Vine snake, India, June 2023",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/gallery-field-49-india-lizard.jpg",
        thumb: "/images/gallery-field-49-india-lizard-thumb.jpg",
        alt: "A lizard held upright in a hand with its mouth open, showing an orange and black throat",
        caption: "Lizard, India, June 2023",
        width: 1200,
        height: 1600,
      },
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
      {
        src: "/images/gallery-30-mesocosms.jpg",
        thumb: "/images/gallery-30-mesocosms-thumb.jpg",
        alt: "Rows of circular outdoor mesocosm tanks under shade-cloth netting, with greenhouses behind",
        caption: "Outdoor mesocosms",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/gallery-31-mesocosms-netting.jpg",
        thumb: "/images/gallery-31-mesocosms-netting-thumb.jpg",
        alt: "Circular mesocosm tanks under fine netting on a gravel pad",
        caption: "Outdoor mesocosms",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/gallery-32-mesocosm-tank.jpg",
        thumb: "/images/gallery-32-mesocosm-tank-thumb.jpg",
        alt: "A circular mesocosm tank with a gravel and rock centre, greenhouses behind",
        caption: "Outdoor mesocosms",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/gallery-33-mesocosm-compound.jpg",
        thumb: "/images/gallery-33-mesocosm-compound-thumb.jpg",
        alt: "The mesocosm compound under construction on a gravel pad, seen from the road",
        caption: "Outdoor mesocosms",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/gallery-34-fms.jpg",
        thumb: "/images/gallery-34-fms-thumb.jpg",
        alt: "A Sable Systems FMS respirometry unit in its case, with tubing and cables connected",
        caption: "Sable Systems FMS",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/gallery-35-fms-unit.jpg",
        thumb: "/images/gallery-35-fms-unit-thumb.jpg",
        alt: "A Sable Systems Field Metabolic System unit in its case",
        caption: "Sable Systems FMS respirometry unit",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/gallery-36-respirometry-rig.jpg",
        thumb: "/images/gallery-36-respirometry-rig-thumb.jpg",
        alt: "A flow multiplexer and gas analyser with tubing on a lab bench",
        caption: "Respirometry rig: flow multiplexer and gas analyser",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/gallery-37-respirometry-chambers.jpg",
        thumb: "/images/gallery-37-respirometry-chambers-thumb.jpg",
        alt: "A row of small respirometry chambers connected by tubing to a multiplexer",
        caption: "Respirometry chambers",
        width: 1600,
        height: 1200,
      },
    ],
  },
];


/**
 * Home page "Lab life" photos (Daniel, 29 Aug 2026). The ASH caption is the old
 * Google Site's own caption, verbatim; the outing caption is Daniel's description.
 */
export const LAB_LIFE: { src: string; alt: string; caption: string; width: number; height: number }[] = [
  {
    src: "/images/lab-life-outing.jpg",
    alt: "Seven lab members standing in front of a 'Riddle Room Canberra' sign",
    caption: "A lab social outing",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/lab-life-ash-2025.jpg",
    alt: "Five lab members under a green and black balloon arch at a conference social",
    caption: "Part of the Noble lab @ the Australasian Society of Herpetology Meeting, Coffs Harbour, 2025",
    width: 1600,
    height: 998,
  },
];


/**
 * Journal covers featuring the lab's work, carried over from the old Google
 * Site's Publications page (Daniel, 30 Aug 2026). Captions name only what the
 * cover itself prints. The Evolutionary Ecology cover comes from
 * Springer's issue-cover endpoint (the old site had only a thumbnail).
 */
export const COVERS: { src: string; alt: string; caption: string; href?: string; width: number; height: number }[] = [
  {
    src: "/images/cover-science-advances-2022.jpg",
    alt: "Science Advances cover, 13 May 2022: a horned chameleon on a branch",
    caption: "Science Advances, 13 May 2022",
    width: 874,
    height: 1200,
  },
  {
    src: "/images/cover-jeb-evol-biol-2021.jpg",
    alt: "Journal of Evolutionary Biology cover, volume 34 issue 3, March 2021: a lizard on leaf litter",
    caption: "Journal of Evolutionary Biology 34(3), March 2021",
    width: 730,
    height: 1000,
  },
  {
    src: "/images/cover-j-exp-biol-2024.jpg",
    alt: "Journal of Experimental Biology cover, volume 227 issue 24, December 2024: a skink on a dead leaf",
    caption: "Journal of Experimental Biology 227(24), December 2024",
    href: "https://journals.biologists.com/jeb/issue/227/24",
    width: 520,
    height: 675,
  },
  {
    src: "/images/cover-evol-ecol-2022.jpg",
    alt: "Evolutionary Ecology cover, volume 36 number 2, 2022: several dark skinks on pale bark",
    caption: "Evolutionary Ecology 36(2), 2022",
    href: "https://link.springer.com/journal/10682/volumes-and-issues/36-2",
    width: 827,
    height: 1263,
  },
];
