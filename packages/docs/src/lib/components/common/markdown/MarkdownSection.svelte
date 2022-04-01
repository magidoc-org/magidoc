<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'
  import MarkdownCode from './MarkdownCode.svelte'
  import MarkdownLink from './MarkdownLink.svelte'

  export let source: string
</script>

<SvelteMarkdown
  {source}
  renderers={{
    link: MarkdownLink,
    code: MarkdownCode,
  }}
/>
