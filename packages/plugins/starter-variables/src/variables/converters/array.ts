import type { Converter, ZodTypeProvider } from '../variable'

export function arrayConverter<V>(
  valueType: ZodTypeProvider<V>,
): Converter<Array<V | undefined>> {
  return {
    convert: (target) => {
      if (Array.isArray(target)) {
        return target as Array<V>
      }

      if (typeof target === 'string') {
        const result = JSON.parse(target) as Record<string, V>
        if (!Array.isArray(result)) {
          return null
        }
        return result
      }

      return null
    },
    asString: (value) => JSON.stringify(value),
    type: (z) => z.array(valueType(z)).optional(),
  }
}
