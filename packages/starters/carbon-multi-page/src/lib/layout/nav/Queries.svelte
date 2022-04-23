<script lang="ts">
  import FieldsForRootType from '../../components/nav/FieldsForRootType.svelte'
  import type { GraphQLObjectType } from 'graphql'

  export let type: GraphQLObjectType | undefined | null
</script>

<FieldsForRootType {type} baseUrl="/model/queries" menuText="Queries" />
