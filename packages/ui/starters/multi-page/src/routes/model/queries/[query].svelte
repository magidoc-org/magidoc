<script lang="ts">
  import { schema } from '$lib/schema'
  import { page } from '$app/stores'
  import type { GraphQLField } from 'graphql'
  import { InlineNotification } from 'carbon-components-svelte'
  import QueryGenerator from '@magidoc/plugin-query-generator'

  let field: GraphQLField<unknown, unknown, unknown>

  $: {
    const target = $schema.getQueryType()?.getFields()[$page.params.query]
    if (!target) {
      throw new Error('what?')
    }
    field = target
  }
</script>

<section>
  {#if field.deprecationReason}
    <InlineNotification
      hideCloseButton
      kind="warning"
      title="Deprecated Query:"
      subtitle={field.deprecationReason}
    />
  {/if}

  <h1>{field.name}</h1>

  {#if field.description}
    <p>{field.description}</p>
  {/if}

  <br />

  {#if field.args.length > 0}
    <h4>Arguments</h4>
    {#each field.args as arg}
      <p>
        <strong>{arg.name}</strong>
      </p>
    {/each}
  {/if}

  <br />

  {#if field.args.length > 0}
    <h4>Response</h4>
    {#each field.args as arg}
      <p>{arg.name}</p>
    {/each}
  {/if}

  <h4>Example</h4>
  <QueryGenerator {field} />
</section>
