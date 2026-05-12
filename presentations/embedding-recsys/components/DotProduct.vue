<script setup>
import { computed } from 'vue'
import { colorFor, textColorFor } from './colorScale.js'

const props = defineProps({
  vecA: { type: Array, required: true },
  vecB: { type: Array, required: true },
  labelA: { type: String, default: 'vector a' },
  labelB: { type: String, default: 'vector b' },
  // step: 0 = just vectors, 1 = pairwise products, 2 = sum + scalar
  step: { type: Number, default: 2 },
  size: { type: String, default: 'md' },
  vmax: { type: Number, default: 1 },
  pmax: { type: Number, default: 1 },
})

const sizeMap = {
  sm: { cell: 30, font: 10, gap: 4, opFont: 14 },
  md: { cell: 46, font: 13, gap: 5, opFont: 18 },
  lg: { cell: 60, font: 16, gap: 6, opFont: 22 },
}
const dims = computed(() => sizeMap[props.size] ?? sizeMap.md)

const products = computed(() =>
  props.vecA.map((a, i) => a * (props.vecB[i] ?? 0))
)
const sum = computed(() =>
  products.value.reduce((s, x) => s + x, 0)
)

const showProducts = computed(() => props.step >= 1)
const showSum = computed(() => props.step >= 2)
</script>

<template>
  <div class="dp-wrap">
    <!-- Vector A -->
    <div class="dp-row-group">
      <p class="dp-label">{{ labelA }}</p>
      <div class="dp-row" :style="{ gap: dims.gap + 'px' }">
        <div
          v-for="(v, i) in vecA"
          :key="i"
          class="dp-cell"
          :style="{
            width: dims.cell + 'px',
            height: dims.cell + 'px',
            fontSize: dims.font + 'px',
            background: colorFor(v, vmax),
            color: textColorFor(v, vmax),
          }"
        >{{ v.toFixed(2) }}</div>
      </div>
    </div>

    <!-- Multiplication operators -->
    <div
      class="dp-op-row"
      :class="{ 'dp-fade-in': showProducts }"
      :style="{ gap: dims.gap + 'px', fontSize: dims.opFont + 'px' }"
    >
      <div
        v-for="(_, i) in vecA"
        :key="i"
        class="dp-op"
        :style="{ width: dims.cell + 'px' }"
      >×</div>
    </div>

    <!-- Vector B -->
    <div class="dp-row-group">
      <p class="dp-label">{{ labelB }}</p>
      <div class="dp-row" :style="{ gap: dims.gap + 'px' }">
        <div
          v-for="(v, i) in vecB"
          :key="i"
          class="dp-cell"
          :style="{
            width: dims.cell + 'px',
            height: dims.cell + 'px',
            fontSize: dims.font + 'px',
            background: colorFor(v, vmax),
            color: textColorFor(v, vmax),
          }"
        >{{ v.toFixed(2) }}</div>
      </div>
    </div>

    <!-- Equals operators -->
    <div
      class="dp-op-row"
      :class="{ 'dp-fade-in': showProducts }"
      :style="{ gap: dims.gap + 'px', fontSize: dims.opFont + 'px' }"
    >
      <div
        v-for="(_, i) in vecA"
        :key="i"
        class="dp-op"
        :style="{ width: dims.cell + 'px' }"
      >=</div>
    </div>

    <!-- Products row -->
    <div class="dp-row-group dp-reveal" :class="{ 'dp-fade-in': showProducts }">
      <div class="dp-row" :style="{ gap: dims.gap + 'px' }">
        <div
          v-for="(v, i) in products"
          :key="i"
          class="dp-cell"
          :style="{
            width: dims.cell + 'px',
            height: dims.cell + 'px',
            fontSize: dims.font + 'px',
            background: colorFor(v, pmax),
            color: textColorFor(v, pmax),
          }"
        >{{ v.toFixed(2) }}</div>
      </div>
    </div>

    <!-- Sum + scalar -->
    <div class="dp-sum-row" :class="{ 'dp-fade-in': showSum }">
      <span class="dp-sum-label">Sum:</span>
      <div class="dp-scalar">{{ sum.toFixed(2) }}</div>
    </div>
  </div>
</template>

<style scoped>
.dp-wrap {
  display: grid;
  grid-template-columns: auto;
  gap: 10px;
  align-items: start;
}
.dp-wrap > :nth-child(5),
.dp-wrap > :nth-child(6) {
  display: flex;
  justify-content: center;
}
.dp-wrap > :nth-child(5) {
  grid-column: 1;
}
.dp-wrap > :nth-child(6) {
  grid-column: 1;
  justify-content: center;
  align-items: center;
  gap: 12px;
}
.dp-row-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.dp-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
  margin: 0;
}
.dp-row {
  display: inline-flex;
  align-items: center;
}
.dp-cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}
.dp-op-row {
  display: inline-flex;
  align-items: center;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  color: #64748b;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}
.dp-op {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.dp-fade-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
.dp-reveal {
  opacity: 0;
  transform: translateY(6px);
}
.dp-sum-row {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 8px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.dp-sum-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 1rem;
  color: #64748b;
}
.dp-sum-sym {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 1.1rem;
  color: #64748b;
}
.dp-scalar {
  font-family: 'Bricolage Grotesque', 'JetBrains Mono', monospace;
  font-size: 2.2rem;
  font-weight: 600;
  color: #0f172a;
  background: #f1f5f9;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}
</style>
