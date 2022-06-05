import { Option } from 'commander'
import { PACKAGE_MANAGER_TYPES } from '../../node/packageManager'

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
