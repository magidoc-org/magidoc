<script lang="ts">
  import { generateTypeLink } from '$lib/schema'

  import {
    DataTable,
    StructuredList,
    StructuredListBody,
    StructuredListCell,
    StructuredListHead,
    StructuredListRow,
  } from 'carbon-components-svelte'
  import type { GraphQLField } from 'graphql'
  import NeverEmptyCell from '../../common/table/NeverEmptyCell.svelte'
  import DeprecatableTypedCell from '../../common/table/DeprecatableTypedCell.svelte'
  import DefaultValueCell from '$lib/components/common/table/DefaultValueCell.svelte'
  import _ from 'lodash'

  export let data: ReadonlyArray<GraphQLField<unknown, unknown, unknown>>

  $: tableData = _.sortBy(
    data.map((field) => ({
      id: field.name,
      deprecationReason: field.deprecationReason,
      name: field.name,
      typeLink: generateTypeLink(field.type),
      description: field.description,
      arguments: _.sortBy(
        field.args.map((arg) => ({
          id: arg.name,
          deprecationReason: arg.deprecationReason,
          name: arg.name,
          typeLink: generateTypeLink(arg.type),
          description: arg.description,
          default: arg.defaultValue,
        })),
        (item) => item.name,
      ),
    })) || [],
    (item) => item.name,
  )

  $: nonExpandableIds = data
    .filter((field) => field.args.length === 0)
    .map((field) => field.name)
</script>

<DataTable
  batchExpansion
  size="short"
  nonExpandableRowIds={nonExpandableIds}
  headers={[
    {
      key: 'name',
      value: 'Name',
    },
    {
      key: 'description',
      value: 'Description',
    },
  ]}
  rows={tableData}
>
  <svelte:fragment slot="cell" let:row let:cell>
    {#if cell.key === 'name'}
      <DeprecatableTypedCell
        name={cell.value}
        typeLink={row.typeLink}
        deprecationReason={row.deprecationReason}
      />
    {:else}
      <NeverEmptyCell value={cell.value} />
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="expanded-row" let:row>
    <div class="arguments-table-wrapper">
      <StructuredList condensed>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>Argument Name</StructuredListCell>
            <StructuredListCell head>Description</StructuredListCell>
            <StructuredListCell head>Default</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {#each row.arguments as arg}
            <StructuredListRow>
              <StructuredListCell>
                <DeprecatableTypedCell
                  name={arg.name}
                  typeLink={arg.typeLink}
                  deprecationReason={arg.deprecationReason}
                />
              </StructuredListCell>
              <StructuredListCell>
                <NeverEmptyCell value={arg.description} />
              </StructuredListCell>
              <StructuredListCell>
                <DefaultValueCell value={arg.default} />
              </StructuredListCell>
            </StructuredListRow>
          {/each}
        </StructuredListBody>
      </StructuredList>
    </div>
  </svelte:fragment>
</DataTable>

<style>
  .arguments-table-wrapper {
    border-left: 3px solid lightgrey;
    padding-left: 10px;
  }
</style>
