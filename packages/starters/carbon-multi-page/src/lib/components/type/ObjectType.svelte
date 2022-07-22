<script type="ts">
  import type { GraphQLObjectType } from 'graphql'
  import _ from 'lodash'
  import AnchorHeader from '../common/text/AnchorHeader.svelte'
  import CarbonMarkdown from '../markdown/CarbonMarkdown.svelte'
  import TypeTag from '../tags/TypeTag.svelte'
  import FiedsTable from './list/FiedsList.svelte'
  import InterfaceList from './list/TypeEnumeration.svelte'

  export let type: GraphQLObjectType
</script>

<section>
  <AnchorHeader id={'title'} depth={1}>
    {type.name}
    <TypeTag {type} />
  </AnchorHeader>

  <CarbonMarkdown source={type.description} />

  {#if Object.keys(type.getFields()).length > 0}
    <AnchorHeader id={'fields'} depth={2}>Fields</AnchorHeader>

    <FiedsTable data={_.map(type.getFields(), (item) => item)} />
  {/if}

  {#if type.getInterfaces().length > 0}
    <AnchorHeader id={'interfaces'} depth={2}>Interfaces</AnchorHeader>

    <p>
      Also implements <InterfaceList types={type.getInterfaces()} />.
    </p>
  {/if}
</section>
