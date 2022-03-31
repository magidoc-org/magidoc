<script lang="ts">
  import { Link } from 'carbon-components-svelte'
  import SvelteMarkdown from 'svelte-markdown'
  import MarkdownCode from './MarkdownCode.svelte'

  export let source: string
</script>

<SvelteMarkdown
  {source}
  renderers={{
    link: Link,
    code: MarkdownCode,
  }}
/>
