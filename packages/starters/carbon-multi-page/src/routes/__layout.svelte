<script lang="ts" context="module">
  export function load(): LoadOutput {
    const logo = templates.APP_LOGO.vite.getOrDefault(
      import.meta.env,
      DEFAULT_LOGO,
    )

    return {
      stuff: {
        homeUrl: homePageUrl,
        schema,
        content: pages,
      },
      props: {
        schema,
        content: pages,
        meta: generateMeta(
          {
            appTitle: appTitle,
            appIcon: logo,
          },
          templates.SITE_META.vite.get(import.meta.env) || {},
        ),
      },
    }
  }
</script>

<script lang="ts">
  import '../app.css'

  import { Content, Row, Grid, Column } from 'carbon-components-svelte'
  import AppHeader from '$lib/layout/AppHeader.svelte'
  import AppNavigation from '$lib/layout/nav/AppNavigation.svelte'
  import type { LoadOutput } from '@sveltejs/kit/types/internal'
  import { templates } from '@magidoc/plugin-starter-variables'
  import { appTitle, homePageUrl, pages } from '$lib/pages'
  import type { CustomContent } from 'src/app'
  import { generateMeta, type Meta } from '$lib/meta'
  import { DEFAULT_LOGO } from '$lib/logo'
  import { schema } from '$lib/model'

  let isSideNavOpen: boolean

  export let content: CustomContent[]
  export let meta: Meta[]
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
