<script lang="ts">
  import type { NotificationToken } from '../../extensions/components/Notification'
  import type { MarkdownOptions, Renderers } from '../../markedConfiguration'

  import { InlineNotification } from 'carbon-components-svelte'

  export let token: NotificationToken
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<InlineNotification
  kind={token.style}
  lowContrast
  hideCloseButton
  iconDescription={token.style}
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
