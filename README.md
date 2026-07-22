# Marine Academic Portfolio

A polished, dependency-free personal website template for a high-school student interested in computer science and AI. The layout is inspired by an academic CV, but the content is deliberately honest about being early in the learning journey.

## Preview locally

You can open `index.html` directly in a browser. For the most reliable local preview, start any static file server in this directory, for example:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Replace the sample content

The name Ethan Lan and the main biography have been personalized. Organizations, dates, service-hour totals, and contact links remain fictional placeholders. Search `index.html` for `SAMPLE CONTENT` before publishing.

At minimum, replace:

- `Northshore High School` and `Portland, Maine`
- The biography, graduation date, coursework, and current learning goals
- The three volunteering entries and all hour totals
- `student@example.com` and the GitHub/LinkedIn links
- The calculator repository link once the project is online
- The illustrated avatar, if you want to use a real photo

The print button calls the browser print dialog. Choose “Save as PDF” to create a clean résumé using the included print stylesheet.

## Customize the design

The main design tokens are at the top of `styles.css`. Change the colors, container width, spacing, radii, shadows, and animation curves there. Icons and the avatar are inline SVG, so the template has no image, font, or icon-library dependency.

## Add another page later

1. Copy `index.html` to a new file such as `projects.html`.
2. Keep the skip link, site header, footer, `styles.css`, and `script.js` references.
3. Replace the `<main>` content with the new page content.
4. Reuse the existing `.section`, `.card`, `.button`, `.tag-list`, and `.timeline` components.
5. Change navigation anchor links to root-relative page links when deploying at a custom domain, or repository-relative links when deploying as a GitHub project page.

## Deploy to GitHub Pages

Push these files to a GitHub repository, open **Settings → Pages**, choose **Deploy from a branch**, and select the branch containing `index.html`. No build command is required.
