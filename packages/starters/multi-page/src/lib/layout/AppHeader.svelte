<script lang="ts">
  import 'carbon-components-svelte/css/all.css'

  import {
    Header,
    HeaderGlobalAction,
    HeaderUtilities,
    Theme,
  } from 'carbon-components-svelte'
  import Moon from 'carbon-icons-svelte/lib/Moon.svelte'
  import Sun from 'carbon-icons-svelte/lib/Sun.svelte'
  import { theme, themeValue } from '$lib/theme'
  import AppIcon from '$lib/components/common/AppIcon.svelte'

  export let isSideNavOpen = true
</script>

<Header href="/" bind:isSideNavOpen>
  <div slot="platform" class="header-logo-wrapper">
    <AppIcon class="header-logo" />
  </div>

  <HeaderUtilities>
    <Theme bind:theme={$themeValue} persist />
    <HeaderGlobalAction
      aria-label="Change Theme"
      icon={$theme.value === 'g10' ? Sun : Moon}
      on:click={() => $theme.toggle()}
    />
  </HeaderUtilities>
</Header>

<style>
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .header-logo-wrapper :global(.header-logo) {
    height: 100%;
    padding: 0.2rem 0.5rem 0.2rem 0rem;
  }
</style>
