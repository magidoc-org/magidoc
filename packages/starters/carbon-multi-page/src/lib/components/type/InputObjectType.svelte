<script lang="ts">
import type { GraphQLInputObjectType } from 'graphql'
import _ from 'lodash'
import AnchorHeader from '../common/text/AnchorHeader.svelte'
import DirectivesList from '../directive/DirectivesList.svelte'
import CarbonMarkdown from '../markdown/CarbonMarkdown.svelte'
import TypeTag from '../tags/TypeTag.svelte'
import InputFieldsTable from './list/InputFieldsList.svelte'

export let type: GraphQLInputObjectType
</script>

<section>
  <AnchorHeader id={'title'} depth={1}>
    {type.name}
    <TypeTag {type} />
    <DirectivesList directives={type.astNode?.directives} />
  </AnchorHeader>

  <CarbonMarkdown source={type.description} />

  {#if Object.keys(type.getFields()).length > 0}
    <AnchorHeader id={'fields'} depth={2}>Fields</AnchorHeader>
    <InputFieldsTable data={_.map(type.getFields(), (item) => item)} />
  {/if}
</section>
