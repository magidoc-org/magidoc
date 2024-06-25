<script lang="ts">
import 'carbon-components-svelte/css/all.css'
import { browser } from '$app/environment'
import { base } from '$app/paths'
import AppIcon from '$lib/components/common/AppIcon.svelte'
import { appTitle } from '$lib/pages'
import { Header, HeaderGlobalAction, HeaderUtilities, Search as SearchBar } from 'carbon-components-svelte'
import { Search } from 'carbon-icons-svelte'
import { onDestroy, onMount } from 'svelte'
import AppSearchResults from './header/AppSearch.svelte'
import HeaderAppLinks from './header/HeaderAppLinks.svelte'
import NavbarAppLinks from './header/NavbarAppLinks.svelte'

export let isSideNavOpen = true
export let mobile = false

let searchOpen = false
let isMac = false

let handler: (e: KeyboardEvent) => void = (e) => {
  if (e.metaKey || e.ctrlKey) {
    if (e.key === 'k') {
      e.preventDefault()
      searchOpen = true
    }
  } else if (e.key === 'Escape') {
    searchOpen = false
  }
}
onMount(() => {
  if (browser) {
    isMac = navigator?.userAgent?.toUpperCase()?.indexOf('MAC') >= 0
    window.addEventListener('keydown', handler)
  }
})

onDestroy(() => {
  if (browser) {
    window.removeEventListener('keydown', handler)
  }
})
</script>

<Header href={base || '/'} bind:isSideNavOpen expandedByDefault>
  <div slot="platform" class="header-logo-wrapper">
    <AppIcon />
  </div>
  <HeaderUtilities>
    {#if mobile}
      <HeaderGlobalAction
        icon={Search}
        iconDescription="Search"
        on:click={() => (searchOpen = true)}
      />
    {:else}
      <div class="search-bar-wrapper">
        <SearchBar
          placeholder={`Search ${appTitle}... (${isMac ? '⌘' : 'Ctrl'}+K)`}
          autocomplete={'off'}
          size="sm"
          on:focus={() => (searchOpen = true)}
        />
      </div>
    {/if}
    <HeaderAppLinks />
    <NavbarAppLinks />
  </HeaderUtilities>
</Header>

<AppSearchResults bind:open={searchOpen} />

<style>
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .header-logo-wrapper :global(img) {
    height: 100%;
    margin: 0.2rem 0.2rem 0.2rem 0rem;
  }

  .search-bar-wrapper {
    width: 16rem;
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }

  .search-bar-wrapper :global(input) {
    border-radius: 1rem;
  }
</style>
