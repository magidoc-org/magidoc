<script lang="ts" context="module">
  export async function load({ url, stuff }: LoadInput): Promise<LoadOutput> {
    const href = url.pathname
    const currentPage = getCurrentPage(href, stuff.pages as Pages)
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

  import NextPreviousArticle from '$lib/components/article/NextPreviousArticle.svelte'
  import MarkdownSection from '$lib/components/common/markdown/MarkdownSection.svelte'

  import {
    getCurrentPage,
    type CurrentPage,
    type PageContent,
    type Pages,
  } from '$lib/pages'
  import type { LoadOutput } from '@sveltejs/kit/types/internal'
  import type { LoadInput } from '@sveltejs/kit/types/internal'

  export let currentPage: CurrentPage
  export let pageContent: PageContent
</script>

<svelte:head>
  <title>
    {currentPage.value.name}
  </title>
</svelte:head>

<ArticleTitle {pageContent} />
<MarkdownSection source={pageContent.body} />

<div class={'next-previous-buttons'}>
  <NextPreviousArticle {currentPage} />
</div>

<style>
  .next-previous-buttons {
    margin-top: 2rem;
  }
</style>
