import _ from 'lodash'
import magidoc from '../variables/magidoc'
import type { Variable } from '../variables/variable'

export function toVariablesFile(
  options: Record<string, unknown>,
  supportedOptions: ReadonlyArray<Variable<unknown>>,
): string {
  return asVariablesString(buildEnv(options, supportedOptions))
}

function asVariablesString(env: Record<string, string>) {
  return JSON.stringify(env)
}

function buildEnv(
  options: Record<string, unknown>,
  supportedOptions: ReadonlyArray<Variable<unknown>>,
): Record<string, string> {
  let newRecord: Record<string, string> = {}
  const nonExistingOptions: string[] = []
  _.forEach(options, (value, key) => {
    const variable = supportedOptions.find((option) => option.name === key)
    if (!variable) {
      nonExistingOptions.push(key)
      return
    }

    newRecord = {
      ...newRecord,
      ...variable.asEnv(value),
    }
  })

  if (nonExistingOptions.length > 0) {
    throw new UnsupportedOptionError(
      `Options [${nonExistingOptions.toString()}] are not supported... Supported option names are [${supportedOptions
        .map((value) => value.name)
        .join(', ')}]`,
    )
  }

  insertDefaultVariables(newRecord)
  return newRecord
}

function insertDefaultVariables(newRecord: Record<string, string>) {
  newRecord[magidoc.MAGIDOC_GENERATE.key] = 'true'
}

export class UnsupportedOptionError extends Error {
  public nonExistingOptions: string[]

  constructor(message: string, nonExistingOptions: string[] = []) {
    super(message)
    this.nonExistingOptions = nonExistingOptions
    this.name = 'UnsupportedOptionError'
  }
}
