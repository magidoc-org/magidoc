<script lang="ts">
  import { GraphQLSchema, GraphQLField } from 'graphql'
  import CodeMirror from './internal/CodeMirror.svelte'
  import { generateGraphQLQuery } from '@core/generator/queryGenerator'

  export let schema: GraphQLSchema
  export let field: GraphQLField<any, any, any>
  export let generatorConfig: Maybe<Partial<GeneratorConfig>>
  export let theme: string = 'default'

  export let showQueryPanelLineNumbers: boolean = true
  export let showQueryPanel: boolean = true
  export let queryPanelHeight: number | 'auto' = 'auto'

  export let showVariablesPanelLineNumbers: boolean = false
  export let showVariablesPanel: boolean = true
  export let variablesPanelHeight: number | 'auto' = 'auto'

  const result = generateGraphQLQuery(this.field, this.generatorConfig)
</script>

<div>
  {#if showQueryPanel}
    <CodeMirror
      {theme}
      code={result.query || ''}
      height={queryPanelHeight}
      showLineNumbers={showQueryPanelLineNumbers}
      mode="graphql"
    />
  {/if}
  />

  {#if showVariablesPanel}
    <div>
      <div class="CodeMirror-gutters qg-variables-separator">Variables</div>
      <CodeMirror
        {theme}
        code={JSON.stringify(result.variables || {}, null, 2)}
        height={queryPanelHeight}
        showLineNumbers={showQueryPanelLineNumbers}
        mode="graphql-variables"
      />
    </div>
  {/if}
</div>
