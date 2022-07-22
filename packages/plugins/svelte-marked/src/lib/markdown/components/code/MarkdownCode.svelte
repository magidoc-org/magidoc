<script lang="ts">
  import type { MarkdownOptions, Renderers } from '../../markedConfiguration'
  import type { marked } from 'marked'

  export let token: marked.Tokens.Code
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<pre><code class={`lang-${token.lang}`}>{token.text}</code></pre>
