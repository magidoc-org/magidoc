<script lang="ts">
  import { SideNavMenu } from 'carbon-components-svelte'
  import SelectableNavMenuItem from '$lib/components/nav/SelectableNavMenuItem.svelte'
  import type { Page, TreeSection } from '$lib/pages'

  export let item: Page | TreeSection
</script>

{#if item.type === 'page'}
  <SelectableNavMenuItem href={item.href} text={item.name} />
{:else if item.type === 'tree'}
  <SideNavMenu text={item.name} expanded>
    {#each item.children as child}
      <svelte:self item={child} />
    {/each}
  </SideNavMenu>
{/if}
