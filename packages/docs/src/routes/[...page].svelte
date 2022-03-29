<script lang="ts">
  import { pages } from '$lib/pages'
  import { onMount } from 'svelte'

  const allPages = import.meta.glob('../../static/sections/**/*.markdown')

  onMount(() => {
    $pages.setPagesPaths(Object.keys(allPages))
  })
</script>

{#each $pages.tree as item}
     {item.name}
{/each}