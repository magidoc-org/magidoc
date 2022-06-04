import type { ZodType, ZodTypeDef } from 'zod'

interface MetaEnv {
  [key: string]: unknown
}

export type Variable<T> = {
  name: string
  key: string
  asEnv: (value: T) => Record<string, string>
  get: (env: MetaEnv) => T | null
  getOrDefault: (env: MetaEnv, def: T) => T
  zod: ZodVariable<T>
}

export type ZodTypeProvider<T> = (
  zod: typeof import('zod'),
) => ZodType<T | undefined, ZodTypeDef, T | undefined>

export type ZodVariable<T> = {
  type: ZodTypeProvider<T>
}

export type Converter<T> = {
  convert: (target: unknown) => T | null
  asString: (value: T) => string
  type: ZodTypeProvider<T>
}

export function createVariable<T>(
  key: string,
  converter: Converter<T>,
): Variable<T> {
  const get = (env: MetaEnv) => converter.convert(env[key])

  return {
    name: toCamelCase(key),
    key: key,
    asEnv: (value: T) => ({ [key]: converter.asString(value) }),
    zod: {
      type: converter.type,
    },
    get: get,
    getOrDefault: (env, def) => get(env) ?? def,
  }
}

function toCamelCase(key: string): string {
  return key.toLowerCase().replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}
