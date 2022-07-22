<script lang="ts" context="module">
  export function load({ params, url }: LoadEvent): LoadOutput {
    const field = getQueryByName(params.query)
    const page = findPageByHref(url.pathname)

    if (!field || !page) {
      return {
        status: 404,
        error: `Query ${params.query} not found.`,
      }
    }

    return {
      props: {
        field,
        page,
      },
    }
  }
</script>

<script lang="ts">
  import { QueryType } from '@magidoc/plugin-query-generator'
  import type { GraphQLField } from 'graphql'
  import FieldDetails from '$lib/components/query/FieldDetails.svelte'
  import type { LoadEvent, LoadOutput } from '@sveltejs/kit'
  import { findPageByHref } from '$lib/pages'
  import type { WebsitePage } from 'src/app'
  import PreviousNextPage from '$lib/components/nav/PreviousNextPage.svelte'
  import { getQueryByName } from '$lib/model'

  export let field: GraphQLField<unknown, unknown, unknown>
  export let page: WebsitePage
</script>

<svelte:head>
  <title>Query - {field.name}</title>
</svelte:head>

<FieldDetails {field} type={QueryType.QUERY} />

<PreviousNextPage {page} />
