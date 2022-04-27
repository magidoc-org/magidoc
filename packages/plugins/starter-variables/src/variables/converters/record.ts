import type { Converter, ZodTypeProvider } from '../variable'

export function recordConverter<V>(
  valueType: ZodTypeProvider<V>,
): Converter<Record<string, V | undefined>> {
  return {
    convert: (target) => {
      if (typeof target === 'object') {
        return target as Record<string, V>
      }

      if (typeof target === 'string') {
        const result = JSON.parse(target) as Record<string, V>
        if (typeof result !== 'object') {
          return null
        }
        return result
      }

      return null
    },
    asString: (value) => JSON.stringify(value),
    type: (z) => z.record(valueType(z).optional()).optional(),
  }
}
