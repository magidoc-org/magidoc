import { redirect } from '@sveltejs/kit'
import { homePageUrl } from '$lib/pages'

export function load() {
  throw redirect(301, homePageUrl)
}
