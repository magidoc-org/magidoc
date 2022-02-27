<script type="ts">
  import { DataTable, TooltipIcon } from 'carbon-components-svelte'
  import { WarningFilled16 } from 'carbon-icons-svelte'

  import type { GraphQLEnumType } from 'graphql'
  import MarkdownDescription from '../common/MarkdownDescription.svelte'

  export let type: GraphQLEnumType
</script>

<section>
  <h1>{type.name}</h1>
  <h4>Enum</h4>
  <br />
  
  <MarkdownDescription description={type.description} />

  <br />

  <h3>Possible Values</h3>
  <DataTable
    headers={[
      {
        key: 'name',
        value: 'Value',
      },
      {
        key: 'description',
        value: 'Description',
      },
    ]}
    rows={type.getValues().map((value) => ({
      id: value.name,
      name: value.name,
      description: value.description,
      deprecationReason: value.deprecationReason,
    }))}
  >
    <svelte:fragment slot="cell" let:row let:cell>
      {#if cell.key === 'name'}
        <span class={row.deprecationReason ? 'deprecated' : ''}
          >{cell.value}</span
        >
        {#if row.deprecationReason}
          <TooltipIcon
            icon={WarningFilled16}
            tooltipText={row.deprecationReason}
          />
        {/if}
      {:else}
        {cell.value ?? '-'}
      {/if}
    </svelte:fragment>
  </DataTable>
</section>
