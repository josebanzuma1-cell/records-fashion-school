# CLAUDE.md — Records Fashion School Website

Project rules and art direction. Read fully before writing or editing code.
Every component must obey the ART DIRECTION, TYPOGRAPHY, and MOTION rules.
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
Nav → Hero (garment-photography crossfade loop) → Intro (serif line-reveal +
index links) → Educational Offer (dark section, sticky intro left, card grid
right) → Magazine (cream panel, news grid) → Marquee band → Footer.

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
GSAP + ScrollTrigger + SplitText · Lenis · Framer Motion.

No 3D/WebGL library (removed — see §5). Adding one back requires asking
first; the whole point of removing three.js was cutting page weight.

Package manager: **npm** (pnpm was specified but its store needs symlink
permissions this Windows machine doesn't grant; switch back only if Developer
Mode is enabled). Node 18+.

## 3. Art direction

Warm editorial minimalism. Paper base, ink text, photography carries color.
The UI accent is the school's real brand magenta.

### Color tokens (`tailwind.config.ts` + CSS vars in `app/globals.css`)

| Token      | Hex       | Use                                                  |
|------------|-----------|------------------------------------------------------|
| `paper`    | `#F2F0EB` | Page background                                      |
| `ink`      | `#14161A` | Primary text / dark sections                         |
| `navy`     | `#1B2A4A` | Deep suiting navy — hero fallback bg, dark accents   |
| `mahogany` | `#6E3D25` | Warm wood accent                                     |
| `brass`    | `#C08A3E` | Warm support tone — imagery warmth only              |
| `cream`    | `#E9E1D0` | Dividers, muted fills, Magazine panel                |
| `smoke`    | `#8A8A86` | Muted labels, captions, meta                         |
| `magenta`  | `#C01D63` | **PRIMARY accent** (real brand color from the logo)  |
| `teal`     | `#1F6F6D` | Logo support color — reserved, use sparingly         |

Rules: one accent at a time — `magenta` for UI (hover, highlights, CTA);
`brass` stays photographic (imagery warmth only), never both in one element.
Never pure `#000`/`#fff`. Hairlines: 1px ink at 12% (`.hairline`).

### Logo

`public/logo.png` — the school's real illustrated crest (stylised figure in
a magenta gown, teal panel, gold fish + scissors, tape-measure ribbon
reading "RECORDS FASHION SCHOOL", "SKILLS FOR LIFE" beneath). Transparent
background — extracted from the letterhead in the official Application Form
docx (the school's brand-asset folder is
`C:\Users\BAMU\OneDrive\Desktop\records fashion school\` on the user's
machine) and background-keyed from white to transparent so it sits cleanly
on both the solid paper header and the transparent/photo hero header state.

Used in `Header.tsx` as a small crest (`h-10 lg:h-11`, `drop-shadow` for
legibility over busy photos) to the **left** of the existing set-type
wordmark, not standalone — the crest is full of fine linework (ribbon
lettering, tape-measure ticks) that only reads at print size, so the clean
Archivo/mono wordmark stays the actual legible identifier. Don't blow the
crest up to be the sole nav identifier; don't stack it above the wordmark
(header height is constrained). If it's ever needed elsewhere (favicon,
footer, loading state), re-derive from `public/logo.png`, don't re-extract
from the docx.

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

## 5. The hero photo loop

**Formerly a WebGL 3D dress-form scene — removed 2026-07 for page weight and
scroll jank (see git history for the old approach if it's ever wanted back).**
The hero is now five garment photographs, absolutely stacked and crossfaded
by opacity only (no layout, no canvas, pure GPU compositing).

All content lives in `components/hero/heroConfig.ts`: `heroSlides` (ordered
array of `{ src, alt }`, shown in exactly that order — the array order *is*
the loop order), `heroIntervalMs` (hold time per slide), `heroTransitionMs`
(crossfade duration, keep in sync with the `duration-[…]` class in
`Hero.tsx`). To add/remove/reorder slides, edit only this array.

Slides are real garment photography (`public/hero/hero-01.jpg` …
`hero-05.jpg`), sourced from the school's Instagram archive at
`C:\Users\BAMU\OneDrive\Desktop\records fashion school\` on the user's
machine (that folder has ~58 more photos + reels if the loop is ever
expanded or refreshed — go find matches there, don't ask for re-uploads).
Current order: 01 atelier dress form + tape measure, 02 orange shell
headpiece, 03 maroon checkerboard coat, 04 wing-cage silhouette back view,
05 same piece front view.

Behavior: `Hero.tsx` runs a `setInterval` that advances `slide` on a timer;
skipped entirely under `prefers-reduced-motion` (first slide just holds).
Hovering the section pauses the cycle via a ref flag (no re-subscribing
listeners). A row of dots under the CTAs lets a visitor jump to any slide or
step through manually — each dot's `aria-label` carries that slide's `alt`
text, since the crossfading image layer itself is `aria-hidden`. A
`from-ink/85 via-ink/35 to-ink/10` gradient scrim sits over every slide so
the paper/cream copy stays legible regardless of which photo is showing.

Perf notes for whoever touches this next: all five images render
simultaneously (stacked, opacity-toggled) rather than swapping `src` — that
front-loads the fetches so switching slides never pops in unloaded content.
Only slide 0 gets `fetchPriority="high"` (LCP candidate); the rest are plain
`loading="eager" decoding="async"`. If the real photos turn out to be large
JPGs, consider moving to `next/image` with `fill` for automatic resizing —
not done yet because the current SVG placeholders don't benefit from it and
raw `<img>` matches the same pattern already used for course/news cards.

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
`public/courses/` + `public/news/` + `public/hero/` — every placeholder
carries a `// TODO: replace with real content` marker.

## 8. Do / Don't

**Do**: keep it minimal, editorial, warm, confident; lean on Archivo +
Bodoni-italic pairing; keep the hero slide list config-driven (§5); show
big visual changes for approval before continuing.

**Don't**: add fonts or accent colors; over-animate (no bounce/spring); use
localStorage/sessionStorage in preview artifacts; hard-code hero timing
inline instead of `heroConfig.ts`; ship motion without a reduced-motion
fallback; bring back a 3D/WebGL library without asking first (§2); retype
brand facts that belong in `lib/school.ts`.
