<script lang="ts" context="module">
  export function load({ stuff, params }: LoadInput): LoadOutput {
    const field: GraphQLField<unknown, unknown, unknown> | undefined =
      stuff.schema?.getMutationType()?.getFields()[params.mutation]

    if (!field) {
      return {
        status: 404,
        error: `Mutation ${params.mutation} not found`,
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

<svelte:head>
  <title>Mutation - {field.name}</title>
</svelte:head>

<FieldDetails {field} type={QueryType.MUTATION} />
