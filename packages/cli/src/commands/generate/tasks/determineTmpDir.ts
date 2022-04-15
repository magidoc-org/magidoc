import { GenerationConfig, newTask, Task } from '..'
import {
  tmpTemplateArchiveFile,
  tmpTemplateDirectory,
} from '../../../template/tmp'

export function determineTmpDirectoryTask(config: GenerationConfig): Task {
  return newTask({
    title: 'Determine tmp directories',
    executor: (ctx) => {
      const templateLocationName = `${config.template}@${config.templateVersion}`
      ctx.tmpArchive = tmpTemplateArchiveFile(templateLocationName)
      ctx.tmpDirectory = tmpTemplateDirectory(templateLocationName)
    },
  })
}
