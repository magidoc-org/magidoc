import { homePageUrl } from '$lib/pages'
import { redirect } from '@sveltejs/kit'

export function load() {
  throw redirect(301, homePageUrl)
}
