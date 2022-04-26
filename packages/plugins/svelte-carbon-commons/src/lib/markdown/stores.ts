import { writable } from 'svelte/store'

export const baseVar = writable<`/${string}`>('/')
