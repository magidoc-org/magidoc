<script lang="ts">
  import '../app.css'
  
  import {
    Content,
    Header,
    SideNav,
    SideNavDivider,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    Row,
    Grid,
    Column,
  } from 'carbon-components-svelte'
  import 'carbon-components-svelte/css/g10.css'

  let isSideNavOpen = true
</script>

<main>
  <Header href="/" bind:isSideNavOpen>
    <div slot="platform" class="header-logo-wrapper">
      <img src="/logo.png" alt="Magidoc" class="header-logo" />
      <span>Magidoc</span>
    </div>
  </Header>

  <SideNav isOpen={isSideNavOpen}>
    <SideNavItems>
      <SideNavMenu text="Introduction" expanded>
        <SideNavMenuItem href="/introduction/welcome" text="Welcome" />
        <SideNavMenuItem href="/" text="Link 2" />
        <SideNavMenuItem href="/" text="Link 3" />
      </SideNavMenu>
      <SideNavLink text="Link 1" />
      <SideNavLink text="Link 2" />
      <SideNavLink text="Link 3" />
      <SideNavMenu text="Menu">
        <SideNavMenuItem href="/" text="Link 1" />
        <SideNavMenuItem href="/" text="Link 2" />
        <SideNavMenuItem href="/" text="Link 3" />
      </SideNavMenu>
      <SideNavDivider />
      <SideNavLink text="Link 4" />
    </SideNavItems>
  </SideNav>

  <Content>
    <Grid>
      <Row>
        <Column>
          <slot />
        </Column>
      </Row>
    </Grid>
  </Content>
</main>

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
