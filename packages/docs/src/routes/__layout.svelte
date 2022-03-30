<script lang="ts">
  import '../app.css'

  import { Content, Row, Grid, Column } from 'carbon-components-svelte'
  import AppHeader from '$lib/layout/AppHeader.svelte'
  import AppNavigation from '$lib/layout/nav/AppNavigation.svelte'
  import { onMount } from 'svelte'
  import { pages, currentPage } from '$lib/pages'

  let isSideNavOpen: boolean

  const allPages = import.meta.glob('../../static/sections/**/*.markdown')

  onMount(() => {
    $pages.setPagesPaths(Object.keys(allPages))
  })
</script>

<svelte:head>
  <title>
    {$currentPage?.value?.name || 'Magidoc'}
  </title>
</svelte:head>

<main>
  <AppHeader bind:isSideNavOpen />
  <AppNavigation isOpen={isSideNavOpen} />

  <Content>
    <Grid>
      <Row>
        <Column class="main-content">
          <slot />
        </Column>
      </Row>
    </Grid>
  </Content>
</main>

<style global>
  .main-content p {
    margin-top: 0.5rem !important;
    margin-bottom: 0.8rem !important;
  }
</style>
