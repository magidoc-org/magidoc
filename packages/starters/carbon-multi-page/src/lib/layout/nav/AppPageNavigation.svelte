<script lang="ts">
  import { page } from '$app/stores'
  import SelectableNavMenuItem from '$lib/components/nav/SelectableNavMenuItem.svelte'

  import type { WebsitePage } from 'src/app'

  export let item: WebsitePage
</script>

<SelectableNavMenuItem
  href={item.href}
  text={item.title}
  class={item.deprecated ? 'deprecated' : ''}
  currentRef={$page.url.pathname}
/>
