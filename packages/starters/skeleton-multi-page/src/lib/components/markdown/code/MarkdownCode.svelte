<script lang="ts">
import Prism from '@magidoc/plugin-svelte-prismjs'
import type { Tokens } from 'marked'

export let showCopyButton = true
export let showLineNumbers = true

export let token: Tokens.Code
</script>

<Prism
  language={token.lang || 'plain'}
  source={token.text}
  {showCopyButton}
  {showLineNumbers}
/>
