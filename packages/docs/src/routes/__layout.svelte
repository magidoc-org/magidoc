<script lang="ts" context="module">
  export function load() {
    const allPagesPaths = import.meta.glob('../lib/sections/**/*.md')
    const pages = createPages(
      Object.keys(allPagesPaths).map((slug) => ({
        path: slug,
        // This is the ugly thing that makes it all possible.
        // With vite, import.meta.glob returns a dictionary of { path: function }, where the function performs the actual import
        // Since we use rollup-plugin-string to convert markdown to string modules, we can then access then content
        contentFetcher: async () =>
          ((await allPagesPaths[slug]()) as unknown as { default: string })
            .default,
      })),
    )

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
