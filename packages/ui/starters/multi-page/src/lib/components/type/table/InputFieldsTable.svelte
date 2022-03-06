<script lang="ts">
  import { generateTypeLink } from '$lib/schema'

  import {
    StructuredList,
    StructuredListBody,
    StructuredListCell,
    StructuredListRow,
  } from 'carbon-components-svelte'
  import type { GraphQLInputField } from 'graphql'
  import DefaultValueCell from '../../common/table/DefaultValueCell.svelte'
  import DeprecatedTag from '$lib/components/tags/DeprecatedTag.svelte'
  import NullableTag from '$lib/components/tags/NullableTag.svelte'
  import _ from 'lodash'

  export let data: ReadonlyArray<GraphQLInputField>

  $: items =
    _.sortBy(
      data.map((arg) => ({
        id: arg.name,
        deprecationReason: arg.deprecationReason,
        name: arg.name,
        type: arg.type,
        typeLink: generateTypeLink(arg.type),
        description: arg.description,
        default: arg.defaultValue,
      })),
      (item) => item.name,
    ) || []
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
