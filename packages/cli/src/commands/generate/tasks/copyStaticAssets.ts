import { copyStaticAssets } from '../../../template/assets'
import type { GenerationConfig } from '../config'
import { newTask, GenerateTask } from '../task'

export function copyStaticAssetsTask(config: GenerationConfig): GenerateTask {
  return newTask({
    title: `Copy static assets`,
    enabled: !!config.website.staticAssets,
    executor: async (ctx) => {
      if (config.website.staticAssets) {
        await copyStaticAssets(
          config.website.staticAssets,
          ctx.templateConfiguration.staticAssetsLocation,
        )
      }
    },
  })
}
