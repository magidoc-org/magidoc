<script lang="ts">
import type { MarkdownData, ResultRange } from '$lib/search'
import { IndexableMarkdownType, type SearchResult } from '@magidoc/plugin-fuse-markdown'
import { ClickableTile } from 'carbon-components-svelte'
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

<ClickableTile {href} on:click>
  <HeaderCrumb {headers} section={result.data.section} />
  <br />
  {#if result.part.type === IndexableMarkdownType.HEADER}
    <AppSearchHighlight text={result.part.title} {indexes} />
  {:else}
    <AppSearchHighlight text={result.part.content} {indexes} />
  {/if}
</ClickableTile>
