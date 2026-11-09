<script lang="ts">
import { type ExternalLink, templates } from '@magidoc/plugin-starter-variables'
import { getOrDefault } from '#lib/variables'
import { computeIcon } from './links'

const links: ExternalLink[] = getOrDefault(templates.EXTERNAL_LINKS, []).filter(
  (link): link is ExternalLink => link?.position === 'header',
)
</script>

{#each links as link}
  <a href={link.href} class="btn-icon hover:preset-tonal" aria-label={link.label} title={link.label}>
    <svelte:component this={computeIcon(link)} size={20} />
  </a>
{/each}
