<script lang="ts">
  import { CarbonMarkdown } from '@magidoc/plugin-svelte-carbon-commons'
  import 'prismjs/components/prism-graphql.js'
  import 'prismjs/components/prism-json.js'
  import 'prismjs/components/prism-javascript.js'
  import 'prismjs/components/prism-typescript.js'
  import 'prismjs/components/prism-python.js'
  import 'prismjs/components/prism-yaml.js'
  import 'prismjs/components/prism-bash.js'

  import { base } from '$app/paths'

  export let source: string | undefined | null
</script>

{#if source}
  <CarbonMarkdown
    {source}
    options={{
      baseUrl: base,
    }}
  />
{/if}
