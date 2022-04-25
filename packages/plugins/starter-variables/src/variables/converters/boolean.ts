import type { Converter } from '../variable'

export function booleanConverter(): Converter<boolean> {
  return {
    convert: (target: unknown): boolean | null => {
      if (target === null) return null
      if (target === undefined) return null

      switch (typeof target) {
        case 'boolean':
          return target
        case 'string':
          const lowerCase = target.toLowerCase().trim()
          return lowerCase === 'true' || lowerCase === 't' || lowerCase === '1'
        case 'number':
          return target !== 0
        default:
          return null
      }
    },
    asString: (value) => String(value),
    type: (z) => z.boolean().optional(),
  }
}
