<script lang="ts">
  import { setupMarkedExtensions } from '$lib/markdown'
  import '../app.css'
  import '../prism-theme.css'
  import '@magidoc/plugin-svelte-prismjs'
  import 'prismjs/components/prism-graphql.js'
  import 'prismjs/components/prism-json.js'
  import 'prismjs/components/prism-shell-session.js'
  import 'prismjs/components/prism-javascript.js'
  import 'prismjs/components/prism-typescript.js'
  import 'prismjs/components/prism-python.js'
  import 'prismjs/components/prism-ruby.js'
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
  import { templates } from '@magidoc/plugin-starter-variables'
  import { get } from '$lib/variables'
  import { page } from '$app/stores'
  import { onDestroy } from 'svelte'
  import { siteMeta } from '$lib/meta'
  import { pages } from '$lib/pages'
  import { siteStyles } from '$lib/styles'

  setupMarkedExtensions()

  const mobileWidth = 1056

  let isSideNavOpen = false
  let innerWidth = -1
  let mobile = false

  const favicon = get(templates.APP_FAVICON)

  const unsubscribe = page.subscribe(() => {
    // Mobile
    if (mobile) {
      isSideNavOpen = false
    }
  })

  onDestroy(unsubscribe)

  if (import.meta.hot) {
    import.meta.hot.on('variables-changed', () => {
      window.location.reload()
    })
  }

  $: mobile = innerWidth < mobileWidth
</script>

<svelte:head>
  {#each siteMeta as item}
    <meta name={item.name} content={item.content} />
  {/each}

  {#each siteStyles as style}
    <link rel="stylesheet" href={style} />
  {/each}

  {#if favicon}
    <link rel="icon" href={favicon} />
  {/if}
</svelte:head>

<svelte:window bind:innerWidth />

<AppHeader bind:isSideNavOpen {mobile} />
<AppNavigation bind:isOpen={isSideNavOpen} content={pages} />

<Content>
  <Grid>
    <Row>
      <Column>
        <slot />
      </Column>
    </Row>
  </Grid>
</Content>
