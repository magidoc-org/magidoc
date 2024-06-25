<script lang="ts">
import type { GraphQLSearchResult } from '$lib/search'
import { getSiteRoot } from '$lib/variables'
import { SearchResultType } from '@magidoc/plugin-fuse-graphql'
import { urlUtils } from '@magidoc/plugin-svelte-marked'
import { ClickableTile } from 'carbon-components-svelte'
import AppSearchHighlight from './AppSearchHighlight.svelte'
import HeaderCrumb from './HeaderCrumb.svelte'

export let item: GraphQLSearchResult

let href: string
let section: string
let location: string

$: {
  if (item.result.type === SearchResultType.QUERY) {
    href = urlUtils.joinUrlPaths(getSiteRoot(), `/queries/${item.result.name}`)
    section = 'Queries'
  } else if (item.result.type === SearchResultType.MUTATION) {
    href = urlUtils.joinUrlPaths(getSiteRoot(), `/mutations/${item.result.name}`)
    section = 'Mutations'
  } else if (item.result.type === SearchResultType.SUBSCRIPTION) {
    href = urlUtils.joinUrlPaths(getSiteRoot(), `/subscriptions/${item.result.name}`)
    section = 'Subscriptions'
  } else if (item.result.type === SearchResultType.TYPE) {
    href = urlUtils.joinUrlPaths(getSiteRoot(), `/types/${item.result.name}`)
    section = 'Types'
  }
}

$: {
  if (item.matches[0].location.includes('arguments')) {
    location = 'argument'
  } else if (item.matches[0].location.includes('fields')) {
    location = 'field'
  } else if (item.matches[0].location.includes('value')) {
    location = 'enum'
  } else if (item.matches[0].location.includes('name')) {
    location = 'name'
  } else if (item.matches[0].location.includes('description')) {
    location = 'description'
  }
}
</script>

<ClickableTile {href} on:click>
  <HeaderCrumb
    {section}
    headers={[{ id: item.result.name, depth: 1, text: item.result.name }]}
  />
  {#if location}
    <strong> ({location})</strong>
  {/if}

  <br />
  <AppSearchHighlight
    text={item.matches[0].value}
    indexes={item.matches[0].indices}
  />
</ClickableTile>
