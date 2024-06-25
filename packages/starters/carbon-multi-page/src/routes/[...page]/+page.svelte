<script lang="ts">
import CarbonMarkdown from '$lib/components/markdown/CarbonMarkdown.svelte'
import PreviousNextPage from '$lib/components/nav/PreviousNextPage.svelte'
import type { PageData } from './$types'

export let data: PageData
</script>

<svelte:head>
  <title>
    {data.page?.section ? `${data.page.section} - ` : ''}{data.page.title}
  </title>
</svelte:head>

<CarbonMarkdown source={data.page.content} />

<PreviousNextPage page={data.page} />
