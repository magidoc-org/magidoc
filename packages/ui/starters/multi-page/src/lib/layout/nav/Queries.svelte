<script lang="ts">
  import { schema } from '$lib/schema'

  import FieldsForRootType from './FieldsForRootType.svelte'
</script>

<FieldsForRootType
  type={$schema.getQueryType()}
  baseUrl="/model/queries"
  menuText="Queries"
/>
