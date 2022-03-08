<script lang="ts">
  import type { GraphQLField } from 'graphql'
  import type { QueryType } from '@magidoc/plugin-query-generator'
  import AppQueryGenerator from './AppQueryGenerator.svelte'
  import DeprecationNotice from '../common/DeprecationNotice.svelte'
  import MarkdownDescription from '../common/MarkdownDescription.svelte'
  import _ from 'lodash'
  import ArgsList from './list/ArgsList.svelte'
  import QueryTypeTag from '../tags/QueryTypeTag.svelte'
  import TypeLink from '../common/TypeLink.svelte'

  export let type: QueryType
  export let field: GraphQLField<unknown, unknown, unknown>
</script>

<section>
  <DeprecationNotice deprecationReason={field.deprecationReason} />

  <h1>{field.name} <QueryTypeTag {type} /></h1>

  <br />

  <MarkdownDescription description={field.description} />

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
