import { Variable } from '@magidoc/plugin-starter-variables'

let variables: Record<string, unknown> | undefined = undefined

export function initialize(value: Record<string, unknown>) {
  variables = value
}

export function get<T>(target: Variable<T>): T | null {
  return target.get(getVariables())
}

export function getOrDefault<T>(target: Variable<T>, def: T): T {
  return target.getOrDefault(getVariables(), def)
}

function getVariables(): Record<string, unknown> {
  if (!variables) {
    throw new Error(
      'Variables were not initialized. Make sure you call initialize(<variables>)',
    )
  }

  return variables
}
