<script lang="ts" context="module">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/internal'

  export function load({ stuff }: LoadInput): LoadOutput {
    return {
      props: {
        type: stuff.schema?.getQueryType(),
      },
    }
  }
</script>

<script lang="ts">
  import FieldsForRootType from '../../components/nav/FieldsForRootType.svelte'

  import type { GraphQLObjectType } from 'graphql'

  export let type: GraphQLObjectType | undefined | null
</script>

<FieldsForRootType {type} baseUrl="/model/mutations" menuText="Mutations" />
