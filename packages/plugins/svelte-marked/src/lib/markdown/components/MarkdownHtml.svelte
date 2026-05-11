<script lang="ts">
import type { Tokens } from 'marked'
import type { MarkdownOptions, Renderers } from '../markedConfiguration'

export let token: Tokens.HTML
export const options: MarkdownOptions | undefined = undefined
export const renderers: Renderers | undefined = undefined
</script>

{@html token.text}
