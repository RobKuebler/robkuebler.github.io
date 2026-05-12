<script setup>
import { computed } from 'vue'

const props = defineProps({
  length: { type: Number, required: true },
  hotIndex: { type: Number, required: true },
  label: { type: String, default: '' },
  size: { type: String, default: 'md' },
  labelPosition: { type: String, default: 'top' },
})

const sizeMap = {
  sm: { cell: 26, font: 10, gap: 2 },
  md: { cell: 40, font: 14, gap: 3 },
  lg: { cell: 56, font: 18, gap: 4 },
}
const dims = computed(() => sizeMap[props.size] ?? sizeMap.md)

const cells = computed(() =>
  Array.from({ length: props.length }, (_, i) => (i === props.hotIndex ? 1 : 0))
)
</script>

<template>
  <div class="oh-wrap">
    <p v-if="label && labelPosition === 'top'" class="oh-label">{{ label }}</p>
    <div class="oh-row" :style="{ gap: dims.gap + 'px' }">
      <div
        v-for="(v, i) in cells"
        :key="i"
        class="oh-cell"
        :class="{ 'oh-hot': v === 1 }"
        :style="{
          width: dims.cell + 'px',
          height: dims.cell + 'px',
          fontSize: dims.font + 'px',
        }"
      >{{ v }}</div>
    </div>
    <p v-if="label && labelPosition === 'bottom'" class="oh-label">{{ label }}</p>
  </div>
</template>

<style scoped>
.oh-wrap {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.oh-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
  margin: 0;
}
.oh-row {
  display: inline-flex;
  align-items: center;
}
.oh-cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-weight: 500;
  background: #f1f5f9;
  color: #94a3b8;
  border: 1px solid #e2e8f0;
  transition: all 0.35s ease;
}
.oh-hot {
  background: #3b82f6;
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.1);
}
</style>
