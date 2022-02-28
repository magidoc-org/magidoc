<script lang="ts">
  import 'carbon-components-svelte/css/all.css'

  import {
    Header,
    HeaderGlobalAction,
    HeaderUtilities,
    Theme,
  } from 'carbon-components-svelte'
  import { Moon16, Sun16 } from 'carbon-icons-svelte'
  import type { AppTheme } from '$lib/theme'

  export let isSideNavOpen = true

  let theme: AppTheme = 'g10'
</script>

<Header href="/" bind:isSideNavOpen>
  <div slot="platform" class="header-logo-wrapper">
    <img src="/logo.png" alt="Magidoc" class="header-logo" />
    <span>Magidoc</span>
  </div>

  <HeaderUtilities>
    <Theme bind:theme persist persistKey="__carbon-theme" />
    <HeaderGlobalAction
      aria-label="Change Theme"
      icon={theme === 'g10' ? Sun16 : Moon16}
      on:click={() => {
        console.log(theme)
        if (theme === 'g10') {
          theme = 'g90'
        } else {
          theme = 'g10'
        }
      }}
    />
  </HeaderUtilities>
</Header>

<style>
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .header-logo {
    height: 100%;
    padding: 0.2rem 0.5rem 0.2rem 0rem;
  }
</style>
