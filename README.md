<div align="center">

# Noble Lab

**Evolutionary, Ecological and Conservation Physiology**

Division of Ecology & Evolution, Research School of Biology<br>
The Australian National University, Canberra

[**www.noblelab.org**](https://www.noblelab.org)

</div>

---

We are interested in how organisms respond and adapt to changing environments.
Our work is highly integrative: we combine theory, modelling and meta-analysis
with experimentation to understand and predict how and why populations are able
to adapt (or not) to changing environments. Our study systems are diverse, but
generally focus on lizards, insects, fish and amphibians.

The lab is led by [Daniel Noble](https://www.noblelab.org/people/) at the
Australian National University.

## What we work on

- Predicting the effects of extreme heat on organisms
- How different early developmental environments interact to impact physiology and life history
- Relative role of phenotypic plasticity and adaptive genetic evolution to population divergence
- Developing new statistical approaches and software for meta-analysis and experimental data

Each theme is written up, with selected publications, on the
[research page](https://www.noblelab.org/research/). The software we have developed
or contributed to (orchaRd, metaDigitise, shinyDigitise) is on the
[software page](https://www.noblelab.org/software/).

## Join us

We welcome new students, postdocs and lab visitors. Get in touch at
[daniel.noble@anu.edu.au](mailto:daniel.noble@anu.edu.au).

## About this repository

This repository holds the source of the lab website: a React and Vite
application, styled with Tailwind, deployed to GitHub Pages by the workflow in
`.github/workflows/pages.yml` on every push to `main`. The release uses relative
entry assets plus a runtime public-asset base, so it works both at
`daniel1noble.github.io/noblelab/` and at the custom-domain root once DNS is
active. `public/CNAME` records that custom domain (`www.noblelab.org`). Built
from the open-source lab_website by Patrice Pottier
(github.com/p-pottier/lab_website).

### Editing the content

Everything written by hand lives in one file, `src/content/site.ts`: the lab
name and address, research themes and their selected publications, people,
software, the teaching workshop, gallery captions and news. Page titles and
descriptions for search engines live in `src/content/route-meta.json`, which
also drives the prerendered route directories and the sitemap. Photographs are
in `public/images/`, with `public/images/manifest.json` recording their public
metadata and accessibility text.

```bash
npm install
npm run dev        # local preview
npm run typecheck  # tsc
npm run build      # production build, then prerender + sitemap
```

### How the data refresh works

Publications, citation counts and the collaborator map are not edited by hand.
`scripts/fetch-data.mjs` reads the works on Daniel's ORCID record, looks each
DOI up in Crossref and OpenAlex, and writes `public/data/publications.json`,
`metrics.json` and `collaborators.json`. The workflow in
`.github/workflows/refresh-data.yml` runs it nightly and commits any change, so
the site stays current without anyone editing it. `public/data/scholar.json`
is an optional Google Scholar snapshot produced by `scripts/scholar_refresh.py`.

The optional browser utilities in `scripts/` (`smoke.mjs`, `shot.mjs`,
`make-favicon.mjs`, `prepare-logo.mjs`, `render-ai.mjs`) drive a headless
Chromium through Playwright, which is not a declared dependency. Install it
first with `npm i -D playwright && npx playwright install chromium`; the build,
lint and workflows do not need it.

## Elsewhere

[Website](https://www.noblelab.org) ·
[Google Scholar](https://scholar.google.com/citations?user=w69ezLIAAAAJ) ·
[ORCID](https://orcid.org/0000-0001-9460-8743) ·
[GitHub](https://github.com/daniel1noble) ·
[Bluesky](https://bsky.app/profile/danielwanoble.bsky.social)
