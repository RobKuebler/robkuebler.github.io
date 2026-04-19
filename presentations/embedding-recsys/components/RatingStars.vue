<script setup>
import { computed, getCurrentInstance } from 'vue'

// Renders a fractional star rating (0-5) using SVG stars with clip-path for partial fill.
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  color: {
    type: String,
    default: '#f59e0b',
  },
})

const sizeMap = { sm: 16, md: 24, lg: 36 }

const starSize = computed(() => sizeMap[props.size])

// Use the component instance uid to make clipPath ids unique per instance.
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)

// Compute fill fraction (0 to 1) for each star index (1-indexed).
function fillFraction(i) {
  if (props.value >= i) return 1
  if (props.value > i - 1) return props.value - (i - 1)
  return 0
}

const starPath =
  'M12 2 l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
</script>

<template>
  <div :style="{ display: 'flex', gap: '2px', alignItems: 'center' }">
    <svg
      v-for="i in 5"
      :key="i"
      :width="starSize"
      :height="starSize"
      viewBox="0 0 24 24"
      overflow="visible"
    >
      <defs>
        <clipPath :id="`sc-${uid}-${i}`">
          <!-- Clip rect width controls how much of the filled star is visible. -->
          <rect
            x="0"
            y="0"
            :width="fillFraction(i) * 24"
            :height="24"
          />
        </clipPath>
      </defs>

      <!-- Outline star, always rendered for all stars. -->
      <path
        :d="starPath"
        fill="none"
        :stroke="color"
        stroke-width="1.5"
        stroke-linejoin="round"
      />

      <!-- Filled star, clipped to the fill fraction. -->
      <path
        v-if="fillFraction(i) > 0"
        :d="starPath"
        :fill="color"
        stroke="none"
        :clip-path="`url(#sc-${uid}-${i})`"
      />
    </svg>
  </div>
</template>
