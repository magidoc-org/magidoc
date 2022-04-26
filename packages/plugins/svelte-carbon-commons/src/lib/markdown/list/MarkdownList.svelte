<script lang="ts">
  import { OrderedList, UnorderedList } from 'carbon-components-svelte'

  export let ordered: boolean
</script>

{#if ordered}
  <OrderedList nested expressive>
    <slot />
  </OrderedList>
{:else}
  <UnorderedList nested expressive>
    <slot />
  </UnorderedList>
{/if}
