export const AVAILABLE_TEMPLATES = ['multi-page'] as const

export type Template = typeof AVAILABLE_TEMPLATES[number]
