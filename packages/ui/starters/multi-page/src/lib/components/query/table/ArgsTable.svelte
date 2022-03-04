<script lang="ts">
  import DeprecatedTag from '$lib/components/tags/DeprecatedTag.svelte'
  import NullableTag from '$lib/components/tags/NullableTag.svelte'

  import { generateTypeLink } from '$lib/schema'

  import {
    DataTable,
    StructuredList,
    StructuredListBody,
    StructuredListCell,
    StructuredListRow,
    Tag,
  } from 'carbon-components-svelte'
  import type { GraphQLArgument } from 'graphql'
  import DefaultValueCell from '../../common/table/DefaultValueCell.svelte'
  import DeprecatableTypedCell from '../../common/table/DeprecatableTypedCell.svelte'

  export let data: ReadonlyArray<GraphQLArgument>

  $: items = data.map((arg) => ({
    id: arg.name,
    deprecationReason: arg.deprecationReason,
    name: arg.name,
    typeLink: generateTypeLink(arg.type),
    description: arg.description,
    default: arg.defaultValue,
    type: arg.type,
  }))
</script>

<StructuredList condensed>
  <StructuredListBody>
    {#each items as item}
      <StructuredListRow>
        <StructuredListCell>
          <p>
            <span style="font-weight: bold">{item.name}</span>: {@html item.typeLink}
            <DeprecatedTag reason={item.deprecationReason} />
            <NullableTag type={item.type} />
          </p>
          {#if item.description}
            <p>{item.description}</p>
          {/if}
          {#if item.default}
            Default: <DefaultValueCell value={item.default} />
          {/if}
        </StructuredListCell>
      </StructuredListRow>
    {/each}
  </StructuredListBody>
</StructuredList>
