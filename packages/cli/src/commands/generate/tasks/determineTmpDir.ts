import { isTemplate } from '../../../template'
import {
  tmpLocation,
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
      if (isTemplate(config.website.template)) {
        const templateLocationName = `${config.website.template}@${config.website.templateVersion}`
        ctx.tmpArchive = tmpTemplateArchiveFile(templateLocationName)
        ctx.tmpDirectory = tmpTemplateDirectory(templateLocationName)
      } else {
        ctx.tmpDirectory = tmpLocation(config.website.template)
      }
    },
  })
}
