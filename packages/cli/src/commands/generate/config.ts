import type { MagidocConfiguration } from '../../config/types'
import type { PackageManagerType } from '../../node/packageManager'

export type GenerationConfig = MagidocConfiguration & {
  packageManager?: PackageManagerType
  clean: boolean
}
