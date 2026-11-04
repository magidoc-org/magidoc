<script lang="ts">
import { Portal, Tooltip } from '@skeletonlabs/skeleton-svelte'
import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

let { text, children }: { text: string; children: Snippet } = $props()
</script>

<Tooltip openDelay={150} positioning={{ placement: 'top' }}>
  <Tooltip.Trigger>
    {#snippet element(attributes)}
      <span {...attributes as HTMLAttributes<HTMLSpanElement>} class="cursor-help">
        {@render children()}<span class="sr-only">: {text}</span>
      </span>
    {/snippet}
  </Tooltip.Trigger>
  <Portal>
    <Tooltip.Positioner class="z-50">
      <Tooltip.Content class="card max-w-xs px-2 py-1 text-xs preset-filled-surface-950-50 shadow-lg">
        {text}
      </Tooltip.Content>
    </Tooltip.Positioner>
  </Portal>
</Tooltip>
