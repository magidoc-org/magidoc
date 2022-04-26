<script lang="ts">
  import { base } from '$app/paths'

  import { CarbonMarkdown } from '@magidoc/plugin-svelte-carbon-commons'
  import AppMarkdownHeading from './AppMarkdownHeading.svelte'

  export let source: string
</script>

<CarbonMarkdown
  {source}
  {base}
  renderers={{
    heading: AppMarkdownHeading,
  }}
/>
