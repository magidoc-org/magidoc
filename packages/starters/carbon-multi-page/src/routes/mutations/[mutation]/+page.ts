import { getMutationByName, hasMutations } from '$lib/model'
import { findPageByHref } from '$lib/pages'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const prerender = hasMutations()

export const load: PageLoad = ({ params, url }) => {
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
