import type { Task } from '../runner'
import { isTemplate, Template } from '../../template'
import {
  tmpLocation,
  TmpLocation,
  tmpTemplateArchiveFile,
  tmpTemplateDirectory,
} from '../../template/tmp'

type Config = {
  tmpArchive?: TmpLocation
  tmpDirectory?: TmpLocation
  website: {
    template: Template | string
    templateVersion: string
  }
}

type Ctx = {
  tmpArchive: TmpLocation
  tmpDirectory: TmpLocation
}

export function determineTmpDirectoryTask<T extends Ctx>(
  config: Config,
): Task<T> {
  return {
    title: 'Determine tmp directories',
    executor: (ctx) => {
      if (isTemplate(config.website.template)) {
        const templateLocationName = `${config.website.template}@${config.website.templateVersion}`
        ctx.tmpArchive =
          config.tmpArchive ?? tmpTemplateArchiveFile(templateLocationName)
        ctx.tmpDirectory =
          config.tmpDirectory ?? tmpTemplateDirectory(templateLocationName)
      } else {
        ctx.tmpDirectory = tmpLocation(config.website.template)
      }
    },
  }
}
