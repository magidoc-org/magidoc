<script lang="ts">
import { page } from '$app/stores'
import SelectableNavMenuItem from '$lib/components/nav/SelectableNavMenuItem.svelte'
import type { Page } from '@magidoc/plugin-starter-common'

export let item: Page
</script>

<SelectableNavMenuItem
  href={item.href}
  text={item.title}
  class={item.deprecated ? 'deprecated' : ''}
  currentRef={$page.url.pathname}
/>
