<script lang="ts">
  import SelectableNavMenuItem from '$lib/components/nav/SelectableNavMenuItem.svelte'

  import { schema } from '$lib/schema'
  import { SideNavMenu } from 'carbon-components-svelte'
  import type { GraphQLNamedType } from 'graphql'
  import _ from 'lodash'

  const types: ReadonlyArray<{
    name: string
    deprecated: boolean
    href: string
  }> = _.sortBy(
    _.map(
      _.filter($schema.getTypeMap(), (type) => !type.name.startsWith('__')),
      (type: GraphQLNamedType) => ({
        name: type.name,
        deprecated: !!(type as unknown as Record<string, unknown>)[
          'deprecationReason'
        ],
        href: `/model/types/${type.name}`,
      }),
    ) || [],
    (item) => item.name,
  )
</script>

{#if types.length > 0}
  <SideNavMenu text="Types" expanded>
    {#each types as type}
      <SelectableNavMenuItem
        href={type.href}
        text={type.name}
        class={type.deprecated ? 'deprecated' : ''}
      />
    {/each}
  </SideNavMenu>
{/if}
