import { getTypeByName, getTypeUsages, isModelEmpty } from '$lib/model'
import { findPageByHref } from '$lib/pages'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const prerender = !isModelEmpty()

export const load: PageLoad = ({ params, url }) => {
  const type = getTypeByName(params.type)
  const usages = getTypeUsages(type)

  const page = findPageByHref(url.pathname)

  if (!type || !page) {
    throw error(404, `Type ${params.type} not found.`)
  }

  return {
    type,
    usages,
    page,
  }
}
