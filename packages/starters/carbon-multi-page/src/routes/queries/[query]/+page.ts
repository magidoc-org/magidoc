import { getQueryByName, hasQueries } from '$lib/model'
import { findPageByHref } from '$lib/pages'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const prerender = hasQueries()

export const load: PageLoad = ({ params, url }) => {
  const field = getQueryByName(params.query)
  const page = findPageByHref(url.pathname)

  if (!field || !page) {
    throw error(404, `Query ${params.query} not found.`)
  }

  return {
    field,
    page,
  }
}
