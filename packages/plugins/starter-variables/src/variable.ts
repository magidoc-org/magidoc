export type Variable<T> = {
  vite: ViteVariable<T>
}

export type ViteVariable<T> = {
  key: string
  get: (meta: Meta) => T | null
  getOrDefault: (meta: Meta, def: T) => T
}

export function createVariable<T = string | boolean>(
  key: string,
  conversion: (target: unknown) => T,
): Variable<T> {
  const viteKey = `VITE_${key.toUpperCase()}`
  const viteGet = (meta: Meta) =>
    meta.env[viteKey] !== undefined ? conversion(meta.env[viteKey]) : null

  return {
    vite: {
      key: viteKey,
      get: viteGet,
      getOrDefault: (meta, def) => viteGet(meta) ?? def,
    },
  }
}

export function stringConversion() {
  return (target: unknown) => String(target)
}

export function booleanConversion() {
  return (target: unknown) => Boolean(target)
}
