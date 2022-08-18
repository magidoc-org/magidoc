import { getQueryByName } from '$lib/model'
import { findPageByHref } from '$lib/pages'
import { error, type LoadEvent } from '@sveltejs/kit'

export function load({ params, url }: LoadEvent): PageLoadOutput {
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
