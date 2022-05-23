<script lang="ts" context="module">
  import { findPageByHref } from '$lib/pages'

  import type { LoadInput, LoadOutput } from '@sveltejs/kit'

  export function load({ url }: LoadInput): LoadOutput {
    const page = findPageByHref(url.pathname)
    if (!page) {
      return {
        status: 404,
        error: 'Could not find the page you are looking for',
      }
    }

    return {
      status: 200,
      props: {
        page,
      },
    }
  }
</script>

<script lang="ts">
  import AppMarkdown from '$lib/components/common/AppMarkdown.svelte'
  import type { WebsitePage } from 'src/app'
  import PreviousNextPage from '$lib/components/common/PreviousNextPage.svelte'

  export let page: WebsitePage
</script>

<AppMarkdown source={page.content} />

<PreviousNextPage {page} />
