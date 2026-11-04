<script lang="ts">
import AppMarkdown from '../../markdown/AppMarkdown.svelte'
import MarkdownNotification from '../../markdown/containers/notification/MarkdownNotification.svelte'

export let deprecationReason: string | undefined | null
</script>

{#if deprecationReason}
  <MarkdownNotification token={{ type: 'notification', raw: '', style: 'warning', tokens: [] }}>
    <AppMarkdown source={`**Deprecated**: ${String(deprecationReason)}`} />
  </MarkdownNotification>
{/if}
