# Aether — interactive UI showcase

A Next.js landing page built as a design-craft showcase: motion, scroll
choreography and interactive components, no images anywhere (every visual is
CSS, SVG or canvas).

## Run it

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 (tokens live in `src/app/globals.css` under `@theme`)
- `motion` (Framer Motion) for all animation
- `lenis` for smooth scrolling
- `lucide-react` for icons
- Fonts: Inter + Instrument Serif via `next/font`

## What's interactive

| Component | What it does |
|---|---|
| `cursor.tsx` | Custom cursor — springy ring + fast dot, blend-mode difference, grows and shows a label over anything with `data-cursor="…"` |
| `dot-field.tsx` | Canvas dot grid in the hero that leans away from the pointer and brightens with proximity (single rAF loop) |
| `smooth-scroll.tsx` | Lenis smooth scroll + eased anchor jumps |
| `scroll-progress.tsx` | Gradient progress bar bound to scroll |
| `magnetic.tsx` | Buttons that pull toward the cursor |
| `hero.tsx` | Masked line reveals, pointer-parallax gradient orbs, scroll-linked fade/scale/blur |
| `manifesto.tsx` | Word-by-word opacity reveal driven by scroll position |
| `features.tsx` | Live easing lab (segmented control with a shared-layout pill, animated cubic-bézier curve, replayable demo), expanding token swatches, working toggle + slider, animated Lighthouse ring |
| `spotlight-card.tsx` | Radial spotlight + gradient border that track the cursor; optional 3D tilt |
| `showcase.tsx` | Pinned horizontal scroll through project cards, each with a CSS-only UI mockup |
| `stats.tsx` | Count-up numbers on a single shared in-view observer |
| `faq.tsx` | Height-animated accordion |
| `cta-footer.tsx` | Masked headline reveal, live Manila clock, oversized wordmark |

## Design tokens

Edit `@theme` in `src/app/globals.css` to reskin the whole site:

```
--color-ink      #050506   page background
--color-surface  #0b0b0f   cards
--color-line     #1b1b22   hairlines
--color-cream    #f2f0ea   text
--color-muted    #83838d   secondary text
--color-lime     #d8ff3e   accent
--color-iris     #7b5cff   secondary accent
--color-flame    #ff6b3d   tertiary accent
```

## Notes

- Everything respects `prefers-reduced-motion`.
- Animations that stagger a list are driven by one parent observer rather than
  one observer per child — per-child `whileInView` intermittently skipped the
  first item.
- No `<img>` tags: the project mockups, charts and textures are all markup.
