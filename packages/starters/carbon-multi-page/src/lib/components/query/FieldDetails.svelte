<script lang="ts">
  import type { GraphQLField } from 'graphql'
  import type { QueryType } from '@magidoc/plugin-query-generator'
  import AppQueryGenerator from './AppQueryGenerator.svelte'
  import AppMarkdown from '../common/AppMarkdown.svelte'
  import ArgsList from './list/ArgsList.svelte'
  import QueryTypeTag from '../tags/QueryTypeTag.svelte'
  import TypeLink from '../type/TypeLink.svelte'
  import {
    DeprecationNotice,
    AnchorHeader,
  } from '@magidoc/plugin-svelte-carbon-commons'

  export let type: QueryType
  export let field: GraphQLField<unknown, unknown, unknown>
</script>

<section>
  <DeprecationNotice deprecationReason={field.deprecationReason} />

  <h1>{field.name}<QueryTypeTag {type} /></h1>

  <AppMarkdown source={field.description} />

  {#if field.args.length > 0}
    <AnchorHeader id={'arguments'} depth={2}>Arguments</AnchorHeader>
    <ArgsList data={field.args} />
  {/if}

  {#if field.type}
    <AnchorHeader id={'response'} depth={2}>Response</AnchorHeader>
    <p>
      Returns <TypeLink type={field.type} />.
    </p>
  {/if}

  <AnchorHeader id={'example'} depth={4}>Example</AnchorHeader>
  <AppQueryGenerator {type} {field} />
</section>
