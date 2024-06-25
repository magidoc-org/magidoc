<script lang="ts">
import { ListItem } from 'carbon-components-svelte'
</script>

<ListItem class="markdown-list-item">
  <slot />
</ListItem>

<style>
  :global(.markdown-list-item) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
