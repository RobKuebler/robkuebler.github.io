# Portfolio Persona Redesign

**Date:** 2026-03-21
**Scope:** Content, copy, and structure changes to `index.html` only. No CSS redesign.
**Goal:** Shift perceived persona from "prolific ML writer / practitioner" to "senior technical data scientist who sets direction, ships production systems, and teaches."

---

## Context

Dr. Robert Kubler's portfolio currently reads as an academic/writer first (stats bar shows articles, reads, citations) and a practitioner second. The visual design (warm editorial, DM Serif Display, bronze-gold) is already appropriate and stays unchanged.

Primary audience: recruiters and hiring managers. Secondary: business stakeholders. Tertiary: ML community.

---

## Changes

### 1. Hero Section

**Eyebrow label**
- Before: `PhD Mathematics · Data Science · Algorithms`
- After: `Senior Data Scientist · Educator · PhD Mathematician`
- Why: Leads with role identity. PhD becomes a depth signal, not the primary label.

**Subtitle**
- Before: "PhD mathematician with a love for theory who also builds and deploys. Specialising in time series forecasting, recommender systems, and causal inference across 6+ years in production data science."
- After: "I set technical direction for ML teams, ship forecasting systems, and translate complex models into business outcomes. PhD in mathematics. 6+ years at the intersection of research, production, and teaching."
- Why: Opens with action verbs and impact framing. Removes "love for theory" (IC signal). PhD shifts from opening identity to supporting credential.

**Stats bar** (4 items, same visual component)
- Before: 6+ Years in Production ML / 90+ Technical Articles / 1M+ Article Reads / 150+ Research Citations
- After: 6+ Years in Senior ML Roles / €10M+ Revenue Impact / 50+ Professionals Taught / 1M+ Article Reads
- Why: Revenue impact and mentorship numbers signal business value and seniority. Article Reads stays (reach). Citations removed (academic signal).

**New: Pillars strip** (new HTML block below stats bar, same visual style as stats bar)
Three panels using existing `.stats-bar` / `.stat` pattern or a new `.pillars` / `.pillar` class with the same border/background treatment:

| Pillar | Title | Description |
|--------|-------|-------------|
| 1 | Lead | Technical direction, engineering standards, mentoring junior scientists |
| 2 | Build | Forecasting, recommenders, causal inference in production |
| 3 | Teach | 90+ articles, official ML curriculum, 1M+ readers |

The pillars strip sits below the stats bar with `margin-top: 16px`. Same card style: border, border-radius `--radius-lg`, background `--card`.

---

### 2. About Section

**Section title**
- Before: "Where theory meets production"
- After: "Research depth. Production reality."

**First paragraph**
- Before: "Hi, I'm Robert. I have a PhD in mathematics and I genuinely enjoy the theoretical side of things: algorithms, probability, the elegance of a clean proof. My PhD research at Ruhr University Bochum was on memory-efficient cryptographic algorithms for the Learning Parity with Noise problem. I'm also a Senior Staff Data Scientist at ALDI DX, where I own the technical vision for a time-series forecasting product serving business planners across 150+ series. When theory meets a real problem, I get practical and ship."
- After: "Hi, I'm Robert. I'm a Senior Staff Data Scientist at ALDI DX, where I set the technical direction for a forecasting product serving business planners across 150+ time series. I also mentor data scientists, design and deliver official ML curricula, and write for a 1M+ readership. My PhD in mathematics gives me the depth to go from a whiteboard proof to a production model without losing either rigour or pragmatism."
- Why: ALDI DX role and impact first. PhD repositioned as the enabler of depth, not the defining identity.

**Second paragraph**
- Remove the sentence: "I occasionally take on selected freelance projects; feel free to reach out."
- Keep everything else (sktime curriculum, speaking, open-source contributions).
- Why: Freelance is already visible in the Experience section. Mentioning it in About dilutes the senior-employee narrative.

---

### 3. Experience Section

**Section title**
- Before: "Where I've worked"
- After: "Experience"
- Why: Neutral headers scan better for recruiters.

**Publicis Media bullets** (currently tool-heavy, no outcomes)
- Before:
  - "Predictive models (Random Forests, neural networks, boosting) with Python, scikit-learn, PyTorch, CatBoost"
  - "Statistical twin matching via Nearest Neighbor Search"
- After:
  - "Built predictive audience models across multiple client verticals, owning the full pipeline from feature engineering to deployment"
  - "Applied statistical matching methods for causal lift measurement in campaign analysis"
- Why: All other bullets already lead with outcomes. Publicis was the only exception.

All other experience bullets remain unchanged.

---

### 4. Skills Section

**New card: Leadership & Communication** (inserted as first card in the grid)
- Title: `Leadership & Communication`
- Tags: `Technical Vision` · `Team Mentoring` · `Engineering Standards` · `Technical Writing` · `Curriculum Design` · `Public Speaking` · `Stakeholder Communication`
- Why: Skills section currently shows only technical tags. Adding a leadership card first signals that technical depth is a tool, not the entire identity.

All existing skill cards remain unchanged, shifted one position in the grid.

---

## What Does Not Change

- Visual design: colors, typography, spacing, border radius, all CSS
- All other sections: Writing, Projects, Publications, Education, Volunteer, Contact
- Nav links and order
- All URLs, links, social buttons
- Page metadata (title, description tags) — update separately as a follow-up if desired

---

## Files Affected

- `index.html` — all changes are in this file only

---

## Success Criteria

A recruiter landing on the page should within 3 seconds understand:
1. Robert is a senior technical data scientist (not a junior, not just a writer)
2. He has driven measurable business impact (€10M+ revenue)
3. He teaches and mentors (50+ professionals, 1M+ readers)
4. He has rare depth (PhD in mathematics)
