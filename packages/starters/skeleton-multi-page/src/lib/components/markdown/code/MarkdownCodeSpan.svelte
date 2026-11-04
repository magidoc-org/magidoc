<script lang="ts">
import type { Tokens } from 'marked'

export let token: Tokens.Codespan
</script>

<code class="rounded border border-surface-200-800 bg-surface-100-900 px-1.5 py-0.5 font-mono text-[0.875em]">{token.raw.slice(1, token.raw.length - 1)}</code>
