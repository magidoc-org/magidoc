import { Option } from 'commander'
import { PACKAGE_MANAGER_TYPES } from '../../node/packageManager'
import { InvalidArgumentError } from 'commander'

export const DEFAULT_CONFIG_FILE = './magidoc.mjs'

export const CONFIG_FILE_OPTION = () => {
  return new Option(
    '-f|--file <file.js|file.mjs|file.cjs>',
    'The magidoc configuration file location. By default, Magidoc looks for an ESModule Javascript file (mjs), but cjs is supported as well.',
  ).default(DEFAULT_CONFIG_FILE)
}

export const STACKTRACE_OPTION = () => {
  return new Option(
    '-s|--stacktrace',
    'Useful to debug errors. Will print the whole exception to the terminal in case the error message is not precise enough.',
  ).default(false)
}

export const CLEAN_OPTION = () => {
  return new Option(
    '-c|--clean',
    'Clean install, so delete the local copy of the template if there is one and fetch it again.',
  ).default(false)
}

export const PACKAGE_MANAGER_OPTION = () => {
  return new Option(
    '-p|--package-manager <package-manager>',
    'Selects a different Package Manager. By default, Magidoc will try to use any package manager available in order of preference. Recommended is pnpm.',
  ).choices(PACKAGE_MANAGER_TYPES)
}

export type IntOptionParameters = {
  min?: number
  max?: number
}

export function newPortOption(
  description: string,
  defaultValue: number,
): Option {
  return newIntOption('-p|--port <port>', description, {
    min: 1,
    max: 65535,
  }).default(defaultValue)
}

export function newIntOption(
  flags: string,
  description?: string,
  params?: IntOptionParameters,
): Option {
  return new Option(flags, description).argParser((value: string) => {
    const parsed = parseInt(value, 10)
    if (isNaN(parsed)) {
      throw new InvalidArgumentError(`It is not a number`)
    }

    if (params?.min && parsed < params.min) {
      throw new InvalidArgumentError(
        `It should be greater than or equal to ${params.min}`,
      )
    }

    if (params?.max && parsed > params.max) {
      throw new InvalidArgumentError(
        `It should be less than or equal to ${params.max}`,
      )
    }
    return parsed
  })
}
