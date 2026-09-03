# Torts Simplified

The Torts Simplified website, built as an R Markdown site and published with GitHub Pages.

Three pages: `index.Rmd` (home and about), `services.Rmd`, `contact.Rmd`.

## What you need

R, and the `rmarkdown` package. RStudio makes this easiest but is not required.

```r
install.packages("rmarkdown")
```

## Building the site

In RStudio, open `torts-simplified.Rproj` and press **Build Website** on the Build tab.

From the console or terminal:

```r
source("build.R")
```

Either way the finished site lands in `docs/`. That folder is the site. Everything else in the repo is source.

## Publishing

1. Push the repo to GitHub, including `docs/`.
2. Repository **Settings** to **Pages**.
3. Source: **Deploy from a branch**. Branch: `main`, folder: `/docs`. Save.

A minute later the site is live at `https://<user>.github.io/<repo>/`. For a custom domain, add it under Pages and create a `CNAME` file in `docs/` containing the domain.

`build.R` writes `docs/.nojekyll` on every build. Do not delete it. Without it GitHub runs Jekyll, which silently ignores any folder starting with an underscore and breaks asset paths.

There is also `.github/workflows/pages.yml`, which renders and deploys on every push to `main` if you would rather not build locally. It is disabled by default. To turn it on, uncomment the `on:` block at the top, and set Pages source to **GitHub Actions** instead of a branch.

## Where things live

| File | What it controls |
|---|---|
| `styles.css` | Everything visual. The palette and fonts are CSS variables in `:root` at the top. |
| `js/site.js` | Scroll reveals, the sticky header, the progress bar, parallax. |
| `includes/in_header.html` | Meta tags, favicon, Google Fonts. |
| `includes/before_body.html` | The nav, on every page. |
| `includes/after_body.html` | The footer and the script tag, on every page. |
| `_site.yml` | Page list, output folder, which includes get used. |
| `images/` | Serge's photos, the logo, the favicon. |

To change a colour site-wide, edit the variable in `:root` in `styles.css`. Do not hunt for hex codes in the pages.

## Before this goes live

**The Calendly link is a placeholder.** It appears as `https://calendly.com/REPLACE-WITH-SERGE-CALENDLY` in five places: `includes/before_body.html`, `index.Rmd` (twice), `services.Rmd`, and `contact.Rmd` (twice). Find and replace across the project, then rebuild.

**There is no email address anywhere, on purpose.** This repo is public if the Pages site is public, so an address in the source would be scraped within days. The two ways to reach Serge are the Calendly link and his LinkedIn, `https://www.linkedin.com/in/serge-zenin/`. If a written enquiry route is ever wanted, use a form service that keeps the recipient address server-side, never a `mailto:`.

**Copy still needing sign-off.** Most body text is verbatim from the source content document. These were drafted and should be approved: the Services page headline, "Assess. Build. Manage." and its three card descriptions, the dark band headline on the home page, the call-to-action subheadings, and the Contact page background heading.

## Notes on the R Markdown setup

The pages are raw HTML inside ` ```{=html} ` blocks rather than markdown. That is deliberate: the design needs exact control of the markup, and pandoc passes these blocks straight through untouched. Markdown prose can still be added around them on any page.

`_site.yml` sets `theme: null` and `highlight: null` so Bootstrap is not loaded, and `styles.css` has a short reset at the bottom that neutralises the wrapper `div` and title heading that `html_document` adds.
