<script lang="ts">
import type { Tokens } from 'marked'
import type { MarkdownOptions, Renderers } from '../../markedConfiguration'

export let token: Tokens.Codespan
export const options: MarkdownOptions = undefined
export const renderers: Renderers = undefined
</script>

<code>{token.raw.slice(1, token.raw.length - 1)}</code>
