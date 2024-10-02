<script lang="ts">
import { StructuredList, StructuredListBody, StructuredListCell, StructuredListRow } from 'carbon-components-svelte'

import type { GraphQLEnumType } from 'graphql'
import AnchorHeader from '../common/text/AnchorHeader.svelte'
import DirectivesList from '../directive/DirectivesList.svelte'
import CarbonMarkdown from '../markdown/CarbonMarkdown.svelte'
import DeprecatedTag from '../tags/DeprecatedTag.svelte'
import TypeTag from '../tags/TypeTag.svelte'

export let type: GraphQLEnumType
</script>

<section>
  <AnchorHeader id={'title'} depth={1}>
    {type.name}
    <TypeTag {type} />
    <DirectivesList directives={type.astNode?.directives} />
  </AnchorHeader>

  <CarbonMarkdown source={type.description} />

  <AnchorHeader id={'possible-values'} depth={2}>Possible Values</AnchorHeader>

  <StructuredList condensed>
    <StructuredListBody>
      {#each type.getValues() as value}
        <StructuredListRow>
          <StructuredListCell class:deprecated={!!value.deprecationReason}>
            <p>
              <span style="font-weight: bold">{value.name}</span>
              <DeprecatedTag reason={value.deprecationReason} />
            </p>
            {#if value.description}
              <CarbonMarkdown source={value.description} />
            {/if}
          </StructuredListCell>
        </StructuredListRow>
      {/each}
    </StructuredListBody>
  </StructuredList>
</section>
