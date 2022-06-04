import _ from 'lodash'
import magidoc from '../variables/magidoc'
import dotenv from 'dotenv'
import type { Variable } from '../variables/variable'

export function toEnv(
  options: Record<string, unknown>,
  supportedOptions: ReadonlyArray<Variable<unknown>>,
): string {
  return envAsString(buildEnv(options, supportedOptions))
}

export function parseEnv(content: string): Record<string, string> {
  return _.mapValues(dotenv.parse(content), unescapeEnv)
}

export function escapeEnv(value: string): string {
  return value.replaceAll("'", "\\'")
}

export function unescapeEnv(value: string): string {
  return value.replaceAll("\\'", "'")
}

function envAsString(env: Record<string, string>) {
  return _.map(
    env,
    (value, key) => `${key}='${JSON.stringify(escapeEnv(value))}'`,
  ).join('\n')
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
  newRecord[magidoc.MAGIDOC_GENERATE.vite.key] = 'true'
}

export class UnsupportedOptionError extends Error {
  public nonExistingOptions: string[]

  constructor(message: string, nonExistingOptions: string[] = []) {
    super(message)
    this.nonExistingOptions = nonExistingOptions
    this.name = 'UnsupportedOptionError'
  }
}
