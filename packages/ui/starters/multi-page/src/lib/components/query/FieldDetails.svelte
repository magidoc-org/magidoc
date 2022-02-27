<script lang="ts">
  import { DataTable, TooltipIcon } from 'carbon-components-svelte'
  import type { GraphQLField } from 'graphql'
  import type { QueryType } from '@magidoc/core'
  import AppQueryGenerator from './AppQueryGenerator.svelte'
  import { generateTypeLink } from '$lib/schema'
  import WarningFilled16 from 'carbon-icons-svelte/lib/WarningFilled16'
  import DeprecationNotice from '../common/DeprecationNotice.svelte'
  import MarkdownDescription from '../common/MarkdownDescription.svelte'
  import _ from 'lodash'
  import ArgsTable from './table/ArgsTable.svelte'

  export let type: QueryType
  export let field: GraphQLField<unknown, unknown, unknown>
</script>

<section>
  <DeprecationNotice deprecationReason={field.deprecationReason} />

  <h1>{field.name}</h1>
  <h4>{_.capitalize(type.toLowerCase())}</h4>

  <br />

  <MarkdownDescription description={field.description} />

  <br />

  {#if field.args.length > 0}
    <h4>Arguments</h4>
    <ArgsTable data={field.args} />
  {/if}

  <br />

  {#if field.type}
    <h4>Response</h4>
    <p>
      Returns
      {@html generateTypeLink(field.type)}
    </p>
  {/if}

  <br />

  <h4>Example</h4>
  <AppQueryGenerator {type} {field} />
</section>
