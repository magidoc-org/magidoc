<script lang="ts">
  import { schema } from '$lib/schema'

  import FieldsForRootType from '../../components/nav/FieldsForRootType.svelte'
</script>

<FieldsForRootType
  type={$schema.getSubscriptionType()}
  baseUrl="/model/subscriptions"
  menuText="Subscriptions"
/>
