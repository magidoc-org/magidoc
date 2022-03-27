<script type="ts">
  import {
    StructuredList,
    StructuredListBody,
    StructuredListCell,
    StructuredListRow,
  } from 'carbon-components-svelte'

  import type { GraphQLEnumType } from 'graphql'
  import MarkdownDescription from '../common/MarkdownDescription.svelte'
  import DeprecatedTag from '../tags/DeprecatedTag.svelte'
  import TypeTag from '../tags/TypeTag.svelte'

  export let type: GraphQLEnumType
</script>

<section>
  <h1>{type.name} <TypeTag {type} /></h1>
  <br />

  <MarkdownDescription description={type.description} />

  <br />

  <h2>Possible Values</h2>

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
