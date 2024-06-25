<script lang="ts">
import { getOrDefault } from '$lib/variables'
import { type ExternalLink, templates } from '@magidoc/plugin-starter-variables'
import { HeaderGlobalAction } from 'carbon-components-svelte'
import { computeIcon } from './links'

const links: ExternalLink[] = getOrDefault(templates.EXTERNAL_LINKS, []).filter(
  (link): link is ExternalLink => link?.position === 'header',
)
</script>

{#if links.length > 0}
  {#each links as link}
    <a href={link.href}>
      <HeaderGlobalAction
        icon={computeIcon(link)}
        iconDescription={link.label}
      />
    </a>
  {/each}
{/if}
