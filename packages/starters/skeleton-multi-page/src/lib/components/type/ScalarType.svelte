<script lang="ts">
import type { GraphQLScalarType } from 'graphql'

import AnchorHeader from '../common/text/AnchorHeader.svelte'
import DirectivesList from '../directive/DirectivesList.svelte'
import AppMarkdown from '../markdown/AppMarkdown.svelte'
import TypeTag from '../tags/TypeTag.svelte'

export let type: GraphQLScalarType
</script>

<section>
  <AnchorHeader id={'title'} depth={1}>
    {type.name}
    <TypeTag {type} />
    <DirectivesList directives={type.astNode?.directives} />
  </AnchorHeader>

  <AppMarkdown source={type.description} />
</section>
