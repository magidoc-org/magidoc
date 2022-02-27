<script type="ts">
  import { generateTypeLink } from '$lib/schema'
  import { DataTable, TooltipIcon } from 'carbon-components-svelte'
  import { WarningFilled16 } from 'carbon-icons-svelte'

  import { GraphQLUnionType } from 'graphql'
  import _ from 'lodash'
  import MarkdownDescription from '../common/MarkdownDescription.svelte'

  export let type: GraphQLUnionType
</script>

<section>
  <h1>{type.name}</h1>
  <h4>Union</h4>
  <br />

  <MarkdownDescription description={type.description} />

  <br />

  <h4>Types</h4>
  Union of types {@html type.getTypes().map((item) => generateTypeLink(item)).join(', ')}
  <br />

</section>
