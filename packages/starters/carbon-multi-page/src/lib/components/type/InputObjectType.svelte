<script type="ts">
  import { AnchorHeader } from '@magidoc/plugin-svelte-carbon-commons'

  import type { GraphQLInputObjectType } from 'graphql'
  import _ from 'lodash'
  import AppMarkdown from '../common/AppMarkdown.svelte'
  import TypeTag from '../tags/TypeTag.svelte'
  import InputFieldsTable from './list/InputFieldsList.svelte'

  export let type: GraphQLInputObjectType
</script>

<section>
  <h1>{type.name} <TypeTag {type} /></h1>

  <AppMarkdown source={type.description} />

  {#if Object.keys(type.getFields()).length > 0}
    <AnchorHeader id={'fields'} depth={2}>Fields</AnchorHeader>
    <InputFieldsTable data={_.map(type.getFields(), (item) => item)} />
  {/if}
</section>
