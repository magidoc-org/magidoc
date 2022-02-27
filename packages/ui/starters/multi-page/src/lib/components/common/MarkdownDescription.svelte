<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'

  export let description: string | undefined | null
</script>

{#if description}
  <SvelteMarkdown source={description} />
{/if}
