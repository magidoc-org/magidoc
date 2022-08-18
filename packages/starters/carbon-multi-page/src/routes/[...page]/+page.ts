import { error } from '@sveltejs/kit'
import { findPageByHref } from '$lib/pages'

import type { LoadEvent, LoadOutput } from '@sveltejs/kit'

export function load({ url }: LoadEvent): PageLoadOutput {
  const page = findPageByHref(url.pathname)
  if (!page) {
    throw error(404, 'Could not find the page you are looking for')
  }

  throw new Error(
    '@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)',
  )
  return {
    status: 200,
    props: {
      page,
    },
  }
}
