<script lang="ts">
import { Button } from 'carbon-components-svelte'
import ArrowDown from 'carbon-icons-svelte/lib/ArrowDown.svelte'
import ArrowUp from 'carbon-icons-svelte/lib/ArrowUp.svelte'

export let totalItems: number
export let expandedText: string
export let collapsedText: string
export let expanded = false
</script>

<div class="button-wrapper">
  <Button
    kind="ghost"
    size="small"
    style="border-radius: 20px"
    icon={expanded ? ArrowUp : ArrowDown}
    on:click={() => (expanded = !expanded)}
  >
    {(expanded ? expandedText : collapsedText) + ` (${totalItems})`}
  </Button>
</div>

<style>
  .button-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 0.5rem;
  }
</style>
