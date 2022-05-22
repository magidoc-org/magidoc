<script type="ts">
  import type { GraphQLScalarType } from 'graphql'
  import AppMarkdown from '../common/AppMarkdown.svelte'
  import TypeTag from '../tags/TypeTag.svelte'

  export let type: GraphQLScalarType
</script>

<section>
  <h1>{type.name} <TypeTag {type} /></h1>

  <AppMarkdown source={type.description} />
</section>
