<script lang="ts">
import PreviousNextPage from '$lib/components/nav/PreviousNextPage.svelte'
import FieldDetails from '$lib/components/query/FieldDetails.svelte'
import { QueryType } from '@magidoc/plugin-query-generator'
import type { PageData } from './$types'

export let data: PageData
</script>
 
<svelte:head>
  <title>Query - {data.field.name}</title>
</svelte:head>

<FieldDetails field={data.field} type={QueryType.QUERY} />

<PreviousNextPage page={data.page} />
