<script lang="ts" context="module">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/internal'

  export function load({ stuff }: LoadInput): LoadOutput {
    return {
      props: {
        type: stuff.schema?.getSubscriptionType(),
      },
    }
  }
</script>

<script lang="ts">
  import type { GraphQLObjectType } from 'graphql'

  import FieldsForRootType from '../../components/nav/FieldsForRootType.svelte'

  export let type: GraphQLObjectType | undefined | null
</script>

<FieldsForRootType
  {type}
  baseUrl="/model/subscriptions"
  menuText="Subscriptions"
/>
