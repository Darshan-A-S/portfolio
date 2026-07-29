# Portfolio Website

A personal portfolio website built with React and Tailwind CSS v4 — dark mode, interactive timeline, LeetCode stats, search, keyboard shortcuts, video showcase, and more.

## Tech Stack

- **Framework:** React 19 + Vite 7
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4 with `@tailwindcss/vite`
- **Components:** shadcn/ui (base-nova style)
- **Fonts:** Geist Sans, Geist Mono, Playfair Display
- **Animations:** Motion (React)
- **Markdown:** react-markdown
- **API:** LeetCode GraphQL proxy (Vite dev server / Vercel serverless)

## Features

### Core
- **Dark mode** — localStorage persistence, system preference fallback, D key toggle
- **Single-column layout** — centered 768px max-width, full-width borders with vertical rails
- **Responsive** — mobile-first with `px-[8px] sm:px-0` padding strategy

### Navigation & Shortcuts
| Key | Action |
|-----|--------|
| `Ctrl/Cmd + K` | Search modal (30+ items, keyboard nav, cross-page hash) |
| `Ctrl/Cmd + '` | Timeline modal |
| `Ctrl/Cmd + I` | Scroll to top |
| `D` | Toggle dark mode |
| `Escape` | Close all modals |

### Timeline
- Horizontal scrollable timeline (2004–2026) with age/year markers
- **Hover images** on milestones — spring cursor follow, preloaded dimensions for correct positioning (any aspect ratio)
- **Markdown highlights** — `highlight` field matches `**bold**` in content; only highlighted text triggers the hover image. Full Markdown support (lists, links, paragraphs)
- **Mobile tap** — tap bold text → image centered above, 2s auto-close. Tap again or tap image closes immediately
- **Mobile scroll trigger** — reach page bottom + stay for 1.5s → opens timeline (mobile only)

### Keyboard & Gestures
- **Search**: Ctrl+K modal with 30+ indexed items, arrow key navigation, hash-scroll fallback
- **Quote overlay**: Ctrl+' opens timeline modal (repurposed)
- **Scroll to top**: Ctrl+I

### Pages
- `/` — Home page with all sections
- `/otherside` — Video editing showcase with 9 labelled videos, hover-to-play audio, lazy-load via IntersectionObserver

### Sections
- **Logo** — DAS wordmark with gradient text (FluidGradientText)
- **Bio** — Name with Playfair Display italic, role, location
- **Socials** — GitHub, LinkedIn, Instagram, LeetCode, Monkeytype
- **Tech Stack** — Icons with dark/light mode SVGs
- **Experience** — Work history with expandable cards
- **Projects** — Expandable project cards with smooth grid-rows animation
- **Video Editing** — Gradient-overlaid thumbnails, hover preview with audio
- **LeetCode Contributions** — Contribution graph with submission counts, tooltips, mobile-responsive legend
- **ASCII Webcam** — p5.js + p5.asciify via CDN
- **Inspirations** — Footer links

### UX
- **Custom scrollbar** — theme-aware thin thumb (7px), reduced length via border-block trick
- **Hash-scroll** — cross-page anchor navigation (About/Projects from `/otherside` → `/`)
- **Analytics & Speed Insights** — Vercel, mounted once at root level
- **SPA routing** — `vercel.json` rewrites for client-side routing

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── assets/          # SVGs, images, fonts
├── components/      # React components
│   ├── ui/          # shadcn/ui components
│   └── ...          # Section components
├── lib/             # Utilities (cn helper)
├── pages/           # Route pages (OthersidePage)
├── App.jsx          # Root layout with routing
├── index.css        # Tailwind entry + CSS variables
└── main.jsx         # React entry (BrowserRouter)
```

Open [http://localhost:5173](http://localhost:5173)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── assets/          # SVGs, images, fonts
├── components/      # React components
│   ├── ui/          # shadcn/ui components
│   └── ...          # Section components
├── lib/             # Utilities (cn helper)
├── App.jsx          # Root layout
├── index.css        # Tailwind entry + CSS variables
└── main.jsx         # React entry
```