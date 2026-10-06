# assets/

Images for the portfolio go here. Nothing in this folder is required for the site to work.

| File name (suggested) | Used in | Notes |
|---|---|---|
| `forklift.jpg` | Work → VR Forklift Training Simulator | Anonymized: no client name, logo or branding visible |
| `biw-fixture.jpg` | Work → BIW Fixture Design | No customer or company data |
| `hvac.jpg` | Work → Automotive HVAC Design | Only after permission is confirmed |
| `og-image.png` | Link previews (Open Graph) | 1200 × 630 px; then add the `og:image` tag in `index.html` |

Guidelines

- Use JPG or WebP for photos, ideally 1600 px wide and under 300 KB each (keeps the site fast).
- Card images display at 16:9, so crop to that ratio.
- To use an image, replace the card's `<span>FIG. 0X</span>` placeholder in `index.html` with:
  `<img src="assets/forklift.jpg" alt="Describe the image" loading="lazy">`
- Never upload screenshots that show company or client data.
