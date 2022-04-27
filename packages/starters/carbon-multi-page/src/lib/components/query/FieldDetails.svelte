<script lang="ts">
  import type { GraphQLField } from 'graphql'
  import type { QueryType } from '@magidoc/plugin-query-generator'
  import AppQueryGenerator from './AppQueryGenerator.svelte'
  import AppMarkdown from '../common/AppMarkdown.svelte'
  import ArgsList from './list/ArgsList.svelte'
  import QueryTypeTag from '../tags/QueryTypeTag.svelte'
  import TypeLink from '../type/TypeLink.svelte'
  import { DeprecationNotice } from '@magidoc/plugin-svelte-carbon-commons'

  export let type: QueryType
  export let field: GraphQLField<unknown, unknown, unknown>
</script>

<section>
  <DeprecationNotice deprecationReason={field.deprecationReason} />

  <h1>{field.name} <QueryTypeTag {type} /></h1>

  <br />

  <AppMarkdown source={field.description} />

  {#if field.args.length > 0}
    <br />
    <h2>Arguments</h2>
    <ArgsList data={field.args} />
  {/if}

  {#if field.type}
    <br />
    <h2>Response</h2>
    <p>
      Returns <TypeLink type={field.type} />
    </p>
  {/if}

  <br />

  <h4>Example</h4>
  <AppQueryGenerator {type} {field} />
</section>
