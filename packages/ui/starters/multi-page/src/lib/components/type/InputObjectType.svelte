<script type="ts">
  import { generateTypeLink } from '$lib/schema'

  import type { GraphQLInputObjectType } from 'graphql'
  import _ from 'lodash'
  import MarkdownDescription from '../common/MarkdownDescription.svelte'
  import InputFieldsTable from './table/InputFieldsTable.svelte'

  export let type: GraphQLInputObjectType
</script>

<section>
  <h1>{type.name}</h1>
  <h4>Input Object</h4>
  <br />

  <MarkdownDescription description={type.description} />

  <br />

  {#if Object.keys(type.getFields()).length > 0}
    <h4>Fields</h4>
    <InputFieldsTable data={_.map(type.getFields(), (item) => item)} />
  {/if}
</section>
