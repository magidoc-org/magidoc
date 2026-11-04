<script lang="ts">
import type { GraphQLEnumType } from 'graphql'
import AnchorHeader from '../common/text/AnchorHeader.svelte'
import DirectivesList from '../directive/DirectivesList.svelte'
import AppMarkdown from '../markdown/AppMarkdown.svelte'
import DeprecatedTag from '../tags/DeprecatedTag.svelte'
import TypeTag from '../tags/TypeTag.svelte'

export let type: GraphQLEnumType
</script>

<section>
  <AnchorHeader id={"title"} depth={1}>
    {type.name}
    <TypeTag {type} />
    <DirectivesList directives={type.astNode?.directives} />
  </AnchorHeader>

  <AppMarkdown source={type.description} />

  <AnchorHeader id={"possible-values"} depth={2}>Possible Values</AnchorHeader>

  <ul class="divide-y divide-surface-200-800">
    {#each type.getValues() as value}
      <li class="py-3">
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="font-mono text-sm font-semibold" class:deprecated={!!value.deprecationReason}>{value.name}</span>
          <DeprecatedTag reason={value.deprecationReason} />
        </div>
        {#if value.description}
          <div class="mt-1 text-surface-700-300" class:deprecated={!!value.deprecationReason}>
            <AppMarkdown source={value.description} />
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</section>
