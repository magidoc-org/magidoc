<script lang="ts">
  import type { MarkdownOptions, Renderers } from '$lib/markdown/marked'

  import { ListItem } from 'carbon-components-svelte'
  import type { marked } from 'marked'

  export const token: marked.Tokens.ListItem = undefined
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
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
