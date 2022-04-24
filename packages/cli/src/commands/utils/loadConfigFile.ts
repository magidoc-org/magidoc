import { readConfiguration } from '../generate/config/read'
import type { MagidocConfiguration } from '../generate/config/types'
import path from 'path'

export async function loadFileConfiguration(
  configPath: string,
): Promise<MagidocConfiguration | null> {
  try {
    return await readConfiguration(path.resolve(configPath))
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      console.log(error)
    }

    return null
  }
}
