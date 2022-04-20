import { existsSync, readFileSync } from 'fs'
import type { FileConfiguration } from './types'
import path from 'path'
import { parseConfiguration } from './parser'

const allowedExtensions = ['.yaml', '.yml']

export function readConfiguration(configPath: string): FileConfiguration {
  const extension = path.extname(configPath)
  if (!isValidYamlExtension(extension)) {
    throw new Error(
      `Unrecognized Magidoc configuration file extension: ${extension}...  Supported values are ${allowedExtensions.toString()}`,
    )
  }

  if (!existsSync(configPath)) {
    throw new Error(
      `Could not find Magidoc configuration file at path ${configPath}`,
    )
  }

  return parseConfiguration(readFileSync(configPath).toString())
}

export function isValidYamlExtension(extension: string): boolean {
  const lower = extension.toLocaleLowerCase()
  return allowedExtensions.includes(lower)
}
