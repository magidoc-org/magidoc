<script lang="ts">
import type { TagColor } from '#lib/components/markdown/containers/tags/Tags'

export let color: TagColor = 'outline'

const presets: Record<TagColor, string> = {
  red: 'preset-tonal-error',
  magenta: 'preset-tonal-error',
  purple: 'preset-tonal-secondary',
  blue: 'preset-tonal-primary',
  cyan: 'preset-tonal-primary',
  teal: 'preset-tonal-tertiary',
  green: 'preset-tonal-success',
  gray: 'preset-tonal-surface',
  'cool-gray': 'preset-tonal-surface',
  'warm-gray': 'preset-tonal-surface',
  'high-contrast': 'preset-filled-surface-950-50',
  outline: 'preset-outlined-surface-300-700',
}
</script>

<span class="badge rounded-full px-2 py-0.5 align-middle text-xs leading-4 font-medium {presets[color]}"><slot /></span>
