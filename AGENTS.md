# Repository Guidelines
## Project Structure & Module Organization
- Root pages: `index.html`, `script.js`, site meta (`robots.txt`, `sitemap.xml`, `CNAME`, `favicon32.png`).
- Sections: each area is a folder with its own `index.html`, `style.css`, `script.js`, and assets (e.g., `efir/`, `efir/∇/`, `broken/`, `navmor/`, `auntie/`, `propavshie/`, `sruchkoy/`).
- Assets: images live next to the page that uses them (e.g., `efir/*.jpg`). Keep filenames lowercase, hyphen-separated.
## Build, Test, and Development Commands
- Serve locally (Python): `python3 -m http.server 8080` then open `http://localhost:8080/`.
- Quick open (macOS/Linux): `open http://localhost:8080` or `xdg-open ...` after starting the server.
- No build step or package manager is required; the site is plain HTML/CSS/JS.
## Coding Style & Naming Conventions
- HTML/CSS/JS only; no frameworks. Prefer semantic HTML and vanilla JS.
- Indentation: 4 spaces. Line endings: LF. Encoding: UTF-8.
- Filenames/paths: lowercase, hyphen-separated; avoid spaces. Use `index.html`, `style.css`, `script.js` per section.
- Meta: keep `lang`, OpenGraph/Twitter tags, and canonical URLs consistent across pages.
## Testing Guidelines
- Manual smoke test in at least two browsers (Chromium + Firefox/Safari).
- Run locally, navigate all sections, and check the console for errors.
- Validate links and images; ensure keyboard navigation works for interactive items.
- Mobile: verify layouts around 360×640 and small heights (<500px).
## Commit & Pull Request Guidelines
- History is terse and mixed-language; aim to improve using Conventional Commit style: `feat(scope): summary`, `fix(nav): back button`, `chore: sitemap update`.
- Keep commits focused and small; include Russian where user-facing text changes are involved.
- PRs: include a clear description, affected pages/paths, before/after screenshots for visual changes, and steps to reproduce or test locally.
## Security & Configuration Tips
- No backend or secrets. Avoid third-party scripts unless essential.
- Keep `CNAME`, `robots.txt`, and `sitemap.xml` updated when paths or domains change.
