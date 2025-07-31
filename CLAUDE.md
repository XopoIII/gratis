# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for author Agatis Integra (agaINTE GRAtis), hosted at https://againte.gratis. The site showcases literary works, primarily science fiction novels, and provides an immersive, interactive reading experience.

## Architecture

The site consists of several independent sections:

1. **Main Landing Page** (`/`) - Terminal-style interface with author info and navigation
2. **Book Landing Pages**:
   - `/navmor/` - "Навмор" book presentation
   - `/efir/` - "Δ.E.F.I.R. Фаза 1: Замедление" interactive experience
   - `/efir/∇/` - "∇.E.F.I.R. Фаза 2: Фрактальный Разлом" interactive experience
3. **Sub-sections**:
   - `/efir/archive/` - Terminal log viewer for Δ.E.F.I.R.
   - `/efir/∇/archive/` - Terminal log viewer for ∇.E.F.I.R.

Each section is self-contained with its own HTML, CSS, and JavaScript files.

## Key Features

- **Terminal-style interfaces** with typing animations and glitch effects
- **Interactive menus** with keyboard and mouse navigation
- **Immersive book presentations** with custom themes per book
- **Archive viewers** for reading JSON-formatted story logs
- **Responsive design** optimized for both desktop and mobile

## Technology Stack

- Pure HTML5, CSS3, and vanilla JavaScript
- No build process or frameworks
- Google Fonts integration (JetBrains Mono, Montserrat)
- Schema.org structured data for SEO

## Development Commands

This is a static site with no build process. To develop locally:

```bash
# Serve files locally (use any static server)
python -m http.server 8000
# or
npx serve .
```

## File Structure Patterns

- Each major section has its own `index.html`, `style.css`, and `script.js`
- Images are stored alongside their respective HTML files
- The `parser.html` files appear to be utility pages (purpose unclear)
- Archive sections use `termlog.json` files for story content

## Important Notes

- The site uses absolute URLs (https://againte.gratis) in many places
- CNAME file indicates custom domain setup for GitHub Pages
- Heavy use of CSS animations and visual effects for atmosphere
- Content is primarily in Russian language