import { error } from '@sveltejs/kit'
import { findPageByHref } from '$lib/pages'
import type { PageLoad } from './$types'

export const load: PageLoad = ({ url }) => {
  const page = findPageByHref(url.pathname)
  if (!page) {
    throw error(404, 'Could not find the page you are looking for')
  }

  return {
    page,
  }
}
