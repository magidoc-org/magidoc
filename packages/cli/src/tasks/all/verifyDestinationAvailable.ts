import { existsSync } from 'fs'
import { newTask, Task } from '..'

type Config = {
  destination: string
}

export function verifyDestinationAvailableTask<T>(config: Config): Task<T> {
  return newTask({
    title: `Verifying destination directory`,
    executor: () => {
      if (existsSync(config.destination)) {
        throw new Error(
          `Destination directory '${config.destination}' already exists.`,
        )
      }
    },
  })
}
