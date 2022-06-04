import type { Variable } from '@magidoc/plugin-starter-variables'
import _variables from '../_variables.json'

export function get<T>(target: Variable<T>): T | null {
  return target.get(_variables as Record<string, unknown>)
}

export function getOrDefault<T>(target: Variable<T>, def: T) {
  return target.getOrDefault(_variables as Record<string, unknown>, def)
}
