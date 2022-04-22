import { readConfiguration } from '../generate/config/read'
import type { FileConfiguration } from '../generate/config/types'
import path from 'path'

export async function loadFileConfiguration(
  configPath: string,
): Promise<FileConfiguration | null> {
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
