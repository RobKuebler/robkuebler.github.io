# Embedding-Based Recommender Systems, Slidev deck spec

A 45-minute talk by Dr. Robert Kübler. Based on the 2023 article *Introduction to Embedding-Based Recommender Systems*. Audience: DS/ML people who use PyTorch.

This document is the full build spec. Every slide lists exact text, exact code, exact numbers, and exact click behavior. Another agent picking this up cold should be able to implement the deck from this file plus the component source.

---

## 1. Project layout

```
presentations/embedding-recsys/slidev/
  package.json          # Slidev CLI + theme-default + vue + playwright-chromium
  slides.md             # The deck (replace playground with real slides, act by act)
  components/           # Vue 3 single-file components, auto-imported by Slidev
    EmbeddingVector.vue
    OneHotVector.vue
    DotProduct.vue
    EmbeddingPlot.vue
    StatCounter.vue          # TODO
    MetricBadge.vue          # TODO
    ArchitectureDiagram.vue  # TODO
    RatingStars.vue          # TODO
  global-bottom.vue     # Small CSS fix to lift nav controls above taskbar
  PLAN.md               # This file
```

## 2. Global decisions

- **Theme**: `@slidev/theme-default`, light. No custom palette overrides in slide CSS.
- **Transitions**: `transition: fade` in headmatter.
- **Code language**: PyTorch, not TensorFlow. Three model versions:
  - V1: raw dot product, fails.
  - V2: + sigmoid squash to [1, 5].
  - V3: + per-user and per-movie scalar bias terms.
- **Demo**: static only, no live runs in the talk.
- **Article content dropped**: the HistGradientBoostingRegressor "bad baseline" slide.
- **Article content added**: NLP/LLM aside after the embedding-convergence plot (slide 14).

## 3. Design system

### Colors (hardcoded inside components, from Tailwind palette)

| Role | Hex | Notes |
|------|-----|-------|
| Cold endpoint (negative values) | `rgb(59, 130, 246)` | Tailwind blue-500 |
| Warm endpoint (positive values) | `rgb(239, 68, 68)` | Tailwind red-500 |
| Neutral (zero) | `rgb(245, 245, 245)` | Off-white |
| Accent / highlight outline | `rgba(59, 130, 246, 0.55)` | Blue-500 at alpha |
| Text on light cells | `#1f2937` | Tailwind slate-800 |
| Text on dark cells | `#ffffff` | Threshold at `|t| > 0.55` |
| Muted label text | `#64748b` | Slate-500 |
| One-hot zero cell | `#f1f5f9` bg, `#94a3b8` text | Slate-100 / slate-400 |
| Scalar result badge | bg `#fef3c7`, border `#f59e0b` | Amber-100 / amber-500 |

### Fonts (inherit from Slidev default, with mono-font spec inside components)

- Display: default Slidev sans for slide titles. Override to `Bricolage Grotesque` for the final formula slide (slide 19) only, if available.
- Mono: `JetBrains Mono, ui-monospace, monospace` for all cells, labels, operators.

### Sizing scale (matches built components)

| Token | cell | font | gap |
|-------|------|------|-----|
| `sm` | 26px | 9–10px | 2–4px |
| `md` | 40–46px | 12–13px | 3–5px |
| `lg` | 56–60px | 15–18px | 4–6px |

## 4. Slidev patterns cheat sheet

### Headmatter (top of `slides.md`)

```yaml
---
theme: default
title: Introduction to Embedding-Based Recommender Systems
info: |
  A 45-minute talk on collaborative filtering via matrix factorization.
  By Dr. Robert Kübler.
author: Dr. Robert Kübler
transition: fade
mdc: true
---
```

### Slide separator

A line with exactly `---` on its own.

### Per-slide frontmatter

```md
---
clicks: 8
layout: center
---
```

- `clicks: N` reserves N click states. Inside the slide, `$clicks` evaluates to 0..N.
- `layout: center` vertically centers.
- `layout: default` is the fallback.
- Use `layout: cover` only on slide 1.

### Click-revealed content

Three patterns we will use:

1. **Built-in directive**, one-element-per-click:
   ```md
   <v-clicks>

   - item 1
   - item 2
   - item 3

   </v-clicks>
   ```

2. **Component driven by `$clicks`**:
   ```md
   <EmbeddingVector :values="[...]" :visible="$clicks" />
   ```
   The component reads the number and renders partial state.

3. **Element-level `v-click`**:
   ```md
   <div v-click="2">shown on click 2</div>
   ```

### Code animations (magic-move)

Used on slides 23 (V1→V2) and 25 (V2→V3):

````md
````md magic-move
```python
# V1 code
```

```python
# V2 code with the new line
```
````
````

### Line highlighting in code blocks

```` ```python {1|3-5|all} ```` , separated by `|` for click stages. Use `{*|N-M}` for "first show all, then zoom to lines N–M".

### Presenter notes

HTML comments at the end of a slide.

```md
<!--
Say this out loud. Do not read verbatim. Pause after "grumpy".
-->
```

---

## 5. Built components

### `<EmbeddingVector>`

Row of cells where each cell's color maps from value via a diverging blue → neutral → red scale.

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `values` | `number[]` | required | Vector to render |
| `label` | `string` | `''` | Optional uppercase mono label above |
| `visible` | `number \| null` | `null` | If set, only first N cells are visible (others fade out). Bind to `$clicks` for reveal |
| `highlight` | `number[]` | `[]` | Cell indices to outline in blue and lift |
| `showValues` | `boolean` | `true` | Whether to print numeric value inside cell |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Sizing preset |
| `vmax` | `number` | `1` | Value that maps to fully saturated endpoint |

Example:

```md
<EmbeddingVector
  label="user 42"
  :values="[0.32, -0.81, 0.55, -0.12, 0.70, 0.04, -0.46, 0.93]"
  :visible="$clicks"
  size="lg"
/>
```

### `<OneHotVector>`

Sparse vector with zeros rendered as muted gray cells and the hot cell rendered in blue.

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `length` | `number` | required | Total vector length |
| `hotIndex` | `number` | required | Which cell is the "1" |
| `label` | `string` | `''` | Optional mono label |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Sizing preset |

Example: `<OneHotVector :length="8" :hotIndex="3" label="category drama" size="md" />`

### `<DotProduct>`

Two-vector animation that steps through: vectors → pairwise products → scalar sum.

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `vecA` | `number[]` | required | Top vector |
| `vecB` | `number[]` | required | Bottom vector |
| `labelA` | `string` | `'vector a'` | Label above top vector |
| `labelB` | `string` | `'vector b'` | Label above bottom vector |
| `step` | `number` | `2` | Animation state (0=vectors only, 1=+ products, 2=+ scalar sum). Bind to `$clicks` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Sizing preset |
| `vmax` | `number` | `1` | Color-saturation cap for input values |
| `pmax` | `number` | `1` | Color-saturation cap for product values (typically smaller) |

Example: `<DotProduct :vecA="[...]" :vecB="[...]" :step="$clicks" labelA="user 42" labelB="movie 2571" :pmax="0.8" />`

### `<EmbeddingPlot>`

Interactive scatter plot. Shows users (blue circles) and movies (red circles) at three stages: random init, clusters forming, clustered. Click-buttons at the bottom switch stages. No props, self-contained. Uses internal `ref` for stage.

---

## 6. Components to build (TODO)

Each spec below gives: purpose, where used, rendering description, props, and an implementation hint.

### `<StatCounter>`

**Purpose**: Animate a big number counting up from 0 to a target when it comes into view. For the business-impact slide (3).

**Rendering**: Large display number (e.g. `75%`) above a small caption (e.g. `of Netflix views from recommendations`). Count-up runs for ~1.2s with an ease-out curve.

**Props**:

| Prop | Type | Default |
|------|------|---------|
| `target` | `number` | required |
| `suffix` | `string` | `'%'` |
| `caption` | `string` | `''` |
| `duration` | `number` (ms) | `1200` |

**Implementation hint**: Use Vue's `onMounted` + `requestAnimationFrame` loop, interpolate 0 → target with `easeOutCubic`. Display via `Math.round`. Wrap in a flex column, big number in Bricolage or system bold, caption in muted slate-500 small uppercase.

Usage on slide 3:

```md
<div class="flex justify-around mt-12">
  <StatCounter :target="75" suffix="%" caption="Netflix views" />
  <StatCounter :target="60" suffix="%" caption="YouTube home clicks" />
  <StatCounter :target="35" suffix="%" caption="Amazon sales" />
</div>
```

### `<MetricBadge>`

**Purpose**: Display one metric with optional before/after or baseline comparison. For the V1-fails card (slide 21), V2-result card (slide 24), and the three-up final comparison (slide 27).

**Rendering**: Rounded card. Header: metric name in small uppercase mono (e.g. `MAE`). Body: big number (e.g. `0.77`). Footer (optional): delta pill showing `Δ vs baseline` with colored arrow (green for improvement, red for regression). Default variant light gray. "Good" variant green tint. "Bad" variant red tint.

**Props**:

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | required | Metric name |
| `value` | `number` | required | Main number |
| `digits` | `number` | `2` | Decimal places |
| `baseline` | `number \| null` | `null` | If set, show delta |
| `lowerIsBetter` | `boolean` | `true` | Direction of "improvement" for delta color |
| `variant` | `'default' \| 'good' \| 'bad'` | `'default'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |

Usage on slide 21 (V1 fails):

```md
<MetricBadge label="val MAE" :value="3.0" variant="bad" size="lg" />
```

Usage on slide 24 (V2 better):

```md
<MetricBadge label="val MAE" :value="0.77" :baseline="3.0" variant="good" size="lg" />
```

Usage on slide 27 (three-up):

```md
<div class="flex gap-6">
  <MetricBadge label="baseline MAE" :value="0.85" variant="default" />
  <MetricBadge label="V2 MAE" :value="0.77" :baseline="0.85" variant="default" />
  <MetricBadge label="V3 MAE" :value="0.746" :baseline="0.85" variant="good" />
</div>
```

### `<ArchitectureDiagram>`

**Purpose**: Visualize the full V3 pipeline as boxes and arrows, revealed click by click. For slide 26.

**Rendering**: Horizontal (or vertical) pipeline. Boxes from left to right:
1. Two parallel inputs: `user_id`, `movie_id` (top lane and bottom lane).
2. Each goes through an `IntegerLookup → Embedding` block. Top lane also splits into a `Bias Embedding (dim=1)` side-box. Same for bottom.
3. The two 32-d embedding outputs meet at a `Dot Product` node.
4. Dot product output and both bias outputs enter an `Add` node.
5. Add output enters a `4·σ(x)+1` squash node.
6. Final output: `rating` scalar.

Arrows connect each stage. Each box has a small mono label. As `$clicks` increments, boxes appear in this order: inputs → lookups → embeddings → biases → dot → add → squash → rating.

**Props**:

| Prop | Type | Default |
|------|------|---------|
| `step` | `number` | `8` | How many stages visible (bind to `$clicks`) |
| `compact` | `boolean` | `false` | Smaller boxes if true |

**Implementation hint**: SVG with `<g>` groups per stage, each gated on `step >= n`. Use CSS transitions on opacity and transform for reveal. Arrows are `<path>` or `<line>` elements. Alternative: use a flex layout with divs and CSS for the boxes, absolute positioning for arrows drawn in SVG overlay.

### `<RatingStars>`

**Purpose**: Render a fractional star rating (e.g. 3.03 → three filled plus a tiny sliver of the fourth). For slide 28.

**Rendering**: Five stars side by side. For value `v`, stars 1..floor(v) are fully filled, star floor(v)+1 is filled `(v - floor(v))` fraction via CSS clip-path or linear-gradient, remaining stars are empty outlines.

**Props**:

| Prop | Type | Default |
|------|------|---------|
| `value` | `number` | required | In [0, 5] |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `color` | `string` | `'#f59e0b'` | Fill color (amber-500) |

**Implementation hint**: 5 SVG star paths. Filled portion driven by a gradient stop computed from `value - i`. Or simpler: overlay a filled-star layer clipped to `clip-path: inset(0 (100-pct)% 0 0)` over an outline-star layer.

Usage: `<RatingStars :value="3.03" size="lg" />`

---

## 7. PyTorch code blocks (reference material for slides 20–25)

### V1 (slide 20)

```python
import torch
import torch.nn as nn

class MFModelV1(nn.Module):
    def __init__(self, n_users: int, n_movies: int, dim: int = 32):
        super().__init__()
        self.user_emb = nn.Embedding(n_users + 1, dim)
        self.movie_emb = nn.Embedding(n_movies + 1, dim)

    def forward(self, user_ids, movie_ids):
        u = self.user_emb(user_ids)
        m = self.movie_emb(movie_ids)
        return (u * m).sum(-1, keepdim=True)
```

### V2 (slide 23), diff vs V1 = just the return line

```python
class MFModelV2(nn.Module):
    def __init__(self, n_users: int, n_movies: int, dim: int = 32):
        super().__init__()
        self.user_emb = nn.Embedding(n_users + 1, dim)
        self.movie_emb = nn.Embedding(n_movies + 1, dim)

    def forward(self, user_ids, movie_ids):
        u = self.user_emb(user_ids)
        m = self.movie_emb(movie_ids)
        dot = (u * m).sum(-1, keepdim=True)
        return 4 * torch.sigmoid(dot) + 1   # <-- new
```

### V3 (slide 25), diff vs V2 = two bias embeddings + add

```python
class MFModelV3(nn.Module):
    def __init__(self, n_users: int, n_movies: int, dim: int = 32):
        super().__init__()
        self.user_emb = nn.Embedding(n_users + 1, dim)
        self.movie_emb = nn.Embedding(n_movies + 1, dim)
        self.user_bias = nn.Embedding(n_users + 1, 1)    # <-- new
        self.movie_bias = nn.Embedding(n_movies + 1, 1)  # <-- new

    def forward(self, user_ids, movie_ids):
        u = self.user_emb(user_ids)
        m = self.movie_emb(movie_ids)
        dot = (u * m).sum(-1, keepdim=True)
        x = dot + self.user_bias(user_ids) + self.movie_bias(movie_ids)  # <-- new
        return 4 * torch.sigmoid(x) + 1
```

### Prediction snippet (slide 28)

```python
# Will user 1 like movie 2?
model.eval()
with torch.no_grad():
    pred = model(torch.tensor([1]), torch.tensor([2]))
# pred -> tensor([[3.03]])
```

```python
# Rate every movie for user 1
user_ids = torch.ones(n_movies, dtype=torch.long)
movie_ids = torch.arange(n_movies)
with torch.no_grad():
    ratings = model(user_ids, movie_ids).squeeze()
top5 = ratings.topk(5)
```

### Reference numbers from the article

| Model | MSE | MAE | R² |
|-------|-----|-----|-----|
| mean-prediction baseline | — | ~0.85 | ~0.07 |
| V1 (raw dot) | — | ~3.0 (val) | — |
| V2 (+ squash) | ~0.97 | ~0.77 | ~0.177 |
| V3 (+ biases) | ~0.89 | ~0.746 | ~0.245 |

---

## 8. Slide-by-slide spec

Each slide lists: **layout**, **clicks** (if any), **exact on-slide content**, **goal**, optional **presenter notes**.

---

### Slide 1, Cover

- **Layout**: `cover`
- **Content**:
  - Title: `Introduction to Embedding-Based Recommender Systems`
  - Subtitle: `Matrix factorization from scratch in PyTorch`
  - Bottom-right: `Dr. Robert Kübler`
- **Goal**: Orient, set expectations.

---

### Slide 2, They are everywhere

- **Layout**: `default`
- **Clicks**: 3 (one per logo)
- **Content**:
  - Heading: `They are everywhere`
  - Three brand logos in a row, each wrapped in `<v-click>`: Netflix, YouTube, Amazon. Use text placeholders if no logo assets available: big display text `Netflix`, `YouTube`, `Amazon` in their brand colors (#E50914, #FF0000, #FF9900). Consider keeping plain neutral text to avoid trademark issues.
- **Goal**: Ground the topic in daily-use products.
- **Notes**: No speaker text on slide. Speaker says something like "Whether you open Netflix, YouTube, or Amazon, a model is quietly deciding what you see next."

---

### Slide 3, Business impact

- **Layout**: `default`
- **Content**:
  - Heading: `They move real money`
  - Three `<StatCounter>` in a flex row:
    - `target=75`, caption `of Netflix views come from recommendations`
    - `target=60`, caption `of YouTube home-screen clicks`
    - `target=35`, caption `of Amazon sales from cross-sell`
  - Footer citation small and muted: `Jannach & Jugovac, Measuring the Business Value of Recommender Systems, 2019`
- **Goal**: Show this is not a toy topic.

---

### Slide 4, Today's menu

- **Layout**: `default`
- **Clicks**: 3
- **Content**:
  - Heading: `Today`
  - Ordered list inside `<v-clicks>`:
    1. Design a simple collaborative recommender
    2. Build it in PyTorch, three versions
    3. Understand what it can and cannot do
- **Goal**: Contract with the audience.

---

### Slide 5, The recommendation signature

- **Layout**: `center`
- **Content**:
  - Centered box diagram drawn in HTML/CSS or SVG:
    - Two input boxes stacked on the left: `user` on top, `movie` on bottom, each rendered as a rounded div with mono label.
    - Right arrow.
    - One output box on the right: `rating`.
  - Caption below: `That's the whole job.`
- **Goal**: Collapse the problem to a single function signature.

---

### Slide 6, Meet MovieLens

- **Layout**: `default`
- **Content**:
  - Heading: `MovieLens-1M`
  - Styled data preview table. Use plain HTML `<table>`. Columns: `timestamp`, `user_id`, `movie_id`, `user_rating`, `...`. Render `user_id`, `movie_id`, `user_rating` with full opacity; render all other columns at opacity 0.3.
  - Five example rows. Example data:

| timestamp | user_id | movie_id | user_rating | movie_genres | user_gender | ... |
|-----------|---------|----------|-------------|--------------|-------------|-----|
| 978300760 | 1 | 1193 | 5 | Drama | F | ... |
| 978302109 | 1 | 661 | 3 | Animation | F | ... |
| 978301968 | 1 | 914 | 3 | Musical | F | ... |
| 978300275 | 1 | 3408 | 4 | Drama | F | ... |
| 978824291 | 1 | 2355 | 5 | Comedy | F | ... |

  - Caption: `1,000,000 rows. We'll use only three columns.`
- **Goal**: Ground in real data, establish we're keeping the minimum.

---

### Slide 7, Cold start teaser

- **Layout**: `default`
- **Content**:
  - Heading: `Time-based split`
  - A horizontal timeline bar divided at 90%. Left segment labeled `train (0 to 900k)` in blue. Right segment labeled `test (900k to 1M)` in red.
  - Below the bar, a callout box: `user 1: 0 rows in train, 53 rows in test`
  - Footer: `Some users and movies only appear in the test set. This is the cold-start problem. We'll come back to it.`
- **Goal**: Plant the cold-start seed.

---

### Slide 8, IDs are not numbers

- **Layout**: `center`
- **Content**:
  - Large mono text: `user_8323`
  - Arrow labeled `treat as integer?` with a red `X` over it
  - `8323` on the right, crossed out
  - Caption: `User 8323 is not "greater than" user 8322.`
- **Goal**: Kill the naive instinct.

---

### Slide 9, One-hot encoding

- **Layout**: `default`
- **Content**:
  - Heading: `One-hot encoding`
  - Three `<OneHotVector>` stacked:

```md
<OneHotVector :length="3" :hotIndex="0" label="hot" size="lg" />
<OneHotVector :length="3" :hotIndex="1" label="mild" size="lg" />
<OneHotVector :length="3" :hotIndex="2" label="cold" size="lg" />
```

  - Caption: `Every category gets a unique vector with a single 1.`
- **Goal**: Introduce the baseline encoding.

---

### Slide 10, One-hot is equidistant

- **Layout**: `default`
- **Content**:
  - Heading: `All pairs equidistant`
  - SVG equilateral triangle, each vertex a small `<OneHotVector size="sm">` (or just its label), edges labeled `d=√2` on all three.
  - Pull quote: `mild should be closer to hot than cold. One-hot loses that.`
- **Goal**: Show one-hot loses similarity structure.

---

### Slide 11, Curse of dimensionality

- **Layout**: `default`
- **Content**:
  - Heading: `Scale doesn't help`
  - `<OneHotVector :length="30" :hotIndex="7" size="sm" />` centered.
  - Large mono stat below: `length = 6040 for MovieLens users`
  - Footnote: `1 hot cell, 6039 zeros per user. Not practical.`
- **Goal**: Show real cardinality makes one-hot impractical.

---

### Slide 12, Embeddings, the real deal

- **Layout**: `default`
- **Clicks**: 8
- **Content**:
  - Heading: `Embeddings`
  - `<EmbeddingVector size="lg" :visible="$clicks" :values="[0.32, -0.81, 0.55, -0.12, 0.70, 0.04, -0.46, 0.93]" label="user 42" />`
  - Pull quote below: `Shorter vectors, more meaning.`
- **Goal**: First view of a real embedding. Reveal cell by cell.

---

### Slide 13, Training pulls similar things together

- **Layout**: `default`
- **Content**:
  - Heading: `Structure emerges from ratings alone`
  - `<EmbeddingPlot />` centered
  - Caption: `Nobody told the model what "fantasy" means. Similar tastes just cluster together.`
- **Goal**: The "aha" slide.

---

### Slide 14, NLP / LLM aside

- **Layout**: `default`
- **Content**:
  - Heading: `Same trick powers NLP`
  - A row rendering the sentence `The cat sat on the mat`, with each word having a tiny `<EmbeddingVector size="sm" :showValues="false">` above it (5 words, 5 mini vectors). Use deterministic but visually distinct arrays of 6 values each, for example:

```md
<div class="flex gap-6 items-end justify-center mt-6">
  <div class="flex flex-col items-center gap-1">
    <EmbeddingVector size="sm" :showValues="false" :values="[0.3, -0.6, 0.4, 0.1, -0.2, 0.5]" />
    <span class="font-mono text-sm">The</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <EmbeddingVector size="sm" :showValues="false" :values="[0.8, 0.2, -0.5, 0.6, -0.1, 0.3]" />
    <span class="font-mono text-sm">cat</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <EmbeddingVector size="sm" :showValues="false" :values="[-0.4, 0.3, 0.7, -0.2, 0.5, -0.1]" />
    <span class="font-mono text-sm">sat</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <EmbeddingVector size="sm" :showValues="false" :values="[0.1, -0.3, 0.2, 0.8, -0.4, 0.6]" />
    <span class="font-mono text-sm">on</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <EmbeddingVector size="sm" :showValues="false" :values="[-0.2, 0.4, 0.1, -0.5, 0.7, 0.2]" />
    <span class="font-mono text-sm">the</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <EmbeddingVector size="sm" :showValues="false" :values="[0.5, -0.1, 0.6, 0.3, -0.4, 0.8]" />
    <span class="font-mono text-sm">mat</span>
  </div>
</div>
```

  - Below the sentence, a second row showing `king − man + woman ≈ queen` as four tiny vectors in an algebraic layout:

```md
<div class="flex gap-3 items-center justify-center mt-10 font-mono">
  <div class="flex flex-col items-center gap-1">
    <EmbeddingVector size="sm" :showValues="false" :values="[0.6, 0.4, -0.2, 0.8, 0.1]" />
    <span>king</span>
  </div>
  <span class="text-2xl">−</span>
  <div class="flex flex-col items-center gap-1">
    <EmbeddingVector size="sm" :showValues="false" :values="[0.3, 0.1, -0.4, 0.2, -0.1]" />
    <span>man</span>
  </div>
  <span class="text-2xl">+</span>
  <div class="flex flex-col items-center gap-1">
    <EmbeddingVector size="sm" :showValues="false" :values="[-0.2, 0.6, 0.1, 0.3, 0.4]" />
    <span>woman</span>
  </div>
  <span class="text-2xl">≈</span>
  <div class="flex flex-col items-center gap-1">
    <EmbeddingVector size="sm" :showValues="false" :values="[0.1, 0.9, -0.5, 0.9, 0.6]" />
    <span>queen</span>
  </div>
</div>
```

  - Caption: `Every LLM is built on top of this idea.`
- **Goal**: In ~45 seconds, show this is bigger than recsys.

---

### Slide 15, Embedding layer = one-hot × dense

- **Layout**: `default`
- **Content**:
  - Heading: `Mechanically, just a lookup`
  - Left side: `<OneHotVector :length="6" :hotIndex="3" />` then a `·` then a grid of colored cells labeled `W (6 × 4)`, then `=` then an `<EmbeddingVector size="md" :showValues="false" :values="[0.3, -0.7, 0.4, 0.8]" />`.
  - Right side: same embedding vector, captioned `direct lookup`.
  - Arrow between sides labeled `equivalent`.
  - Footer: `Mathematically identical. A lookup just skips the matmul.`
- **Goal**: Second mental model for the embedding layer.

---

### Slide 16, Two vectors, one number?

- **Layout**: `center`
- **Content**:
  - Two `<EmbeddingVector size="md" :values="[...]" label="user 42"/>` and `<EmbeddingVector size="md" :values="[...]" label="movie 2571" />` stacked vertically.
  - A big `?` between them.
  - Below: an empty box with `?`.
  - Caption: `How do we combine two vectors into one rating?`
- **Goal**: Frame the next question.

---

### Slide 17, Dot product is the answer

- **Layout**: `default`
- **Clicks**: 2
- **Content**:
  - Heading: `Dot product`
  - `<DotProduct :step="$clicks" :vecA="[0.32, -0.81, 0.55, -0.12, 0.70, 0.04, -0.46, 0.93]" :vecB="[0.44, -0.62, 0.71, -0.28, 0.55, 0.17, -0.39, 0.82]" labelA="user 42" labelB="movie 2571" :pmax="0.8" size="md" />`
  - Footer: `High when vectors align. Low when they don't. That's our similarity score.`
- **Goal**: Visually derive the dot product.

---

### Slide 18, Matrix factorization

- **Layout**: `default`
- **Content**:
  - Heading: `Matrix factorization`
  - SVG or CSS grid: a 6×6 sparse rating matrix `R` on the left with a handful of filled cells (stars) and mostly gray. Then an `≈` sign. Then a tall matrix `U` (6×4). Then a `·` sign. Then a wide matrix `Mᵀ` (4×6).
  - Centered label below: `R ≈ U · Mᵀ`
  - Caption: `Dot products everywhere means you are implicitly factoring a matrix.`
- **Goal**: Second interpretation as low-rank matrix factorization.

---

### Slide 19, The formula

- **Layout**: `center`
- **Content**:
  - Single centered display: `r̂(u, m) = e_u · e_m`
  - Font size at least `5xl`. Use LaTeX if helpful: `$$\hat r(u, m) = \mathbf{e}_u \cdot \mathbf{e}_m$$`
  - Nothing else on the slide.
- **Goal**: One compact thing to remember.

---

### Slide 20, V1 in PyTorch

- **Layout**: `default`
- **Clicks**: 3
- **Content**:
  - Heading: `Version 1`
  - Code block with per-click line highlighting:

````md
```python {all|6-8|10-13}
import torch
import torch.nn as nn

class MFModelV1(nn.Module):
    def __init__(self, n_users: int, n_movies: int, dim: int = 32):
        super().__init__()
        self.user_emb = nn.Embedding(n_users + 1, dim)
        self.movie_emb = nn.Embedding(n_movies + 1, dim)

    def forward(self, user_ids, movie_ids):
        u = self.user_emb(user_ids)
        m = self.movie_emb(movie_ids)
        return (u * m).sum(-1, keepdim=True)
```
````

- **Goal**: Show how little code this is.

---

### Slide 21, V1 fails

- **Layout**: `center`
- **Content**:
  - Heading: `Uh oh.`
  - `<MetricBadge label="val MAE" :value="3.0" variant="bad" size="lg" />`
  - Below: `Worse than predicting the mean. Right? Not so fast.`
- **Goal**: Set up the surprise. **Robert voice active here**.

---

### Slide 22, Why V1 fails

- **Layout**: `default`
- **Content**:
  - Heading: `Output range mismatch`
  - SVG number line spanning `-∞` to `+∞`, with two markers at `1` and `5`, rating zone highlighted in green.
  - Caption: `A dot product can output anything in ℝ. Ratings live in [1, 5]. The model wastes most of its capacity figuring that out.`
- **Goal**: Diagnose the failure.

---

### Slide 23, V2, sigmoid squash

- **Layout**: `default`
- **Content**:
  - Heading: `Version 2, squash to [1, 5]`
  - Magic-move from V1 `forward` body to V2 `forward` body:

````md
````md magic-move
```python
def forward(self, user_ids, movie_ids):
    u = self.user_emb(user_ids)
    m = self.movie_emb(movie_ids)
    return (u * m).sum(-1, keepdim=True)
```

```python
def forward(self, user_ids, movie_ids):
    u = self.user_emb(user_ids)
    m = self.movie_emb(movie_ids)
    dot = (u * m).sum(-1, keepdim=True)
    return 4 * torch.sigmoid(dot) + 1
```
````
````

  - Right side: small sketch of the sigmoid curve scaled to [1, 5]. Caption below curve: `Your old pal, the sigmoid, scaled to [1, 5].`
- **Goal**: Show the one-line fix. **Robert voice active here**.

---

### Slide 24, V2 result

- **Layout**: `center`
- **Content**:
  - Heading: `Much better`
  - `<MetricBadge label="val MAE" :value="0.77" :baseline="3.0" variant="good" size="lg" />`
  - Optional companion: `<MetricBadge label="R²" :value="0.177" :baseline="0.07" variant="good" />`
- **Goal**: Payoff after V2.

---

### Slide 25, V3, bias terms

- **Layout**: `default`
- **Content**:
  - Heading: `Version 3, add bias`
  - Magic-move from V2 class to V3 class (full class this time). The new lines: two `nn.Embedding(..., 1)` in `__init__`, and the `x = dot + self.user_bias(...) + self.movie_bias(...)` in `forward`.

````md
````md magic-move
```python
class MFModel(nn.Module):
    def __init__(self, n_users, n_movies, dim=32):
        super().__init__()
        self.user_emb = nn.Embedding(n_users + 1, dim)
        self.movie_emb = nn.Embedding(n_movies + 1, dim)

    def forward(self, user_ids, movie_ids):
        u = self.user_emb(user_ids)
        m = self.movie_emb(movie_ids)
        dot = (u * m).sum(-1, keepdim=True)
        return 4 * torch.sigmoid(dot) + 1
```

```python
class MFModel(nn.Module):
    def __init__(self, n_users, n_movies, dim=32):
        super().__init__()
        self.user_emb = nn.Embedding(n_users + 1, dim)
        self.movie_emb = nn.Embedding(n_movies + 1, dim)
        self.user_bias = nn.Embedding(n_users + 1, 1)
        self.movie_bias = nn.Embedding(n_movies + 1, 1)

    def forward(self, user_ids, movie_ids):
        u = self.user_emb(user_ids)
        m = self.movie_emb(movie_ids)
        dot = (u * m).sum(-1, keepdim=True)
        x = dot + self.user_bias(user_ids) + self.movie_bias(movie_ids)
        return 4 * torch.sigmoid(x) + 1
```
````
````

  - Caption: `Some users rate everything 4. Some movies are universally loved. The biases do the coarse work, the embeddings do the fine-tuning.`
- **Goal**: Last refinement with a human motivation.

---

### Slide 26, V3 architecture

- **Layout**: `default`
- **Clicks**: 8
- **Content**:
  - Heading: `The full pipeline`
  - `<ArchitectureDiagram :step="$clicks" />`
- **Goal**: Consolidate everything into one picture, revealed step by step.

---

### Slide 27, Results comparison

- **Layout**: `default`
- **Content**:
  - Heading: `Three models, three results`
  - Row of three `<MetricBadge>` for MAE:
    - `label="baseline MAE" value=0.85 variant="default"`
    - `label="V2 MAE" value=0.77 baseline=0.85 variant="default"`
    - `label="V3 MAE" value=0.746 baseline=0.85 variant="good"`
  - Row of three `<MetricBadge>` for R²:
    - `label="baseline R²" value=0.07`
    - `label="V2 R²" value=0.177 baseline=0.07`
    - `label="V3 R²" value=0.245 baseline=0.07 variant="good"`
  - Footer: `No hyperparameter tuning yet.`
- **Goal**: Show the progression pays off honestly.

---

### Slide 28, Predictions demo

- **Layout**: `default`
- **Content**:
  - Heading: `Using the model`
  - Two-column layout (use `layout: two-cols` or a flex div).
  - **Left**: small code block (V3 prediction snippet from section 7 above) plus:

```md
<div class="mt-4">
  <RatingStars :value="3.03" size="lg" />
  <p class="font-mono text-sm mt-2">predicted: 3.03</p>
</div>
```

  - **Right**: a simple list of "top 5 for user 1" with movie ids and `<RatingStars>` each. Example:

```md
<ul>
  <li>movie 2571 — <RatingStars :value="4.71" /></li>
  <li>movie 1198 — <RatingStars :value="4.68" /></li>
  <li>movie 858  — <RatingStars :value="4.62" /></li>
  <li>movie 318  — <RatingStars :value="4.58" /></li>
  <li>movie 50   — <RatingStars :value="4.55" /></li>
</ul>
```

- **Goal**: Show the payoff in a product-shaped form.

---

### Slide 29, Trade-offs

- **Layout**: `two-cols`
- **Content**:
  - Heading: `What this model is`
  - Left column (header `Strengths`, green checks):
    - Needs only interactions, no side features
    - Works broadly across domains
    - Fast to train and query
    - Embeddings often interpretable post-hoc
  - Right column (header `Limits`, red Xs):
    - Cold start for new users and movies
    - No content features used
    - No sequence or recency modeling
    - Requires enough interaction data
- **Goal**: Honest balance.

---

### Slide 30, What's next, Q&A

- **Layout**: `default`
- **Content**:
  - Heading: `Thanks. Questions?`
  - Three next-step bullets:
    1. Hybrid recommenders, content + collaborative
    2. Deep models over embeddings (MLPs, transformers)
    3. Sequential recsys, using order of interactions
  - Footer with resources:
    - Article: `https://towardsdatascience.com/introduction-to-embedding-based-recommender-systems-956faceb1919`
    - Follow-up on cold start: `https://towardsdatascience.com/a-performant-recommender-system-without-cold-start-problem-69bf2f0f0b9b`
    - LinkedIn: `https://www.linkedin.com/in/dr-robert-kübler-983859150/`
- **Goal**: Close, point to resources, invite questions.

---

## 9. Voice rules

- **No em dashes** in visible text. Use commas, colons, or parentheses.
- **Sparse tone**. Use Robert's signature phrases only twice across the whole deck:
  - Slide 21 caption: `Worse than predicting the mean. Right? Not so fast.`
  - Slide 23 sigmoid caption: `Your old pal, the sigmoid, scaled to [1, 5].`
- Do not write "Let's" on slides. If needed in speaker notes, use "Let us".
- Do not add closing formulae like "Thanks for reading" to slides, these belong to articles, not talks. The sign-off slide says simply `Thanks. Questions?`.
- Keep captions under 15 words where possible.

## 10. Build order

1. **Components**: `<StatCounter>`, `<MetricBadge>`, `<ArchitectureDiagram>`, `<RatingStars>`. Each gets a small playground slide to verify.
2. **Wipe** existing playground slides in `slides.md` once all 4 TODO components render correctly.
3. **Stamp acts sequentially**: Act 1 (slides 1–4) → review with Robert → Act 2 → review → Act 3 → review → etc.
4. **Final pass**: check every caption for em dashes, check click counts match declared `clicks:` frontmatter, run `pnpm run dev` and click through the whole deck, then `pnpm run build` to confirm it exports cleanly.

## 11. How to run

```bash
cd presentations/embedding-recsys/slidev
npm install
npm run dev     # http://localhost:3030
npm run build   # static SPA in dist/
npm run export  # PDF (requires playwright-chromium; already in devDependencies)
```

## 12. Open points / known issues

- Brand logos on slide 2 need either local SVG assets or plain styled text fallback. Decide before build.
- The matrix factorization visual on slide 18 is the most complex static graphic. Consider SVG hand-authored, or a small Vue component if time allows.
- If `<ArchitectureDiagram>` becomes unwieldy, it is acceptable to fall back to a single hand-drawn SVG image asset with CSS-gated reveal layers.
- Check whether the article's R² of `0.07` for the baseline in fact corresponds to the HGB run (which we are dropping). If so, use "mean-prediction" as the baseline label consistently and keep the 0.07 number since the article states HGB scored about the same as mean prediction.
