import type {
  PackageManagerType,
} from '../../node/packageManager'
import type { MagidocConfiguration } from './config/types'

export type GenerationConfig = MagidocConfiguration & {
  packageManager?: PackageManagerType
  clean: boolean
}
