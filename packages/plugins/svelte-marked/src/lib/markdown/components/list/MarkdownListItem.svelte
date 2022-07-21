<script lang="ts">
  import type { MarkdownOptions, Renderers } from '../../markedConfiguration'

  import type { marked } from 'marked'

  export const token: marked.Tokens.ListItem = undefined
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<li><slot /></li>
