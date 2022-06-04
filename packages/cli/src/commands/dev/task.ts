import type { PackageManager } from '../../node/packageManager'
import type { TmpLocation } from '../../template/tmp'
import type { ResolvedMagidocTemplateConfig } from '../../tasks/all/resolveTemplateConfig'

export type DevTaskContext = {
  tmpArchive: TmpLocation
  tmpDirectory: TmpLocation
  templateConfiguration: ResolvedMagidocTemplateConfig
  packageManager: PackageManager
}
