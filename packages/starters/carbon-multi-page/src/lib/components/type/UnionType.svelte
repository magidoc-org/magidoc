<script lang="ts">
import type { GraphQLUnionType } from 'graphql'
import AnchorHeader from '../common/text/AnchorHeader.svelte'
import CarbonMarkdown from '../markdown/CarbonMarkdown.svelte'

import DirectivesList from '../directive/DirectivesList.svelte'
import TypeTag from '../tags/TypeTag.svelte'
import TypeEnumeration from './list/TypeEnumeration.svelte'

export let type: GraphQLUnionType
</script>

<section>
  <AnchorHeader id={'title'} depth={1}>
    {type.name}
    <TypeTag {type} />
    <DirectivesList directives={type.astNode?.directives} />
  </AnchorHeader>

  <CarbonMarkdown source={type.description} />

  <AnchorHeader id={'types'} depth={2}>Types</AnchorHeader>

  <p>
    Union of types <TypeEnumeration types={type.getTypes()} />.
  </p>
</section>
