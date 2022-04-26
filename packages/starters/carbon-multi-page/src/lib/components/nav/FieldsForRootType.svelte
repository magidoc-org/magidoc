<script lang="ts">
  import _ from 'lodash'
  import { SideNavMenu } from 'carbon-components-svelte'
  import type { GraphQLField, GraphQLObjectType } from 'graphql'
  import { SelectableNavMenuItem } from '@magidoc/plugin-svelte-carbon-commons'
  import { page } from '$app/stores'

  export let type: GraphQLObjectType | undefined | null
  export let menuText: string
  export let baseUrl: string

  const fields: ReadonlyArray<{
    name: string
    deprecated: boolean
    href: string
  }> = _.sortBy(
    _.map(
      type?.getFields(),
      (field: GraphQLField<unknown, unknown, unknown>) => ({
        name: field.name,
        deprecated: !!field.deprecationReason,
        href: `${baseUrl}/${field.name}`,
      }),
    ) || [],
    (item) => item.name,
  )
</script>

{#if fields.length > 0}
  <SideNavMenu text={menuText} expanded>
    {#each fields as query}
      <SelectableNavMenuItem
        href={query.href}
        text={query.name}
        currentRef={$page.url.pathname}
        class={query.deprecated ? 'deprecated' : ''}
      />
    {/each}
  </SideNavMenu>
{/if}
