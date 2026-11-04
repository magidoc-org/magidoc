<script lang="ts">
import AppMarkdown from '$lib/components/markdown/AppMarkdown.svelte'
import PreviousNextPage from '$lib/components/nav/PreviousNextPage.svelte'
import type { PageData } from './$types'

export let data: PageData
</script>

<svelte:head>
  <title>
    {data.page?.section ? `${data.page.section} - ` : ''}{data.page.title}
  </title>
</svelte:head>

<AppMarkdown source={data.page.content} />

<PreviousNextPage page={data.page} />
