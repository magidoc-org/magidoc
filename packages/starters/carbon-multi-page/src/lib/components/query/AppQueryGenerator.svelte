<script lang="ts">
import Prism from '@magidoc/plugin-svelte-prismjs'
import 'prismjs/components/prism-graphql.js'
import 'prismjs/components/prism-json.js'

import { NullGenerationStrategy } from '@magidoc/plugin-query-generator'
import { Button } from 'carbon-components-svelte'
import { Add, Copy, Rule, RuleFilled, Subtract } from 'carbon-icons-svelte'
import { graphqlQuery } from './stores'

export let code: string
export let language: 'graphql' | 'json'

let copyButtonText = 'Copy query'

const copy = async (text: string) => {
  try {
    copyButtonText = 'Copied!'
    await navigator.clipboard.writeText(text)
    setTimeout(() => {
      copyButtonText = 'Copy query'
    }, 1500)
  } catch (e) {
    console.error(e)
  }
}
</script>

<div class="wrapper">
  <div class="code-section">
    <Prism source={code} {language} maxHeight={'20rem'} minHeight={'12rem'} />
  </div>
  <div class="button-bar">
    {#await $graphqlQuery then query}
      {#if query}
        <Button
          kind="ghost"
          icon={Copy}
          iconDescription={copyButtonText}
          tooltipPosition="left"
          size="field"
          on:click={() => copy(code)}
        />
        <Button
          kind="ghost"
          icon={query.nullGenerationStrategy ===
          NullGenerationStrategy.NEVER_NULL
            ? RuleFilled
            : Rule}
          iconDescription={query.nullGenerationStrategy ===
          NullGenerationStrategy.NEVER_NULL
            ? 'Never null fields'
            : 'Always null fields'}
          tooltipPosition="left"
          size="field"
          on:click={() => graphqlQuery.toggleNullGenerationStrategy()}
        />
        <Button
          kind="ghost"
          icon={Add}
          iconDescription="Increase query depth"
          tooltipPosition="left"
          size="field"
          on:click={() => graphqlQuery.increaseDepth()}
        />
        <p style="text-align:center">
          {query.depth}
        </p>
        <Button
          kind="ghost"
          icon={Subtract}
          iconDescription="Decrease query depth"
          tooltipPosition="left"
          size="field"
          on:click={() => graphqlQuery.decreaseDepth()}
        />
      {/if}
    {/await}
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: flex-start;
  }

  .code-section {
    width: 100%;
    overflow: hidden;
  }

  .button-bar {
    display: flex;
    flex-direction: column;
  }
</style>
