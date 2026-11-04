<script lang="ts">
export let start = 1
export let ordered = false
</script>

<svelte:element
  this={ordered ? 'ol' : 'ul'}
  start={ordered ? start : undefined}
  class="my-2 pl-8 {ordered ? 'list-decimal' : 'list-disc'}"
>
  <slot />
</svelte:element>
