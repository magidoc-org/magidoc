<script context="module">
  export const ssr = false
</script>

<script lang="ts">
  import type { GraphQLField } from 'graphql'
  import { onMount } from 'svelte'

  export let field: GraphQLField<unknown, unknown, unknown>

  let QueryGenerator: unknown

  onMount(async () => {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    QueryGenerator = (await import('@magidoc/plugin-query-generator')).default
    console.log(QueryGenerator)
  })
</script>

<svelte:component this={QueryGenerator} {field} />
