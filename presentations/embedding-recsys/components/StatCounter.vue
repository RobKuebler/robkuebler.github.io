<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Animate a number from 0 to target over duration ms using easeOutCubic.
const props = withDefaults(defineProps<{
  target: number
  suffix?: string
  caption?: string
  duration?: number
}>(), {
  suffix: '%',
  caption: '',
  duration: 1200,
})

const current = ref(0)

onMounted(() => {
  const start = performance.now()

  function tick(now: number) {
    const elapsed = now - start
    const t = Math.min(elapsed / props.duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    current.value = eased * props.target

    if (t < 1) {
      requestAnimationFrame(tick)
    } else {
      current.value = props.target
    }
  }

  requestAnimationFrame(tick)
})
</script>

<template>
  <div class="stat-counter">
    <span class="number">{{ Math.round(current) }}{{ suffix }}</span>
    <span v-if="caption" class="caption">{{ caption }}</span>
  </div>
</template>

<style scoped>
.stat-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.number {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: 4rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.caption {
  margin-top: 8px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.75rem;
  color: #64748b;
  text-align: center;
  max-width: 160px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
