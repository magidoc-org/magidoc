<script lang="ts">
  import { schema } from '$lib/schema'

  import FieldsForRootType from '../../components/nav/FieldsForRootType.svelte'
</script>

<FieldsForRootType
  type={$schema.getMutationType()}
  baseUrl="/model/mutations"
  menuText="Mutations"
/>
