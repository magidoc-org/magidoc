<script type="ts">
  import {
    getFieldsPossibleDescriptions,
    type FieldWithPossibleDescription,
  } from '$lib/model'

  import type { GraphQLObjectType } from 'graphql'
  import AnchorHeader from '../common/text/AnchorHeader.svelte'
  import ObjectTypeDescription from '../common/text/ObjectTypeDescription.svelte'
  import TypeTag from '../tags/TypeTag.svelte'
  import FiedsTable from './list/FiedsList.svelte'
  import InterfaceList from './list/TypeEnumeration.svelte'

  export let type: GraphQLObjectType

  let fields: ReadonlyArray<FieldWithPossibleDescription>
  $: fields = getFieldsPossibleDescriptions(type)
</script>

<section>
  <AnchorHeader id={'title'} depth={1}>
    {type.name}
    <TypeTag {type} />
  </AnchorHeader>

  <ObjectTypeDescription {type} />

  {#if fields.length > 0}
    <AnchorHeader id={'fields'} depth={2}>Fields</AnchorHeader>

    <FiedsTable data={fields} />
  {/if}

  {#if type.getInterfaces().length > 0}
    <AnchorHeader id={'interfaces'} depth={2}>Interfaces</AnchorHeader>

    <p>
      Also implements <InterfaceList types={type.getInterfaces()} />.
    </p>
  {/if}
</section>
