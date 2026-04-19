<template>
  <div
    class="architecture-diagram"
    :style="{ height: compact ? '200px' : '280px' }"
  >
    <!-- Top lane: user_id -> IntegerLookup -> Embedding(32d) -->
    <div class="box" :style="pos(2, 20, step >= 1)">user_id</div>
    <div class="arrow" :style="arrowH(9.5, 20, step >= 1)"></div>
    <div class="box" :style="pos(14, 20, step >= 2)">IntegerLookup</div>
    <div class="arrow" :style="arrowH(24, 20, step >= 2)"></div>
    <div class="box" :style="pos(28, 20, step >= 3)">Embedding (32d)</div>

    <!-- Top bias branch -->
    <div class="arrow arrow-v" :style="arrowDown(38, 20, 5, step >= 4)"></div>
    <div class="box box-bias" :style="pos(40, 5, step >= 4)">Bias (1d)</div>
    <div class="arrow arrow-diagonal arrow-bias-top" :style="diagArrow(50, 5, 57, 45, step >= 4)"></div>

    <!-- Arrow from top Embedding to Dot Product -->
    <div class="arrow" :style="arrowH(41, 20, step >= 5)"></div>

    <!-- Bottom lane: movie_id -> IntegerLookup -> Embedding(32d) -->
    <div class="box" :style="pos(2, 70, step >= 1)">movie_id</div>
    <div class="arrow" :style="arrowH(9.5, 70, step >= 1)"></div>
    <div class="box" :style="pos(14, 70, step >= 2)">IntegerLookup</div>
    <div class="arrow" :style="arrowH(24, 70, step >= 2)"></div>
    <div class="box" :style="pos(28, 70, step >= 3)">Embedding (32d)</div>

    <!-- Bottom bias branch -->
    <div class="arrow arrow-v" :style="arrowUp(38, 70, 85, step >= 4)"></div>
    <div class="box box-bias" :style="pos(40, 85, step >= 4)">Bias (1d)</div>
    <div class="arrow arrow-diagonal arrow-bias-bottom" :style="diagArrow(50, 85, 57, 45, step >= 4)"></div>

    <!-- Arrow from bottom Embedding to Dot Product -->
    <div class="arrow" :style="arrowH(41, 70, step >= 5)"></div>

    <!-- Center lane: DotProduct -> Add -> Squash -> rating -->
    <div class="box" :style="pos(55, 45, step >= 5)">Dot Product</div>
    <div class="arrow" :style="arrowH(65, 45, step >= 6)"></div>
    <div class="box" :style="pos(68, 45, step >= 6)">Add</div>
    <div class="arrow" :style="arrowH(75, 45, step >= 7)"></div>
    <div class="box" :style="pos(78, 45, step >= 7)">4 * o(x) + 1</div>
    <div class="arrow" :style="arrowH(89, 45, step >= 8)"></div>
    <div class="box box-output" :style="pos(92, 45, step >= 8)">rating</div>
  </div>
</template>

<script setup>
// ArchitectureDiagram.vue
// Visualizes the V3 matrix-factorization pipeline as boxes and arrows,
// revealed step by step. Used on slide 26.

const props = defineProps({
  step: {
    type: Number,
    default: 8,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

// Returns absolute-position style for a box at (left%, top%).
// Visibility is controlled via opacity so layout stays stable.
function pos(leftPct, topPct, visible) {
  return {
    left: `${leftPct}%`,
    top: `${topPct}%`,
    transform: 'translateY(-50%)',
    opacity: visible ? '1' : '0',
    pointerEvents: visible ? 'auto' : 'none',
    padding: props.compact ? '4px 8px' : '6px 12px',
    fontSize: props.compact ? '0.6rem' : '0.7rem',
  }
}

// Returns style for a horizontal arrow line at (left%, top%).
function arrowH(leftPct, topPct, visible) {
  return {
    left: `${leftPct}%`,
    top: `${topPct}%`,
    transform: 'translateY(-50%)',
    opacity: visible ? '1' : '0',
    width: '24px',
    borderTop: '2px solid #94a3b8',
    position: 'absolute',
  }
}

// Returns style for a short vertical downward connector from top lane to bias box.
function arrowDown(leftPct, fromTopPct, toTopPct, visible) {
  const height = Math.abs(toTopPct - fromTopPct)
  return {
    left: `${leftPct}%`,
    top: `${Math.min(fromTopPct, toTopPct)}%`,
    opacity: visible ? '1' : '0',
    height: `${height}%`,
    borderLeft: '2px solid #94a3b8',
    position: 'absolute',
    width: '0',
  }
}

// Returns style for a short vertical upward connector from bottom lane to bias box.
function arrowUp(leftPct, fromTopPct, toTopPct, visible) {
  const height = Math.abs(toTopPct - fromTopPct)
  return {
    left: `${leftPct}%`,
    top: `${Math.min(fromTopPct, toTopPct)}%`,
    opacity: visible ? '1' : '0',
    height: `${height}%`,
    borderLeft: '2px solid #94a3b8',
    position: 'absolute',
    width: '0',
  }
}

// Returns style for a diagonal connector from bias boxes toward center lane.
// Implemented as a thin rotated line using transform.
function diagArrow(x1Pct, y1Pct, x2Pct, y2Pct, visible) {
  const dx = x2Pct - x1Pct
  const dy = y2Pct - y1Pct
  // Diagonal approximated with a short horizontal + visual cue only;
  // for simplicity render as a Unicode arrow rendered via ::after on the bias box.
  // This function is kept for forward compatibility but returns an empty style
  // since the diagonal is handled by CSS on .box-bias::after.
  return {
    display: 'none',
    opacity: visible ? '1' : '0',
  }
}
</script>

<style scoped>
.architecture-diagram {
  position: relative;
  width: 100%;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: #1f2937;
}

/* Base box style */
.box {
  position: absolute;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  background: #f8fafc;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: #1f2937;
  white-space: nowrap;
  transition: opacity 0.3s, transform 0.3s;
}

/* Bias boxes: yellow tint */
.box-bias {
  background: #fef9c3;
  border-color: #fde047;
}

/* Output box: green tint */
.box-output {
  background: #dcfce7;
  border-color: #86efac;
}

/* Arrows are positioned absolutely via inline styles */
</style>
