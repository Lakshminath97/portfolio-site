# Lakshminath K — Portfolio

**Software Developer — Simulation & Immersive Training** · Chennai, India

**Live:** https://portfolio-site-swart-nine-92.vercel.app · **Resume:** [resume.pdf](https://portfolio-site-swart-nine-92.vercel.app/resume.pdf)

![Portfolio home page](assets/screenshot.jpg)

## What this is

My personal portfolio. It's built for one job: in under a minute, a reviewer should know who I am, what I've built, and how to reach me.

- **Work comes first.** The flagship VR forklift simulator is a full case study (challenge, my role, outcome, stack). The other projects are short cards.
- **Most of my work is client-owned**, so this site describes the projects rather than linking to their code.
- **The design follows my background.** "Engineering Drawing, Dark Edition" treats each project card as a drawing sheet with a title block, and uses dimension lines as section dividers. It reflects how I came to software: through mechanical design.

## Highlights shown on the site

| | |
|---|---|
| Flagship | VR forklift training simulator with a custom real-time simulator rig and rig-to-VR calibration (Unity, C#, Meta Quest 3, OpenXR, ESP32, REST APIs, Supabase) |
| Integration | LMS integration tracking trainee progress, completion and evaluation |
| Automation | C# / NX Open CAD automation tool: **40% design-efficiency gain** |
| Leadership | Leads an 8-member cross-functional software + hardware team |

## Tech and design decisions

- **Plain HTML, CSS and JavaScript.** No framework and no build step. The page has no runtime dependencies besides Google Fonts, so it loads fast and there's almost nothing to break or maintain.
- **Deployed on Vercel** from `main`. Every push redeploys within a minute.
- **Accessible by default:** semantic sections, keyboard-usable filters and toggles, visible focus states, and `prefers-reduced-motion` respected.
- **Responsive from 360 px up**, plus a light "drawing paper" theme that is remembered per visitor.
- **Small touches:** click-to-copy email, project filters, an "Engineer's lens" on each card, and a scroll-driven mechanical → software meter on the timeline.

## Project structure

```
index.html        content and sections (Hero, Work, Journey, Skills & awards, Contact)
styles.css        design tokens (CSS variables) and layout
script.js         reveals, journey meter, filters, lens toggles, copy email, theme, image loading
resume.pdf        downloadable resume
assets/work/      project images, picked up automatically by file name
assets/screenshot.jpg
```

## Run locally

```bash
git clone https://github.com/Lakshminath97/portfolio-site.git
cd portfolio-site
python3 -m http.server 8000   # then open http://localhost:8000
```

## Updating content

- **Text:** edit `index.html`. Each section is marked with a comment banner.
- **Project images:** upload to `assets/work/` with the card's file name (`forklift.jpg`, `lms.jpg`, `cad-automation.jpg`, `biw-fixture.jpg`, `hvac.jpg`, `point-cloud.jpg`). No code changes are needed. See `assets/README.md`.
- **Resume:** replace `resume.pdf` in the repo root.

## Contact

[LinkedIn](https://www.linkedin.com/in/lakshminath-k-1609lk450) · [Email](mailto:lakshminath.1997@gmail.com) · [Portfolio](https://portfolio-site-swart-nine-92.vercel.app)
