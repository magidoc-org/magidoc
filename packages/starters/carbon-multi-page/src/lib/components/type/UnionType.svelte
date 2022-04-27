<script type="ts">
  import type { GraphQLUnionType } from 'graphql'

  import AppMarkdown from '../common/AppMarkdown.svelte'
  import TypeTag from '../tags/TypeTag.svelte'
  import TypeEnumeration from './list/TypeEnumeration.svelte'

  export let type: GraphQLUnionType
</script>

<section>
  <h1>{type.name} <TypeTag {type} /></h1>
  <br />

  <AppMarkdown source={type.description} />

  <br />

  <h2>Types</h2>
  Union of types <TypeEnumeration types={type.getTypes()} />
  <br />
</section>
