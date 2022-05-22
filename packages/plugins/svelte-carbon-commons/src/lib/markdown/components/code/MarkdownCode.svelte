<script lang="ts">
  import type { MarkdownOptions, Renderers } from '../../markedConfiguration'
  import Prism from '@magidoc/plugin-svelte-prismjs'
  import type { marked } from 'marked'
  import './prism-theme.css'

  export let showCopyButton = true
  export let showLineNumbers = true

  export let token: marked.Tokens.Code
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<Prism
  language={token.lang}
  source={token.text}
  {showCopyButton}
  {showLineNumbers}
/>
