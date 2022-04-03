<script lang="ts">
  import { InlineNotification } from 'carbon-components-svelte'
  import SvelteMarkdown from 'svelte-markdown'

  const info = /^[\s]*info[\s]*:/gi
  const warning = /^[\s]*warning[\s]*:/gi

  export let text: string

  function getType(): 'info' | 'warning' {
    if (text.match(info)) {
      return 'info'
    } else if (text.match(warning)) {
      return 'warning'
    }

    return 'info'
  }

  function getText(): string {
    return text.replace(info, '').replace(warning, '')
  }

  let type: 'info' | 'warning'
  $: type = getType()

  let cleanText: string
  $: cleanText = getText()
</script>

<InlineNotification kind={type} lowContrast hideCloseButton iconDescription={type}>
  <SvelteMarkdown source={cleanText} />
</InlineNotification>
