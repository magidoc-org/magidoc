<script lang="ts" context="module">
  export async function load({ url, stuff }: LoadInput): Promise<LoadOutput> {
    const href = url.pathname
    const pages = stuff.pages as Pages
    const currentPage = getCurrentPage(href, pages)

    if (!currentPage) {
      return {
        status: 404,
      }
    }

    const pageContent = await currentPage.value.contentFetcher()
    return {
      status: 200,
      props: {
        currentPage: currentPage,
        pageContent: pageContent,
      },
    }
  }
</script>

<script lang="ts">
  import ArticleTitle from '$lib/components/article/ArticleTitle.svelte'

  import NextPreviousArticleButtons from '$lib/components/article/NextPreviousArticleButtons.svelte'

  import {
    getCurrentPage,
    type CurrentPage,
    type PageContent,
    type Pages,
  } from '$lib/pages'
  import type { LoadOutput } from '@sveltejs/kit/types/internal'
  import type { LoadInput } from '@sveltejs/kit/types/internal'
  import { CarbonMarkdown } from '@magidoc/plugin-svelte-carbon-commons'
  import 'prismjs/components/prism-graphql'
  import 'prismjs/components/prism-json'
  import 'prismjs/components/prism-typescript'
  import 'prismjs/components/prism-bash'
  import 'prism-svelte'

  export let currentPage: CurrentPage
  export let pageContent: PageContent

  if (import.meta.hot) {
    import.meta.hot.on('markdown-update', (data: { file: string }) => {
      if (currentPage.value.path.endsWith(data.file)) {
        window.location.reload()
      }
    })
  }
</script>

<svelte:head>
  <title>
    Magidoc - {currentPage.value.name}
  </title>
</svelte:head>

<ArticleTitle {pageContent} />
<CarbonMarkdown source={pageContent.body} />

<div class={'next-previous-buttons'}>
  <NextPreviousArticleButtons {currentPage} />
</div>

<style>
  .next-previous-buttons {
    margin-top: 2rem;
  }
</style>
