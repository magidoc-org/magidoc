<script lang="ts">
  import { browser } from '$app/env'

  import '../app.css'

  import { Content, Row, Grid, Column } from 'carbon-components-svelte'
  import AppHeader from '$lib/layout/AppHeader.svelte'
  import AppNavigation from '$lib/layout/nav/AppNavigation.svelte'
  import { page } from '$app/stores'
  import { capitalize } from '$lib/utils/strings'

  let isSideNavOpen: boolean
</script>

<svelte:head>
  <title>
    {
      $page.url.pathname.substring($page.url.pathname.lastIndexOf('/') + 1).split('-').map((part) => capitalize(part)).join(' ')
    }
  </title>
</svelte:head>

<main>
  <AppHeader bind:isSideNavOpen />
  <AppNavigation isOpen={isSideNavOpen} />

  <Content>
    <Grid>
      <Row>
        <Column class="content">
          <slot />
        </Column>
      </Row>
    </Grid>
  </Content>
</main>

<style global>
  .content p {
    margin-top: 0.5rem !important;
    margin-bottom: 0.8rem !important;
  }
</style>