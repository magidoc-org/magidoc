export const AVAILABLE_TEMPLATES = ['carbon-multi-page'] as const

export type Template = typeof AVAILABLE_TEMPLATES[number]
