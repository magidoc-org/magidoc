<script>
  import { ListItem } from 'carbon-components-svelte'
</script>

<ListItem class="list-item">
  <slot />
</ListItem>

<style>
  :global(.list-item) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
