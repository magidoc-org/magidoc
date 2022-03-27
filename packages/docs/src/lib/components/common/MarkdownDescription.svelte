<script lang="ts">
  import { Link } from 'carbon-components-svelte'
  import SvelteMarkdown from 'svelte-markdown'

  export let description: string | undefined | null
</script>

{#if description}
  <SvelteMarkdown
    source={description}
    renderers={{
      link: Link,
    }}
  />
{/if}
