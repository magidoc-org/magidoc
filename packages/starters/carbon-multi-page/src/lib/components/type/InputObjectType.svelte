<script type="ts">
  import type { GraphQLInputObjectType } from 'graphql'
  import _ from 'lodash'
  import AppMarkdown from '../common/AppMarkdown.svelte'
  import TypeTag from '../tags/TypeTag.svelte'
  import InputFieldsTable from './list/InputFieldsList.svelte'

  export let type: GraphQLInputObjectType
</script>

<section>
  <h1>{type.name} <TypeTag {type} /></h1>
  <br />

  <AppMarkdown source={type.description} />

  <br />

  {#if Object.keys(type.getFields()).length > 0}
    <h2>Fields</h2>
    <InputFieldsTable data={_.map(type.getFields(), (item) => item)} />
  {/if}
</section>
