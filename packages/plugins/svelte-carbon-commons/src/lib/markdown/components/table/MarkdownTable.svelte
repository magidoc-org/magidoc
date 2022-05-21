<script lang="ts">
  import { StructuredList } from 'carbon-components-svelte'
</script>

{JSON.stringify($$props)}

<StructuredList>
  <slot />
</StructuredList>
