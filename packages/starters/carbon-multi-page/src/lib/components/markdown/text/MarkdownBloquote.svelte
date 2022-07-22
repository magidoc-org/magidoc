<script lang="ts">
  import type { marked } from 'marked'
  import MarkdownNotification from '../containers/notification/MarkdownNotification.svelte'

  export let token: marked.Tokens.Blockquote
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
