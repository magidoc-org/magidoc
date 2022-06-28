<script type="ts">
  import { AnchorHeader } from '@magidoc/plugin-svelte-carbon-commons'

  import type { GraphQLUnionType } from 'graphql'

  import AppMarkdown from '../common/AppMarkdown.svelte'
  import TypeTag from '../tags/TypeTag.svelte'
  import TypeEnumeration from './list/TypeEnumeration.svelte'

  export let type: GraphQLUnionType
</script>

<section>
  <AnchorHeader id={'title'} depth={1}>
    {type.name}
    <TypeTag {type} />
  </AnchorHeader>

  <AppMarkdown source={type.description} />

  <AnchorHeader id={'types'} depth={2}>Types</AnchorHeader>

  <p>
    Union of types <TypeEnumeration types={type.getTypes()} />.
  </p>
</section>
