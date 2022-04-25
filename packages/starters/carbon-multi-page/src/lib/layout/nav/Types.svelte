<script lang="ts">
  import SelectableNavMenuItem from '$lib/components/nav/SelectableNavMenuItem.svelte'

  import { SideNavMenu } from 'carbon-components-svelte'
  import type { GraphQLNamedType } from 'graphql'
  import _ from 'lodash'

  type MappedTyped = {
    readonly name: string
    readonly deprecated: boolean
    readonly href: string
  }

  export let types: ReadonlyArray<GraphQLNamedType>

  let mappedTypes: ReadonlyArray<MappedTyped>
  $: mappedTypes = _.sortBy(
    types.map((type: GraphQLNamedType) => ({
      name: type.name,
      deprecated: !!(type as unknown as Record<string, unknown>)[
        'deprecationReason'
      ],
      href: `/model/types/${type.name}`,
    })),
    (item) => item.name,
  )
</script>

{#if types.length > 0}
  <SideNavMenu text="Types" expanded>
    {#each mappedTypes as type}
      <SelectableNavMenuItem
        href={type.href}
        text={type.name}
        class={type.deprecated ? 'deprecated' : ''}
      />
    {/each}
  </SideNavMenu>
{/if}
