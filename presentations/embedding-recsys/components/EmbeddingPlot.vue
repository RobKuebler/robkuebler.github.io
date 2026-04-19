<script setup>
import { computed } from 'vue'

const props = defineProps({ step: { type: Number, default: 0 } })

// Three training stages per point: random -> cluster-forming -> clustered
const users = [
  { id: 'U1', p: [{x:118,y:192},{x:96, y:258},{x:86, y:328}] },
  { id: 'U2', p: [{x:335,y:78}, {x:308,y:86}, {x:315,y:80} ] },
  { id: 'U3', p: [{x:440,y:252},{x:420,y:208},{x:422,y:236}] },
  { id: 'U4', p: [{x:78, y:315},{x:100,y:294},{x:110,y:294}] },
  { id: 'U5', p: [{x:272,y:162},{x:328,y:92}, {x:348,y:90} ] },
]
const items = [
  { id: 'I1', p: [{x:192,y:115},{x:248,y:96}, {x:275,y:86} ] },
  { id: 'I2', p: [{x:370,y:192},{x:435,y:218},{x:442,y:248}] },
  { id: 'I3', p: [{x:145,y:270},{x:115,y:290},{x:100,y:308}] },
  { id: 'I4', p: [{x:450,y:96}, {x:415,y:76}, {x:392,y:76} ] },
  { id: 'I5', p: [{x:302,y:318},{x:158,y:330},{x:144,y:344}] },
]

const epochs    = [0, 50, 100]
const subtitles = ['Random initialization.', 'Clusters forming.', 'Similar tastes cluster together.']

const haloOpacity = computed(() => props.step === 2 ? 0.09 : 0)

const tx = (pt) =>
  `transform: translate(${pt.x}px, ${pt.y}px); transition: transform 0.85s cubic-bezier(0.4,0,0.2,1);`
</script>

<template>
  <div class="wrap">
    <p class="label">Embedding Space</p>

    <svg viewBox="0 0 510 385" width="370" height="279">
      <defs>
        <pattern id="ep-grid" width="51" height="38.5" patternUnits="userSpaceOnUse">
          <path d="M51 0L0 0 0 38.5" fill="none" stroke="#e2e8f0" stroke-width="0.7"/>
        </pattern>
      </defs>
      <rect width="510" height="385" fill="url(#ep-grid)"/>
      <line x1="255" y1="8"   x2="255" y2="377" stroke="#cbd5e1" stroke-width="1.2"/>
      <line x1="8"   y1="192" x2="502" y2="192" stroke="#cbd5e1" stroke-width="1.2"/>

      <ellipse cx="350" cy="90"  rx="86" ry="46" fill="#3b82f6"
        :opacity="haloOpacity" style="transition: opacity 0.85s ease"/>
      <ellipse cx="108" cy="314" rx="70" ry="46" fill="#3b82f6"
        :opacity="haloOpacity" style="transition: opacity 0.85s ease"/>
      <ellipse cx="432" cy="236" rx="50" ry="40" fill="#3b82f6"
        :opacity="haloOpacity" style="transition: opacity 0.85s ease"/>

      <g v-for="u in users" :key="u.id" :style="tx(u.p[step])">
        <circle r="7" fill="#3b82f6"/>
        <rect x="12" y="-7" width="16" height="12" rx="1.5" fill="#e0f2fe" opacity="0.8"/>
        <text x="20" y="-1" fill="#1e40af" font-size="6" font-family="JetBrains Mono, monospace" text-anchor="middle" font-weight="700">{{ u.id }}</text>
      </g>

      <g v-for="it in items" :key="it.id" :style="tx(it.p[step])">
        <circle r="7" fill="#ef4444"/>
        <rect x="12" y="-7" width="16" height="12" rx="1.5" fill="#fee2e2" opacity="0.8"/>
        <text x="20" y="-1" fill="#b91c1c" font-size="6" font-family="JetBrains Mono, monospace" text-anchor="middle" font-weight="700">{{ it.id }}</text>
      </g>
    </svg>

    <div class="legend">
      <span style="color:#3b82f6">&#9679; Users</span>
      <span style="color:#ef4444">&#9679; Movies</span>
    </div>

    <p class="caption">Epoch {{ epochs[step] }}: {{ subtitles[step] }}</p>

  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #64748b;
  margin: 0;
}
.legend {
  display: flex;
  gap: 24px;
  font-size: 0.72rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: #475569;
}
</style>
