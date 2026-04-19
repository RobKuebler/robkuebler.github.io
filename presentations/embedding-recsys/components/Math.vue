<script setup>
import katex from 'katex'
const props = defineProps({ tex: { type: String, required: true } })
const html = katex.renderToString(props.tex, { throwOnError: false })
</script>

<template>
  <span v-html="html" />
</template>
