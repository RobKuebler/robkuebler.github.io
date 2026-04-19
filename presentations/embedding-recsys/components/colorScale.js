// Shared diverging color scale: blue (negative) -> white (zero) -> red (positive)

export function colorFor(v, vmax = 1) {
  const t = Math.max(-1, Math.min(1, v / vmax))
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

// Returns white text for high-contrast backgrounds, dark text otherwise
export function textColorFor(v, vmax = 1) {
  const t = Math.abs(Math.max(-1, Math.min(1, v / vmax)))
  return t > 0.55 ? '#ffffff' : '#1f2937'
}
