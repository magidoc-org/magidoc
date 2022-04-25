import type { Converter } from '../variable'

export function stringConverter(): Converter<string> {
  return {
    convert: (target: unknown): string | null => {
      if (target === null || target === undefined || target === '') {
        return null
      }

      return String(target)
    },
    asString: (value) => String(value),
    type: (z) => z.string().optional(),
  }
}
