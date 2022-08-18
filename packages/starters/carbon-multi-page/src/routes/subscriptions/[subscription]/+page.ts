import { error } from '@sveltejs/kit'

export function load({ params, url }: LoadEvent): PageLoadOutput {
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
