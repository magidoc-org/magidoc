import { redirect } from '@sveltejs/kit'
import { homePageUrl } from '$lib/pages'

export const prerender = true

export function load() {
  throw redirect(301, homePageUrl)
}
