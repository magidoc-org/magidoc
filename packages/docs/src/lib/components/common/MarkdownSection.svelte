<script lang="ts">
  import { Link } from 'carbon-components-svelte'
  import SvelteMarkdown from 'svelte-markdown'

  export let source: string
</script>

<SvelteMarkdown
  {source}
  renderers={{
    link: Link,
  }}
/>
