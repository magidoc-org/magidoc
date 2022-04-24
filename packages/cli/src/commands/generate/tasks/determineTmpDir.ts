import {
  tmpTemplateArchiveFile,
  tmpTemplateDirectory,
} from '../../../template/tmp'
import type { GenerationConfig } from '../config'
import { newTask, GenerateTask } from '../task'

export function determineTmpDirectoryTask(
  config: GenerationConfig,
): GenerateTask {
  return newTask({
    title: 'Determine tmp directories',
    executor: (ctx) => {
      const templateLocationName = `${config.website.template}@${config.website.templateVersion}`
      ctx.tmpArchive = tmpTemplateArchiveFile(templateLocationName)
      ctx.tmpDirectory = tmpTemplateDirectory(templateLocationName)
    },
  })
}
