<script lang="ts" context="module">
  export function load({ stuff, params, url }: LoadEvent): LoadOutput {
    const field: GraphQLField<unknown, unknown, unknown> | undefined =
      stuff.schema?.getMutationType()?.getFields()[params.mutation]
    const page = findPageByHref(url.pathname)

    if (!field || !page) {
      return {
        status: 404,
        error: `Mutation ${params.mutation} not found`,
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
  import PreviousNextPage from '$lib/components/common/PreviousNextPage.svelte'

  export let field: GraphQLField<unknown, unknown, unknown>
  export let page: WebsitePage
</script>

<svelte:head>
  <title>Mutation - {field.name}</title>
</svelte:head>

<FieldDetails {field} type={QueryType.MUTATION} />

<PreviousNextPage {page} />
