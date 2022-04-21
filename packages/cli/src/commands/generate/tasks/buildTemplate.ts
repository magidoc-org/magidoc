import type { GenerationConfig } from '../config'
import { newTask, Task } from '../task'

export function buildTemplateTask(config: GenerationConfig): Task {
  return newTask({
    title: `Build template`,
    executor: async (ctx) => {
      await ctx.npmRunner.buildProject({
        cwd: ctx.tmpDirectory.path,
        env: buildEnv(config),
      })
    },
  })
}

function buildEnv(config: GenerationConfig): Record<string, string> {
  const newRecord: Record<string, string> = {}
  Object.keys(config.options).forEach(
    (key) => (newRecord[key] = String(config.options[key])),
  )
  return newRecord
}
