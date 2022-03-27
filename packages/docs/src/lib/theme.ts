import { derived, writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export type AppThemeValue = 'g10' | 'g90'

export const themeValue: Writable<AppThemeValue> = writable('g10')

export const theme = derived(themeValue, (value: AppThemeValue) => {
  return {
    value,
    toggle: () => themeValue.set(value === 'g10' ? 'g90' : 'g10'),
  }
})
