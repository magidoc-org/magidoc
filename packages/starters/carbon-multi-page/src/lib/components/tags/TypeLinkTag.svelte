<script lang="ts">
  import { Tag } from 'carbon-components-svelte'
  import type { GraphQLType } from 'graphql'
  import TypeLink from '../type/TypeLink.svelte'

  export let type: GraphQLType
</script>

<Tag type="blue"><TypeLink {type} /></Tag>
