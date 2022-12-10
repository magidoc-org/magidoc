import { getDirectiveByName, hasAllowedDirectives } from '$lib/model'
import { findPageByHref } from '$lib/pages'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const prerender = hasAllowedDirectives()

export const load: PageLoad = ({ params, url }) => {
  const directive = getDirectiveByName(params.directive)
  const page = findPageByHref(url.pathname)

  if (!directive || !page) {
    throw error(404, `Directive ${params.directive} not found.`)
  }

  return {
    directive,
    page,
  }
}
