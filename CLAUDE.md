# CLAUDE.md — robkuebler.github.io

## Type scale

Every font size must use one of these tokens. No other values.

| Token | Value | Role |
|-------|-------|------|
| `xs`  | `0.72rem`   | Mono labels only — JetBrains Mono, uppercase, ALL-CAPS elements: section labels, dates, badges, stat labels, card titles |
| `sm`  | `0.875rem`  | Secondary text — nav links, bullets, meta, buttons, descriptions, footer |
| `md`  | `1rem`      | Body text — paragraphs, contact text, role titles |
| `lg`  | `1.125rem`  | Lead / featured paragraph (first about paragraph) |
| `xl`  | `1.5rem`    | Stat numbers, display numbers in strips |
| display | `clamp(...)` | Section titles, h1, writing callout — use clamp for fluid scaling |

Rule: if an element uses JetBrains Mono in uppercase → `xs`. If it's secondary UI text (not paragraph prose) → `sm`. Everything else follows the role above.

## Spacing scale

All padding, margin, and gap values must use one of these. No other values.

| Token | Value | Typical use |
|-------|-------|-------------|
| `xs`  | `4px`  | Icon ↔ label gap, fine-tuning |
| `sm`  | `8px`  | Gaps within a component, small internal padding |
| `md`  | `16px` | Standard padding inside cards, between related elements |
| `lg`  | `24px` | Between groups within a card, horizontal button padding |
| `xl`  | `32px` | Between sections within a page, larger separators |
| `2xl` | `48px` | Top-level section separation, stats-bar margin-top |

## Fonts

Three fonts only — each with a fixed role:

| Font | Role |
|------|------|
| `Inter` | Body — all prose and paragraphs |
| `DM Serif Display` | Display — section titles, h1, callout numbers |
| `JetBrains Mono` | Technical — labels, dates, numbers, section markers |

## Colors

All colors via CSS variables from `shared.css`. Never hardcode a hex or named color in component styles. Exceptions (with comment): semantic colors with no theme equivalent (e.g. SpesenLaster brand green, feature category hues).

## Writing

Never use em dashes (—) in visible text. Use commas, colons, or parentheses instead.
