import { getMutationByName } from '$lib/model'
import { findPageByHref } from '$lib/pages'
import { error, type LoadEvent } from '@sveltejs/kit'

export function load({ params, url }: LoadEvent): PageLoadOutput {
  const field = getMutationByName(params.mutation)
  const page = findPageByHref(url.pathname)

  if (!field || !page) {
    throw error(404, `Mutation ${params.mutation} not found.`)
  }

  return {
    field,
    page,
  }
}
