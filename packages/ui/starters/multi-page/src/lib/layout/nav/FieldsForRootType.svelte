<script lang="ts">
  import _ from 'lodash'
  import { SideNavMenu, SideNavMenuItem } from 'carbon-components-svelte'
  import { page } from '$app/stores'
  import type { GraphQLField, GraphQLObjectType } from 'graphql'

  export let type: GraphQLObjectType | undefined | null
  export let menuText: string
  export let baseUrl: string

  const fields: ReadonlyArray<{
    name: string
    deprecated: boolean
    href: string
  }> =
    _.map(
      type?.getFields(),
      (field: GraphQLField<unknown, unknown, unknown>) => ({
        name: field.name,
        deprecated: !!field.deprecationReason,
        href: `${baseUrl}/${field.name}`,
      }),
    ) || []
</script>

{#if fields.length > 0}
  <SideNavMenu text={menuText} expanded>
    {#each fields as query}
      <SideNavMenuItem
        href={query.href}
        text={query.name}
        isSelected={$page.url.pathname === query.href}
        class={query.deprecated ? 'deprecated' : ''}
      />
    {/each}
  </SideNavMenu>
{/if}
