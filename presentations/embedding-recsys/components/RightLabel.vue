<script setup lang="ts">
// Positioned label that appears to the right of its adjacent element
// Use with position: relative parent to position relative to siblings
const props = withDefaults(defineProps<{
  text: string
  color?: string
  showAt?: number
  visible?: boolean
}>(), {
  color: 'rgb(59,130,246)',
  showAt: undefined,
  visible: true,
})
</script>

<template>
  <span
    class="right-label font-mono text-sm transition-all duration-300"
    :style="{
      color: props.color,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(16px)',
    }"
  >
    {{ text }}
  </span>
</template>

<style scoped>
.right-label {
  position: absolute;
  left: 100%;
  top: 50%;
  margin-left: 0.5rem;
  white-space: nowrap;
  display: inline-block;
}
</style>
