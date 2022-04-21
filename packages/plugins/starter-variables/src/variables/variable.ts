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
  conversion: (target: unknown) => T | null,
): Variable<T> {
  const viteKey = `VITE_${key.toUpperCase()}`
  const viteGet = (env: MetaEnv) => conversion(env[viteKey])

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
  return (target: unknown): string | null => {
    if (target === null || target === undefined || target === '') {
      return null
    }

    return String(target)
  }
}

export function booleanConversion() {
  return (target: unknown): boolean | null => {
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
  }
}
