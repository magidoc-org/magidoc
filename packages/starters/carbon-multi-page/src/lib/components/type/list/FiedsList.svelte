<script lang="ts">
import type { FieldWithPossibleDescriptions } from '$lib/model'
import { getOrDefault } from '$lib/variables'
import { templates } from '@magidoc/plugin-starter-variables'

import { StructuredList, StructuredListBody } from 'carbon-components-svelte'
import _ from 'lodash'
import FieldsTableRow from './FieldsListRow.svelte'

export let data: ReadonlyArray<FieldWithPossibleDescriptions>

const fieldSorting = getOrDefault(templates.FIELDS_SORTING, 'default')

let tableData: ReadonlyArray<FieldWithPossibleDescriptions> = data
$: {
  if (fieldSorting === 'alphabetical') {
    tableData = _.sortBy(data, (item) => item.field.name)
  } else {
    tableData = data
  }
}
</script>

<StructuredList condensed>
  <StructuredListBody>
    {#each tableData as item}
      <FieldsTableRow {item} />
    {/each}
  </StructuredListBody>
</StructuredList>
