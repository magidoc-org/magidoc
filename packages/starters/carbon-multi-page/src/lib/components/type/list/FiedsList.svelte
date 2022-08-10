<script lang="ts">
  import type { FieldWithPossibleDescription } from '$lib/model'

  import { StructuredList, StructuredListBody } from 'carbon-components-svelte'
  import _ from 'lodash'
  import FieldsTableRow from './FieldsListRow.svelte'

  export let data: ReadonlyArray<FieldWithPossibleDescription>

  $: tableData = _.sortBy(data, (item) => item.field.name)
</script>

<StructuredList condensed>
  <StructuredListBody>
    {#each tableData as item}
      <FieldsTableRow {item} />
    {/each}
  </StructuredListBody>
</StructuredList>
