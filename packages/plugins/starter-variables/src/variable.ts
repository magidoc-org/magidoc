/**
 * Copy of the ViteJS import meta interface
 */

export type Variable<T> = {
  vite: ViteVariable<T>
}

export type ViteVariable<T> = {
  key: () => string
  get: () => T | null
  getOrDefault: (def: T) => T
}

export function createVariable<T>(key: string): Variable<T> {
  const viteKey = `VITE_${key.toUpperCase()}`
  const viteGet = () => import.meta.env[key] as unknown as T

  return {
    vite: {
      key: () => viteKey,
      get: viteGet,
      getOrDefault: (def) => viteGet() ?? def,
    },
  }
}
