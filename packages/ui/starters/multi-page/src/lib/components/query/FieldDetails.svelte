<script lang="ts">
  import {
    DataTable,
    TooltipIcon,
  } from 'carbon-components-svelte'
  import type { GraphQLField } from 'graphql'
  import type { QueryType } from '@magidoc/core'
  import AppQueryGenerator from './AppQueryGenerator.svelte'
  import { generateTypeLink } from '$lib/schema'
  import WarningFilled16 from 'carbon-icons-svelte/lib/WarningFilled16'
  import DeprecationNotice from '../common/DeprecationNotice.svelte'
import MarkdownDescription from '../common/MarkdownDescription.svelte'
import _ from 'lodash';

  export let type: QueryType
  export let field: GraphQLField<unknown, unknown, unknown>
</script>

<section>
  <DeprecationNotice deprecationReason={field.deprecationReason} />

  <h1>{field.name}</h1>
  <h4>{_.capitalize(type.toLowerCase())}</h4>

  <br />
  
  <MarkdownDescription description={field.description}/>

  <br />

  {#if field.args.length > 0}
    <h4>Arguments</h4>
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
      rows={field.args.map((arg) => ({
        id: arg.name,
        deprecationReason: arg.deprecationReason,
        name: arg.name,
        typeLink: generateTypeLink(arg.type),
        description: arg.description,
        default: arg.defaultValue,
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

  {#if field.type}
    <h4>Response</h4>
    <p>
      Returns
      {@html generateTypeLink(field.type)}
    </p>
  {/if}

  <br />

  <h4>Example</h4>
  <AppQueryGenerator {type} {field} />
</section>
