import { findPageByHref } from '$lib/pages'
import { pages } from '$lib/pages'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const prerender = pages.length > 0

export const load: PageLoad = ({ url }) => {
  const page = findPageByHref(url.pathname)
  if (!page) {
    throw error(404, 'Could not find the page you are looking for')
  }

  return {
    page,
  }
}
