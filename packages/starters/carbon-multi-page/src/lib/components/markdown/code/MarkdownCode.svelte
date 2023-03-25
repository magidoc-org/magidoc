<script lang="ts">
  import Prism from '@magidoc/plugin-svelte-prismjs'
  import type { marked } from 'marked'

  export let showCopyButton = true
  export let showLineNumbers = true

  export let token: marked.Tokens.Code
</script>

<Prism
  language={token.lang || 'text'}
  source={token.text}
  {showCopyButton}
  {showLineNumbers}
/>
