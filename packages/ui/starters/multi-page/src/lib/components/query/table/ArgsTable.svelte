<script lang="ts">
  import { generateTypeLink } from '$lib/schema'

  import { DataTable } from 'carbon-components-svelte'
  import type { GraphQLArgument } from 'graphql'
  import NeverEmptyCell from '../../common/table/NeverEmptyCell.svelte'
  import DefaultValueCell from '../../common/table/DefaultValueCell.svelte'
  import DeprecatableTypedCell from '../../common/table/DeprecatableTypedCell.svelte'

  export let data: ReadonlyArray<GraphQLArgument>
</script>

<DataTable
  size="medium"
  headers={[
    {
      key: 'name',
      value: 'Name',
    },
    {
      key: 'description',
      value: 'Description',
    },
    {
      key: 'default',
      value: 'Default',
    },
  ]}
  rows={data.map((arg) => ({
    id: arg.name,
    deprecationReason: arg.deprecationReason,
    name: arg.name,
    typeLink: generateTypeLink(arg.type),
    description: arg.description,
    default: arg.defaultValue,
  }))}
>
  <svelte:fragment slot="cell" let:row let:cell>
    {#if cell.key === 'name'}
      <DeprecatableTypedCell
        name={cell.value}
        typeLink={row.typeLink}
        deprecationReason={row.deprecationReason}
      />
    {:else if cell.key == 'default'}
      <DefaultValueCell value={cell.value} />
    {:else}
      <NeverEmptyCell value={cell.value} />
    {/if}
  </svelte:fragment>
</DataTable>
