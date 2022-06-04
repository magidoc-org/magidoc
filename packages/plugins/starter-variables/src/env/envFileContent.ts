import _ from 'lodash'
import magidoc from '../variables/magidoc'
import type { Variable } from '../variables/variable'

export function toVariablesFile(
  options: Record<string, unknown>,
  supportedVariables: ReadonlyArray<Variable<unknown>>,
): string {
  return asVariablesString(buildEnv(options, supportedVariables))
}

function asVariablesString(env: Record<string, string>) {
  return JSON.stringify(env)
}

function buildEnv(
  options: Record<string, unknown>,
  supportedVariables: ReadonlyArray<Variable<unknown>>,
): Record<string, string> {
  let newRecord: Record<string, string> = {}
  const unsupportedVariables: string[] = []
  _.forEach(options, (value, key) => {
    const variable = supportedVariables.find((option) => option.name === key)
    if (!variable) {
      unsupportedVariables.push(key)
      return
    }

    newRecord = {
      ...newRecord,
      ...variable.asEnv(value),
    }
  })

  if (unsupportedVariables.length > 0) {
    throw new UnsupportedVariablesError(
      `Options [${unsupportedVariables.toString()}] are not supported... Supported option names are [${supportedVariables
        .map((value) => value.name)
        .join(', ')}]`,
      unsupportedVariables,
    )
  }

  insertDefaultVariables(newRecord)
  return newRecord
}

function insertDefaultVariables(newRecord: Record<string, string>) {
  newRecord[magidoc.MAGIDOC_GENERATE.key] = 'true'
}

export class UnsupportedVariablesError extends Error {
  public unsupportedVariables: string[]

  constructor(message: string, unsupportedVariables: string[]) {
    super(message)
    this.unsupportedVariables = unsupportedVariables
    this.name = 'UnsupportedVariableError'
  }
}
