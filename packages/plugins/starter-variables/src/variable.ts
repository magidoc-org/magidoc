/**
 * Copy of the ViteJS import meta interface
 */
interface MetaEnv {
  [key: string]: unknown
}

export type Variable<T> = {
  names: string[]
  vite: ViteVariable<T>
}

export type ViteVariable<T> = {
  key: string
  get: (env: MetaEnv) => T | null
  getOrDefault: (env: MetaEnv, def: T) => T
}

export function createVariable<T = string | boolean>(
  key: string,
  conversion: (target: unknown) => T,
): Variable<T> {
  const viteKey = `VITE_${key.toUpperCase()}`
  const viteGet = (env: MetaEnv) =>
    env[viteKey] !== undefined ? conversion(env[viteKey]) : null

  return {
    names: [key, toCamelCase(key)],
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
export function stringConversion() {
  return (target: unknown): string => String(target)
}

export function booleanConversion() {
  return (target: unknown): boolean => {
    switch (typeof target) {
      case 'boolean':
        return target
      case 'string':
        const lowerCase = target.toLowerCase().trim()
        return lowerCase === 'true' || lowerCase === 't' || lowerCase === '1'
      case 'number':
        return target !== 0
      default:
        return !!target
    }
  }
}
