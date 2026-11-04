<script lang="ts">
import type { Tokens } from 'marked'
import MarkdownNotification from '../containers/notification/MarkdownNotification.svelte'

export let token: Tokens.Blockquote
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
