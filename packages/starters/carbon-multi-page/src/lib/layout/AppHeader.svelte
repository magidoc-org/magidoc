<script lang="ts">
  import 'carbon-components-svelte/css/all.css'

  import {
    Button,
    Header,
    HeaderSearch,
    HeaderUtilities,
  } from 'carbon-components-svelte'
  import AppIcon from '$lib/components/common/AppIcon.svelte'
  import { base } from '$app/paths'
  import AppLinks from './header/AppLinks.svelte'
  import { Search } from 'carbon-icons-svelte'
  import AppSearchResults from './header/AppSearchResults.svelte'

  export let isSideNavOpen = true
  export let searchOpen = false
</script>

<Header href={base || '/'} bind:isSideNavOpen expandedByDefault>
  <div slot="platform" class="header-logo-wrapper">
    <AppIcon class="header-logo" />
  </div>
  <HeaderUtilities>
    <Button icon={Search} on:click={() => (searchOpen = true)} />
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
</style>
