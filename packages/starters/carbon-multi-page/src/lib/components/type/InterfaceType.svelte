<script lang="ts">
  import {
    getFieldsPossibleDescriptions,
    schema,
    type FieldWithPossibleDescriptions,
  } from '$lib/model'

  import type { GraphQLInterfaceType, GraphQLObjectType } from 'graphql'
  import AnchorHeader from '../common/text/AnchorHeader.svelte'
  import CarbonMarkdown from '../markdown/CarbonMarkdown.svelte'
  import TypeTag from '../tags/TypeTag.svelte'
  import FiedsTable from './list/FiedsList.svelte'
  import TypeEnumeration from './list/TypeEnumeration.svelte'

  export let type: GraphQLInterfaceType

  let implementations: ReadonlyArray<GraphQLObjectType>
  $: implementations = schema.getPossibleTypes(type)

  let fields: ReadonlyArray<FieldWithPossibleDescriptions>
  $: fields = getFieldsPossibleDescriptions(type)
</script>

<section>
  <AnchorHeader id={'title'} depth={1}>
    {type.name}
    <TypeTag {type} />
  </AnchorHeader>

  <CarbonMarkdown source={type.description} />

  {#if Object.keys(type.getFields()).length > 0}
    <AnchorHeader id={'fields'} depth={2}>Fields</AnchorHeader>
    <FiedsTable data={fields} />
  {/if}

  {#if implementations.length > 0}
    <AnchorHeader id={'implementations'} depth={2}>
      Implementations
    </AnchorHeader>
    Implemented by <TypeEnumeration types={implementations} />.
  {/if}

  {#if type.getInterfaces().length > 0}
    <AnchorHeader id={'interfaces'} depth={2}>Interfaces</AnchorHeader>
    <p>
      Also implements <TypeEnumeration types={type.getInterfaces()} />.
    </p>
  {/if}
</section>
