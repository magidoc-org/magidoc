<script lang="ts">
import type { Menu, Page, PageTree } from '@magidoc/plugin-starter-common'
import { Navigation } from '@skeletonlabs/skeleton-svelte'
import { ChevronDown } from 'carbon-icons-svelte'
import { onMount, tick } from 'svelte'
import { afterNavigate } from '$app/navigation'
import { page } from '$app/stores'
import AppPageNavigation from './AppPageNavigation.svelte'
import NavigationLinks from './NavigationLinks.svelte'

export let isOpen = false
export let content: ReadonlyArray<PageTree>

const collapseAbove = 15

let filter = ''
let navigation: HTMLElement
let mounted = false
onMount(() => (mounted = true))

const menus = content.filter((item): item is Menu => item.type !== 'page')

let openSections: Record<string, boolean> = Object.fromEntries(
  menus.map((menu) => [menu.title, menu.children.length <= collapseAbove]),
)

$: currentMenu = menus.find((menu) =>
  menu.children.some((child) => child.type === 'page' && child.href === $page.url.pathname),
)
$: if (currentMenu) openSections[currentMenu.title] = true

$: query = filter.trim().toLowerCase()

function matchingPages(items: ReadonlyArray<PageTree>, query: string): Page[] {
  return items.filter((item): item is Page => item.type === 'page' && item.title.toLowerCase().includes(query))
}

afterNavigate(async () => {
  await tick()
  navigation?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest' })
})
</script>

{#if isOpen}
  <button
    type="button"
    class="fixed inset-0 top-16 z-20 bg-surface-50-950/60 lg:hidden"
    aria-label="Close navigation"
    on:click={() => (isOpen = false)}
  ></button>
{/if}

<aside
  bind:this={navigation}
  class="fixed top-16 left-0 z-30 flex h-[calc(100dvh-4rem)] flex-col border-r border-surface-200-800 bg-surface-50-950 lg:sticky lg:flex"
  class:hidden={!isOpen}
>
  <div class="px-4 pt-4 pb-2">
    <input class="input text-sm" type="search" placeholder="Filter..." aria-label="Filter navigation" bind:value={filter} />
  </div>

  <Navigation layout="sidebar" class="h-auto min-h-0 flex-1 bg-transparent pt-2">
    <Navigation.Content>
      {#each content as item}
        {#if item.type === 'page'}
          {#if matchingPages([item], query).length > 0}
            <Navigation.Menu>
              <AppPageNavigation {item} />
            </Navigation.Menu>
          {/if}
        {:else}
          {@const pages = matchingPages(item.children, query)}
          {#if pages.length > 0}
            <details
              class="group w-full"
              open={query ? true : openSections[item.title]}
              on:toggle={(event) => {
                if (!query) openSections[item.title] = event.currentTarget.open
              }}
            >
              <summary
                class="flex cursor-pointer list-none items-center justify-between rounded-base px-2 py-1.5 text-xs font-semibold tracking-wide text-surface-700-300 uppercase hover:preset-tonal [&::-webkit-details-marker]:hidden"
              >
                {item.title}
                <ChevronDown size={16} class="transition-transform group-open:rotate-180" />
              </summary>
              {#if mounted ? query || openSections[item.title] : item.children.length <= collapseAbove}
                <Navigation.Menu class="mt-1 gap-0.5">
                  {#each pages as subItem}
                    <AppPageNavigation item={subItem} />
                  {/each}
                </Navigation.Menu>
              {/if}
            </details>
          {/if}
        {/if}
      {/each}

      {#if query && content.every((item) => matchingPages(item.type === 'page' ? [item] : item.children, query).length === 0)}
        <p class="px-2 text-sm text-surface-600-400">No pages match “{filter.trim()}”.</p>
      {/if}

      <NavigationLinks />
    </Navigation.Content>
  </Navigation>
</aside>
