<script lang="ts">
  import { InlineNotification } from 'carbon-components-svelte'
  import type { GraphQLField } from 'graphql'
  import AppQueryGenerator from './AppQueryGenerator.svelte'

  export let field: GraphQLField<unknown, unknown, unknown>
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

  <br />

  <h4>Sample</h4>
  <AppQueryGenerator {field} />
</section>
