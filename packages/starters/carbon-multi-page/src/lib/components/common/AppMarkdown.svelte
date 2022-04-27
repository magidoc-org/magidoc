<script lang="ts">
  import { CarbonMarkdown } from '@magidoc/plugin-svelte-carbon-commons'
  import 'prismjs/components/prism-graphql.js'
  import 'prismjs/components/prism-json.js'
  import 'prismjs/components/prism-javascript.js'

  import { base } from '$app/paths'

  export let source: string | undefined | null
</script>

{#if source}
  <CarbonMarkdown {source} {base} />
{/if}
