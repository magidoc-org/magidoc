<script lang="ts">
  import 'carbon-components-svelte/css/g10.css'
  import { base } from '$app/paths'

  import {
    Header,
    HeaderGlobalAction,
    HeaderUtilities,
    Theme,
  } from 'carbon-components-svelte'
  import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte'

  export let isSideNavOpen = true
</script>

<Header href={`${base}/`} bind:isSideNavOpen>
  <div slot="platform" class="header-logo-wrapper">
    <img
      src="https://github.com/magidoc-org/magidoc/blob/main/logo/logo_horizontal.png?raw=true"
      alt="Magidoc"
      class="header-logo"
    />
  </div>

  <HeaderUtilities>
    <Theme theme={'g10'} persist />
    <a href="https://github.com/magidoc-org/magidoc" target="_blank">
      <HeaderGlobalAction aria-label="Github" icon={LogoGithub} />
    </a>
  </HeaderUtilities>
</Header>

<style>
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0.2rem 0;
  }

  .header-logo {
    height: 100%;
    padding: 0.2rem 0.5rem 0.2rem 0rem;
  }
</style>
