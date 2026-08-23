---
name: Dr. Robert Kübler · Portfolio
description: Senior data scientist and educator portfolio — scholarly warmth, editorial precision
colors:
  bg: "#f4f1ea"
  surface: "#ffffff"
  card: "#faf8f4"
  card-hover: "#f0ece3"
  border: "#e3ddd0"
  accent: "#7f601d"
  accent-dim: "#6b4e16"
  accent-glow: "#7f601d17"
  text: "#1c1825"
  text-muted: "#57516a"
  text-faint: "#726887"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 6vw, 3.2rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  title-lead:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  secondary:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  lead:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    letterSpacing: "0.10em"
rounded:
  sm: "8px"
  lg: "20px"
  pill: "24px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "80px"
  5xl: "96px"
tap: "44px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
    minHeight: "{tap}"
  button-primary-hover:
    backgroundColor: "{colors.accent-dim}"
  button-ghost:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
    minHeight: "{tap}"
  button-ghost-hover:
    backgroundColor: "{colors.accent-glow}"
    textColor: "{colors.text}"
  tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
---

# Design System: Dr. Robert Kübler · Portfolio

## 1. Overview

**Creative North Star: "The Quiet Authority"**

This system makes its case without raising its voice. The palette is warm parchment and bronze ochre — the colors of a well-thumbed academic monograph, not a startup homepage. Typography does the heavy lifting: Bricolage Grotesque carries section headers with the confidence of a senior practitioner who doesn't pad his CV, while Source Serif 4 carries body copy with the measured weight of someone who has actually read what he cites. JetBrains Mono marks precise data points — dates, metrics, labels — in a way that signals mathematical fluency without wearing it as a costume.

The system rejects noise by design. Sections alternate between off-white and cream, creating depth through tonal shift rather than shadow. Cards are slight elevations of the surface, anchored by a 1px border and a near-imperceptible ambient shadow. The single bronze-gold accent appears sparingly: a surname initial in the nav, a section label, a CTA. Its rarity is the point.

This is explicitly not a SaaS product landing page, not a bootcamp portfolio, not an "over-designed creative developer" site with cursor effects and WebGL backgrounds. It occupies the register of the well-designed academic personal page crossed with a quality technical publication: precise, warm, confident.

**Key Characteristics:**
- Warm light theme — parchment base, not sterile white
- Bronze-gold as a single, disciplined accent signal
- Tonal alternation over shadow hierarchy
- Three fonts with non-overlapping roles, never blended
- Editorial precision: every element placed with reason, none for decoration

## 2. Colors: The Scholar's Palette

A warm, authoritative palette that reads like an academic document printed on good paper. The amber-gold family spans from the deep bronze accent down to the parchment base, unified by a shared warm undertone.

### Primary
- **Scholar's Gold** (`#7f601d`): The sole accent. Used on interactive elements (CTAs, active states, focus rings), key labels, the surname initial in the nav, and bullet markers in timelines. Never used as a background fill except on primary buttons.
- **Deep Bronze** (`#6b4e16`): The accent's pressed/hover partner. Fills the primary button on hover; never used as text.

### Named Rules
**The Hover-Surface Rule.** Scholar's Gold is calibrated to clear WCAG AA (4.5:1) as text on *every* surface in this system, including the tinted hover fills: Warm Card Hover (`#f0ece3`, 4.96:1) and Scholar's Glow over Parchment Cream (4.61:1). Those tinted states are the binding constraint, not the page background. Any future lightening of the accent must be re-checked against them, not against Parchment Cream alone.

### Neutral
- **Parchment Cream** (`#f4f1ea`): Page background. The base tone all surfaces are measured against.
- **Paper White** (`#ffffff`): Elevated surface background — About, Skills, Writing, Education, Contact sections. Feels lighter than the cream base, creating the page's rhythmic alternation.
- **Warm Card** (`#faf8f4`): Card and component resting state — between page and white.
- **Warm Card Hover** (`#f0ece3`): Card hover fill — slightly warmer and deeper than resting.
- **Warm Grain** (`#e3ddd0`): Borders, dividers, timeline separators. All structural lines.
- **Deep Aubergine** (`#1c1825`): Primary text. Near-black with a faint violet undertone — prevents the harshness of a pure neutral black.
- **Muted Plum** (`#57516a`): Secondary text — nav links, card descriptions, timeline bullets, captions.
- **Pale Plum** (`#726887`): Tertiary text — dates, faint labels, footer copy. Passes WCAG AA (4.5:1) on Parchment Cream.

### Named Rules
**The One Voice Rule.** Scholar's Gold appears on fewer than 10% of any given screen's surface area. It marks what matters — the surname, the CTA, the active state — and is silent everywhere else. Using it liberally collapses the hierarchy it creates.

**The Tonal Rhythm Rule.** Page sections alternate between Parchment Cream and Paper White. Never place two cream sections or two white sections back to back. The alternation is the depth system.

## 3. Typography: The Trilingual Voice

**Display Font:** Bricolage Grotesque (with `system-ui, sans-serif` fallback)
**Body Font:** Source Serif 4 (with `Georgia, serif` fallback)
**Label/Mono Font:** JetBrains Mono (with `monospace` fallback)

**Character:** Three fonts, three registers, no overlap. Bricolage commands — it sets names, section titles, card headings. Source Serif 4 carries meaning — it holds paragraphs, bullets, prose. JetBrains Mono marks precision — dates, stats, labels, any element that says "I measured this." When in doubt, ask which register this text belongs to, then use the corresponding font and only that font.

### Hierarchy
- **Display** (Bricolage Grotesque, 700, `clamp(2.2rem, 6vw, 3.2rem)`, line-height 1.05, letter-spacing -0.02em): Hero h1 only. The name.
- **Headline** (Bricolage Grotesque, 600, `clamp(1.5rem, 4vw, 2rem)`, line-height 1.25, letter-spacing -0.01em): Section titles (`About`, `Experience`, `Writing`, etc.).
- **Title** (Bricolage Grotesque, 600, `1.125rem`, line-height 1.3): Card headings, featured article titles, project names.
- **Title-Lead** (Bricolage Grotesque, 600, `1.25rem`, line-height 1.25): The single emphasis step up from Title, reserved for the title inside a Featured/Lead card (the domain expertise lead card's title at desktop width, the featured project title). Signals "this one is the emphasized pick" without introducing a new font or color.
- **Lead** (Source Serif 4, 400, `1.125rem`, line-height 1.85): First paragraph of About section. Featured prose.
- **Body** (Source Serif 4, 400, `1rem`, line-height 1.7): All prose paragraphs, timeline bullet text. Max line length 65ch.
- **Secondary** (Source Serif 4, 400, `0.875rem`, line-height 1.55): Nav links, card descriptions, meta text, footer links.
- **Label** (JetBrains Mono, 500, `0.72rem`, UPPERCASE): Section eyebrows, dates, impact stat labels, skill tags, open-source project names. Tracking runs on three steps, widest for the most prominent label: `0.12em` section eyebrows, `0.10em` hero eyebrow and card categories, `0.08em` inline and meta labels (stat labels, group labels, project names, award labels).
- **Stat** (JetBrains Mono, 700, `1.5rem`, line-height 1): Impact figures in the hero strip. Also the avatar's initials fallback.

### Named Rules
**The Trilingual Rule.** Each of the three fonts occupies a non-overlapping domain. Bricolage commands, Source Serif 4 explains, JetBrains Mono measures. Never use JetBrains Mono for prose sentences. Never use Source Serif 4 for a date or a label. Never use Bricolage for body paragraphs.

**The Four-Level Rule.** Any given screen uses at most four distinct visual text levels. Collapsing body copy and secondary text into the same visual weight is always preferred over introducing a fifth level.

## 4. Elevation

This system treats depth as a tonal property, not a physical one. The primary depth mechanism is section background alternation: Parchment Cream and Paper White swap on every section boundary, giving the long single-page layout its rhythm without shadows.

Cards sit on their section surface as slight tonal elevations — a resting background of Warm Card (`#faf8f4`) against either cream or white — anchored by a 1px Warm Grain border and an ambient shadow that exists below the threshold of casual perception.

### Shadow Vocabulary
Both live as CSS variables. Component styles reference the token, never the literal.

- **Card ambient** (`--shadow-card`: `0 2px 8px rgba(28,24,37,0.07), 0 0 0 1px var(--border)`): All cards at rest. The 1px ring ensures legibility on both cream and white section backgrounds. The blur is a whisper, not a statement.
- **Avatar ring** (`--shadow-avatar`: `0 0 0 6px var(--accent-a06)`): The avatar's outer glow. Warmth signal, not elevation.

### Named Rules
**The Flat-by-Default Rule.** Surfaces are differentiated by background tint, not by drop shadow. A card's identity comes from its 1px border and tonal contrast with the page background — not from lifting it off the surface. Shadows anchor; they do not elevate.

**The No-Deep-Shadow Rule.** No shadow darker than `rgba(28,24,37,0.10)` opacity. If a shadow is visible at arm's length without squinting, it is too dark for this system.

## 5. Components

### Buttons
The CTA is the only filled element on any surface. All other interactive elements use ghost or outline treatments.

- **Shape:** Fully pill-rounded (24px radius). No sharp corners on interactive elements.
- **Primary (CTA):** Scholar's Gold fill (`#7f601d`), Parchment Cream text (`#f4f1ea`), `font-weight: 600`, `font-size: 0.875rem`, `padding: 8px 16px`, `min-height: var(--tap)`.
- **Primary Hover:** Deep Bronze fill (`#6b4e16`), same text. Transition 0.2s.
- **Ghost:** Warm Card fill (`#faf8f4`), Warm Grain border (`#e3ddd0`), Muted Plum text (`#57516a`), `padding: 8px 16px`, `min-height: var(--tap)`. Used for social links, secondary actions.
- **Ghost Hover:** Scholar's Gold border, Deep Aubergine text, Scholar's Glow fill (`var(--accent-glow)`).
- **Focus:** 2px Scholar's Gold outline, offset 3px, radius 8px (not pill — avoids outline clipping).

**Height comes from `--tap`, not from padding.** Padding stays on the spacing scale; `min-height: var(--tap)` (44px) is what actually sizes every control, so all pills land on the same height regardless of their label.

### Tag Pills
- **Style:** Paper White fill, Warm Grain border, Muted Plum text, pill radius (24px), `padding: 8px 16px`, `font-size: 0.875rem`, `font-weight: 500`.
- **Mono tags** (domain tags, skill chips): JetBrains Mono, `0.72rem`, no fill change — same border/text treatment at smaller size with `padding: 4px 16px`.

Tag pills are non-interactive labels, so they carry no `--tap` floor and no 3:1 border requirement.

### Cards
Two variants, one rule: the featured card signals priority through its border color, not its scale or shadow.

- **Standard:** Warm Card fill (`#faf8f4`), Warm Grain border (`#e3ddd0`), radius 20px (`--radius-lg`), `padding: 24px`. Hover: accent border, Warm Card Hover fill.
- **Featured/Lead:** Same as standard but with Scholar's Gold border at rest. No hover border shift needed — already accented.
- **Internal spacing:** `padding: 24px` standard, `padding: 32px` on lead cards spanning full width.
- **Never:** nested cards. Never a card inside a card.

### Timeline
The signature layout pattern. Left column carries metadata; right column carries content.

- **Grid:** `160px 1fr` with `gap: 24px`, `padding: 24px 0`, `border-bottom: 1px solid #e3ddd0`.
- **Period column:** JetBrains Mono Label, Muted Plum. Company name in Secondary (Source Serif 4, 0.875rem).
- **Content column:** Role title in Body weight 600 (`1rem`). Bullets in Secondary with Scholar's Gold em-dash marker (`–`) at `left: 0`.
- **Mobile:** collapses to single column; meta row becomes a flex row with period + company side by side.
- **Grouped timelines:** where a section splits its timeline into named groups (Employment / Freelance, Open Source / Invited Talks / Volunteer), the group label is a real `h3` and the role titles beneath it drop to `h4`. Ungrouped timelines keep role titles at `h3`.

### Navigation
- **Structure:** `position: sticky`, `min-height: 56px` (never a fixed height — the bar grows rather than clipping scaled text), Parchment Nav background (`rgba(244,241,234,0.92)`), `backdrop-filter: blur(12px)`, 1px Warm Grain bottom border.
- **Logo:** `font-weight: 600`, `1rem`, Deep Aubergine — surname in Scholar's Gold.
- **Links:** Secondary style (0.875rem, 500 weight, Muted Plum), hover to Deep Aubergine. The list wraps rather than overflowing.
- **Active state:** Scholar's Gold text, 1px Scholar's Gold underline at `bottom: -4px`, `opacity: 0.7`.
- **Contact CTA:** Primary button style. When contact section is active: outline variant (transparent fill, Gold border, Gold text).
- **Breakpoint:** the hamburger swap is stated in `em` (`max-width: 71.25em`), not px, so it also trips under text-only zoom and OS font scaling where the viewport stays wide.
- **Drawer:** lives inside `<nav>` and anchors at `top: 100%`, so it stays flush however tall the bar gets. Open state locks body scroll and marks `main` and `footer` `inert`; Escape and an outside click both dismiss it, and Escape returns focus to the hamburger.

**Every section gets a nav link.** The scroll-spy blanks its indicator for any section without a matching anchor, so an orphaned section reads as a gap in the page rather than a part of it.

### Impact Stats
- **Layout:** `display: flex`, `gap: 32px`, `flex-direction: column-reverse` per item (number visually first, label first in DOM for accessibility).
- **Number:** JetBrains Mono Stat (`1.5rem`, 700, Deep Aubergine). Plus/qualifier suffix in Scholar's Gold.
- **Label:** JetBrains Mono Label (0.72rem, uppercase, Muted Plum).

## 6. Do's and Don'ts

### Do:
- **Do** use Scholar's Gold on fewer than 10% of any screen's surface. Its rarity IS the hierarchy signal.
- **Do** alternate section backgrounds — Parchment Cream then Paper White then Parchment Cream. Never two of the same in sequence.
- **Do** use JetBrains Mono for every date, stat, metric, label, and badge — it signals precision, not decoration.
- **Do** set body text at `max-width: 65ch` to preserve reading line length.
- **Do** use the 1px Warm Grain border to define card identity — not drop shadows.
- **Do** keep all interactive elements at `min-height: var(--tap)` for accessible touch targets. The exception is a link sitting inline inside a sentence, which stays at its natural text height.
- **Do** use `prefers-reduced-motion` to disable animations — the `.scroll-animate` pattern must degrade gracefully.
- **Do** ensure all text passes WCAG AA (4.5:1 contrast) on its background, hover fills included. Pale Plum (`#726887`) is the floor on Parchment Cream.
- **Do** state layout breakpoints in `em` so they respond to text scaling, not just viewport width.
- **Do** check that a stretched card link's focus ring has somewhere to draw. Give the container `overflow: visible`, or draw the ring inward with a negative `outline-offset`.

### Don't:
- **Don't** use a gradient hero, big-number-plus-label stat block, or SaaS "features" grid. This is a portfolio, not a product page.
- **Don't** add skills progress bars, "technologies I know" icon walls, or any visual representation of proficiency as a percentage. These are bootcamp aesthetics.
- **Don't** use corporate consultant aesthetics: navy + gold, heavy serif headings, stiff formal grid.
- **Don't** use over-designed "creative developer" treatments: cursor effects, WebGL or canvas backgrounds, scroll-driven 3D, excessive particle systems.
- **Don't** bury the content behind visual decoration. The writing and experience are the portfolio. If a design element isn't serving the content, remove it.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored stripe on cards or callouts. Use background tints, full borders, or leading punctuation instead.
- **Don't** apply `background-clip: text` with a gradient. Emphasis comes from weight, size, or the single accent color used solid.
- **Don't** introduce a fourth font, a second accent color, or a dark mode variant without revisiting the full system. The coherence depends on discipline.
- **Don't** use `rgba` or hardcoded hex values in component styles when a CSS variable exists. `var(--accent)`, not `#7f601d`; `var(--shadow-card)`, not the shadow literal.
- **Don't** put `overflow: hidden` on a card that contains a stretched link. It clips the focus ring away and the failure is invisible in a screenshot.
- **Don't** leave `will-change` on an element at rest. It is a hint for a known-expensive animation about to run, not a baseline.
- **Don't** set a fixed `height` on the nav or any other text-bearing bar. Use `min-height` so scaled text grows the box instead of spilling out of it.
