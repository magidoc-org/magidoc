import { readConfiguration } from '../../config/reader'
import type { MagidocConfiguration } from '../../config/types'
import path from 'path'

export async function loadFileConfiguration(
  configPath: string,
  showStacktrace: boolean,
): Promise<MagidocConfiguration | null> {
  try {
    return await readConfiguration(path.resolve(configPath))
  } catch (error) {
    if (error instanceof Error && !showStacktrace) {
      console.log(error.message)
    } else {
      console.log(error)
    }

    return null
  }
}
