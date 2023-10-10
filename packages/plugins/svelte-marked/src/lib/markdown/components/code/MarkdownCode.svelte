<script lang="ts">
  import type { MarkdownOptions, Renderers } from '../../markedConfiguration'
  import type { Tokens } from 'marked'

  export let token: Tokens.Code
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<pre><code class={`lang-${token.lang}`}>{token.text}</code></pre>
