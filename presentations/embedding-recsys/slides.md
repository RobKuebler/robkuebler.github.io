---
theme: default
colorSchema: light
layout: cover
title: Introduction to Embedding-Based Recommender Systems
info: |
  A 45-minute talk on collaborative filtering via matrix factorization.
  By Dr. Robert Kübler.
author: Dr. Robert Kübler
transition: fade
mdc: true
---

# Introduction to Embedding-Based<br>Recommender Systems

Matrix factorization from scratch in PyTorch

<div class="abs-br m-6 text-sm opacity-60">Dr. Robert Kübler</div>

---
clicks: 3
class: flex flex-col
---

# They are everywhere!

<div class="flex-1 flex items-center justify-around gap-16">
  <v-click>
  <div class="flex flex-col items-center gap-4">
    <div class="text-5xl font-bold" style="color:#E50914">Netflix</div>
    <StatCounter :target="75" suffix="%" caption="of views come from recommendations" />
  </div>
  </v-click>
  <v-click>
  <div class="flex flex-col items-center gap-4">
    <div class="text-5xl font-bold" style="color:#FF0000">YouTube</div>
    <StatCounter :target="60" suffix="%" caption="of home-screen clicks" />
  </div>
  </v-click>
  <v-click>
  <div class="flex flex-col items-center gap-4">
    <div class="text-5xl font-bold" style="color:#FF9900">Amazon</div>
    <StatCounter :target="35" suffix="%" caption="of sales from cross-sell" />
  </div>
  </v-click>
</div>

<div class="abs-b mb-6 text-xs opacity-50 text-center font-mono">
  Jannach and Jugovac, Measuring the Business Value of Recommender Systems, 2019
</div>

<!--
Whether you open Netflix, YouTube, or Amazon, a model is quietly deciding what you see next.
-->

---
clicks: 3
class: flex flex-col
---

# Today

<div class="flex-1 flex flex-col justify-center">
<v-clicks>

1. Design a simple collaborative recommender
2. Build it in PyTorch, three versions
3. Understand what it can and cannot do

</v-clicks>
</div>

---
clicks: 5
---

# Example data: MovieLens-1M

<table class="mt-4 text-sm w-full border-collapse font-mono">
  <thead>
    <tr class="border-b-2 border-gray-200">
      <th class="py-2 px-3 text-left opacity-30">timestamp</th>
      <th class="py-2 px-3 text-left">user_id</th>
      <th class="py-2 px-3 text-left">movie_id</th>
      <th class="py-2 px-3 text-left">user_rating</th>
      <th class="py-2 px-3 text-left opacity-30">movie_genres</th>
      <th class="py-2 px-3 text-left opacity-30">user_gender</th>
      <th class="py-2 px-3 text-left opacity-30">...</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-gray-100">
      <td class="py-2 px-3 opacity-30">978300760</td><td class="py-2 px-3">1</td><td class="py-2 px-3">1193</td><td class="py-2 px-3">5</td><td class="py-2 px-3 opacity-30">Drama</td><td class="py-2 px-3 opacity-30">F</td><td class="py-2 px-3 opacity-30">...</td>
    </tr>
    <tr class="border-b border-gray-100">
      <td class="py-2 px-3 opacity-30">978302109</td><td class="py-2 px-3">1</td><td class="py-2 px-3">661</td><td class="py-2 px-3">3</td><td class="py-2 px-3 opacity-30">Animation</td><td class="py-2 px-3 opacity-30">F</td><td class="py-2 px-3 opacity-30">...</td>
    </tr>
    <tr class="border-b border-gray-100">
      <td class="py-2 px-3 opacity-30">978301968</td><td class="py-2 px-3">1</td><td class="py-2 px-3">914</td><td class="py-2 px-3">3</td><td class="py-2 px-3 opacity-30">Musical</td><td class="py-2 px-3 opacity-30">F</td><td class="py-2 px-3 opacity-30">...</td>
    </tr>
    <tr class="border-b border-gray-100">
      <td class="py-2 px-3 opacity-30">978300275</td><td class="py-2 px-3">1</td><td class="py-2 px-3">3408</td><td class="py-2 px-3">4</td><td class="py-2 px-3 opacity-30">Drama</td><td class="py-2 px-3 opacity-30">F</td><td class="py-2 px-3 opacity-30">...</td>
    </tr>
  </tbody>
</table>

<p class="caption">(1,000,000 rows.)</p>

<v-click :at="1">

Things to build:

</v-click>

<div class="mt-2 ml-4 flex flex-col gap-1 text-sm">
  <div class="flex items-center gap-3">
    <v-click :at="2"><span style="position: relative; display: inline-block;">1. <strong>collaborative filtering</strong>: only use user_id and movie_id to predict user_rating<RightLabel text="← focus on this first" :visible="$clicks >= 5" /></span></v-click>
  </div>
  <v-click :at="3"><div>2. <strong>content-based recommender</strong>: only use user features (gender, age, ...) and movie features (genre, year, ...)</div></v-click>
  <v-click :at="4"><div>3. <strong>hybrid approach</strong>: use everything</div></v-click>
</div>

---
class: flex flex-col
---

# Regression task

<div class="flex-1 flex flex-col items-center justify-center gap-8">

<div style="height: 280px; width: 100%; display: flex; align-items: center; justify-content: center;">
<div style="transform: scale(2.5); transform-origin: center center;">

```mermaid
flowchart LR
    user([user_id]) --> rec[Recommender]
    movie([movie_id]) --> rec
    rec --> rating([user_rating])

    style user fill:#f1f5f9,stroke:#94a3b8,color:#0f172a
    style movie fill:#f1f5f9,stroke:#94a3b8,color:#0f172a
    style rec fill:#f3e8ff,stroke:#c084fc,color:#0f172a
    style rating fill:#dbeafe,stroke:#93c5fd,color:#0f172a
```

</div>
</div>

<p class="caption">That's the whole job.</p>
</div>

---
class: flex flex-col
---

# The core challenge

<div class="flex-1 flex flex-col items-center justify-center gap-10">

<p class="text-center text-base opacity-70 max-w-xl">
  A model only understands numbers. But a user or a movie is just a label, an ID with no numeric meaning.
</p>

<div class="flex items-center gap-10 font-mono text-lg">
  <div class="flex flex-col items-center gap-2">
    <div class="text-8xl">🧑</div>
  </div>
  <div class="text-6xl opacity-40">→</div>
  <div class="px-8 py-5 rounded-xl border-2 border-dashed border-purple-400 text-purple-600 font-bold text-5xl">
    ?
  </div>
  <div class="text-6xl opacity-40">→</div>
  <div class="flex flex-col items-center gap-2">
    <div class="text-8xl">🔢</div>
  </div>
</div>

<p class="text-center text-base opacity-70 max-w-xl">
  The whole trick: find a function that maps each user and each movie to a vector of numbers that captures <i>something meaningful</i>.
</p>

</div>

---
disabled: true
---

# Time-based split

<div class="mt-10">
  <div class="flex rounded-lg overflow-hidden h-14 text-white font-mono text-sm">
    <div class="flex items-center justify-center" style="width:90%;background:rgb(59,130,246)">train (0 to 900k)</div>
    <div class="flex items-center justify-center" style="width:10%;background:rgb(239,68,68)">test</div>
  </div>
  <div class="flex justify-between mt-1 text-xs opacity-40 font-mono">
    <span>0</span><span>900k</span><span>1M</span>
  </div>
</div>

<div class="mt-6 border-2 border-amber-400 rounded-xl p-4 bg-amber-50 font-mono text-sm">
  user 1: 0 rows in train, 53 rows in test
</div>

<p class="mt-6 text-sm opacity-60">Some users and movies only appear in the test set. This is the cold-start problem. We'll come back to it.</p>

---
class: flex flex-col
---

# How **not** to do it: Use IDs directly

<div class="flex-1 flex flex-col justify-center gap-8">
<p class="text-sm opacity-70">It might be tempting to just pass the IDs directly into the model as numerical features. After all, we already have numbers.</p>

<div class="text-center">
  <div class="text-5xl font-mono mb-8">user_id = 8323</div>
  <p class="opacity-60 text-sm">These IDs are arbitrary. User 8323 is not "greater than" user 8322, and 8323 is not twice as relevant as user 4161. The model would learn garbage. 💀</p>
</div>
</div>

---
layout: two-cols-header
clicks: 1
---

# How **not** to do it: One-hot encoding

::left::

<div class="mt-4 flex flex-col gap-6">
  <OneHotVector :length="3" :hotIndex="0" label="Horror" size="lg" />
  <OneHotVector :length="3" :hotIndex="1" label="Thriller" size="lg" />
  <OneHotVector :length="3" :hotIndex="2" label="Romance" size="lg" />
</div>

<p class="caption">Every category gets a unique vector with a single 1.</p>

::right::

<v-click>

<div class="flex justify-center mt-4">
  <div class="relative" style="width:360px;height:320px">
    <svg class="absolute inset-0" width="360" height="320" viewBox="0 0 360 320">
      <polygon points="60,90 300,90 180,250" fill="none" stroke="#94a3b8" stroke-width="2"/>
    </svg>
    <!-- top edge label -->
    <div class="absolute text-xs text-slate-400" style="top:55px;left:50%;transform:translateX(-50%)"><Math tex="d=\sqrt{2}" /></div>
    <!-- left edge label -->
    <div class="absolute text-xs text-slate-400" style="top:162px;left:50px"><Math tex="d=\sqrt{2}" /></div>
    <!-- right edge label -->
    <div class="absolute text-xs text-slate-400" style="top:162px;right:50px"><Math tex="d=\sqrt{2}" /></div>
    <div class="absolute flex justify-center" style="top:5%;left:0%">
      <OneHotVector :length="3" :hotIndex="1" label="thriller" size="sm" />
    </div>
    <div class="absolute flex justify-center" style="top:5%;right:0%">
      <OneHotVector :length="3" :hotIndex="2" label="romance" size="sm" />
    </div>
    <div class="absolute flex justify-center" style="bottom:5px;left:50%;transform:translateX(-50%)">
      <OneHotVector :length="3" :hotIndex="0" label="horror" size="sm" labelPosition="bottom" />
    </div>
  </div>
</div>

<p class="caption">Thriller should be closer to Horror than Romance. One-hot loses that.</p>

</v-click>

---
class: flex flex-col
---

# How **not** to do it: One-hot encoding

<div class="flex-1 flex flex-col justify-center items-center gap-8">
  <OneHotVector :length="30" :hotIndex="7" size="sm" />

  <div class="text-center font-mono">
    <span class="text-5xl">length = 6040</span>
    <div class="text-sm opacity-60 mt-2">for MovieLens users</div>
  </div>

  <p class="caption">1 hot cell, 6039 zeros per user. Not practical.</p>
</div>

---
clicks: 12
class: flex flex-col
---

# Embeddings

<div class="flex-1 flex flex-col justify-center items-center gap-8">
  <div style="position: relative; display: inline-block;">
    <EmbeddingVector
      size="lg"
      :visible="$clicks"
      :labels="['age', 'likes<br>horror', 'has<br>job', '...', '', '', '', '']"
      :labelsVisible="Math.max(0, $clicks - 8)"
      :values="[0.32, -0.81, 0.55, -0.12, 0.70, 0.04, -0.46, 0.93]"
      label="user 123"
    />
    <RightLabel text="← to be learned" :visible="$clicks >= 12" />
  </div>
  <p class="caption">Shorter vectors, more meaning.</p>
</div>

---
clicks: 2
class: flex flex-col
---

# Structure emerges from ratings alone

<div class="flex-1 flex items-center justify-center">
  <EmbeddingPlot :step="$clicks" />
</div>


---
clicks: 2
class: flex flex-col
---

# Same trick powers NLP

<div class="flex-1 flex items-center justify-center gap-8">

  <!-- Word embeddings: always fully visible, no movement -->
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-3">
      <span class="font-mono text-sm w-10 text-right">The</span>
      <EmbeddingVector size="sm" :showValues="false" :values="[0.3, -0.6, 0.4, 0.1, -0.2, 0.5]" />
    </div>
    <div class="flex items-center gap-3">
      <span class="font-mono text-sm w-10 text-right">cat</span>
      <EmbeddingVector size="sm" :showValues="false" :values="[0.8, 0.2, -0.5, 0.6, -0.1, 0.3]" />
    </div>
    <div class="flex items-center gap-3">
      <span class="font-mono text-sm w-10 text-right">sat</span>
      <EmbeddingVector size="sm" :showValues="false" :values="[-0.4, 0.3, 0.7, -0.2, 0.5, -0.1]" />
    </div>
    <div class="flex items-center gap-3">
      <span class="font-mono text-sm w-10 text-right">on</span>
      <EmbeddingVector size="sm" :showValues="false" :values="[0.1, -0.3, 0.2, 0.8, -0.4, 0.6]" />
    </div>
    <div class="flex items-center gap-3">
      <span class="font-mono text-sm w-10 text-right">the</span>
      <EmbeddingVector size="sm" :showValues="false" :values="[-0.2, 0.4, 0.1, -0.5, 0.7, 0.2]" />
    </div>
    <div class="flex items-center gap-3">
      <span class="font-mono text-sm w-10 text-right">mat</span>
      <EmbeddingVector size="sm" :showValues="false" :values="[0.5, -0.1, 0.6, 0.3, -0.4, 0.8]" />
    </div>
  </div>

  <!-- Arrow + LLM box: appears on click 1 -->
  <div v-click="1" class="flex items-center gap-4">
    <span class="text-2xl" style="color: var(--p-faint)">→</span>
    <div
      class="border-2 rounded-lg px-6 py-5 text-center"
      style="border-color: var(--p-accent); color: var(--p-accent)"
    >
      <div class="font-mono text-sm font-bold uppercase tracking-wider">LLM</div>
    </div>
  </div>

  <!-- Arrow + predicted word: appears on click 2 -->
  <div v-click="2" class="flex items-center gap-4">
    <span class="text-2xl" style="color: var(--p-faint)">→</span>
    <span class="font-mono text-xl font-bold" style="color: var(--p-text)">"purring"</span>
  </div>

</div>

<p class="caption">Every LLM is built on top of this idea.</p>

---
clicks: 1
class: flex flex-col
---

# How do we combine two vectors into one rating?

<div class="flex-1 flex items-center justify-center gap-8">
  <EmbeddingVector size="md" :values="[0.32, -0.81, 0.55, -0.12, 0.70, 0.04, -0.46, 0.93]" label="user 123" />
  <v-click :at="1">
    <div class="text-5xl opacity-50 border-2 border-dotted border-gray-500 rounded-full w-20 h-20 flex items-center justify-center mt-8">?</div>
  </v-click>
  <EmbeddingVector size="md" :values="[0.44, -0.62, 0.71, -0.28, 0.55, 0.17, -0.39, 0.82]" label="movie 2571" />
</div>

---
clicks: 2
class: flex flex-col
---

# Dot product

<div class="flex-1 flex flex-col justify-center gap-6">
  <div class="flex justify-center">
    <DotProduct
      :step="$clicks"
      :vecA="[0.32, -0.81, 0.55, -0.12, 0.70, 0.04, -0.46, 0.93]"
      :vecB="[0.44, -0.62, 0.71, -0.28, 0.55, 0.17, -0.39, 0.82]"
      labelA="user 123"
      labelB="movie 2571"
      :pmax="0.8"
      size="md"
    />
  </div>
  <p class="caption">High when vectors align. Low when they don't. That's our similarity score.</p>
</div>

---

# Alternative view: matrix factorization

<div class="flex items-center justify-center gap-6 mt-8 font-mono">
  <div class="flex flex-col items-center gap-2">
    <div class="grid gap-1" style="grid-template-columns:repeat(6,28px)">
      <div v-for="(v, i) in [5,0,0,3,0,0,0,4,0,0,5,0,0,0,3,0,0,4,0,5,0,0,0,3,4,0,0,0,0,0,0,0,5,0,3,0]" :key="i"
        class="h-7 rounded flex items-center justify-center text-xs"
        :style="{ background: v ? 'rgb(59,130,246)' : '#f1f5f9', color: v ? '#fff' : '#94a3b8' }">{{ v || '' }}</div>
    </div>
    <span class="text-xs opacity-50">Ratings R (6×6)</span>
  </div>
  <span class="text-2xl opacity-50">≈</span>
  <div class="flex flex-col items-center gap-2">
    <div class="grid gap-1" style="grid-template-columns:repeat(4,28px)">
      <div v-for="i in 24" :key="i" class="h-7 rounded"
        :style="{ background: `hsl(${(i * 37) % 360}, 55%, 78%)` }"></div>
    </div>
    <span class="text-xs opacity-50">Users U (6×4)</span>
  </div>
  <span class="text-2xl opacity-50">·</span>
  <div class="flex flex-col items-center gap-2">
    <div class="grid gap-1" style="grid-template-columns:repeat(6,28px)">
      <div v-for="i in 24" :key="i" class="h-7 rounded"
        :style="{ background: `hsl(${(i * 53 + 120) % 360}, 55%, 78%)` }"></div>
    </div>
    <span class="text-xs opacity-50">Movies Mᵀ (4×6)</span>
  </div>
</div>

<div class="text-center mt-6 font-mono text-xl">R ≈ U · Mᵀ</div>

<p class="caption">Dot products everywhere means you are implicitly factoring a matrix.</p>

---
class: flex flex-col
---

# Regression formula

<div class="flex-1 flex items-center justify-center w-full">


$$\huge \hat{r}(u, m) = \mathbf{e}_u \cdot \mathbf{e}_m$$


</div>

---
clicks: 3
---

# Version 1

```python {all|6-8|10-13}
import torch
import torch.nn as nn

class MFModelV1(nn.Module):
    def __init__(self, n_users: int, n_movies: int, dim: int = 32):
        super().__init__()
        self.user_emb = nn.Embedding(n_users, dim)
        self.movie_emb = nn.Embedding(n_movies, dim)

    def forward(self, user_ids, movie_ids):
        u = self.user_emb(user_ids)
        m = self.movie_emb(movie_ids)
        return (u * m).sum(-1, keepdim=True)
```

---
class: flex flex-col
---

# Problem: unbounded output

<div class="flex-1 flex flex-col items-center justify-center gap-10">

<p class="text-center text-base opacity-70 max-w-xl">A dot product can return any real number. But ratings only live between 1 and 5.</p>

<div class="flex items-center gap-12 font-mono">
  <div class="text-center flex flex-col items-center gap-2">
    <div class="text-sm opacity-50 uppercase tracking-wider">model output</div>
    <div class="text-6xl font-bold opacity-60">ℝ</div>
    <div class="text-sm opacity-40">(-∞, +∞)</div>
  </div>
  <div class="text-4xl opacity-30">≠</div>
  <div class="text-center flex flex-col items-center gap-2">
    <div class="text-sm opacity-50 uppercase tracking-wider">target range</div>
    <div class="text-4xl font-mono font-bold" style="color: rgb(134, 239, 172)">[1, 5]</div>
    <div class="text-sm opacity-40">integer ratings</div>
  </div>
</div>

<MetricBadge label="val MAE" :value="3.0" variant="bad" size="lg" />

</div>

---

# Version 2: squash to \[1, 5\]

<div class="flex justify-center mb-1">
  <div class="flex flex-col items-center gap-2">
    <svg width="360" height="150" viewBox="0 0 360 150" style="overflow: visible">
      <!-- shaded valid output region -->
      <rect x="45" y="20" width="300" height="110" fill="#f0fdf4" opacity="0.5" rx="2"/>
      <!-- asymptote lines -->
      <line x1="45" y1="20" x2="345" y2="20" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="5 4"/>
      <line x1="45" y1="130" x2="345" y2="130" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="5 4"/>
      <!-- labels centered on dashed lines -->
      <text x="38" y="20" text-anchor="end" dominant-baseline="middle" font-family="JetBrains Mono,monospace" font-size="6" fill="#16a34a" font-weight="bold">5</text>
      <text x="38" y="130" text-anchor="end" dominant-baseline="middle" font-family="JetBrains Mono,monospace" font-size="6" fill="#16a34a" font-weight="bold">1</text>
      <!-- accurate sigmoid polyline: 4·σ(x)+1, x∈[-6,6] → x_svg∈[45,345], y_svg=130−σ(x)·110 -->
      <polyline
        points="45,129.7 70,129.2 95,127.9 120,124.8 145,117.1 158,110.2 170,100.9 183,89.5 195,75 208,60.5 220,49.1 233,39.8 245,32.9 270,25.2 295,22.1 320,20.8 345,20.3"
        fill="none" stroke="rgb(59,130,246)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <p class="caption">4 · sigmoid(x) + 1 maps any real number into (1, 5).</p>
  </div>
</div>

<v-click>

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

</v-click>

<v-click>
<div class="flex justify-center mt-2">
  <MetricBadge label="val MAE" :value="0.77" :baseline="3.0" variant="good" />
</div>
</v-click>

---

# Version 3: add bias

````md magic-move
```python
class MFModelV2(nn.Module):
    def __init__(self, n_users, n_movies, dim=32):
        super().__init__()
        self.user_emb = nn.Embedding(n_users, dim)
        self.movie_emb = nn.Embedding(n_movies, dim)

    def forward(self, user_ids, movie_ids):
        u = self.user_emb(user_ids)
        m = self.movie_emb(movie_ids)
        dot = (u * m).sum(-1, keepdim=True)
        return 4 * torch.sigmoid(dot) + 1
```

```python
class MFModelV3(nn.Module):
    def __init__(self, n_users, n_movies, dim=32):
        super().__init__()
        self.user_emb = nn.Embedding(n_users, dim)
        self.movie_emb = nn.Embedding(n_movies, dim)
        self.user_bias = nn.Embedding(n_users, 1)
        self.movie_bias = nn.Embedding(n_movies, 1)

    def forward(self, user_ids, movie_ids):
        u = self.user_emb(user_ids)
        m = self.movie_emb(movie_ids)
        dot = (u * m).sum(-1, keepdim=True)
        with_bias = dot + self.user_bias(user_ids) + self.movie_bias(movie_ids)
        return 4 * torch.sigmoid(with_bias) + 1
```
````

<p class="caption">Some users rate everything 4. Some movies are universally loved. The biases do the coarse work, the embeddings do the fine-tuning.</p>

---

# The full pipeline

```mermaid
flowchart LR
    subgraph U ["User"]
        uid([user_id]) --> ulookup[IntegerLookup]
        ulookup --> uemb["Embedding (32d)"]
        ulookup --> ubias["Bias (1d)"]
    end
    subgraph M ["Movie"]
        mid([movie_id]) --> mlookup[IntegerLookup]
        mlookup --> memb["Embedding (32d)"]
        mlookup --> mbias["Bias (1d)"]
    end

    uemb --> dot["Dot Product"]
    memb --> dot
    dot --> add[Add]
    ubias --> add
    mbias --> add
    add --> sq["4 · σ(x) + 1"]
    sq --> r([rating])

    style uid fill:#e0f2fe,stroke:#7dd3fc,color:#0f172a
    style mid fill:#e0f2fe,stroke:#7dd3fc,color:#0f172a
    style uemb fill:#dbeafe,stroke:#93c5fd,color:#0f172a
    style memb fill:#dbeafe,stroke:#93c5fd,color:#0f172a
    style ubias fill:#fef9c3,stroke:#fde047,color:#0f172a
    style mbias fill:#fef9c3,stroke:#fde047,color:#0f172a
    style dot fill:#f1f5f9,stroke:#94a3b8,color:#0f172a
    style add fill:#f1f5f9,stroke:#94a3b8,color:#0f172a
    style sq fill:#f1f5f9,stroke:#94a3b8,color:#0f172a
    style r fill:#dcfce7,stroke:#86efac,color:#0f172a
```

---
class: flex flex-col
---

# Result comparison

<div class="flex-1 flex flex-col justify-center gap-6">
  <div class="flex gap-6 justify-center">
    <MetricBadge label="baseline MAE" :value="0.85" variant="default" />
    <MetricBadge label="V2 MAE" :value="0.77" :baseline="0.85" variant="default" />
    <MetricBadge label="V3 MAE" :value="0.746" :baseline="0.85" variant="good" />
  </div>
  <p class="text-sm opacity-50 text-center font-mono">No hyperparameter tuning yet.</p>
</div>

---
layout: two-cols
class: items-center
---

# Using the model

```python
# Will user 1 like movie 2?
model.eval()
with torch.no_grad():
    pred = model(torch.tensor([1]), torch.tensor([2]))
# pred -> tensor([[3.03]])
```

<div class="mt-4 flex items-center gap-3">
  <RatingStars :value="3.03" size="lg" />
  <span class="font-mono text-sm opacity-70">predicted: 3.03</span>
</div>

::right::

<p class="font-mono text-xs uppercase opacity-50 mb-4 tracking-wider">Top 5 for user 1</p>
<ul class="flex flex-col gap-4 list-none p-0 m-0">
  <li class="flex items-center gap-3">
    <span class="font-mono text-xs opacity-60 w-20">movie 2571</span>
    <RatingStars :value="4" />
  </li>
  <li class="flex items-center gap-3">
    <span class="font-mono text-xs opacity-60 w-20">movie 1198</span>
    <RatingStars :value="3.5" />
  </li>
  <li class="flex items-center gap-3">
    <span class="font-mono text-xs opacity-60 w-20">movie 858</span>
    <RatingStars :value="1.5" />
  </li>
  <li class="flex items-center gap-3">
    <span class="font-mono text-xs opacity-60 w-20">movie 318</span>
    <RatingStars :value="5" />
  </li>
  <li class="flex items-center gap-3">
    <span class="font-mono text-xs opacity-60 w-20">movie 50</span>
    <RatingStars :value="1.2" />
  </li>
</ul>

---
class: flex flex-col
---

# What this model is

<div class="flex-1 flex items-center gap-8">

<div class="flex-1 rounded-2xl p-6 flex flex-col gap-4" style="background: #f0fdf4; border: 1.5px solid #86efac;">
  <div class="font-mono text-xs uppercase tracking-widest font-bold" style="color: #16a34a;">Strengths</div>
  <ul class="flex flex-col gap-3 list-none p-0 m-0">
    <li class="flex items-start gap-3 text-sm" style="color: #166534;">
      <span class="mt-0.5 text-base leading-none" style="color: #16a34a;">✓</span>
      <span>Needs only interactions, no side features</span>
    </li>
    <li class="flex items-start gap-3 text-sm" style="color: #166534;">
      <span class="mt-0.5 text-base leading-none" style="color: #16a34a;">✓</span>
      <span>Works broadly across domains</span>
    </li>
    <li class="flex items-start gap-3 text-sm" style="color: #166534;">
      <span class="mt-0.5 text-base leading-none" style="color: #16a34a;">✓</span>
      <span>Fast to train and query</span>
    </li>
    <li class="flex items-start gap-3 text-sm" style="color: #166534;">
      <span class="mt-0.5 text-base leading-none" style="color: #16a34a;">✓</span>
      <span>Embeddings often interpretable post-hoc</span>
    </li>
  </ul>
</div>

<div class="flex-1 rounded-2xl p-6 flex flex-col gap-4" style="background: #fff7ed; border: 1.5px solid #fdba74;">
  <div class="font-mono text-xs uppercase tracking-widest font-bold" style="color: #ea580c;">Limits</div>
  <ul class="flex flex-col gap-3 list-none p-0 m-0">
    <li class="flex items-start gap-3 text-sm" style="color: #7c2d12;">
      <span class="mt-0.5 text-base leading-none" style="color: #ea580c;">✗</span>
      <span>Cold start for new users and movies</span>
    </li>
    <li class="flex items-start gap-3 text-sm" style="color: #7c2d12;">
      <span class="mt-0.5 text-base leading-none" style="color: #ea580c;">✗</span>
      <span>No content features used</span>
    </li>
    <li class="flex items-start gap-3 text-sm" style="color: #7c2d12;">
      <span class="mt-0.5 text-base leading-none" style="color: #ea580c;">✗</span>
      <span>No sequence or recency modeling</span>
    </li>
    <li class="flex items-start gap-3 text-sm" style="color: #7c2d12;">
      <span class="mt-0.5 text-base leading-none" style="color: #ea580c;">✗</span>
      <span>Requires enough interaction data</span>
    </li>
  </ul>
</div>

</div>

---

# Thanks. Questions?

<v-clicks>

1. Hybrid recommenders: content and collaborative
2. Deep models over embeddings (MLPs, transformers)
3. Sequential recsys: using order of interactions

</v-clicks>

<div class="abs-b mb-28 font-mono text-xs opacity-40 flex flex-col gap-1">
  <div>Article: https://towardsdatascience.com/introduction-to-embedding-based-recommender-systems-956faceb1919</div>
  <div>Cold start: https://towardsdatascience.com/a-performant-recommender-system-without-cold-start-problem-69bf2f0f0b9b</div>
  <div>LinkedIn: https://www.linkedin.com/in/dr-robert-kübler-983859150/</div>
</div>
