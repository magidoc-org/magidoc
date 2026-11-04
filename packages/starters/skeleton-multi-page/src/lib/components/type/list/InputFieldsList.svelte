<script lang="ts">
import type { GraphQLInputField } from 'graphql'
import _ from 'lodash'
import FieldSignature from '$lib/components/common/text/FieldSignature.svelte'
import AppMarkdown from '$lib/components/markdown/AppMarkdown.svelte'
import DeprecatedTag from '$lib/components/tags/DeprecatedTag.svelte'

export let data: ReadonlyArray<GraphQLInputField>

$: items =
  _.sortBy(
    data.map((arg) => ({
      id: arg.name,
      deprecationReason: arg.deprecationReason,
      name: arg.name,
      type: arg.type,
      description: arg.description,
      default: arg.defaultValue,
    })),
    (item) => item.name,
  ) || []
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
      </div>
      {#if item.description}
        <div class="mt-1 text-surface-700-300" class:deprecated={!!item.deprecationReason}>
          <AppMarkdown source={item.description} />
        </div>
      {/if}
    </li>
  {/each}
</ul>
