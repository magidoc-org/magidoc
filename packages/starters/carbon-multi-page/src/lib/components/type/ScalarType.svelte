<script lang="ts">
  import type { GraphQLScalarType } from 'graphql'

  import AnchorHeader from '../common/text/AnchorHeader.svelte'
  import CarbonMarkdown from '../markdown/CarbonMarkdown.svelte'
  import TypeTag from '../tags/TypeTag.svelte'

  export let type: GraphQLScalarType
</script>

<section>
  <AnchorHeader id={'title'} depth={1}>
    {type.name}
    <TypeTag {type} />
  </AnchorHeader>

  <CarbonMarkdown source={type.description} />
</section>
