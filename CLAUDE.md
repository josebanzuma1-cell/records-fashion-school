# CLAUDE.md — Records Fashion School Website

Project rules and art direction. Read fully before writing or editing code.
Every component must obey the ART DIRECTION, TYPOGRAPHY, MOTION, and 3D rules.
When in doubt, favor restraint, whitespace, and editorial elegance.

Brand name: **Records Fashion School** (Kampala, Uganda). Use this exact name everywhere.
Tagline / motto (confirmed from official brochure): **"Skills for Life"**.
Flyer headline: "Unlock your creativity. Learn from the best. Kickstart your career."
Enrollment banner: "Fashion Design — Enrollment Open".

Contact (confirmed July 2026, official brochure — single source in `lib/school.ts`):
- Address: Lower Katwe, along Muteesa I Road, Tezira House, Second Floor, Kampala
- Phones: +256 (0) 701 316 907 · +256 (0) 784 005 899
- Email: info@recordsfashionschool.com · Web: www.recordsfashionschool.com
- Socials: Facebook, X, Instagram, TikTok, YouTube — `// TODO: exact handles/URLs`
- `// TODO: confirm founding year, student/alumni counts, accreditations.`

Brand statements (Mission / Vision / Promise / Positioning) live verbatim in
`lib/school.ts` — never retype them inline.

---

## 1. Project overview

High-end fashion-school website with an **editorial, luxurious, fashion-magazine**
feel (structural reference: Ferrari Fashion School, Milan — layout/feel benchmark
only; a screen capture of it drives the landing-page section structure).
Single-scroll homepage + sub-pages:
Nav → Hero (3D) → Intro (serif line-reveal + index links) → Educational Offer
(dark section, sticky intro left, card grid right) → Magazine (cream panel,
news grid) → Marquee band → Footer.

## 1a. Navigation & site map

`lib/navigation.ts` is the single source of truth (header mega-menu, mobile
accordion, footer columns, stub-route generation). Top-level: The School,
Educational Offer, Guidance, Student Services, Research and Third Mission
(direct), Magazine, Work with Us (direct). Utility bar: Open Day, Contact Us,
EN toggle (`// TODO: confirm second language`). Items with children open a
mega-menu (desktop) / accordion (mobile). Every IA item routes — dedicated
pages graduate out of `app/[...slug]/page.tsx` (see `DEDICATED` set there).

## 2. Tech stack (do not swap without asking)

Next.js (App Router) + TypeScript · Tailwind CSS v3 · next/font/google ·
GSAP + ScrollTrigger + SplitText · Lenis · Framer Motion ·
@react-three/fiber + drei + @react-three/postprocessing · three.

Package manager: **npm** (pnpm was specified but its store needs symlink
permissions this Windows machine doesn't grant; switch back only if Developer
Mode is enabled). Node 18+.

## 3. Art direction

Warm editorial minimalism. Paper base, ink text, photography and the 3D scene
carry color. The UI accent is the school's real brand magenta.

### Color tokens (`tailwind.config.ts` + CSS vars in `app/globals.css`)

| Token      | Hex       | Use                                                  |
|------------|-----------|------------------------------------------------------|
| `paper`    | `#F2F0EB` | Page background                                      |
| `ink`      | `#14161A` | Primary text / dark sections                         |
| `navy`     | `#1B2A4A` | Deep suiting navy — hero scene, dark accents         |
| `mahogany` | `#6E3D25` | Warm wood accent                                     |
| `brass`    | `#C08A3E` | Warm support tone — 3D atelier light, imagery only   |
| `cream`    | `#E9E1D0` | Dividers, muted fills, Magazine panel                |
| `smoke`    | `#8A8A86` | Muted labels, captions, meta                         |
| `magenta`  | `#C01D63` | **PRIMARY accent** (real brand color from the logo)  |
| `teal`     | `#1F6F6D` | Logo support color — reserved, use sparingly         |

Rules: one accent at a time — `magenta` for UI (hover, highlights, CTA);
`brass` stays photographic (3D lighting, imagery warmth), never both in one
element. Never pure `#000`/`#fff`. Hairlines: 1px ink at 12% (`.hairline`).

### Layout language

Asymmetric 12-col editorial grid; oversized display headlines; small-caps mono
eyebrows (`— 01 / OFFER`); mono letter-spaced dates; sections breathe
(12–20vh); content max-width 1440px (`max-w-content`); full-bleed allowed.

## 4. Typography — THREE fonts only (see `app/fonts.ts`)

| Role                | Font                                  | Notes |
|---------------------|---------------------------------------|-------|
| Display / H1–H2     | Archivo (variable, `wdth` axis @125%) | Google has no separate "Archivo Expanded" family — we load the wdth axis and set `font-stretch: 125%` via the `.font-display` utility. UPPERCASE, tracking 0.02em, leading ~0.95. |
| Serif accent        | Bodoni Moda                           | One italic accent word inside display headlines — the signature move. Also pull-quotes, editorial numerals. |
| Body / UI / meta    | Space Mono                            | Body, labels, nav, buttons, dates. |

Fluid type via `clamp()`. Never a fourth font.

## 5. The 3D hero

Tailor's dress form rotating in a warm atelier: navy pinstripe, cream
measuring tape spiral, amber key light, DoF bokeh, contact shadow.

**The subject is a config-driven slot.** `components/hero/heroConfig.ts` holds
all tunables (`subject`, `rotationSpeed`, `mouseParallax`, `posterSrc`,
palette). `HeroSubject.tsx` holds the registry — adding a subject = new file in
`subjects/` + one registry entry + config key. Nothing else changes. All
subjects fit a ~1.1×2.2×1.1 box, pivot on the floor at origin.

Performance/fallback (mandatory): canvas lazy-loaded `ssr:false`; poster still
(`public/hero-poster.svg` — `// TODO: real atelier photograph`) on mobile,
reduced-motion, no-WebGL, and during warm-up; DPR capped [1,2]; one post-fx
pass (DoF); dispose textures/geometries on unmount.

## 6. Motion system

- Lenis site-wide, synced to ScrollTrigger (`components/SmoothScroll.tsx`,
  instance shared via `lib/lenisStore.ts`). Skipped under reduced motion.
- Headline reveals: word rise+fade (hero); SplitText line masks (intro).
- Section entrances: `[data-reveal]` fade + 24px rise via `useSectionReveal`.
- Card hover: image scale 1.05 (700ms); custom cursor shows "View" over
  `[data-cursor="view"]` targets.
- Custom cursor (`components/ui/Cursor.tsx`): paper dot, mix-blend difference,
  scales over interactive elements, magenta "View" badge over cards. Fine
  pointers only; disabled under reduced motion.
- Magnetic hover (`components/ui/Magnetic.tsx`) on pill CTAs and back-to-top.
- Marquee: infinite band — "Records Fashion School — Skills for Life — Craft ·
  Culture · Couture". CSS loop, paused under reduced motion.
- Easing: `power3.out` / `[0.16,1,0.3,1]`; durations 0.3 / 0.6–0.8 / ≤1.2s;
  stagger 0.06–0.1 (constants in `lib/motion.ts`).
- **Non-negotiable**: respect `prefers-reduced-motion` everywhere; 60fps;
  animate transform/opacity only.

## 7. Component & code conventions

Functional components, one per file, PascalCase. GSAP work inside
`gsap.context` scoped to a ref, cleaned up on unmount. Tailwind for static
styling; tokens centralized (`tailwind.config.ts`, `lib/motion.ts`,
`heroConfig.ts`, `lib/school.ts`). Semantic headings, real buttons/links,
alt text, visible focus, keyboard-navigable nav. Placeholder imagery lives in
`public/courses/` + `public/news/` — every placeholder carries a
`// TODO: replace with real content` marker.

## 8. Do / Don't

**Do**: keep it minimal, editorial, warm, confident; lean on Archivo +
Bodoni-italic pairing; keep the 3D subject swappable; show the hero for
approval before big changes.

**Don't**: add fonts or accent colors; over-animate (no bounce/spring); use
localStorage/sessionStorage in preview artifacts; hard-code hero tunables;
ship motion/3D without reduced-motion + mobile fallbacks; retype brand facts
that belong in `lib/school.ts`.
