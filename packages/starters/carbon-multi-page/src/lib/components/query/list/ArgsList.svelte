<script lang="ts">
  import DefaultValueDisplay from '$lib/components/common/text/DefaultValueDisplay.svelte'

  import DeprecatedTag from '$lib/components/tags/DeprecatedTag.svelte'
  import NullableTag from '$lib/components/tags/NullableTag.svelte'
  import TypeLinkTag from '$lib/components/tags/TypeLinkTag.svelte'

  import {
    StructuredList,
    StructuredListBody,
    StructuredListCell,
    StructuredListRow,
  } from 'carbon-components-svelte'
  import type { GraphQLArgument } from 'graphql'
  import _ from 'lodash'

  export let data: ReadonlyArray<GraphQLArgument>

  $: items =
    _.sortBy(
      data.map((arg) => ({
        id: arg.name,
        deprecationReason: arg.deprecationReason,
        name: arg.name,
        description: arg.description,
        default: arg.defaultValue,
        type: arg.type,
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
            <span style="font-weight: bold">{item.name}</span>
            <TypeLinkTag type={item.type} />
            <DeprecatedTag reason={item.deprecationReason} />
            <NullableTag type={item.type} />
          </p>
          {#if item.description}
            <p>{item.description}</p>
          {/if}
          {#if item.default}
            Default: <DefaultValueDisplay value={item.default} />
          {/if}
        </StructuredListCell>
      </StructuredListRow>
    {/each}
  </StructuredListBody>
</StructuredList>
