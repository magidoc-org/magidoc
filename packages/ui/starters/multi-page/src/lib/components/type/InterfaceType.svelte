<script type="ts">
  import { generateTypeLink } from '$lib/schema'
  import { DataTable, TooltipIcon } from 'carbon-components-svelte'
  import { WarningFilled16 } from 'carbon-icons-svelte'

  import type { GraphQLInterfaceType } from 'graphql'
  import _ from 'lodash'
  import MarkdownDescription from '../common/MarkdownDescription.svelte'
  import TypeTag from '../tags/TypeTag.svelte'
  import FiedsTable from './table/FiedsTable.svelte'

  export let type: GraphQLInterfaceType
</script>

<section>
  <h1>{type.name} <TypeTag {type} /></h1>
  <br />

  <MarkdownDescription description={type.description} />

  <br />

  {#if Object.keys(type.getFields()).length > 0}
    <h2>Fields</h2>
    <FiedsTable data={_.map(type.getFields(), (arg) => arg)} />
  {/if}

  <br />

  {#if type.getInterfaces().length > 0}
    <h2>Interfaces</h2>
    Also implements {@html type
      .getInterfaces()
      .map((item) => generateTypeLink(item))
      .join(', ')}
  {/if}
</section>
