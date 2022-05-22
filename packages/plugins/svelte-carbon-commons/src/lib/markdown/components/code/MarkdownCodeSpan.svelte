<script lang="ts">
  import type { MarkdownOptions, Renderers } from '../../markedConfiguration'
  import type { marked } from 'marked'

  export let token: marked.Tokens.Codespan
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<code class="code-span">{token.text}</code>

<style>
  .code-span {
    background: #f0f0f0;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    border-radius: 0.1rem;
  }
</style>
