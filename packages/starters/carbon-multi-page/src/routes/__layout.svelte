<script lang="ts" context="module">
  export function load(): LoadOutput {
    return {
      stuff: {
        homeUrl: homePageUrl,
        schema,
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
  import '../prism-theme.css'

  import { Content, Row, Grid, Column } from 'carbon-components-svelte'
  import AppHeader from '$lib/layout/AppHeader.svelte'
  import AppNavigation from '$lib/layout/nav/AppNavigation.svelte'
  import type { LoadOutput } from '@sveltejs/kit'
  import { schema } from '$lib/model'
  import { siteMeta, type Meta } from '$lib/meta'
  import { homePageUrl, pages } from '$lib/pages'
  import { templates } from '@magidoc/plugin-starter-variables'
  import type { WebsiteContent } from 'src/app'
  import { get } from '$lib/variables'

  let isSideNavOpen: boolean

  export let content: WebsiteContent[]
  export let meta: ReadonlyArray<Meta>

  const favicon = get(templates.APP_FAVICON)

  if (import.meta.hot) {
    import.meta.hot.on('variables-changed', () => {
      window.location.reload()
    })
  }
</script>

<svelte:head>
  {#each meta as item}
    <meta name={item.name} content={item.content} />
  {/each}

  {#if favicon}
    <link rel="icon" href={favicon} />
  {/if}
</svelte:head>

<main>
  <AppHeader bind:isSideNavOpen />
  <AppNavigation isOpen={isSideNavOpen} {content} />

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
