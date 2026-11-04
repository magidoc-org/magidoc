<script lang="ts">
import type { ExternalLink } from '@magidoc/plugin-starter-variables'
import { Navigation } from '@skeletonlabs/skeleton-svelte'
import { computeIcon } from '../header/links'

export let link: ExternalLink
</script>

<Navigation.TriggerAnchor href={link.href} class="gap-2 py-1.5 text-sm">
  <svelte:component this={computeIcon(link)} size={16} />
  {link.label}
</Navigation.TriggerAnchor>
