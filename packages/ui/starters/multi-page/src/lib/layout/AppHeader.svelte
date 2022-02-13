<script lang="ts">
  import { Header } from 'carbon-components-svelte'

  export let isSideNavOpen = true
</script>

<Header href="/" bind:isSideNavOpen>
  <div slot="platform" class="header-logo-wrapper">
    <img src="/logo.png" alt="Magidoc" class="header-logo" />
    <span>Magidoc</span>
  </div>
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
