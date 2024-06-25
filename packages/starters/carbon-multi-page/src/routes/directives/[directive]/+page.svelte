<script lang="ts">
import DirectiveDetails from '$lib/components/directive/DirectiveDetails.svelte'
import PreviousNextPage from '$lib/components/nav/PreviousNextPage.svelte'
import type { PageData } from './$types'

export let data: PageData
</script>

<svelte:head>
  <title>Directive - {data.directive.name}</title>
</svelte:head>

<DirectiveDetails directive={data.directive} />

<PreviousNextPage page={data.page} />
