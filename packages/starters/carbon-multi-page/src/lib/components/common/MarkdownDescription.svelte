<script lang="ts">
  import { CarbonMarkdown } from '@magidoc/plugin-svelte-carbon-commons'

  export let description: string | undefined | null
</script>

{#if description}
  <CarbonMarkdown source={description} />
{/if}
