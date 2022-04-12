import { tmpNameSync } from 'tmp'

export function tmpTemplateFileName(): string {
  return tmpNameSync({ template: 'template-XXXXXX.zip' })
}
