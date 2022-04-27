<script context="module" lang="ts">
  import { base } from '$app/paths'

  import { findFirstPage, joinUrlPaths } from '$lib/pages'

  import type { LoadInput, LoadOutput } from '@sveltejs/kit'
  import _ from 'lodash'

  export function load({ stuff }: LoadInput): LoadOutput {
    const firstPage = findFirstPage(stuff.content || [])
    const firstQuery = _.first(
      Object.values(stuff.schema?.getQueryType()?.getFields() || {}),
    )

    let url = firstPage
      ? firstPage.href
      : firstQuery
      ? joinUrlPaths(base, `/model/queries/${firstQuery.name}`)
      : null

    if (!url) {
      return {
        status: 500,
        error:
          'No custom pages or query available to use as the root application URL. You need to provide at least one custom page or your schema should contain at least one query type.',
      }
    }

    return {
      status: 302,
      redirect: url,
    }
  }
</script>
