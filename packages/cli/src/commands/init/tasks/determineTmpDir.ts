import type { InitConfig } from '../config'
import { tmpTemplateArchiveFile } from '../../../template/tmp'
import { InitTask, newTask } from '../task'

export function determineTmpDirectoryTask(config: InitConfig): InitTask {
  return newTask({
    title: 'Determine tmp directories',
    executor: (ctx) => {
      const templateLocationName = `${config.template}@${config.templateVersion}`
      ctx.tmpArchive = tmpTemplateArchiveFile(templateLocationName)
    },
  })
}
