<script lang="ts">
  import { CarbonMarkdown } from '@magidoc/plugin-svelte-carbon-commons'
  import { base } from '$app/paths'

  export let source: string | undefined | null
</script>

{#if source}
  <CarbonMarkdown {source} {base} />
{/if}
