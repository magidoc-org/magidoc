<script type="ts">
  import type { GraphQLScalarType } from 'graphql'
  import MarkdownDescription from '../common/MarkdownDescription.svelte'

  export let type: GraphQLScalarType
</script>

<section>
  <h1>{type.name}</h1>

  <MarkdownDescription description={type.description} />
</section>
