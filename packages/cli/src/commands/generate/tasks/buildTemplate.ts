import { magidoc } from '@magidoc/plugin-starter-variables'
import type { GenerationConfig } from '../config'
import { newTask, Task, TaskContext } from '../task'

export function buildTemplateTask(config: GenerationConfig): Task {
  return newTask({
    title: `Build template`,
    executor: async (ctx) => {
      await ctx.npmRunner.buildProject({
        cwd: ctx.tmpDirectory.path,
        env: buildEnv(ctx, config),
      })
    },
  })
}

function buildEnv(
  ctx: TaskContext,
  config: GenerationConfig,
): Record<string, string> {
  const newRecord: Record<string, string> = {}
  const nonExistingOptions: string[] = []
  Object.keys(config.options).forEach((key) => {
    const variable = ctx.templateConfiguration.supportedOptions.find((option) =>
      option.names.includes(key),
    )
    if (!variable) {
      nonExistingOptions.push(key)
      return
    }

    newRecord[variable.vite.key] = String(config.options[key])
  })

  if (nonExistingOptions.length > 0) {
    throw new Error(
      `Options ${nonExistingOptions.toString()} are not supported by template ${
        config.template
      }... Supported option names are ${
        (ctx.templateConfiguration.supportedOptions.flatMap(
          (value) => value.names,
        ),
        toString())
      }`,
    )
  }

  insertDefaultVariables(newRecord)
  return newRecord
}

function insertDefaultVariables(newRecord: Record<string, string>) {
  newRecord[magidoc.MAGIDOC_GENERATE.vite.key] = 'true'
}
