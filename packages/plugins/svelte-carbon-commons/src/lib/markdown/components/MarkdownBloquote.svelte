<script lang="ts">
  import { InlineNotification } from 'carbon-components-svelte'
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../marked'

  export let token: marked.Tokens.Blockquote = undefined
  export let options: MarkdownOptions = undefined
  export let renderers: Renderers = undefined
</script>

<InlineNotification
  kind={'info'}
  lowContrast
  hideCloseButton
  iconDescription={'info'}
>
  <slot />
</InlineNotification>

<style>
  :global(.bx--inline-notification) {
    max-width: inherit !important;
  }

  :global(.bx--inline-notification__text-wrapper) {
    padding: 0.7rem 0 !important;
  }

  :global(.bx--inline-notification__text-wrapper .md-paragraph) {
    margin: 0 !important;
  }
</style>
