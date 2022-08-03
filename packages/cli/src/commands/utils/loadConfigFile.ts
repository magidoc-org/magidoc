import { readConfiguration } from '../../config/reader'
import type { MagidocConfiguration } from '../../config/types'
import path from 'path'
import { printError, printStacktrace } from './log'

export async function loadFileConfiguration(
  configPath: string,
  showStacktrace: boolean,
): Promise<MagidocConfiguration | null> {
  try {
    return await readConfiguration(path.resolve(configPath))
  } catch (error) {
    if (error instanceof Error && !showStacktrace) {
      printError(error)
    } else {
      printStacktrace(error)
    }

    return null
  }
}
