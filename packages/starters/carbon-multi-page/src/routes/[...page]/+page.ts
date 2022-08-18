import { error } from '@sveltejs/kit'
import { findPageByHref } from '$lib/pages'

import type { LoadEvent } from '@sveltejs/kit'

export function load({ url }: LoadEvent): PageLoadOutput {
  const page = findPageByHref(url.pathname)
  if (!page) {
    throw error(404, 'Could not find the page you are looking for')
  }

  return {
    page,
  }
}
