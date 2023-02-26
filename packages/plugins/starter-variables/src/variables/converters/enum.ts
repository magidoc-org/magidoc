import type { Converter } from '../variable'

export function enumConverter<V extends string>(
  values: [V, ...V[]],
): Converter<V> {
  return {
    convert: (target) => {
      if (target === null || target === undefined) {
        return null
      }

      if (!values.find((value) => value === target)) {
        return null
      }

      return target as V
    },
    asString: (value) => String(value),
    type: (z) => z.enum(values).optional(),
  }
}
