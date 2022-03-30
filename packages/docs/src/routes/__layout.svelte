<script lang="ts" context="module">
  export function load() {
    const allPagesPaths = import.meta.glob(
      '../../static/sections/**/*.markdown',
    )

    const pages = createPages(Object.keys(allPagesPaths))
    return {
      stuff: {
        pages,
      },
      props: {
        pages,
      },
    }
  }
</script>

<script lang="ts">
  import '../app.css'

  import { Content, Row, Grid, Column } from 'carbon-components-svelte'
  import AppHeader from '$lib/layout/AppHeader.svelte'
  import AppNavigation from '$lib/layout/nav/AppNavigation.svelte'
  import { type Pages, createPages } from '$lib/pages'

  let isSideNavOpen: boolean

  export let pages: Pages
</script>

<main>
  <AppHeader bind:isSideNavOpen />
  <AppNavigation isOpen={isSideNavOpen} {pages} />

  <Content>
    <Grid>
      <Row>
        <Column class="main-content">
          <slot {pages} />
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
