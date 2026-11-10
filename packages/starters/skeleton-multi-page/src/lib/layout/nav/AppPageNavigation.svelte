<script lang="ts">
import type { Page } from '@magidoc/plugin-starter-common'
import { Navigation } from '@skeletonlabs/skeleton-svelte'
import { page } from '$app/state'

export let item: Page
</script>

<Navigation.TriggerAnchor
  href={item.href}
  aria-current={page.url.pathname === item.href ? 'page' : undefined}
  class="py-1.5 text-sm aria-[current=page]:preset-tonal-primary {item.deprecated ? 'deprecated' : ''}"
>
  {item.title}
</Navigation.TriggerAnchor>
