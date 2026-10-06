# assets/

Images for the portfolio. Nothing here is required for the site to work.

## Project card images → `assets/work/`

The site picks these up **automatically by file name**: upload the file and the matching card shows it within a minute. No code edits are needed.

| File name | Card |
|---|---|
| `forklift.jpg` | VR Forklift Training Simulator |
| `cad-automation.jpg` | CAD Automation Tool (replaces the schematic) |
| `biw-fixture.jpg` | BIW Fixture Design |
| `hvac.jpg` | Automotive HVAC Design |
| `point-cloud.jpg` | Point-cloud VR Factory Walkthrough (replaces the schematic) |

How to upload: on GitHub open `assets/work/` → **Add file → Upload files** → drop the file (named exactly as above, lowercase, `.jpg`) → **Commit changes**. To replace an image, upload a new file with the same name. To remove it, delete the file and the placeholder comes back.

Guidelines

- 16:9 JPG, about 1600 × 900 px, under 300 KB each (keeps the site fast).
- No client names, logos, branding, or company/customer data visible.

## Link-preview image

`og-image.png` (1200 × 630 px) in this folder, then enable the `og:image` tag in `index.html` (search for `TODO: add a share image`).
