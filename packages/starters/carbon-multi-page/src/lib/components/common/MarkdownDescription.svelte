<script lang="ts">
  import { CarbonMarkdown } from '@magidoc/plugin-svelte-carbon-commons'
  import { base } from '$app/paths'
  
  export let description: string | undefined | null
</script>

{#if description}
  <CarbonMarkdown source={description} {base} />
{/if}
