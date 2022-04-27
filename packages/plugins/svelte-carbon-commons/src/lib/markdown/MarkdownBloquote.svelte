<script lang="ts">
  import { InlineNotification } from 'carbon-components-svelte'
  import CarbonMarkdown from './CarbonMarkdown.svelte'
  import { baseVar } from './stores'

  const info = /^[\s]*(information|info)[\s]*:/gi
  const warning = /^[\s]*(warning|warn)[\s]*:/gi

  export let text: string

  function getType(text: string): 'info' | 'warning' {
    if (text.match(info)) {
      return 'info'
    } else if (text.match(warning)) {
      return 'warning'
    }

    return 'info'
  }

  function getText(text: string): string {
    return text.replace(info, '').replace(warning, '')
  }

  $: cleanText = getText(text)
  $: type = getType(text)
</script>

<InlineNotification
  kind={type}
  lowContrast
  hideCloseButton
  iconDescription={type}
>
  <CarbonMarkdown source={cleanText} base={$baseVar} />
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
