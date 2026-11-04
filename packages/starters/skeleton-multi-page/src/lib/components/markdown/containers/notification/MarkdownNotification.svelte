<script lang="ts">
import type { NotificationStyle, NotificationToken } from './Notification'

export let token: NotificationToken

const presets: Record<NotificationStyle, string> = {
  info: 'border-primary-500 bg-primary-500/10',
  success: 'border-success-500 bg-success-500/10',
  warning: 'border-warning-500 bg-warning-500/10',
  error: 'border-error-500 bg-error-500/10',
}
</script>

<div class="card my-4 border-l-4 px-4 py-3 [&_.md-paragraph]:my-1 {presets[token.style]}">
  <slot />
</div>
