# Portfolio Persona Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shift the portfolio's perceived persona from "prolific ML writer / academic" to "senior data scientist who sets technical direction, ships production systems, and teaches."

**Architecture:** All changes are copy and structure edits to `index.html` only. No new files are created. CSS additions go into the existing `<style>` block in `index.html`. Visual design (colors, typography, spacing) is untouched.

**Tech Stack:** Plain HTML/CSS. No build step. Open `index.html` in a browser to verify visually after each task.

**Spec:** `docs/superpowers/specs/2026-03-21-portfolio-persona-redesign.md`

---

### Task 1: Hero — Eyebrow and Subtitle

**Files:**
- Modify: `index.html` (hero section, lines ~871–885)

- [ ] **Step 1: Update the eyebrow label**

Find:
```html
<p class="hero-eyebrow">PhD Mathematics · Data Science · Algorithms</p>
```
Replace with:
```html
<p class="hero-eyebrow">Senior Data Scientist · Educator · PhD Mathematician</p>
```

- [ ] **Step 2: Update the hero subtitle**

Find:
```html
<p class="hero-subtitle">
  PhD mathematician with a love for theory who also builds and deploys.
  Specialising in <strong>time series forecasting</strong>,
  <strong>recommender systems</strong>, and <strong>causal inference</strong>
  across 6+ years in production data science.
</p>
```
Replace with:
```html
<p class="hero-subtitle">
  I set technical direction for ML teams, ship forecasting systems, and translate
  complex models into <strong>business outcomes</strong>. PhD in mathematics.
  7+ years at the intersection of research, production, and teaching.
</p>
```

- [ ] **Step 3: Verify visually**

Open `index.html` in a browser. The hero eyebrow should read "Senior Data Scientist · Educator · PhD Mathematician" and the subtitle should open with "I set technical direction..."

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "content: reframe hero eyebrow and subtitle toward leadership identity"
```

---

### Task 2: Hero — Stats Bar

**Files:**
- Modify: `index.html` (stats bar, lines ~917–934)

- [ ] **Step 1: Replace the four stats**

Find the entire stats bar block:
```html
<div class="stats-bar">
  <div class="stat">
    <div class="stat-number">6<span>+</span></div>
    <div class="stat-label">Years in Production ML</div>
  </div>
  <div class="stat">
    <div class="stat-number">90<span>+</span></div>
    <div class="stat-label">Technical Articles</div>
  </div>
  <div class="stat">
    <div class="stat-number">1M<span>+</span></div>
    <div class="stat-label">Article Reads</div>
  </div>
  <div class="stat">
    <div class="stat-number">150<span>+</span></div>
    <div class="stat-label">Research Citations</div>
  </div>
</div>
```
Replace with:
```html
<div class="stats-bar">
  <div class="stat">
    <div class="stat-number">5<span>+</span></div>
    <div class="stat-label">Years in Senior ML Roles</div>
  </div>
  <div class="stat">
    <div class="stat-number">€10M<span>+</span></div>
    <div class="stat-label">Revenue Impact</div>
  </div>
  <div class="stat">
    <div class="stat-number">50<span>+</span></div>
    <div class="stat-label">Professionals Taught</div>
  </div>
  <div class="stat">
    <div class="stat-number">1M<span>+</span></div>
    <div class="stat-label">Article Reads</div>
  </div>
</div>
```

- [ ] **Step 2: Verify visually**

Open `index.html` in a browser. Stats bar should show: 5+ / €10M+ / 50+ / 1M+. Confirm the €10M+ stat number fits within its cell without overflow (the `stat-number` font is monospace 1.5rem — it will fit).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "content: replace stats bar with impact and mentorship metrics"
```

---

### Task 3: Hero — Pillars Strip

**Files:**
- Modify: `index.html` (style block + hero section, after stats bar)

- [ ] **Step 1: Add CSS for the pillars strip**

In the `<style>` block, find the comment `/* ─── About ─────────────────────────────────────────────── */` and insert the following block directly above it:

```css
/* ─── Pillars strip ─────────────────────────────────────── */
.pillars {
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--card);
  overflow: hidden;
}

.pillar {
  flex: 1;
  min-width: 160px;
  padding: 20px 24px;
  border-right: 1px solid var(--border);
}

.pillar:last-child { border-right: none; }

.pillar-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  margin-bottom: 6px;
}

.pillar-desc {
  font-size: 0.83rem;
  color: var(--text-muted);
  line-height: 1.5;
}
```

- [ ] **Step 2: Add the pillars HTML**

In the HTML, find the closing tag of the stats bar — i.e. the `</div>` that closes `<div class="stats-bar">` — and insert the following directly after it (still inside `<div class="container">`):

```html
<!-- Pillars strip -->
<div class="pillars">
  <div class="pillar">
    <div class="pillar-title">Lead</div>
    <div class="pillar-desc">Technical direction, engineering standards, mentoring junior scientists</div>
  </div>
  <div class="pillar">
    <div class="pillar-title">Build</div>
    <div class="pillar-desc">Forecasting, recommenders, causal inference in production</div>
  </div>
  <div class="pillar">
    <div class="pillar-title">Teach</div>
    <div class="pillar-desc">90+ articles, official ML curriculum, 1M+ readers</div>
  </div>
</div>
```

- [ ] **Step 3: Verify visually**

Open `index.html` in a browser. Below the stats bar there should be a matching card with three columns: Lead / Build / Teach. Each has a bronze-gold uppercase title and a gray description. On a narrow viewport (< 480px), the pillars should stack vertically.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add pillars strip to hero section (Lead / Build / Teach)"
```

---

### Task 4: About Section

**Files:**
- Modify: `index.html` (about section, lines ~938–962)

- [ ] **Step 1: Update the section title**

Find:
```html
<h2 class="section-title">Where theory meets production</h2>
```
Replace with:
```html
<h2 class="section-title">Research depth. Production reality.</h2>
```

- [ ] **Step 2: Rewrite the first paragraph**

Find:
```html
<p class="about-text">
  Hi, I'm Robert. I have a <strong>PhD in mathematics</strong> and I genuinely enjoy
  the theoretical side of things: algorithms, probability, the elegance of a clean proof.
  My PhD research at Ruhr University Bochum was on
  <strong>memory-efficient cryptographic algorithms</strong> for the Learning Parity
  with Noise problem. I'm also a Senior Staff Data Scientist at <strong>ALDI DX</strong>,
  where I own the technical vision for a time-series forecasting product serving business
  planners across 150+ series. When theory meets a real problem, I get practical and ship.
</p>
```
Replace with:
```html
<p class="about-text">
  Hi, I'm Robert. I'm a Senior Staff Data Scientist at <strong>ALDI DX</strong>,
  where I set the technical direction for a forecasting product serving business
  planners across 150+ time series. I also mentor data scientists, design and deliver
  official ML curricula, and write for a 1M+ readership. My
  <strong>PhD in mathematics</strong> gives me the depth to go from a whiteboard proof
  to a production model without losing either rigour or pragmatism.
</p>
```

- [ ] **Step 3: Remove the freelance sentence from the second paragraph**

Find this sentence inside the second `<p class="about-text">`:
```html
I occasionally take on selected freelance projects; feel free to reach out.
```
Delete that sentence (and any surrounding whitespace that becomes orphaned). The paragraph should end cleanly after the open-source contributions sentence.

- [ ] **Step 4: Verify visually**

Open `index.html` in a browser. The About section should open with the ALDI DX role, not the PhD. The second paragraph should no longer mention freelance work.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "content: reframe about section to lead with role and impact"
```

---

### Task 5: Experience Section

**Files:**
- Modify: `index.html` (experience section, lines ~964–1060)

- [ ] **Step 1: Update the section title**

Find:
```html
<h2 class="section-title">Where I've worked</h2>
```
Replace with:
```html
<h2 class="section-title">Experience</h2>
```

- [ ] **Step 2: Rewrite the Publicis Media bullets**

Find the Publicis Media timeline item bullets:
```html
<ul class="timeline-bullets">
  <li>Predictive models (Random Forests, neural networks, boosting) with Python, scikit-learn, PyTorch, CatBoost</li>
  <li>Statistical twin matching via Nearest Neighbor Search</li>
</ul>
```
Replace with:
```html
<ul class="timeline-bullets">
  <li>Predicted TV ad view-through rates for media clients: modeled what share of an advertising block audiences would watch</li>
  <li>Joined datasets without a common identifier using statistical record linkage (Nearest Neighbor matching)</li>
  <li>Built the data backend for a competitive benchmarking dashboard, enabling a client to compare performance against direct competitors across key metrics</li>
</ul>
```

- [ ] **Step 3: Verify visually**

Open `index.html` in a browser. The Experience section title should read "Experience". The Publicis Media entry should have three bullets that describe outcomes, not tool names.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "content: neutralise experience title, reframe Publicis bullets as outcomes"
```

---

### Task 6: Skills Section — Add Leadership Card

**Files:**
- Modify: `index.html` (skills section)

- [ ] **Step 1: Locate the skills grid**

Find the opening of the skills grid:
```html
<div class="skills-grid">
```

- [ ] **Step 2: Insert the Leadership & Communication card as the first child**

Insert the following block immediately after `<div class="skills-grid">`:

```html
<div class="skill-card">
  <div class="skill-card-title">Leadership &amp; Communication</div>
  <div class="tags">
    <span class="tag">Technical Vision</span>
    <span class="tag">Team Mentoring</span>
    <span class="tag">Engineering Standards</span>
    <span class="tag">Technical Writing</span>
    <span class="tag">Curriculum Design</span>
    <span class="tag">Public Speaking</span>
    <span class="tag">Stakeholder Communication</span>
  </div>
</div>
```

- [ ] **Step 3: Verify visually**

Open `index.html` in a browser. In the Skills section, the first card should be "Leadership & Communication" with the seven tags. All existing skill cards should appear after it, unchanged.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "content: add Leadership & Communication as first skill card"
```

---

## Done

All six tasks complete. The page now projects: senior technical data scientist who sets direction, ships systems, and teaches — not a prolific writer or pure academic.

Final visual check: scroll from top to bottom in a browser and confirm the hero, about, experience, and skills sections all read consistently with the new persona.
