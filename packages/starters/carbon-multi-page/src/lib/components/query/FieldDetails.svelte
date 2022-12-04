<script lang="ts">
  import type { GraphQLField } from 'graphql'
  import type { QueryType } from '@magidoc/plugin-query-generator'
  import AppQueryGenerator from './AppQueryTabs.svelte'
  import ArgsList from './list/ArgsList.svelte'
  import QueryTypeTag from '../tags/QueryTypeTag.svelte'
  import TypeLink from '../common/text/TypeLink.svelte'
  import DeprecationNotice from '../common/text/DeprecationNotice.svelte'
  import AnchorHeader from '../common/text/AnchorHeader.svelte'
  import CarbonMarkdown from '../markdown/CarbonMarkdown.svelte'
  import DirectiveTag from '../tags/DirectiveTag.svelte'

  export let type: QueryType
  export let field: GraphQLField<unknown, unknown, unknown>
</script>

<section>
  <DeprecationNotice deprecationReason={field.deprecationReason} />

  <AnchorHeader id={'title'} depth={1}>
    {field.name}<QueryTypeTag {type} />

    {#if field.astNode?.directives}
      {#each field.astNode.directives as item}
        <DirectiveTag directive={item} />
      {/each}
    {/if}
  </AnchorHeader>

  <CarbonMarkdown source={field.description} />

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
