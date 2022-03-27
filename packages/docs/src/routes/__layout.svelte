<script lang="ts">
  import { browser } from '$app/env'

  import '../app.css'

  import { Content, Row, Grid, Column } from 'carbon-components-svelte'
  import AppHeader from '$lib/layout/AppHeader.svelte'
  import AppNavigation from '$lib/layout/nav/AppNavigation.svelte'

  let isSideNavOpen: boolean
</script>

<main>
  <AppHeader bind:isSideNavOpen />
  <AppNavigation isOpen={isSideNavOpen} />

  <Content>
    <Grid>
      <Row>
        <Column>
          <!-- in dev mode, vite uses SSR, which doesn't work well with code-mirror -->
          {#if browser}
            <slot />
          {/if}
        </Column>
      </Row>
    </Grid>
  </Content>
</main>
