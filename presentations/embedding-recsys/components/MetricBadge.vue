<script setup lang="ts">
import { computed } from 'vue'

// Props for displaying a single metric with optional before/after baseline comparison
const props = withDefaults(defineProps<{
  label: string
  value: number
  digits?: number
  baseline?: number | null
  lowerIsBetter?: boolean
  variant?: 'default' | 'good' | 'bad'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  digits: 2,
  baseline: null,
  lowerIsBetter: true,
  variant: 'default',
  size: 'md',
})

// Compute the delta and whether it represents an improvement
const delta = computed(() => props.baseline !== null ? props.value - props.baseline : null)

const improved = computed(() => {
  if (delta.value === null) return false
  return props.lowerIsBetter ? delta.value < 0 : delta.value > 0
})

// Arrow direction: points down when lower is better and we went down (good), up otherwise
const arrow = computed(() => {
  if (delta.value === null) return ''
  if (props.lowerIsBetter) return delta.value < 0 ? '' : ''
  return delta.value > 0 ? '' : ''
})

const deltaLabel = computed(() => {
  if (delta.value === null) return ''
  const sign = delta.value > 0 ? '+' : ''
  return `${arrow.value} ${sign}${delta.value.toFixed(props.digits)}`
})

const cardStyle = computed(() => {
  const variants = {
    default: { background: '#f8fafc', border: '1px solid #e2e8f0' },
    good:    { background: '#f0fdf4', border: '1px solid #86efac' },
    bad:     { background: '#fef2f2', border: '1px solid #fca5a5' },
  }
  const paddings = {
    sm: '12px 16px',
    md: '16px 24px',
    lg: '24px 32px',
  }
  return {
    ...variants[props.variant],
    padding: paddings[props.size],
  }
})

const valueFontSize = computed(() => {
  return { sm: '1.75rem', md: '2.5rem', lg: '3.5rem' }[props.size]
})

const pillStyle = computed(() => ({
  background: improved.value ? '#dcfce7' : '#fee2e2',
  color:      improved.value ? '#16a34a' : '#dc2626',
}))
</script>

<template>
  <div class="metric-card" :style="cardStyle">
    <span class="metric-label">{{ label }}</span>
    <span class="metric-value" :style="{ fontSize: valueFontSize }">
      {{ value.toFixed(digits) }}
    </span>
    <span v-if="baseline !== null" class="metric-pill" :style="pillStyle">
      {{ deltaLabel }}
    </span>
  </div>
</template>

<style scoped>
.metric-card {
  border-radius: 12px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.metric-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}

.metric-value {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 700;
  line-height: 1;
}

.metric-pill {
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 0.7rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-weight: 600;
  white-space: nowrap;
}
</style>
