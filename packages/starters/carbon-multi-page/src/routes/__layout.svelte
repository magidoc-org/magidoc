<script lang="ts" context="module">
  export function load({ url }: LoadInput): LoadOutput {
    console.log('url', url.pathname)
    return {
      stuff: {
        homeUrl: homePageUrl,
        schema,
        content: pages,
      },
      props: {
        schema,
        content: pages,
        meta: siteMeta,
      },
    }
  }
</script>

<script lang="ts">
  import '../app.css'

  import { Content, Row, Grid, Column } from 'carbon-components-svelte'
  import AppHeader from '$lib/layout/AppHeader.svelte'
  import AppNavigation from '$lib/layout/nav/AppNavigation.svelte'
  import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/internal'
  import type { CustomContent } from 'src/app'
  import { schema } from '$lib/model'
  import { siteMeta, type Meta } from '$lib/meta'
  import { homePageUrl, pages } from '$lib/pages'

  let isSideNavOpen: boolean

  export let content: CustomContent[]
  export let meta: ReadonlyArray<Meta>
</script>

<svelte:head>
  {#each meta as item}
    <meta name={item.name} content={item.content} />
  {/each}
</svelte:head>

<main>
  <AppHeader bind:isSideNavOpen />
  <AppNavigation isOpen={isSideNavOpen} {schema} {content} />

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
