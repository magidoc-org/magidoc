<script lang="ts">
  import AppMarkdownLink from './AppMarkdownLink.svelte'

  import { CarbonMarkdown } from '@magidoc/plugin-svelte-carbon-commons'
  import AppMarkdownHeading from './AppMarkdownHeading.svelte'

  export let source: string
</script>

<CarbonMarkdown
  {source}
  renderers={{
    link: AppMarkdownLink,
    heading: AppMarkdownHeading,
  }}
/>
