import { existsSync } from 'fs'
import type { Task } from '../runner'

type Config = {
  destination: string
}

export function verifyDestinationAvailableTask<T>(config: Config): Task<T> {
  return {
    title: `Verifying destination directory`,
    executor: () => {
      if (existsSync(config.destination)) {
        throw new Error(
          `Destination directory '${config.destination}' already exists.`,
        )
      }
    },
  }
}
