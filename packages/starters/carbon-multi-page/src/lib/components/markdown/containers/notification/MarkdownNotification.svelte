<script lang="ts">
import { InlineNotification } from 'carbon-components-svelte'
import type { NotificationToken } from './Notification'

export let token: NotificationToken
</script>

<InlineNotification kind={token.style} lowContrast hideCloseButton>
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
