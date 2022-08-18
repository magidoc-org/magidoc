<script lang="ts">
  throw new Error(
    '@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)',
  )

  import '../app.css'
  import '../prism-theme.css'
  import '@magidoc/plugin-svelte-prismjs'
  import 'prismjs/components/prism-graphql.js'
  import 'prismjs/components/prism-json.js'
  import 'prismjs/components/prism-shell-session.js'
  import 'prismjs/components/prism-javascript.js'
  import 'prismjs/components/prism-typescript.js'
  import 'prismjs/components/prism-python.js'
  import 'prismjs/components/prism-yaml.js'
  import 'prismjs/components/prism-bash.js'
  import 'prismjs/components/prism-csharp.js'
  import 'prismjs/components/prism-kotlin.js'
  import 'prismjs/components/prism-java.js'
  import 'prismjs/components/prism-markdown.js'
  import 'prism-svelte'

  import { Content, Row, Grid, Column } from 'carbon-components-svelte'
  import AppHeader from '$lib/layout/AppHeader.svelte'
  import AppNavigation from '$lib/layout/nav/AppNavigation.svelte'
  import type { LoadOutput } from '@sveltejs/kit'
  import { siteMeta, type Meta } from '$lib/meta'
  import { homePageUrl, pages } from '$lib/pages'
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
