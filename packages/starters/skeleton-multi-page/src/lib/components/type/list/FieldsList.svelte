<script lang="ts">
import { templates } from '@magidoc/plugin-starter-variables'
import _ from 'lodash'
import type { FieldWithPossibleDescriptions } from '$lib/model'
import { getOrDefault } from '$lib/variables'
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

<ul class="divide-y divide-surface-200-800">
  {#each tableData as item}
    <FieldsTableRow {item} />
  {/each}
</ul>
