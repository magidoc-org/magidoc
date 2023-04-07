import { variables } from '@magidoc/plugin-starter-common'
import type { Variable } from '@magidoc/plugin-starter-variables'
import _variables from '../_variables.json'

export function initialize() {
  variables.initialize(_variables)
}

export function get<T>(target: Variable<T>): T | null {
  initialize()
  return variables.get(target)
}

export function getOrDefault<T>(target: Variable<T>, def: T) {
  initialize()
  return variables.getOrDefault(target, def)
}
