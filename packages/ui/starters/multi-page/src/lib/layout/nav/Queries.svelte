<script lang="ts">
  import { schema } from '$lib/schema'
  import _ from 'lodash'

  import { SideNavMenu, SideNavMenuItem } from 'carbon-components-svelte'
  import type { GraphQLField } from 'graphql'

  const queryType = $schema.getQueryType()
  const queries =
    _.map(queryType?.getFields(), (field: GraphQLField<unknown, unknown>) => ({
      name: field.name,
      deprecated: !!field.deprecationReason,
      href: `/model/queries/${field.name}`,
    })) || []
</script>

{#if queryType}
  <SideNavMenu text="Queries" expanded>
    {#each queries as query}
      <SideNavMenuItem
        href={query.href}
        text={query.name}
        class={query.deprecated ? 'deprecated' : ''}
      />
    {/each}
  </SideNavMenu>
{/if}
