<script lang="ts">
  import type { MarkdownOptions, Renderers } from '$lib/markdown/marked'

  import { ListItem } from 'carbon-components-svelte'
  import type { marked } from 'marked'

  export let token: marked.Tokens.ListItem
  export let options: MarkdownOptions
  export let renderers: Renderers
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
