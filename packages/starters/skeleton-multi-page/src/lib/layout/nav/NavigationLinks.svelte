<script lang="ts">
import { type ExternalLink, templates } from '@magidoc/plugin-starter-variables'
import { Navigation } from '@skeletonlabs/skeleton-svelte'
import _ from 'lodash'
import { getOrDefault } from '#lib/variables'
import AppLink from './AppLink.svelte'

const links = getOrDefault(templates.EXTERNAL_LINKS, []).filter(
  (link) => link?.position === 'navigation' || !link?.position,
)

const defaultGroup = links.filter((link): link is ExternalLink => !!(link && !link.group))

const otherGroups = _.map(
  _.groupBy(
    links.filter((link): link is ExternalLink & { group: string } => !!link?.group),
    (link) => link.group,
  ),
  (value, key) => ({
    key,
    value,
  }),
)
</script>

{#if defaultGroup.length > 0}
  <Navigation.Group class="border-t border-surface-200-800 pt-4">
    <Navigation.Menu class="gap-0.5">
      {#each defaultGroup as link}
        <AppLink {link} />
      {/each}
    </Navigation.Menu>
  </Navigation.Group>
{/if}

{#each otherGroups as group}
  <Navigation.Group>
    <Navigation.Label class="px-2 font-semibold tracking-wide uppercase">{group.key}</Navigation.Label>
    <Navigation.Menu class="gap-0.5">
      {#each group.value as link}
        <AppLink {link} />
      {/each}
    </Navigation.Menu>
  </Navigation.Group>
{/each}
