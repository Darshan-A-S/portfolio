# Portfolio Website

A personal portfolio website built with React and Tailwind CSS v4, featuring dark mode, LeetCode contributions, and an interactive gradient footer.


## Tech Stack

- **Framework:** React 19 + Vite 7
- **Styling:** Tailwind CSS v4 with `@tailwindcss/vite`
- **Components:** shadcn/ui (base-nova style)
- **Fonts:** Geist Sans & Geist Mono
- **Animations:** Motion (React)
- **API:** LeetCode GraphQL proxy (via Vite dev server)

## Features

- Dark mode with localStorage persistence and system preference fallback
- LeetCode contribution graph with submission count and tooltips
- Interactive gradient text footer (FluidGradientText)
- Responsive single-column layout (768px max-width)
- Full-width horizontal borders with vertical rails

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
├── App.jsx          # Root layout
├── index.css        # Tailwind entry + CSS variables
└── main.jsx         # React entry
```