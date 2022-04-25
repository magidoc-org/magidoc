import type { ZodType, ZodTypeDef } from 'zod'

/**
 * Copy of the ViteJS import meta interface
 */
interface MetaEnv {
  [key: string]: unknown
}

export type Variable<T> = {
  name: string
  asEnv: (value: T) => Record<string, string>
  zod: ZodVariable<T>
  vite: ViteVariable<T>
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

export type ViteVariable<T> = {
  key: string
  get: (env: MetaEnv) => T | null
  getOrDefault: (env: MetaEnv, def: T) => T
}

export function createVariable<T>(
  key: string,
  converter: Converter<T>,
): Variable<T> {
  const viteKey = `VITE_${key.toUpperCase()}`
  const viteGet = (env: MetaEnv) => converter.convert(env[viteKey])

  return {
    name: toCamelCase(key),
    asEnv: (value: T) => ({ [viteKey]: converter.asString(value) }),
    zod: {
      type: converter.type,
    },
    vite: {
      key: viteKey,
      get: viteGet,
      getOrDefault: (env, def) => viteGet(env) ?? def,
    },
  }
}

function toCamelCase(key: string): string {
  return key.toLowerCase().replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}
