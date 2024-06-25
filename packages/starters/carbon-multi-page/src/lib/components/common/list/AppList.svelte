<script lang="ts">
import { OrderedList, UnorderedList } from 'carbon-components-svelte'

export let start = 1
export let ordered = false

let component: ConstructorOfATypedSvelteComponent
$: component = ordered ? OrderedList : UnorderedList
</script>

<svelte:component
  this={component}
  class="markdown-list-style"
  style={`counter-reset: item ${Number(start) - 1}`}
>
  <slot />
</svelte:component>

<style>
  :global(.markdown-list-style) {
    padding: revert !important;
    padding-left: 2rem !important;
  }
</style>
