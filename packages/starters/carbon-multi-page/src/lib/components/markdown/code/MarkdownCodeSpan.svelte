<script lang="ts">
  import CodeSpan from '$lib/components/common/code/CodeSpan.svelte'

  import type { marked } from 'marked'

  export let token: marked.Tokens.Codespan
</script>

<CodeSpan>{token.raw.slice(1, token.raw.length - 1)}</CodeSpan>
