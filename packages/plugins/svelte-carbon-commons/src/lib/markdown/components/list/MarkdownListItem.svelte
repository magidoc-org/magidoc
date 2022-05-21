<script lang="ts">
  import type { MarkdownOptions, Renderers } from '$lib/markdown/marked'

  import { ListItem } from 'carbon-components-svelte'
  import type { marked } from 'marked'

  export let token: marked.Tokens.ListItem = undefined
  export let options: MarkdownOptions = undefined
  export let renderers: Renderers = undefined
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
