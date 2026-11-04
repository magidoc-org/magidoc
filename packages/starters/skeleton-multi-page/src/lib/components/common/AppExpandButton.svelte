<script lang="ts">
import { ChevronDown, ChevronUp } from 'carbon-icons-svelte'

export let totalItems: number
export let expandedText: string
export let collapsedText: string
export let expanded = false
</script>

<div class="mt-2">
  <button
    type="button"
    class="flex items-center gap-1 text-sm font-medium text-surface-600-400 transition-colors hover:text-surface-950-50"
    aria-expanded={expanded}
    on:click={() => (expanded = !expanded)}
  >
    <svelte:component this={expanded ? ChevronUp : ChevronDown} size={16} />
    {(expanded ? expandedText : collapsedText) + ` (${totalItems})`}
  </button>
</div>
