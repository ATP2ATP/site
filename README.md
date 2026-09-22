# ATP² site

Static site for allthepowertoallthepeople.world, built with [Eleventy](https://www.11ty.dev/).

## Local setup

```
npm install
npm start        # dev server with live reload, usually http://localhost:8080
npm run build    # outputs the finished site to _site/
```

No other tooling required — Eleventy is the only dependency.

## Where things live

Almost everything you'll want to change on a regular basis is content, not code:

| To change...                          | Edit...                                  |
|----------------------------------------|-------------------------------------------|
| Site name, tagline, nav links          | `src/_data/site.json`                     |
| Colours, type, spacing (the whole look)| `src/css/tokens.css`                      |
| Layout/components (buttons, cards...)  | `src/css/style.css`                       |
| Webring / recommended links            | `src/_data/links.json`                    |
| A knowledgebase guide                  | add a `.md` file in `src/knowledgebase/`  |
| An article / post                      | add a `.md` file in `src/articles/`       |
| The "Get Involved" copy and contact links | `src/get-involved.njk`                 |

Adding a new knowledgebase guide or article is just a new Markdown file with
frontmatter — copy an existing one as a template. Nothing else needs updating;
listing pages, the homepage's "Recently added", and the Atom feed all pull
from the same content automatically.

## Fonts

The site ships wired for two self-hosted, open-licensed typefaces —
**Big Shoulders** (headlines) and **Public Sans** (body) — but the actual
font files aren't included, since this starter was generated without
network access. Until you add them, the site falls back to a solid system
font stack, so nothing is broken.

To finish it: download the woff2 files for Big Shoulders (weight 700) and
Public Sans (weights 400 and 600) — both are open source and available via
Google Fonts or [Fontsource](https://fontsource.org/) — and place them at:

```
src/assets/fonts/big-shoulders-700.woff2
src/assets/fonts/public-sans-400.woff2
src/assets/fonts/public-sans-600.woff2
```

The `@font-face` rules in `src/css/style.css` already point at these paths.
Self-hosting rather than linking a Google Fonts CDN means no visitor
request ever leaves the site just to render text.

## Deploying to Netlify

1. Push this repo to GitHub (private repo recommended — Netlify's free tier
   doesn't require public).
2. In Netlify: **Add new site → Import an existing project**, authorize
   just this repo.
3. Build command and publish directory are already set via `netlify.toml`
   (`npm run build` → `_site`), so Netlify should detect them automatically.
4. Add `allthepowertoallthepeople.world` as a custom domain in site
   settings, then point the DNS records Netlify gives you at your
   registrar. Free SSL issues automatically once DNS propagates.
5. Leave Netlify Analytics, Forms, and Identity **off** unless you
   specifically want them — bare static hosting keeps their footprint on
   visitor data minimal.

## The Atom feed

`src/feed.njk` builds `/feed.xml` by hand (no `eleventy-plugin-rss`
dependency) from the combined knowledgebase + articles collections, newest
first. `/feed` redirects to `/feed.xml` via `netlify.toml` for a shorter
link to share.
