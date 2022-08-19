import { getSubscriptionByName } from '$lib/model'
import { findPageByHref } from '$lib/pages'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = ({ params, url }) => {
  const field = getSubscriptionByName(params.subscription)
  const page = findPageByHref(url.pathname)

  if (!field || !page) {
    throw error(404, `Subscription ${params.subscription} not found.`)
  }

  return {
    field,
    page,
  }
}
