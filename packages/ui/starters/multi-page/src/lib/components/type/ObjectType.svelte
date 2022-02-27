<script type="ts">
  import { generateTypeLink } from '$lib/schema'
import { DataTable, TooltipIcon } from 'carbon-components-svelte';
import { WarningFilled16 } from 'carbon-icons-svelte';

  import { GraphQLInterfaceType, GraphQLObjectType, isInputObjectType } from 'graphql'
import _ from 'lodash';
  import MarkdownDescription from '../common/MarkdownDescription.svelte'

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
    <DataTable
      size="short"
      headers={[
        {
          key: 'name',
          value: 'Name',
        },
        {
          key: 'description',
          value: 'Description',
        },
        {
          key: 'default',
          value: 'Default',
        },
      ]}
      rows={_.map(type.getFields(), (arg) => ({
        id: arg.name,
        deprecationReason: arg.deprecationReason,
        name: arg.name,
        typeLink: generateTypeLink(arg.type),
        description: arg.description,
      }))}
    >
      <svelte:fragment slot="cell" let:row let:cell>
        {#if cell.key === 'name'}
          <span class={row.deprecationReason ? 'deprecated' : ''}
            >{cell.value}</span
          >: {@html row.typeLink}
          {#if row.deprecationReason}
            <TooltipIcon
              icon={WarningFilled16}
              tooltipText={row.deprecationReason}
            />
          {/if}
        {:else if cell.key == 'default'}
          {#if typeof cell.value == 'string'}
            "{cell.value}"
          {:else if typeof cell.value === 'object'}
            {JSON.stringify(cell.value, null, 2)}
          {:else}
            {cell.value ?? '-'}
          {/if}
        {:else}
          {cell.value ?? '-'}
        {/if}
      </svelte:fragment>
    </DataTable>
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
