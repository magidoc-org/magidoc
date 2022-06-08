<script type="ts">
  import { AnchorHeader } from '@magidoc/plugin-svelte-carbon-commons'

  import type { GraphQLInterfaceType } from 'graphql'
  import _ from 'lodash'
  import AppMarkdown from '../common/AppMarkdown.svelte'
  import TypeTag from '../tags/TypeTag.svelte'
  import FiedsTable from './list/FiedsList.svelte'
  import TypeEnumeration from './list/TypeEnumeration.svelte'

  export let type: GraphQLInterfaceType
</script>

<section>
  <AnchorHeader id={'title'} depth={1}>
    {type.name}
    <TypeTag {type} />
  </AnchorHeader>
  <AppMarkdown source={type.description} />

  {#if Object.keys(type.getFields()).length > 0}
    <AnchorHeader id={'fields'} depth={2}>Fields</AnchorHeader>
    <FiedsTable data={_.map(type.getFields(), (arg) => arg)} />
  {/if}

  {#if type.getInterfaces().length > 0}
    <AnchorHeader id={'interfaces'} depth={2}>Interfaces</AnchorHeader>
    <p>
      Also implements <TypeEnumeration types={type.getInterfaces()} />
    </p>
  {/if}
</section>
