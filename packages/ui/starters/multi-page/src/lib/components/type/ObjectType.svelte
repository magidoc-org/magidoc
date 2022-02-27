<script type="ts">
  import { generateTypeLink } from '$lib/schema'
  import { DataTable, TooltipIcon } from 'carbon-components-svelte'
  import { WarningFilled16 } from 'carbon-icons-svelte'

  import type { GraphQLObjectType } from 'graphql'
  import _ from 'lodash'
  import MarkdownDescription from '../common/MarkdownDescription.svelte'
  import FiedsTable from './table/FiedsTable.svelte'

  export let type: GraphQLObjectType
</script>

<section>
  <h1>{type.name}</h1>
  <h4>Object</h4>
  <br />

  <MarkdownDescription description={type.description} />

  <br />
  
  {#if Object.keys(type.getFields()).length > 0}
    <h4>Fields</h4>
    <FiedsTable data={_.map(type.getFields(), (item) => item)} />
  {/if}

  <br />

  {#if type.getInterfaces().length > 0}
    <h3>Interfaces</h3>
    Also implements {@html type
      .getInterfaces()
      .map((item) => generateTypeLink(item))
      .join(', ')}
  {/if}
</section>
