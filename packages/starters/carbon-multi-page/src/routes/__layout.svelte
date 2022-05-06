<script lang="ts" context="module">
  export function load(): LoadOutput {
    const schema = buildClientSchema(
      schemaJson as unknown as IntrospectionQuery,
    )

    const title = templates.APP_TITLE.vite.getOrDefault(
      import.meta.env,
      'Magidoc',
    )

    const pages = formatPages(
      base,
      templates.PAGES.vite.getOrDefault(
        import.meta.env,
        getDefaultPages(title),
      ),
    )

    const logo = templates.APP_LOGO.vite.getOrDefault(
      import.meta.env,
      DEFAULT_LOGO,
    )

    return {
      stuff: {
        homeUrl: getHomePageUrl(base, pages, schema),
        schema,
        content: pages,
      },
      props: {
        schema,
        content: pages,
        meta: generateMeta({
          appTitle: title,
          appIcon: logo,
        }),
      },
    }
  }
</script>

<script lang="ts">
  import '../app.css'

  import {
    buildClientSchema,
    GraphQLSchema,
    type IntrospectionQuery,
  } from 'graphql'
  import { Content, Row, Grid, Column } from 'carbon-components-svelte'
  import AppHeader from '$lib/layout/AppHeader.svelte'
  import AppNavigation from '$lib/layout/nav/AppNavigation.svelte'
  import type { LoadOutput } from '@sveltejs/kit/types/internal'
  import schemaJson from '../_schema.json'
  import { templates } from '@magidoc/plugin-starter-variables'
  import { formatPages, getDefaultPages, getHomePageUrl } from '$lib/pages'
  import type { CustomContent } from 'src/app'
  import { base } from '$app/paths'
  import { generateMeta, type Meta } from '$lib/meta'
  import { DEFAULT_LOGO } from '$lib/logo'

  let isSideNavOpen: boolean

  export let schema: GraphQLSchema
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
