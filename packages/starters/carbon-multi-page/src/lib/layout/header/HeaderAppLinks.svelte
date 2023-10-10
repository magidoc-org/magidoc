<script lang="ts">
  import { getOrDefault } from '$lib/variables'
  import {
    templates,
    type ExternalLink,
  } from '@magidoc/plugin-starter-variables'
  import { HeaderGlobalAction } from 'carbon-components-svelte'
  import { computeIcon } from './links'

  const links: ExternalLink[] = getOrDefault(
    templates.EXTERNAL_LINKS,
    [],
  ).filter((link): link is ExternalLink => link?.position === 'header')
</script>

{#if links.length > 0}
  {#each links as link}
    <a href={link.href}>
      <HeaderGlobalAction icon={computeIcon(link)} aria-label={link.label} />
    </a>
  {/each}
{/if}
