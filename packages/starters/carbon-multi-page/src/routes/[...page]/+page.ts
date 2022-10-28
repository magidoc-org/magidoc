import { error } from '@sveltejs/kit'
import { findPageByHref } from '$lib/pages'
import type { PageLoad } from './$types'
import { pages } from '$lib/pages'

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
