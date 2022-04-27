<script lang="ts" context="module">
  import { findPageByHref } from '$lib/pages'

  import type { LoadInput, LoadOutput } from '@sveltejs/kit'
  import type { CustomPage } from 'src/app'

  export function load({ url, stuff }: LoadInput): LoadOutput {
    const page = findPageByHref(stuff.content || [], url.pathname)
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

  export let page: CustomPage
</script>

<AppMarkdown source={page.content} />
