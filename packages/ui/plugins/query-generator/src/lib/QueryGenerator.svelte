<script lang="ts">
  import type { GraphQLField } from 'graphql'
  import CodeMirror from './CodeMirror.svelte'
  import { generateGraphQLQuery } from '@core/generator/queryGenerator'
  import type { GeneratorConfig } from '@core/generator/config'
  import type { GraphQLQuery } from '@core/models/query'

  export let field: GraphQLField<unknown, unknown, unknown>
  export let generatorConfig: Partial<GeneratorConfig> = {}
  export let theme = 'default'

  export let showQueryPanelLineNumbers = true
  export let showQueryPanel = true
  export let queryPanelHeight: number | 'auto' = 'auto'

  export let showVariablesPanelLineNumbers = false
  export let showVariablesPanel = true
  export let variablesPanelHeight: number | 'auto' = 'auto'

  const result: GraphQLQuery | null = generateGraphQLQuery(
    field,
    generatorConfig,
  )
</script>

{#if showQueryPanel}
  <CodeMirror
    {theme}
    code={result?.query || ''}
    height={queryPanelHeight}
    showLineNumbers={showQueryPanelLineNumbers}
    mode="graphql"
  />
{/if}

{#if showVariablesPanel}
  <div class="CodeMirror-gutters qg-variables-separator">Variables</div>
  <CodeMirror
    {theme}
    code={JSON.stringify(result?.variables || {}, null, 2)}
    height={variablesPanelHeight}
    showLineNumbers={showVariablesPanelLineNumbers}
    mode="graphql-variables"
  />
{/if}

<style>
  .qg-variables-separator {
    font-family: inherit;
    position: relative;
    padding: 5px 0px;
    font-family: inherit;
  }
</style>
