<script lang="ts">
import { templates } from '@magidoc/plugin-starter-variables'
import type { GraphQLArgument } from 'graphql'
import _ from 'lodash'
import FieldSignature from '$lib/components/common/text/FieldSignature.svelte'
import DirectivesList from '$lib/components/directive/DirectivesList.svelte'
import AppMarkdown from '$lib/components/markdown/AppMarkdown.svelte'
import DeprecatedTag from '$lib/components/tags/DeprecatedTag.svelte'
import DirectiveTag from '$lib/components/tags/DirectiveTag.svelte'
import { getOrDefault } from '$lib/variables'

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
    directives: arg.astNode?.directives || [],
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

<ul class="divide-y divide-surface-200-800">
  {#each items as item}
    <li class="py-3">
      <div class="flex flex-wrap items-center gap-1.5">
        <FieldSignature
          name={item.name}
          type={item.type}
          deprecated={!!item.deprecationReason}
          defaultValue={item.default}
        />
        <DeprecatedTag reason={item.deprecationReason} />
        <DirectivesList directives={item.directives} />
      </div>
      {#if item.description}
        <div class="mt-1 text-surface-700-300" class:deprecated={!!item.deprecationReason}>
          <AppMarkdown source={item.description} />
        </div>
      {/if}
    </li>
  {/each}
</ul>
