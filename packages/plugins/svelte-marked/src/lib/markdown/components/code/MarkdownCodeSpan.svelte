<script lang="ts">
  import type { MarkdownOptions, Renderers } from '../../markedConfiguration'
  import type { marked } from 'marked'

  export let token: marked.Tokens.Codespan
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<code>{token.raw.slice(1, token.raw.length - 1)}</code>
