<script lang="ts">
  import DefaultValueDisplay from '$lib/components/common/text/DefaultValueDisplay.svelte'
  import CarbonMarkdown from '$lib/components/markdown/CarbonMarkdown.svelte'

  import DeprecatedTag from '$lib/components/tags/DeprecatedTag.svelte'
  import NullableTag from '$lib/components/tags/NullableTag.svelte'
  import TypeLinkTag from '$lib/components/tags/TypeLinkTag.svelte'
  import { getOrDefault } from '$lib/variables'
  import { templates } from '@magidoc/plugin-starter-variables'

  import {
    StructuredList,
    StructuredListBody,
    StructuredListCell,
    StructuredListRow,
  } from 'carbon-components-svelte'
  import type { GraphQLArgument } from 'graphql'
  import _ from 'lodash'

  export let data: ReadonlyArray<GraphQLArgument>

  const argumentSorting = getOrDefault(templates.ARGUMENTS_SORTING, 'default')

  function convertItems(data: ReadonlyArray<GraphQLArgument>) {
    return data.map((arg) => ({
      id: arg.name,
      deprecationReason: arg.deprecationReason,
      name: arg.name,
      description: arg.description,
      default: arg.defaultValue,
      type: arg.type,
    }))
  }

  let items: ReturnType<typeof convertItems>

  $: {
    if (argumentSorting === 'alphabetical') {
      items = _.sortBy(convertItems(data), (item) => item.name)
    } else {
      items = convertItems(data)
    }
  }
</script>

<StructuredList condensed>
  <StructuredListBody>
    {#each items as item}
      <StructuredListRow>
        <StructuredListCell>
          <p class="arg-name-section">
            <span style="font-weight: bold">{item.name}</span>
            {#if item.default}
              <span>=</span>
              <span><DefaultValueDisplay value={item.default} /></span>
            {/if}
            <TypeLinkTag type={item.type} />
            <DeprecatedTag reason={item.deprecationReason} />
            <NullableTag type={item.type} />
          </p>
          {#if item.description}
            <CarbonMarkdown source={item.description} />
          {/if}
        </StructuredListCell>
      </StructuredListRow>
    {/each}
  </StructuredListBody>
</StructuredList>

<style>
  .arg-name-section {
    display: flex;
    gap: 0.2rem;
    align-items: center;
  }
</style>
