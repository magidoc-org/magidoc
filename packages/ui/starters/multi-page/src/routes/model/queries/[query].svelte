<script lang="ts">
  import { schema } from '$lib/schema'
  import { page } from '$app/stores'
  import { argsToArgsConfig } from 'graphql/type/definition'

  const field = $schema.getQueryType()?.getFields()[$page.params.query]
  if (!field) {
    throw new Error('what?')
  }
  field.args
</script>

<section>
  <h1>{field.name}</h1>

  {#if field.description}
    <p>{field.description}</p>
  {/if}

  {#if field.args.length > 0}
    {#each field.args as arg}
      <p>{argsToArgsConfig.name}</p>
    {/each}
  {/if}
</section>
