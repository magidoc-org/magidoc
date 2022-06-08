<script type="ts">
  import { AnchorHeader } from '@magidoc/plugin-svelte-carbon-commons'

  import type { GraphQLScalarType } from 'graphql'
  import AppMarkdown from '../common/AppMarkdown.svelte'
  import TypeTag from '../tags/TypeTag.svelte'

  export let type: GraphQLScalarType
</script>

<section>
  <AnchorHeader id={'title'} depth={1}>
    {type.name}
    <TypeTag {type} />
  </AnchorHeader>

  <AppMarkdown source={type.description} />
</section>
