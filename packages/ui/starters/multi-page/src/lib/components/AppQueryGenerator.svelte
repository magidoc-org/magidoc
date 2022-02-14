<script context="module">
  export const ssr = false
</script>

<script lang="ts">
  import {generateGraphQLQuery} from '@magidoc/core'

  import type { GraphQLField } from 'graphql'
  import { onMount } from 'svelte'

  export let field: GraphQLField<unknown, unknown, unknown>

  let QueryGenerator: unknown

  onMount(async () => {
    console.log('query', generateGraphQLQuery)
    if (!window) return
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    window.CodeMirror = (await import('codemirror')).default
    console.log(window.CodeMirror)

    QueryGenerator = (await import('@magidoc/plugin-query-generator')).default
    console.log(QueryGenerator)
  })
</script>

<svelte:component this={QueryGenerator} {field} />
