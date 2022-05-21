<script lang="ts">
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../marked'

  export let token: marked.Tokens.Space = undefined
  export let options: MarkdownOptions = undefined
  export let renderers: Renderers = undefined
</script>

<slot />
