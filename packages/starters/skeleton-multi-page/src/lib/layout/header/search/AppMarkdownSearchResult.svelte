<script lang="ts">
import { IndexableMarkdownType, type SearchResult } from '@magidoc/plugin-fuse-markdown'
import type { MarkdownData, ResultRange } from '$lib/search'
import AppSearchHighlight from './AppSearchHighlight.svelte'
import HeaderCrumb from './HeaderCrumb.svelte'

export let result: SearchResult<MarkdownData>
export let indexes: ReadonlyArray<ResultRange>

let href: string
$: headers = result.part.type === IndexableMarkdownType.HEADER ? result.part.path : result.part.headers
$: {
  const lastHeader = headers[headers.length - 1]
  const url = result.data.url
  if (!lastHeader || lastHeader.depth === 1) {
    href = url
  } else {
    href = `${url}#${lastHeader.id}`
  }
}
</script>

<a {href} class="card block border border-surface-200-800 p-3 text-sm in-data-active:border-primary-500 in-data-active:preset-tonal-primary" on:click>
  <HeaderCrumb {headers} section={result.data.section} />
  <br />
  {#if result.part.type === IndexableMarkdownType.HEADER}
    <AppSearchHighlight text={result.part.title} {indexes} />
  {:else}
    <AppSearchHighlight text={result.part.content} {indexes} />
  {/if}
</a>
