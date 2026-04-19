<script setup>
import { computed } from 'vue'

const props = defineProps({
  values: { type: Array, required: true },
  label: { type: String, default: '' },
  labels: { type: Array, default: () => [] },
  labelsVisible: { type: Number, default: null },
  visible: { type: Number, default: null },
  highlight: { type: Array, default: () => [] },
  showValues: { type: Boolean, default: true },
  size: { type: String, default: 'md' },
  vmax: { type: Number, default: 1 },
})

// Size presets: cell width/height + font size
const sizeMap = {
  sm: { cell: 26, font: 9,  gap: 2 },
  md: { cell: 40, font: 12, gap: 3 },
  lg: { cell: 56, font: 15, gap: 4 },
}
const dims = computed(() => sizeMap[props.size] ?? sizeMap.md)

// Map value in [-vmax, vmax] to a diverging blue -> white -> red color
function colorFor(v) {
  const t = Math.max(-1, Math.min(1, v / props.vmax))
  const cold = [59, 130, 246]
  const warm = [239, 68, 68]
  const neutral = [245, 245, 245]
  const target = t < 0 ? cold : warm
  const mix = Math.abs(t)
  const r = Math.round(neutral[0] + (target[0] - neutral[0]) * mix)
  const g = Math.round(neutral[1] + (target[1] - neutral[1]) * mix)
  const b = Math.round(neutral[2] + (target[2] - neutral[2]) * mix)
  return `rgb(${r}, ${g}, ${b})`
}

// Text color for readability against the background color
function textColorFor(v) {
  const t = Math.abs(Math.max(-1, Math.min(1, v / props.vmax)))
  return t > 0.55 ? '#ffffff' : '#1f2937'
}

const isVisible = (i) =>
  props.visible === null || props.visible === undefined ? true : i < props.visible

const isHighlight = (i) => props.highlight.includes(i)

const isLabelVisible = (i) =>
  props.labelsVisible === null || props.labelsVisible === undefined ? true : i < props.labelsVisible

const cellLabel = (i) => props.labels[i] ?? ''
</script>

<template>
  <div class="ev-wrap">
    <p v-if="label" class="ev-label">{{ label }}</p>
    <div class="ev-row" :style="{ gap: dims.gap + 'px' }">
      <div v-for="(v, i) in values" :key="i" class="ev-cell-wrap">
        <div
          class="ev-cell"
          :class="{ 'ev-hidden': !isVisible(i), 'ev-hl': isHighlight(i) }"
          :style="{
            width: dims.cell + 'px',
            height: dims.cell + 'px',
            fontSize: dims.font + 'px',
            background: colorFor(v),
            color: textColorFor(v),
          }"
        >
          <span v-if="showValues">{{ v >= 0 ? ' ' : '' }}{{ v.toFixed(2) }}</span>
        </div>
        <div
          v-if="cellLabel(i)"
          class="ev-cell-label"
          :class="{ 'ev-label-hidden': !isLabelVisible(i) }"
          v-html="cellLabel(i)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ev-wrap {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.ev-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
  margin: 0;
}
.ev-row {
  display: inline-flex;
  align-items: flex-start;
}
.ev-cell-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.ev-cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-weight: 500;
  transition:
    opacity 0.35s ease,
    transform 0.35s ease,
    box-shadow 0.35s ease,
    background 0.35s ease;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}
.ev-hidden {
  opacity: 0;
  transform: translateY(6px) scale(0.9);
}
.ev-hl {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.55), 0 2px 6px rgba(15, 23, 42, 0.12);
  transform: translateY(-2px);
  z-index: 2;
}
.ev-cell-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  color: #64748b;
  text-align: center;
  line-height: 1.3;
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.ev-label-hidden {
  opacity: 0;
  transform: translateY(4px);
}
</style>
