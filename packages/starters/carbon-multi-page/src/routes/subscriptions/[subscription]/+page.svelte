<script lang="ts">
  throw new Error(
    '@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)',
  )

  import { QueryType } from '@magidoc/plugin-query-generator'
  import type { GraphQLField } from 'graphql'
  import FieldDetails from '$lib/components/query/FieldDetails.svelte'
  import type { LoadEvent, LoadOutput } from '@sveltejs/kit'
  import { findPageByHref } from '$lib/pages'
  import type { WebsitePage } from 'src/app'
  import PreviousNextPage from '$lib/components/nav/PreviousNextPage.svelte'
  import { getSubscriptionByName } from '$lib/model'

  export let field: GraphQLField<unknown, unknown, unknown>
  export let page: WebsitePage
</script>

<svelte:head>
  <title>Subscription - {field.name}</title>
</svelte:head>

<FieldDetails {field} type={QueryType.SUBSCRIPTION} />

<PreviousNextPage {page} />
