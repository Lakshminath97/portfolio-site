# portfolio-site

Personal portfolio of **Lakshminath K — Senior XR Developer** (Chennai, India).

> VR training that feels like the real machine. Engineering design meets enterprise XR, AI & simulation for immersive learning.

**Live site:** https://portfolio-site-swart-nine-92.vercel.app

## What's on the site

| Section | What it shows |
|---|---|
| Hero | Headline, sub-line and the four strengths (logical thinking, problem solving, a mechanical engineer's mindset, design quality) |
| Journey | Timeline 2015 → present, with a "mechanical ↔ XR" meter that shifts toward XR as you scroll |
| How I think | A simplified 5-step lockout/tagout (LOTO) procedure; click a step to see its VR design (trigger, validation, mistake caught, feedback) |
| Work | Project cards styled as drawing sheets, filterable by VR Training / CAD & Automation / Visualization, each with an "Engineer's lens" toggle |
| Skills & awards | Skills, Valeo awards and certifications |
| Contact | Email, LinkedIn, GitHub and a resume download |

Design direction: "Engineering Drawing, Dark Edition" — graphite background, warm off-white text, one safety-amber accent, blueprint grid, dimension-line dividers, and an optional light "drawing paper" theme.

## Tech

- Plain HTML, CSS and vanilla JavaScript — no framework, no build step
- Fonts: [Geist and Geist Mono](https://fonts.google.com/?query=geist) from Google Fonts
- Respects `prefers-reduced-motion`; fully responsive
- Hosted on [Vercel](https://vercel.com) (framework preset: **Other**, no build command, output = repo root). Every push to `main` redeploys automatically.

## Files

```
index.html   all content and sections
styles.css   design system (colours are CSS variables at the top)
script.js    scroll reveals, journey meter, SOP explainer, filters, lens toggles, theme toggle
assets/      images (see assets/README.md); project card images go in assets/work/
resume.pdf   resume download (to be added at the repo root)
```

## How to update content

- **Text**: edit `index.html` directly — each section is marked with a comment banner (`<!-- ===== WORK ===== -->` etc.).
- **Add a project**: copy one `<article class="card">` block in the Work section. Set `data-cats` to one or more of `vr`, `cad`, `viz` so the filters pick it up, and give the lens paragraph a unique `id` that matches the button's `aria-controls`.
- **Add a project image**: upload it to `assets/work/` with the card's file name (`forklift.jpg`, `cad-automation.jpg`, `biw-fixture.jpg`, `hvac.jpg`, `point-cloud.jpg`). The card picks it up automatically, with no code edits. For a new card, add `data-img="assets/work/your-name.jpg"` to its `card-fig` div.
- **Journey meter**: each timeline item has `data-xr` (0 = mechanical, 1 = XR) that sets the meter position for that period.
- **Resume**: upload `resume.pdf` to the repo root (the Download button links to `/resume.pdf`).
- **Colours**: change the variables at the top of `styles.css` (`--bg`, `--text`, `--muted`, `--accent`).
- Search the code for `TODO` to find every placeholder still waiting for content.

Commit to `main` and Vercel will redeploy within a minute.
