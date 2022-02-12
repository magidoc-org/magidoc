<script lang="ts">
  import type { GraphQLField } from 'graphql'
  import CodeMirror from './internal/CodeMirror.svelte'
  import { generateGraphQLQuery } from '@core/generator/queryGenerator'
  import type { GeneratorConfig } from '@core/generator/config'

  export let field: GraphQLField<any, any, any>
  export let generatorConfig: Partial<GeneratorConfig>
  export let theme: string = 'default'

  export let showQueryPanelLineNumbers: boolean = true
  export let showQueryPanel: boolean = true
  export let queryPanelHeight: number | 'auto' = 'auto'

  export let showVariablesPanelLineNumbers: boolean = false
  export let showVariablesPanel: boolean = true
  export let variablesPanelHeight: number | 'auto' = 'auto'

  const a = 'sdfs'

  const result = generateGraphQLQuery(field, generatorConfig)
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
    code={JSON.stringify(result.variables || {}, null, 2)}
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
