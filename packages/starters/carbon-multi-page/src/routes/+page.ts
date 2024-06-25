import { homePageUrl } from '$lib/pages'
import { redirect } from '@sveltejs/kit'

export const prerender = true

export function load() {
  throw redirect(301, homePageUrl)
}
