<script lang="ts" context="module">
  export function load({ stuff, params }: LoadInput): LoadOutput {
    const field: GraphQLField<unknown, unknown, undefined> | undefined =
      stuff.schema?.getSubscriptionType()?.getFields()[params.subscription]

    if (!field) {
      return {
        status: 404,
        error: `Subscription ${params.subscription} not found`,
      }
    }

    return {
      props: {
        field,
      },
    }
  }
</script>

<script lang="ts">
  import { QueryType } from '@magidoc/plugin-query-generator'
  import type { GraphQLField } from 'graphql'
  import FieldDetails from '$lib/components/query/FieldDetails.svelte'
  import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/internal'

  export let field: GraphQLField<unknown, unknown, unknown>
</script>

<FieldDetails {field} type={QueryType.SUBSCRIPTION} />
