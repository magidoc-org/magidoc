<script lang="ts">
  import { StructuredList, StructuredListBody } from 'carbon-components-svelte'
  import type { GraphQLField } from 'graphql'
  import _ from 'lodash'
  import FieldsTableRow from './FieldsListRow.svelte'

  export let data: ReadonlyArray<GraphQLField<unknown, unknown, unknown>>

  $: tableData = _.sortBy(data, (item) => item.name)
</script>

<StructuredList condensed>
  <StructuredListBody>
    {#each tableData as item}
      <FieldsTableRow {item} />
    {/each}
  </StructuredListBody>
</StructuredList>
