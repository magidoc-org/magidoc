<script lang="ts">
  import { getOrDefault } from '$lib/variables'
  import {
    templates,
    type ExternalLink,
  } from '@magidoc/plugin-starter-variables'

  import {
    HeaderAction,
    HeaderPanelDivider,
    HeaderPanelLinks,
  } from 'carbon-components-svelte'
  import _ from 'lodash'
  import AppLink from './AppLink.svelte'

  const links = getOrDefault(templates.EXTERNAL_LINKS, [])

  const none = 'none'
  let linkGroups: Record<string, ExternalLink[]> = _.groupBy(
    links.filter((it): it is ExternalLink => !!it),
    (item) => item.group || none,
  )
</script>

{#if links.length > 0}
  <HeaderAction transition={false}>
    <HeaderPanelLinks>
      <!-- Display all items without type first-->
      {#each linkGroups[none] as item}
        <AppLink link={item} />
      {/each}

      <!-- Display all items with type-->
      {#each _.entries(linkGroups) as item}
        {#if item[0] !== none}
          <HeaderPanelDivider>{item[0]}</HeaderPanelDivider>
          {#each item[1] as link}
            <AppLink {link} />
          {/each}
        {/if}
      {/each}
    </HeaderPanelLinks>
  </HeaderAction>
{/if}
