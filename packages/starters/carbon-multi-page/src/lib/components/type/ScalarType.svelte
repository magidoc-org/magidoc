<script type="ts">
  import type { GraphQLScalarType } from 'graphql'
  import MarkdownDescription from '../common/MarkdownDescription.svelte'
  import TypeTag from '../tags/TypeTag.svelte'

  export let type: GraphQLScalarType
</script>

<section>
  <h1>{type.name} <TypeTag {type} /></h1>
  <br />

  <MarkdownDescription description={type.description} />
</section>
