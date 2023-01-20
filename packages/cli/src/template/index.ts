export const AVAILABLE_TEMPLATES = ['carbon-multi-page'] as const

export type Template = (typeof AVAILABLE_TEMPLATES)[number]

export function isTemplate(value: string): value is Template {
  return AVAILABLE_TEMPLATES.some((template) => template === value)
}
