<script lang="ts">
  import MarkdownNotification from './containers/MarkdownNotification.svelte'
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../markedConfiguration'

  export let token: marked.Tokens.Blockquote
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<MarkdownNotification
  token={{
    type: 'notification',
    raw: token.raw,
    style: 'info',
    tokens: token.tokens,
  }}
>
  <slot />
</MarkdownNotification>
