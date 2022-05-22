<script lang="ts">
  import { base } from '$app/paths'

  import { CarbonMarkdown } from '@magidoc/plugin-svelte-carbon-commons'

  export let source: string
</script>

<CarbonMarkdown {source} {base} />
