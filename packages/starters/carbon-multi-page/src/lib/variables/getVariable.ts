import type { Variable } from '@magidoc/plugin-starter-variables'
import * as variables from './variables'

export function get<T>(target: Variable<T>): T | null {
  return target.vite.get(variables)
}

export function getOrDefault<T>(target: Variable<T>, def: T) {
  return target.vite.getOrDefault(variables, def)
}
