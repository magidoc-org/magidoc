import { existsSync } from 'fs'
import type { FileConfiguration } from './types'
import path from 'path'
import { parseConfiguration } from './parser'

const allowedExtensions = ['.js', '.cjs']

export async function readConfiguration(
  configPath: string,
): Promise<FileConfiguration> {
  const extension = path.extname(configPath)
  if (!isValidJsExtension(extension)) {
    throw new Error(
      `Unrecognized Magidoc configuration file extension: ${extension}...  Supported values are ${allowedExtensions.toString()}`,
    )
  }

  if (!existsSync(configPath)) {
    throw new Error(
      `Could not find Magidoc configuration file at path ${configPath}`,
    )
  }

  const config = ((await import(configPath)) as { default?: unknown }).default
  if (!config) {
    throw new Error(`File ${configPath} has no default export`)
  }

  return parseConfiguration(config)
}

export function isValidJsExtension(extension: string): boolean {
  const lower = extension.toLocaleLowerCase()
  return allowedExtensions.includes(lower)
}
