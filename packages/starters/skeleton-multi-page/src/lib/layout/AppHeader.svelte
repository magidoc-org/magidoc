<script lang="ts">
import { AppBar } from '@skeletonlabs/skeleton-svelte'
import { Close, Menu, Search } from 'carbon-icons-svelte'
import { onMount } from 'svelte'
import AppIcon from '#lib/components/common/AppIcon.svelte'
import { appTitle } from '#lib/pages'
import { resolve } from '$app/paths'
import AppSearch from './header/AppSearch.svelte'
import HeaderAppLinks from './header/HeaderAppLinks.svelte'
import ModeToggle from './header/ModeToggle.svelte'

export let isSideNavOpen = false

let searchOpen = false
let isMac = false

onMount(() => {
  isMac = navigator.userAgent.toUpperCase().includes('MAC')
})

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    searchOpen = true
  }
}
</script>

<svelte:window on:keydown={onKeydown} />

<AppBar class="sticky top-0 z-40 h-16 justify-center border-b border-surface-200-800 bg-surface-50-950/80 px-4 py-0 backdrop-blur">
  <AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
    <AppBar.Lead class="flex items-center gap-2">
      <button
        type="button"
        class="btn-icon hover:preset-tonal lg:hidden"
        aria-label={isSideNavOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isSideNavOpen}
        on:click={() => (isSideNavOpen = !isSideNavOpen)}
      >
        <svelte:component this={isSideNavOpen ? Close : Menu} size={20} />
      </button>
      <a href={resolve('/')} class="flex h-10 items-center [&_img]:h-full">
        <AppIcon />
      </a>
    </AppBar.Lead>
    <AppBar.Headline />
    <AppBar.Trail class="items-center">
      <button
        type="button"
        class="btn hidden w-64 justify-between preset-outlined-surface-200-800 text-surface-600-400 hover:preset-tonal md:flex"
        on:click={() => (searchOpen = true)}
      >
        <span class="flex min-w-0 items-center gap-2 text-sm">
          <Search size={16} />
          <span class="truncate">Search {appTitle}...</span>
        </span>
        <kbd class="kbd text-xs">{isMac ? '⌘' : 'Ctrl'} K</kbd>
      </button>
      <button
        type="button"
        class="btn-icon hover:preset-tonal md:hidden"
        aria-label="Search"
        on:click={() => (searchOpen = true)}
      >
        <Search size={20} />
      </button>
      <HeaderAppLinks />
      <ModeToggle />
    </AppBar.Trail>
  </AppBar.Toolbar>
</AppBar>

<AppSearch bind:open={searchOpen} />
