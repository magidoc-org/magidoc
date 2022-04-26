import { magidoc } from '@magidoc/plugin-starter-variables'
import _ from 'lodash'
import type { GenerationConfig } from '../config'
import { newTask, GenerateTask, GenerateTaskContext } from '../task'

export function buildTemplateTask(config: GenerationConfig): GenerateTask {
  return newTask({
    title: `Build template`,
    executor: async (ctx) => {
      await ctx.packageManager.buildProject({
        cwd: ctx.tmpDirectory.path,
        env: buildEnv(ctx, config),
      })
    },
  })
}

function buildEnv(
  ctx: GenerateTaskContext,
  config: GenerationConfig,
): Record<string, string> {
  let newRecord: Record<string, string> = {}
  const nonExistingOptions: string[] = []
  _.forEach(config.website.options, (value, key) => {
    const variable = ctx.templateConfiguration.supportedOptions.find(
      (option) => option.name === key,
    )
    if (!variable) {
      nonExistingOptions.push(key)
      return
    }

    newRecord = {
      ...newRecord,
      ...variable.asEnv(value),
    }
  })

  if (nonExistingOptions.length > 0) {
    throw new Error(
      `Options [${nonExistingOptions.toString()}] are not supported by template ${
        config.website.template
      }... Supported option names are [${ctx.templateConfiguration.supportedOptions
        .map((value) => value.name)
        .join(', ')}]`,
    )
  }

  insertDefaultVariables(newRecord)
  return newRecord
}

function insertDefaultVariables(newRecord: Record<string, string>) {
  newRecord[magidoc.MAGIDOC_GENERATE.vite.key] = 'true'
}
