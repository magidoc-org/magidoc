import { redirect } from '@sveltejs/kit'
import type { LoadEvent, LoadOutput } from '@sveltejs/kit'
import { homePageUrl } from '$lib/pages'

export function load() {
  throw redirect(homePageUrl)
}
