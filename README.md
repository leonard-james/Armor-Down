# Armor Down — Men's Mental Health

An educational website exploring toxic masculinity and its impact on men's mental health in the Philippines and beyond. Built as a midterm project for the Gender and Society course, this site uses interactive data visualizations, animated storytelling, and crisis resources to make a difficult topic approachable.

> "It's Safe to Set It Down."

## About the Project

This project examines how harmful cultural norms around masculinity — emotional suppression, dominance expectations, and the stigmatization of help-seeking — damage men's mental health. It brings together global statistics, Philippine laws and policies, shared experiences, and crisis resources in a single, scrollable narrative.

The site is structured as a single-page experience with sections covering:

- **What Is It** — the definition and origins of toxic masculinity (R.W. Connell's *hegemonic masculinity*)
- **Statistics** — animated charts and radial rings on help-seeking gaps, suicide rates, and the mental health crisis facing men
- **Myths vs Reality** — interactive flip cards debunking common misconceptions
- **Effects** — expandable cards on depression, aggression, substance abuse, isolation, and relationship damage
- **Shared Experiences** — tabbed, anonymized reflections with moody photography
- **Laws & Policies** — Philippine legislation (RA 11036, RA 11313, DOH AO 2020-0013, RA 10533) in accordion form
- **Break the Silence** — crisis hotlines, affirmations, and first steps toward healing
- **About** — the team behind the project
- **References** — all sources cited in APA 7th Edition style

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev) + [Vite 8](https://vite.dev) | App framework and build tooling |
| [React Router 7](https://reactrouter.com) | Client-side routing |
| [Framer Motion 13](https://www.framer.com/motion/) | Intro splash animation, shield redraw, tab transitions, scroll reveals |
| [Recharts 3](https://recharts.org) | Bar charts and data visualizations in Statistics |
| [Lucide React](https://lucide.dev) | Sun/Moon theme toggle icons |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first CSS (via `@tailwindcss/vite`) |

## Getting Started

### Prerequisites

- Node.js 18+ (the project uses Vite 8 and React 19)
- npm (comes with Node)

### Installation & Running

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:5173` (Vite will pick the next available port if that's taken).

### Build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── App.jsx                  # Root: routing, intro gate, scroll management
├── main.jsx                 # Entry point
├── index.css                # Global styles, theme CSS variables, keyframes
├── context/
│   └── ThemeContext.jsx     # Dark/light theme provider + localStorage persistence
├── components/
│   ├── Navbar.jsx           # Fixed nav, theme toggle, animated shield logo
│   ├── Hero.jsx             # Landing hero with rotating subtitles
│   ├── WhatIs.jsx           # Definition + timeline of key points
│   ├── Statistics.jsx       # Recharts bar charts, radial rings, count-up numbers
│   ├── MythsReality.jsx     # Interactive flip cards (myth ↔ reality)
│   ├── Effects.jsx          # Expandable accordion cards
│   ├── Voices.jsx           # Tabbed shared experiences with photography
│   ├── LawsPolicies.jsx     # Philippine law accordion
│   ├── BreakSilence.jsx     # Crisis hotlines + affirmations
│   ├── AboutSection.jsx     # Team rationale + member cards
│   ├── References.jsx       # APA 7th Edition source list
│   ├── Footer.jsx           # Navigation, hotlines, emergency callout
│   ├── IntroSplash.jsx     # Full-screen shield-draw intro animation
│   ├── AnimationLayer.jsx   # Ambient orbs, scroll-to-top button, reveal observer
│   └── Logo.jsx             # Armor Down shield SVG logo
├── pages/
│   ├── Home.jsx             # Assembles all sections
│   └── About.jsx            # Team member page
├── assets/                  # Photos for Shared Experiences + team avatars
└── data/
    └── crisisResources.js   # Hotline data
```

## Key Features

### Animated Intro Splash

On first visit (per browser session), a full-screen overlay draws the Armor Down shield logo with a stroke animation, holds, then flies the shield to the navbar where it lands as the logo. Controlled by `sessionStorage` so it only plays once per session. Respects `prefers-reduced-motion`.

### Scroll-Triggered Animations

Sections fade in as they enter the viewport via an `IntersectionObserver` (in `AnimationLayer.jsx`). Charts and statistics replay their count-up and bar-grow animations every time they scroll into view.

### Interactive Components

- **Flip cards** (Myths vs Reality) — click to reveal the reality behind each myth
- **Accordion cards** (Effects, Laws) — click to expand details, highlights, and statistics
- **Tabbed interface** (Shared Experiences) — keyboard-navigable tabs with directional slide transitions

### Crisis Resources

The "Break the Silence" section and Footer both list Philippine crisis hotlines (NCMH 1553, Hopeline, etc.) as clickable `tel:` links.

### All Research Cited

Every claim is backed by academic, governmental, or organizational sources — all listed in the References section in APA 7th Edition format.

## Team

Built by BSIT NAS 4-2 students at Sorsogon State University — Bulan Campus:

| Member | Role |
|---|---|
| Fola Faustine L. Gersalia | Research & Content |
| Lloyd Allan B. Gimena | Design & Layout |
| Leonard James H. Gobris | Development & Testing |
| Mark John D. Ernacio | Data & Statistics |

## Course

Gender and Society — 4th Year Midterm Project, 2026.

All research is cited and sourced.
