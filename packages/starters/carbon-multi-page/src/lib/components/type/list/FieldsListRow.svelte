<script lang="ts">
import AppExpandButton from '$lib/components/common/AppExpandButton.svelte'
import CarbonMarkdown from '$lib/components/markdown/CarbonMarkdown.svelte'

import ArgsList from '$lib/components/query/list/ArgsList.svelte'

import DeprecatedTag from '$lib/components/tags/DeprecatedTag.svelte'
import DirectiveTag from '$lib/components/tags/DirectiveTag.svelte'
import NullableTag from '$lib/components/tags/NullableTag.svelte'
import TypeLinkTag from '$lib/components/tags/TypeLinkTag.svelte'
import type { FieldWithPossibleDescriptions } from '$lib/model'

import DirectivesList from '$lib/components/directive/DirectivesList.svelte'
import { StructuredListCell, StructuredListRow } from 'carbon-components-svelte'
import LocationSpecificDescription from './LocationSpecificDescription.svelte'

export let item: FieldWithPossibleDescriptions
let showArguments = false
</script>

<StructuredListRow>
  <StructuredListCell>
    <p>
      <span style="font-weight: bold" class:deprecated={!!item.field.deprecationReason}>{item.field.name}</span>
      <TypeLinkTag type={item.field.type} />
      <DeprecatedTag reason={item.field.deprecationReason} />
      <NullableTag type={item.field.type} />
      <DirectivesList directives={item.field.astNode?.directives} />
    </p>

    {#if item.possibleDescriptions.length === 1}
      <CarbonMarkdown source={item.possibleDescriptions[0].description} />
    {:else if item.possibleDescriptions.length > 1}
      {#each item.possibleDescriptions as current}
        <LocationSpecificDescription item={current} />
      {/each}
    {/if}

    {#if item.field.args.length > 0}
      {#if showArguments}
        <div class="arguments-list-wrapper">
          <ArgsList data={item.field.args} />
        </div>
      {/if}
      <AppExpandButton
        totalItems={item.field.args.length}
        collapsedText="Show arguments"
        expandedText="Hide arguments"
        bind:expanded={showArguments}
      />
    {/if}
  </StructuredListCell>
</StructuredListRow>

<style>
  .arguments-list-wrapper {
    border-left: 3px solid var(--cds-ui-03, #dcdbdb);
    padding-left: 10px;
    margin-top: 0.7rem;
    margin-bottom: 0.7rem;
  }
</style>
