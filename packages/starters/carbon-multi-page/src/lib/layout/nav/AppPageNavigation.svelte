<script lang="ts">
  import { SelectableNavMenuItem } from '@magidoc/plugin-svelte-carbon-commons'
  import { page } from '$app/stores'

  import type { WebsitePage } from 'src/app'

  export let item: WebsitePage
</script>

<SelectableNavMenuItem
  href={item.href}
  text={item.title}
  class={item.deprecated ? 'deprecated' : ''}
  currentRef={$page.url.pathname}
/>
