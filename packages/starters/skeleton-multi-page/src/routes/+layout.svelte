<script lang="ts">
import { setupMarkedExtensions } from '#lib/markdown'
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
import { templates } from '@magidoc/plugin-starter-variables'
import Prism from 'prismjs'
import AppHeader from '#lib/layout/AppHeader.svelte'
import AppNavigation from '#lib/layout/nav/AppNavigation.svelte'
import PageOutline from '#lib/layout/PageOutline.svelte'
import { siteMeta } from '#lib/meta'
import { pages } from '#lib/pages'
import { siteStyles } from '#lib/styles'
import { get } from '#lib/variables'
import { afterNavigate } from '$app/navigation'

setupMarkedExtensions()

// Allows custom commands to highlight in shell syntax
Prism.languages.insertBefore('shell', 'function', {
  keyword: {
    pattern: /(^\s*)(?:magidoc|pnpm|npm|yarn|bun)(?=\s)/m,
    lookbehind: true,
  },
})

let isSideNavOpen = false

const favicon = get(templates.APP_FAVICON)

afterNavigate(() => {
  isSideNavOpen = false
})

if (import.meta.hot) {
  import.meta.hot.on('variables-changed', () => {
    window.location.reload()
  })
}
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

<AppHeader bind:isSideNavOpen />

<div class="flex">
  <AppNavigation bind:isOpen={isSideNavOpen} content={pages} />

  <main class="min-w-0 flex-1 px-4 py-8 sm:px-8">
    <div class="mx-auto max-w-4xl">
      <slot />
    </div>
  </main>

  <PageOutline />
</div>
