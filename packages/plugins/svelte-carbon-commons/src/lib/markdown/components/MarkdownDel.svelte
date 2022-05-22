<script lang="ts">
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../marked'

  export let token: marked.Tokens.Del
  export let options: MarkdownOptions
  export let renderers: Renderers
</script>

<del>
  <slot />
</del>
