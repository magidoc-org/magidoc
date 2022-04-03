<script lang="ts">
import { StructuredListCell } from "carbon-components-svelte";

export let header: boolean
</script>

<StructuredListCell head={header}>
    <slot />
</StructuredListCell>