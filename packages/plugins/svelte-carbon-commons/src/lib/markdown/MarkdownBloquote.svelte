<script lang="ts">
  import { InlineNotification } from 'carbon-components-svelte'
  import MarkdownSection from './CarbonMarkdown.svelte'

  const info = /^[\s]*info[\s]*:/gi
  const warning = /^[\s]*warning[\s]*:/gi

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
  <MarkdownSection source={cleanText} />
</InlineNotification>
