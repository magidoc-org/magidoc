<script lang="ts">
import AppExpandButton from '$lib/components/common/AppExpandButton.svelte'
import FieldSignature from '$lib/components/common/text/FieldSignature.svelte'
import DirectivesList from '$lib/components/directive/DirectivesList.svelte'
import AppMarkdown from '$lib/components/markdown/AppMarkdown.svelte'
import ArgsList from '$lib/components/query/list/ArgsList.svelte'
import DeprecatedTag from '$lib/components/tags/DeprecatedTag.svelte'
import type { FieldWithPossibleDescriptions } from '$lib/model'
import LocationSpecificDescription from './LocationSpecificDescription.svelte'

export let item: FieldWithPossibleDescriptions
let showArguments = false
</script>

<li class="py-3">
  <div class="flex flex-wrap items-center gap-1.5">
    <FieldSignature name={item.field.name} type={item.field.type} deprecated={!!item.field.deprecationReason} />
    <DeprecatedTag reason={item.field.deprecationReason} />
    <DirectivesList directives={item.field.astNode?.directives} />
  </div>

  <div class="mt-1 text-surface-700-300">
    {#if item.possibleDescriptions.length === 1}
      <AppMarkdown source={item.possibleDescriptions[0].description} />
    {:else if item.possibleDescriptions.length > 1}
      {#each item.possibleDescriptions as current}
        <LocationSpecificDescription item={current} />
      {/each}
    {/if}
  </div>

  {#if item.field.args.length > 0}
    {#if showArguments}
      <div class="my-3 border-l-2 border-surface-300-700 pl-3">
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
</li>
