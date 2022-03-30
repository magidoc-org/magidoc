<script lang="ts">
  import { page } from '$app/stores'

  import MarkdownSection from '$lib/components/common/MarkdownSection.svelte'

  import FetchError from '$lib/layout/error/FetchError.svelte'
  import { currentPage, type PageContent } from '$lib/pages'

  let pageContent: PageContent | undefined = undefined
  let loading: boolean = true

  $: {
    $currentPage.set($page.url.pathname)
  }

  $: {
    if ($currentPage) {
      $currentPage.fetchContent()
        .then((content) => {
          pageContent = content
        })
        .catch((error) => {
          console.error('error fetching page content', error)
        })
    } else {
      loading = false
    }
  }
</script>

{#if pageContent && (pageContent.status < 200 || pageContent.status >= 300)}
  <FetchError status={pageContent.status} />
{:else if pageContent && pageContent.content}
  <MarkdownSection source={pageContent.content} />
{/if}
