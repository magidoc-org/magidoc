<script lang="ts">
import type { QueryType } from '@magidoc/plugin-query-generator'
import type { GraphQLField } from 'graphql'
import AnchorHeader from '../common/text/AnchorHeader.svelte'
import DeprecationNotice from '../common/text/DeprecationNotice.svelte'
import TypeLink from '../common/text/TypeLink.svelte'
import DirectivesList from '../directive/DirectivesList.svelte'
import CarbonMarkdown from '../markdown/CarbonMarkdown.svelte'
import QueryTypeTag from '../tags/QueryTypeTag.svelte'
import AppQueryGenerator from './AppQueryTabs.svelte'
import ArgsList from './list/ArgsList.svelte'

export let type: QueryType
export let field: GraphQLField<unknown, unknown, unknown>
</script>

<section>
  <DeprecationNotice deprecationReason={field.deprecationReason} />

  <AnchorHeader id={'title'} depth={1}>
    {field.name}<QueryTypeTag {type} />
    <DirectivesList directives={field.astNode?.directives} />
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
