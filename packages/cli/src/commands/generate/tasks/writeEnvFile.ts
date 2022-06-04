import { toVariablesFile } from '@magidoc/plugin-starter-variables'
import { writeFile } from 'fs/promises'
import type { GenerationConfig } from '../config'
import { newTask, GenerateTask } from '../task'

export function writeEnvFile(config: GenerationConfig): GenerateTask {
  return newTask({
    title: `Write variables file`,
    executor: async (ctx) => {
      await writeFile(
        ctx.templateConfiguration.envFileLocation,
        toVariablesFile(
          config.website.options,
          ctx.templateConfiguration.supportedOptions,
        ),
      )
    },
  })
}
