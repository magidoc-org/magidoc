<script lang="ts">
  import 'carbon-components-svelte/css/all.css'

  import {
    Header,
    HeaderGlobalAction,
    HeaderUtilities,
    Search as SearchBar,
  } from 'carbon-components-svelte'
  import AppIcon from '$lib/components/common/AppIcon.svelte'
  import { base } from '$app/paths'
  import AppLinks from './header/AppLinks.svelte'
  import AppSearchResults from './header/AppSearch.svelte'
  import { appTitle } from '$lib/pages'
  import { Search } from 'carbon-icons-svelte'

  export let isSideNavOpen = true
  export let mobile = false

  let searchOpen = false
</script>

<Header href={base || '/'} bind:isSideNavOpen expandedByDefault>
  <div slot="platform" class="header-logo-wrapper">
    <AppIcon class="header-logo" />
  </div>
  <HeaderUtilities>
    {#if mobile}
      <HeaderGlobalAction
        icon={Search}
        label="Search"
        on:click={() => (searchOpen = true)}
      />
    {:else}
      <div class="search-bar-wrapper">
        <SearchBar
          placeholder={`Search ${appTitle}...`}
          autocomplete={'off'}
          size="sm"
          on:focus={() => (searchOpen = true)}
        />
      </div>
    {/if}
    <AppLinks />
  </HeaderUtilities>
</Header>

<AppSearchResults bind:open={searchOpen} />

<style>
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .header-logo-wrapper :global(.header-logo) {
    height: 100%;
    margin: 0.2rem 0.5rem 0.2rem 0rem;
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
