<script lang="ts" context="module">
  export function load(): LoadOutput {
    return {
      stuff: {
        homeUrl: homePageUrl,
      },
      props: {
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
  import { siteMeta, type Meta } from '$lib/meta'
  import { appTitle, homePageUrl, pages } from '$lib/pages'
  import { templates } from '@magidoc/plugin-starter-variables'
  import type { WebsiteContent } from 'src/app'
  import { get } from '$lib/variables'
  import { page } from '$app/stores'
  import { onDestroy } from 'svelte'

  let isSideNavOpen = false
  let innerWidth = 2048

  export let content: WebsiteContent[]
  export let meta: ReadonlyArray<Meta>

  const favicon = get(templates.APP_FAVICON)

  const unsubscribe = page.subscribe(() => {
    // Mobile
    if (innerWidth < 1056) {
      isSideNavOpen = false
    }
  })

  onDestroy(unsubscribe)

  if (import.meta.hot) {
    import.meta.hot.on('variables-changed', () => {
      window.location.reload()
    })
  }
</script>

<svelte:head>
  <title>{appTitle}</title>

  {#each meta as item}
    <meta name={item.name} content={item.content} />
  {/each}

  {#if favicon}
    <link rel="icon" href={favicon} />
  {/if}
</svelte:head>

<svelte:window bind:innerWidth />

<AppHeader bind:isSideNavOpen />
<AppNavigation bind:isOpen={isSideNavOpen} {content} />

<Content>
  <Grid>
    <Row>
      <Column>
        <slot />
      </Column>
    </Row>
  </Grid>
</Content>
