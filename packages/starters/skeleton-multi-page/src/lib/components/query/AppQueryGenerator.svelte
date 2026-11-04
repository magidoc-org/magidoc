<script lang="ts">
import Prism from '@magidoc/plugin-svelte-prismjs'
import 'prismjs/components/prism-graphql.js'
import 'prismjs/components/prism-json.js'

import { NullGenerationStrategy } from '@magidoc/plugin-query-generator'
import { Add, Checkmark, Copy, Rule, RuleFilled, Subtract } from 'carbon-icons-svelte'
import { graphqlQuery } from './stores'

export let code: string
export let language: 'graphql' | 'json'

let copied = false

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copied = true
    setTimeout(() => {
      copied = false
    }, 1500)
  } catch {}
}
</script>

<div class="flex gap-2">
  <div class="min-w-0 flex-1 overflow-hidden rounded-container">
    <Prism source={code} {language} maxHeight={'20rem'} minHeight={'12rem'} />
  </div>
  <div class="flex flex-col items-center gap-1">
    {#await $graphqlQuery then query}
      {#if query}
        {@const neverNull = query.nullGenerationStrategy === NullGenerationStrategy.NEVER_NULL}
        <button
          type="button"
          class="btn-icon btn-icon-sm hover:preset-tonal"
          title={copied ? 'Copied!' : 'Copy query'}
          aria-label={copied ? 'Copied!' : 'Copy query'}
          on:click={() => copy(code)}
        >
          <svelte:component this={copied ? Checkmark : Copy} size={16} />
        </button>
        <button
          type="button"
          class="btn-icon btn-icon-sm hover:preset-tonal"
          title={neverNull ? 'Never null fields' : 'Always null fields'}
          aria-label={neverNull ? 'Never null fields' : 'Always null fields'}
          on:click={() => graphqlQuery.toggleNullGenerationStrategy()}
        >
          <svelte:component this={neverNull ? RuleFilled : Rule} size={16} />
        </button>
        <button
          type="button"
          class="btn-icon btn-icon-sm hover:preset-tonal"
          title="Increase query depth"
          aria-label="Increase query depth"
          on:click={() => graphqlQuery.increaseDepth()}
        >
          <Add size={16} />
        </button>
        <span class="text-sm font-semibold">{query.depth}</span>
        <button
          type="button"
          class="btn-icon btn-icon-sm hover:preset-tonal"
          title="Decrease query depth"
          aria-label="Decrease query depth"
          on:click={() => graphqlQuery.decreaseDepth()}
        >
          <Subtract size={16} />
        </button>
      {/if}
    {/await}
  </div>
</div>
