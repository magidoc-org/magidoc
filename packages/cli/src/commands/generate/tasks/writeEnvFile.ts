import { magidoc } from '@magidoc/plugin-starter-variables'
import _ from 'lodash'
import { writeFile } from 'fs/promises'
import type { GenerationConfig } from '../config'
import { newTask, GenerateTask, GenerateTaskContext } from '../task'

export function writeEnvFile(config: GenerationConfig): GenerateTask {
  return newTask({
    title: `Write environment file`,
    executor: async (ctx) => {
      await writeFile(
        ctx.templateConfiguration.envFileLocation,
        envAsString(buildEnv(ctx, config)),
      )
    },
  })
}

function envAsString(env: Record<string, string>) {
  return _.map(
    env,
    (value, key) => `${key}="${value.replace('"', '\\"')}"`,
  ).join('\n')
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
