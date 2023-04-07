import { redirect } from '@sveltejs/kit'
import { home } from '$lib/pages'

export const prerender = true

export function load() {
  throw redirect(301, home.href)
}
