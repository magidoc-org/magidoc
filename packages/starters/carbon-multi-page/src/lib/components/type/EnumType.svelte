<script type="ts">
  import { AnchorHeader } from '@magidoc/plugin-svelte-carbon-commons'

  import {
    StructuredList,
    StructuredListBody,
    StructuredListCell,
    StructuredListRow,
  } from 'carbon-components-svelte'

  import type { GraphQLEnumType } from 'graphql'
  import AppMarkdown from '../common/AppMarkdown.svelte'
  import DeprecatedTag from '../tags/DeprecatedTag.svelte'
  import TypeTag from '../tags/TypeTag.svelte'

  export let type: GraphQLEnumType
</script>

<section>
  <AnchorHeader id={'title'} depth={1}>
    {type.name}
    <TypeTag {type} />
  </AnchorHeader>

  <AppMarkdown source={type.description} />

  <AnchorHeader id={'possible-values'} depth={2}>Possible Values</AnchorHeader>

  <StructuredList condensed>
    <StructuredListBody>
      {#each type.getValues() as value}
        <StructuredListRow>
          <StructuredListCell>
            <p>
              <span style="font-weight: bold">{value.name}</span>
              <DeprecatedTag reason={value.deprecationReason} />
            </p>
            {#if value.description}
              <p>{value.description}</p>
            {/if}
          </StructuredListCell>
        </StructuredListRow>
      {/each}
    </StructuredListBody>
  </StructuredList>
</section>
